# Moonfly

A transcript-aware bIRC adaptation of [Moonfly](https://github.com/bluz71/vim-moonfly-colors).

![bIRC transcript preview of Moonfly](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#080808` |
| Ordinary text | Normal/editor foreground | `#bdbdbd` |
| Native accent | Principal upstream highlight (blue) | `#80a0ff` |
| Timestamps and history | Comment/muted foreground | `#949494` |
| Links, replies, and card titles | Link/function/blue | `#80a0ff` |
| Joins | String/diff-added/green | `#8cc85f` |
| Parts and quits | Comment/muted foreground | `#949494` |
| Notices | Warning/yellow | `#e3c78a` |
| Actions | Special/magenta | `#cf87e8` |
| Errors and kicks | Error/red | `#ff5d5d` |
| Modes, nicks, topics, and server lines | Type/cyan | `#79dac8` |
| Mention background | Search/Visual/selection | `#323437` |
| Cards and reaction surfaces | Secondary editor surface | `#323437` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/bluz71/vim-moonfly-colors](https://github.com/bluz71/vim-moonfly-colors)
- Palette evidence: `colors/moonfly.vim Visual group and extras/moonfly.itermcolors`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
