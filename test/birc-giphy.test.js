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

test("search prints an HTTPS media preview and send posts the selected GIF", async () => {
    const harness = createScriptHarness();

    harness.runGifCommand("config key abcdefghijklmnop");
    harness.setFetchImplementation(() => {
        return Promise.resolve(successfulSearchResponse());
    });

    harness.runGifCommand("excited penguin", {
        target: "#penguins"
    });
    await flushPromiseCallbacks();

    assert.equal(
        harness.printedLines.includes(
            "https://media.giphy.com/media/example/200.gif"
        ),
        true
    );

    harness.runGifCommand("send 1", {
        target: "#different-channel"
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
    harness.runGifCommand("config clear all");

    assert.equal(harness.storedValues.size, 0);
});

test("completion returns only matching GIF command words", () => {
    const harness = createScriptHarness();

    assert.deepEqual(Array.from(harness.complete("ra")), ["random"]);
    assert.deepEqual(Array.from(harness.complete("z")), []);
});
