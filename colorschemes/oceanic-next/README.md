# Oceanic Next

A transcript-aware bIRC adaptation of [Oceanic Next](https://github.com/mhartington/oceanic-next).

![bIRC transcript preview of Oceanic Next](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#1b2b34` |
| Ordinary text | Normal/editor foreground | `#d8dee9` |
| Native accent | Principal upstream highlight (blue) | `#6699cc` |
| Timestamps and history | Comment/muted foreground | `#65737e` |
| Links, replies, and card titles | Link/function/blue | `#6699cc` |
| Joins | String/diff-added/green | `#99c794` |
| Parts and quits | Comment/muted foreground | `#65737e` |
| Notices | Warning/yellow | `#fac863` |
| Actions | Special/magenta | `#c594c5` |
| Errors and kicks | Error/red | `#ec5f67` |
| Modes, nicks, topics, and server lines | Type/cyan | `#62b3b2` |
| Mention background | Search/Visual/selection | `#4f5b66` |
| Cards and reaction surfaces | Secondary editor surface | `#343d46` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/mhartington/oceanic-next](https://github.com/mhartington/oceanic-next)
- Palette evidence: `colors/OceanicNext.vim highlight groups`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
