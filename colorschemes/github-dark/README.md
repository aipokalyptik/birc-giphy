# GitHub Dark

A transcript-aware bIRC adaptation of [GitHub Dark](https://github.com/projekt0n/github-nvim-theme).

![bIRC transcript preview of GitHub Dark](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#0d1117` |
| Ordinary text | Normal/editor foreground | `#c9d1d9` |
| Native accent | Principal upstream highlight (blue) | `#58a6ff` |
| Timestamps and history | Comment/muted foreground | `#8b949e` |
| Links, replies, and card titles | Link/function/blue | `#58a6ff` |
| Joins | String/diff-added/green | `#7ee787` |
| Parts and quits | Comment/muted foreground | `#8b949e` |
| Notices | Warning/yellow | `#d29922` |
| Actions | Special/magenta | `#d2a8ff` |
| Errors and kicks | Error/red | `#ff7b72` |
| Modes, nicks, topics, and server lines | Type/cyan | `#a5d6ff` |
| Mention background | Search/Visual/selection | `#264f78` |
| Cards and reaction surfaces | Secondary editor surface | `#161b22` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/projekt0n/github-nvim-theme](https://github.com/projekt0n/github-nvim-theme)
- Palette evidence: `lua/github-theme/palette.lua dark defaults`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
