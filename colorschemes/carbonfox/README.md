# Carbonfox

A transcript-aware bIRC adaptation of [Carbonfox](https://github.com/EdenEast/nightfox.nvim).

![bIRC transcript preview of Carbonfox](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#161616` |
| Ordinary text | Normal/editor foreground | `#f2f4f8` |
| Native accent | Principal upstream highlight (blue) | `#78a9ff` |
| Timestamps and history | Comment/muted foreground | `#525252` |
| Links, replies, and card titles | Link/function/blue | `#78a9ff` |
| Joins | String/diff-added/green | `#25be6a` |
| Parts and quits | Comment/muted foreground | `#525252` |
| Notices | Warning/yellow | `#08bdba` |
| Actions | Special/magenta | `#be95ff` |
| Errors and kicks | Error/red | `#ee5396` |
| Modes, nicks, topics, and server lines | Type/cyan | `#33b1ff` |
| Mention background | Search/Visual/selection | `#2a2a2a` |
| Cards and reaction surfaces | Secondary editor surface | `#282828` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/EdenEast/nightfox.nvim](https://github.com/EdenEast/nightfox.nvim)
- Palette evidence: `lua/nightfox/palette.lua and extra/carbonfox/carbonfox.itermcolors`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
