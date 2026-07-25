# Palenight

A bIRC colorscheme adapted from [Palenight](https://github.com/drewtempelmeyer/palenight.vim).

![Approximate bIRC preview of Palenight](preview.svg)

The preview is illustrative: actual typography, spacing, and interface
chrome are controlled by bIRC. The three colors match the JSON exactly.

## Mapping

- Appearance: `dark`
- Background: `#292d3e`
- Text: `#a6accd`
- Accent: `#c792ea`
- Palette basis: Palenight background, foreground, and purple.

The original editor theme has many syntax and interface colors. bIRC's
export format has one background, one text color, and one accent, so this
adaptation preserves the upstream Normal/editor canvas and chooses a
representative upstream highlight color for the accent.

## Upstream

- Canonical Vim/Neovim source: [https://github.com/drewtempelmeyer/palenight.vim](https://github.com/drewtempelmeyer/palenight.vim)
- Upstream license: `MIT`

The upstream project remains the authority for its name, palette, license,
variants, and current maintenance status. This directory contains only a
small interoperable palette adaptation, not upstream Vim or Neovim code.
