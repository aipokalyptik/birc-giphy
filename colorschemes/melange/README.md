# Mélange

A transcript-aware bIRC adaptation of [Mélange](https://github.com/savq/melange-nvim).

![bIRC transcript preview of Mélange](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#292522` |
| Ordinary text | Normal/editor foreground | `#ece1d7` |
| Native accent | Principal upstream highlight (blue) | `#7f91b2` |
| Timestamps and history | Comment/muted foreground | `#867462` |
| Links, replies, and card titles | Link/function/blue | `#7f91b2` |
| Joins | String/diff-added/green | `#78997a` |
| Parts and quits | Comment/muted foreground | `#867462` |
| Notices | Warning/yellow | `#e49b5d` |
| Actions | Special/magenta | `#b380b0` |
| Errors and kicks | Error/red | `#bd8183` |
| Modes, nicks, topics, and server lines | Type/cyan | `#7b9695` |
| Mention background | Search/Visual/selection | `#403a36` |
| Cards and reaction surfaces | Secondary editor surface | `#34302c` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/savq/melange-nvim](https://github.com/savq/melange-nvim)
- Palette evidence: `term/iterm2/melange_dark.itermcolors`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
