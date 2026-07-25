/*
 * bIRC Text Art
 *
 * /ascii searches MIT-licensed text art and can send a selected item.
 * /ansi searches ANSI-scene pack metadata and returns gallery links only.
 *
 * Import this one file in bIRC's Scripts window and enable HTTPS access.
 *
 * Script ID: com.github.aipokalyptik.birc-utils.text-art
 * Script version: 1.0.0
 */

(function registerBircTextArtScript() {
    "use strict";

    var SCRIPT_ID = "com.github.aipokalyptik.birc-utils.text-art";
    var SCRIPT_VERSION = "1.0.0";
    var SCRIPT_UPDATE_PAGE_URL =
        "https://github.com/aipokalyptik/birc-utils/tree/main/text-art";
    var SCRIPT_UPDATE_FILE_URL =
        "https://github.com/aipokalyptik/birc-utils/blob/main/text-art/birc-text-art.js";
    var SCRIPT_RELEASE_TAG_PREFIX = "birc-utils-text-art-v";
    var SCRIPT_COMPARE_URL_PREFIX =
        "https://github.com/aipokalyptik/birc-utils/compare/";
    var SCRIPT_FILE_DIFF_ANCHOR =
        "#diff-8465d84d4f6d24e901c2be6be07b7434538eab8f60d9b29edfa69c2d5b6ca195";
    var UPDATE_MANIFEST_URL =
        "https://raw.githubusercontent.com/aipokalyptik/birc-utils/main/updates.json";
    var UPDATE_CACHE_KEY = "bircUtils.updateCheck.v1";
    var UPDATE_CHECK_INTERVAL_MILLISECONDS = 24 * 60 * 60 * 1000;

    var ASCII_INDEX_URL =
        "https://raw.githubusercontent.com/rxolve/artscii/main/arts/index.json";
    var ASCII_FILE_BASE_URL =
        "https://raw.githubusercontent.com/rxolve/artscii/main/arts/";
    var ASCII_SOURCE_URL = "https://github.com/rxolve/artscii";
    var ANSI_API_URL = "https://api.16colo.rs/v1/pack/";
    var ANSI_SITE_URL = "https://16colo.rs";

    var ASCII_INDEX_STORE_KEY = "ascii.artscii.index.v1";
    var ASCII_CONTENT_STORE_PREFIX = "ascii.artscii.content.v1.";
    var ANSI_QUERY_STORE_PREFIX = "ansi.16colors.query.v1.";
    var CONTEXT_POLICY_STORE_KEY = "configuration.contextPolicy";
    var CONTEXT_POLICY_STRICT = "strict";
    var CONTEXT_POLICY_ANYWHERE = "anywhere";

    var SEARCH_RESULT_LIMIT = 8;
    var ANSI_RESULT_LIMIT = 8;
    var MAXIMUM_QUERY_LENGTH = 80;
    var MAXIMUM_ASCII_WIDTH = 80;
    var MAXIMUM_ASCII_LINES = 20;
    var MAXIMUM_IRC_LINE_LENGTH = 350;

    var currentAsciiSearch = emptySearch();
    var currentAnsiSearch = emptySearch();
    var asciiIndexRequestInProgress = false;
    var ansiRequestsInProgress = {};

    function parseSemanticVersion(version) {
        var match;

        if (typeof version !== "string") {
            return null;
        }

        match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version);
        if (match === null) {
            return null;
        }

        return [Number(match[1]), Number(match[2]), Number(match[3])];
    }

    function isNewerScriptVersion(candidateVersion) {
        var candidate = parseSemanticVersion(candidateVersion);
        var installed = parseSemanticVersion(SCRIPT_VERSION);
        var partIndex;

        if (candidate === null || installed === null) {
            return false;
        }

        for (partIndex = 0; partIndex < installed.length; partIndex += 1) {
            if (candidate[partIndex] > installed[partIndex]) {
                return true;
            }

            if (candidate[partIndex] < installed[partIndex]) {
                return false;
            }
        }

        return false;
    }

    function readUpdateCache() {
        var storedCache = birc.store.get(UPDATE_CACHE_KEY);

        if (!storedCache || typeof storedCache !== "object") {
            return {
                lastAttemptAt: 0,
                latestVersion: ""
            };
        }

        if (typeof storedCache.latestVersion !== "string") {
            storedCache.latestVersion = "";
        }

        return {
            lastAttemptAt: Number(storedCache.lastAttemptAt) || 0,
            latestVersion: storedCache.latestVersion
        };
    }

    function reportAvailableScriptUpdate(latestVersion) {
        var comparisonUrl = SCRIPT_COMPARE_URL_PREFIX +
            SCRIPT_RELEASE_TAG_PREFIX + SCRIPT_VERSION + "..." +
            SCRIPT_RELEASE_TAG_PREFIX + latestVersion + SCRIPT_FILE_DIFF_ANCHOR;

        birc.print(
            "[Text art] Update available for " + SCRIPT_ID + ": installed " +
            SCRIPT_VERSION + ", current " + latestVersion + "."
        );
        birc.print("[Text art] Canonical update file: " + SCRIPT_UPDATE_FILE_URL);
        birc.print(
            "[Text art] Changes since the installed version: " + comparisonUrl +
            " (opens at text-art/birc-text-art.js)."
        );
        birc.print(
            "[Text art] Update instructions: open the canonical file URL, " +
            "review the file, click Raw, and copy the entire file. In bIRC open " +
            "Scripts with ⌘⌥S, replace this script's contents, and save. " +
            "Documentation: " + SCRIPT_UPDATE_PAGE_URL
        );
    }

    function checkForScriptUpdate() {
        var cache = readUpdateCache();
        var now;
        var reportedVersion = "";

        if (isNewerScriptVersion(cache.latestVersion)) {
            reportedVersion = cache.latestVersion;
            reportAvailableScriptUpdate(cache.latestVersion);
        }

        now = Date.now();
        if (now - cache.lastAttemptAt < UPDATE_CHECK_INTERVAL_MILLISECONDS) {
            return;
        }

        cache.lastAttemptAt = now;
        birc.store.set(UPDATE_CACHE_KEY, cache);

        birc.fetch(UPDATE_MANIFEST_URL).then(function handleUpdateResponse(response) {
            var manifest;
            var latestVersion;

            if (!response || response.status < 200 || response.status > 299) {
                throw new Error("update manifest returned a non-success status");
            }

            if (typeof response.text !== "string" || response.text.length > 65536) {
                throw new Error("update manifest has an invalid size");
            }

            manifest = JSON.parse(response.text);
            if (!manifest || manifest.schemaVersion !== 1 || !manifest.scripts) {
                throw new Error("update manifest has an unsupported format");
            }

            latestVersion = manifest.scripts[SCRIPT_ID];
            if (parseSemanticVersion(latestVersion) === null) {
                throw new Error("update manifest has no valid entry for this script");
            }

            cache.latestVersion = latestVersion;
            birc.store.set(UPDATE_CACHE_KEY, cache);

            if (
                isNewerScriptVersion(latestVersion) &&
                latestVersion !== reportedVersion
            ) {
                reportAvailableScriptUpdate(latestVersion);
            }
        }).catch(function handleUpdateFailure(error) {
            console.info("Text art update check was not completed", error);
        });
    }

    function emptySearch() {
        return {
            query: "",
            results: [],
            context: null
        };
    }

    function printAscii(message) {
        birc.print("[ASCII] " + message);
    }

    function printAnsi(message) {
        birc.print("[ANSI] " + message);
    }

    function splitFirstWord(text) {
        var trimmedText = text.trim();
        var firstSpaceIndex = trimmedText.indexOf(" ");

        if (firstSpaceIndex === -1) {
            return {
                word: trimmedText,
                remainder: ""
            };
        }

        return {
            word: trimmedText.slice(0, firstSpaceIndex),
            remainder: trimmedText.slice(firstSpaceIndex + 1).trim()
        };
    }

    function normalizeQuery(query) {
        var normalizedQuery = query;

        if (typeof normalizedQuery.normalize === "function") {
            normalizedQuery = normalizedQuery.normalize("NFKC");
        }

        return normalizedQuery.toLowerCase().replace(/\s+/g, " ").trim();
    }

    function getCommandTarget(commandEvent) {
        if (commandEvent && typeof commandEvent.target === "string") {
            if (commandEvent.target.length > 0) {
                return commandEvent.target;
            }
        }

        if (typeof birc.target === "string") {
            return birc.target;
        }

        return "";
    }

    function getCommandContext(commandEvent) {
        var network = "";

        if (commandEvent && typeof commandEvent.network === "string") {
            network = commandEvent.network;
        }

        return {
            network: network,
            target: getCommandTarget(commandEvent)
        };
    }

    function getContextPolicy() {
        if (birc.store.get(CONTEXT_POLICY_STORE_KEY) === CONTEXT_POLICY_ANYWHERE) {
            return CONTEXT_POLICY_ANYWHERE;
        }

        return CONTEXT_POLICY_STRICT;
    }

    function contextsMatch(firstContext, secondContext) {
        if (getContextPolicy() === CONTEXT_POLICY_ANYWHERE) {
            return true;
        }

        if (firstContext === null || secondContext === null) {
            return false;
        }

        return firstContext.network === secondContext.network &&
            firstContext.target === secondContext.target;
    }

    function requireSearchContext(search, commandEvent, printStatus) {
        if (contextsMatch(search.context, getCommandContext(commandEvent))) {
            return true;
        }

        printStatus(
            "Those results belong to another network or conversation. " +
            "Search here first, or use /ascii config context anywhere."
        );
        return false;
    }

    function validateQuery(query, printStatus) {
        if (query.length === 0) {
            printStatus("Supply one or more search terms.");
            return false;
        }

        if (query.length > MAXIMUM_QUERY_LENGTH) {
            printStatus("Search terms must be 80 characters or fewer.");
            return false;
        }

        if (/[\u0000-\u001f\u007f]/.test(query)) {
            printStatus("Search terms cannot contain control characters.");
            return false;
        }

        return true;
    }

    function isSafeAsciiIndexItem(item) {
        var textFields;
        var fieldIndex;
        var tagIndex;

        if (!item || typeof item !== "object") {
            return false;
        }

        if (typeof item.id !== "string" || !/^[a-z0-9_-]+$/i.test(item.id)) {
            return false;
        }

        if (typeof item.name !== "string" || item.name.length === 0) {
            return false;
        }

        if (typeof item.file !== "string") {
            return false;
        }

        if (!/^[a-z0-9_/-]+\.txt$/i.test(item.file) || item.file.indexOf("..") !== -1) {
            return false;
        }

        if (!Array.isArray(item.tags)) {
            return false;
        }

        textFields = [item.id, item.name, item.file];

        if (typeof item.description === "string") {
            textFields.push(item.description);
        }

        if (typeof item.category === "string") {
            textFields.push(item.category);
        }

        for (fieldIndex = 0; fieldIndex < textFields.length; fieldIndex += 1) {
            if (/[\u0000-\u001f\u007f]/.test(textFields[fieldIndex])) {
                return false;
            }
        }

        for (tagIndex = 0; tagIndex < item.tags.length; tagIndex += 1) {
            if (typeof item.tags[tagIndex] !== "string") {
                return false;
            }

            if (/[\u0000-\u001f\u007f]/.test(item.tags[tagIndex])) {
                return false;
            }
        }

        return true;
    }

    function normalizeAsciiIndex(parsedIndex) {
        var normalizedIndex = [];
        var itemIndex;
        var item;
        var description;
        var category;

        if (!Array.isArray(parsedIndex)) {
            return null;
        }

        for (itemIndex = 0; itemIndex < parsedIndex.length; itemIndex += 1) {
            item = parsedIndex[itemIndex];

            if (isSafeAsciiIndexItem(item)) {
                description = "";
                category = "";

                if (typeof item.description === "string") {
                    description = item.description.slice(0, 240);
                }

                if (typeof item.category === "string") {
                    category = item.category.slice(0, 80);
                }

                normalizedIndex.push({
                    id: item.id,
                    name: item.name.slice(0, 100),
                    description: description,
                    category: category,
                    tags: item.tags.slice(0, 30),
                    file: item.file,
                    width: Number(item.width) || 0,
                    height: Number(item.height) || 0
                });
            }
        }

        if (normalizedIndex.length === 0) {
            return null;
        }

        return normalizedIndex;
    }

    function getStoredAsciiIndex() {
        return normalizeAsciiIndex(birc.store.get(ASCII_INDEX_STORE_KEY));
    }

    function fetchAsciiIndex(afterLoad) {
        if (asciiIndexRequestInProgress) {
            printAscii("The ASCII catalog is already being downloaded.");
            return;
        }

        asciiIndexRequestInProgress = true;
        printAscii("Downloading the ASCII catalog for local searches…");

        birc.fetch(ASCII_INDEX_URL).then(function handleIndexResponse(response) {
            var parsedIndex;
            var normalizedIndex;

            asciiIndexRequestInProgress = false;

            if (!response || response.status < 200 || response.status > 299) {
                printAscii("The ASCII catalog request failed.");
                return;
            }

            try {
                parsedIndex = JSON.parse(response.text);
            } catch (error) {
                console.error("Could not parse the Artscii index", error);
                printAscii("The ASCII catalog was not valid JSON.");
                return;
            }

            normalizedIndex = normalizeAsciiIndex(parsedIndex);

            if (normalizedIndex === null) {
                printAscii("The ASCII catalog contained no usable entries.");
                return;
            }

            birc.store.set(ASCII_INDEX_STORE_KEY, normalizedIndex);
            printAscii(
                "Cached " + normalizedIndex.length +
                " catalog entries. Future searches are local."
            );

            if (typeof afterLoad === "function") {
                afterLoad(normalizedIndex);
            }
        }).catch(function handleIndexFailure(error) {
            asciiIndexRequestInProgress = false;
            console.error("Could not download the Artscii index", error);
            printAscii(
                "The ASCII catalog could not be downloaded. " +
                "Confirm HTTPS access is enabled for this script."
            );
        });
    }

    function scoreAsciiItem(item, terms, normalizedQuery) {
        var name = normalizeQuery(item.name);
        var id = normalizeQuery(item.id);
        var category = normalizeQuery(item.category);
        var description = normalizeQuery(item.description);
        var tags = normalizeQuery(item.tags.join(" "));
        var searchableText = name + " " + id + " " + category + " " +
            description + " " + tags;
        var score = 0;
        var termIndex;

        if (name === normalizedQuery || id === normalizedQuery) {
            score += 100;
        }

        if (name.indexOf(normalizedQuery) !== -1) {
            score += 30;
        }

        for (termIndex = 0; termIndex < terms.length; termIndex += 1) {
            if (searchableText.indexOf(terms[termIndex]) === -1) {
                return 0;
            }

            score += 5;

            if (name.indexOf(terms[termIndex]) !== -1) {
                score += 10;
            }

            if (tags.indexOf(terms[termIndex]) !== -1) {
                score += 4;
            }
        }

        return score;
    }

    function findAsciiItems(index, query) {
        var normalizedQuery = normalizeQuery(query);
        var terms = normalizedQuery.split(" ");
        var scoredItems = [];
        var itemIndex;
        var score;

        for (itemIndex = 0; itemIndex < index.length; itemIndex += 1) {
            score = scoreAsciiItem(index[itemIndex], terms, normalizedQuery);

            if (score > 0) {
                scoredItems.push({
                    item: index[itemIndex],
                    score: score
                });
            }
        }

        scoredItems.sort(function compareScores(first, second) {
            if (first.score !== second.score) {
                return second.score - first.score;
            }

            return first.item.name.localeCompare(second.item.name);
        });

        return scoredItems.slice(0, SEARCH_RESULT_LIMIT).map(function removeScore(result) {
            return result.item;
        });
    }

    function printAsciiResults(query, results) {
        var resultIndex;
        var item;

        printAscii("Results for \"" + query + "\":");

        for (resultIndex = 0; resultIndex < results.length; resultIndex += 1) {
            item = results[resultIndex];
            birc.print(
                (resultIndex + 1) + ". " + item.name + " [" +
                item.category + "; " + item.width + "×" + item.height + "] — " +
                item.description
            );
        }

        printAscii(
            "Use /ascii preview <number>, /ascii info <number>, " +
            "/ascii send <number>, or /ascii cancel."
        );
    }

    function searchAscii(query, commandEvent) {
        var normalizedQuery = normalizeQuery(query);
        var storedIndex;

        if (!validateQuery(normalizedQuery, printAscii)) {
            return;
        }

        storedIndex = getStoredAsciiIndex();

        if (storedIndex === null) {
            fetchAsciiIndex(function searchNewIndex(newIndex) {
                completeAsciiSearch(newIndex, normalizedQuery, commandEvent);
            });
            return;
        }

        completeAsciiSearch(storedIndex, normalizedQuery, commandEvent);
    }

    function completeAsciiSearch(index, query, commandEvent) {
        var results = findAsciiItems(index, query);

        if (results.length === 0) {
            printAscii("No catalog entries matched \"" + query + "\".");
            return;
        }

        currentAsciiSearch = {
            query: query,
            results: results,
            context: getCommandContext(commandEvent)
        };
        printAsciiResults(query, results);
    }

    function parseSelection(selectionText, results, printStatus) {
        var selectionNumber = Number(selectionText);

        if (!Number.isInteger(selectionNumber)) {
            printStatus("Choose a result number from the latest search.");
            return null;
        }

        if (selectionNumber < 1 || selectionNumber > results.length) {
            printStatus("Choose a number from 1 to " + results.length + ".");
            return null;
        }

        return results[selectionNumber - 1];
    }

    function requireAsciiSelection(selectionText, commandEvent) {
        if (currentAsciiSearch.results.length === 0) {
            printAscii("There are no current results. Run /ascii search <terms> first.");
            return null;
        }

        if (!requireSearchContext(currentAsciiSearch, commandEvent, printAscii)) {
            return null;
        }

        return parseSelection(selectionText, currentAsciiSearch.results, printAscii);
    }

    function showAsciiInformation(selectionText, commandEvent) {
        var item = requireAsciiSelection(selectionText, commandEvent);

        if (item === null) {
            return;
        }

        printAscii(item.name + " — " + item.description);
        printAscii(
            "Category: " + item.category + "; tags: " + item.tags.join(", ") +
            "; declared size: " + item.width + "×" + item.height + "."
        );
        printAscii("Source: " + ASCII_SOURCE_URL + " (MIT License).");
    }

    function validateAsciiContent(content) {
        var normalizedContent;
        var lines;
        var lineIndex;

        if (typeof content !== "string") {
            return {succeeded: false, error: "The downloaded art was not text."};
        }

        normalizedContent = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

        if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(normalizedContent)) {
            return {succeeded: false, error: "The art contains unsafe control characters."};
        }

        lines = normalizedContent.split("\n");

        while (lines.length > 0 && lines[lines.length - 1].length === 0) {
            lines.pop();
        }

        if (lines.length === 0) {
            return {succeeded: false, error: "The art is empty."};
        }

        if (lines.length > MAXIMUM_ASCII_LINES) {
            return {
                succeeded: false,
                error: "The art has " + lines.length + " lines; the safe limit is " +
                    MAXIMUM_ASCII_LINES + ". It was not cropped or sent."
            };
        }

        for (lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
            if (lines[lineIndex].length > MAXIMUM_ASCII_WIDTH) {
                return {
                    succeeded: false,
                    error: "Line " + (lineIndex + 1) + " is wider than " +
                        MAXIMUM_ASCII_WIDTH + " characters. Nothing was sent."
                };
            }

            if (lines[lineIndex].length > MAXIMUM_IRC_LINE_LENGTH) {
                return {succeeded: false, error: "The art contains an unsafe IRC line."};
            }
        }

        return {
            succeeded: true,
            lines: lines
        };
    }

    function printValidatedAsciiPreview(item, content) {
        var validation = validateAsciiContent(content);
        var lineIndex;

        if (!validation.succeeded) {
            printAscii(validation.error);
            return;
        }

        printAscii(
            "Local preview of " + item.name + " (" + validation.lines.length +
            " lines; nothing will be sent):"
        );

        for (lineIndex = 0; lineIndex < validation.lines.length; lineIndex += 1) {
            birc.print(validation.lines[lineIndex]);
        }

        printAscii("Source: Artscii, MIT License. Use /ascii send <number> to send it.");
    }

    function sendValidatedAscii(item, content, target) {
        var validation = validateAsciiContent(content);
        var lineIndex;

        if (!validation.succeeded) {
            printAscii(validation.error);
            return;
        }

        for (lineIndex = 0; lineIndex < validation.lines.length; lineIndex += 1) {
            birc.say(target, validation.lines[lineIndex]);
        }

        printAscii(
            "Sent " + item.name + " (" + validation.lines.length +
            " lines) to " + target + ". Source: Artscii, MIT License."
        );
    }

    function loadAsciiContent(item, afterLoad) {
        var contentStoreKey;
        var cachedContent;
        var contentUrl;

        contentStoreKey = ASCII_CONTENT_STORE_PREFIX + item.id;
        cachedContent = birc.store.get(contentStoreKey);

        if (typeof cachedContent === "string") {
            afterLoad(cachedContent);
            return;
        }

        contentUrl = ASCII_FILE_BASE_URL + item.file;
        printAscii("Downloading \"" + item.name + "\" once; it will be cached locally.");

        birc.fetch(contentUrl).then(function handleAsciiContentResponse(response) {
            var contentValidation;

            if (!response || response.status < 200 || response.status > 299) {
                printAscii("The selected art could not be downloaded.");
                return;
            }

            /*
             * Validate before storing so malformed or control-bearing responses
             * cannot become durable cache entries.
             */
            contentValidation = validateAsciiContent(response.text);

            if (!contentValidation.succeeded) {
                printAscii(contentValidation.error);
                return;
            }

            birc.store.set(contentStoreKey, response.text);
            afterLoad(response.text);
        }).catch(function handleAsciiContentFailure(error) {
            console.error("Could not download ASCII art", error);
            printAscii("The selected art could not be downloaded.");
        });
    }

    function previewAsciiSelection(selectionText, commandEvent) {
        var item = requireAsciiSelection(selectionText, commandEvent);
        var searchSnapshot;
        var searchContext;

        if (item === null) {
            return;
        }

        searchSnapshot = currentAsciiSearch;
        searchContext = searchSnapshot.context;

        loadAsciiContent(item, function previewLoadedAscii(content) {
            if (currentAsciiSearch !== searchSnapshot) {
                printAscii("The search results changed while the art was downloading.");
                return;
            }

            if (!contextsMatch(searchContext, getCommandContext(commandEvent))) {
                printAscii("The preview context changed while the art was downloading.");
                return;
            }

            printValidatedAsciiPreview(item, content);
        });
    }

    function sendAsciiSelection(selectionText, commandEvent) {
        var item = requireAsciiSelection(selectionText, commandEvent);
        var searchSnapshot;
        var searchContext;
        var target;

        if (item === null) {
            return;
        }

        searchSnapshot = currentAsciiSearch;
        searchContext = searchSnapshot.context;
        target = getCommandTarget(commandEvent);

        if (target.length === 0) {
            printAscii("Open a channel or query before sending ASCII art.");
            return;
        }

        loadAsciiContent(item, function sendLoadedAscii(content) {
            if (currentAsciiSearch !== searchSnapshot) {
                printAscii("The search results changed while the art was downloading.");
                return;
            }

            if (!contextsMatch(searchContext, getCommandContext(commandEvent))) {
                printAscii("The send context changed while the art was downloading.");
                return;
            }

            sendValidatedAscii(item, content, target);
        });
    }

    function encodeStoreKey(text) {
        return encodeURIComponent(text).replace(/\./g, "%2E");
    }

    function normalizeAnsiResponse(parsedResponse) {
        var results;
        var normalizedResults = [];
        var resultIndex;
        var result;
        var groups;
        var groupIndex;

        if (!parsedResponse || !Array.isArray(parsedResponse.results)) {
            return null;
        }

        results = parsedResponse.results;

        for (resultIndex = 0; resultIndex < results.length; resultIndex += 1) {
            result = results[resultIndex];

            if (!result || typeof result.name !== "string") {
                continue;
            }

            if (!/^[a-z0-9_.-]+$/i.test(result.name)) {
                continue;
            }

            groups = [];

            if (Array.isArray(result.groups)) {
                for (groupIndex = 0; groupIndex < result.groups.length; groupIndex += 1) {
                    if (groups.length >= 20) {
                        break;
                    }

                    if (typeof result.groups[groupIndex] !== "string") {
                        continue;
                    }

                    if (!/^[a-z0-9_. -]+$/i.test(result.groups[groupIndex])) {
                        continue;
                    }

                    groups.push(result.groups[groupIndex].slice(0, 80));
                }
            }

            normalizedResults.push({
                name: result.name,
                year: Number(result.year) || 0,
                groups: groups,
                gallery: ANSI_SITE_URL + "/pack/" + encodeURIComponent(result.name)
            });
        }

        return normalizedResults.slice(0, ANSI_RESULT_LIMIT);
    }

    function printAnsiResults(query, results, fromCache) {
        var resultIndex;
        var result;
        var cacheNote = "";
        var yearNote;
        var groupNote;

        if (fromCache) {
            cacheNote = " (local cache)";
        }

        printAnsi("Pack results for \"" + query + "\"" + cacheNote + ":");

        for (resultIndex = 0; resultIndex < results.length; resultIndex += 1) {
            result = results[resultIndex];
            yearNote = "";
            groupNote = "";

            if (result.year > 0) {
                yearNote = " [" + result.year + "]";
            }

            if (result.groups.length > 0) {
                groupNote = " — " + result.groups.join(", ");
            }

            birc.print(
                (resultIndex + 1) + ". " + result.name + yearNote +
                groupNote + " — " + result.gallery
            );
        }

        printAnsi(
            "Discovery only: artwork rights remain with its creator. " +
            "Use /ansi info <number> or /ansi cancel."
        );
    }

    function finishAnsiSearch(query, results, commandEvent, fromCache) {
        if (results.length === 0) {
            printAnsi("No ANSI pack names matched \"" + query + "\".");
            return;
        }

        currentAnsiSearch = {
            query: query,
            results: results,
            context: getCommandContext(commandEvent)
        };
        printAnsiResults(query, results, fromCache);
    }

    function searchAnsi(query, commandEvent) {
        var normalizedQuery = normalizeQuery(query);
        var queryStoreKey;
        var storedResults;
        var normalizedStoredResults;
        var requestUrl;

        if (!validateQuery(normalizedQuery, printAnsi)) {
            return;
        }

        queryStoreKey = ANSI_QUERY_STORE_PREFIX + encodeStoreKey(normalizedQuery);
        storedResults = birc.store.get(queryStoreKey);

        if (Array.isArray(storedResults)) {
            normalizedStoredResults = normalizeAnsiResponse({results: storedResults});

            if (normalizedStoredResults !== null) {
                finishAnsiSearch(
                    normalizedQuery,
                    normalizedStoredResults,
                    commandEvent,
                    true
                );
                return;
            }
        }

        if (ansiRequestsInProgress[normalizedQuery] === true) {
            printAnsi("That ANSI search is already in progress.");
            return;
        }

        ansiRequestsInProgress[normalizedQuery] = true;
        requestUrl = ANSI_API_URL + "?pagesize=" + ANSI_RESULT_LIMIT +
            "&page=1&filter=" + encodeURIComponent(normalizedQuery) +
            "&archive=false&groups=true";
        printAnsi("Searching Sixteen Colors pack metadata…");

        birc.fetch(requestUrl).then(function handleAnsiResponse(response) {
            var parsedResponse;
            var normalizedResults;

            delete ansiRequestsInProgress[normalizedQuery];

            if (!response || response.status < 200 || response.status > 299) {
                printAnsi("The ANSI archive request failed.");
                return;
            }

            try {
                parsedResponse = JSON.parse(response.text);
            } catch (error) {
                console.error("Could not parse Sixteen Colors metadata", error);
                printAnsi("The ANSI archive returned invalid JSON.");
                return;
            }

            normalizedResults = normalizeAnsiResponse(parsedResponse);

            if (normalizedResults === null) {
                printAnsi("The ANSI archive returned an unexpected response.");
                return;
            }

            /*
             * Query results have no automatic expiry. Repeated searches stay
             * local until the user deliberately refreshes or clears the cache.
             */
            birc.store.set(queryStoreKey, normalizedResults);
            finishAnsiSearch(normalizedQuery, normalizedResults, commandEvent, false);
        }).catch(function handleAnsiFailure(error) {
            delete ansiRequestsInProgress[normalizedQuery];
            console.error("Could not search Sixteen Colors", error);
            printAnsi(
                "The ANSI archive could not be reached. " +
                "Confirm HTTPS access is enabled for this script."
            );
        });
    }

    function showAnsiInformation(selectionText, commandEvent) {
        var item;
        var yearNote = "";
        var groupNames = "unknown";

        if (currentAnsiSearch.results.length === 0) {
            printAnsi("There are no current results. Run /ansi search <terms> first.");
            return;
        }

        if (!requireSearchContext(currentAnsiSearch, commandEvent, printAnsi)) {
            return;
        }

        item = parseSelection(selectionText, currentAnsiSearch.results, printAnsi);

        if (item === null) {
            return;
        }

        if (item.year > 0) {
            yearNote = " (" + item.year + ")";
        }

        if (item.groups.length > 0) {
            groupNames = item.groups.join(", ");
        }

        printAnsi(
            item.name + yearNote + "; groups: " + groupNames
        );
        printAnsi("Gallery: " + item.gallery);
        printAnsi(
            "Sixteen Colors is used only for discovery. The individual artwork " +
            "remains the creator's intellectual property and is not sent by this script."
        );
    }

    function handleContextConfiguration(argumentsText, printStatus) {
        var parsedArguments = splitFirstWord(argumentsText);
        var setting = parsedArguments.word.toLowerCase();
        var value = parsedArguments.remainder.toLowerCase();

        if (setting === "show") {
            printStatus("Search context policy: " + getContextPolicy() + ".");
            return;
        }

        if (setting !== "context") {
            printStatus("Usage: config context <strict|anywhere>, or config show");
            return;
        }

        if (value !== CONTEXT_POLICY_STRICT && value !== CONTEXT_POLICY_ANYWHERE) {
            printStatus("Context must be strict or anywhere.");
            return;
        }

        birc.store.set(CONTEXT_POLICY_STORE_KEY, value);
        printStatus("Search context policy set to " + value + ".");

        if (value === CONTEXT_POLICY_ANYWHERE) {
            printStatus(
                "Warning: a selection may now be used outside the conversation " +
                "where its search was performed."
            );
        }
    }

    function handleAsciiCache(argumentsText) {
        var action = argumentsText.trim().toLowerCase();
        var storedIndex = getStoredAsciiIndex();

        if (action === "status") {
            if (storedIndex === null) {
                printAscii("The catalog is not cached. Art files are cached individually.");
            } else {
                printAscii(
                    "The local catalog contains " + storedIndex.length +
                    " entries. Art files are cached individually after first use."
                );
            }
            return;
        }

        if (action === "refresh") {
            fetchAsciiIndex();
            return;
        }

        printAscii("Usage: /ascii cache <status|refresh>");
    }

    function handleAnsiCache(argumentsText, commandEvent) {
        var parsedArguments = splitFirstWord(argumentsText);
        var action = parsedArguments.word.toLowerCase();
        var query = normalizeQuery(parsedArguments.remainder);
        var storeKey;

        if (action === "refresh" && query.length > 0) {
            storeKey = ANSI_QUERY_STORE_PREFIX + encodeStoreKey(query);
            birc.store.delete(storeKey);
            searchAnsi(query, commandEvent);
            return;
        }

        printAnsi(
            "ANSI results are cached indefinitely by query. " +
            "Use /ansi cache refresh <terms> to deliberately repeat one request."
        );
    }

    function showAsciiHelp() {
        printAscii("SEARCH AND SEND");
        printAscii("/ascii search <terms> — search the locally cached Artscii catalog");
        printAscii("/ascii <terms> — shorthand for /ascii search <terms>");
        printAscii(
            "/ascii preview <number> — download if needed and print the art locally"
        );
        printAscii("/ascii info <number> — show metadata, dimensions, source, and license");
        printAscii("/ascii send <number> — validate, cache, and send the selected text art");
        printAscii("/ascii cancel — discard the current results");
        printAscii(
            "Examples: /ascii cat; /ascii preview 1; /ascii info 1; /ascii send 1"
        );
        printAscii("CACHE AND CONFIGURATION");
        printAscii("/ascii cache status — describe the persistent catalog cache");
        printAscii("/ascii cache refresh — deliberately download a fresh catalog");
        printAscii("/ascii config show — show the shared context policy");
        printAscii("/ascii config context <strict|anywhere> — default strict");
        printAscii("SAFETY AND LICENSING");
        printAscii(
            "Only Artscii's MIT-licensed text is sendable. The catalog and each " +
            "validated art file are downloaded once and then stored locally."
        );
        printAscii(
            "Sending is explicit. Art over 80 columns or 20 lines is rejected, " +
            "not cropped. Control-bearing text is rejected."
        );
        printAscii(
            "Strict context means a result can be used only on the same network " +
            "and in the same channel/query where its search began."
        );
        printAscii(
            "Script " + SCRIPT_ID + " version " + SCRIPT_VERSION +
            " checks the public bIRC Utils version manifest at most once per day."
        );
        printAscii("Source and license: " + ASCII_SOURCE_URL);
    }

    function showAnsiHelp() {
        printAnsi("DISCOVERY");
        printAnsi("/ansi search <terms> — search Sixteen Colors pack names");
        printAnsi("/ansi <terms> — shorthand for /ansi search <terms>");
        printAnsi("/ansi info <number> — show the selected pack's gallery and rights note");
        printAnsi("/ansi cancel — discard the current results");
        printAnsi("Examples: /ansi acid; /ansi search blocktronics; /ansi info 1");
        printAnsi("CACHE AND CONFIGURATION");
        printAnsi(
            "/ansi cache refresh <terms> — discard one cached query and repeat it upstream"
        );
        printAnsi("/ansi config show — show the shared context policy");
        printAnsi("/ansi config context <strict|anywhere> — default strict");
        printAnsi("RIGHTS AND SAFETY");
        printAnsi(
            "This command returns metadata and gallery links only. It never " +
            "downloads, converts, or sends ANSI artwork."
        );
        printAnsi(
            "Sixteen Colors says individual artwork remains its creator's " +
            "intellectual property. Public availability is not reuse permission."
        );
        printAnsi(
            "Every distinct query is requested at most once unless you explicitly " +
            "refresh it; cached searches continue to work while the service is unavailable."
        );
        printAnsi(
            "Script " + SCRIPT_ID + " version " + SCRIPT_VERSION +
            " checks the public bIRC Utils version manifest at most once per day."
        );
        printAnsi("Archive: " + ANSI_SITE_URL);
    }

    function handleAsciiCommand(argumentsText, commandEvent) {
        var parsedArguments = splitFirstWord(argumentsText);
        var action = parsedArguments.word.toLowerCase();
        var actionArguments = parsedArguments.remainder;

        if (argumentsText.trim().length === 0 || action === "help") {
            showAsciiHelp();
            return;
        }

        switch (action) {
            case "search":
                searchAscii(actionArguments, commandEvent);
                return;
            case "info":
                showAsciiInformation(actionArguments, commandEvent);
                return;
            case "preview":
                previewAsciiSelection(actionArguments, commandEvent);
                return;
            case "send":
                sendAsciiSelection(actionArguments, commandEvent);
                return;
            case "cancel":
                currentAsciiSearch = emptySearch();
                printAscii("The current ASCII results were discarded.");
                return;
            case "cache":
                handleAsciiCache(actionArguments);
                return;
            case "config":
                handleContextConfiguration(actionArguments, printAscii);
                return;
            default:
                searchAscii(argumentsText, commandEvent);
                return;
        }
    }

    function handleAnsiCommand(argumentsText, commandEvent) {
        var parsedArguments = splitFirstWord(argumentsText);
        var action = parsedArguments.word.toLowerCase();
        var actionArguments = parsedArguments.remainder;

        if (argumentsText.trim().length === 0 || action === "help") {
            showAnsiHelp();
            return;
        }

        switch (action) {
            case "search":
                searchAnsi(actionArguments, commandEvent);
                return;
            case "info":
                showAnsiInformation(actionArguments, commandEvent);
                return;
            case "cancel":
                currentAnsiSearch = emptySearch();
                printAnsi("The current ANSI results were discarded.");
                return;
            case "cache":
                handleAnsiCache(actionArguments, commandEvent);
                return;
            case "config":
                handleContextConfiguration(actionArguments, printAnsi);
                return;
            case "send":
                printAnsi(
                    "ANSI art is discovery-only because the archive does not " +
                    "grant blanket permission to rebroadcast individual works."
                );
                return;
            default:
                searchAnsi(argumentsText, commandEvent);
                return;
        }
    }

    birc.onCommand("ascii", handleAsciiCommand);
    birc.onCommand("ansi", handleAnsiCommand);

    birc.onComplete(function completeTextArtCommand(word) {
        var candidates = [
            "search",
            "preview",
            "info",
            "send",
            "cancel",
            "cache",
            "config",
            "help"
        ];
        var matches = [];
        var candidateIndex;
        var normalizedWord = word.toLowerCase();

        for (candidateIndex = 0; candidateIndex < candidates.length; candidateIndex += 1) {
            if (candidates[candidateIndex].indexOf(normalizedWord) === 0) {
                matches.push(candidates[candidateIndex]);
            }
        }

        return matches;
    });

    if (typeof birc.on === "function") {
        birc.on("load", function announceTextArtLoad() {
            checkForScriptUpdate();
            printAscii("Loaded. Run /ascii help for searchable text art.");
            printAnsi("Loaded. Run /ansi help for ANSI-scene pack discovery.");
        });
    } else {
        printAscii("Loaded. Run /ascii help for searchable text art.");
        printAnsi("Loaded. Run /ansi help for ANSI-scene pack discovery.");
    }
}());
