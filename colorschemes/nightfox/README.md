# Nightfox

A transcript-aware bIRC adaptation of [Nightfox](https://github.com/EdenEast/nightfox.nvim).

![bIRC transcript preview of Nightfox](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#192330` |
| Ordinary text | Normal/editor foreground | `#cdcecf` |
| Native accent | Principal upstream highlight (blue) | `#719cd6` |
| Timestamps and history | Comment/muted foreground | `#575860` |
| Links, replies, and card titles | Link/function/blue | `#719cd6` |
| Joins | String/diff-added/green | `#81b29a` |
| Parts and quits | Comment/muted foreground | `#575860` |
| Notices | Warning/yellow | `#dbc074` |
| Actions | Special/magenta | `#9d79d6` |
| Errors and kicks | Error/red | `#c94f6d` |
| Modes, nicks, topics, and server lines | Type/cyan | `#63cdcf` |
| Mention background | Search/Visual/selection | `#2b3b51` |
| Cards and reaction surfaces | Secondary editor surface | `#393b44` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/EdenEast/nightfox.nvim](https://github.com/EdenEast/nightfox.nvim)
- Palette evidence: `extra/nightfox/nightfox.itermcolors`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
