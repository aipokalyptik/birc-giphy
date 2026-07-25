# Tokyo Night Day

A transcript-aware bIRC adaptation of [Tokyo Night Day](https://github.com/folke/tokyonight.nvim).

![bIRC transcript preview of Tokyo Night Day](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#e1e2e7` |
| Ordinary text | Normal/editor foreground | `#3760bf` |
| Native accent | Principal upstream highlight (blue) | `#2e7de9` |
| Timestamps and history | Comment/muted foreground | `#848cb5` |
| Links, replies, and card titles | Link/function/blue | `#2e7de9` |
| Joins | String/diff-added/green | `#587539` |
| Parts and quits | Comment/muted foreground | `#848cb5` |
| Notices | Warning/yellow | `#8c6c3e` |
| Actions | Special/magenta | `#9854f1` |
| Errors and kicks | Error/red | `#f52a65` |
| Modes, nicks, topics, and server lines | Type/cyan | `#007197` |
| Mention background | Search/Visual/selection | `#b7c1e3` |
| Cards and reaction surfaces | Secondary editor surface | `#d0d5e3` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/folke/tokyonight.nvim](https://github.com/folke/tokyonight.nvim)
- Palette evidence: `lua/tokyonight/theme.lua and extras/iterm/tokyonight_day.itermcolors`
- Upstream license: `Apache-2.0`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
