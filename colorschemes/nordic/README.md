# Nordic

A transcript-aware bIRC adaptation of [Nordic](https://github.com/AlexvZyl/nordic.nvim).

![bIRC transcript preview of Nordic](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#242933` |
| Ordinary text | Normal/editor foreground | `#c0c8d8` |
| Native accent | Principal upstream highlight (blue) | `#5e81ac` |
| Timestamps and history | Comment/muted foreground | `#4c566a` |
| Links, replies, and card titles | Link/function/blue | `#5e81ac` |
| Joins | String/diff-added/green | `#a3be8c` |
| Parts and quits | Comment/muted foreground | `#4c566a` |
| Notices | Warning/yellow | `#ebcb8b` |
| Actions | Special/magenta | `#b48ead` |
| Errors and kicks | Error/red | `#bf616a` |
| Modes, nicks, topics, and server lines | Type/cyan | `#8fbcbb` |
| Mention background | Search/Visual/selection | `#3b4252` |
| Cards and reaction surfaces | Secondary editor surface | `#191d24` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/AlexvZyl/nordic.nvim](https://github.com/AlexvZyl/nordic.nvim)
- Palette evidence: `assets/palette.toml and platforms/iTerm2/nordic.itermcolors`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
