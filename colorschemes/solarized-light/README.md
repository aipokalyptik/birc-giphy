# Solarized Light

A transcript-aware bIRC adaptation of [Solarized Light](https://github.com/altercation/vim-colors-solarized).

![bIRC transcript preview of Solarized Light](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#fdf6e3` |
| Ordinary text | Normal/editor foreground | `#657b83` |
| Native accent | Principal upstream highlight (blue) | `#268bd2` |
| Timestamps and history | Comment/muted foreground | `#93a1a1` |
| Links, replies, and card titles | Link/function/blue | `#268bd2` |
| Joins | String/diff-added/green | `#859900` |
| Parts and quits | Comment/muted foreground | `#93a1a1` |
| Notices | Warning/yellow | `#b58900` |
| Actions | Special/magenta | `#d33682` |
| Errors and kicks | Error/red | `#dc322f` |
| Modes, nicks, topics, and server lines | Type/cyan | `#2aa198` |
| Mention background | Search/Visual/selection | `#eee8d5` |
| Cards and reaction surfaces | Secondary editor surface | `#eee8d5` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/altercation/vim-colors-solarized](https://github.com/altercation/vim-colors-solarized)
- Palette evidence: `colors/solarized.vim; light palette`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
