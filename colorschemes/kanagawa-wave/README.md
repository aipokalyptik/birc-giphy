# Kanagawa Wave

A transcript-aware bIRC adaptation of [Kanagawa Wave](https://github.com/rebelot/kanagawa.nvim).

![bIRC transcript preview of Kanagawa Wave](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#1f1f28` |
| Ordinary text | Normal/editor foreground | `#dcd7ba` |
| Native accent | Principal upstream highlight (blue) | `#7e9cd8` |
| Timestamps and history | Comment/muted foreground | `#727169` |
| Links, replies, and card titles | Link/function/blue | `#7e9cd8` |
| Joins | String/diff-added/green | `#76946a` |
| Parts and quits | Comment/muted foreground | `#727169` |
| Notices | Warning/yellow | `#c0a36e` |
| Actions | Special/magenta | `#957fb8` |
| Errors and kicks | Error/red | `#c34043` |
| Modes, nicks, topics, and server lines | Type/cyan | `#6a9589` |
| Mention background | Search/Visual/selection | `#2d4f67` |
| Cards and reaction surfaces | Secondary editor surface | `#090618` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/rebelot/kanagawa.nvim](https://github.com/rebelot/kanagawa.nvim)
- Palette evidence: `lua/kanagawa/colors.lua and extras/iterm/kanagawa.itermcolors`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
