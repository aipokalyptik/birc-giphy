"use strict";

/*
 * Reviewed semantic palettes transcribed from the canonical upstream sources.
 *
 * Each palette is deliberately richer than bIRC's three native color fields.
 * The generator maps these editor/terminal roles onto transcript semantics.
 * Values are source data, not derived from the previous generated JSON files.
 */

function palette(
    background,
    text,
    surface,
    muted,
    red,
    green,
    yellow,
    blue,
    magenta,
    cyan,
    selection
) {
    return {
        background,
        text,
        surface,
        muted,
        red,
        green,
        yellow,
        blue,
        magenta,
        cyan,
        selection
    };
}

function theme(
    slug,
    name,
    appearance,
    upstream,
    license,
    evidence,
    colors,
    accentRole
) {
    return {
        slug,
        name,
        appearance,
        upstream,
        license,
        evidence,
        colors,
        accentRole: accentRole || "blue"
    };
}

const solarized = "https://github.com/altercation/vim-colors-solarized";
const gruvbox = "https://github.com/morhetz/gruvbox";
const vimColors = "https://github.com/vim/colorschemes";
const catppuccin = "https://github.com/catppuccin/nvim";
const tokyoNight = "https://github.com/folke/tokyonight.nvim";
const kanagawa = "https://github.com/rebelot/kanagawa.nvim";
const rosePine = "https://github.com/rose-pine/neovim";
const nightfox = "https://github.com/EdenEast/nightfox.nvim";

