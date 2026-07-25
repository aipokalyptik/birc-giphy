# Ayu Mirage

A transcript-aware bIRC adaptation of [Ayu Mirage](https://github.com/ayu-theme/ayu-vim).

![bIRC transcript preview of Ayu Mirage](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#191d26` |
| Ordinary text | Normal/editor foreground | `#d0cec3` |
| Native accent | Principal upstream highlight (blue) | `#2d91d0` |
| Timestamps and history | Comment/muted foreground | `#555555` |
| Links, replies, and card titles | Link/function/blue | `#2d91d0` |
| Joins | String/diff-added/green | `#ade46b` |
| Parts and quits | Comment/muted foreground | `#555555` |
| Notices | Warning/yellow | `#fec254` |
| Actions | Special/magenta | `#c9aeff` |
| Errors and kicks | Error/red | `#ea5965` |
| Modes, nicks, topics, and server lines | Type/cyan | `#86e2bf` |
| Mention background | Search/Visual/selection | `#252d37` |
| Cards and reaction surfaces | Secondary editor surface | `#252d37` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/ayu-theme/ayu-vim](https://github.com/ayu-theme/ayu-vim)
- Palette evidence: `term/ayu-mirage.itermcolors`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
