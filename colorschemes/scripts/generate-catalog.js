"use strict";

/*
 * Generates the bIRC colorscheme catalog from reviewed upstream palette
 * selections. Run this file from the repository root with:
 *
 *     node colorschemes/scripts/generate-catalog.js
 *
 * JSON files intentionally contain only fields emitted by bIRC's exporter.
 * Provenance and adaptation notes are written to the neighboring README.
 */

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const catalogDirectory = path.join(__dirname, "..");

function scheme(
    slug,
    name,
    appearance,
    background,
    text,
    accent,
    canonicalUrl,
    license,
    paletteBasis
) {
    return {
        slug,
        name,
        appearance,
        background,
        text,
        accent,
        canonicalUrl,
        license,
        paletteBasis
    };
}

const schemes = [
    scheme("solarized-dark", "Solarized Dark", "dark", "#002b36", "#839496", "#268bd2", "https://github.com/altercation/vim-colors-solarized", "MIT", "Solarized base03, base0, and blue"),
    scheme("solarized-light", "Solarized Light", "light", "#fdf6e3", "#657b83", "#268bd2", "https://github.com/altercation/vim-colors-solarized", "MIT", "Solarized base3, base00, and blue"),
    scheme("gruvbox-dark", "Gruvbox Dark", "dark", "#282828", "#ebdbb2", "#d79921", "https://github.com/morhetz/gruvbox", "MIT", "Gruvbox dark0, light1, and neutral yellow"),
    scheme("gruvbox-light", "Gruvbox Light", "light", "#fbf1c7", "#3c3836", "#b57614", "https://github.com/morhetz/gruvbox", "MIT", "Gruvbox light0, dark1, and faded yellow"),
    scheme("molokai", "Molokai", "dark", "#1b1d1e", "#f8f8f2", "#f92672", "https://github.com/tomasr/molokai", "MIT", "Molokai Normal background, foreground, and pink"),
    scheme("zenburn", "Zenburn", "dark", "#3f3f3f", "#dcdccc", "#f0dfaf", "https://github.com/jnurmine/Zenburn", "GPL-2.0", "Zenburn Normal background, foreground, and yellow"),
    scheme("jellybeans", "Jellybeans", "dark", "#151515", "#e8e8d3", "#8197bf", "https://github.com/nanotech/jellybeans.vim", "MIT", "Jellybeans background, foreground, and blue"),
    scheme("vividchalk", "Vividchalk", "dark", "#000000", "#eeeeee", "#ffcc00", "https://github.com/tpope/vim-vividchalk", "Vim License", "Vividchalk Normal background, foreground, and Identifier yellow"),
    scheme("papercolor-dark", "PaperColor Dark", "dark", "#1c1c1c", "#d0d0d0", "#5fafd7", "https://github.com/NLKNguyen/papercolor-theme", "MIT", "PaperColor dark background, foreground, and blue"),
    scheme("papercolor-light", "PaperColor Light", "light", "#eeeeee", "#444444", "#0087af", "https://github.com/NLKNguyen/papercolor-theme", "MIT", "PaperColor light background, foreground, and blue"),
    scheme("onedark", "OneDark", "dark", "#282c34", "#abb2bf", "#61afef", "https://github.com/joshdick/onedark.vim", "MIT", "OneDark background, foreground, and blue"),
    scheme("one-light", "One Light", "light", "#fafafa", "#383a42", "#4078f2", "https://github.com/rakr/vim-one", "MIT", "vim-one light background, foreground, and blue"),
    scheme("nord", "Nord", "dark", "#2e3440", "#d8dee9", "#88c0d0", "https://github.com/arcticicestudio/nord-vim", "MIT", "Nord nord0, nord4, and nord8"),
    scheme("dracula", "Dracula", "dark", "#282a36", "#f8f8f2", "#bd93f9", "https://github.com/dracula/vim", "MIT", "Dracula background, foreground, and purple"),
    scheme("monokai", "Monokai", "dark", "#272822", "#f8f8f2", "#f92672", "https://github.com/crusoexia/vim-monokai", "MIT", "Monokai background, foreground, and pink"),
    scheme("ayu-dark", "Ayu Dark", "dark", "#0a0e14", "#b3b1ad", "#ffb454", "https://github.com/ayu-theme/ayu-vim", "MIT", "Ayu Dark background, foreground, and orange"),
    scheme("ayu-mirage", "Ayu Mirage", "dark", "#1f2430", "#cbccc6", "#ffcc66", "https://github.com/ayu-theme/ayu-vim", "MIT", "Ayu Mirage background, foreground, and yellow"),
    scheme("ayu-light", "Ayu Light", "light", "#fafafa", "#5c6166", "#ff9940", "https://github.com/ayu-theme/ayu-vim", "MIT", "Ayu Light background, foreground, and orange"),
    scheme("oceanic-next", "Oceanic Next", "dark", "#1b2b34", "#c0c5ce", "#6699cc", "https://github.com/mhartington/oceanic-next", "MIT", "Oceanic Next base00, base05, and base0D"),
    scheme("hybrid", "Hybrid", "dark", "#1d1f21", "#c5c8c6", "#81a2be", "https://github.com/w0ng/vim-hybrid", "MIT", "Hybrid background, foreground, and blue"),
    scheme("iceberg", "Iceberg", "dark", "#161821", "#c6c8d1", "#84a0c6", "https://github.com/cocopon/iceberg.vim", "MIT", "Iceberg dark background, foreground, and blue"),
    scheme("palenight", "Palenight", "dark", "#292d3e", "#a6accd", "#c792ea", "https://github.com/drewtempelmeyer/palenight.vim", "MIT", "Palenight background, foreground, and purple"),
    scheme("tender", "Tender", "dark", "#282828", "#eeeeee", "#73cef4", "https://github.com/jacoborus/tender.vim", "MIT", "Tender background, foreground, and blue"),
    scheme("gotham", "Gotham", "dark", "#0a0f14", "#98d1ce", "#195466", "https://github.com/whatyouhide/vim-gotham", "MIT", "Gotham background, foreground, and blue"),
    scheme("seoul256", "Seoul256", "dark", "#3a3a3a", "#d0d0d0", "#87afaf", "https://github.com/junegunn/seoul256.vim", "MIT", "Seoul256 dark background, foreground, and cyan"),
    scheme("wombat", "Wombat", "dark", "#242424", "#f6f3e8", "#8ac6f2", "https://github.com/vim/colorschemes", "Vim License", "Vim Wombat background, foreground, and blue"),
    scheme("desert", "Desert", "dark", "#333333", "#ffffff", "#ffff60", "https://github.com/vim/colorschemes", "Vim License", "Vim Desert GUI background, foreground, and yellow"),
    scheme("elflord", "Elflord", "dark", "#000000", "#ffffff", "#00ffff", "https://github.com/vim/colorschemes", "Vim License", "Vim Elflord GUI background, foreground, and cyan"),
    scheme("morning", "Morning", "light", "#e4e4e4", "#000000", "#0000ff", "https://github.com/vim/colorschemes", "Vim License", "Vim Morning background, foreground, and blue"),

    scheme("catppuccin-mocha", "Catppuccin Mocha", "dark", "#1e1e2e", "#cdd6f4", "#cba6f7", "https://github.com/catppuccin/nvim", "MIT", "Catppuccin Mocha base, text, and mauve"),
    scheme("catppuccin-macchiato", "Catppuccin Macchiato", "dark", "#24273a", "#cad3f5", "#c6a0f6", "https://github.com/catppuccin/nvim", "MIT", "Catppuccin Macchiato base, text, and mauve"),
    scheme("catppuccin-frappe", "Catppuccin Frappé", "dark", "#303446", "#c6d0f5", "#ca9ee6", "https://github.com/catppuccin/nvim", "MIT", "Catppuccin Frappé base, text, and mauve"),
    scheme("catppuccin-latte", "Catppuccin Latte", "light", "#eff1f5", "#4c4f69", "#8839ef", "https://github.com/catppuccin/nvim", "MIT", "Catppuccin Latte base, text, and mauve"),

    scheme("tokyonight-night", "Tokyo Night", "dark", "#1a1b26", "#c0caf5", "#7aa2f7", "https://github.com/folke/tokyonight.nvim", "Apache-2.0", "Tokyo Night background, foreground, and blue"),
    scheme("tokyonight-storm", "Tokyo Night Storm", "dark", "#24283b", "#c0caf5", "#7aa2f7", "https://github.com/folke/tokyonight.nvim", "Apache-2.0", "Tokyo Night Storm background, foreground, and blue"),
    scheme("tokyonight-moon", "Tokyo Night Moon", "dark", "#222436", "#c8d3f5", "#82aaff", "https://github.com/folke/tokyonight.nvim", "Apache-2.0", "Tokyo Night Moon background, foreground, and blue"),
    scheme("tokyonight-day", "Tokyo Night Day", "light", "#e1e2e7", "#3760bf", "#2e7de9", "https://github.com/folke/tokyonight.nvim", "Apache-2.0", "Tokyo Night Day background, foreground, and blue"),

    scheme("kanagawa-wave", "Kanagawa Wave", "dark", "#1f1f28", "#dcd7ba", "#7e9cd8", "https://github.com/rebelot/kanagawa.nvim", "MIT", "Kanagawa Wave sumiInk3, fujiWhite, and crystalBlue"),
    scheme("kanagawa-dragon", "Kanagawa Dragon", "dark", "#181616", "#c5c9c5", "#8ba4b0", "https://github.com/rebelot/kanagawa.nvim", "MIT", "Kanagawa Dragon dragonBlack3, dragonWhite, and dragonBlue"),
    scheme("kanagawa-lotus", "Kanagawa Lotus", "light", "#f2ecbc", "#545464", "#4d699b", "https://github.com/rebelot/kanagawa.nvim", "MIT", "Kanagawa Lotus lotusWhite3, lotusInk1, and lotusBlue4"),

    scheme("rose-pine", "Rosé Pine", "dark", "#191724", "#e0def4", "#c4a7e7", "https://github.com/rose-pine/neovim", "MIT", "Rosé Pine base, text, and iris"),
    scheme("rose-pine-moon", "Rosé Pine Moon", "dark", "#232136", "#e0def4", "#c4a7e7", "https://github.com/rose-pine/neovim", "MIT", "Rosé Pine Moon base, text, and iris"),
    scheme("rose-pine-dawn", "Rosé Pine Dawn", "light", "#faf4ed", "#575279", "#907aa9", "https://github.com/rose-pine/neovim", "MIT", "Rosé Pine Dawn base, text, and iris"),

    scheme("nightfox", "Nightfox", "dark", "#192330", "#cdcecf", "#719cd6", "https://github.com/EdenEast/nightfox.nvim", "MIT", "Nightfox background, foreground, and blue"),
    scheme("dayfox", "Dayfox", "light", "#f6f2ee", "#3d2b5a", "#287980", "https://github.com/EdenEast/nightfox.nvim", "MIT", "Dayfox background, foreground, and cyan"),
    scheme("dawnfox", "Dawnfox", "light", "#faf4ed", "#575279", "#286983", "https://github.com/EdenEast/nightfox.nvim", "MIT", "Dawnfox background, foreground, and blue"),
    scheme("duskfox", "Duskfox", "dark", "#232136", "#e0def4", "#569fba", "https://github.com/EdenEast/nightfox.nvim", "MIT", "Duskfox background, foreground, and cyan"),
    scheme("nordfox", "Nordfox", "dark", "#2e3440", "#cdcecf", "#81a1c1", "https://github.com/EdenEast/nightfox.nvim", "MIT", "Nordfox background, foreground, and blue"),
    scheme("terafox", "Terafox", "dark", "#152528", "#e6eaea", "#5a93aa", "https://github.com/EdenEast/nightfox.nvim", "MIT", "Terafox background, foreground, and blue"),
    scheme("carbonfox", "Carbonfox", "dark", "#161616", "#f2f4f8", "#78a9ff", "https://github.com/EdenEast/nightfox.nvim", "MIT", "Carbonfox background, foreground, and blue"),

    scheme("everforest-dark", "Everforest Dark", "dark", "#2d353b", "#d3c6aa", "#7fbbb3", "https://github.com/sainnhe/everforest", "MIT", "Everforest medium dark background, foreground, and blue"),
    scheme("everforest-light", "Everforest Light", "light", "#fdf6e3", "#5c6a72", "#3a94c5", "https://github.com/sainnhe/everforest", "MIT", "Everforest medium light background, foreground, and blue"),
    scheme("gruvbox-material-dark", "Gruvbox Material Dark", "dark", "#282828", "#d4be98", "#7daea3", "https://github.com/sainnhe/gruvbox-material", "MIT", "Gruvbox Material medium dark background, foreground, and blue"),
    scheme("gruvbox-material-light", "Gruvbox Material Light", "light", "#fbf1c7", "#654735", "#45707a", "https://github.com/sainnhe/gruvbox-material", "MIT", "Gruvbox Material medium light background, foreground, and blue"),
    scheme("github-dark", "GitHub Dark", "dark", "#0d1117", "#c9d1d9", "#58a6ff", "https://github.com/projekt0n/github-nvim-theme", "MIT", "GitHub Dark canvas, foreground, and accent"),
    scheme("github-light", "GitHub Light", "light", "#ffffff", "#24292f", "#0969da", "https://github.com/projekt0n/github-nvim-theme", "MIT", "GitHub Light canvas, foreground, and accent"),
    scheme("oxocarbon-light", "Oxocarbon Light", "light", "#f2f4f8", "#161616", "#0f62fe", "https://github.com/nyoom-engineering/oxocarbon.nvim", "MPL-2.0", "Oxocarbon light background, foreground, and blue"),
    scheme("sonokai", "Sonokai", "dark", "#2c2e34", "#e2e2e3", "#76cce0", "https://github.com/sainnhe/sonokai", "MIT", "Sonokai default background, foreground, and blue"),
    scheme("edge-dark", "Edge Dark", "dark", "#2c2e34", "#c5cdd9", "#73b3e7", "https://github.com/sainnhe/edge", "MIT", "Edge default dark background, foreground, and blue"),
    scheme("edge-light", "Edge Light", "light", "#fafafa", "#4b505b", "#5079be", "https://github.com/sainnhe/edge", "MIT", "Edge default light background, foreground, and blue"),
    scheme("moonfly", "Moonfly", "dark", "#080808", "#b2b2b2", "#80a0ff", "https://github.com/bluz71/vim-moonfly-colors", "MIT", "Moonfly background, foreground, and blue"),
    scheme("bamboo", "Bamboo", "dark", "#252623", "#f1e9d2", "#5d9b9b", "https://github.com/ribru17/bamboo.nvim", "MIT", "Bamboo vulgaris background, foreground, and aqua"),
    scheme("melange", "Mélange", "dark", "#292522", "#ece1d7", "#a3a9ce", "https://github.com/savq/melange-nvim", "MIT", "Mélange dark background, foreground, and blue"),
    scheme("cyberdream", "Cyberdream", "dark", "#16181a", "#ffffff", "#5ea1ff", "https://github.com/scottmckendry/cyberdream.nvim", "MIT", "Cyberdream dark background, foreground, and blue"),
    scheme("vscode-dark", "VSCode Dark+", "dark", "#1e1e1e", "#d4d4d4", "#569cd6", "https://github.com/Mofiqul/vscode.nvim", "MIT", "VSCode Dark+ editor background, foreground, and blue"),
    scheme("vscode-light", "VSCode Light+", "light", "#ffffff", "#000000", "#0000ff", "https://github.com/Mofiqul/vscode.nvim", "MIT", "VSCode Light+ editor background, foreground, and blue"),
    scheme("solarized-osaka", "Solarized Osaka", "dark", "#001419", "#839496", "#268bd2", "https://github.com/craftzdog/solarized-osaka.nvim", "MIT", "Solarized Osaka background, foreground, and blue"),
    scheme("nordic", "Nordic", "dark", "#242933", "#d8dee9", "#88c0d0", "https://github.com/AlexvZyl/nordic.nvim", "MIT", "Nordic dark background, foreground, and cyan"),
    scheme("tokyodark", "Tokyo Dark", "dark", "#11121d", "#a0a8cd", "#7199ee", "https://github.com/tiagovla/tokyodark.nvim", "MIT", "Tokyo Dark background, foreground, and blue"),
    scheme("material-darker", "Material Darker", "dark", "#212121", "#eeffff", "#82aaff", "https://github.com/marko-cerovac/material.nvim", "MIT", "Material darker background, foreground, and blue"),
    scheme("shades-of-purple", "Shades of Purple", "dark", "#2d2b55", "#ffffff", "#fad000", "https://github.com/Rigellute/shades-of-purple.vim", "MIT", "Shades of Purple background, foreground, and yellow"),
    scheme("onehalf-dark", "One Half Dark", "dark", "#282c34", "#dcdfe4", "#61afef", "https://github.com/sonph/onehalf", "MIT", "One Half Dark background, foreground, and blue"),
    scheme("onehalf-light", "One Half Light", "light", "#fafafa", "#383a42", "#0184bc", "https://github.com/sonph/onehalf", "MIT", "One Half Light background, foreground, and cyan"),
    scheme("base16-default-dark", "Base16 Default Dark", "dark", "#181818", "#d8d8d8", "#7cafc2", "https://github.com/chriskempson/base16-vim", "MIT", "Base16 Default Dark base00, base05, and base0D"),
    scheme("base16-default-light", "Base16 Default Light", "light", "#f8f8f8", "#383838", "#7cafc2", "https://github.com/chriskempson/base16-vim", "MIT", "Base16 Default Light base07, base02, and base0D")
];

