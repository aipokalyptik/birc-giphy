/*
 * bIRC Hash Utilities source entrypoint.
 *
 * Run `npm run build:hash` to create the standalone ../birc-hash.js import.
 */

import CryptoJS from "crypto-js/core.js";
import "crypto-js/md5.js";
import "crypto-js/sha1.js";
import "crypto-js/sha256.js";
import "crypto-js/sha224.js";
import "crypto-js/x64-core.js";
import "crypto-js/sha512.js";
import "crypto-js/sha384.js";
import "crypto-js/ripemd160.js";
import "crypto-js/hmac.js";
import "crypto-js/hmac-md5.js";
import "crypto-js/hmac-sha1.js";
import "crypto-js/hmac-sha256.js";
import "crypto-js/hmac-sha224.js";
import "crypto-js/hmac-sha512.js";
import "crypto-js/hmac-sha384.js";
import "crypto-js/hmac-ripemd160.js";
import bcrypt, {
    setHashTables as setBcryptHashTables
} from "../generated/bcrypt-runtime.js";
import {
    HASH_DATA_SHA256,
    HASH_DATA_STORE_KEY,
    HASH_DATA_URL
} from "../generated/hash-data-contract.js";
import unixCrypt from "unix-crypt-td-js";

(function registerBircHashUtilitiesScript() {
    "use strict";

    var PHPASS_ALPHABET =
        "./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var MAXIMUM_INPUT_LENGTH = 4096;
    var MAXIMUM_REMOTE_LINES = 4;
    var MAXIMUM_REMOTE_LINE_LENGTH = 400;
    var REMOTE_STORE_KEY = "hash.remote.enabled";
    var bcryptDataDownloadInProgress = false;
    var bcryptTablesReady = false;
    var bcryptTablesStatus = "not loaded";
    var remoteReplyContext = null;

    function extractWordsFromBlowfishArray(sourceText, arrayName) {
        var arrayMatch;
        var hexadecimalWords;
        var wordIndex;
        var words = [];
        var declarationPattern = new RegExp(
            "unsigned\\s+long\\s+" +
                arrayName +
                "\\[\\]\\s*=\\s*\\{([\\s\\S]*?)\\};"
        );

        arrayMatch = declarationPattern.exec(sourceText);
        if (arrayMatch === null) {
            return null;
        }

        hexadecimalWords = arrayMatch[1].match(/0x[0-9A-Fa-f]{8}L/g);
        if (hexadecimalWords === null) {
            return null;
        }

        for (wordIndex = 0; wordIndex < hexadecimalWords.length; wordIndex += 1) {
            words.push(Number(hexadecimalWords[wordIndex].slice(0, -1)));
        }

        return words;
    }

    function extractHashDataFromIetfDraft(sourceText) {
        var bcryptP;
        var bcryptS = [];
        var boxIndex;
        var boxWords;

        if (typeof sourceText !== "string") {
            bcryptTablesStatus = "source has an invalid format";
            return null;
        }

        bcryptP = extractWordsFromBlowfishArray(sourceText, "pArray");
        if (bcryptP === null || bcryptP.length !== 18) {
            bcryptTablesStatus = "source has an invalid P table";
            return null;
        }

        for (boxIndex = 0; boxIndex < 4; boxIndex += 1) {
            boxWords = extractWordsFromBlowfishArray(
                sourceText,
                "sBox" + boxIndex
            );
            if (boxWords === null || boxWords.length !== 256) {
                bcryptTablesStatus = "source has an invalid S table";
                return null;
            }
            bcryptS = bcryptS.concat(boxWords);
        }

        return JSON.stringify({
            version: 1,
            bcryptP: bcryptP,
            bcryptS: bcryptS
        }) + "\n";
    }

    function validateAndActivateHashData(serializedData) {
        var parsedData;

        if (typeof serializedData !== "string") {
            return false;
        }

        if (CryptoJS.SHA256(serializedData).toString() !== HASH_DATA_SHA256) {
            bcryptTablesStatus = "failed integrity validation";
            return false;
        }

        try {
            parsedData = JSON.parse(serializedData);
        } catch (error) {
            bcryptTablesStatus = "contained invalid JSON";
            return false;
        }

        if (parsedData.version !== 1) {
            bcryptTablesStatus = "has an unsupported version";
            return false;
        }

        if (!Array.isArray(parsedData.bcryptP)) {
            bcryptTablesStatus = "has an invalid bcrypt P table";
            return false;
        }

        if (parsedData.bcryptP.length !== 18) {
            bcryptTablesStatus = "has an invalid bcrypt P table";
            return false;
        }

        if (!Array.isArray(parsedData.bcryptS)) {
            bcryptTablesStatus = "has an invalid bcrypt S table";
            return false;
        }

        if (parsedData.bcryptS.length !== 1024) {
            bcryptTablesStatus = "has an invalid bcrypt S table";
            return false;
        }

        setBcryptHashTables(parsedData);
        bcryptTablesReady = true;
        bcryptTablesStatus = "ready";

        return true;
    }

    function fetchAndCacheHashData() {
        if (bcryptDataDownloadInProgress) {
            printHashStatus("bcrypt data download is already in progress.");
            return;
        }

        bcryptDataDownloadInProgress = true;
        bcryptTablesStatus = "downloading";
        birc.fetch(HASH_DATA_URL).then(function handleHashDataResponse(response) {
            var normalizedData;

            bcryptDataDownloadInProgress = false;

            if (response.status !== 200) {
                bcryptTablesStatus =
                    "download failed with HTTP " + response.status;
                printHashStatus("bcrypt data " + bcryptTablesStatus + ".");
                return;
            }

            normalizedData = extractHashDataFromIetfDraft(response.text);
            if (normalizedData === null) {
                printHashStatus("bcrypt data " + bcryptTablesStatus + ".");
                return;
            }

            if (!validateAndActivateHashData(normalizedData)) {
                printHashStatus("bcrypt data " + bcryptTablesStatus + ".");
                return;
            }

            birc.store.set(HASH_DATA_STORE_KEY, normalizedData);
            printHashStatus("bcrypt data downloaded, validated, and cached.");
        }).catch(function handleHashDataFailure() {
            bcryptDataDownloadInProgress = false;
            bcryptTablesStatus = "download failed";
            printHashStatus("bcrypt data download failed.");
        });
    }

    function loadHashData() {
        var cachedData = birc.store.get(HASH_DATA_STORE_KEY);

        if (validateAndActivateHashData(cachedData)) {
            return;
        }

        fetchAndCacheHashData();
    }

    function printHashStatus(message) {
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

        birc.print("[Hash] " + message);
    }

    function splitFirstWord(input) {
        var firstWhitespaceIndex;
        var trimmedInput = input.trim();

        firstWhitespaceIndex = trimmedInput.search(/\s/);

        if (firstWhitespaceIndex === -1) {
            return { word: trimmedInput, remainder: "" };
        }

        return {
            word: trimmedInput.slice(0, firstWhitespaceIndex),
            remainder: trimmedInput.slice(firstWhitespaceIndex).trim()
        };
    }

    function splitAtPipe(input) {
        var pipeIndex = input.indexOf("|");

        if (pipeIndex === -1) {
            return null;
        }

        return {
            left: input.slice(0, pipeIndex).trim(),
            right: input.slice(pipeIndex + 1).trim()
        };
    }

    function cryptoJsDigest(algorithm, message) {
        switch (algorithm) {
            case "md5":
                return CryptoJS.MD5(message).toString();
            case "sha1":
            case "sha-1":
                return CryptoJS.SHA1(message).toString();
            case "sha256":
            case "sha-256":
                return CryptoJS.SHA256(message).toString();
            case "sha224":
            case "sha-224":
                return CryptoJS.SHA224(message).toString();
            case "sha512":
            case "sha-512":
                return CryptoJS.SHA512(message).toString();
            case "sha384":
            case "sha-384":
                return CryptoJS.SHA384(message).toString();
            case "ripemd160":
            case "ripemd-160":
                return CryptoJS.RIPEMD160(message).toString();
            default:
                return "";
        }
    }

    function cryptoJsHmac(algorithm, key, message) {
        switch (algorithm) {
            case "md5":
                return CryptoJS.HmacMD5(message, key).toString();
            case "sha1":
            case "sha-1":
                return CryptoJS.HmacSHA1(message, key).toString();
            case "sha256":
            case "sha-256":
                return CryptoJS.HmacSHA256(message, key).toString();
            case "sha224":
            case "sha-224":
                return CryptoJS.HmacSHA224(message, key).toString();
            case "sha512":
            case "sha-512":
                return CryptoJS.HmacSHA512(message, key).toString();
            case "sha384":
            case "sha-384":
                return CryptoJS.HmacSHA384(message, key).toString();
            case "ripemd160":
            case "ripemd-160":
                return CryptoJS.HmacRIPEMD160(message, key).toString();
            default:
                return "";
        }
    }

    function utf8Bytes(text) {
        var byteIndex;
        var bytes = [];
        var wordArray = CryptoJS.enc.Utf8.parse(text);

        for (byteIndex = 0; byteIndex < wordArray.sigBytes; byteIndex += 1) {
            bytes.push(
                (wordArray.words[byteIndex >>> 2] >>>
                    (24 - ((byteIndex % 4) * 8))) &
                    255
            );
        }

        return bytes;
    }

    function checksumTable(polynomial) {
        var bitIndex;
        var table = [];
        var tableIndex;
        var value;

        for (tableIndex = 0; tableIndex < 256; tableIndex += 1) {
            value = tableIndex;

            for (bitIndex = 0; bitIndex < 8; bitIndex += 1) {
                if ((value & 1) !== 0) {
                    value = (value >>> 1) ^ polynomial;
                } else {
                    value >>>= 1;
                }
            }

            table.push(value >>> 0);
        }

        return table;
    }

    var CRC32_TABLE = checksumTable(0xEDB88320);
    var CRC32C_TABLE = checksumTable(0x82F63B78);

    function crcChecksum(bytes, table) {
        var byteIndex;
        var value = 0xFFFFFFFF;

        for (byteIndex = 0; byteIndex < bytes.length; byteIndex += 1) {
            value = (value >>> 8) ^ table[(value ^ bytes[byteIndex]) & 255];
        }

        return ((value ^ 0xFFFFFFFF) >>> 0).toString(16).padStart(8, "0");
    }

    function adler32Checksum(bytes) {
        var byteIndex;
        var firstSum = 1;
        var secondSum = 0;

        for (byteIndex = 0; byteIndex < bytes.length; byteIndex += 1) {
            firstSum = (firstSum + bytes[byteIndex]) % 65521;
            secondSum = (secondSum + firstSum) % 65521;
        }

        return (((secondSum << 16) | firstSum) >>> 0)
            .toString(16)
            .padStart(8, "0");
    }

    function fnv1a32Checksum(bytes) {
        var byteIndex;
        var value = 0x811C9DC5;

        for (byteIndex = 0; byteIndex < bytes.length; byteIndex += 1) {
            value ^= bytes[byteIndex];
            value = Math.imul(value, 0x01000193);
        }

        return (value >>> 0).toString(16).padStart(8, "0");
    }

    function calculateChecksum(algorithm, message) {
        var bytes = utf8Bytes(message);

        switch (algorithm) {
            case "crc32":
                return crcChecksum(bytes, CRC32_TABLE);
            case "crc32c":
                return crcChecksum(bytes, CRC32C_TABLE);
            case "adler32":
                return adler32Checksum(bytes);
            case "fnv1a32":
                return fnv1a32Checksum(bytes);
            default:
                return "";
        }
    }

    function encodePhpassBytes(inputBytes, outputCharacterCount) {
        var byteIndex = 0;
        var output = "";
        var value;

        while (byteIndex < inputBytes.length) {
            value = inputBytes[byteIndex];
            byteIndex += 1;
            output += PHPASS_ALPHABET.charAt(value & 63);

            if (byteIndex < inputBytes.length) {
                value |= inputBytes[byteIndex] << 8;
            }

            output += PHPASS_ALPHABET.charAt((value >> 6) & 63);

            if (byteIndex >= inputBytes.length) {
                break;
            }

            byteIndex += 1;

            if (byteIndex < inputBytes.length) {
                value |= inputBytes[byteIndex] << 16;
            }

            output += PHPASS_ALPHABET.charAt((value >> 12) & 63);

            if (byteIndex >= inputBytes.length) {
                break;
            }

            byteIndex += 1;
            output += PHPASS_ALPHABET.charAt((value >> 18) & 63);
        }

        return output.slice(0, outputCharacterCount);
    }

    function cryptoJsWordArrayToBytes(wordArray) {
        var byteIndex;
        var bytes = [];

        for (byteIndex = 0; byteIndex < wordArray.sigBytes; byteIndex += 1) {
            bytes.push(
                (wordArray.words[byteIndex >>> 2] >>>
                    (24 - ((byteIndex % 4) * 8))) &
                    255
            );
        }

        return bytes;
    }

    function phpassHash(password, prefix, countLogarithm, salt) {
        var count = 1 << countLogarithm;
        var countCharacter = PHPASS_ALPHABET.charAt(countLogarithm);
        var hash = CryptoJS.MD5(
            CryptoJS.enc.Utf8.parse(salt).concat(
                CryptoJS.enc.Utf8.parse(password)
            )
        );
        var iterationIndex;
        var passwordWords = CryptoJS.enc.Utf8.parse(password);

        for (iterationIndex = 0; iterationIndex < count; iterationIndex += 1) {
            hash = CryptoJS.MD5(hash.clone().concat(passwordWords));
        }

        return prefix +
            countCharacter +
            salt +
            encodePhpassBytes(cryptoJsWordArrayToBytes(hash), 22);
    }

    function constantTimeStringsEqual(first, second) {
        var characterIndex;
        var difference = first.length ^ second.length;
        var firstCharacterCode;
        var maximumLength = Math.max(first.length, second.length);
        var secondCharacterCode;

        for (characterIndex = 0; characterIndex < maximumLength; characterIndex += 1) {
            firstCharacterCode = first.charCodeAt(characterIndex);
            secondCharacterCode = second.charCodeAt(characterIndex);

            if (Number.isNaN(firstCharacterCode)) {
                firstCharacterCode = 0;
            }

            if (Number.isNaN(secondCharacterCode)) {
                secondCharacterCode = 0;
            }

            difference |= firstCharacterCode ^ secondCharacterCode;
        }

        return difference === 0;
    }

    function hashBcrypt(argumentsText) {
        var costPart = splitFirstWord(argumentsText);
        var cost = Number(costPart.word);
        var saltAndPassword = splitAtPipe(costPart.remainder);
        var setting;

        if (!bcryptTablesReady) {
            printHashStatus(
                "bcrypt data is " +
                    bcryptTablesStatus +
                    "; wait for initialization and try again."
            );
            return;
        }

        if (!Number.isInteger(cost)) {
            printHashStatus("bcrypt cost must be between 4 and 12.");
            return;
        }

        if (cost < 4) {
            printHashStatus("bcrypt cost must be between 4 and 12.");
            return;
        }

        if (cost > 12) {
            printHashStatus("bcrypt cost must be between 4 and 12.");
            return;
        }

        if (saltAndPassword === null) {
            printHashStatus("bcrypt requires: <cost> <22-character-salt> | <password>.");
            return;
        }

        if (!/^[./A-Za-z0-9]{22}$/.test(saltAndPassword.left)) {
            printHashStatus("bcrypt salt must contain 22 bcrypt-alphabet characters.");
            return;
        }

        if (bcrypt.truncates(saltAndPassword.right)) {
            printHashStatus("bcrypt password exceeds its 72-byte limit.");
            return;
        }

        setting =
            "$2b$" +
            String(cost).padStart(2, "0") +
            "$" +
            saltAndPassword.left;

        try {
            printHashStatus(bcrypt.hashSync(saltAndPassword.right, setting));
        } catch (error) {
            printHashStatus("bcrypt rejected the supplied setting.");
        }
    }

    function hashPhpass(argumentsText) {
        var countPart = splitFirstWord(argumentsText);
        var countLogarithm = Number(countPart.word);
        var saltAndPassword = splitAtPipe(countPart.remainder);

        if (!Number.isInteger(countLogarithm)) {
            printHashStatus("phpass count logarithm must be a whole number.");
            return;
        }

        if (countLogarithm < 7 || countLogarithm > 18) {
            printHashStatus("phpass count logarithm must be between 7 and 18.");
            return;
        }

        if (saltAndPassword === null) {
            printHashStatus("phpass requires: <count-log2> <8-character-salt> | <password>.");
            return;
        }

        if (!/^[./0-9A-Za-z]{8}$/.test(saltAndPassword.left)) {
            printHashStatus("phpass salt must contain 8 phpass-alphabet characters.");
            return;
        }

        printHashStatus(
            phpassHash(
                saltAndPassword.right,
                "$P$",
                countLogarithm,
                saltAndPassword.left
            )
        );
    }

    function hashPasswordUsingStoredFormat(argumentsText) {
        var bcryptSetting;
        var countLogarithm;
        var hashAndPassword = splitAtPipe(argumentsText);
        var prefix;
        var suppliedFormat;

        if (hashAndPassword === null) {
            printHashStatus(
                "Stored password format requires: <setting-or-hash> | <password>."
            );
            return;
        }

        suppliedFormat = hashAndPassword.left;

        if (/^\$2[aby]\$/.test(suppliedFormat)) {
            if (!bcryptTablesReady) {
                printHashStatus(
                    "bcrypt data is " +
                        bcryptTablesStatus +
                        "; wait for initialization and try again."
                );
                return;
            }

            if (
                !/^\$2[aby]\$(0[4-9]|1[0-2])\$[./A-Za-z0-9]{22}(?:[./A-Za-z0-9]{31})?$/.test(
                    suppliedFormat
                )
            ) {
                printHashStatus("bcrypt setting or hash is malformed.");
                return;
            }

            if (bcrypt.truncates(hashAndPassword.right)) {
                printHashStatus("bcrypt password exceeds its 72-byte limit.");
                return;
            }

            bcryptSetting = suppliedFormat;
            if (suppliedFormat.indexOf("$2y$") === 0) {
                bcryptSetting = "$2b$" + suppliedFormat.slice(4);
            }

            try {
                bcryptSetting = bcrypt.hashSync(
                    hashAndPassword.right,
                    bcryptSetting
                );
                if (suppliedFormat.indexOf("$2y$") === 0) {
                    bcryptSetting = "$2y$" + bcryptSetting.slice(4);
                }
                printHashStatus(bcryptSetting);
            } catch (error) {
                printHashStatus("bcrypt rejected the supplied setting.");
            }
            return;
        }

        prefix = suppliedFormat.slice(0, 3);
        if (prefix === "$P$" || prefix === "$H$") {
            if (suppliedFormat.length !== 12 && suppliedFormat.length !== 34) {
                printHashStatus("phpass setting or hash has an invalid length.");
                return;
            }

            if (!/^[./0-9A-Za-z]{8}$/.test(suppliedFormat.slice(4, 12))) {
                printHashStatus("phpass setting or hash has an invalid salt.");
                return;
            }

            countLogarithm = PHPASS_ALPHABET.indexOf(
                suppliedFormat.charAt(3)
            );
            if (countLogarithm < 7 || countLogarithm > 18) {
                printHashStatus("phpass setting or hash has an unsupported count.");
                return;
            }

            printHashStatus(
                phpassHash(
                    hashAndPassword.right,
                    prefix,
                    countLogarithm,
                    suppliedFormat.slice(4, 12)
                )
            );
            return;
        }

        if (suppliedFormat.length === 2 || suppliedFormat.length === 13) {
            if (!/^[./0-9A-Za-z]{2}$/.test(suppliedFormat.slice(0, 2))) {
                printHashStatus("DES crypt setting or hash is malformed.");
                return;
            }

            if (!/^[\x01-\x7F]{0,8}$/.test(hashAndPassword.right)) {
                printHashStatus(
                    "DES crypt password must contain at most 8 ASCII characters."
                );
                return;
            }

            printHashStatus(
                unixCrypt(hashAndPassword.right, suppliedFormat.slice(0, 2))
            );
            return;
        }

        printHashStatus("Unsupported password setting or hash format.");
    }

    function verifyPassword(argumentsText) {
        var computedCryptHash;
        var computedHash;
        var countLogarithm;
        var hashAndPassword = splitAtPipe(argumentsText);
        var expectedHash;
        var prefix;

        if (hashAndPassword === null) {
            printHashStatus("verify requires: <encoded-hash> | <password>.");
            return;
        }

        expectedHash = hashAndPassword.left;

        if (expectedHash.indexOf("$2") === 0) {
            if (!bcryptTablesReady) {
                printHashStatus(
                    "bcrypt data is " +
                        bcryptTablesStatus +
                        "; wait for initialization and try again."
                );
                return;
            }

            try {
                if (bcrypt.compareSync(hashAndPassword.right, expectedHash)) {
                    printHashStatus("MATCH");
                } else {
                    printHashStatus("NO MATCH");
                }
            } catch (error) {
                printHashStatus("bcrypt hash is malformed.");
            }

            return;
        }

        prefix = expectedHash.slice(0, 3);

        if (prefix === "$P$" || prefix === "$H$") {
            if (expectedHash.length !== 34) {
                printHashStatus("phpass hash has an invalid length.");
                return;
            }

            countLogarithm = PHPASS_ALPHABET.indexOf(
                expectedHash.charAt(3)
            );

            if (countLogarithm < 7 || countLogarithm > 18) {
                printHashStatus("phpass hash has an unsupported count.");
                return;
            }

            computedHash = phpassHash(
                hashAndPassword.right,
                prefix,
                countLogarithm,
                expectedHash.slice(4, 12)
            );
            if (constantTimeStringsEqual(expectedHash, computedHash)) {
                printHashStatus("MATCH");
            } else {
                printHashStatus("NO MATCH");
            }

            return;
        }

        if (expectedHash.length === 13) {
            computedCryptHash = unixCrypt(
                hashAndPassword.right,
                expectedHash.slice(0, 2)
            );

            if (constantTimeStringsEqual(expectedHash, computedCryptHash)) {
                printHashStatus("MATCH");
            } else {
                printHashStatus("NO MATCH");
            }

            return;
        }

        printHashStatus("Unsupported password-hash format.");
    }

    function printHashHelp() {
        printHashStatus("bIRC Hash Utilities — complete help");
        printHashStatus("DIGESTS, CHECKSUMS, AND HMAC");
        printHashStatus("/hash digest <md5|sha1|sha224|sha256|sha384|sha512|ripemd160> <text>");
        printHashStatus("/hash checksum <crc32|crc32c|adler32|fnv1a32> <text>");
        printHashStatus("/hash hmac <md5|sha1|sha224|sha256|sha384|sha512|ripemd160> <key> | <message>");
        printHashStatus("HMAC uses the first | as the key/message separator.");
        printHashStatus("PASSWORD HASHING");
        printHashStatus("/hash password <setting-or-hash> | <password>");
        printHashStatus("/hash password bcrypt <cost 4-12> <22-char-salt> | <password>");
        printHashStatus("/hash password phpass <count-log2 7-18> <8-char-salt> | <password>");
        printHashStatus("/hash password crypt <2-char-salt> | <password>");
        printHashStatus("/hash verify <encoded-password-hash> | <password>");
        printHashStatus("Stored forms: bcrypt $2a$/$2b$/$2y$, phpass $P$/$H$, or 2/13-character DES crypt.");
        printHashStatus("A full stored hash reuses its embedded parameters and salt. verify prints MATCH or NO MATCH.");
        printHashStatus("bcrypt rejects passwords beyond 72 UTF-8 bytes; DES crypt accepts at most 8 ASCII characters.");
        printHashStatus("BCRYPT RUNTIME DATA");
        printHashStatus("/hash data <status|refresh>");
        printHashStatus("bcrypt loads pinned Blowfish tables from the IETF archive and caches validated data; other operations work without it.");
        printHashStatus("REMOTE USE");
        printHashStatus("/hash remote <on|off|status>");
        printHashStatus("When enabled: @YourNick hash digest sha256 hello");
        printHashStatus("Remote use permits only digest and checksum, ignores self/backlog, and replies in context.");
        printHashStatus("EXAMPLES");
        printHashStatus("/hash digest sha256 hello");
        printHashStatus("/hash checksum crc32 123456789");
        printHashStatus("/hash hmac sha256 secret | message");
        printHashStatus("/hash password bcrypt 4 ...................... | password");
        printHashStatus("/hash password $2b$04$...................... | password");
        printHashStatus("/hash verify $P$612345678U1QdGJQj/LH52EnuhEn170 | password");
        printHashStatus("/hash data status");
        printHashStatus("LIMITS AND SECURITY");
        printHashStatus("Input is limited to 4096 characters. Password salts must come from a cryptographically secure external tool.");
        printHashStatus("Salts are required because bIRC exposes no cryptographic random source.");
        printHashStatus("MD5, SHA-1, phpass, and DES crypt are legacy-only. CRC, Adler-32, and FNV are non-cryptographic checksums.");
        printHashStatus("HMAC keys and passwords typed in the composer may remain in local input history.");
    }

    function completeHashCommand(word) {
        var candidateIndex;
        var candidates = [
            "help", "digest", "checksum", "hmac", "password", "verify",
            "data", "status", "refresh",
            "md5", "sha1", "sha224", "sha256", "sha384", "sha512",
            "ripemd160", "crc32", "crc32c", "adler32", "fnv1a32",
            "bcrypt", "phpass", "crypt", "remote", "on", "off"
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

    function runHashCommand(argumentsText) {
        var algorithmPart;
        var firstPart = splitFirstWord(argumentsText);
        var operation = firstPart.word.toLowerCase();
        var pair;
        var passwordAlgorithmPart;
        var result;

        if (argumentsText.length > MAXIMUM_INPUT_LENGTH) {
            printHashStatus(
                "Input must be " + MAXIMUM_INPUT_LENGTH + " characters or fewer."
            );
            return;
        }

        if (operation.length === 0 || operation === "help") {
            printHashHelp();
            return;
        }

        algorithmPart = splitFirstWord(firstPart.remainder);

        if (operation === "digest") {
            result = cryptoJsDigest(
                algorithmPart.word.toLowerCase(),
                algorithmPart.remainder
            );
        } else if (operation === "checksum") {
            result = calculateChecksum(
                algorithmPart.word.toLowerCase(),
                algorithmPart.remainder
            );
        } else if (operation === "hmac") {
            pair = splitAtPipe(algorithmPart.remainder);

            if (pair === null) {
                printHashStatus("HMAC requires: <key> | <message>.");
                return;
            }

            result = cryptoJsHmac(
                algorithmPart.word.toLowerCase(),
                pair.left,
                pair.right
            );
        } else if (operation === "password") {
            passwordAlgorithmPart = splitFirstWord(firstPart.remainder);

            switch (passwordAlgorithmPart.word.toLowerCase()) {
                case "bcrypt":
                    hashBcrypt(passwordAlgorithmPart.remainder);
                    return;
                case "phpass":
                    hashPhpass(passwordAlgorithmPart.remainder);
                    return;
                case "crypt":
                    pair = splitAtPipe(passwordAlgorithmPart.remainder);

                    if (pair === null) {
                        printHashStatus("DES crypt requires: <2-character-salt> | <password>.");
                        return;
                    }

                    if (!/^[./0-9A-Za-z]{2}$/.test(pair.left)) {
                        printHashStatus("DES crypt requires: <2-character-salt> | <password>.");
                        return;
                    }

                    if (!/^[\x01-\x7F]{0,8}$/.test(pair.right)) {
                        printHashStatus(
                            "DES crypt password must contain at most 8 ASCII characters."
                        );
                        return;
                    }

                    printHashStatus(unixCrypt(pair.right, pair.left));
                    return;
                default:
                    hashPasswordUsingStoredFormat(firstPart.remainder);
                    return;
            }
        } else if (operation === "verify") {
            verifyPassword(firstPart.remainder);
            return;
        } else if (operation === "data") {
            switch (algorithmPart.word.toLowerCase()) {
                case "status":
                    printHashStatus("bcrypt data is " + bcryptTablesStatus + ".");
                    return;
                case "refresh":
                    fetchAndCacheHashData();
                    return;
                default:
                    printHashStatus("Data operation must be status or refresh.");
                    return;
            }
        } else if (operation === "remote") {
            handleHashRemoteConfiguration(firstPart.remainder);
            return;
        } else {
            printHashStatus("Unknown operation. Run /hash help.");
            return;
        }

        if (result.length === 0) {
            printHashStatus("Unknown algorithm. Run /hash help.");
            return;
        }

        printHashStatus(result);
    }

    function remoteUseIsEnabled() {
        return birc.store.get(REMOTE_STORE_KEY) === true;
    }

    function handleHashRemoteConfiguration(argumentsText) {
        var setting = argumentsText.trim().toLowerCase();

        if (setting === "on") {
            birc.store.set(REMOTE_STORE_KEY, true);
            printHashStatus("Remote @mention use is enabled.");
            return;
        }

        if (setting === "off") {
            birc.store.delete(REMOTE_STORE_KEY);
            printHashStatus("Remote @mention use is disabled.");
            return;
        }

        if (setting === "status" || setting.length === 0) {
            if (remoteUseIsEnabled()) {
                printHashStatus("Remote @mention use is enabled.");
            } else {
                printHashStatus("Remote @mention use is disabled.");
            }
            return;
        }

        printHashStatus("Remote setting must be on, off, or status.");
    }

    function handleRemoteHashRequest(event) {
        var commandPart;
        var hashOperation;
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
        if (commandPart.word.toLowerCase().replace(/^\//, "") !== "hash") {
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
            hashOperation = splitFirstWord(
                commandPart.remainder
            ).word.toLowerCase();
            if (hashOperation !== "digest" && hashOperation !== "checksum") {
                printHashStatus(
                    "Remote use is limited to digest and checksum operations."
                );
                return;
            }
            runHashCommand(commandPart.remainder);
        } finally {
            remoteReplyContext = null;
        }
    }

    birc.onCommand("hash", runHashCommand);
    birc.onComplete(completeHashCommand);
    birc.on("message", handleRemoteHashRequest);
    birc.on("load", function printHashLoadMessage() {
        printHashStatus("Loaded. Run /hash help.");
        loadHashData();
    });
}());
