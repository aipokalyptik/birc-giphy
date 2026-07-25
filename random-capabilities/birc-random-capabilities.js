/*
 * bIRC Random Data Capability Report
 *
 * Import and enable this script, then run:
 *
 *     /randomtest
 *
 * The report covers local JavaScript features that are useful for generating
 * random developer data. It does not make a network request.
 */

(function registerBircRandomCapabilityTest() {
    "use strict";

    function printRandomCapabilityTestResult(message) {
        birc.print("[Random capability test] " + message);
    }

    function describeAvailability(name, available) {
        var description = "unavailable";

        if (available) {
            description = "available";
        }

        printRandomCapabilityTestResult(name + ": " + description);
    }

    function describeTestResult(name, passed) {
        var description = "failed";

        if (passed) {
            description = "passed";
        }

        printRandomCapabilityTestResult(name + ": " + description);
    }

    function testMathRandom() {
        var generatedValues = [];
        var generatedValue;
        var valueIndex;

        if (typeof Math === "undefined") {
            describeAvailability("Math", false);
            return;
        }

        if (typeof Math.random !== "function") {
            describeAvailability("Math.random()", false);
            return;
        }

        for (valueIndex = 0; valueIndex < 5; valueIndex += 1) {
            generatedValue = Math.random();

            if (typeof generatedValue !== "number") {
                printRandomCapabilityTestResult(
                    "Math.random(): returned a non-number"
                );
                return;
            }

            if (generatedValue < 0 || generatedValue >= 1) {
                printRandomCapabilityTestResult(
                    "Math.random(): returned a value outside [0, 1)"
                );
                return;
            }

            generatedValues.push(String(generatedValue));
        }

        printRandomCapabilityTestResult(
            "Math.random(): available; samples: " + generatedValues.join(", ")
        );
    }

    function testCryptoRandomness() {
        var generatedSecureBytes;

        if (typeof crypto === "undefined") {
            describeAvailability("crypto", false);
            return;
        }

        describeAvailability(
            "crypto.getRandomValues()",
            typeof crypto.getRandomValues === "function"
        );
        describeAvailability(
            "crypto.randomUUID()",
            typeof crypto.randomUUID === "function"
        );

        if (typeof crypto.getRandomValues !== "function") {
            return;
        }

        if (typeof Uint8Array === "undefined") {
            return;
        }

        try {
            generatedSecureBytes = new Uint8Array(16);
            crypto.getRandomValues(generatedSecureBytes);
        } catch (error) {
            printRandomCapabilityTestResult(
                "crypto.getRandomValues(): present but failed: " +
                    String(error)
            );
            return;
        }

        printRandomCapabilityTestResult(
            "crypto.getRandomValues() sample bytes: " +
                Array.prototype.join.call(generatedSecureBytes, ", ")
        );

        if (typeof crypto.randomUUID !== "function") {
            return;
        }

        try {
            printRandomCapabilityTestResult(
                "crypto.randomUUID() sample: " + crypto.randomUUID()
            );
        } catch (error) {
            printRandomCapabilityTestResult(
                "crypto.randomUUID(): present but failed: " + String(error)
            );
        }
    }

    function testTypedArraysAndLargeIntegers() {
        var bigIntegerWorked = false;

        describeAvailability(
            "Uint8Array",
            typeof Uint8Array === "function"
        );
        describeAvailability(
            "Uint32Array",
            typeof Uint32Array === "function"
        );
        describeAvailability(
            "DataView",
            typeof DataView === "function"
        );
        describeAvailability(
            "BigInt",
            typeof BigInt === "function"
        );

        if (typeof BigInt !== "function") {
            return;
        }

        try {
            bigIntegerWorked =
                BigInt("9007199254740993").toString() === "9007199254740993";
        } catch (error) {
            bigIntegerWorked = false;
        }

        describeTestResult("BigInt exact-integer test", bigIntegerWorked);
    }

    function testTextAndBinaryEncoding() {
        var base64RoundTripWorked = false;
        var base64FunctionsAvailable = true;
        var textEncoderWorked = false;

        describeAvailability("btoa()", typeof btoa === "function");
        describeAvailability("atob()", typeof atob === "function");
        describeAvailability(
            "TextEncoder",
            typeof TextEncoder === "function"
        );
        describeAvailability(
            "TextDecoder",
            typeof TextDecoder === "function"
        );

        if (typeof btoa !== "function") {
            base64FunctionsAvailable = false;
        }

        if (typeof atob !== "function") {
            base64FunctionsAvailable = false;
        }

        if (base64FunctionsAvailable) {
            try {
                base64RoundTripWorked = atob(btoa("random-data")) === "random-data";
            } catch (error) {
                base64RoundTripWorked = false;
            }

            describeTestResult(
                "Base64 round-trip test",
                base64RoundTripWorked
            );
        }

        if (typeof TextEncoder !== "function") {
            return;
        }

        try {
            textEncoderWorked =
                new TextEncoder().encode("A\u00E9\uD83D\uDE80").length === 7;
        } catch (error) {
            textEncoderWorked = false;
        }

        describeTestResult("UTF-8 encoding test", textEncoderWorked);
    }

    function testUnicodeSupport() {
        var codePointFunctionsAvailable = true;
        var codePointRoundTripWorked = false;
        var normalizationWorked = false;
        var unicodeRegularExpressionWorked = false;

        describeAvailability(
            "String.fromCodePoint()",
            typeof String.fromCodePoint === "function"
        );
        describeAvailability(
            "String.prototype.codePointAt()",
            typeof String.prototype.codePointAt === "function"
        );
        describeAvailability(
            "String.prototype.normalize()",
            typeof String.prototype.normalize === "function"
        );

        if (typeof String.fromCodePoint !== "function") {
            codePointFunctionsAvailable = false;
        }

        if (typeof String.prototype.codePointAt !== "function") {
            codePointFunctionsAvailable = false;
        }

        if (codePointFunctionsAvailable) {
            try {
                codePointRoundTripWorked =
                    String.fromCodePoint(0x1F680).codePointAt(0) ===
                        0x1F680;
            } catch (error) {
                codePointRoundTripWorked = false;
            }
        }

        if (typeof String.prototype.normalize === "function") {
            try {
                normalizationWorked =
                    "e\u0301".normalize("NFC") === "\u00E9";
            } catch (error) {
                normalizationWorked = false;
            }
        }

        try {
            unicodeRegularExpressionWorked =
                new RegExp("^\\p{L}+$", "u").test("Hello\u4E16\u754C");
        } catch (error) {
            unicodeRegularExpressionWorked = false;
        }

        describeTestResult(
            "Unicode code-point round-trip test",
            codePointRoundTripWorked
        );
        describeTestResult(
            "Unicode normalization test",
            normalizationWorked
        );
        describeAvailability(
            "Unicode property regular expressions",
            unicodeRegularExpressionWorked
        );
    }

    function testGeneralJavaScriptFeatures() {
        describeAvailability("Promise", typeof Promise === "function");
        describeAvailability("Map", typeof Map === "function");
        describeAvailability("Set", typeof Set === "function");
        describeAvailability(
            "Array.from()",
            typeof Array.from === "function"
        );
        describeAvailability(
            "Object.keys()",
            typeof Object.keys === "function"
        );
        if (typeof JSON !== "object") {
            describeAvailability("JSON.parse()/stringify()", false);
            return;
        }

        if (typeof JSON.parse !== "function") {
            describeAvailability("JSON.parse()/stringify()", false);
            return;
        }

        describeAvailability(
            "JSON.parse()/stringify()",
            typeof JSON.stringify === "function"
        );
    }

    function testBircFeatures() {
        describeAvailability("birc.print()", typeof birc.print === "function");
        describeAvailability("birc.say()", typeof birc.say === "function");
        describeAvailability(
            "birc.onCommand()",
            typeof birc.onCommand === "function"
        );
        describeAvailability(
            "birc.onComplete()",
            typeof birc.onComplete === "function"
        );
        describeAvailability("birc.fetch()", typeof birc.fetch === "function");

        printRandomCapabilityTestResult(
            "bIRC API version: " + String(birc.apiVersion)
        );
    }

    function runRandomCapabilityTest() {
        printRandomCapabilityTestResult("Beginning capability report.");
        testMathRandom();
        testCryptoRandomness();
        testTypedArraysAndLargeIntegers();
        testTextAndBinaryEncoding();
        testUnicodeSupport();
        testGeneralJavaScriptFeatures();
        testBircFeatures();
        printRandomCapabilityTestResult("Capability report complete.");
    }

    birc.onCommand("randomtest", runRandomCapabilityTest);

    birc.on("load", function printRandomCapabilityTestLoadMessage() {
        printRandomCapabilityTestResult(
            "Loaded. Run /randomtest for the complete report."
        );
    });
}());
