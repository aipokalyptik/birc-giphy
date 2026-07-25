# Rosé Pine

A transcript-aware bIRC adaptation of [Rosé Pine](https://github.com/rose-pine/neovim).

![bIRC transcript preview of Rosé Pine](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#191724` |
| Ordinary text | Normal/editor foreground | `#e0def4` |
| Native accent | Principal upstream highlight (magenta) | `#c4a7e7` |
| Timestamps and history | Comment/muted foreground | `#6e6a86` |
| Links, replies, and card titles | Link/function/blue | `#31748f` |
| Joins | String/diff-added/green | `#95b1ac` |
| Parts and quits | Comment/muted foreground | `#6e6a86` |
| Notices | Warning/yellow | `#f6c177` |
| Actions | Special/magenta | `#c4a7e7` |
| Errors and kicks | Error/red | `#eb6f92` |
| Modes, nicks, topics, and server lines | Type/cyan | `#9ccfd8` |
| Mention background | Search/Visual/selection | `#403d52` |
| Cards and reaction surfaces | Secondary editor surface | `#1f1d2e` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/rose-pine/neovim](https://github.com/rose-pine/neovim)
- Palette evidence: `lua/rose-pine/palette.lua main`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
