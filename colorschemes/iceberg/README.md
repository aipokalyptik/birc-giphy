# Iceberg

A bIRC colorscheme adapted from [Iceberg](https://github.com/cocopon/iceberg.vim).

![Approximate bIRC preview of Iceberg](preview.svg)

The preview is illustrative: actual typography, spacing, and interface
chrome are controlled by bIRC. The three colors match the JSON exactly.

## Mapping

- Appearance: `dark`
- Background: `#161821`
- Text: `#c6c8d1`
- Accent: `#84a0c6`
- Palette basis: Iceberg dark background, foreground, and blue.

The original editor theme has many syntax and interface colors. bIRC's
export format has one background, one text color, and one accent, so this
adaptation preserves the upstream Normal/editor canvas and chooses a
representative upstream highlight color for the accent.

## Upstream

- Canonical Vim/Neovim source: [https://github.com/cocopon/iceberg.vim](https://github.com/cocopon/iceberg.vim)
- Upstream license: `MIT`

The upstream project remains the authority for its name, palette, license,
variants, and current maintenance status. This directory contains only a
small interoperable palette adaptation, not upstream Vim or Neovim code.
