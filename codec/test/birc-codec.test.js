"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const scriptSource = fs.readFileSync(
    path.join(__dirname, "..", "birc-codec.js"),
    "utf8"
);

function createCodecScriptHarness() {
    const commandHandlers = {};
    const completionHandlers = [];
    const eventHandlers = {};
    const printedLines = [];
    const sentMessages = [];
    const storedValues = new Map();

    const birc = {
        nick: "UtilityBot",
        target: "#default",
        print(text) {
            printedLines.push(text);
        },
        say(target, text) {
            sentMessages.push({ target, text });
        },
        onCommand(name, handler) {
            commandHandlers[name] = handler;
        },
        onComplete(handler) {
            completionHandlers.push(handler);
        },
        on(type, handler) {
            eventHandlers[type] = handler;
        },
        sameNick(first, second) {
            return first.toLowerCase() === second.toLowerCase();
        },
        store: {
            get(key) {
                return storedValues.get(key);
            },
            set(key, value) {
                storedValues.set(key, value);
            },
            delete(key) {
                storedValues.delete(key);
            }
        }
    };

    vm.runInNewContext(
        scriptSource,
        {
            birc,
            console
        },
        {
            filename: "birc-codec.js"
        }
    );

    return {
        runCodecCommand(argumentsText, event) {
            commandHandlers.codec(argumentsText, event);
        },
        complete(word) {
            return completionHandlers[0](word);
        },
        receiveMessage(event) {
            eventHandlers.message(event);
        },
        printedLines,
        sentMessages
    };
}

test("remote codec use is opt-in and replies in channel or direct-message context", () => {
    const harness = createCodecScriptHarness();

    harness.receiveMessage({
        channel: "#developers",
        isBacklog: false,
        isMe: false,
        nick: "Ada",
        text: "@UtilityBot codec encode hex Hi"
    });
    assert.equal(harness.sentMessages.length, 0);

    harness.runCodecCommand("remote on");
    harness.receiveMessage({
        channel: "#developers",
        isBacklog: false,
        isMe: false,
        nick: "Ada",
        text: "@utilitybot /codec encode hex Hi"
    });
    harness.receiveMessage({
        isBacklog: false,
        isMe: false,
        nick: "Grace",
        target: "UtilityBot",
        text: "@UtilityBot codec decode hex 4869"
    });

    assert.deepEqual(harness.sentMessages, [
        { target: "#developers", text: "Ada: 4869" },
        { target: "Grace", text: "Grace: Hi" }
    ]);
});

function runOneCodecCommand(argumentsText) {
    const harness = createCodecScriptHarness();

    harness.runCodecCommand(argumentsText);

    assert.equal(harness.printedLines.length, 1);
    return harness.printedLines[0].slice("[Codec] ".length);
}

test("RFC 4648 Base16 vectors encode and decode UTF-8 text", () => {
    assert.equal(runOneCodecCommand("encode hex foobar"), "666F6F626172");
    assert.equal(runOneCodecCommand("decode hex 666f6f626172"), "foobar");
});

test("RFC 4648 Base32 vectors encode and decode with canonical padding", () => {
    const vectors = [
        ["", ""],
        ["f", "MY======"],
        ["fo", "MZXQ===="],
        ["foo", "MZXW6==="],
        ["foob", "MZXW6YQ="],
        ["fooba", "MZXW6YTB"],
        ["foobar", "MZXW6YTBOI======"]
    ];

    for (const [plainText, encodedText] of vectors) {
        assert.equal(
            runOneCodecCommand(`encode base32 ${plainText}`),
            encodedText
        );
        assert.equal(
            runOneCodecCommand(`decode base32 ${encodedText}`),
            plainText
        );
    }
});

test("RFC 4648 Base64 vectors encode and decode with canonical padding", () => {
    const vectors = [
        ["", ""],
        ["f", "Zg=="],
        ["fo", "Zm8="],
        ["foo", "Zm9v"],
        ["foobar", "Zm9vYmFy"]
    ];

    for (const [plainText, encodedText] of vectors) {
        assert.equal(
            runOneCodecCommand(`encode base64 ${plainText}`),
            encodedText
        );
        assert.equal(
            runOneCodecCommand(`decode base64 ${encodedText}`),
            plainText
        );
    }
});

test("Base64url uses its URL-safe alphabet without padding", () => {
    assert.equal(runOneCodecCommand("encode base64url ??>"), "Pz8-");
    assert.equal(runOneCodecCommand("decode base64url Pz8-"), "??>");
});

test("Base58 preserves leading zero bytes and round trips text", () => {
    assert.equal(runOneCodecCommand("encode base58 Hello"), "9Ajdvzr");
    assert.equal(runOneCodecCommand("decode base58 9Ajdvzr"), "Hello");
    assert.equal(
        runOneCodecCommand("convert hex base58 000001"),
        "112"
    );
    assert.equal(
        runOneCodecCommand("convert base58 hex 112"),
        "000001"
    );
});

