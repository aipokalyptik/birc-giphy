# Ayu Mirage

A bIRC colorscheme adapted from [Ayu Mirage](https://github.com/ayu-theme/ayu-vim).

![Approximate bIRC preview of Ayu Mirage](preview.svg)

The preview is illustrative: actual typography, spacing, and interface
chrome are controlled by bIRC. The three colors match the JSON exactly.

## Mapping

- Appearance: `dark`
- Background: `#1f2430`
- Text: `#cbccc6`
- Accent: `#ffcc66`
- Palette basis: Ayu Mirage background, foreground, and yellow.

The original editor theme has many syntax and interface colors. bIRC's
export format has one background, one text color, and one accent, so this
adaptation preserves the upstream Normal/editor canvas and chooses a
representative upstream highlight color for the accent.

## Upstream

- Canonical Vim/Neovim source: [https://github.com/ayu-theme/ayu-vim](https://github.com/ayu-theme/ayu-vim)
- Upstream license: `MIT`

The upstream project remains the authority for its name, palette, license,
variants, and current maintenance status. This directory contains only a
small interoperable palette adaptation, not upstream Vim or Neovim code.
