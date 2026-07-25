# Nordfox

A transcript-aware bIRC adaptation of [Nordfox](https://github.com/EdenEast/nightfox.nvim).

![bIRC transcript preview of Nordfox](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#2e3440` |
| Ordinary text | Normal/editor foreground | `#cdcecf` |
| Native accent | Principal upstream highlight (blue) | `#81a1c1` |
| Timestamps and history | Comment/muted foreground | `#60728a` |
| Links, replies, and card titles | Link/function/blue | `#81a1c1` |
| Joins | String/diff-added/green | `#a3be8c` |
| Parts and quits | Comment/muted foreground | `#60728a` |
| Notices | Warning/yellow | `#ebcb8b` |
| Actions | Special/magenta | `#b48ead` |
| Errors and kicks | Error/red | `#bf616a` |
| Modes, nicks, topics, and server lines | Type/cyan | `#88c0d0` |
| Mention background | Search/Visual/selection | `#3e4a5b` |
| Cards and reaction surfaces | Secondary editor surface | `#3b4252` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/EdenEast/nightfox.nvim](https://github.com/EdenEast/nightfox.nvim)
- Palette evidence: `lua/nightfox/palette.lua and extra/nordfox/nordfox.itermcolors`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
