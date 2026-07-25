# PaperColor Dark

A transcript-aware bIRC adaptation of [PaperColor Dark](https://github.com/NLKNguyen/papercolor-theme).

![bIRC transcript preview of PaperColor Dark](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#1c1c1c` |
| Ordinary text | Normal/editor foreground | `#d0d0d0` |
| Native accent | Principal upstream highlight (blue) | `#5fafd7` |
| Timestamps and history | Comment/muted foreground | `#808080` |
| Links, replies, and card titles | Link/function/blue | `#5fafd7` |
| Joins | String/diff-added/green | `#afd700` |
| Parts and quits | Comment/muted foreground | `#808080` |
| Notices | Warning/yellow | `#d7af5f` |
| Actions | Special/magenta | `#d787af` |
| Errors and kicks | Error/red | `#d75f5f` |
| Modes, nicks, topics, and server lines | Type/cyan | `#00afaf` |
| Mention background | Search/Visual/selection | `#8787af` |
| Cards and reaction surfaces | Secondary editor surface | `#303030` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/NLKNguyen/papercolor-theme](https://github.com/NLKNguyen/papercolor-theme)
- Palette evidence: `colors/PaperColor.vim; background=dark`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
