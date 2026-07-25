# Ayu Light

A transcript-aware bIRC adaptation of [Ayu Light](https://github.com/ayu-theme/ayu-vim).

![bIRC transcript preview of Ayu Light](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#f9f9f9` |
| Ordinary text | Normal/editor foreground | `#4a5460` |
| Native accent | Principal upstream highlight (blue) | `#3694d0` |
| Timestamps and history | Comment/muted foreground | `#8a9199` |
| Links, replies, and card titles | Link/function/blue | `#3694d0` |
| Joins | String/diff-added/green | `#67c605` |
| Parts and quits | Comment/muted foreground | `#8a9199` |
| Notices | Warning/yellow | `#ed8515` |
| Actions | Special/magenta | `#864cc0` |
| Errors and kicks | Error/red | `#ec420e` |
| Modes, nicks, topics, and server lines | Type/cyan | `#41b487` |
| Mention background | Search/Visual/selection | `#eceade` |
| Cards and reaction surfaces | Secondary editor surface | `#eceade` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/ayu-theme/ayu-vim](https://github.com/ayu-theme/ayu-vim)
- Palette evidence: `term/ayu-light.itermcolors`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
