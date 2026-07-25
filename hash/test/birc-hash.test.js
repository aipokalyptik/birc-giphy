"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const scriptSource = fs.readFileSync(
    path.join(__dirname, "..", "birc-hash.js"),
    "utf8"
);
const bcryptSource = fs.readFileSync(
    path.join(__dirname, "..", "..", "node_modules", "bcryptjs", "index.js"),
    "utf8"
);
const bcryptP = Function(
    `"use strict"; return [${
        /var P_ORIG = \[([\s\S]*?)\];/.exec(bcryptSource)[1]
    }];`
)();
const bcryptS = Function(
    `"use strict"; return [${
        /var S_ORIG = \[([\s\S]*?)\];/.exec(bcryptSource)[1]
    }];`
)();
const runtimeData = JSON.stringify({
    version: 1,
    bcryptP,
    bcryptS
}) + "\n";
const updateManifestUrl =
    "https://raw.githubusercontent.com/aipokalyptik/birc-utils/main/updates.json";
const currentUpdateManifest = {
    status: 200,
    text: JSON.stringify({
        schemaVersion: 1,
        scripts: {
            "com.github.aipokalyptik.birc-utils.hash": "1.0.1"
        }
    })
};

function renderAuthorityArray(name, words) {
    return "unsigned long " + name + "[] = {\n" +
        words.map((word) => {
            return "0x" + word.toString(16).padStart(8, "0") + "L";
        }).join(", ") +
        "\n};\n";
}

const authorityDocument = [
    "Appendix A: Blowfish P-array and S-box constants\n",
    renderAuthorityArray("sBox0", bcryptS.slice(0, 256)),
    renderAuthorityArray("sBox1", bcryptS.slice(256, 512)),
    renderAuthorityArray("sBox2", bcryptS.slice(512, 768)),
    renderAuthorityArray("sBox3", bcryptS.slice(768, 1024)),
    renderAuthorityArray("pArray", bcryptP)
].join("\n");

function createHashHarness(options = {}) {
    const commands = {};
    const eventHandlers = {};
    const fetchUrls = [];
    const printedLines = [];
    const sentMessages = [];
    const storedValues = new Map();

    if (options.cachedData !== false) {
        storedValues.set("hash.runtimeData.v1", runtimeData);
    }

    const birc = {
        nick: "UtilityBot",
        print(text) {
            printedLines.push(text);
        },
        say(target, text) {
            sentMessages.push({ target, text });
        },
        onCommand(name, handler) {
            commands[name] = handler;
        },
        onComplete() {},
        on(type, handler) {
            eventHandlers[type] = handler;
        },
        sameNick(first, second) {
            return first.toLowerCase() === second.toLowerCase();
        },
        fetch(url) {
            if (url === updateManifestUrl) {
                return Promise.resolve(currentUpdateManifest);
            }

            fetchUrls.push(url);

            if (options.fetchResponse !== undefined) {
                return Promise.resolve(options.fetchResponse);
            }

            return Promise.reject(new Error("unexpected fetch"));
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
        },
        setTimeout
    };

    vm.runInNewContext(scriptSource, { birc, console });
    eventHandlers.load();

    return {
        run(input) {
            commands.hash(input);
            return printedLines[printedLines.length - 1].slice("[Hash] ".length);
        },
        receiveMessage(event) {
            eventHandlers.message(event);
        },
        fetchUrls,
        printedLines,
        storedValues,
        sentMessages
    };
}

test("remote hash use is opt-in and limited to non-secret operations", () => {
    const harness = createHashHarness();
    const event = {
        channel: "#developers",
        isBacklog: false,
        isMe: false,
        nick: "Ada",
        text: "@UtilityBot hash digest sha256 abc"
    };

    harness.receiveMessage(event);
    assert.equal(harness.sentMessages.length, 0);

    harness.run("remote on");
    harness.receiveMessage(event);
    harness.receiveMessage({
        channel: "#developers",
        isBacklog: false,
        isMe: false,
        nick: "Ada",
        text: "@UtilityBot hash hmac sha256 secret | message"
    });

    assert.deepEqual(harness.sentMessages, [
        {
            target: "#developers",
            text: "Ada: ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
        },
        {
            target: "#developers",
            text: "Ada: Remote use is limited to digest and checksum operations."
        }
    ]);
});

