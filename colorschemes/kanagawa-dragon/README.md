# Kanagawa Dragon

A bIRC colorscheme adapted from [Kanagawa Dragon](https://github.com/rebelot/kanagawa.nvim).

![Approximate bIRC preview of Kanagawa Dragon](preview.svg)

The preview is illustrative: actual typography, spacing, and interface
chrome are controlled by bIRC. The three colors match the JSON exactly.

## Mapping

- Appearance: `dark`
- Background: `#181616`
- Text: `#c5c9c5`
- Accent: `#8ba4b0`
- Palette basis: Kanagawa Dragon dragonBlack3, dragonWhite, and dragonBlue.

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
