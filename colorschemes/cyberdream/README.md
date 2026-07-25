# Cyberdream

A transcript-aware bIRC adaptation of [Cyberdream](https://github.com/scottmckendry/cyberdream.nvim).

![bIRC transcript preview of Cyberdream](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#16181a` |
| Ordinary text | Normal/editor foreground | `#ffffff` |
| Native accent | Principal upstream highlight (blue) | `#5ea1ff` |
| Timestamps and history | Comment/muted foreground | `#7b8496` |
| Links, replies, and card titles | Link/function/blue | `#5ea1ff` |
| Joins | String/diff-added/green | `#5eff6c` |
| Parts and quits | Comment/muted foreground | `#7b8496` |
| Notices | Warning/yellow | `#f1ff5e` |
| Actions | Special/magenta | `#bd5eff` |
| Errors and kicks | Error/red | `#ff6e5e` |
| Modes, nicks, topics, and server lines | Type/cyan | `#5ef1ff` |
| Mention background | Search/Visual/selection | `#3c4048` |
| Cards and reaction surfaces | Secondary editor surface | `#26292b` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/scottmckendry/cyberdream.nvim](https://github.com/scottmckendry/cyberdream.nvim)
- Palette evidence: `extras/iterm2/cyberdream.itermcolors`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
