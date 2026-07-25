# Carbonfox

A bIRC colorscheme adapted from [Carbonfox](https://github.com/EdenEast/nightfox.nvim).

![Approximate bIRC preview of Carbonfox](preview.svg)

The preview is illustrative: actual typography, spacing, and interface
chrome are controlled by bIRC. The three colors match the JSON exactly.

## Mapping

- Appearance: `dark`
- Background: `#161616`
- Text: `#f2f4f8`
- Accent: `#78a9ff`
- Palette basis: Carbonfox background, foreground, and blue.

The original editor theme has many syntax and interface colors. bIRC's
export format has one background, one text color, and one accent, so this
adaptation preserves the upstream Normal/editor canvas and chooses a
representative upstream highlight color for the accent.

## Upstream

- Canonical Vim/Neovim source: [https://github.com/EdenEast/nightfox.nvim](https://github.com/EdenEast/nightfox.nvim)
- Upstream license: `MIT`

The upstream project remains the authority for its name, palette, license,
variants, and current maintenance status. This directory contains only a
small interoperable palette adaptation, not upstream Vim or Neovim code.
