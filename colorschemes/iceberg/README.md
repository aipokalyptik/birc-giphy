# Iceberg

A transcript-aware bIRC adaptation of [Iceberg](https://github.com/cocopon/iceberg.vim).

![bIRC transcript preview of Iceberg](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#161821` |
| Ordinary text | Normal/editor foreground | `#c6c8d1` |
| Native accent | Principal upstream highlight (blue) | `#84a0c6` |
| Timestamps and history | Comment/muted foreground | `#6b7089` |
| Links, replies, and card titles | Link/function/blue | `#84a0c6` |
| Joins | String/diff-added/green | `#b4be82` |
| Parts and quits | Comment/muted foreground | `#6b7089` |
| Notices | Warning/yellow | `#e2a478` |
| Actions | Special/magenta | `#a093c7` |
| Errors and kicks | Error/red | `#e27878` |
| Modes, nicks, topics, and server lines | Type/cyan | `#89b8c2` |
| Mention background | Search/Visual/selection | `#272c42` |
| Cards and reaction surfaces | Secondary editor surface | `#1e2132` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/cocopon/iceberg.vim](https://github.com/cocopon/iceberg.vim)
- Palette evidence: `colors/iceberg.vim GUI palette`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
