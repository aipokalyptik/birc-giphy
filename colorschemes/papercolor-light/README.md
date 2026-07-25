# PaperColor Light

A transcript-aware bIRC adaptation of [PaperColor Light](https://github.com/NLKNguyen/papercolor-theme).

![bIRC transcript preview of PaperColor Light](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#eeeeee` |
| Ordinary text | Normal/editor foreground | `#444444` |
| Native accent | Principal upstream highlight (blue) | `#0087af` |
| Timestamps and history | Comment/muted foreground | `#878787` |
| Links, replies, and card titles | Link/function/blue | `#0087af` |
| Joins | String/diff-added/green | `#5f8700` |
| Parts and quits | Comment/muted foreground | `#878787` |
| Notices | Warning/yellow | `#d70087` |
| Actions | Special/magenta | `#d70087` |
| Errors and kicks | Error/red | `#d70000` |
| Modes, nicks, topics, and server lines | Type/cyan | `#005f87` |
| Mention background | Search/Visual/selection | `#ffff5f` |
| Cards and reaction surfaces | Secondary editor surface | `#e4e4e4` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/NLKNguyen/papercolor-theme](https://github.com/NLKNguyen/papercolor-theme)
- Palette evidence: `colors/PaperColor.vim; background=light`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
