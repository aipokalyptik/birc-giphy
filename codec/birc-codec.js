/*
 * bIRC Codec Utilities
 *
 * Import this file in bIRC's Scripts window, enable it, then run:
 *
 *     /codec help
 *
 * All transformations are local. Decoders reject malformed input and report
 * failure visibly instead of returning partial or replacement-character data.
 *
 * Script ID: com.github.aipokalyptik.birc-utils.codec
 * Script version: 1.0.1
 */

(function registerBircCodecUtilitiesScript() {
    "use strict";

    var SCRIPT_ID = "com.github.aipokalyptik.birc-utils.codec";
    var SCRIPT_VERSION = "1.0.1";
    var SCRIPT_UPDATE_PAGE_URL =
        "https://github.com/aipokalyptik/birc-utils/tree/main/codec";
    var SCRIPT_UPDATE_FILE_URL =
        "https://github.com/aipokalyptik/birc-utils/blob/main/codec/birc-codec.js";
    var SCRIPT_RELEASE_TAG_PREFIX = "birc-utils-codec-v";
    var SCRIPT_COMPARE_URL_PREFIX =
        "https://github.com/aipokalyptik/birc-utils/compare/";
    var SCRIPT_FILE_DIFF_ANCHOR =
        "#diff-b9155b62c0d0ac3c3a33fa8862f8b8acdb6553ea75ae09fb236563c7506eb432";
    var UPDATE_MANIFEST_URL =
        "https://raw.githubusercontent.com/aipokalyptik/birc-utils/main/updates.json";
    var UPDATE_CACHE_KEY = "bircUtils.updateCheck.v1";
    var UPDATE_CHECK_INTERVAL_MILLISECONDS = 24 * 60 * 60 * 1000;

    var BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    var BASE58_ALPHABET =
        "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    var BASE64_ALPHABET =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var HEXADECIMAL_ALPHABET = "0123456789ABCDEF";
    var MAXIMUM_INPUT_LENGTH = 4096;
    var MAXIMUM_PHP_SERIALIZATION_DEPTH = 64;
    var MAXIMUM_PHP_SERIALIZATION_ITEMS = 1000;
    var MAXIMUM_PHP_STRING_BYTE_LENGTH = MAXIMUM_INPUT_LENGTH * 4;
    var MAXIMUM_REMOTE_LINES = 4;
    var MAXIMUM_REMOTE_LINE_LENGTH = 400;
    var REMOTE_STORE_KEY = "codec.remote.enabled";
    var remoteReplyContext = null;

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

    function checkForScriptUpdate() {
        var cache;
        var now;
        var reportedVersion = "";

        if (typeof birc.fetch !== "function" || !birc.store) {
            return;
        }

        cache = readUpdateCache();

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
            console.info("Codec update check was not completed", error);
        });
    }

    function reportAvailableScriptUpdate(latestVersion) {
        var comparisonUrl = SCRIPT_COMPARE_URL_PREFIX +
            SCRIPT_RELEASE_TAG_PREFIX + SCRIPT_VERSION + "..." +
            SCRIPT_RELEASE_TAG_PREFIX + latestVersion + SCRIPT_FILE_DIFF_ANCHOR;

        birc.print(
            "[Codec] Update available for " + SCRIPT_ID + ": installed " +
            SCRIPT_VERSION + ", current " + latestVersion + "."
        );
        birc.print("[Codec] Canonical update file: " + SCRIPT_UPDATE_FILE_URL);
        birc.print(
            "[Codec] Changes since the installed version: " + comparisonUrl +
            " (opens at codec/birc-codec.js)."
        );
        birc.print(
            "[Codec] Update instructions: open that URL, review the file, " +
            "click Raw, and copy the entire file. In bIRC open Scripts with " +
            "⌘⌥S, replace this script's contents, and save. Documentation: " +
            SCRIPT_UPDATE_PAGE_URL
        );
    }
    var PUNYCODE_BASE = 36;
    var PUNYCODE_DAMP = 700;
    var PUNYCODE_DELIMITER = "-";
    var PUNYCODE_INITIAL_BIAS = 72;
    var PUNYCODE_INITIAL_CODE_POINT = 128;
    var PUNYCODE_SKEW = 38;
    var PUNYCODE_THRESHOLD_MAXIMUM = 26;
    var PUNYCODE_THRESHOLD_MINIMUM = 1;

    function successfulCodecResult(value) {
        return {
            succeeded: true,
            value: value,
            error: ""
        };
    }

    function failedCodecResult(error) {
        return {
            succeeded: false,
            value: "",
            error: error
        };
    }

    function printCodecStatus(message) {
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

        birc.print("[Codec] " + message);
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

    function validateInputLength(input) {
        if (input.length > MAXIMUM_INPUT_LENGTH) {
            return failedCodecResult(
                "Input must be " + MAXIMUM_INPUT_LENGTH + " characters or fewer."
            );
        }

        return successfulCodecResult(input);
    }

    /*
     * Returns Unicode code points, or failure for unpaired UTF-16 surrogates.
     */
    function textToUnicodeCodePoints(text) {
        var codePoint;
        var codePoints = [];
        var firstCodeUnit;
        var secondCodeUnit;
        var textIndex;

        for (textIndex = 0; textIndex < text.length; textIndex += 1) {
            firstCodeUnit = text.charCodeAt(textIndex);

            if (firstCodeUnit < 0xD800 || firstCodeUnit > 0xDFFF) {
                codePoints.push(firstCodeUnit);
                continue;
            }

            if (firstCodeUnit > 0xDBFF) {
                return failedCodecResult(
                    "Text contains an unpaired low surrogate at UTF-16 index " +
                        textIndex +
                        "."
                );
            }

            if (textIndex + 1 >= text.length) {
                return failedCodecResult(
                    "Text ends with an unpaired high surrogate."
                );
            }

            secondCodeUnit = text.charCodeAt(textIndex + 1);

            if (secondCodeUnit < 0xDC00 || secondCodeUnit > 0xDFFF) {
                return failedCodecResult(
                    "Text contains an unpaired high surrogate at UTF-16 index " +
                        textIndex +
                        "."
                );
            }

            codePoint =
                ((firstCodeUnit - 0xD800) * 0x400) +
                (secondCodeUnit - 0xDC00) +
                0x10000;
            codePoints.push(codePoint);
            textIndex += 1;
        }

        return successfulCodecResult(codePoints);
    }

    function unicodeCodePointsToText(codePoints) {
        var codePoint;
        var codePointIndex;
        var text = "";

        for (
            codePointIndex = 0;
            codePointIndex < codePoints.length;
            codePointIndex += 1
        ) {
            codePoint = codePoints[codePointIndex];

            if (!Number.isInteger(codePoint)) {
                return failedCodecResult(
                    "Unicode code points must be whole numbers."
                );
            }

            if (codePoint < 0 || codePoint > 0x10FFFF) {
                return failedCodecResult(
                    "Unicode code point is outside U+0000 through U+10FFFF."
                );
            }

            if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
                return failedCodecResult(
                    "Unicode surrogate values are not scalar values."
                );
            }

            text += String.fromCodePoint(codePoint);
        }

        return successfulCodecResult(text);
    }

    function utf8TextToBytes(text) {
        var bytes = [];
        var codePoint;
        var codePointIndex;
        var codePointResult = textToUnicodeCodePoints(text);

        if (!codePointResult.succeeded) {
            return codePointResult;
        }

        for (
            codePointIndex = 0;
            codePointIndex < codePointResult.value.length;
            codePointIndex += 1
        ) {
            codePoint = codePointResult.value[codePointIndex];

            if (codePoint <= 0x7F) {
                bytes.push(codePoint);
                continue;
            }

            if (codePoint <= 0x7FF) {
                bytes.push(0xC0 | (codePoint >> 6));
                bytes.push(0x80 | (codePoint & 0x3F));
                continue;
            }

            if (codePoint <= 0xFFFF) {
                bytes.push(0xE0 | (codePoint >> 12));
                bytes.push(0x80 | ((codePoint >> 6) & 0x3F));
                bytes.push(0x80 | (codePoint & 0x3F));
                continue;
            }

            bytes.push(0xF0 | (codePoint >> 18));
            bytes.push(0x80 | ((codePoint >> 12) & 0x3F));
            bytes.push(0x80 | ((codePoint >> 6) & 0x3F));
            bytes.push(0x80 | (codePoint & 0x3F));
        }

        return successfulCodecResult(bytes);
    }

    function isContinuationByte(byteValue) {
        return byteValue >= 0x80 && byteValue <= 0xBF;
    }

    function utf8BytesToText(bytes) {
        var byteIndex = 0;
        var codePoint;
        var codePoints = [];
        var firstByte;
        var fourthByte;
        var secondByte;
        var thirdByte;

        while (byteIndex < bytes.length) {
            firstByte = bytes[byteIndex];

            if (firstByte <= 0x7F) {
                codePoints.push(firstByte);
                byteIndex += 1;
                continue;
            }

            if (firstByte >= 0xC2 && firstByte <= 0xDF) {
                if (byteIndex + 1 >= bytes.length) {
                    return failedCodecResult("UTF-8 ends inside a two-byte sequence.");
                }

                secondByte = bytes[byteIndex + 1];

                if (!isContinuationByte(secondByte)) {
                    return failedCodecResult("UTF-8 contains an invalid continuation byte.");
                }

                codePoint = ((firstByte & 0x1F) << 6) | (secondByte & 0x3F);
                codePoints.push(codePoint);
                byteIndex += 2;
                continue;
            }

            if (firstByte >= 0xE0 && firstByte <= 0xEF) {
                if (byteIndex + 2 >= bytes.length) {
                    return failedCodecResult("UTF-8 ends inside a three-byte sequence.");
                }

                secondByte = bytes[byteIndex + 1];
                thirdByte = bytes[byteIndex + 2];

                if (!isContinuationByte(secondByte)) {
                    return failedCodecResult("UTF-8 contains an invalid continuation byte.");
                }

                if (!isContinuationByte(thirdByte)) {
                    return failedCodecResult("UTF-8 contains an invalid continuation byte.");
                }

                if (firstByte === 0xE0 && secondByte < 0xA0) {
                    return failedCodecResult("UTF-8 contains an overlong sequence.");
                }

                if (firstByte === 0xED && secondByte > 0x9F) {
                    return failedCodecResult("UTF-8 encodes a surrogate value.");
                }

                codePoint =
                    ((firstByte & 0x0F) << 12) |
                    ((secondByte & 0x3F) << 6) |
                    (thirdByte & 0x3F);
                codePoints.push(codePoint);
                byteIndex += 3;
                continue;
            }

            if (firstByte >= 0xF0 && firstByte <= 0xF4) {
                if (byteIndex + 3 >= bytes.length) {
                    return failedCodecResult("UTF-8 ends inside a four-byte sequence.");
                }

                secondByte = bytes[byteIndex + 1];
                thirdByte = bytes[byteIndex + 2];
                fourthByte = bytes[byteIndex + 3];

                if (!isContinuationByte(secondByte)) {
                    return failedCodecResult("UTF-8 contains an invalid continuation byte.");
                }

                if (!isContinuationByte(thirdByte)) {
                    return failedCodecResult("UTF-8 contains an invalid continuation byte.");
                }

                if (!isContinuationByte(fourthByte)) {
                    return failedCodecResult("UTF-8 contains an invalid continuation byte.");
                }

                if (firstByte === 0xF0 && secondByte < 0x90) {
                    return failedCodecResult("UTF-8 contains an overlong sequence.");
                }

                if (firstByte === 0xF4 && secondByte > 0x8F) {
                    return failedCodecResult("UTF-8 exceeds U+10FFFF.");
                }

                codePoint =
                    ((firstByte & 0x07) << 18) |
                    ((secondByte & 0x3F) << 12) |
                    ((thirdByte & 0x3F) << 6) |
                    (fourthByte & 0x3F);
                codePoints.push(codePoint);
                byteIndex += 4;
                continue;
            }

            return failedCodecResult(
                "UTF-8 contains an invalid leading byte at byte " +
                    byteIndex +
                    "."
            );
        }

        return unicodeCodePointsToText(codePoints);
    }

    function byteToHexadecimal(byteValue) {
        return HEXADECIMAL_ALPHABET.charAt(byteValue >> 4) +
            HEXADECIMAL_ALPHABET.charAt(byteValue & 0x0F);
    }

    function bytesToHexadecimal(bytes) {
        var byteIndex;
        var output = "";

        for (byteIndex = 0; byteIndex < bytes.length; byteIndex += 1) {
            output += byteToHexadecimal(bytes[byteIndex]);
        }

        return output;
    }

    function hexadecimalToBytes(input) {
        var byteIndex;
        var bytes = [];
        var normalizedInput = input.trim();

        if (normalizedInput.indexOf("0x") === 0) {
            normalizedInput = normalizedInput.slice(2);
        }

        normalizedInput = normalizedInput.replace(/[\s:_-]/g, "");

        if (normalizedInput.length % 2 !== 0) {
            return failedCodecResult("Hex input must contain complete byte pairs.");
        }

        if (!/^[0-9a-fA-F]*$/.test(normalizedInput)) {
            return failedCodecResult("Hex input contains a non-hexadecimal character.");
        }

        for (byteIndex = 0; byteIndex < normalizedInput.length; byteIndex += 2) {
            bytes.push(parseInt(normalizedInput.slice(byteIndex, byteIndex + 2), 16));
        }

        return successfulCodecResult(bytes);
    }

    function bytesToBitString(bytes) {
        var bitIndex;
        var bitParts = [];
        var byteIndex;
        var byteText;

        for (byteIndex = 0; byteIndex < bytes.length; byteIndex += 1) {
            byteText = "";

            for (bitIndex = 7; bitIndex >= 0; bitIndex -= 1) {
                if ((bytes[byteIndex] & (1 << bitIndex)) === 0) {
                    byteText += "0";
                } else {
                    byteText += "1";
                }
            }

            bitParts.push(byteText);
        }

        return bitParts.join(" ");
    }

    function bitStringToBytes(input) {
        var bitIndex;
        var bytes = [];
        var byteValue;
        var normalizedInput = input.replace(/[\s_-]/g, "");

        if (!/^[01]*$/.test(normalizedInput)) {
            return failedCodecResult("Binary input may contain only 0 and 1.");
        }

        if (normalizedInput.length % 8 !== 0) {
            return failedCodecResult("Binary input must contain complete 8-bit bytes.");
        }

        for (bitIndex = 0; bitIndex < normalizedInput.length; bitIndex += 8) {
            byteValue = parseInt(normalizedInput.slice(bitIndex, bitIndex + 8), 2);
            bytes.push(byteValue);
        }

        return successfulCodecResult(bytes);
    }

    function bytesToDecimalList(bytes) {
        return bytes.join(" ");
    }

    function decimalListToBytes(input) {
        var byteIndex;
        var byteParts;
        var byteValue;
        var bytes = [];
        var normalizedInput = input.trim();

        if (normalizedInput.length === 0) {
            return successfulCodecResult([]);
        }

        byteParts = normalizedInput.split(/[\s,;:]+/);

        for (byteIndex = 0; byteIndex < byteParts.length; byteIndex += 1) {
            if (!/^\d+$/.test(byteParts[byteIndex])) {
                return failedCodecResult(
                    "Decimal bytes must be whole numbers separated by spaces or commas."
                );
            }

            byteValue = Number(byteParts[byteIndex]);

            if (byteValue < 0 || byteValue > 255) {
                return failedCodecResult("Every decimal byte must be between 0 and 255.");
            }

            bytes.push(byteValue);
        }

        return successfulCodecResult(bytes);
    }

    function bytesToBigEndianInteger(bytes) {
        var byteIndex;
        var integerValue = BigInt(0);

        for (byteIndex = 0; byteIndex < bytes.length; byteIndex += 1) {
            integerValue *= BigInt(256);
            integerValue += BigInt(bytes[byteIndex]);
        }

        return integerValue.toString(10);
    }

    function bigEndianIntegerToBytes(input) {
        var bytes = [];
        var integerValue;
        var normalizedInput = input.trim();

        if (!/^\d+$/.test(normalizedInput)) {
            return failedCodecResult("Integer input must be a non-negative decimal integer.");
        }

        try {
            integerValue = BigInt(normalizedInput);
        } catch (error) {
            return failedCodecResult("Integer input could not be parsed.");
        }

        if (integerValue === BigInt(0)) {
            return successfulCodecResult([0]);
        }

        while (integerValue > BigInt(0)) {
            bytes.unshift(Number(integerValue % BigInt(256)));
            integerValue /= BigInt(256);
        }

        return successfulCodecResult(bytes);
    }

    function bytesToBase64(bytes) {
        var accumulator = 0;
        var availableBits = 0;
        var byteIndex;
        var output = "";

        for (byteIndex = 0; byteIndex < bytes.length; byteIndex += 1) {
            accumulator = (accumulator << 8) | bytes[byteIndex];
            availableBits += 8;

            while (availableBits >= 6) {
                availableBits -= 6;
                output += BASE64_ALPHABET.charAt(
                    (accumulator >> availableBits) & 0x3F
                );
            }
        }

        if (availableBits > 0) {
            output += BASE64_ALPHABET.charAt(
                (accumulator << (6 - availableBits)) & 0x3F
            );
        }

        while (output.length % 4 !== 0) {
            output += "=";
        }

        return output;
    }

    function base64ToBytes(input, urlSafe) {
        var accumulator = 0;
        var availableBits = 0;
        var bytes = [];
        var characterIndex;
        var characterValue;
        var normalizedInput = input.trim();
        var paddingIndex;

        if (urlSafe) {
            normalizedInput = normalizedInput.replace(/-/g, "+");
            normalizedInput = normalizedInput.replace(/_/g, "/");

            while (normalizedInput.length % 4 !== 0) {
                normalizedInput += "=";
            }
        }

        if (normalizedInput.length % 4 !== 0) {
            return failedCodecResult("Base64 length must be a multiple of four.");
        }

        if (!/^[A-Za-z0-9+/]*={0,2}$/.test(normalizedInput)) {
            return failedCodecResult("Base64 input contains invalid characters or padding.");
        }

        paddingIndex = normalizedInput.indexOf("=");

        if (paddingIndex !== -1) {
            normalizedInput = normalizedInput.slice(0, paddingIndex);
        }

        for (
            characterIndex = 0;
            characterIndex < normalizedInput.length;
            characterIndex += 1
        ) {
            characterValue = BASE64_ALPHABET.indexOf(
                normalizedInput.charAt(characterIndex)
            );
            accumulator = (accumulator << 6) | characterValue;
            availableBits += 6;

            if (availableBits >= 8) {
                availableBits -= 8;
                bytes.push((accumulator >> availableBits) & 0xFF);
            }
        }

        if (availableBits > 0) {
            if ((accumulator & ((1 << availableBits) - 1)) !== 0) {
                return failedCodecResult("Base64 contains non-zero trailing pad bits.");
            }
        }

        return successfulCodecResult(bytes);
    }

    function bytesToBase32(bytes) {
        var accumulator = 0;
        var availableBits = 0;
        var byteIndex;
        var output = "";

        for (byteIndex = 0; byteIndex < bytes.length; byteIndex += 1) {
            accumulator = (accumulator << 8) | bytes[byteIndex];
            availableBits += 8;

            while (availableBits >= 5) {
                availableBits -= 5;
                output += BASE32_ALPHABET.charAt(
                    (accumulator >> availableBits) & 0x1F
                );
            }
        }

        if (availableBits > 0) {
            output += BASE32_ALPHABET.charAt(
                (accumulator << (5 - availableBits)) & 0x1F
            );
        }

        while (output.length % 8 !== 0) {
            output += "=";
        }

        return output;
    }

    function base32ToBytes(input) {
        var accumulator = 0;
        var availableBits = 0;
        var bytes = [];
        var characterIndex;
        var characterValue;
        var normalizedInput = input.trim().toUpperCase();
        var expectedPaddingCount;
        var paddingCount = 0;
        var paddingIndex;

        if (normalizedInput.length % 8 !== 0) {
            return failedCodecResult("Base32 length must be a multiple of eight.");
        }

        if (!/^[A-Z2-7]*={0,6}$/.test(normalizedInput)) {
            return failedCodecResult("Base32 input contains invalid characters or padding.");
        }

        paddingIndex = normalizedInput.indexOf("=");

        if (paddingIndex !== -1) {
            paddingCount = normalizedInput.length - paddingIndex;
            normalizedInput = normalizedInput.slice(0, paddingIndex);
        }

        expectedPaddingCount = 0;

        switch (normalizedInput.length % 8) {
            case 0:
                expectedPaddingCount = 0;
                break;
            case 2:
                expectedPaddingCount = 6;
                break;
            case 4:
                expectedPaddingCount = 4;
                break;
            case 5:
                expectedPaddingCount = 3;
                break;
            case 7:
                expectedPaddingCount = 1;
                break;
            default:
                return failedCodecResult("Base32 has an invalid data length.");
        }

        if (paddingCount !== expectedPaddingCount) {
            return failedCodecResult("Base32 padding is not canonical.");
        }

        for (
            characterIndex = 0;
            characterIndex < normalizedInput.length;
            characterIndex += 1
        ) {
            characterValue = BASE32_ALPHABET.indexOf(
                normalizedInput.charAt(characterIndex)
            );
            accumulator = (accumulator << 5) | characterValue;
            availableBits += 5;

            if (availableBits >= 8) {
                availableBits -= 8;
                bytes.push((accumulator >> availableBits) & 0xFF);
            }
        }

        if (availableBits > 0) {
            if ((accumulator & ((1 << availableBits) - 1)) !== 0) {
                return failedCodecResult("Base32 contains non-zero trailing pad bits.");
            }
        }

        return successfulCodecResult(bytes);
    }

    function bytesToBase58(bytes) {
        var byteIndex;
        var digitIndex;
        var digits = [0];
        var output = "";
        var value;
        var zeroCount = 0;

        while (zeroCount < bytes.length) {
            if (bytes[zeroCount] !== 0) {
                break;
            }

            zeroCount += 1;
        }

        for (byteIndex = zeroCount; byteIndex < bytes.length; byteIndex += 1) {
            value = bytes[byteIndex];

            for (digitIndex = 0; digitIndex < digits.length; digitIndex += 1) {
                value += digits[digitIndex] * 256;
                digits[digitIndex] = value % 58;
                value = Math.floor(value / 58);
            }

            while (value > 0) {
                digits.push(value % 58);
                value = Math.floor(value / 58);
            }
        }

        for (byteIndex = 0; byteIndex < zeroCount; byteIndex += 1) {
            output += "1";
        }

        for (digitIndex = digits.length - 1; digitIndex >= 0; digitIndex -= 1) {
            if (zeroCount === bytes.length && digitIndex === 0) {
                break;
            }

            output += BASE58_ALPHABET.charAt(digits[digitIndex]);
        }

        return output;
    }

    function base58ToBytes(input) {
        var byteIndex;
        var bytes = [0];
        var characterIndex;
        var characterValue;
        var normalizedInput = input.trim();
        var value;
        var zeroCount = 0;

        for (
            characterIndex = 0;
            characterIndex < normalizedInput.length;
            characterIndex += 1
        ) {
            characterValue = BASE58_ALPHABET.indexOf(
                normalizedInput.charAt(characterIndex)
            );

            if (characterValue === -1) {
                return failedCodecResult("Base58 input contains an invalid character.");
            }

            value = characterValue;

            for (byteIndex = 0; byteIndex < bytes.length; byteIndex += 1) {
                value += bytes[byteIndex] * 58;
                bytes[byteIndex] = value & 0xFF;
                value >>= 8;
            }

            while (value > 0) {
                bytes.push(value & 0xFF);
                value >>= 8;
            }
        }

        while (zeroCount < normalizedInput.length) {
            if (normalizedInput.charAt(zeroCount) !== "1") {
                break;
            }

            zeroCount += 1;
        }

        if (normalizedInput.length === 0) {
            return successfulCodecResult([]);
        }

        if (bytes.length === 1 && bytes[0] === 0) {
            bytes = [];
        }

        while (zeroCount > 0) {
            bytes.push(0);
            zeroCount -= 1;
        }

        bytes.reverse();

        return successfulCodecResult(bytes);
    }

    function normalizeByteFormatName(formatName) {
        switch (formatName) {
            case "utf8":
            case "utf-8":
                return "text";
            case "base16":
                return "hex";
            case "bits":
                return "binary";
            case "numbers":
            case "decimal":
                return "bytes";
            default:
                return formatName;
        }
    }

    function decodeByteFormat(formatName, input) {
        var normalizedFormatName = normalizeByteFormatName(formatName);

        switch (normalizedFormatName) {
            case "text":
                return utf8TextToBytes(input);
            case "hex":
                return hexadecimalToBytes(input);
            case "base32":
                return base32ToBytes(input);
            case "base64":
                return base64ToBytes(input, false);
            case "base64url":
                return base64ToBytes(input, true);
            case "base58":
                return base58ToBytes(input);
            case "binary":
                return bitStringToBytes(input);
            case "bytes":
                return decimalListToBytes(input);
            case "integer":
                return bigEndianIntegerToBytes(input);
            default:
                return failedCodecResult(
                    "Unknown byte format. Run /codec formats."
                );
        }
    }

    function encodeByteFormat(formatName, bytes) {
        var normalizedFormatName = normalizeByteFormatName(formatName);
        var base64Text;

        switch (normalizedFormatName) {
            case "text":
                return utf8BytesToText(bytes);
            case "hex":
                return successfulCodecResult(bytesToHexadecimal(bytes));
            case "base32":
                return successfulCodecResult(bytesToBase32(bytes));
            case "base64":
                return successfulCodecResult(bytesToBase64(bytes));
            case "base64url":
                base64Text = bytesToBase64(bytes);
                base64Text = base64Text.replace(/\+/g, "-");
                base64Text = base64Text.replace(/\//g, "_");
                base64Text = base64Text.replace(/=+$/, "");
                return successfulCodecResult(base64Text);
            case "base58":
                return successfulCodecResult(bytesToBase58(bytes));
            case "binary":
                return successfulCodecResult(bytesToBitString(bytes));
            case "bytes":
                return successfulCodecResult(bytesToDecimalList(bytes));
            case "integer":
                return successfulCodecResult(bytesToBigEndianInteger(bytes));
            default:
                return failedCodecResult(
                    "Unknown byte format. Run /codec formats."
                );
        }
    }

    function convertByteFormats(inputFormat, outputFormat, input) {
        var decodedResult = decodeByteFormat(inputFormat, input);

        if (!decodedResult.succeeded) {
            return decodedResult;
        }

        return encodeByteFormat(outputFormat, decodedResult.value);
    }

    function encodeUrlComponent(input) {
        try {
            return successfulCodecResult(encodeURIComponent(input));
        } catch (error) {
            return failedCodecResult("Text could not be URL encoded.");
        }
    }

    function decodeUrlComponent(input) {
        try {
            return successfulCodecResult(decodeURIComponent(input));
        } catch (error) {
            return failedCodecResult("URL encoding is malformed.");
        }
    }

    function encodeHtmlEntities(input) {
        var characterIndex;
        var characterValue;
        var output = "";

        for (characterIndex = 0; characterIndex < input.length; characterIndex += 1) {
            characterValue = input.charAt(characterIndex);

            switch (characterValue) {
                case "&":
                    output += "&amp;";
                    break;
                case "<":
                    output += "&lt;";
                    break;
                case ">":
                    output += "&gt;";
                    break;
                case "\"":
                    output += "&quot;";
                    break;
                case "'":
                    output += "&#39;";
                    break;
                default:
                    output += characterValue;
                    break;
            }
        }

        return successfulCodecResult(output);
    }

    function decodeHtmlEntities(input) {
        var entityPattern = /&(?:amp|lt|gt|quot|apos|#39|#x[0-9a-fA-F]+|#[0-9]+);/g;
        var output = input.replace(entityPattern, function decodeHtmlEntity(entity) {
            var codePoint;
            var numericText;

            switch (entity) {
                case "&amp;":
                    return "&";
                case "&lt;":
                    return "<";
                case "&gt;":
                    return ">";
                case "&quot;":
                    return "\"";
                case "&apos;":
                case "&#39;":
                    return "'";
                default:
                    numericText = entity.slice(2, -1);

                    if (numericText.charAt(0).toLowerCase() === "x") {
                        codePoint = parseInt(numericText.slice(1), 16);
                    } else {
                        codePoint = parseInt(numericText, 10);
                    }

                    if (codePoint > 0x10FFFF) {
                        return entity;
                    }

                    if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
                        return entity;
                    }

                    return String.fromCodePoint(codePoint);
            }
        });

        return successfulCodecResult(output);
    }

    function encodeJsonString(input) {
        return successfulCodecResult(JSON.stringify(input));
    }

    function decodeJsonString(input) {
        var parsedValue;

        try {
            parsedValue = JSON.parse(input);
        } catch (error) {
            return failedCodecResult("JSON string syntax is malformed.");
        }

        if (typeof parsedValue !== "string") {
            return failedCodecResult(
                "JSON decode expects one quoted JSON string, not another JSON value."
            );
        }

        return successfulCodecResult(parsedValue);
    }

    function encodeUnicodeCodePoints(input) {
        var codePointIndex;
        var codePointResult = textToUnicodeCodePoints(input);
        var outputParts = [];
        var hexadecimalText;

        if (!codePointResult.succeeded) {
            return codePointResult;
        }

        for (
            codePointIndex = 0;
            codePointIndex < codePointResult.value.length;
            codePointIndex += 1
        ) {
            hexadecimalText = codePointResult.value[codePointIndex]
                .toString(16)
                .toUpperCase();

            while (hexadecimalText.length < 4) {
                hexadecimalText = "0" + hexadecimalText;
            }

            outputParts.push("U+" + hexadecimalText);
        }

        return successfulCodecResult(outputParts.join(" "));
    }

    function decodeUnicodeCodePoints(input) {
        var codePointIndex;
        var codePoints = [];
        var normalizedInput = input.trim();
        var parts;

        if (normalizedInput.length === 0) {
            return successfulCodecResult("");
        }

        parts = normalizedInput.split(/[\s,]+/);

        for (codePointIndex = 0; codePointIndex < parts.length; codePointIndex += 1) {
            if (!/^(?:U\+|u\+|\\u\{?)[0-9a-fA-F]+\}?$/.test(parts[codePointIndex])) {
                return failedCodecResult(
                    "Unicode input must use values such as U+0041 or U+1F680."
                );
            }

            codePoints.push(
                parseInt(
                    parts[codePointIndex]
                        .replace(/^(?:U\+|u\+|\\u\{?)/, "")
                        .replace(/\}$/, ""),
                    16
                )
            );
        }

        return unicodeCodePointsToText(codePoints);
    }

    function transformRot13(input) {
        var characterCode;
        var characterIndex;
        var output = "";

        for (characterIndex = 0; characterIndex < input.length; characterIndex += 1) {
            characterCode = input.charCodeAt(characterIndex);

            if (characterCode >= 65 && characterCode <= 90) {
                output += String.fromCharCode(
                    65 + ((characterCode - 65 + 13) % 26)
                );
                continue;
            }

            if (characterCode >= 97 && characterCode <= 122) {
                output += String.fromCharCode(
                    97 + ((characterCode - 97 + 13) % 26)
                );
                continue;
            }

            output += input.charAt(characterIndex);
        }

        return successfulCodecResult(output);
    }

    function encodeQuotedPrintable(input) {
        var byteIndex;
        var byteResult = utf8TextToBytes(input);
        var byteValue;
        var currentLineLength = 0;
        var output = "";
        var outputToken;

        if (!byteResult.succeeded) {
            return byteResult;
        }

        for (byteIndex = 0; byteIndex < byteResult.value.length; byteIndex += 1) {
            byteValue = byteResult.value[byteIndex];
            outputToken = "";

            if (byteValue >= 33 && byteValue <= 60) {
                outputToken = String.fromCharCode(byteValue);
            } else if (byteValue >= 62 && byteValue <= 126) {
                outputToken = String.fromCharCode(byteValue);
            } else {
                outputToken = "=" + byteToHexadecimal(byteValue);
            }

            if (currentLineLength + outputToken.length > 75) {
                output += "=\r\n";
                currentLineLength = 0;
            }

            output += outputToken;
            currentLineLength += outputToken.length;
        }

        return successfulCodecResult(output);
    }

    function decodeQuotedPrintable(input) {
        var bytes = [];
        var characterIndex = 0;
        var characterValue;
        var hexadecimalText;
        var normalizedInput = input.replace(/=\r?\n/g, "");

        while (characterIndex < normalizedInput.length) {
            characterValue = normalizedInput.charAt(characterIndex);

            if (characterValue === "=") {
                if (characterIndex + 2 >= normalizedInput.length) {
                    return failedCodecResult("Quoted-printable ends inside an escape.");
                }

                hexadecimalText = normalizedInput.slice(
                    characterIndex + 1,
                    characterIndex + 3
                );

                if (!/^[0-9a-fA-F]{2}$/.test(hexadecimalText)) {
                    return failedCodecResult("Quoted-printable contains an invalid escape.");
                }

                bytes.push(parseInt(hexadecimalText, 16));
                characterIndex += 3;
                continue;
            }

            if (normalizedInput.charCodeAt(characterIndex) > 127) {
                return failedCodecResult(
                    "Quoted-printable input must contain ASCII characters only."
                );
            }

            bytes.push(normalizedInput.charCodeAt(characterIndex));
            characterIndex += 1;
        }

        return utf8BytesToText(bytes);
    }

    function encodeMimeWord(input, encodingName) {
        var byteIndex;
        var byteResult;
        var byteValue;
        var encodedResult;
        var mimeQCharacterIsSafe;
        var output = "";

        if (encodingName === "B") {
            encodedResult = utf8TextToBytes(input);

            if (!encodedResult.succeeded) {
                return encodedResult;
            }

            output = bytesToBase64(encodedResult.value);
            output = "=?UTF-8?B?" + output + "?=";

            if (output.length > 75) {
                return failedCodecResult(
                    "MIME encoded-word output exceeds the 75-character RFC limit; encode a shorter value."
                );
            }

            return successfulCodecResult(output);
        }

        byteResult = utf8TextToBytes(input);

        if (!byteResult.succeeded) {
            return byteResult;
        }

        for (byteIndex = 0; byteIndex < byteResult.value.length; byteIndex += 1) {
            byteValue = byteResult.value[byteIndex];

            if (byteValue === 32) {
                output += "_";
                continue;
            }

            mimeQCharacterIsSafe = byteValue >= 33 && byteValue <= 126;

            if (byteValue === 61) {
                mimeQCharacterIsSafe = false;
            }

            if (byteValue === 63) {
                mimeQCharacterIsSafe = false;
            }

            if (byteValue === 95) {
                mimeQCharacterIsSafe = false;
            }

            if (mimeQCharacterIsSafe) {
                output += String.fromCharCode(byteValue);
                continue;
            }

            output += "=" + byteToHexadecimal(byteValue);
        }

        output = "=?UTF-8?Q?" + output + "?=";

        if (output.length > 75) {
            return failedCodecResult(
                "MIME encoded-word output exceeds the 75-character RFC limit; encode a shorter value."
            );
        }

        return successfulCodecResult(output);
    }

    function decodeMimeWord(input) {
        var base64Result;
        var charset;
        var encodedText;
        var encodingName;
        var match = /^=\?([^?]+)\?([bBqQ])\?([^?]*)\?=$/.exec(input.trim());
        var quotedPrintableResult;

        if (match === null) {
            return failedCodecResult("MIME encoded-word syntax is malformed.");
        }

        charset = match[1].toUpperCase();
        encodingName = match[2].toUpperCase();
        encodedText = match[3];

        switch (charset) {
            case "UTF-8":
            case "UTF8":
            case "US-ASCII":
                break;
            default:
                return failedCodecResult(
                    "Only UTF-8 and US-ASCII MIME encoded-words are supported."
                );
        }

        if (encodingName === "B") {
            base64Result = base64ToBytes(encodedText, false);

            if (!base64Result.succeeded) {
                return base64Result;
            }

            return utf8BytesToText(base64Result.value);
        }

        encodedText = encodedText.replace(/_/g, " ");
        quotedPrintableResult = decodeQuotedPrintable(encodedText);

        return quotedPrintableResult;
    }

    function punycodeEncodeDigit(digit) {
        if (digit < 26) {
            return String.fromCharCode(97 + digit);
        }

        return String.fromCharCode(22 + digit);
    }

    function punycodeDecodeDigit(characterCode) {
        if (characterCode >= 48 && characterCode <= 57) {
            return characterCode - 22;
        }

        if (characterCode >= 65 && characterCode <= 90) {
            return characterCode - 65;
        }

        if (characterCode >= 97 && characterCode <= 122) {
            return characterCode - 97;
        }

        return PUNYCODE_BASE;
    }

    function adaptPunycodeBias(delta, pointCount, firstTime) {
        var adjustment = Math.floor(delta / 2);
        var biasAdjustment = 0;
        var threshold =
            Math.floor(
                ((PUNYCODE_BASE - PUNYCODE_THRESHOLD_MINIMUM) *
                    PUNYCODE_THRESHOLD_MAXIMUM) /
                    2
            );

        if (firstTime) {
            adjustment = Math.floor(delta / PUNYCODE_DAMP);
        }

        adjustment += Math.floor(adjustment / pointCount);

        while (adjustment > threshold) {
            adjustment = Math.floor(
                adjustment /
                    (PUNYCODE_BASE - PUNYCODE_THRESHOLD_MINIMUM)
            );
            biasAdjustment += PUNYCODE_BASE;
        }

        return biasAdjustment +
            Math.floor(
                ((PUNYCODE_BASE - PUNYCODE_THRESHOLD_MINIMUM + 1) *
                    adjustment) /
                    (adjustment + PUNYCODE_SKEW)
            );
    }

    function encodePunycodeLabel(label) {
        var bias = PUNYCODE_INITIAL_BIAS;
        var codePoint;
        var codePointIndex;
        var codePointResult = textToUnicodeCodePoints(label);
        var basicPointCount = 0;
        var delta = 0;
        var handledPointCount = 0;
        var minimumCodePoint;
        var nextCodePoint = PUNYCODE_INITIAL_CODE_POINT;
        var oldDelta;
        var output = "";
        var threshold;
        var variableLengthValue;
        var weight;

        if (!codePointResult.succeeded) {
            return codePointResult;
        }

        for (
            codePointIndex = 0;
            codePointIndex < codePointResult.value.length;
            codePointIndex += 1
        ) {
            codePoint = codePointResult.value[codePointIndex];

            if (codePoint < 0x80) {
                output += String.fromCodePoint(codePoint);
                handledPointCount += 1;
                basicPointCount += 1;
            }
        }

        if (handledPointCount === codePointResult.value.length) {
            return successfulCodecResult(label.toLowerCase());
        }

        if (handledPointCount > 0) {
            output += PUNYCODE_DELIMITER;
        }

        while (handledPointCount < codePointResult.value.length) {
            minimumCodePoint = 0x10FFFF;

            for (
                codePointIndex = 0;
                codePointIndex < codePointResult.value.length;
                codePointIndex += 1
            ) {
                codePoint = codePointResult.value[codePointIndex];

                if (codePoint >= nextCodePoint && codePoint < minimumCodePoint) {
                    minimumCodePoint = codePoint;
                }
            }

            delta +=
                (minimumCodePoint - nextCodePoint) *
                (handledPointCount + 1);

            if (!Number.isSafeInteger(delta)) {
                return failedCodecResult("Punycode arithmetic overflowed.");
            }

            nextCodePoint = minimumCodePoint;

            for (
                codePointIndex = 0;
                codePointIndex < codePointResult.value.length;
                codePointIndex += 1
            ) {
                codePoint = codePointResult.value[codePointIndex];

                if (codePoint < nextCodePoint) {
                    delta += 1;

                    if (!Number.isSafeInteger(delta)) {
                        return failedCodecResult("Punycode arithmetic overflowed.");
                    }
                }

                if (codePoint !== nextCodePoint) {
                    continue;
                }

                variableLengthValue = delta;
                weight = PUNYCODE_BASE;

                while (true) {
                    if (weight <= bias) {
                        threshold = PUNYCODE_THRESHOLD_MINIMUM;
                    } else if (
                        weight >=
                        bias + PUNYCODE_THRESHOLD_MAXIMUM
                    ) {
                        threshold = PUNYCODE_THRESHOLD_MAXIMUM;
                    } else {
                        threshold = weight - bias;
                    }

                    if (variableLengthValue < threshold) {
                        break;
                    }

                    output += punycodeEncodeDigit(
                        threshold +
                            ((variableLengthValue - threshold) %
                                (PUNYCODE_BASE - threshold))
                    );
                    variableLengthValue = Math.floor(
                        (variableLengthValue - threshold) /
                            (PUNYCODE_BASE - threshold)
                    );
                    weight += PUNYCODE_BASE;
                }

                output += punycodeEncodeDigit(variableLengthValue);
                oldDelta = delta;
                bias = adaptPunycodeBias(
                    delta,
                    handledPointCount + 1,
                    handledPointCount === basicPointCount
                );
                delta = 0;
                handledPointCount += 1;
            }

            delta += 1;
            nextCodePoint += 1;
        }

        return successfulCodecResult("xn--" + output.toLowerCase());
    }

    function decodePunycodeLabel(label) {
        var bias = PUNYCODE_INITIAL_BIAS;
        var characterIndex;
        var delimiterIndex;
        var digit;
        var inputIndex;
        var oldInsertionValue;
        var outputCodePoints = [];
        var pointCount;
        var threshold;
        var variableLengthValue;
        var weight;
        var nextCodePoint = PUNYCODE_INITIAL_CODE_POINT;
        var normalizedLabel = label.toLowerCase();

        if (normalizedLabel.indexOf("xn--") !== 0) {
            return successfulCodecResult(label);
        }

        normalizedLabel = normalizedLabel.slice(4);

        if (normalizedLabel.length === 0) {
            return failedCodecResult("Punycode label has no encoded payload.");
        }

        delimiterIndex = normalizedLabel.lastIndexOf(PUNYCODE_DELIMITER);
        inputIndex = 0;

        if (delimiterIndex !== -1) {
            for (characterIndex = 0; characterIndex < delimiterIndex; characterIndex += 1) {
                if (normalizedLabel.charCodeAt(characterIndex) >= 0x80) {
                    return failedCodecResult("Punycode basic segment must be ASCII.");
                }

                outputCodePoints.push(normalizedLabel.charCodeAt(characterIndex));
            }

            inputIndex = delimiterIndex + 1;
        }

        variableLengthValue = 0;

        while (inputIndex < normalizedLabel.length) {
            oldInsertionValue = variableLengthValue;
            weight = 1;

            for (pointCount = PUNYCODE_BASE; ; pointCount += PUNYCODE_BASE) {
                if (inputIndex >= normalizedLabel.length) {
                    return failedCodecResult("Punycode ends inside a variable-length integer.");
                }

                digit = punycodeDecodeDigit(
                    normalizedLabel.charCodeAt(inputIndex)
                );
                inputIndex += 1;

                if (digit >= PUNYCODE_BASE) {
                    return failedCodecResult("Punycode contains an invalid digit.");
                }

                variableLengthValue += digit * weight;

                if (!Number.isSafeInteger(variableLengthValue)) {
                    return failedCodecResult("Punycode arithmetic overflowed.");
                }

                if (pointCount <= bias) {
                    threshold = PUNYCODE_THRESHOLD_MINIMUM;
                } else if (
                    pointCount >= bias + PUNYCODE_THRESHOLD_MAXIMUM
                ) {
                    threshold = PUNYCODE_THRESHOLD_MAXIMUM;
                } else {
                    threshold = pointCount - bias;
                }

                if (digit < threshold) {
                    break;
                }

                weight *= PUNYCODE_BASE - threshold;

                if (!Number.isSafeInteger(weight)) {
                    return failedCodecResult("Punycode arithmetic overflowed.");
                }
            }

            pointCount = outputCodePoints.length + 1;
            bias = adaptPunycodeBias(
                variableLengthValue - oldInsertionValue,
                pointCount,
                oldInsertionValue === 0
            );
            nextCodePoint += Math.floor(variableLengthValue / pointCount);
            variableLengthValue %= pointCount;

            if (nextCodePoint > 0x10FFFF) {
                return failedCodecResult("Punycode decodes beyond U+10FFFF.");
            }

            outputCodePoints.splice(variableLengthValue, 0, nextCodePoint);
            variableLengthValue += 1;
        }

        return unicodeCodePointsToText(outputCodePoints);
    }

    function transformPunycodeDomain(input, encode) {
        var labelIndex;
        var labelResult;
        var labels = input.split(/[.\u3002\uFF0E\uFF61]/);
        var outputLabels = [];

        for (labelIndex = 0; labelIndex < labels.length; labelIndex += 1) {
            if (labels[labelIndex].length === 0) {
                outputLabels.push("");
                continue;
            }

            if (encode) {
                labelResult = encodePunycodeLabel(labels[labelIndex]);
            } else {
                labelResult = decodePunycodeLabel(labels[labelIndex]);
            }

            if (!labelResult.succeeded) {
                return labelResult;
            }

            outputLabels.push(labelResult.value);
        }

        return successfulCodecResult(outputLabels.join("."));
    }

    function phpParserReadExpectedAscii(parser, expectedText) {
        var characterIndex;

        for (
            characterIndex = 0;
            characterIndex < expectedText.length;
            characterIndex += 1
        ) {
            if (parser.index >= parser.bytes.length) {
                return failedCodecResult(
                    "PHP serialized data ended while reading '" +
                        expectedText +
                        "'."
                );
            }

            if (
                parser.bytes[parser.index] !==
                expectedText.charCodeAt(characterIndex)
            ) {
                return failedCodecResult(
                    "PHP serialized data expected '" +
                        expectedText +
                        "' at byte " +
                        parser.index +
                        "."
                );
            }

            parser.index += 1;
        }

        return successfulCodecResult("");
    }

    function phpParserReadAsciiUntil(parser, delimiterCharacter) {
        var characterCode;
        var output = "";

        while (parser.index < parser.bytes.length) {
            characterCode = parser.bytes[parser.index];
            parser.index += 1;

            if (characterCode === delimiterCharacter.charCodeAt(0)) {
                return successfulCodecResult(output);
            }

            if (characterCode > 0x7F) {
                return failedCodecResult(
                    "PHP serialized syntax contains a non-ASCII byte at byte " +
                        (parser.index - 1) +
                        "."
                );
            }

            output += String.fromCharCode(characterCode);
        }

        return failedCodecResult(
            "PHP serialized data is missing '" + delimiterCharacter + "'."
        );
    }

    function parsePhpNonNegativeCount(parser, countName, maximumValue) {
        var countResult = phpParserReadAsciiUntil(parser, ":");
        var countValue;

        if (!countResult.succeeded) {
            return countResult;
        }

        if (!/^\d+$/.test(countResult.value)) {
            return failedCodecResult(
                "PHP serialized " + countName + " must be a non-negative integer."
            );
        }

        countValue = Number(countResult.value);

        if (!Number.isSafeInteger(countValue)) {
            return failedCodecResult(
                "PHP serialized " + countName + " exceeds JavaScript's safe range."
            );
        }

        if (countValue > maximumValue) {
            return failedCodecResult(
                "PHP serialized " +
                    countName +
                    " exceeds the " +
                    maximumValue +
                    " limit."
            );
        }

        return successfulCodecResult(countValue);
    }

    function parsePhpSerializedStringAfterType(parser) {
        var byteLengthResult;
        var closingResult;
        var stringBytes;
        var stringResult;

        byteLengthResult = parsePhpNonNegativeCount(
            parser,
            "string byte length",
            MAXIMUM_PHP_STRING_BYTE_LENGTH
        );

        if (!byteLengthResult.succeeded) {
            return byteLengthResult;
        }

        closingResult = phpParserReadExpectedAscii(parser, "\"");

        if (!closingResult.succeeded) {
            return closingResult;
        }

        if (parser.index + byteLengthResult.value > parser.bytes.length) {
            return failedCodecResult(
                "PHP serialized string byte length exceeds the remaining input."
            );
        }

        stringBytes = parser.bytes.slice(
            parser.index,
            parser.index + byteLengthResult.value
        );
        parser.index += byteLengthResult.value;

        closingResult = phpParserReadExpectedAscii(parser, "\";");

        if (!closingResult.succeeded) {
            return closingResult;
        }

        stringResult = utf8BytesToText(stringBytes);

        if (!stringResult.succeeded) {
            return failedCodecResult(
                "PHP serialized string is not valid UTF-8: " +
                    stringResult.error
            );
        }

        return stringResult;
    }

    function phpObjectHasOwnProperty(objectValue, propertyName) {
        return Object.prototype.hasOwnProperty.call(objectValue, propertyName);
    }

    function normalizePhpObjectPropertyName(propertyName) {
        var finalNullIndex = propertyName.lastIndexOf("\u0000");

        if (finalNullIndex === -1) {
            return propertyName;
        }

        return propertyName.slice(finalNullIndex + 1);
    }

    function parsePhpSerializedArrayAfterType(parser) {
        var closingResult;
        var memberCountResult = parsePhpNonNegativeCount(
            parser,
            "array member count",
            MAXIMUM_PHP_SERIALIZATION_ITEMS
        );

        if (!memberCountResult.succeeded) {
            return memberCountResult;
        }

        closingResult = phpParserReadExpectedAscii(parser, "{");

        if (!closingResult.succeeded) {
            return closingResult;
        }

        return successfulCodecResult({
            kind: "container",
            memberCount: memberCountResult.value,
            objectProperties: false
        });
    }

    function parsePhpSerializedObjectAfterType(parser) {
        var classByteLengthResult = parsePhpNonNegativeCount(
            parser,
            "object class-name byte length",
            MAXIMUM_PHP_STRING_BYTE_LENGTH
        );
        var classNameBytes;
        var classNameResult;
        var closingResult;
        var memberCountResult;

        if (!classByteLengthResult.succeeded) {
            return classByteLengthResult;
        }

        closingResult = phpParserReadExpectedAscii(parser, "\"");

        if (!closingResult.succeeded) {
            return closingResult;
        }

        if (parser.index + classByteLengthResult.value > parser.bytes.length) {
            return failedCodecResult(
                "PHP object class-name byte length exceeds the remaining input."
            );
        }

        classNameBytes = parser.bytes.slice(
            parser.index,
            parser.index + classByteLengthResult.value
        );
        parser.index += classByteLengthResult.value;
        classNameResult = utf8BytesToText(classNameBytes);

        if (!classNameResult.succeeded) {
            return failedCodecResult(
                "PHP object class name is not valid UTF-8."
            );
        }

        closingResult = phpParserReadExpectedAscii(parser, "\":");

        if (!closingResult.succeeded) {
            return closingResult;
        }

        memberCountResult = parsePhpNonNegativeCount(
            parser,
            "object property count",
            MAXIMUM_PHP_SERIALIZATION_ITEMS
        );

        if (!memberCountResult.succeeded) {
            return memberCountResult;
        }

        closingResult = phpParserReadExpectedAscii(parser, "{");

        if (!closingResult.succeeded) {
            return closingResult;
        }

        return successfulCodecResult({
            kind: "container",
            memberCount: memberCountResult.value,
            objectProperties: true
        });
    }

    /*
     * Reads one scalar or one container header. Nested members are deliberately
     * handled by parsePhpSerializedValue's explicit frame stack below, rather
     * than by recursive function calls.
     */
    function parsePhpSerializedToken(parser, depth) {
        var numericResult;
        var numericText;
        var separatorResult;
        var stringResult;
        var typeCharacter;

        if (depth > MAXIMUM_PHP_SERIALIZATION_DEPTH) {
            return failedCodecResult(
                "PHP serialized data exceeds the " +
                    MAXIMUM_PHP_SERIALIZATION_DEPTH +
                    "-level nesting limit."
            );
        }

        if (parser.index >= parser.bytes.length) {
            return failedCodecResult(
                "PHP serialized data ended before the next value."
            );
        }

        typeCharacter = String.fromCharCode(parser.bytes[parser.index]);
        parser.index += 1;

        if (typeCharacter === "N") {
            separatorResult = phpParserReadExpectedAscii(parser, ";");

            if (!separatorResult.succeeded) {
                return separatorResult;
            }

            return successfulCodecResult({
                kind: "value",
                value: null
            });
        }

        separatorResult = phpParserReadExpectedAscii(parser, ":");

        if (!separatorResult.succeeded) {
            return separatorResult;
        }

        switch (typeCharacter) {
            case "b":
                numericResult = phpParserReadAsciiUntil(parser, ";");

                if (!numericResult.succeeded) {
                    return numericResult;
                }

                if (numericResult.value === "0") {
                    return successfulCodecResult({
                        kind: "value",
                        value: false
                    });
                }

                if (numericResult.value === "1") {
                    return successfulCodecResult({
                        kind: "value",
                        value: true
                    });
                }

                return failedCodecResult(
                    "PHP serialized boolean must be b:0; or b:1;."
                );
            case "i":
                numericResult = phpParserReadAsciiUntil(parser, ";");

                if (!numericResult.succeeded) {
                    return numericResult;
                }

                if (!/^-?\d+$/.test(numericResult.value)) {
                    return failedCodecResult(
                        "PHP serialized integer syntax is malformed."
                    );
                }

                numericText = Number(numericResult.value);

                if (!Number.isSafeInteger(numericText)) {
                    return failedCodecResult(
                        "PHP serialized integer exceeds JavaScript's safe integer range."
                    );
                }

                return successfulCodecResult({
                    kind: "value",
                    value: numericText
                });
            case "d":
                numericResult = phpParserReadAsciiUntil(parser, ";");

                if (!numericResult.succeeded) {
                    return numericResult;
                }

                if (numericResult.value.trim().length === 0) {
                    return failedCodecResult(
                        "PHP serialized float syntax is malformed."
                    );
                }

                if (
                    !/^-?(?:\d+(?:\.\d*)?|\.\d+)(?:[Ee][+-]?\d+)?$/.test(
                        numericResult.value
                    )
                ) {
                    if (numericResult.value === "NAN") {
                        return failedCodecResult(
                            "PHP NAN and infinity cannot be represented in JSON."
                        );
                    }

                    if (numericResult.value === "INF") {
                        return failedCodecResult(
                            "PHP NAN and infinity cannot be represented in JSON."
                        );
                    }

                    if (numericResult.value === "-INF") {
                        return failedCodecResult(
                            "PHP NAN and infinity cannot be represented in JSON."
                        );
                    }

                    return failedCodecResult(
                        "PHP serialized float syntax is malformed."
                    );
                }

                numericText = Number(numericResult.value);

                if (!Number.isFinite(numericText)) {
                    return failedCodecResult(
                        "PHP NAN and infinity cannot be represented in JSON."
                    );
                }

                return successfulCodecResult({
                    kind: "value",
                    value: numericText
                });
            case "s":
                stringResult = parsePhpSerializedStringAfterType(parser);

                if (!stringResult.succeeded) {
                    return stringResult;
                }

                return successfulCodecResult({
                    kind: "value",
                    value: stringResult.value
                });
            case "a":
                return parsePhpSerializedArrayAfterType(parser);
            case "O":
                return parsePhpSerializedObjectAfterType(parser);
            case "R":
            case "r":
                return failedCodecResult(
                    "PHP serialized references cannot be represented faithfully in JSON."
                );
            case "C":
                return failedCodecResult(
                    "PHP custom-serialized objects are not supported."
                );
            case "E":
                return failedCodecResult(
                    "PHP enum serialization is not supported."
                );
            default:
                return failedCodecResult(
                    "Unsupported PHP serialized type '" + typeCharacter + "'."
                );
        }
    }

    function createPhpContainerFrame(containerToken) {
        return {
            arrayIsSequential: true,
            arrayValues: [],
            currentKey: null,
            expectingKey: true,
            memberCount: containerToken.memberCount,
            memberIndex: 0,
            objectProperties: containerToken.objectProperties,
            objectValue: Object.create(null)
        };
    }

    function completePhpContainerFrame(frame) {
        if (frame.objectProperties) {
            return frame.objectValue;
        }

        if (frame.arrayIsSequential) {
            return frame.arrayValues;
        }

        return frame.objectValue;
    }

    function parsePhpSerializedValue(parser) {
        var closingResult;
        var containerFrame;
        var containerFrames = [];
        var currentValue;
        var normalizedPropertyName;
        var tokenResult;

        while (true) {
            tokenResult = parsePhpSerializedToken(
                parser,
                containerFrames.length
            );

            if (!tokenResult.succeeded) {
                return tokenResult;
            }

            if (tokenResult.value.kind === "container") {
                containerFrame = createPhpContainerFrame(tokenResult.value);

                if (containerFrame.memberCount > 0) {
                    containerFrames.push(containerFrame);
                    continue;
                }

                closingResult = phpParserReadExpectedAscii(parser, "}");

                if (!closingResult.succeeded) {
                    return closingResult;
                }

                currentValue = completePhpContainerFrame(containerFrame);
            } else {
                currentValue = tokenResult.value.value;
            }

            while (true) {
                if (containerFrames.length === 0) {
                    return successfulCodecResult(currentValue);
                }

                containerFrame =
                    containerFrames[containerFrames.length - 1];

                if (containerFrame.expectingKey) {
                    if (
                        typeof currentValue !== "string" &&
                        (
                            typeof currentValue !== "number" ||
                            !Number.isSafeInteger(currentValue)
                        )
                    ) {
                        return failedCodecResult(
                            "PHP serialized array keys must be integers or strings."
                        );
                    }

                    containerFrame.currentKey = currentValue;
                    containerFrame.expectingKey = false;
                    break;
                }

                normalizedPropertyName = String(
                    containerFrame.currentKey
                );

                if (containerFrame.objectProperties) {
                    normalizedPropertyName = normalizePhpObjectPropertyName(
                        normalizedPropertyName
                    );
                }

                if (
                    phpObjectHasOwnProperty(
                        containerFrame.objectValue,
                        normalizedPropertyName
                    )
                ) {
                    return failedCodecResult(
                        "PHP serialized members collapse to the duplicate JSON key '" +
                            normalizedPropertyName +
                            "'."
                    );
                }

                containerFrame.objectValue[normalizedPropertyName] =
                    currentValue;
                containerFrame.arrayValues.push(currentValue);

                if (
                    containerFrame.currentKey !==
                    containerFrame.memberIndex
                ) {
                    containerFrame.arrayIsSequential = false;
                }

                containerFrame.memberIndex += 1;
                containerFrame.expectingKey = true;

                if (
                    containerFrame.memberIndex <
                    containerFrame.memberCount
                ) {
                    break;
                }

                closingResult = phpParserReadExpectedAscii(parser, "}");

                if (!closingResult.succeeded) {
                    return closingResult;
                }

                containerFrames.pop();
                currentValue = completePhpContainerFrame(containerFrame);
            }
        }
    }

    function decodePhpSerializationToJson(input) {
        var byteResult = utf8TextToBytes(input);
        var jsonText;
        var parser;
        var valueResult;

        if (!byteResult.succeeded) {
            return byteResult;
        }

        parser = {
            bytes: byteResult.value,
            index: 0
        };
        valueResult = parsePhpSerializedValue(parser);

        if (!valueResult.succeeded) {
            return valueResult;
        }

        if (parser.index !== parser.bytes.length) {
            return failedCodecResult(
                "PHP serialized data has trailing bytes after the first value."
            );
        }

        try {
            jsonText = JSON.stringify(valueResult.value);
        } catch (error) {
            return failedCodecResult(
                "Decoded PHP value could not be represented as JSON."
            );
        }

        return successfulCodecResult(jsonText);
    }

    function serializePhpString(value) {
        var byteResult = utf8TextToBytes(value);

        if (!byteResult.succeeded) {
            return byteResult;
        }

        return successfulCodecResult(
            "s:" +
                byteResult.value.length +
                ":\"" +
                value +
                "\";"
        );
    }

    function serializeJsonScalarToPhp(value) {
        if (value === null) {
            return successfulCodecResult("N;");
        }

        switch (typeof value) {
            case "boolean":
                if (value) {
                    return successfulCodecResult("b:1;");
                }

                return successfulCodecResult("b:0;");
            case "number":
                if (!Number.isFinite(value)) {
                    return failedCodecResult(
                        "JSON number cannot be serialized as a finite PHP number."
                    );
                }

                if (Number.isInteger(value)) {
                    if (!Number.isSafeInteger(value)) {
                        return failedCodecResult(
                            "JSON integer exceeds JavaScript's safe integer range."
                        );
                    }

                    return successfulCodecResult("i:" + value + ";");
                }

                return successfulCodecResult("d:" + String(value) + ";");
            case "string":
                return serializePhpString(value);
            default:
                return failedCodecResult(
                    "JSON value has an unsupported JavaScript type."
                );
        }
    }

    /*
     * Uses an explicit last-in-first-out work stack. Pushing children in
     * reverse order produces the same depth-first output as a recursive
     * serializer, without consuming the JavaScript call stack.
     */
    function serializeJsonValueToPhp(rootValue) {
        var elementIndex;
        var encodedKeyResult;
        var encodedScalarResult;
        var item;
        var objectKeys;
        var outputParts = [];
        var workItems = [{
            depth: 0,
            kind: "value",
            value: rootValue
        }];

        while (workItems.length > 0) {
            item = workItems.pop();

            if (item.kind === "text") {
                outputParts.push(item.text);
                continue;
            }

            if (item.depth > MAXIMUM_PHP_SERIALIZATION_DEPTH) {
                return failedCodecResult(
                    "JSON exceeds the " +
                        MAXIMUM_PHP_SERIALIZATION_DEPTH +
                        "-level nesting limit."
                );
            }

            if (item.value === null || typeof item.value !== "object") {
                encodedScalarResult = serializeJsonScalarToPhp(item.value);

                if (!encodedScalarResult.succeeded) {
                    return encodedScalarResult;
                }

                outputParts.push(encodedScalarResult.value);
                continue;
            }

            if (Array.isArray(item.value)) {
                if (item.value.length > MAXIMUM_PHP_SERIALIZATION_ITEMS) {
                    return failedCodecResult(
                        "JSON array exceeds the " +
                            MAXIMUM_PHP_SERIALIZATION_ITEMS +
                            "-item limit."
                    );
                }

                outputParts.push("a:" + item.value.length + ":{");
                workItems.push({
                    kind: "text",
                    text: "}"
                });

                for (
                    elementIndex = item.value.length - 1;
                    elementIndex >= 0;
                    elementIndex -= 1
                ) {
                    workItems.push({
                        depth: item.depth + 1,
                        kind: "value",
                        value: item.value[elementIndex]
                    });
                    workItems.push({
                        kind: "text",
                        text: "i:" + elementIndex + ";"
                    });
                }

                continue;
            }

            objectKeys = Object.keys(item.value);

            if (objectKeys.length > MAXIMUM_PHP_SERIALIZATION_ITEMS) {
                return failedCodecResult(
                    "JSON object exceeds the " +
                        MAXIMUM_PHP_SERIALIZATION_ITEMS +
                        "-property limit."
                );
            }

            outputParts.push(
                "O:8:\"stdClass\":" + objectKeys.length + ":{"
            );
            workItems.push({
                kind: "text",
                text: "}"
            });

            for (
                elementIndex = objectKeys.length - 1;
                elementIndex >= 0;
                elementIndex -= 1
            ) {
                encodedKeyResult = serializePhpString(
                    objectKeys[elementIndex]
                );

                if (!encodedKeyResult.succeeded) {
                    return encodedKeyResult;
                }

                workItems.push({
                    depth: item.depth + 1,
                    kind: "value",
                    value: item.value[objectKeys[elementIndex]]
                });
                workItems.push({
                    kind: "text",
                    text: encodedKeyResult.value
                });
            }
        }

        return successfulCodecResult(outputParts.join(""));
    }

    function encodeJsonAsPhpSerialization(input) {
        var parsedValue;

        try {
            parsedValue = JSON.parse(input);
        } catch (error) {
            return failedCodecResult(
                "PHP serialization encode expects valid JSON."
            );
        }

        return serializeJsonValueToPhp(parsedValue);
    }

    function encodeTextTransform(formatName, input) {
        switch (formatName) {
            case "url":
            case "percent":
                return encodeUrlComponent(input);
            case "html":
                return encodeHtmlEntities(input);
            case "json":
                return encodeJsonString(input);
            case "unicode":
            case "codepoints":
                return encodeUnicodeCodePoints(input);
            case "rot13":
                return transformRot13(input);
            case "quoted-printable":
            case "qp":
                return encodeQuotedPrintable(input);
            case "mime-b":
                return encodeMimeWord(input, "B");
            case "mime-q":
                return encodeMimeWord(input, "Q");
            case "punycode":
                return transformPunycodeDomain(input, true);
            case "php-serialize":
            case "php":
                return encodeJsonAsPhpSerialization(input);
            default:
                return convertByteFormats("text", formatName, input);
        }
    }

    function decodeTextTransform(formatName, input) {
        switch (formatName) {
            case "url":
            case "percent":
                return decodeUrlComponent(input);
            case "html":
                return decodeHtmlEntities(input);
            case "json":
                return decodeJsonString(input);
            case "unicode":
            case "codepoints":
                return decodeUnicodeCodePoints(input);
            case "rot13":
                return transformRot13(input);
            case "quoted-printable":
            case "qp":
                return decodeQuotedPrintable(input);
            case "mime":
            case "mime-b":
            case "mime-q":
                return decodeMimeWord(input);
            case "punycode":
                return transformPunycodeDomain(input, false);
            case "php-serialize":
            case "php":
                return decodePhpSerializationToJson(input);
            default:
                return convertByteFormats(formatName, "text", input);
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

    function outputCodecResult(result, sendOutput, commandEvent) {
        var outputContainsUnsafeIrcControl = false;
        var target;

        if (!result.succeeded) {
            printCodecStatus(result.error);
            return;
        }

        if (!sendOutput) {
            printCodecStatus(result.value);
            return;
        }

        if (result.value.indexOf("\u0000") !== -1) {
            outputContainsUnsafeIrcControl = true;
        }

        if (result.value.indexOf("\r") !== -1) {
            outputContainsUnsafeIrcControl = true;
        }

        if (result.value.indexOf("\n") !== -1) {
            outputContainsUnsafeIrcControl = true;
        }

        if (outputContainsUnsafeIrcControl) {
            printCodecStatus(
                "Refusing to send output containing NUL or a line break; print it locally instead."
            );
            return;
        }

        target = getCommandTarget(commandEvent);

        if (target.length === 0) {
            printCodecStatus("There is no active conversation to receive the output.");
            return;
        }

        birc.say(target, result.value);
    }

    function printCodecFormats() {
        printCodecStatus(
            "Byte formats: text, hex/base16, base32, base64, base64url, base58, binary/bits, bytes/decimal/numbers, integer."
        );
        printCodecStatus(
            "Text transforms: url/percent, html, json, unicode/codepoints, rot13, quoted-printable/qp, mime-b, mime-q, punycode, php-serialize/php."
        );
        printCodecStatus(
            "Base128 is not included because there is no single interoperable Base128 text standard."
        );
    }

    function printCodecHelp() {
        printCodecStatus("bIRC Codec Utilities — complete help");
        printCodecStatus("OPERATIONS");
        printCodecStatus("/codec encode <format> <text>");
        printCodecStatus("/codec decode <format> <encoded-data>");
        printCodecStatus(
            "/codec convert <input-format> <output-format> <encoded-data>"
        );
        printCodecStatus(
            "Prefix an operation with 'say' to send its result: /codec say encode base64 hello"
        );
        printCodecStatus("/codec formats lists every supported format.");
        printCodecStatus("/codec remote <on|off|status>");
        printCodecStatus("BYTE FORMATS");
        printCodecStatus("text/utf8, hex/base16, base32, base64, base64url, base58, binary/bits, bytes/decimal/numbers, integer.");
        printCodecStatus("bytes is decimal octets; integer is one unsigned big-endian value; Base58 uses the Bitcoin alphabet.");
        printCodecStatus("TEXT AND WEB TRANSFORMS");
        printCodecStatus("url/percent, html, json, unicode/codepoints, rot13, quoted-printable/qp, mime/mime-b/mime-q, punycode, php-serialize/php.");
        printCodecStatus("Punycode transforms labels but does not perform IDNA validation.");
        printCodecStatus("MIME creates or decodes one UTF-8/US-ASCII encoded-word and enforces its 75-character limit.");
        printCodecStatus("PHP decode returns JSON; PHP class names are discarded and no classes or hooks execute.");
        printCodecStatus("PHP encode accepts JSON; objects become bare stdClass values and arrays become PHP arrays.");
        printCodecStatus("REMOTE USE");
        printCodecStatus("When enabled: @YourNick codec encode base64 hello");
        printCodecStatus("Remote requests ignore self/backlog, reply in context, and cap output at 4 lines of 400 characters.");
        printCodecStatus("EXAMPLES");
        printCodecStatus("/codec encode hex Hello");
        printCodecStatus("/codec decode hex 48656C6C6F");
        printCodecStatus("/codec convert hex bytes 48656C6C6F");
        printCodecStatus("/codec convert hex integer FF");
        printCodecStatus("/codec convert integer hex 65535");
        printCodecStatus("/codec encode url query string & value");
        printCodecStatus("/codec encode unicode A🚀");
        printCodecStatus("/codec encode punycode münich.example");
        printCodecStatus("/codec encode mime-b Résumé");
        printCodecStatus(
            "/codec decode php-serialize a:1:{s:4:\"name\";s:3:\"Ada\";}"
        );
        printCodecStatus("/codec encode php {\"name\":\"Ada\",\"active\":true}");
        printCodecStatus("/codec say encode base64 hello");
        printCodecStatus("LIMITS AND FAILURE BEHAVIOR");
        printCodecStatus("Input is limited to 4096 characters. Decoders reject bad alphabets, padding, UTF-8, scalar values, and syntax.");
        printCodecStatus("say refuses NUL and line breaks so one result cannot inject multiple IRC messages.");
        printCodecStatus(
            "All transformations are local. Optional HTTPS permission is used only for the daily version-manifest check."
        );
        printCodecStatus(
            "Script " + SCRIPT_ID + " version " + SCRIPT_VERSION +
            " checks the public bIRC Utils version manifest at most once per day."
        );
    }

    function runCodecCommand(argumentsText, commandEvent) {
        var firstPart = splitFirstWord(argumentsText);
        var inputLengthResult;
        var inputText;
        var operation = firstPart.word.toLowerCase();
        var outputFormatPart;
        var result;
        var sendOutput = false;
        var sourceFormatPart;

        if (operation.length === 0 || operation === "help") {
            printCodecHelp();
            return;
        }

        if (operation === "formats") {
            printCodecFormats();
            return;
        }

        if (operation === "remote") {
            handleCodecRemoteConfiguration(firstPart.remainder);
            return;
        }

        if (operation === "say") {
            sendOutput = true;
            firstPart = splitFirstWord(firstPart.remainder);
            operation = firstPart.word.toLowerCase();
        }

        sourceFormatPart = splitFirstWord(firstPart.remainder);

        if (sourceFormatPart.word.length === 0) {
            printCodecStatus("A format is required. Run /codec help.");
            return;
        }

        if (operation === "convert") {
            outputFormatPart = splitFirstWord(sourceFormatPart.remainder);

            if (outputFormatPart.word.length === 0) {
                printCodecStatus(
                    "Convert requires input and output formats."
                );
                return;
            }

            inputText = outputFormatPart.remainder;
            inputLengthResult = validateInputLength(inputText);

            if (!inputLengthResult.succeeded) {
                printCodecStatus(inputLengthResult.error);
                return;
            }

            result = convertByteFormats(
                sourceFormatPart.word.toLowerCase(),
                outputFormatPart.word.toLowerCase(),
                inputText
            );
            outputCodecResult(result, sendOutput, commandEvent);
            return;
        }

        inputText = sourceFormatPart.remainder;
        inputLengthResult = validateInputLength(inputText);

        if (!inputLengthResult.succeeded) {
            printCodecStatus(inputLengthResult.error);
            return;
        }

        if (operation === "encode") {
            result = encodeTextTransform(
                sourceFormatPart.word.toLowerCase(),
                inputText
            );
            outputCodecResult(result, sendOutput, commandEvent);
            return;
        }

        if (operation === "decode") {
            result = decodeTextTransform(
                sourceFormatPart.word.toLowerCase(),
                inputText
            );
            outputCodecResult(result, sendOutput, commandEvent);
            return;
        }

        printCodecStatus("Operation must be encode, decode, convert, or say.");
    }

    function remoteUseIsEnabled() {
        return birc.store.get(REMOTE_STORE_KEY) === true;
    }

    function handleCodecRemoteConfiguration(argumentsText) {
        var setting = argumentsText.trim().toLowerCase();

        if (setting === "on") {
            birc.store.set(REMOTE_STORE_KEY, true);
            printCodecStatus("Remote @mention use is enabled.");
            return;
        }

        if (setting === "off") {
            birc.store.delete(REMOTE_STORE_KEY);
            printCodecStatus("Remote @mention use is disabled.");
            return;
        }

        if (setting === "status" || setting.length === 0) {
            if (remoteUseIsEnabled()) {
                printCodecStatus("Remote @mention use is enabled.");
            } else {
                printCodecStatus("Remote @mention use is disabled.");
            }
            return;
        }

        printCodecStatus("Remote setting must be on, off, or status.");
    }

    function handleRemoteCodecRequest(event) {
        var commandPart;
        var mentionPart;
        var operation;
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
        if (commandPart.word.toLowerCase().replace(/^\//, "") !== "codec") {
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
            operation = splitFirstWord(commandPart.remainder).word.toLowerCase();
            if (operation === "remote" || operation === "say") {
                printCodecStatus(
                    "Remote configuration and 'say' are local-only."
                );
                return;
            }
            runCodecCommand(commandPart.remainder, event);
        } finally {
            remoteReplyContext = null;
        }
    }

    function completeCodecCommand(word) {
        var candidateIndex;
        var candidates = [
            "help", "formats", "encode", "decode", "convert", "say",
            "text", "hex", "base16", "base32", "base64", "base64url",
            "base58", "binary", "bits", "bytes", "decimal", "integer",
            "url", "percent", "html", "json", "unicode", "codepoints",
            "rot13", "quoted-printable", "qp", "mime-b", "mime-q",
            "punycode", "php-serialize", "php",
            "remote", "on", "off", "status"
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

    birc.onCommand("codec", runCodecCommand);
    birc.onComplete(completeCodecCommand);
    birc.on("message", handleRemoteCodecRequest);

    birc.on("load", function printCodecScriptLoadMessage() {
        checkForScriptUpdate();
        printCodecStatus("Loaded. Run /codec help.");
    });
}());
