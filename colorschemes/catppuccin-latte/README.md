# Catppuccin Latte

A transcript-aware bIRC adaptation of [Catppuccin Latte](https://github.com/catppuccin/nvim).

![bIRC transcript preview of Catppuccin Latte](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#eff1f5` |
| Ordinary text | Normal/editor foreground | `#4c4f69` |
| Native accent | Principal upstream highlight (magenta) | `#8839ef` |
| Timestamps and history | Comment/muted foreground | `#8c8fa1` |
| Links, replies, and card titles | Link/function/blue | `#1e66f5` |
| Joins | String/diff-added/green | `#40a02b` |
| Parts and quits | Comment/muted foreground | `#8c8fa1` |
| Notices | Warning/yellow | `#df8e1d` |
| Actions | Special/magenta | `#8839ef` |
| Errors and kicks | Error/red | `#d20f39` |
| Modes, nicks, topics, and server lines | Type/cyan | `#179299` |
| Mention background | Search/Visual/selection | `#ccd0da` |
| Cards and reaction surfaces | Secondary editor surface | `#e6e9ef` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/catppuccin/nvim](https://github.com/catppuccin/nvim)
- Palette evidence: `lua/catppuccin/palettes/latte.lua`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
