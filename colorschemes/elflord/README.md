# Elflord

A transcript-aware bIRC adaptation of [Elflord](https://github.com/vim/colorschemes).

![bIRC transcript preview of Elflord](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#000000` |
| Ordinary text | Normal/editor foreground | `#00ffff` |
| Native accent | Principal upstream highlight (blue) | `#80a0ff` |
| Timestamps and history | Comment/muted foreground | `#80a0ff` |
| Links, replies, and card titles | Link/function/blue | `#80a0ff` |
| Joins | String/diff-added/green | `#60ff60` |
| Parts and quits | Comment/muted foreground | `#80a0ff` |
| Notices | Warning/yellow | `#ffff00` |
| Actions | Special/magenta | `#ff00ff` |
| Errors and kicks | Error/red | `#ff0000` |
| Modes, nicks, topics, and server lines | Type/cyan | `#40ffff` |
| Mention background | Search/Visual/selection | `#303030` |
| Cards and reaction surfaces | Secondary editor surface | `#303030` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/vim/colorschemes](https://github.com/vim/colorschemes)
- Palette evidence: `colors/elflord.vim highlight groups`
- Upstream license: `Vim License`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
