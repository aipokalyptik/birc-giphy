# Base16 Default Dark

A bIRC colorscheme adapted from [Base16 Default Dark](https://github.com/chriskempson/base16-vim).

![Approximate bIRC preview of Base16 Default Dark](preview.svg)

The preview is illustrative: actual typography, spacing, and interface
chrome are controlled by bIRC. The three colors match the JSON exactly.

## Mapping

- Appearance: `dark`
- Background: `#181818`
- Text: `#d8d8d8`
- Accent: `#7cafc2`
- Palette basis: Base16 Default Dark base00, base05, and base0D.

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
