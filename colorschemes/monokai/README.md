# Monokai

A bIRC colorscheme adapted from [Monokai](https://github.com/crusoexia/vim-monokai).

![Approximate bIRC preview of Monokai](preview.svg)

The preview is illustrative: actual typography, spacing, and interface
chrome are controlled by bIRC. The three colors match the JSON exactly.

## Mapping

- Appearance: `dark`
- Background: `#272822`
- Text: `#f8f8f2`
- Accent: `#f92672`
- Palette basis: Monokai background, foreground, and pink.

The original editor theme has many syntax and interface colors. bIRC's
export format has one background, one text color, and one accent, so this
adaptation preserves the upstream Normal/editor canvas and chooses a
representative upstream highlight color for the accent.

## Upstream

- Canonical Vim/Neovim source: [https://github.com/crusoexia/vim-monokai](https://github.com/crusoexia/vim-monokai)
- Upstream license: `MIT`

The upstream project remains the authority for its name, palette, license,
variants, and current maintenance status. This directory contains only a
small interoperable palette adaptation, not upstream Vim or Neovim code.
