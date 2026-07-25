# Oxocarbon Light

A bIRC colorscheme adapted from [Oxocarbon Light](https://github.com/nyoom-engineering/oxocarbon.nvim).

![Approximate bIRC preview of Oxocarbon Light](preview.svg)

The preview is illustrative: actual typography, spacing, and interface
chrome are controlled by bIRC. The three colors match the JSON exactly.

## Mapping

- Appearance: `light`
- Background: `#f2f4f8`
- Text: `#161616`
- Accent: `#0f62fe`
- Palette basis: Oxocarbon light background, foreground, and blue.

The original editor theme has many syntax and interface colors. bIRC's
export format has one background, one text color, and one accent, so this
adaptation preserves the upstream Normal/editor canvas and chooses a
representative upstream highlight color for the accent.

## Upstream

- Canonical Vim/Neovim source: [https://github.com/nyoom-engineering/oxocarbon.nvim](https://github.com/nyoom-engineering/oxocarbon.nvim)
- Upstream license: `MPL-2.0`

The upstream project remains the authority for its name, palette, license,
variants, and current maintenance status. This directory contains only a
small interoperable palette adaptation, not upstream Vim or Neovim code.
