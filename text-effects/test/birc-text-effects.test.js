"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const scriptSource = fs.readFileSync(
    path.join(__dirname, "..", "birc-text-effects.js"),
    "utf8"
);

function createScriptHarness() {
    const commandHandlers = {};
    const eventHandlers = {};
    const printedLines = [];
    const sentMessages = [];
    let completionHandler = null;

    const birc = {
        target: "#effects",
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
            completionHandler = handler;
        },
        on(type, handler) {
            eventHandlers[type] = handler;
        }
    };

    vm.runInNewContext(scriptSource, {
        birc,
        console,
        Math
    }, {
        filename: "birc-text-effects.js"
    });

    return {
        runTextCommand(argumentsText, event) {
            commandHandlers.text(argumentsText, event);
        },
        runLoadEvent() {
            eventHandlers.load();
        },
        complete(word) {
            return completionHandler(word);
        },
        printedLines,
        sentMessages
    };
}

function lastPrintedPayload(harness) {
    const lastLine = harness.printedLines[harness.printedLines.length - 1];
    return lastLine.slice("[Text effects] ".length);
}

test("leet levels and familiar word effects produce readable output", () => {
    const harness = createScriptHarness();

    harness.runTextCommand("leet classic Hack the planet");
    assert.equal(lastPrintedPayload(harness), "h4ck 7h3 p14n37");

    harness.runTextCommand("alternating Mock me");
    assert.equal(lastPrintedPayload(harness), "mOcK mE");

    harness.runTextCommand("clap one two three");
    assert.equal(lastPrintedPayload(harness), "one 👏 two 👏 three");
});

test("Unicode effects preserve unsupported characters", () => {
    const harness = createScriptHarness();

    harness.runTextCommand("fullwidth Az 19 ☃");
    assert.equal(lastPrintedPayload(harness), "Ａｚ　１９　☃");

    harness.runTextCommand("circled Az 10");
    assert.equal(lastPrintedPayload(harness), "Ⓐⓩ ①⓪");

    harness.runTextCommand("bold Az9!");
    assert.equal(lastPrintedPayload(harness), "𝐀𝐳𝟗!");
});

test("Zalgo intensity is bounded and retains base characters", () => {
    const harness = createScriptHarness();

    harness.runTextCommand("zalgo low Hi");

    const output = lastPrintedPayload(harness);
    assert.equal(output.startsWith("H"), true);
    assert.equal(output.includes("i"), true);
    assert.equal(Array.from(output).length <= 16, true);
});

test("IRC colors use unambiguous two-digit codes and reset formatting", () => {
    const harness = createScriptHarness();

    harness.runTextCommand("color 4 1 Warning");
    assert.equal(lastPrintedPayload(harness), "\u000304,01Warning\u000f");

    harness.runTextCommand("rainbow Go");
    assert.equal(lastPrintedPayload(harness), "\u000304G\u000307o\u000f");
});

test("named color schemes use registered IRC palette sequences", () => {
    const harness = createScriptHarness();

    harness.runTextCommand("scheme dracula Colors");

    assert.equal(
        lastPrintedPayload(harness),
        "\u000311C\u000309o\u000307l\u000313o\u000306r\u000304s\u000f"
    );
});

test("schemes lists native and attributed color schemes", () => {
    const harness = createScriptHarness();

    harness.runTextCommand("schemes");

    assert.deepEqual(harness.printedLines, [
        "[Text effects] Color schemes: rainbow, fire, ocean, catppuccin, dracula, nord"
    ]);
});

test("say sends ordinary and IRC-formatted effects to the command target", () => {
    const harness = createScriptHarness();

    harness.runTextCommand("say smallcaps Hello", {
        target: "#small"
    });
    harness.runTextCommand("say ircbold Important", {
        target: "#small"
    });

    assert.deepEqual(harness.sentMessages, [
        {
            target: "#small",
            text: "ʜᴇʟʟᴏ"
        },
        {
            target: "#small",
            text: "\u0002Important\u000f"
        }
    ]);
});

test("ANSI notation is visible and cannot be sent to IRC", () => {
    const harness = createScriptHarness();

    harness.runTextCommand("ansi red Alert");
    assert.equal(lastPrintedPayload(harness), "\\x1b[31mAlert\\x1b[0m");

    harness.runTextCommand("say ansi red Alert", {
        target: "#terminal"
    });

    assert.deepEqual(harness.sentMessages, []);
    assert.equal(
        harness.printedLines.includes(
            "[Text effects] ANSI escape sequences are preview-only and cannot be sent to IRC."
        ),
        true
    );
});

