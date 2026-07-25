# GitHub Light

A transcript-aware bIRC adaptation of [GitHub Light](https://github.com/projekt0n/github-nvim-theme).

![bIRC transcript preview of GitHub Light](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#ffffff` |
| Ordinary text | Normal/editor foreground | `#24292f` |
| Native accent | Principal upstream highlight (blue) | `#0969da` |
| Timestamps and history | Comment/muted foreground | `#57606a` |
| Links, replies, and card titles | Link/function/blue | `#0969da` |
| Joins | String/diff-added/green | `#116329` |
| Parts and quits | Comment/muted foreground | `#57606a` |
| Notices | Warning/yellow | `#9a6700` |
| Actions | Special/magenta | `#8250df` |
| Errors and kicks | Error/red | `#cf222e` |
| Modes, nicks, topics, and server lines | Type/cyan | `#1b7c83` |
| Mention background | Search/Visual/selection | `#ddf4ff` |
| Cards and reaction surfaces | Secondary editor surface | `#f6f8fa` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/projekt0n/github-nvim-theme](https://github.com/projekt0n/github-nvim-theme)
- Palette evidence: `lua/github-theme/palette.lua light defaults`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
