# Tokyo Night Moon

A transcript-aware bIRC adaptation of [Tokyo Night Moon](https://github.com/folke/tokyonight.nvim).

![bIRC transcript preview of Tokyo Night Moon](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#222436` |
| Ordinary text | Normal/editor foreground | `#c8d3f5` |
| Native accent | Principal upstream highlight (blue) | `#82aaff` |
| Timestamps and history | Comment/muted foreground | `#636da6` |
| Links, replies, and card titles | Link/function/blue | `#82aaff` |
| Joins | String/diff-added/green | `#c3e88d` |
| Parts and quits | Comment/muted foreground | `#636da6` |
| Notices | Warning/yellow | `#ffc777` |
| Actions | Special/magenta | `#c099ff` |
| Errors and kicks | Error/red | `#ff757f` |
| Modes, nicks, topics, and server lines | Type/cyan | `#86e1fc` |
| Mention background | Search/Visual/selection | `#2d3f76` |
| Cards and reaction surfaces | Secondary editor surface | `#1b1d2b` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/folke/tokyonight.nvim](https://github.com/folke/tokyonight.nvim)
- Palette evidence: `lua/tokyonight/theme.lua and extras/iterm/tokyonight_moon.itermcolors`
- Upstream license: `Apache-2.0`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
