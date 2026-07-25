# Kanagawa Dragon

A transcript-aware bIRC adaptation of [Kanagawa Dragon](https://github.com/rebelot/kanagawa.nvim).

![bIRC transcript preview of Kanagawa Dragon](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#181616` |
| Ordinary text | Normal/editor foreground | `#c8c093` |
| Native accent | Principal upstream highlight (blue) | `#8ba4b0` |
| Timestamps and history | Comment/muted foreground | `#a6a69c` |
| Links, replies, and card titles | Link/function/blue | `#8ba4b0` |
| Joins | String/diff-added/green | `#8a9a7b` |
| Parts and quits | Comment/muted foreground | `#a6a69c` |
| Notices | Warning/yellow | `#c4b28a` |
| Actions | Special/magenta | `#a292a3` |
| Errors and kicks | Error/red | `#c4746e` |
| Modes, nicks, topics, and server lines | Type/cyan | `#8ea4a2` |
| Mention background | Search/Visual/selection | `#223249` |
| Cards and reaction surfaces | Secondary editor surface | `#0d0c0c` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/rebelot/kanagawa.nvim](https://github.com/rebelot/kanagawa.nvim)
- Palette evidence: `lua/kanagawa/colors.lua and extras/iterm/kanagawa_dragon.itermcolors`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
