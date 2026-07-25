# Gotham

A transcript-aware bIRC adaptation of [Gotham](https://github.com/whatyouhide/vim-gotham).

![bIRC transcript preview of Gotham](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#0c1014` |
| Ordinary text | Normal/editor foreground | `#99d1ce` |
| Native accent | Principal upstream highlight (blue) | `#33859e` |
| Timestamps and history | Comment/muted foreground | `#195466` |
| Links, replies, and card titles | Link/function/blue | `#33859e` |
| Joins | String/diff-added/green | `#2aa889` |
| Parts and quits | Comment/muted foreground | `#195466` |
| Notices | Warning/yellow | `#edb443` |
| Actions | Special/magenta | `#888ca6` |
| Errors and kicks | Error/red | `#c23127` |
| Modes, nicks, topics, and server lines | Type/cyan | `#2aa889` |
| Mention background | Search/Visual/selection | `#0a3749` |
| Cards and reaction surfaces | Secondary editor surface | `#11151c` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/whatyouhide/vim-gotham](https://github.com/whatyouhide/vim-gotham)
- Palette evidence: `colors/gotham.vim highlight groups`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
