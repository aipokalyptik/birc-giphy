# VSCode Light+

A transcript-aware bIRC adaptation of [VSCode Light+](https://github.com/Mofiqul/vscode.nvim).

![bIRC transcript preview of VSCode Light+](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#ffffff` |
| Ordinary text | Normal/editor foreground | `#000000` |
| Native accent | Principal upstream highlight (blue) | `#0000ff` |
| Timestamps and history | Comment/muted foreground | `#008000` |
| Links, replies, and card titles | Link/function/blue | `#0000ff` |
| Joins | String/diff-added/green | `#008000` |
| Parts and quits | Comment/muted foreground | `#008000` |
| Notices | Warning/yellow | `#795e26` |
| Actions | Special/magenta | `#af00db` |
| Errors and kicks | Error/red | `#cd3131` |
| Modes, nicks, topics, and server lines | Type/cyan | `#267f99` |
| Mention background | Search/Visual/selection | `#add6ff` |
| Cards and reaction surfaces | Secondary editor surface | `#f3f3f3` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/Mofiqul/vscode.nvim](https://github.com/Mofiqul/vscode.nvim)
- Palette evidence: `lua/vscode/colors.lua light defaults`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
