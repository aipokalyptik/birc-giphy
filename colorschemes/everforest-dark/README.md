# Everforest Dark

A transcript-aware bIRC adaptation of [Everforest Dark](https://github.com/sainnhe/everforest).

![bIRC transcript preview of Everforest Dark](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#2d353b` |
| Ordinary text | Normal/editor foreground | `#d3c6aa` |
| Native accent | Principal upstream highlight (blue) | `#7fbbb3` |
| Timestamps and history | Comment/muted foreground | `#859289` |
| Links, replies, and card titles | Link/function/blue | `#7fbbb3` |
| Joins | String/diff-added/green | `#a7c080` |
| Parts and quits | Comment/muted foreground | `#859289` |
| Notices | Warning/yellow | `#dbbc7f` |
| Actions | Special/magenta | `#d699b6` |
| Errors and kicks | Error/red | `#e67e80` |
| Modes, nicks, topics, and server lines | Type/cyan | `#83c092` |
| Mention background | Search/Visual/selection | `#543a48` |
| Cards and reaction surfaces | Secondary editor surface | `#3d484d` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/sainnhe/everforest](https://github.com/sainnhe/everforest)
- Palette evidence: `colors/everforest.vim; medium dark`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
