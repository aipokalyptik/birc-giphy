# Solarized Light

A bIRC colorscheme adapted from [Solarized Light](https://github.com/altercation/vim-colors-solarized).

![Approximate bIRC preview of Solarized Light](preview.svg)

The preview is illustrative: actual typography, spacing, and interface
chrome are controlled by bIRC. The three colors match the JSON exactly.

## Mapping

- Appearance: `light`
- Background: `#fdf6e3`
- Text: `#657b83`
- Accent: `#268bd2`
- Palette basis: Solarized base3, base00, and blue.

The original editor theme has many syntax and interface colors. bIRC's
export format has one background, one text color, and one accent, so this
adaptation preserves the upstream Normal/editor canvas and chooses a
representative upstream highlight color for the accent.

## Upstream

- Canonical Vim/Neovim source: [https://github.com/altercation/vim-colors-solarized](https://github.com/altercation/vim-colors-solarized)
- Upstream license: `MIT`

The upstream project remains the authority for its name, palette, license,
variants, and current maintenance status. This directory contains only a
small interoperable palette adaptation, not upstream Vim or Neovim code.
