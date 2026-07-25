# Catppuccin Macchiato

A transcript-aware bIRC adaptation of [Catppuccin Macchiato](https://github.com/catppuccin/nvim).

![bIRC transcript preview of Catppuccin Macchiato](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#24273a` |
| Ordinary text | Normal/editor foreground | `#cad3f5` |
| Native accent | Principal upstream highlight (magenta) | `#c6a0f6` |
| Timestamps and history | Comment/muted foreground | `#6e738d` |
| Links, replies, and card titles | Link/function/blue | `#8aadf4` |
| Joins | String/diff-added/green | `#a6da95` |
| Parts and quits | Comment/muted foreground | `#6e738d` |
| Notices | Warning/yellow | `#eed49f` |
| Actions | Special/magenta | `#c6a0f6` |
| Errors and kicks | Error/red | `#ed8796` |
| Modes, nicks, topics, and server lines | Type/cyan | `#8bd5ca` |
| Mention background | Search/Visual/selection | `#494d64` |
| Cards and reaction surfaces | Secondary editor surface | `#363a4f` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/catppuccin/nvim](https://github.com/catppuccin/nvim)
- Palette evidence: `lua/catppuccin/palettes/macchiato.lua`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
