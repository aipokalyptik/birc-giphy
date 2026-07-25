# Seoul256

A transcript-aware bIRC adaptation of [Seoul256](https://github.com/junegunn/seoul256.vim).

![bIRC transcript preview of Seoul256](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#3a3a3a` |
| Ordinary text | Normal/editor foreground | `#d0d0d0` |
| Native accent | Principal upstream highlight (blue) | `#85add4` |
| Timestamps and history | Comment/muted foreground | `#626262` |
| Links, replies, and card titles | Link/function/blue | `#85add4` |
| Joins | String/diff-added/green | `#5f865f` |
| Parts and quits | Comment/muted foreground | `#626262` |
| Notices | Warning/yellow | `#d8af5f` |
| Actions | Special/magenta | `#d7afaf` |
| Errors and kicks | Error/red | `#d68787` |
| Modes, nicks, topics, and server lines | Type/cyan | `#87afaf` |
| Mention background | Search/Visual/selection | `#005f5f` |
| Cards and reaction surfaces | Secondary editor surface | `#4e4e4e` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/junegunn/seoul256.vim](https://github.com/junegunn/seoul256.vim)
- Palette evidence: `iterm2/seoul256.itermcolors`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
