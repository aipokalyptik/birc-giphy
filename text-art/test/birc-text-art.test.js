const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const scriptPath = path.join(__dirname, "..", "birc-text-art.js");
const scriptSource = fs.readFileSync(scriptPath, "utf8");

const sampleAsciiIndex = [
    {
        id: "cat",
        name: "Cat",
        description: "A friendly cat",
        category: "animals",
        tags: ["cat", "pet", "animal"],
        file: "animals/cat.txt",
        width: 5,
        height: 2
    },
    {
        id: "dog",
        name: "Dog",
        description: "A friendly dog",
        category: "animals",
        tags: ["dog", "pet", "animal"],
        file: "animals/dog.txt",
        width: 5,
        height: 2
    }
];

function createEnvironment(fetchHandler) {
    const commandHandlers = {};
    const printed = [];
    const said = [];
    const stored = new Map();

    const birc = {
        target: "#fallback",
        print(message) {
            printed.push(message);
        },
        say(target, message) {
            said.push({target, message});
        },
        fetch(url) {
            return fetchHandler(url);
        },
        store: {
            get(key) {
                return stored.get(key);
            },
            set(key, value) {
                stored.set(key, value);
            },
            delete(key) {
                stored.delete(key);
            }
        },
        onCommand(name, handler) {
            commandHandlers[name] = handler;
        },
        onComplete() {}
    };

    const context = vm.createContext({
        birc,
        console,
        encodeURIComponent,
        JSON,
        Map,
        Number,
        Object,
        String,
        Array
    });

    vm.runInContext(scriptSource, context);

    return {
        commandHandlers,
        printed,
        said,
        stored
    };
}

function commandEvent(target = "#art", network = "example") {
    return {target, network};
}

function waitForPromises() {
    return new Promise((resolve) => setImmediate(resolve));
}

test("registers separate ascii and ansi commands with complete help", () => {
    const environment = createEnvironment(() => Promise.reject(new Error("unexpected fetch")));

    assert.equal(typeof environment.commandHandlers.ascii, "function");
    assert.equal(typeof environment.commandHandlers.ansi, "function");

    environment.commandHandlers.ascii("help", commandEvent());
    environment.commandHandlers.ansi("help", commandEvent());

    assert.ok(environment.printed.some((line) => line.includes("/ascii preview <number>")));
    assert.ok(environment.printed.some((line) => line.includes("/ascii send <number>")));
    assert.ok(environment.printed.some((line) => line.includes("/ansi cache refresh <terms>")));
    assert.ok(environment.printed.some((line) => line.includes("never downloads")));
});

test("downloads the ASCII catalog once and searches it locally thereafter", async () => {
    let fetchCount = 0;
    const environment = createEnvironment((url) => {
        fetchCount += 1;
        assert.ok(url.endsWith("/arts/index.json"));
        return Promise.resolve({
            status: 200,
            text: JSON.stringify(sampleAsciiIndex)
        });
    });

    environment.commandHandlers.ascii("search cat", commandEvent());
    await waitForPromises();

    environment.commandHandlers.ascii("search dog", commandEvent());
    await waitForPromises();

    assert.equal(fetchCount, 1);
    assert.ok(environment.printed.some((line) => line.includes('Results for "cat"')));
    assert.ok(environment.printed.some((line) => line.includes('Results for "dog"')));
});

test("fetches selected ASCII once, validates it, then sends cached content", async () => {
    let contentFetchCount = 0;
    const environment = createEnvironment((url) => {
        if (url.endsWith("/arts/index.json")) {
            return Promise.resolve({
                status: 200,
                text: JSON.stringify(sampleAsciiIndex)
            });
        }

        contentFetchCount += 1;
        assert.ok(url.endsWith("/arts/animals/cat.txt"));
        return Promise.resolve({
            status: 200,
            text: " /\\_/\\\\\n( o.o )"
        });
    });

    environment.commandHandlers.ascii("cat", commandEvent());
    await waitForPromises();
    environment.commandHandlers.ascii("send 1", commandEvent());
    await waitForPromises();
    environment.commandHandlers.ascii("send 1", commandEvent());
    await waitForPromises();

    assert.equal(contentFetchCount, 1);
    assert.equal(environment.said.length, 4);
    assert.deepEqual(environment.said[0], {
        target: "#art",
        message: " /\\_/\\\\"
    });
});

test("ASCII preview prints locally, sends nothing, and warms the content cache", async () => {
    let contentFetchCount = 0;
    const environment = createEnvironment((url) => {
        if (url.endsWith("/arts/index.json")) {
            return Promise.resolve({
                status: 200,
                text: JSON.stringify(sampleAsciiIndex)
            });
        }

        contentFetchCount += 1;
        return Promise.resolve({
            status: 200,
            text: " /\\_/\\\\\n( o.o )"
        });
    });

    environment.commandHandlers.ascii("cat", commandEvent());
    await waitForPromises();
    environment.commandHandlers.ascii("preview 1", commandEvent());
    await waitForPromises();

    assert.equal(contentFetchCount, 1);
    assert.equal(environment.said.length, 0);
    assert.ok(environment.printed.includes(" /\\_/\\\\"));
    assert.ok(environment.printed.includes("( o.o )"));
    assert.ok(environment.printed.some((line) => line.includes("nothing will be sent")));

    environment.commandHandlers.ascii("send 1", commandEvent());
    await waitForPromises();

    assert.equal(contentFetchCount, 1);
    assert.equal(environment.said.length, 2);
});

