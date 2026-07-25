# Seoul256

A bIRC colorscheme adapted from [Seoul256](https://github.com/junegunn/seoul256.vim).

![Approximate bIRC preview of Seoul256](preview.svg)

The preview is illustrative: actual typography, spacing, and interface
chrome are controlled by bIRC. The three colors match the JSON exactly.

## Mapping

- Appearance: `dark`
- Background: `#3a3a3a`
- Text: `#d0d0d0`
- Accent: `#87afaf`
- Palette basis: Seoul256 dark background, foreground, and cyan.

The original editor theme has many syntax and interface colors. bIRC's
export format has one background, one text color, and one accent, so this
adaptation preserves the upstream Normal/editor canvas and chooses a
representative upstream highlight color for the accent.

## Upstream

- Canonical Vim/Neovim source: [https://github.com/junegunn/seoul256.vim](https://github.com/junegunn/seoul256.vim)
- Upstream license: `MIT`

The upstream project remains the authority for its name, palette, license,
variants, and current maintenance status. This directory contains only a
small interoperable palette adaptation, not upstream Vim or Neovim code.
