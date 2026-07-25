# bIRC Text Effects

A self-contained bIRC script for playful text transformations, Unicode novelty
alphabets, IRC colors and formatting, terminal escape notation, and compact
ASCII or Unicode text art.

Import [`birc-text-effects.js`](birc-text-effects.js) through bIRC's Scripts
window (`⌘⌥S`). Run `/text help` for the complete in-client manual.

## Previewing and sending

Every effect previews locally by default:

```text
/text leet classic Hack the planet
/text zalgo low Something approaches
/text fullwidth hello
/text block HELLO
```

The explicit `preview` form is useful when showing the distinction in aliases,
documentation, or command history:

```text
/text preview leet classic Hack the planet
/text preview scheme catppuccin Hello IRC
/text preview block small HELLO
```

Both forms render through the same parser and safety limits and print only
inside bIRC. They never send a message to a channel or user.

Add `say` to send the result to the active channel or query:

```text
/text say rainbow Hello IRC
/text say color 4 1 Warning
/text say block HELLO
```

Block lettering produces five separate IRC messages. ANSI output is
preview-only because terminal ESC sequences are not portable IRC formatting.

## Complete effect reference

### Word transformations

- `leet <light|classic|extreme> <text>` converts letters to common leetspeak.
- `alternating <text>` alternates lower and upper case. `mock` is an alias.
- `reverse <text>` reverses Unicode code points.
- `upsidedown <text>` reverses the text and substitutes upside-down lookalikes.
- `clap <text>` replaces whitespace between words with `👏`.

### Unicode novelty forms

- `fullwidth <text>` maps printable ASCII into fullwidth forms.
- `vaporwave <text>` creates spaced fullwidth text.
- `circled <text>` maps Latin letters and digits to enclosed forms.
- `smallcaps <text>` uses phonetic and modifier-letter approximations.
- `regional <text>` maps Latin letters to regional-indicator symbols.
- `bold`, `italic`, and `monospace` use Unicode mathematical alphabets.
- `zalgo <low|medium|high> <text>` adds randomized combining marks above,
  through, and below visible characters.

These are character substitutions, not semantic font styling. Unicode defines
mathematical alphabets for mathematical and technical notation, not as general
presentation markup. Novelty forms can affect search, copying, screen readers,
normalization, and font coverage.

### IRC presentation

- `schemes` lists installed color schemes.
- `scheme <name> <text>` cycles through a named IRC color sequence.
- `rainbow <text>` is an alias for `scheme rainbow`.
- `color <foreground 0-15> [background 0-15] <text>` applies one IRC color.
- `ircbold`, `ircitalic`, `ircunderline`, and `ircstrike` wrap text in the
  corresponding IRC formatting controls and a reset.

IRC color numbers and formatting support vary among clients. The script always
uses two-digit color numbers so text beginning with a digit is unambiguous.

### Color schemes

Six schemes are bundled:

- `rainbow`, `fire`, and `ocean` are native bIRC Utils sequences.
- `catppuccin` approximates Catppuccin Mocha accents.
- `dracula` approximates the Dracula open-source palette.
- `nord` approximates Nord's Frost and Aurora palettes.

```text
/text schemes
/text scheme catppuccin Hello
/text say scheme dracula Good evening
/text say scheme nord Stay frosty
```

IRC formatting carries palette indexes rather than arbitrary RGB values. The
three third-party schemes therefore select the closest useful colors from the
portable 0–15 IRC palette; they are adaptations, not exact reproductions.

Color schemes use the same declarative registry as block fonts:

```javascript
registerColorScheme({
    name: "example",
    colors: [4, 7, 8, 9],
    description: "Red through green."
});
```

Each `colors` entry must be a whole-number IRC color index from 0 through 15.
Add the scheme's license, source, exact source colors, and mapping decisions to
`THIRD_PARTY_NOTICES.md` when adapting a third-party palette.

### Text art and ANSI notation

- `fonts` lists the installed block fonts.
- `block [font] <text>` or `ascii [font] <text>` renders the selected font.
  The default is `simple`.
- `blocks [font] <text>` renders the selected font with solid block cells.
- `box <text>` draws a Unicode box around a single line.
- `ansi <color> <text>` creates visible `\x1b[...m` notation suitable for
  copying into source code or a terminal-aware context. It cannot be sent by
  `/text say`.

ANSI colors are: `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`,
and `white`.

### Block fonts

Three fonts are bundled:

- `simple` — the original bIRC Utils five-row uppercase font.
- `mini` — the four-row FIGlet Mini font, including printable ASCII.
- `small` — the five-row FIGlet Small font, including printable ASCII.

Examples:

```text
/text fonts
/text block simple HELLO
/text block mini Hello!
/text block small Hello!
/text say blocks mini IRC
```

Mini and Small are converted from the official FIGlet 2.2 distribution. Their
authorship, permission notice, source links, and conversion details are
preserved in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

### Adding another block font

Fonts are declarative. Add one `registerBlockFont` call near the existing font
definitions in `birc-text-effects.js`:

```javascript
registerBlockFont({
    name: "example",
    height: 3,
    spacing: 1,
    convertsToUppercase: true,
    glyphs: {
        A: [" A ", "AAA", "A A"],
        "?": ["??", " ?", " ?"]
    }
});
```

Every glyph must have exactly `height` rows. `spacing` is the number of spaces
inserted between glyphs. `convertsToUppercase` controls whether the renderer
normalizes input before lookup. Include a `?` fallback glyph whenever the font
does not cover every printable character.

Before incorporating a third-party font:

1. Confirm that its license or permission notice allows redistribution and
   modification.
2. Preserve the author, source, license, and required notices.
3. Record conversions or removed glyph ranges.
4. Keep the font at six rows or fewer so it remains within the script's IRC
   flood limit.
5. Add rendering, line-limit, help, and font-list tests.

## Limits and safety

- Input is limited to 160 JavaScript characters.
- Individual output lines are limited to 420 JavaScript characters.
- No effect may produce more than six lines.
- Block lettering accepts at most 12 characters and produces four or five
  lines with the bundled fonts.
- User-supplied control characters are rejected.
- Generated ANSI escape notation is never sent to IRC.
- Zalgo intensity is bounded, but even low intensity can reduce readability
  and accessibility.
- Multi-line art can be disruptive in busy channels; preview it before using
  `say`.

The script uses `Math.random()` only to select Zalgo combining marks. It is a
visual effect and makes no security or unpredictability claim.

## Sources and design notes

- [mIRC color documentation](https://www.mirc.com/colors.html) documents the
  widely implemented IRC color control and its 0–15 palette.
- [FIGlet](https://www.figlet.org/) established large lettering made from
  ordinary text. The script bundles two compact fonts from its official
  distribution as declarative data; it does not need network access.
- [Unicode Chapter 7](https://unicode.org/versions/Unicode16.0.0/core-spec/chapter-7/)
  explains that combining marks attach to preceding base characters.
- [Unicode Chapter 22](https://unicode.org/versions/Unicode16.0.0/core-spec/chapter-22/)
  documents mathematical alphanumeric symbols and cautions against using them
  as ordinary presentation styling.

## Development

Run the complete repository tests:

```sh
npm test
```
