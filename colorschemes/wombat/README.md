# Wombat

A transcript-aware bIRC adaptation of [Wombat](https://github.com/vim/colorschemes).

![bIRC transcript preview of Wombat](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#242424` |
| Ordinary text | Normal/editor foreground | `#f6f3e8` |
| Native accent | Principal upstream highlight (blue) | `#8ac6f2` |
| Timestamps and history | Comment/muted foreground | `#99968b` |
| Links, replies, and card titles | Link/function/blue | `#8ac6f2` |
| Joins | String/diff-added/green | `#95e454` |
| Parts and quits | Comment/muted foreground | `#99968b` |
| Notices | Warning/yellow | `#cae682` |
| Actions | Special/magenta | `#f2c68a` |
| Errors and kicks | Error/red | `#e5786d` |
| Modes, nicks, topics, and server lines | Type/cyan | `#8ac6f2` |
| Mention background | Search/Visual/selection | `#554d4b` |
| Cards and reaction surfaces | Secondary editor surface | `#444444` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/vim/colorschemes](https://github.com/vim/colorschemes)
- Palette evidence: `legacy Wombat palette represented by Vim colorscheme collection`
- Upstream license: `Vim License`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
