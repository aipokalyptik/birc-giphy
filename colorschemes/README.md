# bIRC Vim colorscheme adaptations

This catalog rebuilds popular and historically notable Vim and Neovim
palettes as transcript-aware bIRC color schemes. Every import remains in
bIRC's JSON interchange format, with a generated `customCSS` layer that
uses substantially more of the original palette than the native
background/text/accent fields alone can represent.

The source of truth is [`sources/catalog.js`](sources/catalog.js). Its
reviewed values come from canonical upstream palette files, Vim highlight
groups, or upstream terminal exports. The JSON, README, and SVG files in
each theme directory are regenerated together and are never edited as
independent artifacts.

## Import files

Each preview shows ordinary text, history, a mention, an action, join and
part events, a notice, an error, a reply, a card, and reactions.

<table><tr>
<td width="50%" valign="top">
<a href="solarized-dark/README.md"><strong>Solarized Dark</strong></a><br>
<a href="solarized-dark/solarized-dark.json">JSON</a><br>
<img src="solarized-dark/preview.svg" alt="Solarized Dark semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="solarized-light/README.md"><strong>Solarized Light</strong></a><br>
<a href="solarized-light/solarized-light.json">JSON</a><br>
<img src="solarized-light/preview.svg" alt="Solarized Light semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="gruvbox-dark/README.md"><strong>Gruvbox Dark</strong></a><br>
<a href="gruvbox-dark/gruvbox-dark.json">JSON</a><br>
<img src="gruvbox-dark/preview.svg" alt="Gruvbox Dark semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="gruvbox-light/README.md"><strong>Gruvbox Light</strong></a><br>
<a href="gruvbox-light/gruvbox-light.json">JSON</a><br>
<img src="gruvbox-light/preview.svg" alt="Gruvbox Light semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="molokai/README.md"><strong>Molokai</strong></a><br>
<a href="molokai/molokai.json">JSON</a><br>
<img src="molokai/preview.svg" alt="Molokai semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="zenburn/README.md"><strong>Zenburn</strong></a><br>
<a href="zenburn/zenburn.json">JSON</a><br>
<img src="zenburn/preview.svg" alt="Zenburn semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="jellybeans/README.md"><strong>Jellybeans</strong></a><br>
<a href="jellybeans/jellybeans.json">JSON</a><br>
<img src="jellybeans/preview.svg" alt="Jellybeans semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="vividchalk/README.md"><strong>Vividchalk</strong></a><br>
<a href="vividchalk/vividchalk.json">JSON</a><br>
<img src="vividchalk/preview.svg" alt="Vividchalk semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="papercolor-dark/README.md"><strong>PaperColor Dark</strong></a><br>
<a href="papercolor-dark/papercolor-dark.json">JSON</a><br>
<img src="papercolor-dark/preview.svg" alt="PaperColor Dark semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="papercolor-light/README.md"><strong>PaperColor Light</strong></a><br>
<a href="papercolor-light/papercolor-light.json">JSON</a><br>
<img src="papercolor-light/preview.svg" alt="PaperColor Light semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="onedark/README.md"><strong>OneDark</strong></a><br>
<a href="onedark/onedark.json">JSON</a><br>
<img src="onedark/preview.svg" alt="OneDark semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="one-light/README.md"><strong>One Light</strong></a><br>
<a href="one-light/one-light.json">JSON</a><br>
<img src="one-light/preview.svg" alt="One Light semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="nord/README.md"><strong>Nord</strong></a><br>
<a href="nord/nord.json">JSON</a><br>
<img src="nord/preview.svg" alt="Nord semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="dracula/README.md"><strong>Dracula</strong></a><br>
<a href="dracula/dracula.json">JSON</a><br>
<img src="dracula/preview.svg" alt="Dracula semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="monokai/README.md"><strong>Monokai</strong></a><br>
<a href="monokai/monokai.json">JSON</a><br>
<img src="monokai/preview.svg" alt="Monokai semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="ayu-dark/README.md"><strong>Ayu Dark</strong></a><br>
<a href="ayu-dark/ayu-dark.json">JSON</a><br>
<img src="ayu-dark/preview.svg" alt="Ayu Dark semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="ayu-mirage/README.md"><strong>Ayu Mirage</strong></a><br>
<a href="ayu-mirage/ayu-mirage.json">JSON</a><br>
<img src="ayu-mirage/preview.svg" alt="Ayu Mirage semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="ayu-light/README.md"><strong>Ayu Light</strong></a><br>
<a href="ayu-light/ayu-light.json">JSON</a><br>
<img src="ayu-light/preview.svg" alt="Ayu Light semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="oceanic-next/README.md"><strong>Oceanic Next</strong></a><br>
<a href="oceanic-next/oceanic-next.json">JSON</a><br>
<img src="oceanic-next/preview.svg" alt="Oceanic Next semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="hybrid/README.md"><strong>Hybrid</strong></a><br>
<a href="hybrid/hybrid.json">JSON</a><br>
<img src="hybrid/preview.svg" alt="Hybrid semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="iceberg/README.md"><strong>Iceberg</strong></a><br>
<a href="iceberg/iceberg.json">JSON</a><br>
<img src="iceberg/preview.svg" alt="Iceberg semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="palenight/README.md"><strong>Palenight</strong></a><br>
<a href="palenight/palenight.json">JSON</a><br>
<img src="palenight/preview.svg" alt="Palenight semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="tender/README.md"><strong>Tender</strong></a><br>
<a href="tender/tender.json">JSON</a><br>
<img src="tender/preview.svg" alt="Tender semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="gotham/README.md"><strong>Gotham</strong></a><br>
<a href="gotham/gotham.json">JSON</a><br>
<img src="gotham/preview.svg" alt="Gotham semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="seoul256/README.md"><strong>Seoul256</strong></a><br>
<a href="seoul256/seoul256.json">JSON</a><br>
<img src="seoul256/preview.svg" alt="Seoul256 semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="wombat/README.md"><strong>Wombat</strong></a><br>
<a href="wombat/wombat.json">JSON</a><br>
<img src="wombat/preview.svg" alt="Wombat semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="desert/README.md"><strong>Desert</strong></a><br>
<a href="desert/desert.json">JSON</a><br>
<img src="desert/preview.svg" alt="Desert semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="elflord/README.md"><strong>Elflord</strong></a><br>
<a href="elflord/elflord.json">JSON</a><br>
<img src="elflord/preview.svg" alt="Elflord semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="morning/README.md"><strong>Morning</strong></a><br>
<a href="morning/morning.json">JSON</a><br>
<img src="morning/preview.svg" alt="Morning semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="catppuccin-mocha/README.md"><strong>Catppuccin Mocha</strong></a><br>
<a href="catppuccin-mocha/catppuccin-mocha.json">JSON</a><br>
<img src="catppuccin-mocha/preview.svg" alt="Catppuccin Mocha semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="catppuccin-macchiato/README.md"><strong>Catppuccin Macchiato</strong></a><br>
<a href="catppuccin-macchiato/catppuccin-macchiato.json">JSON</a><br>
<img src="catppuccin-macchiato/preview.svg" alt="Catppuccin Macchiato semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="catppuccin-frappe/README.md"><strong>Catppuccin Frappé</strong></a><br>
<a href="catppuccin-frappe/catppuccin-frappe.json">JSON</a><br>
<img src="catppuccin-frappe/preview.svg" alt="Catppuccin Frappé semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="catppuccin-latte/README.md"><strong>Catppuccin Latte</strong></a><br>
<a href="catppuccin-latte/catppuccin-latte.json">JSON</a><br>
<img src="catppuccin-latte/preview.svg" alt="Catppuccin Latte semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="tokyonight-night/README.md"><strong>Tokyo Night</strong></a><br>
<a href="tokyonight-night/tokyonight-night.json">JSON</a><br>
<img src="tokyonight-night/preview.svg" alt="Tokyo Night semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="tokyonight-storm/README.md"><strong>Tokyo Night Storm</strong></a><br>
<a href="tokyonight-storm/tokyonight-storm.json">JSON</a><br>
<img src="tokyonight-storm/preview.svg" alt="Tokyo Night Storm semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="tokyonight-moon/README.md"><strong>Tokyo Night Moon</strong></a><br>
<a href="tokyonight-moon/tokyonight-moon.json">JSON</a><br>
<img src="tokyonight-moon/preview.svg" alt="Tokyo Night Moon semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="tokyonight-day/README.md"><strong>Tokyo Night Day</strong></a><br>
<a href="tokyonight-day/tokyonight-day.json">JSON</a><br>
<img src="tokyonight-day/preview.svg" alt="Tokyo Night Day semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="kanagawa-wave/README.md"><strong>Kanagawa Wave</strong></a><br>
<a href="kanagawa-wave/kanagawa-wave.json">JSON</a><br>
<img src="kanagawa-wave/preview.svg" alt="Kanagawa Wave semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="kanagawa-dragon/README.md"><strong>Kanagawa Dragon</strong></a><br>
<a href="kanagawa-dragon/kanagawa-dragon.json">JSON</a><br>
<img src="kanagawa-dragon/preview.svg" alt="Kanagawa Dragon semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="kanagawa-lotus/README.md"><strong>Kanagawa Lotus</strong></a><br>
<a href="kanagawa-lotus/kanagawa-lotus.json">JSON</a><br>
<img src="kanagawa-lotus/preview.svg" alt="Kanagawa Lotus semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="rose-pine/README.md"><strong>Rosé Pine</strong></a><br>
<a href="rose-pine/rose-pine.json">JSON</a><br>
<img src="rose-pine/preview.svg" alt="Rosé Pine semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="rose-pine-moon/README.md"><strong>Rosé Pine Moon</strong></a><br>
<a href="rose-pine-moon/rose-pine-moon.json">JSON</a><br>
<img src="rose-pine-moon/preview.svg" alt="Rosé Pine Moon semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="rose-pine-dawn/README.md"><strong>Rosé Pine Dawn</strong></a><br>
<a href="rose-pine-dawn/rose-pine-dawn.json">JSON</a><br>
<img src="rose-pine-dawn/preview.svg" alt="Rosé Pine Dawn semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="nightfox/README.md"><strong>Nightfox</strong></a><br>
<a href="nightfox/nightfox.json">JSON</a><br>
<img src="nightfox/preview.svg" alt="Nightfox semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="dayfox/README.md"><strong>Dayfox</strong></a><br>
<a href="dayfox/dayfox.json">JSON</a><br>
<img src="dayfox/preview.svg" alt="Dayfox semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="dawnfox/README.md"><strong>Dawnfox</strong></a><br>
<a href="dawnfox/dawnfox.json">JSON</a><br>
<img src="dawnfox/preview.svg" alt="Dawnfox semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="duskfox/README.md"><strong>Duskfox</strong></a><br>
<a href="duskfox/duskfox.json">JSON</a><br>
<img src="duskfox/preview.svg" alt="Duskfox semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="nordfox/README.md"><strong>Nordfox</strong></a><br>
<a href="nordfox/nordfox.json">JSON</a><br>
<img src="nordfox/preview.svg" alt="Nordfox semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="terafox/README.md"><strong>Terafox</strong></a><br>
<a href="terafox/terafox.json">JSON</a><br>
<img src="terafox/preview.svg" alt="Terafox semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="carbonfox/README.md"><strong>Carbonfox</strong></a><br>
<a href="carbonfox/carbonfox.json">JSON</a><br>
<img src="carbonfox/preview.svg" alt="Carbonfox semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="everforest-dark/README.md"><strong>Everforest Dark</strong></a><br>
<a href="everforest-dark/everforest-dark.json">JSON</a><br>
<img src="everforest-dark/preview.svg" alt="Everforest Dark semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="everforest-light/README.md"><strong>Everforest Light</strong></a><br>
<a href="everforest-light/everforest-light.json">JSON</a><br>
<img src="everforest-light/preview.svg" alt="Everforest Light semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="gruvbox-material-dark/README.md"><strong>Gruvbox Material Dark</strong></a><br>
<a href="gruvbox-material-dark/gruvbox-material-dark.json">JSON</a><br>
<img src="gruvbox-material-dark/preview.svg" alt="Gruvbox Material Dark semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="gruvbox-material-light/README.md"><strong>Gruvbox Material Light</strong></a><br>
<a href="gruvbox-material-light/gruvbox-material-light.json">JSON</a><br>
<img src="gruvbox-material-light/preview.svg" alt="Gruvbox Material Light semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="github-dark/README.md"><strong>GitHub Dark</strong></a><br>
<a href="github-dark/github-dark.json">JSON</a><br>
<img src="github-dark/preview.svg" alt="GitHub Dark semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="github-light/README.md"><strong>GitHub Light</strong></a><br>
<a href="github-light/github-light.json">JSON</a><br>
<img src="github-light/preview.svg" alt="GitHub Light semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="oxocarbon-light/README.md"><strong>Oxocarbon Light</strong></a><br>
<a href="oxocarbon-light/oxocarbon-light.json">JSON</a><br>
<img src="oxocarbon-light/preview.svg" alt="Oxocarbon Light semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="sonokai/README.md"><strong>Sonokai</strong></a><br>
<a href="sonokai/sonokai.json">JSON</a><br>
<img src="sonokai/preview.svg" alt="Sonokai semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="edge-dark/README.md"><strong>Edge Dark</strong></a><br>
<a href="edge-dark/edge-dark.json">JSON</a><br>
<img src="edge-dark/preview.svg" alt="Edge Dark semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="edge-light/README.md"><strong>Edge Light</strong></a><br>
<a href="edge-light/edge-light.json">JSON</a><br>
<img src="edge-light/preview.svg" alt="Edge Light semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="moonfly/README.md"><strong>Moonfly</strong></a><br>
<a href="moonfly/moonfly.json">JSON</a><br>
<img src="moonfly/preview.svg" alt="Moonfly semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="bamboo/README.md"><strong>Bamboo</strong></a><br>
<a href="bamboo/bamboo.json">JSON</a><br>
<img src="bamboo/preview.svg" alt="Bamboo semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="melange/README.md"><strong>Mélange</strong></a><br>
<a href="melange/melange.json">JSON</a><br>
<img src="melange/preview.svg" alt="Mélange semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="cyberdream/README.md"><strong>Cyberdream</strong></a><br>
<a href="cyberdream/cyberdream.json">JSON</a><br>
<img src="cyberdream/preview.svg" alt="Cyberdream semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="vscode-dark/README.md"><strong>VSCode Dark+</strong></a><br>
<a href="vscode-dark/vscode-dark.json">JSON</a><br>
<img src="vscode-dark/preview.svg" alt="VSCode Dark+ semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="vscode-light/README.md"><strong>VSCode Light+</strong></a><br>
<a href="vscode-light/vscode-light.json">JSON</a><br>
<img src="vscode-light/preview.svg" alt="VSCode Light+ semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="solarized-osaka/README.md"><strong>Solarized Osaka</strong></a><br>
<a href="solarized-osaka/solarized-osaka.json">JSON</a><br>
<img src="solarized-osaka/preview.svg" alt="Solarized Osaka semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="nordic/README.md"><strong>Nordic</strong></a><br>
<a href="nordic/nordic.json">JSON</a><br>
<img src="nordic/preview.svg" alt="Nordic semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="tokyodark/README.md"><strong>Tokyo Dark</strong></a><br>
<a href="tokyodark/tokyodark.json">JSON</a><br>
<img src="tokyodark/preview.svg" alt="Tokyo Dark semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="material-darker/README.md"><strong>Material Darker</strong></a><br>
<a href="material-darker/material-darker.json">JSON</a><br>
<img src="material-darker/preview.svg" alt="Material Darker semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="shades-of-purple/README.md"><strong>Shades of Purple</strong></a><br>
<a href="shades-of-purple/shades-of-purple.json">JSON</a><br>
<img src="shades-of-purple/preview.svg" alt="Shades of Purple semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="onehalf-dark/README.md"><strong>One Half Dark</strong></a><br>
<a href="onehalf-dark/onehalf-dark.json">JSON</a><br>
<img src="onehalf-dark/preview.svg" alt="One Half Dark semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="onehalf-light/README.md"><strong>One Half Light</strong></a><br>
<a href="onehalf-light/onehalf-light.json">JSON</a><br>
<img src="onehalf-light/preview.svg" alt="One Half Light semantic transcript preview" width="360">
</td>
<td width="50%" valign="top">
<a href="base16-default-dark/README.md"><strong>Base16 Default Dark</strong></a><br>
<a href="base16-default-dark/base16-default-dark.json">JSON</a><br>
<img src="base16-default-dark/preview.svg" alt="Base16 Default Dark semantic transcript preview" width="360">
</td>
</tr></table>
<table><tr>
<td width="50%" valign="top">
<a href="base16-default-light/README.md"><strong>Base16 Default Light</strong></a><br>
<a href="base16-default-light/base16-default-light.json">JSON</a><br>
<img src="base16-default-light/preview.svg" alt="Base16 Default Light semantic transcript preview" width="360">
</td>
</tr></table>

