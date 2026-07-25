# Jellybeans

A transcript-aware bIRC adaptation of [Jellybeans](https://github.com/nanotech/jellybeans.vim).

![bIRC transcript preview of Jellybeans](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#151515` |
| Ordinary text | Normal/editor foreground | `#e8e8d3` |
| Native accent | Principal upstream highlight (blue) | `#8197bf` |
| Timestamps and history | Comment/muted foreground | `#888888` |
| Links, replies, and card titles | Link/function/blue | `#8197bf` |
| Joins | String/diff-added/green | `#99ad6a` |
| Parts and quits | Comment/muted foreground | `#888888` |
| Notices | Warning/yellow | `#fad07a` |
| Actions | Special/magenta | `#c6b6ee` |
| Errors and kicks | Error/red | `#cf6a4c` |
| Modes, nicks, topics, and server lines | Type/cyan | `#8fbfdc` |
| Mention background | Search/Visual/selection | `#404040` |
| Cards and reaction surfaces | Secondary editor surface | `#302028` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/nanotech/jellybeans.vim](https://github.com/nanotech/jellybeans.vim)
- Palette evidence: `colors/jellybeans.vim highlight groups`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
