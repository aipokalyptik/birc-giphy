# Ayu Dark

A bIRC colorscheme adapted from [Ayu Dark](https://github.com/ayu-theme/ayu-vim).

![Approximate bIRC preview of Ayu Dark](preview.svg)

The preview is illustrative: actual typography, spacing, and interface
chrome are controlled by bIRC. The three colors match the JSON exactly.

## Mapping

- Appearance: `dark`
- Background: `#0a0e14`
- Text: `#b3b1ad`
- Accent: `#ffb454`
- Palette basis: Ayu Dark background, foreground, and orange.

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
