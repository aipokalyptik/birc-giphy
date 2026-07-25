# Dawnfox

A transcript-aware bIRC adaptation of [Dawnfox](https://github.com/EdenEast/nightfox.nvim).

![bIRC transcript preview of Dawnfox](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#faf4ed` |
| Ordinary text | Normal/editor foreground | `#575279` |
| Native accent | Principal upstream highlight (blue) | `#286983` |
| Timestamps and history | Comment/muted foreground | `#9893a5` |
| Links, replies, and card titles | Link/function/blue | `#286983` |
| Joins | String/diff-added/green | `#618774` |
| Parts and quits | Comment/muted foreground | `#9893a5` |
| Notices | Warning/yellow | `#ea9d34` |
| Actions | Special/magenta | `#907aa9` |
| Errors and kicks | Error/red | `#b4637a` |
| Modes, nicks, topics, and server lines | Type/cyan | `#56949f` |
| Mention background | Search/Visual/selection | `#d0d8d8` |
| Cards and reaction surfaces | Secondary editor surface | `#f2e9e1` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/EdenEast/nightfox.nvim](https://github.com/EdenEast/nightfox.nvim)
- Palette evidence: `extra/dawnfox/dawnfox.itermcolors`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