const themes = [
    theme("solarized-dark", "Solarized Dark", "dark", solarized, "MIT", "colors/solarized.vim; dark palette", palette("#002b36", "#839496", "#073642", "#586e75", "#dc322f", "#859900", "#b58900", "#268bd2", "#d33682", "#2aa198", "#073642")),
    theme("solarized-light", "Solarized Light", "light", solarized, "MIT", "colors/solarized.vim; light palette", palette("#fdf6e3", "#657b83", "#eee8d5", "#93a1a1", "#dc322f", "#859900", "#b58900", "#268bd2", "#d33682", "#2aa198", "#eee8d5")),
    theme("gruvbox-dark", "Gruvbox Dark", "dark", gruvbox, "MIT", "colors/gruvbox.vim; background=dark", palette("#282828", "#ebdbb2", "#3c3836", "#928374", "#fb4934", "#b8bb26", "#fabd2f", "#83a598", "#d3869b", "#8ec07c", "#665c54"), "yellow"),
    theme("gruvbox-light", "Gruvbox Light", "light", gruvbox, "MIT", "colors/gruvbox.vim; background=light", palette("#fbf1c7", "#3c3836", "#ebdbb2", "#928374", "#9d0006", "#79740e", "#b57614", "#076678", "#8f3f71", "#427b58", "#bdae93"), "yellow"),
    theme("molokai", "Molokai", "dark", "https://github.com/tomasr/molokai", "MIT", "colors/molokai.vim highlight groups", palette("#1b1d1e", "#f8f8f2", "#232526", "#7e8e91", "#f92672", "#a6e22e", "#e6db74", "#66d9ef", "#ae81ff", "#66d9ef", "#403d3d")),
    theme("zenburn", "Zenburn", "dark", "https://github.com/jnurmine/Zenburn", "GPL-2.0", "colors/zenburn.vim palette", palette("#3f3f3f", "#dcdccc", "#4f4f4f", "#7f9f7f", "#cc9393", "#7f9f7f", "#f0dfaf", "#8cd0d3", "#dc8cc3", "#93e0e3", "#2f2f2f")),
    theme("jellybeans", "Jellybeans", "dark", "https://github.com/nanotech/jellybeans.vim", "MIT", "colors/jellybeans.vim highlight groups", palette("#151515", "#e8e8d3", "#302028", "#888888", "#cf6a4c", "#99ad6a", "#fad07a", "#8197bf", "#c6b6ee", "#8fbfdc", "#404040")),
    theme("vividchalk", "Vividchalk", "dark", "https://github.com/tpope/vim-vividchalk", "Vim License", "colors/vividchalk.vim highlight groups", palette("#000000", "#eeeeee", "#1c1c1c", "#9933cc", "#ff0000", "#66ff00", "#ffcc00", "#6699cc", "#ff00ff", "#00ffff", "#555577"), "yellow"),
    theme("papercolor-dark", "PaperColor Dark", "dark", "https://github.com/NLKNguyen/papercolor-theme", "MIT", "colors/PaperColor.vim; background=dark", palette("#1c1c1c", "#d0d0d0", "#303030", "#808080", "#d75f5f", "#afd700", "#d7af5f", "#5fafd7", "#d787af", "#00afaf", "#8787af")),
    theme("papercolor-light", "PaperColor Light", "light", "https://github.com/NLKNguyen/papercolor-theme", "MIT", "colors/PaperColor.vim; background=light", palette("#eeeeee", "#444444", "#e4e4e4", "#878787", "#d70000", "#5f8700", "#d70087", "#0087af", "#d70087", "#005f87", "#ffff5f")),
    theme("onedark", "OneDark", "dark", "https://github.com/joshdick/onedark.vim", "MIT", "colors/onedark.vim and term/One Dark.itermcolors", palette("#282c34", "#abb2bf", "#2c323c", "#5c6370", "#e06c75", "#98c379", "#e5c07b", "#61afef", "#c678dd", "#56b6c2", "#3e4452")),
    theme("one-light", "One Light", "light", "https://github.com/rakr/vim-one", "MIT", "colors/one.vim; background=light", palette("#fafafa", "#494b53", "#f0f0f0", "#a0a1a7", "#e45649", "#50a14f", "#c18401", "#4078f2", "#a626a4", "#0184bc", "#d0d0d0")),
    theme("nord", "Nord", "dark", "https://github.com/arcticicestudio/nord-vim", "MIT", "colors/nord.vim highlight groups", palette("#2e3440", "#d8dee9", "#3b4252", "#616e88", "#bf616a", "#a3be8c", "#ebcb8b", "#81a1c1", "#b48ead", "#88c0d0", "#434c5e")),
    theme("dracula", "Dracula", "dark", "https://github.com/dracula/vim", "MIT", "colors/dracula.vim highlight groups", palette("#282a36", "#f8f8f2", "#424450", "#6272a4", "#ff5555", "#50fa7b", "#f1fa8c", "#8be9fd", "#ff79c6", "#8be9fd", "#44475a"), "magenta"),
    theme("monokai", "Monokai", "dark", "https://github.com/crusoexia/vim-monokai", "MIT", "colors/monokai.vim palette", palette("#272822", "#f8f8f2", "#3e3d32", "#75715e", "#f92672", "#a6e22e", "#e6db74", "#66d9ef", "#ae81ff", "#66d9ef", "#49483e")),
    theme("ayu-dark", "Ayu Dark", "dark", "https://github.com/ayu-theme/ayu-vim", "MIT", "term/ayu-dark.itermcolors", palette("#0d1013", "#e0dac4", "#1c2631", "#555555", "#fc6028", "#aac441", "#fda543", "#2d91d0", "#bb00bb", "#86e2bf", "#1c2631")),
    theme("ayu-mirage", "Ayu Mirage", "dark", "https://github.com/ayu-theme/ayu-vim", "MIT", "term/ayu-mirage.itermcolors", palette("#191d26", "#d0cec3", "#252d37", "#555555", "#ea5965", "#ade46b", "#fec254", "#2d91d0", "#c9aeff", "#86e2bf", "#252d37")),
    theme("ayu-light", "Ayu Light", "light", "https://github.com/ayu-theme/ayu-vim", "MIT", "term/ayu-light.itermcolors", palette("#f9f9f9", "#4a5460", "#eceade", "#8a9199", "#ec420e", "#67c605", "#ed8515", "#3694d0", "#864cc0", "#41b487", "#eceade")),
    theme("oceanic-next", "Oceanic Next", "dark", "https://github.com/mhartington/oceanic-next", "MIT", "colors/OceanicNext.vim highlight groups", palette("#1b2b34", "#d8dee9", "#343d46", "#65737e", "#ec5f67", "#99c794", "#fac863", "#6699cc", "#c594c5", "#62b3b2", "#4f5b66")),
    theme("hybrid", "Hybrid", "dark", "https://github.com/w0ng/vim-hybrid", "MIT", "colors/hybrid.vim highlight groups", palette("#1d1f21", "#c5c8c6", "#282a2e", "#707880", "#cc6666", "#b5bd68", "#f0c674", "#81a2be", "#b294bb", "#8abeb7", "#373b41")),
    theme("iceberg", "Iceberg", "dark", "https://github.com/cocopon/iceberg.vim", "MIT", "colors/iceberg.vim GUI palette", palette("#161821", "#c6c8d1", "#1e2132", "#6b7089", "#e27878", "#b4be82", "#e2a478", "#84a0c6", "#a093c7", "#89b8c2", "#272c42")),
    theme("palenight", "Palenight", "dark", "https://github.com/drewtempelmeyer/palenight.vim", "MIT", "colors/palenight.vim highlight groups", palette("#292d3e", "#bfc7d5", "#2c323c", "#697098", "#ff5370", "#c3e88d", "#ffcb6b", "#82b1ff", "#c792ea", "#89ddff", "#3e4452")),
    theme("tender", "Tender", "dark", "https://github.com/jacoborus/tender.vim", "MIT", "colors/tender.vim highlight groups", palette("#282828", "#eeeeee", "#383838", "#666666", "#f43753", "#c9d05c", "#d3b987", "#73cef4", "#d3b987", "#b3deef", "#293b44")),
    theme("gotham", "Gotham", "dark", "https://github.com/whatyouhide/vim-gotham", "MIT", "colors/gotham.vim highlight groups", palette("#0c1014", "#99d1ce", "#11151c", "#195466", "#c23127", "#2aa889", "#edb443", "#33859e", "#888ca6", "#2aa889", "#0a3749")),
    theme("seoul256", "Seoul256", "dark", "https://github.com/junegunn/seoul256.vim", "MIT", "iterm2/seoul256.itermcolors", palette("#3a3a3a", "#d0d0d0", "#4e4e4e", "#626262", "#d68787", "#5f865f", "#d8af5f", "#85add4", "#d7afaf", "#87afaf", "#005f5f")),
    theme("wombat", "Wombat", "dark", vimColors, "Vim License", "legacy Wombat palette represented by Vim colorscheme collection", palette("#242424", "#f6f3e8", "#444444", "#99968b", "#e5786d", "#95e454", "#cae682", "#8ac6f2", "#f2c68a", "#8ac6f2", "#554d4b")),
    theme("desert", "Desert", "dark", vimColors, "Vim License", "colors/desert.vim highlight groups", palette("#333333", "#ffffff", "#4d4d4d", "#6dceeb", "#ff0000", "#89fb98", "#f0e68c", "#75a0ff", "#ffde9b", "#6dceeb", "#6b8e24")),
    theme("elflord", "Elflord", "dark", vimColors, "Vim License", "colors/elflord.vim highlight groups", palette("#000000", "#00ffff", "#303030", "#80a0ff", "#ff0000", "#60ff60", "#ffff00", "#80a0ff", "#ff00ff", "#40ffff", "#303030")),
    theme("morning", "Morning", "light", vimColors, "Vim License", "colors/morning.vim highlight groups", palette("#e4e4e4", "#000000", "#d0d0d0", "#0000ff", "#ff0000", "#2e8b57", "#a52a2a", "#0000ff", "#6a0dad", "#008787", "#d0d0d0")),

    theme("catppuccin-mocha", "Catppuccin Mocha", "dark", catppuccin, "MIT", "lua/catppuccin/palettes/mocha.lua", palette("#1e1e2e", "#cdd6f4", "#313244", "#6c7086", "#f38ba8", "#a6e3a1", "#f9e2af", "#89b4fa", "#cba6f7", "#94e2d5", "#45475a"), "magenta"),
    theme("catppuccin-macchiato", "Catppuccin Macchiato", "dark", catppuccin, "MIT", "lua/catppuccin/palettes/macchiato.lua", palette("#24273a", "#cad3f5", "#363a4f", "#6e738d", "#ed8796", "#a6da95", "#eed49f", "#8aadf4", "#c6a0f6", "#8bd5ca", "#494d64"), "magenta"),
    theme("catppuccin-frappe", "Catppuccin Frappé", "dark", catppuccin, "MIT", "lua/catppuccin/palettes/frappe.lua", palette("#303446", "#c6d0f5", "#414559", "#737994", "#e78284", "#a6d189", "#e5c890", "#8caaee", "#ca9ee6", "#81c8be", "#51576d"), "magenta"),
    theme("catppuccin-latte", "Catppuccin Latte", "light", catppuccin, "MIT", "lua/catppuccin/palettes/latte.lua", palette("#eff1f5", "#4c4f69", "#e6e9ef", "#8c8fa1", "#d20f39", "#40a02b", "#df8e1d", "#1e66f5", "#8839ef", "#179299", "#ccd0da"), "magenta"),

    theme("tokyonight-night", "Tokyo Night", "dark", tokyoNight, "Apache-2.0", "lua/tokyonight/theme.lua and extras/iterm/tokyonight_night.itermcolors", palette("#1a1b26", "#c0caf5", "#15161e", "#565f89", "#f7768e", "#9ece6a", "#e0af68", "#7aa2f7", "#bb9af7", "#7dcfff", "#283457")),
    theme("tokyonight-storm", "Tokyo Night Storm", "dark", tokyoNight, "Apache-2.0", "lua/tokyonight/theme.lua and extras/iterm/tokyonight_storm.itermcolors", palette("#24283b", "#c0caf5", "#1d202f", "#565f89", "#f7768e", "#9ece6a", "#e0af68", "#7aa2f7", "#bb9af7", "#7dcfff", "#2e3c64")),
    theme("tokyonight-moon", "Tokyo Night Moon", "dark", tokyoNight, "Apache-2.0", "lua/tokyonight/theme.lua and extras/iterm/tokyonight_moon.itermcolors", palette("#222436", "#c8d3f5", "#1b1d2b", "#636da6", "#ff757f", "#c3e88d", "#ffc777", "#82aaff", "#c099ff", "#86e1fc", "#2d3f76")),
    theme("tokyonight-day", "Tokyo Night Day", "light", tokyoNight, "Apache-2.0", "lua/tokyonight/theme.lua and extras/iterm/tokyonight_day.itermcolors", palette("#e1e2e7", "#3760bf", "#d0d5e3", "#848cb5", "#f52a65", "#587539", "#8c6c3e", "#2e7de9", "#9854f1", "#007197", "#b7c1e3")),

    theme("kanagawa-wave", "Kanagawa Wave", "dark", kanagawa, "MIT", "lua/kanagawa/colors.lua and extras/iterm/kanagawa.itermcolors", palette("#1f1f28", "#dcd7ba", "#090618", "#727169", "#c34043", "#76946a", "#c0a36e", "#7e9cd8", "#957fb8", "#6a9589", "#2d4f67")),
    theme("kanagawa-dragon", "Kanagawa Dragon", "dark", kanagawa, "MIT", "lua/kanagawa/colors.lua and extras/iterm/kanagawa_dragon.itermcolors", palette("#181616", "#c8c093", "#0d0c0c", "#a6a69c", "#c4746e", "#8a9a7b", "#c4b28a", "#8ba4b0", "#a292a3", "#8ea4a2", "#223249")),
    theme("kanagawa-lotus", "Kanagawa Lotus", "light", kanagawa, "MIT", "lua/kanagawa/colors.lua Lotus palette", palette("#f2ecbc", "#545464", "#e7dba0", "#8a8980", "#c84053", "#6f894e", "#77713f", "#4d699b", "#624c83", "#597b75", "#dcd5ac")),

    theme("rose-pine", "Rosé Pine", "dark", rosePine, "MIT", "lua/rose-pine/palette.lua main", palette("#191724", "#e0def4", "#1f1d2e", "#6e6a86", "#eb6f92", "#95b1ac", "#f6c177", "#31748f", "#c4a7e7", "#9ccfd8", "#403d52"), "magenta"),
    theme("rose-pine-moon", "Rosé Pine Moon", "dark", rosePine, "MIT", "lua/rose-pine/palette.lua moon", palette("#232136", "#e0def4", "#2a273f", "#6e6a86", "#eb6f92", "#95b1ac", "#f6c177", "#3e8fb0", "#c4a7e7", "#9ccfd8", "#44415a"), "magenta"),
    theme("rose-pine-dawn", "Rosé Pine Dawn", "light", rosePine, "MIT", "lua/rose-pine/palette.lua dawn", palette("#faf4ed", "#464261", "#fffaf3", "#9893a5", "#b4637a", "#6d8f89", "#ea9d34", "#286983", "#907aa9", "#56949f", "#dfdad9"), "magenta"),

    theme("nightfox", "Nightfox", "dark", nightfox, "MIT", "extra/nightfox/nightfox.itermcolors", palette("#192330", "#cdcecf", "#393b44", "#575860", "#c94f6d", "#81b29a", "#dbc074", "#719cd6", "#9d79d6", "#63cdcf", "#2b3b51")),
    theme("dayfox", "Dayfox", "light", nightfox, "MIT", "extra/dayfox/dayfox.itermcolors", palette("#f6f2ee", "#3d2b5a", "#eee4df", "#534c45", "#a5222f", "#396847", "#ac5402", "#2848a9", "#6e33ce", "#287980", "#e7d2be")),
    theme("dawnfox", "Dawnfox", "light", nightfox, "MIT", "extra/dawnfox/dawnfox.itermcolors", palette("#faf4ed", "#575279", "#f2e9e1", "#9893a5", "#b4637a", "#618774", "#ea9d34", "#286983", "#907aa9", "#56949f", "#d0d8d8")),
    theme("duskfox", "Duskfox", "dark", nightfox, "MIT", "extra/duskfox/duskfox.itermcolors", palette("#232136", "#e0def4", "#393552", "#6e6a86", "#eb6f92", "#a3be8c", "#f6c177", "#569fba", "#c4a7e7", "#9ccfd8", "#433c59")),
    theme("nordfox", "Nordfox", "dark", nightfox, "MIT", "lua/nightfox/palette.lua and extra/nordfox/nordfox.itermcolors", palette("#2e3440", "#cdcecf", "#3b4252", "#60728a", "#bf616a", "#a3be8c", "#ebcb8b", "#81a1c1", "#b48ead", "#88c0d0", "#3e4a5b")),
    theme("terafox", "Terafox", "dark", nightfox, "MIT", "extra/terafox/terafox.itermcolors", palette("#152528", "#e6eaea", "#2f3239", "#4e5157", "#e85c51", "#7aa4a1", "#fda47f", "#5a93aa", "#ad5c7c", "#a1cdd8", "#293e40")),
    theme("carbonfox", "Carbonfox", "dark", nightfox, "MIT", "lua/nightfox/palette.lua and extra/carbonfox/carbonfox.itermcolors", palette("#161616", "#f2f4f8", "#282828", "#525252", "#ee5396", "#25be6a", "#08bdba", "#78a9ff", "#be95ff", "#33b1ff", "#2a2a2a")),

    theme("everforest-dark", "Everforest Dark", "dark", "https://github.com/sainnhe/everforest", "MIT", "colors/everforest.vim; medium dark", palette("#2d353b", "#d3c6aa", "#3d484d", "#859289", "#e67e80", "#a7c080", "#dbbc7f", "#7fbbb3", "#d699b6", "#83c092", "#543a48")),
    theme("everforest-light", "Everforest Light", "light", "https://github.com/sainnhe/everforest", "MIT", "colors/everforest.vim; medium light", palette("#fdf6e3", "#5c6a72", "#efebd4", "#939f91", "#f85552", "#8da101", "#dfa000", "#3a94c5", "#df69ba", "#35a77c", "#eaedc8")),
    theme("gruvbox-material-dark", "Gruvbox Material Dark", "dark", "https://github.com/sainnhe/gruvbox-material", "MIT", "colors/gruvbox-material.vim; medium dark", palette("#282828", "#d4be98", "#32302f", "#928374", "#ea6962", "#a9b665", "#d8a657", "#7daea3", "#d3869b", "#89b482", "#45403d")),
    theme("gruvbox-material-light", "Gruvbox Material Light", "light", "https://github.com/sainnhe/gruvbox-material", "MIT", "colors/gruvbox-material.vim; medium light", palette("#fbf1c7", "#654735", "#f2e5bc", "#928374", "#c14a4a", "#6c782e", "#b47109", "#45707a", "#945e80", "#4c7a5d", "#eee0b7")),
    theme("github-dark", "GitHub Dark", "dark", "https://github.com/projekt0n/github-nvim-theme", "MIT", "lua/github-theme/palette.lua dark defaults", palette("#0d1117", "#c9d1d9", "#161b22", "#8b949e", "#ff7b72", "#7ee787", "#d29922", "#58a6ff", "#d2a8ff", "#a5d6ff", "#264f78")),
    theme("github-light", "GitHub Light", "light", "https://github.com/projekt0n/github-nvim-theme", "MIT", "lua/github-theme/palette.lua light defaults", palette("#ffffff", "#24292f", "#f6f8fa", "#57606a", "#cf222e", "#116329", "#9a6700", "#0969da", "#8250df", "#1b7c83", "#ddf4ff")),
    theme("oxocarbon-light", "Oxocarbon Light", "light", "https://github.com/nyoom-engineering/oxocarbon.nvim", "MPL-2.0", "fnl/oxocarbon/init.fnl light palette and warning highlight", palette("#f2f4f8", "#161616", "#dde1e6", "#525252", "#da1e28", "#42be65", "#da1e28", "#0f62fe", "#8a3ffc", "#1192e8", "#d0e2ff")),
    theme("sonokai", "Sonokai", "dark", "https://github.com/sainnhe/sonokai", "MIT", "colors/sonokai.vim default palette", palette("#2c2e34", "#e2e2e3", "#3b3e48", "#7f8490", "#fc5d7c", "#9ed072", "#e7c664", "#76cce0", "#b39df3", "#f39660", "#414550")),
    theme("edge-dark", "Edge Dark", "dark", "https://github.com/sainnhe/edge", "MIT", "colors/edge.vim default dark", palette("#2c2e34", "#c5cdd9", "#363944", "#758094", "#ec7279", "#a0c980", "#deb974", "#6cb6eb", "#d38aea", "#5dbbc1", "#3b3e48")),
    theme("edge-light", "Edge Light", "light", "https://github.com/sainnhe/edge", "MIT", "colors/edge.vim default light", palette("#fafafa", "#4b505b", "#e8ebf0", "#8790a0", "#d05858", "#608e32", "#be7e05", "#5079be", "#b05ccc", "#3a8b84", "#e8ebf0")),
    theme("moonfly", "Moonfly", "dark", "https://github.com/bluz71/vim-moonfly-colors", "MIT", "colors/moonfly.vim Visual group and extras/moonfly.itermcolors", palette("#080808", "#bdbdbd", "#323437", "#949494", "#ff5d5d", "#8cc85f", "#e3c78a", "#80a0ff", "#cf87e8", "#79dac8", "#323437")),
    theme("bamboo", "Bamboo", "dark", "https://github.com/ribru17/bamboo.nvim", "MIT", "extras/iterm/bamboo.itermcolors", palette("#252623", "#f1e9d2", "#1c1e1b", "#5b5e5a", "#e75a7c", "#8fb573", "#dbb671", "#57a5e5", "#aaaaff", "#70c2be", "#5b5e5a")),
    theme("melange", "Mélange", "dark", "https://github.com/savq/melange-nvim", "MIT", "term/iterm2/melange_dark.itermcolors", palette("#292522", "#ece1d7", "#34302c", "#867462", "#bd8183", "#78997a", "#e49b5d", "#7f91b2", "#b380b0", "#7b9695", "#403a36")),
    theme("cyberdream", "Cyberdream", "dark", "https://github.com/scottmckendry/cyberdream.nvim", "MIT", "extras/iterm2/cyberdream.itermcolors", palette("#16181a", "#ffffff", "#26292b", "#7b8496", "#ff6e5e", "#5eff6c", "#f1ff5e", "#5ea1ff", "#bd5eff", "#5ef1ff", "#3c4048")),
    theme("vscode-dark", "VSCode Dark+", "dark", "https://github.com/Mofiqul/vscode.nvim", "MIT", "lua/vscode/colors.lua dark defaults", palette("#1e1e1e", "#d4d4d4", "#252526", "#808080", "#f44747", "#6a9955", "#dcdcaa", "#569cd6", "#c586c0", "#4ec9b0", "#264f78")),
    theme("vscode-light", "VSCode Light+", "light", "https://github.com/Mofiqul/vscode.nvim", "MIT", "lua/vscode/colors.lua light defaults", palette("#ffffff", "#000000", "#f3f3f3", "#008000", "#cd3131", "#008000", "#795e26", "#0000ff", "#af00db", "#267f99", "#add6ff")),
    theme("solarized-osaka", "Solarized Osaka", "dark", "https://github.com/craftzdog/solarized-osaka.nvim", "MIT", "lua/solarized-osaka/colors.lua dark palette", palette("#001419", "#839496", "#002b36", "#586e75", "#dc322f", "#859900", "#b58900", "#268bd2", "#d33682", "#2aa198", "#073642")),
    theme("nordic", "Nordic", "dark", "https://github.com/AlexvZyl/nordic.nvim", "MIT", "assets/palette.toml and platforms/iTerm2/nordic.itermcolors", palette("#242933", "#c0c8d8", "#191d24", "#4c566a", "#bf616a", "#a3be8c", "#ebcb8b", "#5e81ac", "#b48ead", "#8fbcbb", "#3b4252")),
    theme("tokyodark", "Tokyo Dark", "dark", "https://github.com/tiagovla/tokyodark.nvim", "MIT", "lua/tokyodark/palette.lua and extra/iTerm2/tokyodark.itermcolors", palette("#11121d", "#a0a8cd", "#06080a", "#4a5057", "#ee6d85", "#95c561", "#d7a65f", "#7199ee", "#a485dd", "#38a89d", "#25283b")),
    theme("material-darker", "Material Darker", "dark", "https://github.com/marko-cerovac/material.nvim", "MIT", "lua/material/colors.lua darker palette", palette("#212121", "#eeffff", "#292929", "#545454", "#f07178", "#c3e88d", "#ffcb6b", "#82aaff", "#c792ea", "#89ddff", "#404040")),
    theme("shades-of-purple", "Shades of Purple", "dark", "https://github.com/Rigellute/shades-of-purple.vim", "MIT", "colors/shades_of_purple.vim highlight groups", palette("#2d2b55", "#e1efff", "#3b376e", "#b362ff", "#ec3a37", "#a5ff90", "#fad000", "#9effff", "#b362ff", "#80ffbb", "#7d44b2"), "yellow"),
    theme("onehalf-dark", "One Half Dark", "dark", "https://github.com/sonph/onehalf", "MIT", "iterm/OneHalfDark.itermcolors", palette("#282c34", "#dcdfe4", "#21252b", "#5c6370", "#e06c75", "#98c379", "#e5c07b", "#61afef", "#c678dd", "#56b6c2", "#474e5d")),
    theme("onehalf-light", "One Half Light", "light", "https://github.com/sonph/onehalf", "MIT", "iterm/OneHalfLight.itermcolors", palette("#fafafa", "#383a42", "#f0f0f0", "#a0a1a7", "#e45649", "#50a14f", "#c18401", "#0184bc", "#a626a4", "#0997b3", "#bfceff")),
    theme("base16-default-dark", "Base16 Default Dark", "dark", "https://github.com/chriskempson/base16-vim", "MIT", "colors/base16-default-dark.vim", palette("#181818", "#d8d8d8", "#282828", "#585858", "#ab4642", "#a1b56c", "#f7ca88", "#7cafc2", "#ba8baf", "#86c1b9", "#383838")),
    theme("base16-default-light", "Base16 Default Light", "light", "https://github.com/chriskempson/base16-vim", "MIT", "colors/base16-default-light.vim WarningMsg and semantic groups", palette("#f8f8f8", "#383838", "#e8e8e8", "#a0a0a0", "#ab4642", "#5f7d2d", "#ab4642", "#397e96", "#8f5b89", "#397f78", "#d8d8d8"))
];

module.exports = {
    themes
};
