"use strict";

/*
 * Regenerates every import file, README, and SVG preview from the reviewed
 * semantic palettes in sources/catalog.js.
 *
 * Run from the repository root:
 *
 *     node colorschemes/scripts/generate-catalog.js
 */

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const {themes} = require("../sources/catalog");

const catalogDirectory = path.join(__dirname, "..");

function deterministicUuid(slug) {
    const bytes = crypto
        .createHash("sha256")
        .update("birc-utils-colorscheme-css-v2:" + slug)
        .digest()
        .subarray(0, 16);

    bytes[6] = (bytes[6] & 0x0f) | 0x50;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    const hexadecimal = bytes.toString("hex").toUpperCase();

    return [
        hexadecimal.slice(0, 8),
        hexadecimal.slice(8, 12),
        hexadecimal.slice(12, 16),
        hexadecimal.slice(16, 20),
        hexadecimal.slice(20)
    ].join("-");
}

function customCss(theme) {
    const colors = theme.colors;

    return [
        ".t, .history { color: " + colors.muted + "; }",
        ".join { color: " + colors.green + "; }",
        ".part, .quit { color: " + colors.muted + "; }",
        ".kick, .error { color: " + colors.red + "; }",
        ".notice { color: " + colors.yellow + "; }",
        ".action { color: " + colors.magenta + "; }",
        ".mode, .nick, .topic, .server { color: " + colors.cyan + "; }",
        ".highlight { color: " + colors.text + "; background-color: " +
            colors.selection + "; border-left: 3px solid " + colors.magenta +
            "; padding-left: 8px; }",
        ".reply { color: " + colors.muted + "; border-left: 2px solid " +
            colors.blue + "; padding-left: 6px; }",
        ".oper { color: " + colors.background + "; background-color: " +
            colors.yellow + "; }",
        ".reactions { color: " + colors.blue + "; background-color: " +
            colors.surface + "; }",
        ".card { background-color: " + colors.surface + "; border-color: " +
            colors.muted + "; }",
        ".card-title { color: " + colors.blue + "; }",
        ".card-desc { color: " + colors.muted + "; }",
        ".daychange { color: " + colors.muted + "; border-color: " +
            colors.surface + "; }"
    ].join("\n");
}

function exportedJson(theme) {
    const exportedTheme = {
        accent: theme.colors[theme.accentRole],
        appearance: theme.appearance,
        background: theme.colors.background,
        customCSS: customCss(theme),
        id: deterministicUuid(theme.slug),
        isBuiltIn: false,
        name: theme.name,
        text: theme.colors.text
    };

    /*
     * bIRC's exporter uses a space before the colon. Preserve that shape while
     * letting JSON.stringify perform all string escaping.
     */
    return JSON.stringify(exportedTheme, null, 2).replace(/": /g, "\" : ") + "\n";
}

function escapeXml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function previewLine(y, timestamp, nick, message, timestampColor, nickColor, textColor) {
    return [
        "    <text x=\"28\" y=\"" + y + "\" fill=\"" + timestampColor + "\">" +
            timestamp + "</text>",
        "    <text x=\"104\" y=\"" + y + "\" fill=\"" + nickColor +
            "\" font-weight=\"700\">" + escapeXml(nick) + "</text>",
        "    <text x=\"205\" y=\"" + y + "\" fill=\"" + textColor + "\">" +
            escapeXml(message) + "</text>"
    ];
}

