# Kanagawa Lotus

A transcript-aware bIRC adaptation of [Kanagawa Lotus](https://github.com/rebelot/kanagawa.nvim).

![bIRC transcript preview of Kanagawa Lotus](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#f2ecbc` |
| Ordinary text | Normal/editor foreground | `#545464` |
| Native accent | Principal upstream highlight (blue) | `#4d699b` |
| Timestamps and history | Comment/muted foreground | `#8a8980` |
| Links, replies, and card titles | Link/function/blue | `#4d699b` |
| Joins | String/diff-added/green | `#6f894e` |
| Parts and quits | Comment/muted foreground | `#8a8980` |
| Notices | Warning/yellow | `#77713f` |
| Actions | Special/magenta | `#624c83` |
| Errors and kicks | Error/red | `#c84053` |
| Modes, nicks, topics, and server lines | Type/cyan | `#597b75` |
| Mention background | Search/Visual/selection | `#dcd5ac` |
| Cards and reaction surfaces | Secondary editor surface | `#e7dba0` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/rebelot/kanagawa.nvim](https://github.com/rebelot/kanagawa.nvim)
- Palette evidence: `lua/kanagawa/colors.lua Lotus palette`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
