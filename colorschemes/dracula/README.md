# Dracula

A transcript-aware bIRC adaptation of [Dracula](https://github.com/dracula/vim).

![bIRC transcript preview of Dracula](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#282a36` |
| Ordinary text | Normal/editor foreground | `#f8f8f2` |
| Native accent | Principal upstream highlight (magenta) | `#ff79c6` |
| Timestamps and history | Comment/muted foreground | `#6272a4` |
| Links, replies, and card titles | Link/function/blue | `#8be9fd` |
| Joins | String/diff-added/green | `#50fa7b` |
| Parts and quits | Comment/muted foreground | `#6272a4` |
| Notices | Warning/yellow | `#f1fa8c` |
| Actions | Special/magenta | `#ff79c6` |
| Errors and kicks | Error/red | `#ff5555` |
| Modes, nicks, topics, and server lines | Type/cyan | `#8be9fd` |
| Mention background | Search/Visual/selection | `#44475a` |
| Cards and reaction surfaces | Secondary editor surface | `#424450` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/dracula/vim](https://github.com/dracula/vim)
- Palette evidence: `colors/dracula.vim highlight groups`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
