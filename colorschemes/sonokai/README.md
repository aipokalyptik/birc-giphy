# Sonokai

A transcript-aware bIRC adaptation of [Sonokai](https://github.com/sainnhe/sonokai).

![bIRC transcript preview of Sonokai](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#2c2e34` |
| Ordinary text | Normal/editor foreground | `#e2e2e3` |
| Native accent | Principal upstream highlight (blue) | `#76cce0` |
| Timestamps and history | Comment/muted foreground | `#7f8490` |
| Links, replies, and card titles | Link/function/blue | `#76cce0` |
| Joins | String/diff-added/green | `#9ed072` |
| Parts and quits | Comment/muted foreground | `#7f8490` |
| Notices | Warning/yellow | `#e7c664` |
| Actions | Special/magenta | `#b39df3` |
| Errors and kicks | Error/red | `#fc5d7c` |
| Modes, nicks, topics, and server lines | Type/cyan | `#f39660` |
| Mention background | Search/Visual/selection | `#414550` |
| Cards and reaction surfaces | Secondary editor surface | `#3b3e48` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/sainnhe/sonokai](https://github.com/sainnhe/sonokai)
- Palette evidence: `colors/sonokai.vim default palette`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
