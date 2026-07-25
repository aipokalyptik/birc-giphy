# Catppuccin Frappé

A transcript-aware bIRC adaptation of [Catppuccin Frappé](https://github.com/catppuccin/nvim).

![bIRC transcript preview of Catppuccin Frappé](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#303446` |
| Ordinary text | Normal/editor foreground | `#c6d0f5` |
| Native accent | Principal upstream highlight (magenta) | `#ca9ee6` |
| Timestamps and history | Comment/muted foreground | `#737994` |
| Links, replies, and card titles | Link/function/blue | `#8caaee` |
| Joins | String/diff-added/green | `#a6d189` |
| Parts and quits | Comment/muted foreground | `#737994` |
| Notices | Warning/yellow | `#e5c890` |
| Actions | Special/magenta | `#ca9ee6` |
| Errors and kicks | Error/red | `#e78284` |
| Modes, nicks, topics, and server lines | Type/cyan | `#81c8be` |
| Mention background | Search/Visual/selection | `#51576d` |
| Cards and reaction surfaces | Secondary editor surface | `#414559` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/catppuccin/nvim](https://github.com/catppuccin/nvim)
- Palette evidence: `lua/catppuccin/palettes/frappe.lua`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
