# Gruvbox Material Dark

A transcript-aware bIRC adaptation of [Gruvbox Material Dark](https://github.com/sainnhe/gruvbox-material).

![bIRC transcript preview of Gruvbox Material Dark](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#282828` |
| Ordinary text | Normal/editor foreground | `#d4be98` |
| Native accent | Principal upstream highlight (blue) | `#7daea3` |
| Timestamps and history | Comment/muted foreground | `#928374` |
| Links, replies, and card titles | Link/function/blue | `#7daea3` |
| Joins | String/diff-added/green | `#a9b665` |
| Parts and quits | Comment/muted foreground | `#928374` |
| Notices | Warning/yellow | `#d8a657` |
| Actions | Special/magenta | `#d3869b` |
| Errors and kicks | Error/red | `#ea6962` |
| Modes, nicks, topics, and server lines | Type/cyan | `#89b482` |
| Mention background | Search/Visual/selection | `#45403d` |
| Cards and reaction surfaces | Secondary editor surface | `#32302f` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/sainnhe/gruvbox-material](https://github.com/sainnhe/gruvbox-material)
- Palette evidence: `colors/gruvbox-material.vim; medium dark`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
