# Gruvbox Light

A transcript-aware bIRC adaptation of [Gruvbox Light](https://github.com/morhetz/gruvbox).

![bIRC transcript preview of Gruvbox Light](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#fbf1c7` |
| Ordinary text | Normal/editor foreground | `#3c3836` |
| Native accent | Principal upstream highlight (yellow) | `#b57614` |
| Timestamps and history | Comment/muted foreground | `#928374` |
| Links, replies, and card titles | Link/function/blue | `#076678` |
| Joins | String/diff-added/green | `#79740e` |
| Parts and quits | Comment/muted foreground | `#928374` |
| Notices | Warning/yellow | `#b57614` |
| Actions | Special/magenta | `#8f3f71` |
| Errors and kicks | Error/red | `#9d0006` |
| Modes, nicks, topics, and server lines | Type/cyan | `#427b58` |
| Mention background | Search/Visual/selection | `#bdae93` |
| Cards and reaction surfaces | Secondary editor surface | `#ebdbb2` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/morhetz/gruvbox](https://github.com/morhetz/gruvbox)
- Palette evidence: `colors/gruvbox.vim; background=light`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
