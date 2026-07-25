# Palenight

A transcript-aware bIRC adaptation of [Palenight](https://github.com/drewtempelmeyer/palenight.vim).

![bIRC transcript preview of Palenight](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#292d3e` |
| Ordinary text | Normal/editor foreground | `#bfc7d5` |
| Native accent | Principal upstream highlight (blue) | `#82b1ff` |
| Timestamps and history | Comment/muted foreground | `#697098` |
| Links, replies, and card titles | Link/function/blue | `#82b1ff` |
| Joins | String/diff-added/green | `#c3e88d` |
| Parts and quits | Comment/muted foreground | `#697098` |
| Notices | Warning/yellow | `#ffcb6b` |
| Actions | Special/magenta | `#c792ea` |
| Errors and kicks | Error/red | `#ff5370` |
| Modes, nicks, topics, and server lines | Type/cyan | `#89ddff` |
| Mention background | Search/Visual/selection | `#3e4452` |
| Cards and reaction surfaces | Secondary editor surface | `#2c323c` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/drewtempelmeyer/palenight.vim](https://github.com/drewtempelmeyer/palenight.vim)
- Palette evidence: `colors/palenight.vim highlight groups`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
