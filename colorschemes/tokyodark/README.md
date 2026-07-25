# Tokyo Dark

A transcript-aware bIRC adaptation of [Tokyo Dark](https://github.com/tiagovla/tokyodark.nvim).

![bIRC transcript preview of Tokyo Dark](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#11121d` |
| Ordinary text | Normal/editor foreground | `#a0a8cd` |
| Native accent | Principal upstream highlight (blue) | `#7199ee` |
| Timestamps and history | Comment/muted foreground | `#4a5057` |
| Links, replies, and card titles | Link/function/blue | `#7199ee` |
| Joins | String/diff-added/green | `#95c561` |
| Parts and quits | Comment/muted foreground | `#4a5057` |
| Notices | Warning/yellow | `#d7a65f` |
| Actions | Special/magenta | `#a485dd` |
| Errors and kicks | Error/red | `#ee6d85` |
| Modes, nicks, topics, and server lines | Type/cyan | `#38a89d` |
| Mention background | Search/Visual/selection | `#25283b` |
| Cards and reaction surfaces | Secondary editor surface | `#06080a` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/tiagovla/tokyodark.nvim](https://github.com/tiagovla/tokyodark.nvim)
- Palette evidence: `lua/tokyodark/palette.lua and extra/iTerm2/tokyodark.itermcolors`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
