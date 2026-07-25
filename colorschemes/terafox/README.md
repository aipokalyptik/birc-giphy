# Terafox

A transcript-aware bIRC adaptation of [Terafox](https://github.com/EdenEast/nightfox.nvim).

![bIRC transcript preview of Terafox](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#152528` |
| Ordinary text | Normal/editor foreground | `#e6eaea` |
| Native accent | Principal upstream highlight (blue) | `#5a93aa` |
| Timestamps and history | Comment/muted foreground | `#4e5157` |
| Links, replies, and card titles | Link/function/blue | `#5a93aa` |
| Joins | String/diff-added/green | `#7aa4a1` |
| Parts and quits | Comment/muted foreground | `#4e5157` |
| Notices | Warning/yellow | `#fda47f` |
| Actions | Special/magenta | `#ad5c7c` |
| Errors and kicks | Error/red | `#e85c51` |
| Modes, nicks, topics, and server lines | Type/cyan | `#a1cdd8` |
| Mention background | Search/Visual/selection | `#293e40` |
| Cards and reaction surfaces | Secondary editor surface | `#2f3239` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/EdenEast/nightfox.nvim](https://github.com/EdenEast/nightfox.nvim)
- Palette evidence: `extra/terafox/terafox.itermcolors`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
