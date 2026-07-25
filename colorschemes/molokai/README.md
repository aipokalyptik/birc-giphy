# Molokai

A bIRC colorscheme adapted from [Molokai](https://github.com/tomasr/molokai).

![Approximate bIRC preview of Molokai](preview.svg)

The preview is illustrative: actual typography, spacing, and interface
chrome are controlled by bIRC. The three colors match the JSON exactly.

## Mapping

- Appearance: `dark`
- Background: `#1b1d1e`
- Text: `#f8f8f2`
- Accent: `#f92672`
- Palette basis: Molokai Normal background, foreground, and pink.

The original editor theme has many syntax and interface colors. bIRC's
export format has one background, one text color, and one accent, so this
adaptation preserves the upstream Normal/editor canvas and chooses a
representative upstream highlight color for the accent.

## Upstream

- Canonical Vim/Neovim source: [https://github.com/tomasr/molokai](https://github.com/tomasr/molokai)
- Upstream license: `MIT`

The upstream project remains the authority for its name, palette, license,
variants, and current maintenance status. This directory contains only a
small interoperable palette adaptation, not upstream Vim or Neovim code.
