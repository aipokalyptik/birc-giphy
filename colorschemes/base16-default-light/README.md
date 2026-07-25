# Base16 Default Light

A transcript-aware bIRC adaptation of [Base16 Default Light](https://github.com/chriskempson/base16-vim).

![bIRC transcript preview of Base16 Default Light](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#f8f8f8` |
| Ordinary text | Normal/editor foreground | `#383838` |
| Native accent | Principal upstream highlight (blue) | `#397e96` |
| Timestamps and history | Comment/muted foreground | `#a0a0a0` |
| Links, replies, and card titles | Link/function/blue | `#397e96` |
| Joins | String/diff-added/green | `#5f7d2d` |
| Parts and quits | Comment/muted foreground | `#a0a0a0` |
| Notices | Warning/yellow | `#ab4642` |
| Actions | Special/magenta | `#8f5b89` |
| Errors and kicks | Error/red | `#ab4642` |
| Modes, nicks, topics, and server lines | Type/cyan | `#397f78` |
| Mention background | Search/Visual/selection | `#d8d8d8` |
| Cards and reaction surfaces | Secondary editor surface | `#e8e8e8` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/chriskempson/base16-vim](https://github.com/chriskempson/base16-vim)
- Palette evidence: `colors/base16-default-light.vim WarningMsg and semantic groups`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
