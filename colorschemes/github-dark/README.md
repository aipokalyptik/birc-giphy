# GitHub Dark

A bIRC colorscheme adapted from [GitHub Dark](https://github.com/projekt0n/github-nvim-theme).

![Approximate bIRC preview of GitHub Dark](preview.svg)

The preview is illustrative: actual typography, spacing, and interface
chrome are controlled by bIRC. The three colors match the JSON exactly.

## Mapping

- Appearance: `dark`
- Background: `#0d1117`
- Text: `#c9d1d9`
- Accent: `#58a6ff`
- Palette basis: GitHub Dark canvas, foreground, and accent.

The original editor theme has many syntax and interface colors. bIRC's
export format has one background, one text color, and one accent, so this
adaptation preserves the upstream Normal/editor canvas and chooses a
representative upstream highlight color for the accent.

## Upstream

- Canonical Vim/Neovim source: [https://github.com/projekt0n/github-nvim-theme](https://github.com/projekt0n/github-nvim-theme)
- Upstream license: `MIT`

The upstream project remains the authority for its name, palette, license,
variants, and current maintenance status. This directory contains only a
small interoperable palette adaptation, not upstream Vim or Neovim code.