test("hex converts to decimal bytes and an unsigned big-endian integer", () => {
    assert.equal(
        runOneCodecCommand("convert hex bytes 48656C6C6F"),
        "72 101 108 108 111"
    );
    assert.equal(runOneCodecCommand("convert hex integer FFFF"), "65535");
    assert.equal(runOneCodecCommand("convert integer hex 65535"), "FFFF");
});

test("binary conversion requires complete bytes", () => {
    assert.equal(
        runOneCodecCommand("convert hex binary 4142"),
        "01000001 01000010"
    );
    assert.equal(
        runOneCodecCommand("decode binary 0100000"),
        "Binary input must contain complete 8-bit bytes."
    );
});

test("strict UTF-8 rejects overlong, surrogate, and truncated sequences", () => {
    assert.equal(
        runOneCodecCommand("convert hex text C080"),
        "UTF-8 contains an invalid leading byte at byte 0."
    );
    assert.equal(
        runOneCodecCommand("convert hex text EDA080"),
        "UTF-8 encodes a surrogate value."
    );
    assert.equal(
        runOneCodecCommand("convert hex text F09F"),
        "UTF-8 ends inside a four-byte sequence."
    );
});

test("URL, HTML, JSON, Unicode, and ROT13 transforms round trip", () => {
    assert.equal(
        runOneCodecCommand("decode url " +
            runOneCodecCommand("encode url café & tea")),
        "café & tea"
    );
    assert.equal(
        runOneCodecCommand("decode html " +
            runOneCodecCommand("encode html <tag title=\"x\">")),
        "<tag title=\"x\">"
    );
    assert.equal(
        runOneCodecCommand("decode json " +
            runOneCodecCommand("encode json line\\nbreak")),
        "line\\nbreak"
    );
    assert.equal(runOneCodecCommand("encode unicode A🚀"), "U+0041 U+1F680");
    assert.equal(
        runOneCodecCommand("decode unicode U+0041 U+1F680"),
        "A🚀"
    );
    assert.equal(runOneCodecCommand("encode rot13 Hello"), "Uryyb");
    assert.equal(runOneCodecCommand("decode rot13 Uryyb"), "Hello");
});

test("quoted-printable and MIME encoded-words support UTF-8", () => {
    assert.equal(
        runOneCodecCommand("encode quoted-printable café"),
        "caf=C3=A9"
    );
    assert.equal(
        runOneCodecCommand("decode quoted-printable caf=C3=A9"),
        "café"
    );
    assert.equal(
        runOneCodecCommand("encode mime-b Résumé"),
        "=?UTF-8?B?UsOpc3Vtw6k=?="
    );
    assert.equal(
        runOneCodecCommand("decode mime =?UTF-8?B?UsOpc3Vtw6k=?="),
        "Résumé"
    );
    assert.equal(
        runOneCodecCommand("encode mime-q hello world_?"),
        "=?UTF-8?Q?hello_world=5F=3F?="
    );
    assert.equal(
        runOneCodecCommand("decode mime =?UTF-8?Q?hello_world=5F=3F?="),
        "hello world_?"
    );
});

test("RFC 3492 Punycode examples encode and decode complete domains", () => {
    const vectors = [
        ["mañana.com", "xn--maana-pta.com"],
        ["bücher.example", "xn--bcher-kva.example"],
        ["例え.テスト", "xn--r8jz45g.xn--zckzah"]
    ];

    for (const [unicodeDomain, asciiDomain] of vectors) {
        assert.equal(
            runOneCodecCommand(`encode punycode ${unicodeDomain}`),
            asciiDomain
        );
        assert.equal(
            runOneCodecCommand(`decode punycode ${asciiDomain}`),
            unicodeDomain
        );
    }
});

test("PHP serialized scalars and sequential arrays decode to JSON", () => {
    assert.equal(runOneCodecCommand("decode php N;"), "null");
    assert.equal(runOneCodecCommand("decode php b:1;"), "true");
    assert.equal(runOneCodecCommand("decode php i:-42;"), "-42");
    assert.equal(runOneCodecCommand("decode php d:2.5;"), "2.5");
    assert.equal(
        runOneCodecCommand(
            "decode php a:4:{i:0;s:3:\"Ada\";i:1;i:42;i:2;b:0;i:3;N;}"
        ),
        "[\"Ada\",42,false,null]"
    );
});

test("PHP associative arrays decode to JSON objects", () => {
    assert.equal(
        runOneCodecCommand(
            "decode php a:2:{s:4:\"name\";s:3:\"Ada\";s:6:\"active\";b:1;}"
        ),
        "{\"name\":\"Ada\",\"active\":true}"
    );
});

test("PHP object types are discarded and visibility prefixes are removed", () => {
    const privatePropertyName = "\u0000Example\u0000secret";
    const protectedPropertyName = "\u0000*\u0000status";
    const serializedValue =
        "O:7:\"Example\":3:{" +
        `s:${privatePropertyName.length}:\"${privatePropertyName}\";s:5:\"quiet\";` +
        `s:${protectedPropertyName.length}:\"${protectedPropertyName}\";s:6:\"active\";` +
        "s:4:\"name\";s:5:\"José\";" +
        "}";

    assert.equal(
        runOneCodecCommand("decode php " + serializedValue),
        "{\"secret\":\"quiet\",\"status\":\"active\",\"name\":\"José\"}"
    );
});

