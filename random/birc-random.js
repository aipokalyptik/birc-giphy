/*
 * bIRC Random Developer Data
 *
 * Import and enable this file in bIRC's Scripts window, then run:
 *
 *     /random help
 *
 * bIRC does not expose Web Crypto. Every generator in this script therefore
 * uses Math.random(). The output is useful for samples, tests, placeholders,
 * games, and creative work. It must not be used for passwords, access tokens,
 * encryption keys, session identifiers, or any other security boundary.
 */

(function registerBircRandomDeveloperDataScript() {
    "use strict";

    var MAXIMUM_ITEM_COUNT = 20;
    var MAXIMUM_STRING_LENGTH = 512;
    var MAXIMUM_PARAGRAPH_SENTENCES = 12;
    var MAXIMUM_SENTENCE_WORDS = 30;
    var MAXIMUM_REMOTE_LINES = 4;
    var MAXIMUM_REMOTE_LINE_LENGTH = 400;
    var REMOTE_STORE_KEY = "random.remote.enabled";
    var remoteReplyContext = null;

    var LOWERCASE_CHARACTERS = "abcdefghijklmnopqrstuvwxyz";
    var UPPERCASE_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var DIGIT_CHARACTERS = "0123456789";
    var SYMBOL_CHARACTERS = "!@#$%^&*()-_=+[]{};:,.?";
    var HEXADECIMAL_CHARACTERS = "0123456789abcdef";
    var BASE64_CHARACTERS =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    var SENTENCE_WORDS = [
        "amber", "ancient", "autumn", "binary", "bright", "calm", "cloud",
        "cobalt", "curious", "data", "distant", "drifting", "echo", "ember",
        "forest", "gentle", "glass", "hidden", "horizon", "indigo", "lantern",
        "lattice", "meadow", "midnight", "modern", "module", "mosaic", "neon",
        "orbit", "pattern", "quiet", "river", "signal", "silver", "soft",
        "solar", "steady", "stone", "system", "thread", "tiny", "velvet",
        "violet", "wandering", "warm", "willow", "winter", "woven"
    ];

    var UNICODE_RANGES = [
        { first: 0x0021, last: 0x007E },
        { first: 0x00A1, last: 0x024F },
        { first: 0x0370, last: 0x052F },
        { first: 0x3041, last: 0x30FF },
        { first: 0x4E00, last: 0x4EFF },
        { first: 0x1F300, last: 0x1F64F }
    ];

    function printRandomStatus(message) {
        if (remoteReplyContext !== null) {
            if (remoteReplyContext.linesSent >= MAXIMUM_REMOTE_LINES) {
                return;
            }

            if (message.length > MAXIMUM_REMOTE_LINE_LENGTH) {
                message =
                    "Result is too long to send remotely (" +
                    message.length +
                    " characters).";
            }

            birc.say(
                remoteReplyContext.target,
                remoteReplyContext.nick + ": " + message
            );
            remoteReplyContext.linesSent += 1;
            return;
        }

        birc.print("[Random] " + message);
    }

    function successfulRandomResult(lines) {
        return {
            succeeded: true,
            lines: lines,
            error: ""
        };
    }

    function failedRandomResult(error) {
        return {
            succeeded: false,
            lines: [],
            error: error
        };
    }

    function randomFraction() {
        return Math.random();
    }

    function randomIntegerInclusive(minimum, maximum) {
        var possibleValueCount = maximum - minimum + 1;

        return minimum + Math.floor(randomFraction() * possibleValueCount);
    }

    function chooseRandomArrayItem(items) {
        var itemIndex = randomIntegerInclusive(0, items.length - 1);

        return items[itemIndex];
    }

    function shuffledArray(items) {
        var currentIndex;
        var itemCopy = items.slice();
        var randomIndex;
        var temporaryItem;

        for (
            currentIndex = itemCopy.length - 1;
            currentIndex > 0;
            currentIndex -= 1
        ) {
            randomIndex = randomIntegerInclusive(0, currentIndex);
            temporaryItem = itemCopy[currentIndex];
            itemCopy[currentIndex] = itemCopy[randomIndex];
            itemCopy[randomIndex] = temporaryItem;
        }

        return itemCopy;
    }

    function splitFirstWord(input) {
        var firstWhitespaceIndex;
        var trimmedInput = input.trim();

        firstWhitespaceIndex = trimmedInput.search(/\s/);

        if (firstWhitespaceIndex === -1) {
            return {
                word: trimmedInput,
                remainder: ""
            };
        }

        return {
            word: trimmedInput.slice(0, firstWhitespaceIndex),
            remainder: trimmedInput.slice(firstWhitespaceIndex).trim()
        };
    }

    function splitWords(input) {
        var trimmedInput = input.trim();

        if (trimmedInput.length === 0) {
            return [];
        }

        return trimmedInput.split(/\s+/);
    }

    function parseIntegerInRange(
        input,
        inputName,
        defaultValue,
        minimum,
        maximum
    ) {
        var numericValue;

        if (input === undefined || input === "") {
            return {
                succeeded: true,
                value: defaultValue,
                error: ""
            };
        }

        numericValue = Number(input);

        if (!Number.isInteger(numericValue)) {
            return {
                succeeded: false,
                value: null,
                error: inputName + " must be a whole number."
            };
        }

        if (numericValue < minimum) {
            return {
                succeeded: false,
                value: null,
                error: inputName + " must be at least " + minimum + "."
            };
        }

        if (numericValue > maximum) {
            return {
                succeeded: false,
                value: null,
                error: inputName + " must be at most " + maximum + "."
            };
        }

        return {
            succeeded: true,
            value: numericValue,
            error: ""
        };
    }

    function randomStringFromCharacters(length, characters) {
        var characterIndex;
        var generatedString = "";

        for (characterIndex = 0; characterIndex < length; characterIndex += 1) {
            generatedString += characters.charAt(
                randomIntegerInclusive(0, characters.length - 1)
            );
        }

        return generatedString;
    }

    function capitalizeFirstCharacter(text) {
        if (text.length === 0) {
            return text;
        }

        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    function generateRandomSentence(wordCount) {
        var generatedWords = [];
        var wordIndex;

        for (wordIndex = 0; wordIndex < wordCount; wordIndex += 1) {
            generatedWords.push(chooseRandomArrayItem(SENTENCE_WORDS));
        }

        generatedWords[0] = capitalizeFirstCharacter(generatedWords[0]);

        return generatedWords.join(" ") + ".";
    }

    function generateRandomUuidVersionFour() {
        var characterIndex;
        var uuidCharacters =
            randomStringFromCharacters(32, HEXADECIMAL_CHARACTERS).split("");
        var variantCharacters = "89ab";

        uuidCharacters[12] = "4";
        uuidCharacters[16] = chooseRandomArrayItem(
            variantCharacters.split("")
        );

        for (characterIndex = 0; characterIndex < 4; characterIndex += 1) {
            uuidCharacters.splice(8 + (characterIndex * 5), 0, "-");
        }

        return uuidCharacters.join("");
    }

    function generateRandomUnicodeString(length) {
        var characterIndex;
        var codePoint;
        var generatedString = "";
        var selectedRange;

        for (characterIndex = 0; characterIndex < length; characterIndex += 1) {
            selectedRange = chooseRandomArrayItem(UNICODE_RANGES);
            codePoint = randomIntegerInclusive(
                selectedRange.first,
                selectedRange.last
            );
            generatedString += String.fromCodePoint(codePoint);
        }

        return generatedString;
    }

    function randomByteArray(length) {
        var byteIndex;
        var bytes = [];

        for (byteIndex = 0; byteIndex < length; byteIndex += 1) {
            bytes.push(randomIntegerInclusive(0, 255));
        }

        return bytes;
    }

    function bytesToHexadecimal(bytes) {
        var byteIndex;
        var hexadecimalParts = [];
        var hexadecimalValue;

        for (byteIndex = 0; byteIndex < bytes.length; byteIndex += 1) {
            hexadecimalValue = bytes[byteIndex].toString(16);

            if (hexadecimalValue.length === 1) {
                hexadecimalValue = "0" + hexadecimalValue;
            }

            hexadecimalParts.push(hexadecimalValue);
        }

        return hexadecimalParts.join("");
    }

    function bytesToBase64(bytes) {
        var base64Text = "";
        var byteIndex;
        var firstByte;
        var fourthCharacterIndex;
        var secondByte;
        var secondCharacterIndex;
        var thirdByte;
        var thirdCharacterIndex;
        var firstCharacterIndex;

        for (byteIndex = 0; byteIndex < bytes.length; byteIndex += 3) {
            firstByte = bytes[byteIndex];
            secondByte = bytes[byteIndex + 1];
            thirdByte = bytes[byteIndex + 2];

            firstCharacterIndex = firstByte >> 2;
            secondCharacterIndex = (firstByte & 3) << 4;

            if (secondByte !== undefined) {
                secondCharacterIndex += secondByte >> 4;
            }

            thirdCharacterIndex = 0;
            fourthCharacterIndex = 0;

            if (secondByte !== undefined) {
                thirdCharacterIndex = (secondByte & 15) << 2;
            }

            if (thirdByte !== undefined) {
                thirdCharacterIndex += thirdByte >> 6;
                fourthCharacterIndex = thirdByte & 63;
            }

            base64Text += BASE64_CHARACTERS.charAt(firstCharacterIndex);
            base64Text += BASE64_CHARACTERS.charAt(secondCharacterIndex);

            if (secondByte === undefined) {
                base64Text += "==";
            } else if (thirdByte === undefined) {
                base64Text += BASE64_CHARACTERS.charAt(thirdCharacterIndex);
                base64Text += "=";
            } else {
                base64Text += BASE64_CHARACTERS.charAt(thirdCharacterIndex);
                base64Text += BASE64_CHARACTERS.charAt(fourthCharacterIndex);
            }
        }

        return base64Text;
    }

    function generateRandomIntegerLines(argumentsText) {
        var countResult;
        var generatedLines = [];
        var maximumResult;
        var minimumResult;
        var valueIndex;
        var words = splitWords(argumentsText);

        minimumResult = parseIntegerInRange(
            words[0],
            "Minimum",
            0,
            -1000000000,
            1000000000
        );

        if (!minimumResult.succeeded) {
            return failedRandomResult(minimumResult.error);
        }

        maximumResult = parseIntegerInRange(
            words[1],
            "Maximum",
            100,
            -1000000000,
            1000000000
        );

        if (!maximumResult.succeeded) {
            return failedRandomResult(maximumResult.error);
        }

        if (minimumResult.value > maximumResult.value) {
            return failedRandomResult(
                "Minimum must not be greater than maximum."
            );
        }

        countResult = parseIntegerInRange(
            words[2],
            "Count",
            1,
            1,
            MAXIMUM_ITEM_COUNT
        );

        if (!countResult.succeeded) {
            return failedRandomResult(countResult.error);
        }

        for (valueIndex = 0; valueIndex < countResult.value; valueIndex += 1) {
            generatedLines.push(
                String(
                    randomIntegerInclusive(
                        minimumResult.value,
                        maximumResult.value
                    )
                )
            );
        }

        return successfulRandomResult(generatedLines);
    }

    function generateRandomFloatLines(argumentsText) {
        var countResult = parseIntegerInRange(
            splitWords(argumentsText)[0],
            "Count",
            1,
            1,
            MAXIMUM_ITEM_COUNT
        );
        var generatedLines = [];
        var valueIndex;

        if (!countResult.succeeded) {
            return failedRandomResult(countResult.error);
        }

        for (valueIndex = 0; valueIndex < countResult.value; valueIndex += 1) {
            generatedLines.push(String(randomFraction()));
        }

        return successfulRandomResult(generatedLines);
    }

    function generateRandomBooleanLines(argumentsText) {
        var countResult = parseIntegerInRange(
            splitWords(argumentsText)[0],
            "Count",
            1,
            1,
            MAXIMUM_ITEM_COUNT
        );
        var generatedLines = [];
        var valueIndex;

        if (!countResult.succeeded) {
            return failedRandomResult(countResult.error);
        }

        for (valueIndex = 0; valueIndex < countResult.value; valueIndex += 1) {
            if (randomFraction() < 0.5) {
                generatedLines.push("false");
            } else {
                generatedLines.push("true");
            }
        }

        return successfulRandomResult(generatedLines);
    }

    function getNamedCharacterSet(name) {
        switch (name) {
            case "lower":
                return LOWERCASE_CHARACTERS;
            case "upper":
                return UPPERCASE_CHARACTERS;
            case "letters":
                return LOWERCASE_CHARACTERS + UPPERCASE_CHARACTERS;
            case "alphanumeric":
                return LOWERCASE_CHARACTERS +
                    UPPERCASE_CHARACTERS +
                    DIGIT_CHARACTERS;
            case "hex":
                return HEXADECIMAL_CHARACTERS;
            case "symbols":
                return SYMBOL_CHARACTERS;
            case "all":
                return LOWERCASE_CHARACTERS +
                    UPPERCASE_CHARACTERS +
                    DIGIT_CHARACTERS +
                    SYMBOL_CHARACTERS;
            default:
                return "";
        }
    }

    function generateRandomStringLines(argumentsText) {
        var characterSetName;
        var characters;
        var countResult;
        var generatedLines = [];
        var lengthResult;
        var valueIndex;
        var words = splitWords(argumentsText);

        characterSetName = words[1];

        if (characterSetName === undefined) {
            characterSetName = "alphanumeric";
        }

        characters = getNamedCharacterSet(characterSetName);

        lengthResult = parseIntegerInRange(
            words[0],
            "Length",
            16,
            1,
            MAXIMUM_STRING_LENGTH
        );

        if (!lengthResult.succeeded) {
            return failedRandomResult(lengthResult.error);
        }

        if (characters.length === 0) {
            return failedRandomResult(
                "Character set must be lower, upper, letters, alphanumeric, hex, symbols, or all."
            );
        }

        countResult = parseIntegerInRange(
            words[2],
            "Count",
            1,
            1,
            MAXIMUM_ITEM_COUNT
        );

        if (!countResult.succeeded) {
            return failedRandomResult(countResult.error);
        }

        for (valueIndex = 0; valueIndex < countResult.value; valueIndex += 1) {
            generatedLines.push(
                randomStringFromCharacters(lengthResult.value, characters)
            );
        }

        return successfulRandomResult(generatedLines);
    }

    function generateFixedCountLines(
        argumentsText,
        defaultCount,
        generator
    ) {
        var countResult = parseIntegerInRange(
            splitWords(argumentsText)[0],
            "Count",
            defaultCount,
            1,
            MAXIMUM_ITEM_COUNT
        );
        var generatedLines = [];
        var valueIndex;

        if (!countResult.succeeded) {
            return failedRandomResult(countResult.error);
        }

        for (valueIndex = 0; valueIndex < countResult.value; valueIndex += 1) {
            generatedLines.push(generator());
        }

        return successfulRandomResult(generatedLines);
    }

    function generateRandomUuidLines(argumentsText) {
        return generateFixedCountLines(
            argumentsText,
            1,
            generateRandomUuidVersionFour
        );
    }

    function generateRandomSentenceLines(argumentsText) {
        var countResult;
        var generatedLines = [];
        var sentenceIndex;
        var wordCountResult;
        var words = splitWords(argumentsText);

        wordCountResult = parseIntegerInRange(
            words[0],
            "Word count",
            10,
            2,
            MAXIMUM_SENTENCE_WORDS
        );

        if (!wordCountResult.succeeded) {
            return failedRandomResult(wordCountResult.error);
        }

        countResult = parseIntegerInRange(
            words[1],
            "Count",
            1,
            1,
            MAXIMUM_ITEM_COUNT
        );

        if (!countResult.succeeded) {
            return failedRandomResult(countResult.error);
        }

        for (
            sentenceIndex = 0;
            sentenceIndex < countResult.value;
            sentenceIndex += 1
        ) {
            generatedLines.push(
                generateRandomSentence(wordCountResult.value)
            );
        }

        return successfulRandomResult(generatedLines);
    }

    function generateRandomParagraphLines(argumentsText) {
        var generatedSentences = [];
        var sentenceCountResult = parseIntegerInRange(
            splitWords(argumentsText)[0],
            "Sentence count",
            5,
            1,
            MAXIMUM_PARAGRAPH_SENTENCES
        );
        var sentenceIndex;
        var wordCount;

        if (!sentenceCountResult.succeeded) {
            return failedRandomResult(sentenceCountResult.error);
        }

        for (
            sentenceIndex = 0;
            sentenceIndex < sentenceCountResult.value;
            sentenceIndex += 1
        ) {
            wordCount = randomIntegerInclusive(7, 16);
            generatedSentences.push(generateRandomSentence(wordCount));
        }

        return successfulRandomResult([generatedSentences.join(" ")]);
    }

    function generateRandomUnicodeLines(argumentsText) {
        var countResult;
        var generatedLines = [];
        var lengthResult;
        var valueIndex;
        var words = splitWords(argumentsText);

        lengthResult = parseIntegerInRange(
            words[0],
            "Length",
            16,
            1,
            MAXIMUM_STRING_LENGTH
        );

        if (!lengthResult.succeeded) {
            return failedRandomResult(lengthResult.error);
        }

        countResult = parseIntegerInRange(
            words[1],
            "Count",
            1,
            1,
            MAXIMUM_ITEM_COUNT
        );

        if (!countResult.succeeded) {
            return failedRandomResult(countResult.error);
        }

        for (valueIndex = 0; valueIndex < countResult.value; valueIndex += 1) {
            generatedLines.push(generateRandomUnicodeString(lengthResult.value));
        }

        return successfulRandomResult(generatedLines);
    }

    function generateRandomColor() {
        return "#" + randomStringFromCharacters(6, HEXADECIMAL_CHARACTERS);
    }

    function generateRandomColorLines(argumentsText) {
        return generateFixedCountLines(
            argumentsText,
            1,
            generateRandomColor
        );
    }

    function normalizedHue(hue) {
        var normalizedValue = hue % 360;

        if (normalizedValue < 0) {
            normalizedValue += 360;
        }

        return normalizedValue;
    }

    function formatHslColor(hue, saturation, lightness) {
        return "hsl(" +
            normalizedHue(hue) +
            ", " +
            saturation +
            "%, " +
            lightness +
            "%)";
    }

    function getPaletteHueOffsets(schemeName) {
        switch (schemeName) {
            case "complementary":
                return [0, 180];
            case "analogous":
                return [-30, 0, 30];
            case "triadic":
                return [0, 120, 240];
            case "tetradic":
                return [0, 90, 180, 270];
            case "split":
                return [0, 150, 210];
            case "monochrome":
                return [0, 0, 0, 0, 0];
            default:
                return null;
        }
    }

    function generateRandomPaletteLines(argumentsText) {
        var baseHue = randomIntegerInclusive(0, 359);
        var colorIndex;
        var hueOffsets;
        var lightness = randomIntegerInclusive(35, 65);
        var paletteColors = [];
        var saturation = randomIntegerInclusive(55, 90);
        var schemeName = splitWords(argumentsText)[0];

        if (schemeName === undefined) {
            schemeName = "triadic";
        }

        hueOffsets = getPaletteHueOffsets(schemeName);

        if (hueOffsets === null) {
            return failedRandomResult(
                "Palette must be complementary, analogous, triadic, tetradic, split, or monochrome."
            );
        }

        for (
            colorIndex = 0;
            colorIndex < hueOffsets.length;
            colorIndex += 1
        ) {
            if (schemeName === "monochrome") {
                lightness = 20 + (colorIndex * 15);
            }

            paletteColors.push(
                formatHslColor(
                    baseHue + hueOffsets[colorIndex],
                    saturation,
                    lightness
                )
            );
        }

        return successfulRandomResult([
            schemeName + ": " + paletteColors.join(" | ")
        ]);
    }

    function generateRandomByteFormatLines(argumentsText, formatName) {
        var byteCountResult = parseIntegerInRange(
            splitWords(argumentsText)[0],
            "Byte count",
            16,
            1,
            256
        );
        var bytes;

        if (!byteCountResult.succeeded) {
            return failedRandomResult(byteCountResult.error);
        }

        bytes = randomByteArray(byteCountResult.value);

        switch (formatName) {
            case "bytes":
                return successfulRandomResult([bytes.join(", ")]);
            case "hex":
                return successfulRandomResult([bytesToHexadecimal(bytes)]);
            case "base64":
                return successfulRandomResult([bytesToBase64(bytes)]);
            default:
                return failedRandomResult("Unknown byte format.");
        }
    }

    function splitPipeSeparatedItems(argumentsText) {
        var itemIndex;
        var items = argumentsText.split("|");
        var trimmedItems = [];

        for (itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
            if (items[itemIndex].trim().length > 0) {
                trimmedItems.push(items[itemIndex].trim());
            }
        }

        return trimmedItems;
    }

    function generateRandomChoiceLines(argumentsText) {
        var items = splitPipeSeparatedItems(argumentsText);

        if (items.length < 2) {
            return failedRandomResult(
                "Provide at least two choices separated by |."
            );
        }

        return successfulRandomResult([chooseRandomArrayItem(items)]);
    }

    function generateRandomShuffleLines(argumentsText) {
        var items = splitPipeSeparatedItems(argumentsText);

        if (items.length < 2) {
            return failedRandomResult(
                "Provide at least two items separated by |."
            );
        }

        return successfulRandomResult([shuffledArray(items).join(" | ")]);
    }

    function generateRandomDiceLines(argumentsText) {
        var diceMatch;
        var diceText = argumentsText.trim();
        var dieIndex;
        var dieResults = [];
        var dieTotal = 0;
        var numberOfDice;
        var sidesPerDie;

        if (diceText.length === 0) {
            diceText = "1d6";
        }

        diceMatch = /^(\d+)d(\d+)$/i.exec(diceText);

        if (diceMatch === null) {
            return failedRandomResult("Dice must use notation such as 2d6.");
        }

        numberOfDice = Number(diceMatch[1]);
        sidesPerDie = Number(diceMatch[2]);

        if (!Number.isInteger(numberOfDice)) {
            return failedRandomResult("The number of dice is invalid.");
        }

        if (numberOfDice < 1 || numberOfDice > 100) {
            return failedRandomResult("Use between 1 and 100 dice.");
        }

        if (!Number.isInteger(sidesPerDie)) {
            return failedRandomResult("The number of sides is invalid.");
        }

        if (sidesPerDie < 2 || sidesPerDie > 1000000) {
            return failedRandomResult(
                "Each die must have between 2 and 1000000 sides."
            );
        }

        for (dieIndex = 0; dieIndex < numberOfDice; dieIndex += 1) {
            dieResults.push(randomIntegerInclusive(1, sidesPerDie));
            dieTotal += dieResults[dieIndex];
        }

        return successfulRandomResult([
            diceText + ": [" + dieResults.join(", ") + "] = " + dieTotal
        ]);
    }

    function generateRandomIpv4Address() {
        var octets = [];
        var octetIndex;

        for (octetIndex = 0; octetIndex < 4; octetIndex += 1) {
            octets.push(randomIntegerInclusive(0, 255));
        }

        return octets.join(".");
    }

    function generateRandomIpv6Address() {
        var groups = [];
        var groupIndex;

        for (groupIndex = 0; groupIndex < 8; groupIndex += 1) {
            groups.push(randomStringFromCharacters(4, HEXADECIMAL_CHARACTERS));
        }

        return groups.join(":");
    }

    function generateRandomIpAddressLines(argumentsText) {
        var addressVersion = splitWords(argumentsText)[0];

        if (addressVersion === undefined) {
            addressVersion = "v4";
        }

        switch (addressVersion) {
            case "v4":
                return successfulRandomResult([generateRandomIpv4Address()]);
            case "v6":
                return successfulRandomResult([generateRandomIpv6Address()]);
            default:
                return failedRandomResult("IP version must be v4 or v6.");
        }
    }

    function generateRandomMacAddress() {
        var bytes = randomByteArray(6);

        bytes[0] = (bytes[0] | 2) & 254;

        return bytesToHexadecimal(bytes).match(/.{2}/g).join(":");
    }

    function generateRandomMacAddressLines(argumentsText) {
        return generateFixedCountLines(
            argumentsText,
            1,
            generateRandomMacAddress
        );
    }

    function generateRandomTimestampLines(argumentsText) {
        var endYearResult;
        var generatedDate;
        var maximumTimestamp;
        var minimumTimestamp;
        var startYearResult;
        var words = splitWords(argumentsText);

        startYearResult = parseIntegerInRange(
            words[0],
            "Start year",
            2000,
            1970,
            9998
        );

        if (!startYearResult.succeeded) {
            return failedRandomResult(startYearResult.error);
        }

        endYearResult = parseIntegerInRange(
            words[1],
            "End year",
            2030,
            1971,
            9999
        );

        if (!endYearResult.succeeded) {
            return failedRandomResult(endYearResult.error);
        }

        if (startYearResult.value >= endYearResult.value) {
            return failedRandomResult(
                "Start year must be earlier than end year."
            );
        }

        minimumTimestamp = Date.UTC(startYearResult.value, 0, 1);
        maximumTimestamp = Date.UTC(endYearResult.value, 0, 1) - 1;
        generatedDate = new Date(
            minimumTimestamp +
                Math.floor(
                    randomFraction() *
                        (maximumTimestamp - minimumTimestamp + 1)
                )
        );

        return successfulRandomResult([generatedDate.toISOString()]);
    }

    function printRandomHelp() {
        printRandomStatus("Local random developer-data generator.");
        printRandomStatus("/random integer [min] [max] [count]");
        printRandomStatus("/random float [count] | boolean [count]");
        printRandomStatus(
            "/random string [length] [lower|upper|letters|alphanumeric|hex|symbols|all] [count]"
        );
        printRandomStatus("/random uuid [count] | unicode [length] [count]");
        printRandomStatus(
            "/random sentence [words] [count] | paragraph [sentences]"
        );
        printRandomStatus("/random color [count]");
        printRandomStatus(
            "/random palette [complementary|analogous|triadic|tetradic|split|monochrome]"
        );
        printRandomStatus(
            "/random bytes [count] | hex [bytes] | base64 [bytes]"
        );
        printRandomStatus("/random choice red | green | blue");
        printRandomStatus("/random shuffle first | second | third");
        printRandomStatus("/random dice [NdN] | ip [v4|v6] | mac [count]");
        printRandomStatus("/random timestamp [start-year] [end-year]");
        printRandomStatus("/random remote <on|off|status>");
        printRandomStatus(
            "Prefix a generator with 'say' to send its output to the active conversation."
        );
        printRandomStatus(
            "Security: all output uses Math.random(); never use it for secrets or authentication."
        );
    }

    function generateRandomData(generatorName, argumentsText) {
        switch (generatorName) {
            case "integer":
            case "int":
                return generateRandomIntegerLines(argumentsText);
            case "float":
                return generateRandomFloatLines(argumentsText);
            case "boolean":
            case "bool":
                return generateRandomBooleanLines(argumentsText);
            case "string":
                return generateRandomStringLines(argumentsText);
            case "uuid":
                return generateRandomUuidLines(argumentsText);
            case "unicode":
                return generateRandomUnicodeLines(argumentsText);
            case "sentence":
                return generateRandomSentenceLines(argumentsText);
            case "paragraph":
                return generateRandomParagraphLines(argumentsText);
            case "color":
                return generateRandomColorLines(argumentsText);
            case "palette":
                return generateRandomPaletteLines(argumentsText);
            case "bytes":
            case "hex":
            case "base64":
                return generateRandomByteFormatLines(
                    argumentsText,
                    generatorName
                );
            case "choice":
                return generateRandomChoiceLines(argumentsText);
            case "shuffle":
                return generateRandomShuffleLines(argumentsText);
            case "dice":
                return generateRandomDiceLines(argumentsText);
            case "ip":
                return generateRandomIpAddressLines(argumentsText);
            case "mac":
                return generateRandomMacAddressLines(argumentsText);
            case "timestamp":
                return generateRandomTimestampLines(argumentsText);
            default:
                return failedRandomResult(
                    "Unknown generator. Run /random help."
                );
        }
    }

    function getCommandTarget(commandEvent) {
        if (commandEvent) {
            if (typeof commandEvent.target === "string") {
                if (commandEvent.target.length > 0) {
                    return commandEvent.target;
                }
            }
        }

        if (typeof birc.target === "string") {
            return birc.target;
        }

        return "";
    }

    function outputRandomResult(result, sendOutput, commandEvent) {
        var lineIndex;
        var target;

        if (!result.succeeded) {
            printRandomStatus(result.error);
            return;
        }

        if (!sendOutput) {
            for (lineIndex = 0; lineIndex < result.lines.length; lineIndex += 1) {
                printRandomStatus(result.lines[lineIndex]);
            }

            return;
        }

        target = getCommandTarget(commandEvent);

        if (target.length === 0) {
            printRandomStatus(
                "There is no active conversation to receive the output."
            );
            return;
        }

        for (lineIndex = 0; lineIndex < result.lines.length; lineIndex += 1) {
            birc.say(target, result.lines[lineIndex]);
        }
    }

    function runRandomCommand(argumentsText, commandEvent) {
        var firstPart = splitFirstWord(argumentsText);
        var generatorArguments = firstPart.remainder;
        var generatorName = firstPart.word.toLowerCase();
        var result;
        var sendOutput = false;

        if (generatorName.length === 0 || generatorName === "help") {
            printRandomHelp();
            return;
        }

        if (generatorName === "remote") {
            handleRandomRemoteConfiguration(generatorArguments);
            return;
        }

        if (generatorName === "say") {
            sendOutput = true;
            firstPart = splitFirstWord(generatorArguments);
            generatorName = firstPart.word.toLowerCase();
            generatorArguments = firstPart.remainder;
        }

        if (generatorName.length === 0) {
            printRandomStatus(
                "Choose a generator after 'say'. Run /random help."
            );
            return;
        }

        result = generateRandomData(generatorName, generatorArguments);
        outputRandomResult(result, sendOutput, commandEvent);
    }

    function remoteUseIsEnabled() {
        return birc.store.get(REMOTE_STORE_KEY) === true;
    }

    function handleRandomRemoteConfiguration(argumentsText) {
        var setting = argumentsText.trim().toLowerCase();

        if (setting === "on") {
            birc.store.set(REMOTE_STORE_KEY, true);
            printRandomStatus("Remote @mention use is enabled.");
            return;
        }

        if (setting === "off") {
            birc.store.delete(REMOTE_STORE_KEY);
            printRandomStatus("Remote @mention use is disabled.");
            return;
        }

        if (setting === "status" || setting.length === 0) {
            if (remoteUseIsEnabled()) {
                printRandomStatus("Remote @mention use is enabled.");
            } else {
                printRandomStatus("Remote @mention use is disabled.");
            }
            return;
        }

        printRandomStatus("Remote setting must be on, off, or status.");
    }

    function handleRemoteRandomRequest(event) {
        var commandPart;
        var generatorName;
        var mentionPart;
        var replyTarget;

        if (!remoteUseIsEnabled()) {
            return;
        }

        if (!event || event.isMe || event.isBacklog) {
            return;
        }

        if (typeof event.text !== "string" || typeof event.nick !== "string") {
            return;
        }

        mentionPart = splitFirstWord(event.text);
        if (mentionPart.word.charAt(0) !== "@") {
            return;
        }

        if (!birc.sameNick(mentionPart.word.slice(1), birc.nick)) {
            return;
        }

        commandPart = splitFirstWord(mentionPart.remainder);
        if (commandPart.word.toLowerCase().replace(/^\//, "") !== "random") {
            return;
        }

        replyTarget = event.channel;
        if (typeof replyTarget !== "string" || replyTarget.length === 0) {
            replyTarget = event.nick;
        }

        remoteReplyContext = {
            linesSent: 0,
            nick: event.nick,
            target: replyTarget
        };
        try {
            generatorName = splitFirstWord(
                commandPart.remainder
            ).word.toLowerCase();
            if (generatorName === "remote" || generatorName === "say") {
                printRandomStatus(
                    "Remote configuration and 'say' are local-only."
                );
                return;
            }
            runRandomCommand(commandPart.remainder, event);
        } finally {
            remoteReplyContext = null;
        }
    }

    function completeRandomCommand(word) {
        var candidateIndex;
        var candidates = [
            "help", "integer", "float", "boolean", "string", "uuid",
            "unicode", "sentence", "paragraph", "color", "palette", "bytes",
            "hex", "base64", "choice", "shuffle", "dice", "ip", "mac",
            "timestamp", "say", "remote", "on", "off", "status"
        ];
        var completions = [];
        var lowerWord = word.toLowerCase();

        for (
            candidateIndex = 0;
            candidateIndex < candidates.length;
            candidateIndex += 1
        ) {
            if (candidates[candidateIndex].indexOf(lowerWord) === 0) {
                completions.push(candidates[candidateIndex]);
            }
        }

        return completions;
    }

    birc.onCommand("random", runRandomCommand);
    birc.onComplete(completeRandomCommand);
    birc.on("message", handleRemoteRandomRequest);

    birc.on("load", function printRandomScriptLoadMessage() {
        printRandomStatus("Loaded. Run /random help.");
    });
}());
