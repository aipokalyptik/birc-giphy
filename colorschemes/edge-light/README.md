# Edge Light

A transcript-aware bIRC adaptation of [Edge Light](https://github.com/sainnhe/edge).

![bIRC transcript preview of Edge Light](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#fafafa` |
| Ordinary text | Normal/editor foreground | `#4b505b` |
| Native accent | Principal upstream highlight (blue) | `#5079be` |
| Timestamps and history | Comment/muted foreground | `#8790a0` |
| Links, replies, and card titles | Link/function/blue | `#5079be` |
| Joins | String/diff-added/green | `#608e32` |
| Parts and quits | Comment/muted foreground | `#8790a0` |
| Notices | Warning/yellow | `#be7e05` |
| Actions | Special/magenta | `#b05ccc` |
| Errors and kicks | Error/red | `#d05858` |
| Modes, nicks, topics, and server lines | Type/cyan | `#3a8b84` |
| Mention background | Search/Visual/selection | `#e8ebf0` |
| Cards and reaction surfaces | Secondary editor surface | `#e8ebf0` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/sainnhe/edge](https://github.com/sainnhe/edge)
- Palette evidence: `colors/edge.vim default light`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