function previewSvg(theme) {
    const colors = theme.colors;
    const accent = colors[theme.accentRole];
    const safeName = escapeXml(theme.name);
    const lines = [
        "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"760\" height=\"500\" viewBox=\"0 0 760 500\" role=\"img\" aria-labelledby=\"title description\">",
        "  <title id=\"title\">" + safeName + " bIRC semantic colorscheme preview</title>",
        "  <description id=\"description\">Transcript preview showing ordinary messages, history, a mention, an action, membership events, a notice, an error, a reply, a link card, and reactions using the generated custom CSS palette.</description>",
        "  <rect width=\"760\" height=\"500\" rx=\"12\" fill=\"" +
            colors.background + "\"/>",
        "  <rect x=\"18\" y=\"18\" width=\"724\" height=\"464\" rx=\"9\" fill=\"" +
            colors.background + "\" stroke=\"" + colors.surface + "\"/>",
        "  <text x=\"32\" y=\"50\" font-family=\"-apple-system, BlinkMacSystemFont, sans-serif\" font-size=\"18\" font-weight=\"700\" fill=\"" +
            accent + "\">#palette-lab</text>",
        "  <text x=\"728\" y=\"50\" text-anchor=\"end\" font-family=\"ui-monospace, SFMono-Regular, Menlo, monospace\" font-size=\"12\" fill=\"" +
            colors.muted + "\">" + safeName + "</text>",
        "  <line x1=\"30\" y1=\"65\" x2=\"730\" y2=\"65\" stroke=\"" +
            colors.surface + "\"/>",
        "  <g font-family=\"ui-monospace, SFMono-Regular, Menlo, Consolas, monospace\" font-size=\"14\">"
    ];

    lines.push(...previewLine(92, "12:40", "Ada", "The semantic preview is ready.", colors.muted, colors.cyan, colors.text));
    lines.push(...previewLine(121, "12:41", "Lin", "Older history remains deliberately quiet.", colors.muted, colors.muted, colors.muted));
    lines.push(
        "    <rect x=\"24\" y=\"137\" width=\"712\" height=\"31\" rx=\"3\" fill=\"" +
            colors.selection + "\"/>",
        "    <rect x=\"24\" y=\"137\" width=\"4\" height=\"31\" fill=\"" +
            colors.magenta + "\"/>"
    );
    lines.push(...previewLine(158, "12:42", "Mira", "Ada: this mention uses the search/Visual color.", colors.muted, colors.blue, colors.text));
    lines.push(
        "    <text x=\"28\" y=\"193\" fill=\"" + colors.muted + "\">12:43</text>",
        "    <text x=\"104\" y=\"193\" fill=\"" + colors.magenta +
            "\" font-style=\"italic\">* Lin ships the new palette</text>",
        "    <text x=\"28\" y=\"222\" fill=\"" + colors.green +
            "\">→ Jo joined #palette-lab</text>",
        "    <text x=\"28\" y=\"251\" fill=\"" + colors.muted +
            "\">← Pat left #palette-lab</text>",
        "    <text x=\"28\" y=\"280\" fill=\"" + colors.yellow +
            "\">— Notice: preview regeneration completed</text>",
        "    <text x=\"28\" y=\"309\" fill=\"" + colors.red +
            "\">! Error: one unsafe declaration was rejected</text>",
        "    <rect x=\"28\" y=\"328\" width=\"4\" height=\"44\" fill=\"" +
            colors.blue + "\"/>",
        "    <text x=\"44\" y=\"346\" fill=\"" + colors.muted +
            "\">↳ Ada: The semantic preview is ready.</text>",
        "    <text x=\"44\" y=\"366\" fill=\"" + colors.text +
            "\">The reply rail follows the upstream link color.</text>",
        "    <rect x=\"28\" y=\"387\" width=\"704\" height=\"64\" rx=\"6\" fill=\"" +
            colors.surface + "\" stroke=\"" + colors.muted + "\"/>",
        "    <text x=\"44\" y=\"412\" fill=\"" + colors.blue +
            "\" font-weight=\"700\">Canonical upstream palette</text>",
        "    <text x=\"44\" y=\"435\" fill=\"" + colors.muted +
            "\">Editor roles adapted to transcript semantics</text>",
        "    <rect x=\"596\" y=\"405\" width=\"116\" height=\"28\" rx=\"14\" fill=\"" +
            colors.surface + "\" stroke=\"" + colors.blue + "\"/>",
        "    <text x=\"654\" y=\"424\" text-anchor=\"middle\" fill=\"" +
            colors.blue + "\">✓ 4   ★ 2</text>",
        "  </g>",
        "</svg>",
        ""
    );

    return lines.join("\n");
}

function schemeReadme(theme) {
    const colors = theme.colors;

    return [
        "# " + theme.name,
        "",
        "A transcript-aware bIRC adaptation of [" + theme.name + "](" +
            theme.upstream + ").",
        "",
        "![bIRC transcript preview of " + theme.name + "](preview.svg)",
        "",
        "The SVG is generated from the same semantic palette and CSS embedded in",
        "the import file. It demonstrates transcript states rather than imitating",
        "bIRC's native window chrome.",
        "",
        "## Semantic mapping",
        "",
        "| bIRC transcript role | Upstream intent | Color |",
        "| --- | --- | --- |",
        "| Canvas | Normal/editor background | `" + colors.background + "` |",
        "| Ordinary text | Normal/editor foreground | `" + colors.text + "` |",
        "| Native accent | Principal upstream highlight (" + theme.accentRole +
            ") | `" + colors[theme.accentRole] + "` |",
        "| Timestamps and history | Comment/muted foreground | `" + colors.muted + "` |",
        "| Links, replies, and card titles | Link/function/blue | `" + colors.blue + "` |",
        "| Joins | String/diff-added/green | `" + colors.green + "` |",
        "| Parts and quits | Comment/muted foreground | `" + colors.muted + "` |",
        "| Notices | Warning/yellow | `" + colors.yellow + "` |",
        "| Actions | Special/magenta | `" + colors.magenta + "` |",
        "| Errors and kicks | Error/red | `" + colors.red + "` |",
        "| Modes, nicks, topics, and server lines | Type/cyan | `" + colors.cyan + "` |",
        "| Mention background | Search/Visual/selection | `" + colors.selection + "` |",
        "| Cards and reaction surfaces | Secondary editor surface | `" +
            colors.surface + "` |",
        "",
        "The native JSON fields retain the upstream canvas, foreground, principal",
        "accent, and light/dark appearance. `customCSS` supplies the additional",
        "transcript distinctions using only selectors and visual properties listed",
        "in bIRC's Custom transcript CSS documentation.",
        "",
        "## Upstream evidence",
        "",
        "- Canonical Vim/Neovim source: [" + theme.upstream + "](" +
            theme.upstream + ")",
        "- Palette evidence: `" + theme.evidence + "`",
        "- Upstream license: `" + theme.license + "`",
        "",
        "The upstream project remains authoritative for its palette, variants,",
        "name, and license. This adaptation contains independently generated bIRC",
        "configuration and preview data, not copied Vim or Neovim implementation",
        "code.",
        ""
    ].join("\n");
}

