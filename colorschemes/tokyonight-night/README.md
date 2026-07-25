# Tokyo Night

A bIRC colorscheme adapted from [Tokyo Night](https://github.com/folke/tokyonight.nvim).

![Approximate bIRC preview of Tokyo Night](preview.svg)

The preview is illustrative: actual typography, spacing, and interface
chrome are controlled by bIRC. The three colors match the JSON exactly.

## Mapping

- Appearance: `dark`
- Background: `#1a1b26`
- Text: `#c0caf5`
- Accent: `#7aa2f7`
- Palette basis: Tokyo Night background, foreground, and blue.

The original editor theme has many syntax and interface colors. bIRC's
export format has one background, one text color, and one accent, so this
adaptation preserves the upstream Normal/editor canvas and chooses a
representative upstream highlight color for the accent.

## Upstream

- Canonical Vim/Neovim source: [https://github.com/folke/tokyonight.nvim](https://github.com/folke/tokyonight.nvim)
- Upstream license: `Apache-2.0`

The upstream project remains the authority for its name, palette, license,
variants, and current maintenance status. This directory contains only a
small interoperable palette adaptation, not upstream Vim or Neovim code.
