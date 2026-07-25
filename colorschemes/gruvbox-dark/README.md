# Gruvbox Dark

A transcript-aware bIRC adaptation of [Gruvbox Dark](https://github.com/morhetz/gruvbox).

![bIRC transcript preview of Gruvbox Dark](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#282828` |
| Ordinary text | Normal/editor foreground | `#ebdbb2` |
| Native accent | Principal upstream highlight (yellow) | `#fabd2f` |
| Timestamps and history | Comment/muted foreground | `#928374` |
| Links, replies, and card titles | Link/function/blue | `#83a598` |
| Joins | String/diff-added/green | `#b8bb26` |
| Parts and quits | Comment/muted foreground | `#928374` |
| Notices | Warning/yellow | `#fabd2f` |
| Actions | Special/magenta | `#d3869b` |
| Errors and kicks | Error/red | `#fb4934` |
| Modes, nicks, topics, and server lines | Type/cyan | `#8ec07c` |
| Mention background | Search/Visual/selection | `#665c54` |
| Cards and reaction surfaces | Secondary editor surface | `#3c3836` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/morhetz/gruvbox](https://github.com/morhetz/gruvbox)
- Palette evidence: `colors/gruvbox.vim; background=dark`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
