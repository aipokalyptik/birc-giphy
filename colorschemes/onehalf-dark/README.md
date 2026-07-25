# One Half Dark

A transcript-aware bIRC adaptation of [One Half Dark](https://github.com/sonph/onehalf).

![bIRC transcript preview of One Half Dark](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#282c34` |
| Ordinary text | Normal/editor foreground | `#dcdfe4` |
| Native accent | Principal upstream highlight (blue) | `#61afef` |
| Timestamps and history | Comment/muted foreground | `#5c6370` |
| Links, replies, and card titles | Link/function/blue | `#61afef` |
| Joins | String/diff-added/green | `#98c379` |
| Parts and quits | Comment/muted foreground | `#5c6370` |
| Notices | Warning/yellow | `#e5c07b` |
| Actions | Special/magenta | `#c678dd` |
| Errors and kicks | Error/red | `#e06c75` |
| Modes, nicks, topics, and server lines | Type/cyan | `#56b6c2` |
| Mention background | Search/Visual/selection | `#474e5d` |
| Cards and reaction surfaces | Secondary editor surface | `#21252b` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/sonph/onehalf](https://github.com/sonph/onehalf)
- Palette evidence: `iterm/OneHalfDark.itermcolors`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