test("rejects unsafe or oversized ASCII before sending or caching it", async () => {
    const environment = createEnvironment((url) => {
        if (url.endsWith("/arts/index.json")) {
            return Promise.resolve({
                status: 200,
                text: JSON.stringify(sampleAsciiIndex)
            });
        }

        return Promise.resolve({
            status: 200,
            text: "safe\u001b[31mnot safe"
        });
    });

    environment.commandHandlers.ascii("cat", commandEvent());
    await waitForPromises();
    environment.commandHandlers.ascii("send 1", commandEvent());
    await waitForPromises();

    assert.equal(environment.said.length, 0);
    assert.equal(environment.stored.has("ascii.artscii.content.v1.cat"), false);
    assert.ok(environment.printed.some((line) => line.includes("unsafe control")));
});

test("strict context prevents sending a result from another conversation", async () => {
    const environment = createEnvironment((url) => {
        if (url.endsWith("/arts/index.json")) {
            return Promise.resolve({
                status: 200,
                text: JSON.stringify(sampleAsciiIndex)
            });
        }

        return Promise.resolve({status: 200, text: "cat"});
    });

    environment.commandHandlers.ascii("cat", commandEvent("#cats"));
    await waitForPromises();
    environment.commandHandlers.ascii("send 1", commandEvent("#general"));
    await waitForPromises();

    assert.equal(environment.said.length, 0);
    assert.ok(environment.printed.some((line) => line.includes("another network or conversation")));
});

test("an in-flight ASCII selection is discarded when search results change", async () => {
    let resolveContentRequest;
    const environment = createEnvironment((url) => {
        if (url.endsWith("/arts/index.json")) {
            return Promise.resolve({
                status: 200,
                text: JSON.stringify(sampleAsciiIndex)
            });
        }

        return new Promise((resolve) => {
            resolveContentRequest = resolve;
        });
    });

    environment.commandHandlers.ascii("cat", commandEvent());
    await waitForPromises();
    environment.commandHandlers.ascii("send 1", commandEvent());
    environment.commandHandlers.ascii("dog", commandEvent());

    resolveContentRequest({status: 200, text: "cat"});
    await waitForPromises();

    assert.equal(environment.said.length, 0);
    assert.ok(environment.printed.some((line) => {
        return line.includes("search results changed");
    }));
});

test("anywhere context is an explicit opt-out", async () => {
    const environment = createEnvironment((url) => {
        if (url.endsWith("/arts/index.json")) {
            return Promise.resolve({
                status: 200,
                text: JSON.stringify(sampleAsciiIndex)
            });
        }

        return Promise.resolve({status: 200, text: "cat"});
    });

    environment.commandHandlers.ascii("cat", commandEvent("#cats"));
    await waitForPromises();
    environment.commandHandlers.ascii("config context anywhere", commandEvent("#cats"));
    environment.commandHandlers.ascii("send 1", commandEvent("#general"));
    await waitForPromises();

    assert.deepEqual(environment.said, [{target: "#general", message: "cat"}]);
});

test("ANSI searches are cached by normalized query and return links only", async () => {
    let fetchCount = 0;
    const environment = createEnvironment((url) => {
        fetchCount += 1;
        assert.ok(url.includes("filter=acid"));
        return Promise.resolve({
            status: 200,
            text: JSON.stringify({
                results: [
                    {
                        name: "acid-100",
                        year: 2004,
                        groups: ["acid"],
                        gallery: "/pack/acid-100"
                    }
                ]
            })
        });
    });

    environment.commandHandlers.ansi("search ACID", commandEvent());
    await waitForPromises();
    environment.commandHandlers.ansi("search  acid  ", commandEvent());
    await waitForPromises();
    environment.commandHandlers.ansi("send 1", commandEvent());

    assert.equal(fetchCount, 1);
    assert.equal(environment.said.length, 0);
    assert.ok(environment.printed.some((line) => line.includes("https://16colo.rs/pack/acid-100")));
    assert.ok(environment.printed.some((line) => line.includes("discovery-only")));
});

test("an explicit ANSI cache refresh repeats only the named query", async () => {
    let fetchCount = 0;
    const environment = createEnvironment(() => {
        fetchCount += 1;
        return Promise.resolve({
            status: 200,
            text: JSON.stringify({results: [{name: "acid-100", year: 2004, groups: []}]})
        });
    });

    environment.commandHandlers.ansi("acid", commandEvent());
    await waitForPromises();
    environment.commandHandlers.ansi("cache refresh acid", commandEvent());
    await waitForPromises();

    assert.equal(fetchCount, 2);
});
