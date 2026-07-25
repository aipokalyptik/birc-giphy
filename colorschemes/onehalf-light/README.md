# One Half Light

A transcript-aware bIRC adaptation of [One Half Light](https://github.com/sonph/onehalf).

![bIRC transcript preview of One Half Light](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#fafafa` |
| Ordinary text | Normal/editor foreground | `#383a42` |
| Native accent | Principal upstream highlight (blue) | `#0184bc` |
| Timestamps and history | Comment/muted foreground | `#a0a1a7` |
| Links, replies, and card titles | Link/function/blue | `#0184bc` |
| Joins | String/diff-added/green | `#50a14f` |
| Parts and quits | Comment/muted foreground | `#a0a1a7` |
| Notices | Warning/yellow | `#c18401` |
| Actions | Special/magenta | `#a626a4` |
| Errors and kicks | Error/red | `#e45649` |
| Modes, nicks, topics, and server lines | Type/cyan | `#0997b3` |
| Mention background | Search/Visual/selection | `#bfceff` |
| Cards and reaction surfaces | Secondary editor surface | `#f0f0f0` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/sonph/onehalf](https://github.com/sonph/onehalf)
- Palette evidence: `iterm/OneHalfLight.itermcolors`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