test("block lettering renders five bounded lines and sends each row", () => {
    const harness = createScriptHarness();

    harness.runTextCommand("say block HI", {
        target: "#art"
    });

    assert.equal(harness.sentMessages.length, 5);
    assert.equal(harness.sentMessages[0].target, "#art");
    assert.equal(harness.sentMessages[0].text, "#   # #####");
    assert.equal(harness.sentMessages[2].text, "#####   #  ");
});

test("named FIGlet fonts render printable ASCII with their own heights", () => {
    const miniHarness = createScriptHarness();
    const smallHarness = createScriptHarness();

    miniHarness.runTextCommand("block mini Hi!");
    smallHarness.runTextCommand("block small Hi!");

    assert.equal(miniHarness.printedLines.length, 4);
    assert.equal(
        miniHarness.printedLines[1],
        "[Text effects]  |_|  o  | "
    );
    assert.equal(smallHarness.printedLines.length, 5);
    assert.equal(
        smallHarness.printedLines[1],
        "[Text effects]  | || | (_) | |"
    );
});

test("solid block mode replaces every non-space cell in any font", () => {
    const harness = createScriptHarness();

    harness.runTextCommand("blocks mini A");

    assert.equal(harness.printedLines.length, 4);
    assert.equal(
        harness.printedLines.every((line) => {
            return !/[A-Za-z0-9_\\/|()-]/.test(line.slice("[Text effects] ".length));
        }),
        true
    );
    assert.equal(
        harness.printedLines.some((line) => line.includes("█")),
        true
    );
});

test("fonts lists every registered block font", () => {
    const harness = createScriptHarness();

    harness.runTextCommand("fonts");

    assert.deepEqual(harness.printedLines, [
        "[Text effects] Block fonts: simple, mini, small"
    ]);
});

test("unsafe controls and excessive inputs fail visibly", () => {
    const harness = createScriptHarness();

    harness.runTextCommand("reverse hello\nworld");
    harness.runTextCommand("block " + "A".repeat(13));
    harness.runTextCommand("reverse " + "x".repeat(161));

    assert.equal(
        harness.printedLines.includes(
            "[Text effects] Input must not contain control characters."
        ),
        true
    );
    assert.equal(
        harness.printedLines.includes(
            "[Text effects] Block text is limited to 12 characters."
        ),
        true
    );
    assert.equal(
        harness.printedLines.includes(
            "[Text effects] Input is limited to 160 characters."
        ),
        true
    );
});

test("help documents every effect family examples limits and compatibility", () => {
    const harness = createScriptHarness();

    harness.runTextCommand("help");

    const completeHelp = harness.printedLines.join("\n");
    const requiredTerms = [
        "/text say",
        "leet <light|classic|extreme>",
        "zalgo <low|medium|high>",
        "fullwidth",
        "circled",
        "smallcaps",
        "regional",
        "/text schemes",
        "scheme <name>",
        "rainbow",
        "color <foreground 0-15>",
        "ircbold",
        "ansi <black|red|green|yellow|blue|magenta|cyan|white>",
        "/text fonts",
        "block [font] <text>",
        "Zalgo may impair readability",
        "Unicode novelty alphabets",
        "IRC colors and formatting depend"
    ];

    for (const requiredTerm of requiredTerms) {
        assert.equal(
            completeHelp.includes(requiredTerm),
            true,
            "missing help term: " + requiredTerm
        );
    }
});

test("completion exposes effect and command names", () => {
    const harness = createScriptHarness();

    assert.deepEqual(Array.from(harness.complete("zal")), ["zalgo"]);
    assert.deepEqual(
        Array.from(harness.complete("irc")),
        ["ircbold", "ircitalic", "ircunderline", "ircstrike"]
    );
    assert.deepEqual(Array.from(harness.complete("not-an-effect")), []);
});

test("load event announces the help command", () => {
    const harness = createScriptHarness();

    harness.runLoadEvent();

    assert.deepEqual(harness.printedLines, [
        "[Text effects] Loaded. Run /text help for effects and examples."
    ]);
});
