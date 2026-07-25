# Tokyo Night Storm

A transcript-aware bIRC adaptation of [Tokyo Night Storm](https://github.com/folke/tokyonight.nvim).

![bIRC transcript preview of Tokyo Night Storm](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#24283b` |
| Ordinary text | Normal/editor foreground | `#c0caf5` |
| Native accent | Principal upstream highlight (blue) | `#7aa2f7` |
| Timestamps and history | Comment/muted foreground | `#565f89` |
| Links, replies, and card titles | Link/function/blue | `#7aa2f7` |
| Joins | String/diff-added/green | `#9ece6a` |
| Parts and quits | Comment/muted foreground | `#565f89` |
| Notices | Warning/yellow | `#e0af68` |
| Actions | Special/magenta | `#bb9af7` |
| Errors and kicks | Error/red | `#f7768e` |
| Modes, nicks, topics, and server lines | Type/cyan | `#7dcfff` |
| Mention background | Search/Visual/selection | `#2e3c64` |
| Cards and reaction surfaces | Secondary editor surface | `#1d202f` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/folke/tokyonight.nvim](https://github.com/folke/tokyonight.nvim)
- Palette evidence: `lua/tokyonight/theme.lua and extras/iterm/tokyonight_storm.itermcolors`
- Upstream license: `Apache-2.0`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
