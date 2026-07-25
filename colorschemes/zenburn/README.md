# Zenburn

A transcript-aware bIRC adaptation of [Zenburn](https://github.com/jnurmine/Zenburn).

![bIRC transcript preview of Zenburn](preview.svg)

The SVG is generated from the same semantic palette and CSS embedded in
the import file. It demonstrates transcript states rather than imitating
bIRC's native window chrome.

## Semantic mapping

| bIRC transcript role | Upstream intent | Color |
| --- | --- | --- |
| Canvas | Normal/editor background | `#3f3f3f` |
| Ordinary text | Normal/editor foreground | `#dcdccc` |
| Native accent | Principal upstream highlight (blue) | `#8cd0d3` |
| Timestamps and history | Comment/muted foreground | `#7f9f7f` |
| Links, replies, and card titles | Link/function/blue | `#8cd0d3` |
| Joins | String/diff-added/green | `#7f9f7f` |
| Parts and quits | Comment/muted foreground | `#7f9f7f` |
| Notices | Warning/yellow | `#f0dfaf` |
| Actions | Special/magenta | `#dc8cc3` |
| Errors and kicks | Error/red | `#cc9393` |
| Modes, nicks, topics, and server lines | Type/cyan | `#93e0e3` |
| Mention background | Search/Visual/selection | `#2f2f2f` |
| Cards and reaction surfaces | Secondary editor surface | `#4f4f4f` |

The native JSON fields retain the upstream canvas, foreground, principal
accent, and light/dark appearance. `customCSS` supplies the additional
transcript distinctions using only selectors and visual properties listed
in bIRC's Custom transcript CSS documentation.

## Upstream evidence

- Canonical Vim/Neovim source: [https://github.com/jnurmine/Zenburn](https://github.com/jnurmine/Zenburn)
- Palette evidence: `colors/zenburn.vim palette`
- Upstream license: `GPL-2.0`

The upstream project remains authoritative for its palette, variants,
name, and license. This adaptation contains independently generated bIRC
configuration and preview data, not copied Vim or Neovim implementation
code.