test("standard digest vectors match their published values", () => {
    const harness = createHashHarness();

    assert.equal(harness.run("digest md5 abc"), "900150983cd24fb0d6963f7d28e17f72");
    assert.equal(harness.run("digest sha1 abc"), "a9993e364706816aba3e25717850c26c9cd0d89d");
    assert.equal(harness.run("digest sha256 abc"), "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
    assert.equal(harness.run("digest sha512 abc"), "ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f");
});

test("common checksum vectors match reference implementations", () => {
    const harness = createHashHarness();

    assert.equal(harness.run("checksum crc32 123456789"), "cbf43926");
    assert.equal(harness.run("checksum crc32c 123456789"), "e3069283");
    assert.equal(harness.run("checksum adler32 Wikipedia"), "11e60398");
    assert.equal(harness.run("checksum fnv1a32 hello"), "4f9f2cab");
});

test("RFC HMAC-SHA256 vector matches", () => {
    const harness = createHashHarness();

    assert.equal(
        harness.run("hmac sha256 key | The quick brown fox jumps over the lazy dog"),
        "f7bc83f430538424b13298e6aa6fb143ef4d59a14946175997479dbc2d1a3cd8"
    );
});

test("bcrypt output and verification are deterministic with an explicit salt", () => {
    const harness = createHashHarness();
    const encoded = harness.run(
        "password bcrypt 4 ...................... | password"
    );

    assert.equal(
        encoded,
        "$2b$04$......................LAtw7/ohmmBAhnXqmkuIz83Rl5Qdjhm"
    );
    assert.equal(harness.run(`verify ${encoded} | password`), "MATCH");
    assert.equal(harness.run(`verify ${encoded} | wrong`), "NO MATCH");
    assert.equal(
        harness.run(`password ${encoded.slice(0, 29)} | password`),
        encoded
    );
    assert.equal(harness.run(`password ${encoded} | password`), encoded);
    assert.equal(
        harness.run(`password $2y$${encoded.slice(4)} | password`),
        `$2y$${encoded.slice(4)}`
    );
});

test("phpass portable output and verification are deterministic", () => {
    const harness = createHashHarness();
    const encoded = harness.run("password phpass 8 12345678 | password");

    assert.equal(encoded, "$P$612345678U1QdGJQj/LH52EnuhEn170");
    assert.equal(harness.run(`verify ${encoded} | password`), "MATCH");
    assert.equal(harness.run(`verify ${encoded} | wrong`), "NO MATCH");
    assert.equal(
        harness.run(`password ${encoded.slice(0, 12)} | password`),
        encoded
    );
    assert.equal(harness.run(`password ${encoded} | password`), encoded);
});

test("traditional DES crypt matches the system crypt vector", () => {
    const harness = createHashHarness();
    const encoded = harness.run("password crypt ab | password");

    assert.equal(encoded, "abJnggxhB/yWI");
    assert.equal(harness.run(`verify ${encoded} | password`), "MATCH");
    assert.equal(harness.run("password ab | password"), encoded);
    assert.equal(harness.run(`password ${encoded} | password`), encoded);
});

test("password commands reject silent truncation and missing salts", () => {
    const harness = createHashHarness();

    assert.equal(
        harness.run("password bcrypt 12 short | password"),
        "bcrypt salt must contain 22 bcrypt-alphabet characters."
    );
    assert.equal(
        harness.run("password bcrypt 4 ...................... | " + "x".repeat(73)),
        "bcrypt password exceeds its 72-byte limit."
    );
    assert.equal(
        harness.run("password crypt ab | ninechars"),
        "DES crypt password must contain at most 8 ASCII characters."
    );
    assert.equal(
        harness.run("password $2b$03$...................... | password"),
        "bcrypt setting or hash is malformed."
    );
    assert.equal(
        harness.run("password unknown | password"),
        "Unsupported password setting or hash format."
    );
});

test("cold cache downloads validates and persists bcrypt data", async () => {
    const harness = createHashHarness({
        cachedData: false,
        fetchResponse: {
            status: 200,
            text: authorityDocument
        }
    });

    await new Promise((resolve) => {
        setImmediate(resolve);
    });

    assert.equal(harness.fetchUrls.length, 1);
    assert.equal(
        harness.storedValues.get("hash.runtimeData.v1"),
        runtimeData
    );
    assert.equal(harness.run("data status"), "bcrypt data is ready.");
    assert.match(
        harness.run("password bcrypt 4 ...................... | password"),
        /^\$2b\$04\$/
    );
});

test("downloaded bcrypt data must match the pinned table digest", async () => {
    const harness = createHashHarness({
        cachedData: false,
        fetchResponse: {
            status: 200,
            text: authorityDocument.replace("0xd1310ba6L", "0xd1310ba7L")
        }
    });

    await new Promise((resolve) => {
        setImmediate(resolve);
    });

    assert.equal(
        harness.run("data status"),
        "bcrypt data is failed integrity validation."
    );
    assert.equal(
        harness.storedValues.has("hash.runtimeData.v1"),
        false
    );
});

test("help labels legacy algorithms and salt requirements", () => {
    const harness = createHashHarness();

    harness.run("help");
    const help = harness.printedLines.join("\n");

    for (const term of [
        "crc32",
        "md5",
        "sha256",
        "sha512",
        "hmac",
        "bcrypt",
        "phpass",
        "crypt",
        "verify",
        "no cryptographic random source",
        "legacy-only",
        "/hash digest sha256 hello",
        "/hash hmac sha256 secret | message",
        "/hash data status",
        "72 UTF-8 bytes",
        "Remote use permits only"
    ]) {
        assert.equal(help.includes(term), true, `help missing ${term}`);
    }
});
