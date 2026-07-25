# Material Darker

A transcript-aware bIRC adaptation of [Material Darker](https://github.com/marko-cerovac/material.nvim).

![bIRC transcript preview of Material Darker](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#212121` |
| Ordinary text | Normal/editor foreground | `#eeffff` |
| Native accent | Principal upstream highlight (blue) | `#82aaff` |
| Timestamps and history | Comment/muted foreground | `#545454` |
| Links, replies, and card titles | Link/function/blue | `#82aaff` |
| Joins | String/diff-added/green | `#c3e88d` |
| Parts and quits | Comment/muted foreground | `#545454` |
| Notices | Warning/yellow | `#ffcb6b` |
| Actions | Special/magenta | `#c792ea` |
| Errors and kicks | Error/red | `#f07178` |
| Modes, nicks, topics, and server lines | Type/cyan | `#89ddff` |
| Mention background | Search/Visual/selection | `#404040` |
| Cards and reaction surfaces | Secondary editor surface | `#292929` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/marko-cerovac/material.nvim](https://github.com/marko-cerovac/material.nvim)
- Palette evidence: `lua/material/colors.lua darker palette`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
