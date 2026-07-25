"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repositoryRoot = path.join(__dirname, "..");
const manifest = JSON.parse(fs.readFileSync(
    path.join(repositoryRoot, "updates.json"),
    "utf8"
));

const scripts = [
    {
        id: "com.github.aipokalyptik.birc-utils.codec",
        version: "1.0.1",
        path: "codec/birc-codec.js",
        tagPrefix: "birc-utils-codec-v"
    },
    {
        id: "com.github.aipokalyptik.birc-utils.giphy",
        version: "1.0.0",
        path: "giphy/birc-giphy.js",
        tagPrefix: "birc-utils-giphy-v"
    },
    {
        id: "com.github.aipokalyptik.birc-utils.hash",
        version: "1.0.1",
        path: "hash/birc-hash.js",
        sourcePath: "hash/src/birc-hash.js",
        tagPrefix: "birc-utils-hash-v"
    },
    {
        id: "com.github.aipokalyptik.birc-utils.random",
        version: "1.0.0",
        path: "random/birc-random.js",
        tagPrefix: "birc-utils-random-v"
    },
    {
        id: "com.github.aipokalyptik.birc-utils.text-art",
        version: "1.0.0",
        path: "text-art/birc-text-art.js",
        tagPrefix: "birc-utils-text-art-v"
    },
    {
        id: "com.github.aipokalyptik.birc-utils.text-effects",
        version: "1.0.0",
        path: "text-effects/birc-text-effects.js",
        tagPrefix: "birc-utils-text-effects-v"
    }
];

function quotedConstant(source, constantName) {
    const expression = new RegExp(
        "var\\s+" + constantName + "\\s*=\\s*\"([^\"]+)\""
    );
    const match = expression.exec(source);

    assert.notEqual(match, null, "missing " + constantName);
    return match[1];
}

test("update manifest exactly matches every pasteable script identity", () => {
    const expectedManifestEntries = {};

    assert.equal(manifest.schemaVersion, 1);

    for (const script of scripts) {
        expectedManifestEntries[script.id] = script.version;
    }

    assert.deepEqual(manifest.scripts, expectedManifestEntries);
});

test("every pasteable script obeys the complete update metadata contract", () => {
    for (const script of scripts) {
        const implementationPath = script.sourcePath || script.path;
        const source = fs.readFileSync(
            path.join(repositoryRoot, implementationPath),
            "utf8"
        );
        const expectedFileUrl =
            "https://github.com/aipokalyptik/birc-utils/blob/main/" + script.path;
        const expectedDiffAnchor = "#diff-" + crypto
            .createHash("sha256")
            .update(script.path)
            .digest("hex");

        assert.equal(quotedConstant(source, "SCRIPT_ID"), script.id, script.path);
        assert.equal(
            quotedConstant(source, "SCRIPT_VERSION"),
            script.version,
            script.path
        );
        assert.equal(
            quotedConstant(source, "SCRIPT_UPDATE_FILE_URL"),
            expectedFileUrl,
            script.path
        );
        assert.equal(
            quotedConstant(source, "SCRIPT_RELEASE_TAG_PREFIX"),
            script.tagPrefix,
            script.path
        );
        assert.equal(
            quotedConstant(source, "SCRIPT_FILE_DIFF_ANCHOR"),
            expectedDiffAnchor,
            script.path
        );

        assert.match(source, /checkForScriptUpdate\(\);/);
        assert.match(source, /Changes since the installed version:/);
        assert.match(source, /Update instructions:/);
        assert.match(source, /review the file/);
        assert.match(source, /click Raw/);
        assert.match(source, /copy the entire file/);
        assert.match(source, /Scripts with/);
        assert.match(source, /⌘⌥S/);
        assert.match(source, /replace this script's contents/);
        assert.match(source, /and save/);
        assert.match(
            source,
            /https:\/\/raw\.githubusercontent\.com\/aipokalyptik\/birc-utils\/main\/updates\.json/
        );
    }
});

test("generated hash import retains the enforced source metadata", () => {
    const generatedHash = fs.readFileSync(
        path.join(repositoryRoot, "hash/birc-hash.js"),
        "utf8"
    );

    assert.match(
        generatedHash,
        /com\.github\.aipokalyptik\.birc-utils\.hash/
    );
    assert.match(generatedHash, /birc-utils-hash-v/);
    assert.match(generatedHash, /Changes since the installed version:/);
    assert.match(generatedHash, /click Raw/);
});
