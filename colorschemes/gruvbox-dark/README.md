# Gruvbox Dark

A bIRC colorscheme adapted from [Gruvbox Dark](https://github.com/morhetz/gruvbox).

![Approximate bIRC preview of Gruvbox Dark](preview.svg)

The preview is illustrative: actual typography, spacing, and interface
chrome are controlled by bIRC. The three colors match the JSON exactly.

## Mapping

- Appearance: `dark`
- Background: `#282828`
- Text: `#ebdbb2`
- Accent: `#d79921`
- Palette basis: Gruvbox dark0, light1, and neutral yellow.

The original editor theme has many syntax and interface colors. bIRC's
export format has one background, one text color, and one accent, so this
adaptation preserves the upstream Normal/editor canvas and chooses a
representative upstream highlight color for the accent.

## Upstream

- Canonical Vim/Neovim source: [https://github.com/morhetz/gruvbox](https://github.com/morhetz/gruvbox)
- Upstream license: `MIT`

The upstream project remains the authority for its name, palette, license,
variants, and current maintenance status. This directory contains only a
small interoperable palette adaptation, not upstream Vim or Neovim code.
