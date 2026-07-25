# Ayu Dark

A transcript-aware bIRC adaptation of [Ayu Dark](https://github.com/ayu-theme/ayu-vim).

![bIRC transcript preview of Ayu Dark](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#0d1013` |
| Ordinary text | Normal/editor foreground | `#e0dac4` |
| Native accent | Principal upstream highlight (blue) | `#2d91d0` |
| Timestamps and history | Comment/muted foreground | `#555555` |
| Links, replies, and card titles | Link/function/blue | `#2d91d0` |
| Joins | String/diff-added/green | `#aac441` |
| Parts and quits | Comment/muted foreground | `#555555` |
| Notices | Warning/yellow | `#fda543` |
| Actions | Special/magenta | `#bb00bb` |
| Errors and kicks | Error/red | `#fc6028` |
| Modes, nicks, topics, and server lines | Type/cyan | `#86e2bf` |
| Mention background | Search/Visual/selection | `#1c2631` |
| Cards and reaction surfaces | Secondary editor surface | `#1c2631` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/ayu-theme/ayu-vim](https://github.com/ayu-theme/ayu-vim)
- Palette evidence: `term/ayu-dark.itermcolors`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
