# OneDark

A transcript-aware bIRC adaptation of [OneDark](https://github.com/joshdick/onedark.vim).

![bIRC transcript preview of OneDark](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#282c34` |
| Ordinary text | Normal/editor foreground | `#abb2bf` |
| Native accent | Principal upstream highlight (blue) | `#61afef` |
| Timestamps and history | Comment/muted foreground | `#5c6370` |
| Links, replies, and card titles | Link/function/blue | `#61afef` |
| Joins | String/diff-added/green | `#98c379` |
| Parts and quits | Comment/muted foreground | `#5c6370` |
| Notices | Warning/yellow | `#e5c07b` |
| Actions | Special/magenta | `#c678dd` |
| Errors and kicks | Error/red | `#e06c75` |
| Modes, nicks, topics, and server lines | Type/cyan | `#56b6c2` |
| Mention background | Search/Visual/selection | `#3e4452` |
| Cards and reaction surfaces | Secondary editor surface | `#2c323c` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/joshdick/onedark.vim](https://github.com/joshdick/onedark.vim)
- Palette evidence: `colors/onedark.vim and term/One Dark.itermcolors`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
