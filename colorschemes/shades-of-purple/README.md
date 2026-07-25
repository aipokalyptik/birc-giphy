# Shades of Purple

A transcript-aware bIRC adaptation of [Shades of Purple](https://github.com/Rigellute/shades-of-purple.vim).

![bIRC transcript preview of Shades of Purple](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#2d2b55` |
| Ordinary text | Normal/editor foreground | `#e1efff` |
| Native accent | Principal upstream highlight (yellow) | `#fad000` |
| Timestamps and history | Comment/muted foreground | `#b362ff` |
| Links, replies, and card titles | Link/function/blue | `#9effff` |
| Joins | String/diff-added/green | `#a5ff90` |
| Parts and quits | Comment/muted foreground | `#b362ff` |
| Notices | Warning/yellow | `#fad000` |
| Actions | Special/magenta | `#b362ff` |
| Errors and kicks | Error/red | `#ec3a37` |
| Modes, nicks, topics, and server lines | Type/cyan | `#80ffbb` |
| Mention background | Search/Visual/selection | `#7d44b2` |
| Cards and reaction surfaces | Secondary editor surface | `#3b376e` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/Rigellute/shades-of-purple.vim](https://github.com/Rigellute/shades-of-purple.vim)
- Palette evidence: `colors/shades_of_purple.vim highlight groups`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
