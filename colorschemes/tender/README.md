# Tender

A transcript-aware bIRC adaptation of [Tender](https://github.com/jacoborus/tender.vim).

![bIRC transcript preview of Tender](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#282828` |
| Ordinary text | Normal/editor foreground | `#eeeeee` |
| Native accent | Principal upstream highlight (blue) | `#73cef4` |
| Timestamps and history | Comment/muted foreground | `#666666` |
| Links, replies, and card titles | Link/function/blue | `#73cef4` |
| Joins | String/diff-added/green | `#c9d05c` |
| Parts and quits | Comment/muted foreground | `#666666` |
| Notices | Warning/yellow | `#d3b987` |
| Actions | Special/magenta | `#d3b987` |
| Errors and kicks | Error/red | `#f43753` |
| Modes, nicks, topics, and server lines | Type/cyan | `#b3deef` |
| Mention background | Search/Visual/selection | `#293b44` |
| Cards and reaction surfaces | Secondary editor surface | `#383838` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/jacoborus/tender.vim](https://github.com/jacoborus/tender.vim)
- Palette evidence: `colors/tender.vim highlight groups`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
