# Jellybeans

A bIRC colorscheme adapted from [Jellybeans](https://github.com/nanotech/jellybeans.vim).

![Approximate bIRC preview of Jellybeans](preview.svg)

The preview is illustrative: actual typography, spacing, and interface
chrome are controlled by bIRC. The three colors match the JSON exactly.

## Mapping

- Appearance: `dark`
- Background: `#151515`
- Text: `#e8e8d3`
- Accent: `#8197bf`
- Palette basis: Jellybeans background, foreground, and blue.

The original editor theme has many syntax and interface colors. bIRC's
export format has one background, one text color, and one accent, so this
adaptation preserves the upstream Normal/editor canvas and chooses a
representative upstream highlight color for the accent.

## Upstream

- Canonical Vim/Neovim source: [https://github.com/nanotech/jellybeans.vim](https://github.com/nanotech/jellybeans.vim)
- Upstream license: `MIT`

The upstream project remains the authority for its name, palette, license,
variants, and current maintenance status. This directory contains only a
small interoperable palette adaptation, not upstream Vim or Neovim code.