test("JSON serializes to PHP arrays and bare stdClass objects", () => {
    assert.equal(
        runOneCodecCommand(
            "encode php {\"name\":\"José\",\"active\":true,\"scores\":[1,2.5,null]}"
        ),
        "O:8:\"stdClass\":3:{" +
            "s:4:\"name\";s:5:\"José\";" +
            "s:6:\"active\";b:1;" +
            "s:6:\"scores\";a:3:{i:0;i:1;i:1;d:2.5;i:2;N;}" +
            "}"
    );
});

test("PHP serialization rejects values JSON cannot preserve faithfully", () => {
    assert.equal(
        runOneCodecCommand("decode php R:1;"),
        "PHP serialized references cannot be represented faithfully in JSON."
    );
    assert.equal(
        runOneCodecCommand("decode php C:4:\"Test\":0:{}"),
        "PHP custom-serialized objects are not supported."
    );
    assert.equal(
        runOneCodecCommand("decode php d:NAN;"),
        "PHP NAN and infinity cannot be represented in JSON."
    );
    assert.equal(
        runOneCodecCommand("decode php i:9007199254740993;"),
        "PHP serialized integer exceeds JavaScript's safe integer range."
    );
    assert.equal(
        runOneCodecCommand("decode php s:5:\"four\";"),
        "PHP serialized data expected '\";' at byte 10."
    );
});

test("malformed alphabet and syntax input fails visibly", () => {
    assert.equal(
        runOneCodecCommand("decode hex ABC"),
        "Hex input must contain complete byte pairs."
    );
    assert.equal(
        runOneCodecCommand("decode base64 Z==="),
        "Base64 input contains invalid characters or padding."
    );
    assert.equal(
        runOneCodecCommand("decode base32 AAA====="),
        "Base32 has an invalid data length."
    );
    assert.equal(
        runOneCodecCommand("decode json 42"),
        "JSON decode expects one quoted JSON string, not another JSON value."
    );
    assert.equal(
        runOneCodecCommand("decode mime =?ISO-8859-1?Q?caf=E9?="),
        "Only UTF-8 and US-ASCII MIME encoded-words are supported."
    );
    assert.equal(
        runOneCodecCommand("decode punycode xn--"),
        "Punycode label has no encoded payload."
    );
});

test("quoted-printable wraps long output and MIME words reject oversize output", () => {
    const quotedPrintable = runOneCodecCommand(
        "encode quoted-printable " + "é".repeat(30)
    );

    assert.equal(quotedPrintable.includes("=\r\n"), true);
    assert.equal(
        runOneCodecCommand("decode quoted-printable " + quotedPrintable),
        "é".repeat(30)
    );
    assert.equal(
        runOneCodecCommand("encode mime-b " + "é".repeat(30)),
        "MIME encoded-word output exceeds the 75-character RFC limit; encode a shorter value."
    );
});

test("say sends a successful result to the command event target", () => {
    const harness = createCodecScriptHarness();

    harness.runCodecCommand("say encode base64 hello", {
        target: "#requested"
    });

    assert.deepEqual(harness.sentMessages, [
        {
            target: "#requested",
            text: "aGVsbG8="
        }
    ]);
    assert.deepEqual(harness.printedLines, []);
});

test("say refuses decoded line breaks instead of sending multiple IRC lines", () => {
    const harness = createCodecScriptHarness();

    harness.runCodecCommand("say decode hex 610A62", {
        target: "#requested"
    });

    assert.deepEqual(harness.sentMessages, []);
    assert.deepEqual(harness.printedLines, [
        "[Codec] Refusing to send output containing NUL or a line break; print it locally instead."
    ]);
});

test("help and formats document the complete public contract", () => {
    const harness = createCodecScriptHarness();

    harness.runCodecCommand("help");
    harness.runCodecCommand("formats");

    const completeHelp = harness.printedLines.join("\n");
    const requiredTerms = [
        "encode",
        "decode",
        "convert",
        "say",
        "hex",
        "base32",
        "base64",
        "base64url",
        "base58",
        "binary",
        "bytes",
        "integer",
        "url",
        "html",
        "json",
        "unicode",
        "rot13",
        "quoted-printable",
        "mime-b",
        "mime-q",
        "punycode",
        "php-serialize",
        "Base128 is not included",
        "/codec encode hex Hello",
        "/codec say encode base64 hello",
        "4096 characters",
        "Remote requests",
        "does not perform IDNA validation"
    ];

    for (const requiredTerm of requiredTerms) {
        assert.equal(
            completeHelp.includes(requiredTerm),
            true,
            `help is missing ${requiredTerm}`
        );
    }
});

test("completion exposes codec operations and format names", () => {
    const harness = createCodecScriptHarness();

    assert.deepEqual(
        Array.from(harness.complete("base6")),
        ["base64", "base64url"]
    );
});
