# Molokai

A transcript-aware bIRC adaptation of [Molokai](https://github.com/tomasr/molokai).

![bIRC transcript preview of Molokai](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#1b1d1e` |
| Ordinary text | Normal/editor foreground | `#f8f8f2` |
| Native accent | Principal upstream highlight (blue) | `#66d9ef` |
| Timestamps and history | Comment/muted foreground | `#7e8e91` |
| Links, replies, and card titles | Link/function/blue | `#66d9ef` |
| Joins | String/diff-added/green | `#a6e22e` |
| Parts and quits | Comment/muted foreground | `#7e8e91` |
| Notices | Warning/yellow | `#e6db74` |
| Actions | Special/magenta | `#ae81ff` |
| Errors and kicks | Error/red | `#f92672` |
| Modes, nicks, topics, and server lines | Type/cyan | `#66d9ef` |
| Mention background | Search/Visual/selection | `#403d3d` |
| Cards and reaction surfaces | Secondary editor surface | `#232526` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/tomasr/molokai](https://github.com/tomasr/molokai)
- Palette evidence: `colors/molokai.vim highlight groups`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
