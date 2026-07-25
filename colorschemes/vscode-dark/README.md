# VSCode Dark+

A transcript-aware bIRC adaptation of [VSCode Dark+](https://github.com/Mofiqul/vscode.nvim).

![bIRC transcript preview of VSCode Dark+](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#1e1e1e` |
| Ordinary text | Normal/editor foreground | `#d4d4d4` |
| Native accent | Principal upstream highlight (blue) | `#569cd6` |
| Timestamps and history | Comment/muted foreground | `#808080` |
| Links, replies, and card titles | Link/function/blue | `#569cd6` |
| Joins | String/diff-added/green | `#6a9955` |
| Parts and quits | Comment/muted foreground | `#808080` |
| Notices | Warning/yellow | `#dcdcaa` |
| Actions | Special/magenta | `#c586c0` |
| Errors and kicks | Error/red | `#f44747` |
| Modes, nicks, topics, and server lines | Type/cyan | `#4ec9b0` |
| Mention background | Search/Visual/selection | `#264f78` |
| Cards and reaction surfaces | Secondary editor surface | `#252526` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/Mofiqul/vscode.nvim](https://github.com/Mofiqul/vscode.nvim)
- Palette evidence: `lua/vscode/colors.lua dark defaults`
- Upstream license: `MIT`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
