# Everforest Light

A transcript-aware bIRC adaptation of [Everforest Light](https://github.com/sainnhe/everforest).

![bIRC transcript preview of Everforest Light](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#fdf6e3` |
| Ordinary text | Normal/editor foreground | `#5c6a72` |
| Native accent | Principal upstream highlight (blue) | `#3a94c5` |
| Timestamps and history | Comment/muted foreground | `#939f91` |
| Links, replies, and card titles | Link/function/blue | `#3a94c5` |
| Joins | String/diff-added/green | `#8da101` |
| Parts and quits | Comment/muted foreground | `#939f91` |
| Notices | Warning/yellow | `#dfa000` |
| Actions | Special/magenta | `#df69ba` |
| Errors and kicks | Error/red | `#f85552` |
| Modes, nicks, topics, and server lines | Type/cyan | `#35a77c` |
| Mention background | Search/Visual/selection | `#eaedc8` |
| Cards and reaction surfaces | Secondary editor surface | `#efebd4` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/sainnhe/everforest](https://github.com/sainnhe/everforest)
- Palette evidence: `colors/everforest.vim; medium light`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
