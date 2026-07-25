# Vividchalk

A transcript-aware bIRC adaptation of [Vividchalk](https://github.com/tpope/vim-vividchalk).

![bIRC transcript preview of Vividchalk](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#000000` |
| Ordinary text | Normal/editor foreground | `#eeeeee` |
| Native accent | Principal upstream highlight (yellow) | `#ffcc00` |
| Timestamps and history | Comment/muted foreground | `#9933cc` |
| Links, replies, and card titles | Link/function/blue | `#6699cc` |
| Joins | String/diff-added/green | `#66ff00` |
| Parts and quits | Comment/muted foreground | `#9933cc` |
| Notices | Warning/yellow | `#ffcc00` |
| Actions | Special/magenta | `#ff00ff` |
| Errors and kicks | Error/red | `#ff0000` |
| Modes, nicks, topics, and server lines | Type/cyan | `#00ffff` |
| Mention background | Search/Visual/selection | `#555577` |
| Cards and reaction surfaces | Secondary editor surface | `#1c1c1c` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/tpope/vim-vividchalk](https://github.com/tpope/vim-vividchalk)
- Palette evidence: `colors/vividchalk.vim highlight groups`
- Upstream license: `Vim License`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