function deterministicUuid(slug) {
    const bytes = crypto
        .createHash("sha256")
        .update("birc-utils-colorscheme:" + slug)
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

function exportedJson(colorscheme) {
    const lines = [
        "{",
        "  \"accent\" : " + JSON.stringify(colorscheme.accent) + ",",
        "  \"appearance\" : " + JSON.stringify(colorscheme.appearance) + ",",
        "  \"background\" : " + JSON.stringify(colorscheme.background) + ",",
        "  \"customCSS\" : \"\",",
        "  \"id\" : " + JSON.stringify(deterministicUuid(colorscheme.slug)) + ",",
        "  \"isBuiltIn\" : false,",
        "  \"name\" : " + JSON.stringify(colorscheme.name) + ",",
        "  \"text\" : " + JSON.stringify(colorscheme.text),
        "}"
    ];

    return lines.join("\n") + "\n";
}

function escapeXml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function previewSvg(colorscheme) {
    const safeName = escapeXml(colorscheme.name);

    return [
        "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"640\" height=\"260\" viewBox=\"0 0 640 260\" role=\"img\" aria-labelledby=\"title description\">",
        "  <title id=\"title\">" + safeName + " bIRC colorscheme preview</title>",
        "  <description id=\"description\">Example chat window using the adapted background, text, and accent colors.</description>",
        "  <rect width=\"640\" height=\"260\" rx=\"12\" fill=\"" + colorscheme.background + "\"/>",
        "  <rect width=\"640\" height=\"38\" rx=\"12\" fill=\"" + colorscheme.accent + "\"/>",
        "  <rect y=\"26\" width=\"640\" height=\"12\" fill=\"" + colorscheme.accent + "\"/>",
        "  <circle cx=\"22\" cy=\"19\" r=\"6\" fill=\"" + colorscheme.background + "\" opacity=\"0.72\"/>",
        "  <circle cx=\"42\" cy=\"19\" r=\"6\" fill=\"" + colorscheme.text + "\" opacity=\"0.72\"/>",
        "  <text x=\"320\" y=\"25\" text-anchor=\"middle\" font-family=\"-apple-system, BlinkMacSystemFont, sans-serif\" font-size=\"14\" font-weight=\"700\" fill=\"" + colorscheme.background + "\">" + safeName + "</text>",
        "  <g font-family=\"ui-monospace, SFMono-Regular, Menlo, Consolas, monospace\" font-size=\"15\">",
        "    <text x=\"22\" y=\"72\" fill=\"" + colorscheme.accent + "\" font-weight=\"700\">#developers</text>",
        "    <text x=\"22\" y=\"105\" fill=\"" + colorscheme.accent + "\">12:41  &lt;Ada&gt;</text>",
        "    <text x=\"164\" y=\"105\" fill=\"" + colorscheme.text + "\">The new build is ready to test.</text>",
        "    <text x=\"22\" y=\"137\" fill=\"" + colorscheme.accent + "\">12:42  &lt;Lin&gt;</text>",
        "    <text x=\"164\" y=\"137\" fill=\"" + colorscheme.text + "\">Looks good — shipping it now.</text>",
        "    <text x=\"22\" y=\"169\" fill=\"" + colorscheme.accent + "\">12:43  *</text>",
        "    <text x=\"111\" y=\"169\" fill=\"" + colorscheme.text + "\">Ada tags @Lin in the release note.</text>",
        "  </g>",
        "  <rect x=\"22\" y=\"202\" width=\"596\" height=\"36\" rx=\"6\" fill=\"" + colorscheme.text + "\" opacity=\"0.09\"/>",
        "  <text x=\"36\" y=\"225\" font-family=\"ui-monospace, SFMono-Regular, Menlo, Consolas, monospace\" font-size=\"14\" fill=\"" + colorscheme.text + "\">Message #developers</text>",
        "  <rect x=\"496\" y=\"202\" width=\"122\" height=\"36\" rx=\"6\" fill=\"" + colorscheme.accent + "\"/>",
        "  <text x=\"557\" y=\"225\" text-anchor=\"middle\" font-family=\"-apple-system, BlinkMacSystemFont, sans-serif\" font-size=\"13\" font-weight=\"700\" fill=\"" + colorscheme.background + "\">Send</text>",
        "</svg>",
        ""
    ].join("\n");
}

function schemeReadme(colorscheme) {
    return [
        "# " + colorscheme.name,
        "",
        "A bIRC colorscheme adapted from [" + colorscheme.name + "](" +
            colorscheme.canonicalUrl + ").",
        "",
        "![Approximate bIRC preview of " + colorscheme.name + "](preview.svg)",
        "",
        "The preview is illustrative: actual typography, spacing, and interface",
        "chrome are controlled by bIRC. The three colors match the JSON exactly.",
        "",
        "## Mapping",
        "",
        "- Appearance: `" + colorscheme.appearance + "`",
        "- Background: `" + colorscheme.background + "`",
        "- Text: `" + colorscheme.text + "`",
        "- Accent: `" + colorscheme.accent + "`",
        "- Palette basis: " + colorscheme.paletteBasis + ".",
        "",
        "The original editor theme has many syntax and interface colors. bIRC's",
        "export format has one background, one text color, and one accent, so this",
        "adaptation preserves the upstream Normal/editor canvas and chooses a",
        "representative upstream highlight color for the accent.",
        "",
        "## Upstream",
        "",
        "- Canonical Vim/Neovim source: [" + colorscheme.canonicalUrl + "](" +
            colorscheme.canonicalUrl + ")",
        "- Upstream license: `" + colorscheme.license + "`",
        "",
        "The upstream project remains the authority for its name, palette, license,",
        "variants, and current maintenance status. This directory contains only a",
        "small interoperable palette adaptation, not upstream Vim or Neovim code.",
        ""
    ].join("\n");
}

function catalogReadme() {
    const lines = [
        "# bIRC Vim colorscheme adaptations",
        "",
        "This catalog adapts popular and historically notable Vim and Neovim color",
        "schemes to bIRC's exported JSON format. Each subdirectory contains one JSON",
        "file and a README linking to the canonical upstream theme whenever possible.",
        "",
        "The catalog covers classic Vim.org leaders, themes identified by Vim's own",
        "colorscheme project as historically prominent, and broadly installed modern",
        "Neovim themes. Popularity changes over time, so this is intentionally broad",
        "but cannot be mathematically exhaustive.",
        "",
        "Selection evidence:",
        "",
        "- [Vim's colorscheme project](https://github.com/vim/colorschemes) identifies",
        "  Monokai, Solarized, Gruvbox, Jellybeans, and Mustang-era themes as",
        "  historically prominent.",
        "- [Vim.org's rated colorscheme catalog](https://www.vim.org/scripts/script_search_results.php?order_by=rating&script_type=color+scheme&show_me=1000)",
        "  supplies long-running download and rating evidence.",
        "- [Dotfyle's current installation ranking](https://dotfyle.com/neovim/colorscheme/top)",
        "  supplies modern Neovim usage evidence.",
        "",
        "## Import files",
        "",
        "The previews approximate a small bIRC conversation using each JSON palette.",
        "Actual typography and interface layout remain controlled by bIRC.",
        ""
    ];

    for (let schemeIndex = 0; schemeIndex < schemes.length; schemeIndex += 2) {
        const left = schemes[schemeIndex];
        const right = schemes[schemeIndex + 1];

        lines.push("<table><tr>");
        lines.push("<td width=\"50%\" valign=\"top\">");
        lines.push("<a href=\"" + left.slug + "/README.md\"><strong>" + left.name + "</strong></a><br>");
        lines.push("<a href=\"" + left.slug + "/" + left.slug + ".json\">JSON</a><br>");
        lines.push("<img src=\"" + left.slug + "/preview.svg\" alt=\"" + left.name + " preview\" width=\"360\">");
        lines.push("</td>");

        if (right !== undefined) {
            lines.push("<td width=\"50%\" valign=\"top\">");
            lines.push("<a href=\"" + right.slug + "/README.md\"><strong>" + right.name + "</strong></a><br>");
            lines.push("<a href=\"" + right.slug + "/" + right.slug + ".json\">JSON</a><br>");
            lines.push("<img src=\"" + right.slug + "/preview.svg\" alt=\"" + right.name + " preview\" width=\"360\">");
            lines.push("</td>");
        }

        lines.push("</tr></table>");
    }

    lines.push(
        "",
        "## Adaptation policy",
        "",
        "- `background` follows the upstream editor or Normal background.",
        "- `text` follows the upstream primary foreground.",
        "- `accent` uses a representative upstream blue, purple, yellow, or other",
        "  principal highlight rather than inventing a new color.",
        "- `appearance` follows the upstream variant.",
        "- `customCSS` is empty because these are palette-only adaptations.",
        "- IDs are deterministic UUIDs derived from the catalog slug, so regeneration",
        "  does not silently create new identities.",
        "",
        "## Duplicate policy",
        "",
        "Schemes are duplicates when all four imported visual values—appearance,",
        "background, text, and accent—are identical. Only the higher-ranked source is",
        "retained:",
        "",
        "- `onedarkpro` collapsed to the same export as `onedark`; OneDark is retained",
        "  because its family ranks above OneDarkPro in the cited Dotfyle catalog.",
        "- dark `oxocarbon` collapsed to the same export as `carbonfox`; Carbonfox is",
        "  retained because its Nightfox family ranks above Oxocarbon there.",
        "- Oxocarbon Light remains because it has a distinct exported palette.",
        "",
        "The automated tests reject any future duplicate visual tuple.",
        "",
        "Run `node colorschemes/scripts/generate-catalog.js` from the repository root",
        "after changing the reviewed catalog data.",
        ""
    );

    return lines.join("\n");
}

for (const colorscheme of schemes) {
    const outputDirectory = path.join(catalogDirectory, colorscheme.slug);

    fs.mkdirSync(outputDirectory, {
        recursive: true
    });
    fs.writeFileSync(
        path.join(outputDirectory, colorscheme.slug + ".json"),
        exportedJson(colorscheme)
    );
    fs.writeFileSync(
        path.join(outputDirectory, "README.md"),
        schemeReadme(colorscheme)
    );
    fs.writeFileSync(
        path.join(outputDirectory, "preview.svg"),
        previewSvg(colorscheme)
    );
}

fs.writeFileSync(path.join(catalogDirectory, "README.md"), catalogReadme());

console.log("Generated " + schemes.length + " bIRC colorscheme adaptations.");
