"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const catalogDirectory = path.join(__dirname, "..");

function schemeDirectories() {
    return fs.readdirSync(catalogDirectory, {
        withFileTypes: true
    }).filter((entry) => {
        return entry.isDirectory() && entry.name !== "scripts" && entry.name !== "test";
    }).map((entry) => entry.name).sort();
}

test("catalog contains a broad collection of generated schemes", () => {
    assert.equal(schemeDirectories().length >= 70, true);
});

test("every scheme has exact export fields valid colors and a stable UUID", () => {
    const expectedKeys = [
        "accent",
        "appearance",
        "background",
        "customCSS",
        "id",
        "isBuiltIn",
        "name",
        "text"
    ];

    for (const directoryName of schemeDirectories()) {
        const jsonPath = path.join(
            catalogDirectory,
            directoryName,
            directoryName + ".json"
        );
        const exportedScheme = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

        assert.deepEqual(
            Object.keys(exportedScheme).sort(),
            expectedKeys,
            directoryName + " has unexpected export fields"
        );
        assert.match(exportedScheme.accent, /^#[0-9a-f]{6}$/);
        assert.match(exportedScheme.background, /^#[0-9a-f]{6}$/);
        assert.match(exportedScheme.text, /^#[0-9a-f]{6}$/);
        assert.match(
            exportedScheme.id,
            /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/
        );
        assert.equal(["dark", "light"].includes(exportedScheme.appearance), true);
        assert.equal(exportedScheme.customCSS, "");
        assert.equal(exportedScheme.isBuiltIn, false);
    }
});

test("no two exported schemes have the same visual palette", () => {
    const palettes = new Map();

    for (const directoryName of schemeDirectories()) {
        const exportedScheme = JSON.parse(fs.readFileSync(
            path.join(
                catalogDirectory,
                directoryName,
                directoryName + ".json"
            ),
            "utf8"
        ));
        const paletteKey = [
            exportedScheme.appearance,
            exportedScheme.background,
            exportedScheme.text,
            exportedScheme.accent
        ].join("|");

        assert.equal(
            palettes.has(paletteKey),
            false,
            directoryName + " duplicates " + palettes.get(paletteKey)
        );
        palettes.set(paletteKey, directoryName);
    }
});

test("every scheme documents canonical provenance and embeds a preview", () => {
    for (const directoryName of schemeDirectories()) {
        const schemeDirectory = path.join(catalogDirectory, directoryName);
        const readme = fs.readFileSync(
            path.join(schemeDirectory, "README.md"),
            "utf8"
        );
        const preview = fs.readFileSync(
            path.join(schemeDirectory, "preview.svg"),
            "utf8"
        );

        assert.match(readme, /Canonical Vim\/Neovim source:/);
        assert.match(readme, /https:\/\/github\.com\//);
        assert.match(readme, /!\[Approximate bIRC preview/);
        assert.match(preview, /^<svg /);
        assert.match(preview, /bIRC colorscheme preview/);
    }
});

test("main catalog README links every scheme JSON and preview", () => {
    const catalogReadme = fs.readFileSync(
        path.join(catalogDirectory, "README.md"),
        "utf8"
    );

    for (const directoryName of schemeDirectories()) {
        assert.equal(
            catalogReadme.includes(
                directoryName + "/" + directoryName + ".json"
            ),
            true,
            "missing JSON link for " + directoryName
        );
        assert.equal(
            catalogReadme.includes(directoryName + "/preview.svg"),
            true,
            "missing preview for " + directoryName
        );
    }
});
