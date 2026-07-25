# VSCode Dark+

A bIRC colorscheme adapted from [VSCode Dark+](https://github.com/Mofiqul/vscode.nvim).

![Approximate bIRC preview of VSCode Dark+](preview.svg)

The preview is illustrative: actual typography, spacing, and interface
chrome are controlled by bIRC. The three colors match the JSON exactly.

## Mapping

- Appearance: `dark`
- Background: `#1e1e1e`
- Text: `#d4d4d4`
- Accent: `#569cd6`
- Palette basis: VSCode Dark+ editor background, foreground, and blue.

The original editor theme has many syntax and interface colors. bIRC's
export format has one background, one text color, and one accent, so this
adaptation preserves the upstream Normal/editor canvas and chooses a
representative upstream highlight color for the accent.

## Upstream

- Canonical Vim/Neovim source: [https://github.com/Mofiqul/vscode.nvim](https://github.com/Mofiqul/vscode.nvim)
- Upstream license: `MIT`

The upstream project remains the authority for its name, palette, license,
variants, and current maintenance status. This directory contains only a
small interoperable palette adaptation, not upstream Vim or Neovim code.
