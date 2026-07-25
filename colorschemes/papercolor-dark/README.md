# PaperColor Dark

A bIRC colorscheme adapted from [PaperColor Dark](https://github.com/NLKNguyen/papercolor-theme).

![Approximate bIRC preview of PaperColor Dark](preview.svg)

The preview is illustrative: actual typography, spacing, and interface
chrome are controlled by bIRC. The three colors match the JSON exactly.

## Mapping

- Appearance: `dark`
- Background: `#1c1c1c`
- Text: `#d0d0d0`
- Accent: `#5fafd7`
- Palette basis: PaperColor dark background, foreground, and blue.

The original editor theme has many syntax and interface colors. bIRC's
export format has one background, one text color, and one accent, so this
adaptation preserves the upstream Normal/editor canvas and chooses a
representative upstream highlight color for the accent.

## Upstream

- Canonical Vim/Neovim source: [https://github.com/NLKNguyen/papercolor-theme](https://github.com/NLKNguyen/papercolor-theme)
- Upstream license: `MIT`

The upstream project remains the authority for its name, palette, license,
variants, and current maintenance status. This directory contains only a
small interoperable palette adaptation, not upstream Vim or Neovim code.
