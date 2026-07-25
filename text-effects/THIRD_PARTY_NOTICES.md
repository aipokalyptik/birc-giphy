# Third-party font notices

## FIGlet Mini and Small

The `mini` and `small` block-font definitions in `birc-text-effects.js` are
ASCII-range conversions of `mini.flf` and `small.flf` from the official
FIGlet 2.2 font distribution.

Original font author: Glenn Chappell, April 1993.

The source font headers state:

> Permission is hereby given to modify this font, as long as the modifier's
> name is placed on a comment line.

The source files were later modified by Paul Burton in December 1996 to support
a new FIGlet/FIGWin parameter and full-width, kerning, and smushing choices.

Modifications for bIRC Utils by the bIRC Utils contributors:

- Retained the printable ASCII range, U+0020 through U+007E.
- Converted FIGfont rows into declarative JavaScript arrays.
- Converted the FIGfont hardblank character to an ordinary space.
- Removed FIGfont end marks.
- Rendered glyphs side-by-side without FIGlet smushing.

Authoritative source copies:

- [mini.flf in Debian Sources](https://sources.debian.org/src/figlet/2.2-7/fonts/mini.flf/)
- [small.flf in Debian Sources](https://sources.debian.org/src/figlet/2.2-7/fonts/small.flf/)
- [FIGlet 2.2 distribution README](https://sources.debian.org/src/figlet/2.2-7/README/)

The original notices and this modification notice must remain with redistributed
copies of the converted fonts.

## Color-scheme adaptations

The script includes approximate IRC mappings of three permissively licensed
color palettes. IRC's portable palette contains only 16 indexed colors, so
these mappings preserve each scheme's general color progression rather than
its exact RGB values.

### Catppuccin

Catppuccin is Copyright © 2021 Catppuccin and distributed under the MIT
License. The `catppuccin` sequence is adapted from the accent colors in the
Mocha flavor.

- [Official Catppuccin palette repository](https://github.com/catppuccin/palette)
- [MIT license](https://github.com/catppuccin/palette/blob/main/LICENSE)

### Dracula

Dracula is Copyright © 2013–2026 Dracula Theme and distributed under the MIT
License. The `dracula` sequence is adapted from the cyan, green, orange, pink,
purple, red, and yellow colors in the open-source Dracula palette. It does not
use any Dracula PRO palette.

- [Official Dracula repository and OSS palette](https://github.com/dracula/dracula-theme)
- [MIT license](https://github.com/dracula/dracula-theme/blob/main/LICENSE)

### Nord

Nord is Copyright © 2016–2020 Arctic Ice Studio and Sven Greb and distributed
under the MIT License. The `nord` sequence is adapted from the Frost and Aurora
components.

- [Official Nord palette](https://www.nordtheme.com/)
- [Nord source repository and MIT license](https://github.com/nordtheme/nord)

The following MIT license text applies separately to the Catppuccin, Dracula,
and Nord adaptations, with the copyright notices stated in their respective
sections above:

> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.
