# Tokyo Night Day

A bIRC colorscheme adapted from [Tokyo Night Day](https://github.com/folke/tokyonight.nvim).

![Approximate bIRC preview of Tokyo Night Day](preview.svg)

The preview is illustrative: actual typography, spacing, and interface
chrome are controlled by bIRC. The three colors match the JSON exactly.

## Mapping

- Appearance: `light`
- Background: `#e1e2e7`
- Text: `#3760bf`
- Accent: `#2e7de9`
- Palette basis: Tokyo Night Day background, foreground, and blue.

The original editor theme has many syntax and interface colors. bIRC's
export format has one background, one text color, and one accent, so this
adaptation preserves the upstream Normal/editor canvas and chooses a
representative upstream highlight color for the accent.

## Upstream

- Canonical Vim/Neovim source: [https://github.com/folke/tokyonight.nvim](https://github.com/folke/tokyonight.nvim)
- Upstream license: `Apache-2.0`

The upstream project remains the authority for its name, palette, license,
variants, and current maintenance status. This directory contains only a
small interoperable palette adaptation, not upstream Vim or Neovim code.
