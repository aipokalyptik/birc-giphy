# Oxocarbon Light

A transcript-aware bIRC adaptation of [Oxocarbon Light](https://github.com/nyoom-engineering/oxocarbon.nvim).

![bIRC transcript preview of Oxocarbon Light](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#f2f4f8` |
| Ordinary text | Normal/editor foreground | `#161616` |
| Native accent | Principal upstream highlight (blue) | `#0f62fe` |
| Timestamps and history | Comment/muted foreground | `#525252` |
| Links, replies, and card titles | Link/function/blue | `#0f62fe` |
| Joins | String/diff-added/green | `#42be65` |
| Parts and quits | Comment/muted foreground | `#525252` |
| Notices | Warning/yellow | `#da1e28` |
| Actions | Special/magenta | `#8a3ffc` |
| Errors and kicks | Error/red | `#da1e28` |
| Modes, nicks, topics, and server lines | Type/cyan | `#1192e8` |
| Mention background | Search/Visual/selection | `#d0e2ff` |
| Cards and reaction surfaces | Secondary editor surface | `#dde1e6` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/nyoom-engineering/oxocarbon.nvim](https://github.com/nyoom-engineering/oxocarbon.nvim)
- Palette evidence: `fnl/oxocarbon/init.fnl light palette and warning highlight`
- Upstream license: `MPL-2.0`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
