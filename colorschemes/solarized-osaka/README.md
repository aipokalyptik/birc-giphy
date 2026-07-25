# Solarized Osaka

A transcript-aware bIRC adaptation of [Solarized Osaka](https://github.com/craftzdog/solarized-osaka.nvim).

![bIRC transcript preview of Solarized Osaka](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#001419` |
| Ordinary text | Normal/editor foreground | `#839496` |
| Native accent | Principal upstream highlight (blue) | `#268bd2` |
| Timestamps and history | Comment/muted foreground | `#586e75` |
| Links, replies, and card titles | Link/function/blue | `#268bd2` |
| Joins | String/diff-added/green | `#859900` |
| Parts and quits | Comment/muted foreground | `#586e75` |
| Notices | Warning/yellow | `#b58900` |
| Actions | Special/magenta | `#d33682` |
| Errors and kicks | Error/red | `#dc322f` |
| Modes, nicks, topics, and server lines | Type/cyan | `#2aa198` |
| Mention background | Search/Visual/selection | `#073642` |
| Cards and reaction surfaces | Secondary editor surface | `#002b36` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/craftzdog/solarized-osaka.nvim](https://github.com/craftzdog/solarized-osaka.nvim)
- Palette evidence: `lua/solarized-osaka/colors.lua dark palette`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
