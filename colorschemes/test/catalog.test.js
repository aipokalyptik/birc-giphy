"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const {themes} = require("../sources/catalog");

const catalogDirectory = path.join(__dirname, "..");

function schemeDirectories() {
    return fs.readdirSync(catalogDirectory, {
        withFileTypes: true
    }).filter((entry) => {
        return entry.isDirectory() &&
            entry.name !== "scripts" &&
            entry.name !== "sources" &&
            entry.name !== "test";
    }).map((entry) => entry.name).sort();
}

function readExport(directoryName) {
    return JSON.parse(fs.readFileSync(
        path.join(catalogDirectory, directoryName, directoryName + ".json"),
        "utf8"
    ));
}

function relativeLuminance(hexColor) {
    const channels = [1, 3, 5].map((offset) => {
        const encodedChannel = parseInt(hexColor.slice(offset, offset + 2), 16) / 255;

        if (encodedChannel <= 0.04045) {
            return encodedChannel / 12.92;
        }

        return Math.pow((encodedChannel + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * channels[0] +
        0.7152 * channels[1] +
        0.0722 * channels[2];
}

function contrastRatio(firstColor, secondColor) {
    const firstLuminance = relativeLuminance(firstColor);
    const secondLuminance = relativeLuminance(secondColor);
    const lighter = Math.max(firstLuminance, secondLuminance);
    const darker = Math.min(firstLuminance, secondLuminance);

    return (lighter + 0.05) / (darker + 0.05);
}

test("reviewed source catalog and generated directory set agree exactly", () => {
    const sourceSlugs = themes.map((theme) => theme.slug).sort();

    assert.equal(themes.length, 75);
    assert.deepEqual(schemeDirectories(), sourceSlugs);
    assert.equal(new Set(sourceSlugs).size, sourceSlugs.length);
});

test("every source theme has complete canonical semantic data", () => {
    const colorRoles = [
        "background",
        "text",
        "surface",
        "muted",
        "red",
        "green",
        "yellow",
        "blue",
        "magenta",
        "cyan",
        "selection"
    ];

    for (const theme of themes) {
        assert.match(theme.upstream, /^https:\/\/github\.com\//, theme.slug);
        assert.equal(theme.evidence.length > 5, true, theme.slug);
        assert.equal(theme.license.length > 0, true, theme.slug);
        assert.equal(
            ["red", "green", "yellow", "blue", "magenta", "cyan"].includes(
                theme.accentRole
            ),
            true,
            theme.slug + " accent role"
        );
        assert.deepEqual(Object.keys(theme.colors), colorRoles, theme.slug);

        for (const role of colorRoles) {
            assert.match(theme.colors[role], /^#[0-9a-f]{6}$/, theme.slug + " " + role);
        }
    }
});

test("every import has exact bIRC fields, semantic CSS, and a new stable UUID", () => {
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
        const exportedTheme = readExport(directoryName);

        assert.deepEqual(
            Object.keys(exportedTheme).sort(),
            expectedKeys,
            directoryName + " has unexpected export fields"
        );
        assert.match(exportedTheme.accent, /^#[0-9a-f]{6}$/);
        assert.match(exportedTheme.background, /^#[0-9a-f]{6}$/);
        assert.match(exportedTheme.text, /^#[0-9a-f]{6}$/);
        assert.match(
            exportedTheme.id,
            /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/
        );
        assert.equal(["dark", "light"].includes(exportedTheme.appearance), true);
        assert.equal(exportedTheme.customCSS.length > 500, true, directoryName);
        assert.equal(exportedTheme.isBuiltIn, false);
    }
});

test("generated CSS uses only documented transcript selectors and visual properties", () => {
    const allowedSelectors = new Set([
        ".t",
        ".history",
        ".join",
        ".part",
        ".quit",
        ".kick",
        ".error",
        ".notice",
        ".action",
        ".mode",
        ".nick",
        ".topic",
        ".server",
        ".highlight",
        ".reply",
        ".oper",
        ".reactions",
        ".card",
        ".card-title",
        ".card-desc",
        ".daychange"
    ]);
    const allowedProperties = new Set([
        "color",
        "background-color",
        "border-color",
        "border-left",
        "padding-left"
    ]);

    for (const directoryName of schemeDirectories()) {
        const css = readExport(directoryName).customCSS;
        const rules = css.split("\n");

        assert.equal(css.includes("url("), false, directoryName);
        assert.equal(css.includes("@"), false, directoryName);
        assert.equal(css.includes("position"), false, directoryName);

        for (const rule of rules) {
            const match = rule.match(/^([^{}]+) \{ ([^{}]+) \}$/);
            assert.notEqual(match, null, directoryName + ": " + rule);

            for (const selector of match[1].split(", ")) {
                assert.equal(
                    allowedSelectors.has(selector),
                    true,
                    directoryName + " selector " + selector
                );
            }

            for (const declaration of match[2].split("; ")) {
                const normalizedDeclaration = declaration.replace(/;$/, "");
                const colonIndex = normalizedDeclaration.indexOf(":");
                const property = normalizedDeclaration.slice(0, colonIndex);
                const value = normalizedDeclaration.slice(colonIndex + 1).trim();

                assert.equal(
                    allowedProperties.has(property),
                    true,
                    directoryName + " property " + property
                );
                assert.match(
                    value,
                    /^(#[0-9a-f]{6}|[23]px solid #[0-9a-f]{6}|[68]px)$/,
                    directoryName + " value " + value
                );
            }
        }
    }
});

test("no two complete semantic themes are duplicates", () => {
    const semanticPalettes = new Map();

    for (const theme of themes) {
        const paletteKey = [
            theme.appearance,
            ...Object.values(theme.colors)
        ].join("|");

        assert.equal(
            semanticPalettes.has(paletteKey),
            false,
            theme.slug + " duplicates " + semanticPalettes.get(paletteKey)
        );
        semanticPalettes.set(paletteKey, theme.slug);
    }
});

test("ordinary and highlighted text remain legible in every reviewed palette", () => {
    for (const theme of themes) {
        assert.equal(
            contrastRatio(theme.colors.text, theme.colors.background) >= 4,
            true,
            theme.slug + " ordinary text contrast"
        );
        assert.equal(
            contrastRatio(theme.colors.text, theme.colors.selection) >= 2,
            true,
            theme.slug + " highlighted text contrast"
        );
    }
});

test("every README documents roles and canonical evidence", () => {
    for (const directoryName of schemeDirectories()) {
        const readme = fs.readFileSync(
            path.join(catalogDirectory, directoryName, "README.md"),
            "utf8"
        );

        assert.match(readme, /## Semantic mapping/);
        assert.match(readme, /Canonical Vim\/Neovim source:/);
        assert.match(readme, /Palette evidence:/);
        assert.match(readme, /https:\/\/github\.com\//);
        assert.match(readme, /!\[bIRC transcript preview/);
    }
});

test("every regenerated SVG previews all semantic transcript states", () => {
    const expectedPhrases = [
        "semantic colorscheme preview",
        "Older history",
        "this mention",
        "ships the new palette",
        "joined #palette-lab",
        "left #palette-lab",
        "Notice:",
        "Error:",
        "reply rail",
        "Canonical upstream palette",
        "✓ 4"
    ];

    for (const directoryName of schemeDirectories()) {
        const preview = fs.readFileSync(
            path.join(catalogDirectory, directoryName, "preview.svg"),
            "utf8"
        );

        assert.match(preview, /^<svg /);

        for (const phrase of expectedPhrases) {
            assert.equal(
                preview.includes(phrase),
                true,
                directoryName + " preview lacks " + phrase
            );
        }
    }
});

test("main catalog README links every import and regenerated preview", () => {
    const catalogReadme = fs.readFileSync(
        path.join(catalogDirectory, "README.md"),
        "utf8"
    );

    assert.match(catalogReadme, /transcript-aware/);
    assert.match(catalogReadme, /sources\/catalog\.js/);

    for (const directoryName of schemeDirectories()) {
        assert.equal(
            catalogReadme.includes(directoryName + "/" + directoryName + ".json"),
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
