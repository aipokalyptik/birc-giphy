# Catppuccin Mocha

A transcript-aware bIRC adaptation of [Catppuccin Mocha](https://github.com/catppuccin/nvim).

![bIRC transcript preview of Catppuccin Mocha](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#1e1e2e` |
| Ordinary text | Normal/editor foreground | `#cdd6f4` |
| Native accent | Principal upstream highlight (magenta) | `#cba6f7` |
| Timestamps and history | Comment/muted foreground | `#6c7086` |
| Links, replies, and card titles | Link/function/blue | `#89b4fa` |
| Joins | String/diff-added/green | `#a6e3a1` |
| Parts and quits | Comment/muted foreground | `#6c7086` |
| Notices | Warning/yellow | `#f9e2af` |
| Actions | Special/magenta | `#cba6f7` |
| Errors and kicks | Error/red | `#f38ba8` |
| Modes, nicks, topics, and server lines | Type/cyan | `#94e2d5` |
| Mention background | Search/Visual/selection | `#45475a` |
| Cards and reaction surfaces | Secondary editor surface | `#313244` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/catppuccin/nvim](https://github.com/catppuccin/nvim)
- Palette evidence: `lua/catppuccin/palettes/mocha.lua`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
