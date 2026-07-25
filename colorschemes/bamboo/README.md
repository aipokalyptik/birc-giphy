# Bamboo

A transcript-aware bIRC adaptation of [Bamboo](https://github.com/ribru17/bamboo.nvim).

![bIRC transcript preview of Bamboo](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#252623` |
| Ordinary text | Normal/editor foreground | `#f1e9d2` |
| Native accent | Principal upstream highlight (blue) | `#57a5e5` |
| Timestamps and history | Comment/muted foreground | `#5b5e5a` |
| Links, replies, and card titles | Link/function/blue | `#57a5e5` |
| Joins | String/diff-added/green | `#8fb573` |
| Parts and quits | Comment/muted foreground | `#5b5e5a` |
| Notices | Warning/yellow | `#dbb671` |
| Actions | Special/magenta | `#aaaaff` |
| Errors and kicks | Error/red | `#e75a7c` |
| Modes, nicks, topics, and server lines | Type/cyan | `#70c2be` |
| Mention background | Search/Visual/selection | `#5b5e5a` |
| Cards and reaction surfaces | Secondary editor surface | `#1c1e1b` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/ribru17/bamboo.nvim](https://github.com/ribru17/bamboo.nvim)
- Palette evidence: `extras/iterm/bamboo.itermcolors`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
