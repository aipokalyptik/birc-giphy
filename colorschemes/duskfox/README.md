# Duskfox

A transcript-aware bIRC adaptation of [Duskfox](https://github.com/EdenEast/nightfox.nvim).

![bIRC transcript preview of Duskfox](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#232136` |
| Ordinary text | Normal/editor foreground | `#e0def4` |
| Native accent | Principal upstream highlight (blue) | `#569fba` |
| Timestamps and history | Comment/muted foreground | `#6e6a86` |
| Links, replies, and card titles | Link/function/blue | `#569fba` |
| Joins | String/diff-added/green | `#a3be8c` |
| Parts and quits | Comment/muted foreground | `#6e6a86` |
| Notices | Warning/yellow | `#f6c177` |
| Actions | Special/magenta | `#c4a7e7` |
| Errors and kicks | Error/red | `#eb6f92` |
| Modes, nicks, topics, and server lines | Type/cyan | `#9ccfd8` |
| Mention background | Search/Visual/selection | `#433c59` |
| Cards and reaction surfaces | Secondary editor surface | `#393552` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/EdenEast/nightfox.nvim](https://github.com/EdenEast/nightfox.nvim)
- Palette evidence: `extra/duskfox/duskfox.itermcolors`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
