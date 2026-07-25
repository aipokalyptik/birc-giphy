"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const scriptSource = fs.readFileSync(
    path.join(__dirname, "..", "birc-random.js"),
    "utf8"
);

function createRandomScriptHarness(randomValues) {
    const commandHandlers = {};
    const completionHandlers = [];
    const eventHandlers = {};
    const printedLines = [];
    const sentMessages = [];
    const storedValues = new Map();
    let randomValueIndex = 0;

    const controlledMath = Object.create(Math);
    controlledMath.random = function controlledRandom() {
        const selectedIndex = randomValueIndex % randomValues.length;
        const selectedValue = randomValues[selectedIndex];

        randomValueIndex += 1;
        return selectedValue;
    };

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
            console,
            Math: controlledMath
        },
        {
            filename: "birc-random.js"
        }
    );

    return {
        runRandomCommand(argumentsText, event) {
            commandHandlers.random(argumentsText, event);
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

test("integer generation includes both configured bounds", () => {
    const minimumHarness = createRandomScriptHarness([0]);
    const maximumHarness = createRandomScriptHarness([0.9999999999999999]);

    minimumHarness.runRandomCommand("integer -5 5");
    maximumHarness.runRandomCommand("integer -5 5");

    assert.deepEqual(minimumHarness.printedLines, ["[Random] -5"]);
    assert.deepEqual(maximumHarness.printedLines, ["[Random] 5"]);
});

test("typed integers cover standard signed and unsigned widths exactly", () => {
    const minimumHarness = createRandomScriptHarness([0]);
    const maximumHarness = createRandomScriptHarness([
        0.9999999999999999
    ]);
    const expectedRanges = {
        int8: ["-128", "127"],
        uint8: ["0", "255"],
        int16: ["-32768", "32767"],
        uint16: ["0", "65535"],
        int32: ["-2147483648", "2147483647"],
        uint32: ["0", "4294967295"],
        int64: ["-9223372036854775808", "9223372036854775807"],
        uint64: ["0", "18446744073709551615"],
        int128: [
            "-170141183460469231731687303715884105728",
            "170141183460469231731687303715884105727"
        ],
        uint128: [
            "0",
            "340282366920938463463374607431768211455"
        ]
    };

    for (const [typeName, expectedRange] of Object.entries(expectedRanges)) {
        minimumHarness.runRandomCommand("integer " + typeName);
        maximumHarness.runRandomCommand("integer " + typeName);

        assert.equal(
            minimumHarness.printedLines.pop(),
            "[Random] " + expectedRange[0]
        );
        assert.equal(
            maximumHarness.printedLines.pop(),
            "[Random] " + expectedRange[1]
        );
    }
});

test("typed float modes produce the requested IEEE categories", () => {
    const unitHarness = createRandomScriptHarness([0.1]);
    const specialHarness = createRandomScriptHarness([
        0,
        0.9999999999999999
    ]);
    const subnormalHarness = createRandomScriptHarness([0.5]);

    unitHarness.runRandomCommand("float float32 unit");
    specialHarness.runRandomCommand("float float64 special");
    subnormalHarness.runRandomCommand("float float32 subnormal");
    subnormalHarness.runRandomCommand("float float64 subnormal");

    const float32Unit = Number(
        unitHarness.printedLines[0].slice("[Random] ".length)
    );
    const float32Subnormal = Math.abs(Number(
        subnormalHarness.printedLines[0].slice("[Random] ".length)
    ));
    const float64Subnormal = Math.abs(Number(
        subnormalHarness.printedLines[1].slice("[Random] ".length)
    ));

    assert.equal(float32Unit, Math.fround(0.1));
    assert.equal(specialHarness.printedLines[0], "[Random] NaN");
    assert.ok(float32Subnormal > 0 && float32Subnormal < 2 ** -126);
    assert.ok(float64Subnormal > 0 && float64Subnormal < 2 ** -1022);
});

test("remote random use is opt-in and replies in the request channel", () => {
    const harness = createRandomScriptHarness([0]);
    const event = {
        channel: "#developers",
        isBacklog: false,
        isMe: false,
        nick: "Ada",
        text: "@UtilityBot random integer 1 10"
    };

    harness.receiveMessage(event);
    assert.equal(harness.sentMessages.length, 0);

    harness.runRandomCommand("remote on");
    harness.receiveMessage(event);
    assert.deepEqual(harness.sentMessages, [
        { target: "#developers", text: "Ada: 1" }
    ]);
});

test("remote random requests ignore backlog and route direct messages to sender", () => {
    const harness = createRandomScriptHarness([0.5]);

    harness.runRandomCommand("remote on");
    harness.receiveMessage({
        isBacklog: true,
        isMe: false,
        nick: "Ada",
        target: "UtilityBot",
        text: "@utilitybot random boolean"
    });
    harness.receiveMessage({
        isBacklog: false,
        isMe: false,
        nick: "Ada",
        target: "UtilityBot",
        text: "@utilitybot /random boolean"
    });

    assert.deepEqual(harness.sentMessages, [
        { target: "Ada", text: "Ada: true" }
    ]);
});

test("UUID output has version four and RFC variant markers", () => {
    const harness = createRandomScriptHarness([0.5]);

    harness.runRandomCommand("uuid");

    assert.match(
        harness.printedLines[0],
        /^\[Random\] [0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
    );
});

test("string generation honors length, character set, and count", () => {
    const harness = createRandomScriptHarness([0.5]);

    harness.runRandomCommand("string 8 hex 2");

    assert.deepEqual(harness.printedLines, [
        "[Random] 88888888",
        "[Random] 88888888"
    ]);
});

test("Unicode length counts code points instead of UTF-16 code units", () => {
    const harness = createRandomScriptHarness([0.9999999999999999, 0.5]);

    harness.runRandomCommand("unicode 4");

    const generatedText = harness.printedLines[0].slice("[Random] ".length);

    assert.equal(Array.from(generatedText).length, 4);
});

test("manual Base64 encoding handles complete and partial byte groups", () => {
    const harness = createRandomScriptHarness([0]);

    harness.runRandomCommand("base64 1");
    harness.runRandomCommand("base64 2");
    harness.runRandomCommand("base64 3");

    assert.deepEqual(harness.printedLines, [
        "[Random] AA==",
        "[Random] AAA=",
        "[Random] AAAA"
    ]);
});

test("color and palette commands return developer-usable CSS values", () => {
    const harness = createRandomScriptHarness([0.5]);

    harness.runRandomCommand("color");
    harness.runRandomCommand("palette complementary");

    assert.equal(harness.printedLines[0], "[Random] #888888");
    assert.match(
        harness.printedLines[1],
        /^\[Random\] complementary: hsl\(.+\) \| hsl\(.+\)$/
    );
});

test("choice and shuffle require explicit pipe-separated items", () => {
    const harness = createRandomScriptHarness([0.5]);

    harness.runRandomCommand("choice only-one");
    harness.runRandomCommand("shuffle also-one");

    assert.deepEqual(harness.printedLines, [
        "[Random] Provide at least two choices separated by |.",
        "[Random] Provide at least two items separated by |."
    ]);
});

test("say sends generated output to the command event target", () => {
    const harness = createRandomScriptHarness([0.5]);

    harness.runRandomCommand("say integer 1 10 2", {
        target: "#requested"
    });

    assert.deepEqual(harness.sentMessages, [
        { target: "#requested", text: "6" },
        { target: "#requested", text: "6" }
    ]);
    assert.deepEqual(harness.printedLines, []);
});

test("invalid ranges and excessive output fail visibly", () => {
    const harness = createRandomScriptHarness([0.5]);

    harness.runRandomCommand("integer 10 1");
    harness.runRandomCommand("float 21");
    harness.runRandomCommand("paragraph 13");

    assert.deepEqual(harness.printedLines, [
        "[Random] Minimum must not be greater than maximum.",
        "[Random] Count must be at most 20.",
        "[Random] Sentence count must be at most 12."
    ]);
});

test("dice output reports individual rolls and their total", () => {
    const harness = createRandomScriptHarness([0.5]);

    harness.runRandomCommand("dice 2d6");

    assert.deepEqual(harness.printedLines, [
        "[Random] 2d6: [4, 4] = 8"
    ]);
});

test("dice supports the complete JavaScript safe-integer side range", () => {
    const harness = createRandomScriptHarness([0]);

    harness.runRandomCommand("dice 1d9007199254740991");

    assert.deepEqual(harness.printedLines, [
        "[Random] 1d9007199254740991: [1] = 1"
    ]);
});

test("timestamp defaults to the signed 32-bit Unix interval", () => {
    const harness = createRandomScriptHarness([0]);

    harness.runRandomCommand("timestamp");
    harness.runRandomCommand("timestamp unix32");
    harness.runRandomCommand("timestamp 2020");

    assert.deepEqual(harness.printedLines, [
        "[Random] 1901-12-13T20:45:52.000Z",
        "[Random] 1901-12-13T20:45:52.000Z",
        "[Random] 2020-01-01T00:00:00.000Z"
    ]);
});

test("command completion exposes generator names", () => {
    const harness = createRandomScriptHarness([0.5]);

    assert.deepEqual(
        Array.from(harness.complete("pa")),
        ["paragraph", "palette"]
    );
});

test("every documented generator executes without an error result", () => {
    const harness = createRandomScriptHarness([0.5]);
    const commands = [
        "integer",
        "float",
        "boolean",
        "string",
        "uuid",
        "unicode",
        "sentence",
        "paragraph",
        "color",
        "palette",
        "bytes",
        "hex",
        "base64",
        "choice first | second",
        "shuffle first | second",
        "dice",
        "ip",
        "mac",
        "timestamp"
    ];

    for (const command of commands) {
        harness.runRandomCommand(command);
    }

    assert.equal(
        harness.printedLines.some((line) => {
            return line.includes("Unknown generator");
        }),
        false
    );
    assert.equal(harness.printedLines.length >= commands.length, true);
});

test("in-client help documents every generator and the security boundary", () => {
    const harness = createRandomScriptHarness([0.5]);
    const requiredHelpTerms = [
        "integer",
        "float",
        "boolean",
        "string",
        "uuid",
        "unicode",
        "sentence",
        "paragraph",
        "color",
        "palette",
        "bytes",
        "hex",
        "base64",
        "choice",
        "shuffle",
        "dice",
        "ip",
        "mac",
        "timestamp",
        "say",
        "Math.random()",
        "never use it for secrets",
        "min=0",
        "int128",
        "float32",
        "subnormal",
        "9007199254740991",
        "signed 32-bit Unix interval",
        "length=16",
        "/random integer -10 10 3",
        "/random say color 2",
        "Remote requests",
        "1-256 generated bytes"
    ];

    harness.runRandomCommand("help");

    const completeHelp = harness.printedLines.join("\n");

    for (const requiredHelpTerm of requiredHelpTerms) {
        assert.equal(
            completeHelp.includes(requiredHelpTerm),
            true,
            `help is missing ${requiredHelpTerm}`
        );
    }
});
