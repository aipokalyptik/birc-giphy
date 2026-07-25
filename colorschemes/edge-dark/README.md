# Edge Dark

A bIRC colorscheme adapted from [Edge Dark](https://github.com/sainnhe/edge).

![Approximate bIRC preview of Edge Dark](preview.svg)

The preview is illustrative: actual typography, spacing, and interface
chrome are controlled by bIRC. The three colors match the JSON exactly.

## Mapping

- Appearance: `dark`
- Background: `#2c2e34`
- Text: `#c5cdd9`
- Accent: `#73b3e7`
- Palette basis: Edge default dark background, foreground, and blue.

The original editor theme has many syntax and interface colors. bIRC's
export format has one background, one text color, and one accent, so this
adaptation preserves the upstream Normal/editor canvas and chooses a
representative upstream highlight color for the accent.

## Upstream

- Canonical Vim/Neovim source: [https://github.com/sainnhe/edge](https://github.com/sainnhe/edge)
- Upstream license: `MIT`

The upstream project remains the authority for its name, palette, license,
variants, and current maintenance status. This directory contains only a
small interoperable palette adaptation, not upstream Vim or Neovim code.
