# Gruvbox Material Light

A transcript-aware bIRC adaptation of [Gruvbox Material Light](https://github.com/sainnhe/gruvbox-material).

![bIRC transcript preview of Gruvbox Material Light](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#fbf1c7` |
| Ordinary text | Normal/editor foreground | `#654735` |
| Native accent | Principal upstream highlight (blue) | `#45707a` |
| Timestamps and history | Comment/muted foreground | `#928374` |
| Links, replies, and card titles | Link/function/blue | `#45707a` |
| Joins | String/diff-added/green | `#6c782e` |
| Parts and quits | Comment/muted foreground | `#928374` |
| Notices | Warning/yellow | `#b47109` |
| Actions | Special/magenta | `#945e80` |
| Errors and kicks | Error/red | `#c14a4a` |
| Modes, nicks, topics, and server lines | Type/cyan | `#4c7a5d` |
| Mention background | Search/Visual/selection | `#eee0b7` |
| Cards and reaction surfaces | Secondary editor surface | `#f2e5bc` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/sainnhe/gruvbox-material](https://github.com/sainnhe/gruvbox-material)
- Palette evidence: `colors/gruvbox-material.vim; medium light`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
