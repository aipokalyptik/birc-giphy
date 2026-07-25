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
    const printedLines = [];
    const sentMessages = [];

    const birc = {
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
        on() {}
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
        printedLines,
        sentMessages
    };
}

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
        "Base128 is not included"
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
