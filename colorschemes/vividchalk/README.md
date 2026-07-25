# Vividchalk

A bIRC colorscheme adapted from [Vividchalk](https://github.com/tpope/vim-vividchalk).

![Approximate bIRC preview of Vividchalk](preview.svg)

The preview is illustrative: actual typography, spacing, and interface
chrome are controlled by bIRC. The three colors match the JSON exactly.

## Mapping

- Appearance: `dark`
- Background: `#000000`
- Text: `#eeeeee`
- Accent: `#ffcc00`
- Palette basis: Vividchalk Normal background, foreground, and Identifier yellow.

The original editor theme has many syntax and interface colors. bIRC's
export format has one background, one text color, and one accent, so this
adaptation preserves the upstream Normal/editor canvas and chooses a
representative upstream highlight color for the accent.

## Upstream

- Canonical Vim/Neovim source: [https://github.com/tpope/vim-vividchalk](https://github.com/tpope/vim-vividchalk)
- Upstream license: `Vim License`

The upstream project remains the authority for its name, palette, license,
variants, and current maintenance status. This directory contains only a
small interoperable palette adaptation, not upstream Vim or Neovim code.
