# Hybrid

A transcript-aware bIRC adaptation of [Hybrid](https://github.com/w0ng/vim-hybrid).

![bIRC transcript preview of Hybrid](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#1d1f21` |
| Ordinary text | Normal/editor foreground | `#c5c8c6` |
| Native accent | Principal upstream highlight (blue) | `#81a2be` |
| Timestamps and history | Comment/muted foreground | `#707880` |
| Links, replies, and card titles | Link/function/blue | `#81a2be` |
| Joins | String/diff-added/green | `#b5bd68` |
| Parts and quits | Comment/muted foreground | `#707880` |
| Notices | Warning/yellow | `#f0c674` |
| Actions | Special/magenta | `#b294bb` |
| Errors and kicks | Error/red | `#cc6666` |
| Modes, nicks, topics, and server lines | Type/cyan | `#8abeb7` |
| Mention background | Search/Visual/selection | `#373b41` |
| Cards and reaction surfaces | Secondary editor surface | `#282a2e` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/w0ng/vim-hybrid](https://github.com/w0ng/vim-hybrid)
- Palette evidence: `colors/hybrid.vim highlight groups`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
