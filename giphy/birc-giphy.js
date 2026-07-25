/*
 * bIRC GIPHY Search
 *
 * Import this file in bIRC's Scripts window, enable HTTPS access for it, then
 * run `/gif config key YOUR_GIPHY_API_KEY`.
 *
 * The script intentionally stores configuration through birc.store so users
 * never need to edit this file. bIRC documents that store as persistent and
 * per-script, but does not document it as encrypted storage.
 */

(function registerBircGiphyScript() {
    "use strict";

    var GIPHY_SEARCH_ENDPOINT = "https://api.giphy.com/v1/gifs/search";
    var GIPHY_RANDOM_ENDPOINT = "https://api.giphy.com/v1/gifs/random";
    var DEFAULT_CONTENT_RATING = "pg-13";
    var DEFAULT_RESULT_COUNT = 3;
    var MAXIMUM_RESULT_COUNT = 10;
    var MAXIMUM_SEARCH_QUERY_LENGTH = 50;

    var STORE_KEY_API_KEY = "configuration.apiKey";
    var STORE_KEY_CONTENT_RATING = "configuration.contentRating";
    var STORE_KEY_RESULT_COUNT = "configuration.resultCount";
    var STORE_KEY_CONTEXT_POLICY = "configuration.contextPolicy";
    var CONTEXT_POLICY_STRICT = "strict";
    var CONTEXT_POLICY_ANYWHERE = "anywhere";

    var currentSearch = {
        query: "",
        nextOffset: 0,
        results: [],
        context: null
    };

    /*
     * Returns a successful result containing value, or a failed result
     * containing error. This keeps fallible boundaries explicit to callers.
     */
    function successfulResult(value) {
        return {
            succeeded: true,
            value: value,
            error: ""
        };
    }

    function failedResult(error) {
        return {
            succeeded: false,
            value: null,
            error: error
        };
    }

    function printGiphyStatus(message) {
        birc.print("[GIPHY] " + message);
    }

    function getConfiguredApiKey() {
        var storedApiKey = birc.store.get(STORE_KEY_API_KEY);

        if (typeof storedApiKey !== "string") {
            return "";
        }

        return storedApiKey.trim();
    }

    function getConfiguredContentRating() {
        var storedContentRating = birc.store.get(STORE_KEY_CONTENT_RATING);

        if (isAllowedContentRating(storedContentRating)) {
            return storedContentRating;
        }

        return DEFAULT_CONTENT_RATING;
    }

    function getConfiguredResultCount() {
        var storedResultCount = birc.store.get(STORE_KEY_RESULT_COUNT);
        var numericResultCount = Number(storedResultCount);

        if (!Number.isInteger(numericResultCount)) {
            return DEFAULT_RESULT_COUNT;
        }

        if (numericResultCount < 1) {
            return DEFAULT_RESULT_COUNT;
        }

        if (numericResultCount > MAXIMUM_RESULT_COUNT) {
            return DEFAULT_RESULT_COUNT;
        }

        return numericResultCount;
    }

    function getConfiguredContextPolicy() {
        var storedContextPolicy = birc.store.get(STORE_KEY_CONTEXT_POLICY);

        if (storedContextPolicy === CONTEXT_POLICY_ANYWHERE) {
            return CONTEXT_POLICY_ANYWHERE;
        }

        return CONTEXT_POLICY_STRICT;
    }

    function isAllowedContentRating(contentRating) {
        switch (contentRating) {
            case "g":
                return true;
            case "pg":
                return true;
            case "pg-13":
                return true;
            case "r":
                return true;
            default:
                return false;
        }
    }

    /*
     * Returns the target for the command, or an empty string when the command
     * was run somewhere that cannot send a message.
     */
    function getCommandTarget(commandEvent) {
        if (commandEvent) {
            if (typeof commandEvent.target === "string" && commandEvent.target.length > 0) {
                return commandEvent.target;
            }
        }

        if (typeof birc.target === "string") {
            return birc.target;
        }

        return "";
    }

    /*
     * A search belongs to the network and conversation where it was started.
     * Keeping both values prevents identically named channels on two networks
     * from sharing a result set.
     */
    function getCommandContext(commandEvent) {
        var network = "";

        if (commandEvent) {
            if (typeof commandEvent.network === "string") {
                network = commandEvent.network;
            }
        }

        return {
            network: network,
            target: getCommandTarget(commandEvent)
        };
    }

    function commandContextMatchesSearch(commandEvent) {
        var commandContext;

        if (getConfiguredContextPolicy() === CONTEXT_POLICY_ANYWHERE) {
            return true;
        }

        if (currentSearch.context === null) {
            return false;
        }

        commandContext = getCommandContext(commandEvent);

        if (commandContext.network !== currentSearch.context.network) {
            return false;
        }

        if (commandContext.target !== currentSearch.context.target) {
            return false;
        }

        return true;
    }

    function requireMatchingSearchContext(commandEvent) {
        if (commandContextMatchesSearch(commandEvent)) {
            return true;
        }

        printGiphyStatus(
            "The current results belong to another conversation. " +
            "Run a search here, or use /gif config context anywhere to allow cross-conversation use."
        );
        return false;
    }

    function splitFirstWord(input) {
        var trimmedInput = input.trim();
        var firstSpaceIndex = trimmedInput.indexOf(" ");

        if (firstSpaceIndex === -1) {
            return {
                word: trimmedInput,
                remainder: ""
            };
        }

        return {
            word: trimmedInput.slice(0, firstSpaceIndex),
            remainder: trimmedInput.slice(firstSpaceIndex + 1).trim()
        };
    }

    function maskApiKey(apiKey) {
        if (apiKey.length < 9) {
            return "configured";
        }

        return apiKey.slice(0, 4) + "…" + apiKey.slice(-4);
    }

    function buildGiphySearchUrl(apiKey, query, contentRating, resultCount, offset) {
        var parameters = [];

        parameters.push("api_key=" + encodeURIComponent(apiKey));
        parameters.push("q=" + encodeURIComponent(query));
        parameters.push("rating=" + encodeURIComponent(contentRating));
        parameters.push("limit=" + encodeURIComponent(String(resultCount)));
        parameters.push("offset=" + encodeURIComponent(String(offset)));
        parameters.push("lang=en");
        parameters.push("bundle=messaging_non_clips");

        return GIPHY_SEARCH_ENDPOINT + "?" + parameters.join("&");
    }

    function buildGiphyRandomUrl(apiKey, query, contentRating) {
        var parameters = [];

        parameters.push("api_key=" + encodeURIComponent(apiKey));
        parameters.push("tag=" + encodeURIComponent(query));
        parameters.push("rating=" + encodeURIComponent(contentRating));

        return GIPHY_RANDOM_ENDPOINT + "?" + parameters.join("&");
    }

    /*
     * Returns parsed JSON in a successful result. Malformed provider data is
     * converted at this boundary instead of leaking an exception to callers.
     */
    function parseProviderResponse(responseText) {
        var parsedResponse;

        try {
            parsedResponse = JSON.parse(responseText);
        } catch (error) {
            return failedResult("GIPHY returned a response that was not valid JSON.");
        }

        return successfulResult(parsedResponse);
    }

    /*
     * Returns the untouched HTTPS URL for one rendition, or an empty string
     * when that rendition is unavailable or unsafe to load.
     */
    function getGiphyRenditionUrl(providerItem, renditionName) {
        var rendition;

        if (!providerItem.images) {
            return "";
        }

        rendition = providerItem.images[renditionName];

        if (!rendition) {
            return "";
        }

        if (typeof rendition.url !== "string") {
            return "";
        }

        if (rendition.url.indexOf("https://") !== 0) {
            return "";
        }

        return rendition.url;
    }

    /*
     * Returns a normalized GIF result, or null when the provider item lacks a
     * public page URL or a usable HTTPS media URL.
     */
    function normalizeGiphyItem(providerItem) {
        var previewUrl = "";
        var sendUrl = "";
        var title = "Untitled GIF";

        if (!providerItem) {
            return null;
        }

        if (typeof providerItem.url !== "string") {
            return null;
        }

        if (providerItem.url.indexOf("https://") !== 0) {
            return null;
        }

        previewUrl = getGiphyRenditionUrl(providerItem, "fixed_height");
        sendUrl = getGiphyRenditionUrl(providerItem, "original");

        if (previewUrl.length === 0) {
            previewUrl = sendUrl;
        }

        if (sendUrl.length === 0) {
            sendUrl = previewUrl;
        }

        if (previewUrl.indexOf("https://") !== 0) {
            return null;
        }

        if (sendUrl.indexOf("https://") !== 0) {
            return null;
        }

        if (typeof providerItem.title === "string") {
            if (providerItem.title.trim().length > 0) {
                title = providerItem.title.trim();
            }
        }

        return {
            title: title,
            pageUrl: providerItem.url,
            previewUrl: previewUrl,
            sendUrl: sendUrl
        };
    }

    function normalizeGiphyItems(providerItems) {
        var normalizedItems = [];
        var providerItemIndex;
        var normalizedItem;

        if (!Array.isArray(providerItems)) {
            return normalizedItems;
        }

        for (providerItemIndex = 0; providerItemIndex < providerItems.length; providerItemIndex += 1) {
            normalizedItem = normalizeGiphyItem(providerItems[providerItemIndex]);

            if (normalizedItem !== null) {
                normalizedItems.push(normalizedItem);
            }
        }

        return normalizedItems;
    }

    function getProviderErrorMessage(providerResponse, httpStatus) {
        var providerMessage = "";

        if (providerResponse) {
            if (providerResponse.meta) {
                if (typeof providerResponse.meta.msg === "string") {
                    providerMessage = providerResponse.meta.msg.trim();
                }
            }
        }

        if (providerMessage.length > 0) {
            return "GIPHY request failed (" + httpStatus + "): " + providerMessage;
        }

        return "GIPHY request failed with HTTP status " + httpStatus + ".";
    }

    /*
     * Returns normalized GIFs and pagination in a successful result, or a
     * failed result when the HTTP or provider response is unusable.
     */
    function interpretGiphySearchResponse(fetchResponse) {
        var parsedResponseResult;
        var providerResponse;
        var normalizedItems;
        var nextOffset = 0;

        if (!fetchResponse) {
            return failedResult("GIPHY returned no response.");
        }

        parsedResponseResult = parseProviderResponse(fetchResponse.text);

        if (!parsedResponseResult.succeeded) {
            return parsedResponseResult;
        }

        providerResponse = parsedResponseResult.value;

        if (fetchResponse.status < 200 || fetchResponse.status > 299) {
            return failedResult(getProviderErrorMessage(providerResponse, fetchResponse.status));
        }

        if (!Array.isArray(providerResponse.data)) {
            return failedResult("GIPHY returned an unexpected search response.");
        }

        normalizedItems = normalizeGiphyItems(providerResponse.data);

        if (providerResponse.pagination) {
            if (Number.isInteger(providerResponse.pagination.offset)) {
                if (Number.isInteger(providerResponse.pagination.count)) {
                    nextOffset = providerResponse.pagination.offset + providerResponse.pagination.count;
                }
            }
        }

        return successfulResult({
            items: normalizedItems,
            nextOffset: nextOffset
        });
    }

    function interpretGiphyRandomResponse(fetchResponse) {
        var parsedResponseResult;
        var providerResponse;
        var normalizedItem;

        if (!fetchResponse) {
            return failedResult("GIPHY returned no response.");
        }

        parsedResponseResult = parseProviderResponse(fetchResponse.text);

        if (!parsedResponseResult.succeeded) {
            return parsedResponseResult;
        }

        providerResponse = parsedResponseResult.value;

        if (fetchResponse.status < 200 || fetchResponse.status > 299) {
            return failedResult(getProviderErrorMessage(providerResponse, fetchResponse.status));
        }

        normalizedItem = normalizeGiphyItem(providerResponse.data);

        if (normalizedItem === null) {
            return failedResult("GIPHY did not return a usable GIF.");
        }

        return successfulResult(normalizedItem);
    }

    function printSearchResults(query, results) {
        var resultIndex;
        var displayNumber;

        printGiphyStatus("Results for \"" + query + "\":");

        for (resultIndex = 0; resultIndex < results.length; resultIndex += 1) {
            displayNumber = resultIndex + 1;
            birc.print(
                displayNumber + ". " +
                results[resultIndex].title + " — " +
                results[resultIndex].previewUrl
            );
        }

        printGiphyStatus("Powered by GIPHY");
        printGiphyStatus("Use /gif send <number>, /gif more, or /gif cancel.");
    }

    function searchGiphy(query, context, offset) {
        var apiKey = getConfiguredApiKey();
        var contentRating = getConfiguredContentRating();
        var resultCount = getConfiguredResultCount();
        var searchUrl;

        if (apiKey.length === 0) {
            printGiphyStatus("No API key is configured. Run /gif config key <key>.");
            return;
        }

        if (query.length === 0) {
            printGiphyStatus("Usage: /gif <search terms>");
            return;
        }

        if (query.length > MAXIMUM_SEARCH_QUERY_LENGTH) {
            printGiphyStatus("Search terms must be 50 characters or fewer.");
            return;
        }

        searchUrl = buildGiphySearchUrl(apiKey, query, contentRating, resultCount, offset);
        printGiphyStatus("Searching for \"" + query + "\"…");

        birc.fetch(searchUrl).then(function handleGiphySearchFetchResponse(fetchResponse) {
            var interpretedResponse = interpretGiphySearchResponse(fetchResponse);

            if (!interpretedResponse.succeeded) {
                printGiphyStatus(interpretedResponse.error);
                return;
            }

            if (interpretedResponse.value.items.length === 0) {
                printGiphyStatus("No usable GIFs were found for \"" + query + "\".");
                return;
            }

            currentSearch.query = query;
            currentSearch.nextOffset = interpretedResponse.value.nextOffset;
            currentSearch.results = interpretedResponse.value.items;
            currentSearch.context = context;

            printSearchResults(query, currentSearch.results);
        }).catch(function handleGiphySearchFetchFailure(error) {
            console.error("GIPHY search request failed", error);
            printGiphyStatus("The GIPHY request could not be completed. Confirm HTTPS access is enabled for this script.");
        });
    }

    function sendSelectedGif(selectionText, commandEvent) {
        var selectionNumber = Number(selectionText);
        var resultIndex;
        var selectedResult;
        var target;

        if (currentSearch.results.length === 0) {
            printGiphyStatus("There are no current results. Run /gif <search terms> first.");
            return;
        }

        if (!requireMatchingSearchContext(commandEvent)) {
            return;
        }

        if (!Number.isInteger(selectionNumber)) {
            printGiphyStatus("Choose a result number shown by the latest search.");
            return;
        }

        resultIndex = selectionNumber - 1;

        if (resultIndex < 0 || resultIndex >= currentSearch.results.length) {
            printGiphyStatus("Choose a number from 1 to " + currentSearch.results.length + ".");
            return;
        }

        target = currentSearch.context.target;

        if (target.length === 0) {
            printGiphyStatus("Open a channel or query before sending a GIF.");
            return;
        }

        selectedResult = currentSearch.results[resultIndex];
        birc.say(target, selectedResult.sendUrl);
        printGiphyStatus("Sent \"" + selectedResult.title + "\" to " + target + ".");
    }

    function sendRandomGif(query, commandEvent) {
        var apiKey = getConfiguredApiKey();
        var contentRating = getConfiguredContentRating();
        var target = getCommandTarget(commandEvent);
        var randomUrl;

        if (apiKey.length === 0) {
            printGiphyStatus("No API key is configured. Run /gif config key <key>.");
            return;
        }

        if (query.length === 0) {
            printGiphyStatus("Usage: /gif random <search terms>");
            return;
        }

        if (query.length > MAXIMUM_SEARCH_QUERY_LENGTH) {
            printGiphyStatus("Search terms must be 50 characters or fewer.");
            return;
        }

        if (target.length === 0) {
            printGiphyStatus("Open a channel or query before sending a GIF.");
            return;
        }

        randomUrl = buildGiphyRandomUrl(apiKey, query, contentRating);
        printGiphyStatus("Finding a random GIF for \"" + query + "\"…");

        birc.fetch(randomUrl).then(function handleGiphyRandomFetchResponse(fetchResponse) {
            var interpretedResponse = interpretGiphyRandomResponse(fetchResponse);

            if (!interpretedResponse.succeeded) {
                printGiphyStatus(interpretedResponse.error);
                return;
            }

            birc.say(target, interpretedResponse.value.sendUrl);
            printGiphyStatus("Sent \"" + interpretedResponse.value.title + "\" to " + target + ".");
            printGiphyStatus("Powered by GIPHY");
        }).catch(function handleGiphyRandomFetchFailure(error) {
            console.error("GIPHY random request failed", error);
            printGiphyStatus("The GIPHY request could not be completed. Confirm HTTPS access is enabled for this script.");
        });
    }

    function showConfiguration() {
        var apiKey = getConfiguredApiKey();
        var displayedApiKey = "not configured";

        if (apiKey.length > 0) {
            displayedApiKey = maskApiKey(apiKey);
        }

        printGiphyStatus("API key: " + displayedApiKey);
        printGiphyStatus("Content rating: " + getConfiguredContentRating());
        printGiphyStatus("Results per search: " + getConfiguredResultCount());
        printGiphyStatus("Search context policy: " + getConfiguredContextPolicy());
    }

    function configureApiKey(apiKey) {
        if (apiKey.length === 0) {
            printGiphyStatus("Usage: /gif config key <key>");
            return;
        }

        if (apiKey.indexOf(" ") !== -1) {
            printGiphyStatus("The API key must not contain spaces.");
            return;
        }

        birc.store.set(STORE_KEY_API_KEY, apiKey);
        printGiphyStatus("API key saved as " + maskApiKey(apiKey) + ".");
        printGiphyStatus("Run /gif config test to verify it.");
    }

    function configureContentRating(contentRating) {
        var normalizedContentRating = contentRating.toLowerCase();

        if (!isAllowedContentRating(normalizedContentRating)) {
            printGiphyStatus("Rating must be g, pg, pg-13, or r.");
            return;
        }

        birc.store.set(STORE_KEY_CONTENT_RATING, normalizedContentRating);
        printGiphyStatus("Content rating saved as " + normalizedContentRating + ".");
    }

    function configureResultCount(resultCountText) {
        var resultCount = Number(resultCountText);

        if (!Number.isInteger(resultCount)) {
            printGiphyStatus("Result count must be a whole number from 1 to " + MAXIMUM_RESULT_COUNT + ".");
            return;
        }

        if (resultCount < 1 || resultCount > MAXIMUM_RESULT_COUNT) {
            printGiphyStatus("Result count must be from 1 to " + MAXIMUM_RESULT_COUNT + ".");
            return;
        }

        birc.store.set(STORE_KEY_RESULT_COUNT, resultCount);
        printGiphyStatus("Results per search saved as " + resultCount + ".");
    }

    function configureContextPolicy(contextPolicy) {
        var normalizedContextPolicy = contextPolicy.toLowerCase();

        if (
            normalizedContextPolicy !== CONTEXT_POLICY_STRICT &&
            normalizedContextPolicy !== CONTEXT_POLICY_ANYWHERE
        ) {
            printGiphyStatus("Context policy must be strict or anywhere.");
            return;
        }

        birc.store.set(STORE_KEY_CONTEXT_POLICY, normalizedContextPolicy);
        printGiphyStatus("Search context policy saved as " + normalizedContextPolicy + ".");
    }

    function testConfiguredApiKey() {
        var apiKey = getConfiguredApiKey();
        var testUrl;

        if (apiKey.length === 0) {
            printGiphyStatus("No API key is configured. Run /gif config key <key>.");
            return;
        }

        testUrl = buildGiphySearchUrl(apiKey, "success", "g", 1, 0);
        printGiphyStatus("Testing the configured API key…");

        birc.fetch(testUrl).then(function handleConfigurationTestFetchResponse(fetchResponse) {
            var interpretedResponse = interpretGiphySearchResponse(fetchResponse);

            if (!interpretedResponse.succeeded) {
                printGiphyStatus(interpretedResponse.error);
                return;
            }

            printGiphyStatus("The API key works.");
        }).catch(function handleConfigurationTestFetchFailure(error) {
            console.error("GIPHY configuration test failed", error);
            printGiphyStatus("The test request could not be completed. Confirm HTTPS access is enabled for this script.");
        });
    }

    function clearConfiguration(configurationName) {
        switch (configurationName) {
            case "key":
                birc.store.delete(STORE_KEY_API_KEY);
                printGiphyStatus("The stored API key was deleted.");
                return;
            case "all":
                birc.store.delete(STORE_KEY_API_KEY);
                birc.store.delete(STORE_KEY_CONTENT_RATING);
                birc.store.delete(STORE_KEY_RESULT_COUNT);
                birc.store.delete(STORE_KEY_CONTEXT_POLICY);
                printGiphyStatus("All GIPHY configuration was deleted.");
                return;
            default:
                printGiphyStatus("Usage: /gif config clear <key|all>");
                return;
        }
    }

    function handleConfigurationCommand(argumentsText) {
        var configurationArguments = splitFirstWord(argumentsText);
        var configurationAction = configurationArguments.word.toLowerCase();
        var configurationValue = configurationArguments.remainder;

        switch (configurationAction) {
            case "key":
                configureApiKey(configurationValue);
                return;
            case "rating":
                configureContentRating(configurationValue);
                return;
            case "results":
                configureResultCount(configurationValue);
                return;
            case "context":
                configureContextPolicy(configurationValue);
                return;
            case "show":
                showConfiguration();
                return;
            case "test":
                testConfiguredApiKey();
                return;
            case "clear":
                clearConfiguration(configurationValue.toLowerCase());
                return;
            default:
                printGiphyStatus("Configuration commands: key, rating, results, context, show, test, clear.");
                return;
        }
    }

    function showGiphyHelp() {
        printGiphyStatus("bIRC GIPHY Search help");
        printGiphyStatus("SETUP");
        printGiphyStatus("1. Create an API key at https://developers.giphy.com/");
        printGiphyStatus("2. Allow HTTPS access for this script in bIRC.");
        printGiphyStatus("3. Save the key with /gif config key <key>");
        printGiphyStatus("4. Verify it with /gif config test");
        printGiphyStatus("SEARCH AND SEND");
        printGiphyStatus("/gif <terms> — search GIPHY and preview numbered results locally");
        printGiphyStatus("/gif send <number> — send one result; strict mode requires the search conversation");
        printGiphyStatus("/gif more — fetch the next page; strict mode requires the search conversation");
        printGiphyStatus("/gif random <terms> — immediately send a random matching GIF");
        printGiphyStatus("/gif cancel — discard the current results");
        printGiphyStatus("/gif help — print this complete guide");
        printGiphyStatus("EXAMPLES");
        printGiphyStatus("/gif excited penguin");
        printGiphyStatus("/gif send 2");
        printGiphyStatus("/gif more");
        printGiphyStatus("/gif random celebration");
        printGiphyStatus("/gif cancel");
        printGiphyStatus("CONFIGURATION");
        printGiphyStatus("/gif config key <key> — persist the GIPHY API key");
        printGiphyStatus("/gif config rating <g|pg|pg-13|r> — set the content ceiling; default pg-13");
        printGiphyStatus("/gif config results <1-10> — set previews per page; default 3");
        printGiphyStatus("/gif config context <strict|anywhere> — restrict result use to its search context; default strict");
        printGiphyStatus("/gif config show — show configuration with the API key masked");
        printGiphyStatus("/gif config test — verify the stored key and HTTPS access");
        printGiphyStatus("/gif config clear key — delete only the stored API key");
        printGiphyStatus("/gif config clear all — restore every setting to its default");
        printGiphyStatus("Configuration examples: /gif config rating pg; /gif config results 5; /gif config context strict");
        printGiphyStatus("NOTES");
        printGiphyStatus("Search terms are limited to 50 characters and are sent to GIPHY.");
        printGiphyStatus("Enable inline images in bIRC to see animated previews.");
        printGiphyStatus("Configuration persists per script; bIRC does not document the store as encrypted.");
        printGiphyStatus("The API key is sent to GIPHY in HTTPS request URLs. Never paste it into IRC.");
        printGiphyStatus("bIRC uses the IRC profile's proxy for script requests when one is configured.");
        printGiphyStatus("Powered by GIPHY");
    }

    function handleGiphyCommand(argumentsText, commandEvent) {
        var commandArguments = splitFirstWord(argumentsText);
        var action = commandArguments.word.toLowerCase();
        var actionArguments = commandArguments.remainder;
        var commandContext = getCommandContext(commandEvent);

        if (argumentsText.trim().length === 0) {
            showGiphyHelp();
            return;
        }

        switch (action) {
            case "config":
                handleConfigurationCommand(actionArguments);
                return;
            case "send":
                sendSelectedGif(actionArguments, commandEvent);
                return;
            case "more":
                if (currentSearch.query.length === 0) {
                    printGiphyStatus("There is no search to continue.");
                    return;
                }

                if (!requireMatchingSearchContext(commandEvent)) {
                    return;
                }

                searchGiphy(currentSearch.query, currentSearch.context, currentSearch.nextOffset);
                return;
            case "random":
                sendRandomGif(actionArguments, commandEvent);
                return;
            case "cancel":
                currentSearch.query = "";
                currentSearch.nextOffset = 0;
                currentSearch.results = [];
                currentSearch.context = null;
                printGiphyStatus("The current GIF results were discarded.");
                return;
            case "help":
                showGiphyHelp();
                return;
            default:
                searchGiphy(argumentsText.trim(), commandContext, 0);
                return;
        }
    }

    birc.onCommand("gif", handleGiphyCommand);

    birc.onComplete(function completeGiphyCommand(word) {
        var candidates = [
            "config",
            "send",
            "more",
            "random",
            "cancel",
            "help"
        ];
        var matchingCandidates = [];
        var candidateIndex;

        for (candidateIndex = 0; candidateIndex < candidates.length; candidateIndex += 1) {
            if (candidates[candidateIndex].indexOf(word.toLowerCase()) === 0) {
                matchingCandidates.push(candidates[candidateIndex]);
            }
        }

        return matchingCandidates;
    });

    birc.on("load", function announceGiphyScriptLoad() {
        if (getConfiguredApiKey().length === 0) {
            printGiphyStatus("Loaded. Configure an API key with /gif config key <key>.");
            return;
        }

        printGiphyStatus("Loaded. Run /gif help for commands.");
    });
}());
