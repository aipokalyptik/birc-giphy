# Zenburn

A bIRC colorscheme adapted from [Zenburn](https://github.com/jnurmine/Zenburn).

![Approximate bIRC preview of Zenburn](preview.svg)

The preview is illustrative: actual typography, spacing, and interface
chrome are controlled by bIRC. The three colors match the JSON exactly.

## Mapping

- Appearance: `dark`
- Background: `#3f3f3f`
- Text: `#dcdccc`
- Accent: `#f0dfaf`
- Palette basis: Zenburn Normal background, foreground, and yellow.

The original editor theme has many syntax and interface colors. bIRC's
export format has one background, one text color, and one accent, so this
adaptation preserves the upstream Normal/editor canvas and chooses a
representative upstream highlight color for the accent.

## Upstream

- Canonical Vim/Neovim source: [https://github.com/jnurmine/Zenburn](https://github.com/jnurmine/Zenburn)
- Upstream license: `GPL-2.0`

The upstream project remains the authority for its name, palette, license,
variants, and current maintenance status. This directory contains only a
small interoperable palette adaptation, not upstream Vim or Neovim code.
