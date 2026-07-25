# Kanagawa Lotus

A bIRC colorscheme adapted from [Kanagawa Lotus](https://github.com/rebelot/kanagawa.nvim).

![Approximate bIRC preview of Kanagawa Lotus](preview.svg)

The preview is illustrative: actual typography, spacing, and interface
chrome are controlled by bIRC. The three colors match the JSON exactly.

## Mapping

- Appearance: `light`
- Background: `#f2ecbc`
- Text: `#545464`
- Accent: `#4d699b`
- Palette basis: Kanagawa Lotus lotusWhite3, lotusInk1, and lotusBlue4.

The original editor theme has many syntax and interface colors. bIRC's
export format has one background, one text color, and one accent, so this
adaptation preserves the upstream Normal/editor canvas and chooses a
representative upstream highlight color for the accent.

## Upstream

- Canonical Vim/Neovim source: [https://github.com/rebelot/kanagawa.nvim](https://github.com/rebelot/kanagawa.nvim)
- Upstream license: `MIT`

The upstream project remains the authority for its name, palette, license,
variants, and current maintenance status. This directory contains only a
small interoperable palette adaptation, not upstream Vim or Neovim code.
