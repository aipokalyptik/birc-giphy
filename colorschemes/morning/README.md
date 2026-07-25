# Morning

A transcript-aware bIRC adaptation of [Morning](https://github.com/vim/colorschemes).

![bIRC transcript preview of Morning](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#e4e4e4` |
| Ordinary text | Normal/editor foreground | `#000000` |
| Native accent | Principal upstream highlight (blue) | `#0000ff` |
| Timestamps and history | Comment/muted foreground | `#0000ff` |
| Links, replies, and card titles | Link/function/blue | `#0000ff` |
| Joins | String/diff-added/green | `#2e8b57` |
| Parts and quits | Comment/muted foreground | `#0000ff` |
| Notices | Warning/yellow | `#a52a2a` |
| Actions | Special/magenta | `#6a0dad` |
| Errors and kicks | Error/red | `#ff0000` |
| Modes, nicks, topics, and server lines | Type/cyan | `#008787` |
| Mention background | Search/Visual/selection | `#d0d0d0` |
| Cards and reaction surfaces | Secondary editor surface | `#d0d0d0` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/vim/colorschemes](https://github.com/vim/colorschemes)
- Palette evidence: `colors/morning.vim highlight groups`
- Upstream license: `Vim License`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
