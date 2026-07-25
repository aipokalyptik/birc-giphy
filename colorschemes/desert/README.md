# Desert

A transcript-aware bIRC adaptation of [Desert](https://github.com/vim/colorschemes).

![bIRC transcript preview of Desert](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#333333` |
| Ordinary text | Normal/editor foreground | `#ffffff` |
| Native accent | Principal upstream highlight (blue) | `#75a0ff` |
| Timestamps and history | Comment/muted foreground | `#6dceeb` |
| Links, replies, and card titles | Link/function/blue | `#75a0ff` |
| Joins | String/diff-added/green | `#89fb98` |
| Parts and quits | Comment/muted foreground | `#6dceeb` |
| Notices | Warning/yellow | `#f0e68c` |
| Actions | Special/magenta | `#ffde9b` |
| Errors and kicks | Error/red | `#ff0000` |
| Modes, nicks, topics, and server lines | Type/cyan | `#6dceeb` |
| Mention background | Search/Visual/selection | `#6b8e24` |
| Cards and reaction surfaces | Secondary editor surface | `#4d4d4d` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/vim/colorschemes](https://github.com/vim/colorschemes)
- Palette evidence: `colors/desert.vim highlight groups`
- Upstream license: `Vim License`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
