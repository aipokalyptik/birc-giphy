"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const scriptSource = fs.readFileSync(
    path.join(__dirname, "..", "birc-giphy.js"),
    "utf8"
);

function createScriptHarness() {
    const commandHandlers = {};
    const eventHandlers = {};
    const printedLines = [];
    const sentMessages = [];
    const storedValues = new Map();
    let completionHandler = null;
    let fetchImplementation = null;

    const birc = {
        target: "#test",
        store: {
            get(key) {
                return storedValues.get(key);
            },
            set(key, value) {
                storedValues.set(key, value);
            },
            delete(key) {
                storedValues.delete(key);
            },
            keys() {
                return Array.from(storedValues.keys());
            }
        },
        print(text) {
            printedLines.push(text);
        },
        say(target, text) {
            sentMessages.push({ target, text });
        },
        fetch(url) {
            if (fetchImplementation === null) {
                return Promise.reject(new Error("No fetch response configured"));
            }

            return fetchImplementation(url);
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

    const context = {
        birc,
        console
    };

    vm.runInNewContext(scriptSource, context, {
        filename: "birc-giphy.js"
    });

    return {
        runGifCommand(argumentsText, event) {
            commandHandlers.gif(argumentsText, event);
        },
        runLoadEvent() {
            eventHandlers.load();
        },
        complete(word) {
            return completionHandler(word, {
                target: "#test",
                network: "test"
            });
        },
        setFetchImplementation(implementation) {
            fetchImplementation = implementation;
        },
        printedLines,
        sentMessages,
        storedValues
    };
}

function flushPromiseCallbacks() {
    return new Promise((resolve) => {
        setImmediate(resolve);
    });
}

function successfulSearchResponse() {
    return {
        status: 200,
        text: JSON.stringify({
            data: [
                {
                    title: "Excited penguin",
                    url: "https://giphy.com/gifs/example",
                    images: {
                        fixed_height: {
                            url: "https://media.giphy.com/media/example/200.gif"
                        },
                        original: {
                            url: "https://media.giphy.com/media/example/giphy.gif"
                        }
                    }
                }
            ],
            pagination: {
                offset: 0,
                count: 1
            },
            meta: {
                status: 200,
                msg: "OK"
            }
        })
    };
}

test("configuration persists the API key without printing the complete secret", () => {
    const harness = createScriptHarness();

    harness.runGifCommand("config key abcdefghijklmnop");

    assert.equal(
        harness.storedValues.get("configuration.apiKey"),
        "abcdefghijklmnop"
    );
    assert.equal(
        harness.printedLines.some((line) => line.includes("abcdefghijklmnop")),
        false
    );
    assert.equal(
        harness.printedLines.some((line) => line.includes("abcd…mnop")),
        true
    );
});

test("search requires configuration and explains how to configure it", () => {
    const harness = createScriptHarness();

    harness.runGifCommand("excited penguin", {
        target: "#penguins"
    });

    assert.equal(
        harness.printedLines.includes(
            "[GIPHY] No API key is configured. Run /gif config key <key>."
        ),
        true
    );
});

test("update notice links directly to the changed script and explains replacement", async () => {
    const harness = createScriptHarness();
    let fetchCount = 0;

    harness.setFetchImplementation((url) => {
        fetchCount += 1;
        assert.equal(
            url,
            "https://raw.githubusercontent.com/aipokalyptik/birc-utils/main/updates.json"
        );

        return Promise.resolve({
            status: 200,
            text: JSON.stringify({
                schemaVersion: 1,
                scripts: {
                    "com.github.aipokalyptik.birc-utils.giphy": "1.1.0"
                }
            })
        });
    });

    harness.runLoadEvent();
    await flushPromiseCallbacks();

    const notice = harness.printedLines.join("\n");
    assert.match(
        notice,
        /com\.github\.aipokalyptik\.birc-utils\.giphy: installed 1\.0\.0, current 1\.1\.0/
    );
    assert.match(
        notice,
        /github\.com\/aipokalyptik\/birc-utils\/blob\/main\/giphy\/birc-giphy\.js/
    );
    assert.match(
        notice,
        /compare\/birc-utils-giphy-v1\.0\.0\.\.\.birc-utils-giphy-v1\.1\.0#diff-34d80f207cd572985e9cee56ad90303ba6e78a994c3ee914178b2e6cbd917ca9/
    );
    assert.match(notice, /click Raw/);
    assert.match(notice, /copy the entire file/);
    assert.match(notice, /⌘⌥S/);
    assert.match(notice, /replace this script's contents/);

    harness.runLoadEvent();
    await flushPromiseCallbacks();
    assert.equal(fetchCount, 1);
});

test("search prints an HTTPS media preview and send posts the selected GIF", async () => {
    const harness = createScriptHarness();

    harness.runGifCommand("config key abcdefghijklmnop");
    harness.setFetchImplementation(() => {
        return Promise.resolve(successfulSearchResponse());
    });

    harness.runGifCommand("excited penguin", {
        network: "libera",
        target: "#penguins"
    });
    await flushPromiseCallbacks();

    assert.equal(
        harness.printedLines.includes(
            "1. Excited penguin — https://media.giphy.com/media/example/200.gif"
        ),
        true
    );
    assert.equal(
        harness.printedLines.includes(
            "https://media.giphy.com/media/example/200.gif"
        ),
        false
    );

    harness.runGifCommand("send 1", {
        network: "libera",
        target: "#penguins"
    });

    assert.deepEqual(harness.sentMessages, [
        {
            target: "#penguins",
            text: "https://media.giphy.com/media/example/giphy.gif"
        }
    ]);
});

test("send and more reject results from another network or conversation", async () => {
    const harness = createScriptHarness();
    let fetchCount = 0;

    harness.runGifCommand("config key abcdefghijklmnop");
    harness.setFetchImplementation(() => {
        fetchCount += 1;
        return Promise.resolve(successfulSearchResponse());
    });

    harness.runGifCommand("excited penguin", {
        network: "libera",
        target: "#penguins"
    });
    await flushPromiseCallbacks();

    harness.runGifCommand("send 1", {
        network: "libera",
        target: "#otters"
    });
    harness.runGifCommand("more", {
        network: "other-network",
        target: "#penguins"
    });

    assert.deepEqual(harness.sentMessages, []);
    assert.equal(fetchCount, 1);
    assert.equal(
        harness.printedLines.filter((line) => {
            return line.includes("current results belong to another conversation");
        }).length,
        2
    );
});

test("anywhere context policy permits cross-conversation result use", async () => {
    const harness = createScriptHarness();

    harness.runGifCommand("config key abcdefghijklmnop");
    harness.runGifCommand("config context anywhere");
    harness.setFetchImplementation(() => {
        return Promise.resolve(successfulSearchResponse());
    });

    harness.runGifCommand("excited penguin", {
        network: "libera",
        target: "#penguins"
    });
    await flushPromiseCallbacks();

    harness.runGifCommand("send 1", {
        network: "other-network",
        target: "#otters"
    });

    assert.deepEqual(harness.sentMessages, [
        {
            target: "#penguins",
            text: "https://media.giphy.com/media/example/giphy.gif"
        }
    ]);
});

test("search rejects terms longer than the provider contract permits", () => {
    const harness = createScriptHarness();
    const overlongQuery = "x".repeat(51);

    harness.runGifCommand("config key abcdefghijklmnop");
    harness.runGifCommand(overlongQuery, {
        target: "#penguins"
    });

    assert.equal(
        harness.printedLines.includes(
            "[GIPHY] Search terms must be 50 characters or fewer."
        ),
        true
    );
});

test("invalid provider JSON becomes a visible error instead of escaping", async () => {
    const harness = createScriptHarness();

    harness.runGifCommand("config key abcdefghijklmnop");
    harness.setFetchImplementation(() => {
        return Promise.resolve({
            status: 200,
            text: "not JSON"
        });
    });

    harness.runGifCommand("excited penguin", {
        target: "#penguins"
    });
    await flushPromiseCallbacks();

    assert.equal(
        harness.printedLines.includes(
            "[GIPHY] GIPHY returned a response that was not valid JSON."
        ),
        true
    );
});

test("invalid configuration values do not replace valid defaults", () => {
    const harness = createScriptHarness();

    harness.runGifCommand("config rating explicit");
    harness.runGifCommand("config results 100");
    harness.runGifCommand("config show");

    assert.equal(harness.storedValues.has("configuration.contentRating"), false);
    assert.equal(harness.storedValues.has("configuration.resultCount"), false);
    assert.equal(
        harness.printedLines.includes("[GIPHY] Content rating: pg-13"),
        true
    );
    assert.equal(
        harness.printedLines.includes("[GIPHY] Results per search: 3"),
        true
    );
});

test("clearing all configuration removes every persisted setting", () => {
    const harness = createScriptHarness();

    harness.runGifCommand("config key abcdefghijklmnop");
    harness.runGifCommand("config rating pg");
    harness.runGifCommand("config results 5");
    harness.runGifCommand("config context anywhere");
    harness.runGifCommand("config clear all");

    assert.equal(harness.storedValues.size, 0);
});

test("completion returns only matching GIF command words", () => {
    const harness = createScriptHarness();

    assert.deepEqual(Array.from(harness.complete("ra")), ["random"]);
    assert.deepEqual(Array.from(harness.complete("z")), []);
});

test("help documents setup every command defaults and operational cautions", () => {
    const harness = createScriptHarness();

    harness.runGifCommand("help");

    const completeHelp = harness.printedLines.join("\n");

    assert.equal(completeHelp.includes("https://developers.giphy.com/"), true);
    assert.equal(completeHelp.includes("/gif <terms>"), true);
    assert.equal(completeHelp.includes("/gif send <number>"), true);
    assert.equal(completeHelp.includes("/gif more"), true);
    assert.equal(completeHelp.includes("/gif random <terms>"), true);
    assert.equal(completeHelp.includes("/gif cancel"), true);
    assert.equal(completeHelp.includes("/gif help"), true);
    assert.equal(completeHelp.includes("/gif config key <key>"), true);
    assert.equal(completeHelp.includes("/gif config rating <g|pg|pg-13|r>"), true);
    assert.equal(completeHelp.includes("/gif config results <1-10>"), true);
    assert.equal(completeHelp.includes("/gif config context <strict|anywhere>"), true);
    assert.equal(completeHelp.includes("/gif config show"), true);
    assert.equal(completeHelp.includes("/gif config test"), true);
    assert.equal(completeHelp.includes("/gif config clear key"), true);
    assert.equal(completeHelp.includes("/gif config clear all"), true);
    assert.equal(completeHelp.includes("default pg-13"), true);
    assert.equal(completeHelp.includes("default 3"), true);
    assert.equal(completeHelp.includes("/gif excited penguin"), true);
    assert.equal(completeHelp.includes("/gif config rating pg"), true);
    assert.equal(completeHelp.includes("50 characters"), true);
    assert.equal(completeHelp.includes("not document the store as encrypted"), true);
    assert.equal(completeHelp.includes("Never paste it into IRC"), true);
    assert.equal(completeHelp.includes("Powered by GIPHY"), true);
});

test("running gif without arguments prints the same complete help", () => {
    const explicitHelpHarness = createScriptHarness();
    const emptyCommandHarness = createScriptHarness();

    explicitHelpHarness.runGifCommand("help");
    emptyCommandHarness.runGifCommand("");

    assert.deepEqual(
        emptyCommandHarness.printedLines,
        explicitHelpHarness.printedLines
    );
});