## Adaptation policy

The mapping starts with editor semantics rather than visual similarity:

- Normal background and foreground become the transcript canvas and text.
- Comment or muted colors become timestamps, history, departures, and
  supporting metadata.
- String or diff-added green becomes joins.
- Warning yellow becomes notices.
- Special or magenta becomes `/me` actions.
- Error red becomes errors and kicks.
- Type or cyan becomes mode, nick, topic, and server events.
- Search, Visual, or selection backgrounds become mention backgrounds.
- Secondary editor surfaces become cards and reaction-chip backgrounds.

This preserves the theme's hierarchy and emotional character without
pretending an IRC transcript contains programming-language syntax groups.
Custom CSS affects only bIRC's message log; native application chrome
continues to use the JSON appearance and three base colors.

## CSS safety

Generated CSS uses only bIRC-documented transcript classes and ordinary
visual declarations: `color`, `background-color`, `border-color`,
`border-left`, and `padding-left`. It contains no URLs, imports,
positioning, generated content, selectors outside the transcript API, or
attempts to affect native application layout.

## Provenance and regeneration

Every per-theme README links its canonical upstream and identifies the
palette file or upstream export used for the mapping. Run:

```sh
node colorschemes/scripts/generate-catalog.js
```

The generator rewrites all JSON imports, documentation, and SVG previews
from the reviewed semantic source data. IDs are deterministic and use a
new namespace for this from-scratch CSS-aware catalog.