function catalogReadme() {
    const lines = [
        "# bIRC Vim colorscheme adaptations",
        "",
        "This catalog rebuilds popular and historically notable Vim and Neovim",
        "palettes as transcript-aware bIRC color schemes. Every import remains in",
        "bIRC's JSON interchange format, with a generated `customCSS` layer that",
        "uses substantially more of the original palette than the native",
        "background/text/accent fields alone can represent.",
        "",
        "The source of truth is [`sources/catalog.js`](sources/catalog.js). Its",
        "reviewed values come from canonical upstream palette files, Vim highlight",
        "groups, or upstream terminal exports. The JSON, README, and SVG files in",
        "each theme directory are regenerated together and are never edited as",
        "independent artifacts.",
        "",
        "## Import files",
        "",
        "Each preview shows ordinary text, history, a mention, an action, join and",
        "part events, a notice, an error, a reply, a card, and reactions.",
        ""
    ];

    for (let themeIndex = 0; themeIndex < themes.length; themeIndex += 2) {
        const left = themes[themeIndex];
        const right = themes[themeIndex + 1];

        lines.push("<table><tr>");
        lines.push("<td width=\"50%\" valign=\"top\">");
        lines.push("<a href=\"" + left.slug + "/README.md\"><strong>" +
            left.name + "</strong></a><br>");
        lines.push("<a href=\"" + left.slug + "/" + left.slug +
            ".json\">JSON</a><br>");
        lines.push("<img src=\"" + left.slug +
            "/preview.svg\" alt=\"" + left.name +
            " semantic transcript preview\" width=\"360\">");
        lines.push("</td>");

        if (right !== undefined) {
            lines.push("<td width=\"50%\" valign=\"top\">");
            lines.push("<a href=\"" + right.slug + "/README.md\"><strong>" +
                right.name + "</strong></a><br>");
            lines.push("<a href=\"" + right.slug + "/" + right.slug +
                ".json\">JSON</a><br>");
            lines.push("<img src=\"" + right.slug +
                "/preview.svg\" alt=\"" + right.name +
                " semantic transcript preview\" width=\"360\">");
            lines.push("</td>");
        }

        lines.push("</tr></table>");
    }

    lines.push(
        "",
        "## Adaptation policy",
        "",
        "The mapping starts with editor semantics rather than visual similarity:",
        "",
        "- Normal background and foreground become the transcript canvas and text.",
        "- Comment or muted colors become timestamps, history, departures, and",
        "  supporting metadata.",
        "- String or diff-added green becomes joins.",
        "- Warning yellow becomes notices.",
        "- Special or magenta becomes `/me` actions.",
        "- Error red becomes errors and kicks.",
        "- Type or cyan becomes mode, nick, topic, and server events.",
        "- Search, Visual, or selection backgrounds become mention backgrounds.",
        "- Secondary editor surfaces become cards and reaction-chip backgrounds.",
        "",
        "This preserves the theme's hierarchy and emotional character without",
        "pretending an IRC transcript contains programming-language syntax groups.",
        "Custom CSS affects only bIRC's message log; native application chrome",
        "continues to use the JSON appearance and three base colors.",
        "",
        "## CSS safety",
        "",
        "Generated CSS uses only bIRC-documented transcript classes and ordinary",
        "visual declarations: `color`, `background-color`, `border-color`,",
        "`border-left`, and `padding-left`. It contains no URLs, imports,",
        "positioning, generated content, selectors outside the transcript API, or",
        "attempts to affect native application layout.",
        "",
        "## Provenance and regeneration",
        "",
        "Every per-theme README links its canonical upstream and identifies the",
        "palette file or upstream export used for the mapping. Run:",
        "",
        "```sh",
        "node colorschemes/scripts/generate-catalog.js",
        "```",
        "",
        "The generator rewrites all JSON imports, documentation, and SVG previews",
        "from the reviewed semantic source data. IDs are deterministic and use a",
        "new namespace for this from-scratch CSS-aware catalog.",
        ""
    );

    return lines.join("\n");
}

for (const theme of themes) {
    const outputDirectory = path.join(catalogDirectory, theme.slug);

    fs.mkdirSync(outputDirectory, {
        recursive: true
    });
    fs.writeFileSync(
        path.join(outputDirectory, theme.slug + ".json"),
        exportedJson(theme)
    );
    fs.writeFileSync(
        path.join(outputDirectory, "README.md"),
        schemeReadme(theme)
    );
    fs.writeFileSync(
        path.join(outputDirectory, "preview.svg"),
        previewSvg(theme)
    );
}

fs.writeFileSync(path.join(catalogDirectory, "README.md"), catalogReadme());

console.log(
    "Regenerated " + themes.length +
    " transcript-aware bIRC colorscheme adaptations."
);
