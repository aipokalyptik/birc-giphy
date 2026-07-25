# Dayfox

A transcript-aware bIRC adaptation of [Dayfox](https://github.com/EdenEast/nightfox.nvim).

![bIRC transcript preview of Dayfox](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#f6f2ee` |
| Ordinary text | Normal/editor foreground | `#3d2b5a` |
| Native accent | Principal upstream highlight (blue) | `#2848a9` |
| Timestamps and history | Comment/muted foreground | `#534c45` |
| Links, replies, and card titles | Link/function/blue | `#2848a9` |
| Joins | String/diff-added/green | `#396847` |
| Parts and quits | Comment/muted foreground | `#534c45` |
| Notices | Warning/yellow | `#ac5402` |
| Actions | Special/magenta | `#6e33ce` |
| Errors and kicks | Error/red | `#a5222f` |
| Modes, nicks, topics, and server lines | Type/cyan | `#287980` |
| Mention background | Search/Visual/selection | `#e7d2be` |
| Cards and reaction surfaces | Secondary editor surface | `#eee4df` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/EdenEast/nightfox.nvim](https://github.com/EdenEast/nightfox.nvim)
- Palette evidence: `extra/dayfox/dayfox.itermcolors`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
