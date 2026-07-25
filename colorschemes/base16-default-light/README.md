# Base16 Default Light

A bIRC colorscheme adapted from [Base16 Default Light](https://github.com/chriskempson/base16-vim).

![Approximate bIRC preview of Base16 Default Light](preview.svg)

The preview is illustrative: actual typography, spacing, and interface
chrome are controlled by bIRC. The three colors match the JSON exactly.

## Mapping

- Appearance: `light`
- Background: `#f8f8f8`
- Text: `#383838`
- Accent: `#7cafc2`
- Palette basis: Base16 Default Light base07, base02, and base0D.

The original editor theme has many syntax and interface colors. bIRC's
export format has one background, one text color, and one accent, so this
adaptation preserves the upstream Normal/editor canvas and chooses a
representative upstream highlight color for the accent.

## Upstream

- Canonical Vim/Neovim source: [https://github.com/chriskempson/base16-vim](https://github.com/chriskempson/base16-vim)
- Upstream license: `MIT`

The upstream project remains the authority for its name, palette, license,
variants, and current maintenance status. This directory contains only a
small interoperable palette adaptation, not upstream Vim or Neovim code.
