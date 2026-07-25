# Rosé Pine Dawn

A transcript-aware bIRC adaptation of [Rosé Pine Dawn](https://github.com/rose-pine/neovim).

![bIRC transcript preview of Rosé Pine Dawn](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#faf4ed` |
| Ordinary text | Normal/editor foreground | `#464261` |
| Native accent | Principal upstream highlight (magenta) | `#907aa9` |
| Timestamps and history | Comment/muted foreground | `#9893a5` |
| Links, replies, and card titles | Link/function/blue | `#286983` |
| Joins | String/diff-added/green | `#6d8f89` |
| Parts and quits | Comment/muted foreground | `#9893a5` |
| Notices | Warning/yellow | `#ea9d34` |
| Actions | Special/magenta | `#907aa9` |
| Errors and kicks | Error/red | `#b4637a` |
| Modes, nicks, topics, and server lines | Type/cyan | `#56949f` |
| Mention background | Search/Visual/selection | `#dfdad9` |
| Cards and reaction surfaces | Secondary editor surface | `#fffaf3` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/rose-pine/neovim](https://github.com/rose-pine/neovim)
- Palette evidence: `lua/rose-pine/palette.lua dawn`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
