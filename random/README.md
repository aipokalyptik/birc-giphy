# bIRC Random Developer Data

## Summary

`birc-random.js` adds a permission-free `/random` command to bIRC. It generates
sample data locally without sending requests to another service.

## Installation

1. Open bIRC's Scripts window with `⌘⌥S`.
2. Import `birc-random.js`.
3. Enable the script.
4. Run `/random help`.

The script does not need HTTPS access.

## Generators

```text
/random integer [minimum] [maximum] [count]
/random float [count]
/random boolean [count]
/random string [length] [lower|upper|letters|alphanumeric|hex|symbols|all] [count]
/random uuid [count]
/random unicode [length] [count]
/random sentence [words] [count]
/random paragraph [sentences]
/random color [count]
/random palette [complementary|analogous|triadic|tetradic|split|monochrome]
/random bytes [count]
/random hex [bytes]
/random base64 [bytes]
/random choice red | green | blue
/random shuffle first | second | third
/random dice [NdN]
/random ip [v4|v6]
/random mac [count]
/random timestamp [start-year] [end-year]
/random remote <on|off|status>
```

Output is printed locally by default. Prefix a generator with `say` to send its
result to the active conversation:

```text
/random say choice deploy | wait | rollback
```

Counts are capped to keep accidental commands from flooding a transcript.

## Generator reference

- `integer` uses inclusive bounds, defaults to 0-100, and permits bounds from
  -1,000,000,000 through 1,000,000,000.
- `float` produces fractions from zero inclusive to one exclusive. `boolean`
  produces `true` or `false`.
- `string` defaults to 16 alphanumeric characters. Length is 1-512; sets are
  `lower`, `upper`, `letters`, `alphanumeric`, `hex`, `symbols`, and `all`.
- `uuid` emits UUID-formatted version-4 values with RFC variant bits.
- `unicode` samples printable code points across several writing systems,
  symbols, and emoji. Length counts code points.
- `sentence` defaults to ten words and permits 2-30. `paragraph` defaults to
  five sentences and permits 1-12.
- `color` emits six-digit CSS hexadecimal colors. `palette` emits CSS HSL
  colors using the six documented schemes and defaults to `triadic`.
- `bytes`, `hex`, and `base64` default to 16 bytes and permit 1-256.
- `choice` selects one non-empty pipe-separated item. `shuffle` randomizes all
  supplied items with Fisher-Yates.
- `dice` defaults to `1d6`, permitting 1-100 dice and 2-1,000,000 sides.
- `ip` emits syntactically formatted IPv4 or IPv6 fixture data.
- `mac` creates locally administered unicast addresses.
- `timestamp` emits ISO 8601 UTC, defaulting to years 2000 through 2030.

Examples:

```text
/random integer -10 10 3
/random string 32 hex 2
/random unicode 12
/random sentence 8 2
/random palette analogous
/random bytes 32
/random choice deploy | wait | rollback
/random shuffle alpha | beta | gamma
/random dice 4d6
/random ip v6
/random timestamp 2020 2028
```

## Optional remote use

Remote use is disabled by default. Enable it with `/random remote on`; the
setting persists for this script. Another user can then address your current
nick at the beginning of a live message:

```text
@YourNick random integer 1 100
@YourNick /random color
```

The response is sent to the originating channel, or back to the sender for a
direct message, and is prefixed with their nick. Self-authored and backlog
messages are ignored. Remote replies are limited to four lines and 400
characters per line; `say` is not accepted remotely. Disable the listener with
`/random remote off`.

`/random remote status` reports the persistent setting. Remote callers cannot
change it. Both `@YourNick random ...` and `@YourNick /random ...` are accepted,
using bIRC's network-aware nick comparison.

## Validation and failure behavior

Numeric arguments must be finite whole numbers where integers are required.
Reversed ranges, unknown sets or schemes, malformed dice, empty item lists,
and excessive sizes produce a visible `[Random]` error without partial output.

## Security boundary

The tested bIRC API version 1 runtime exposes `Math.random()` but does not
expose `crypto`, `crypto.getRandomValues()`, or `crypto.randomUUID()`.
Consequently, every value produced by this script is non-cryptographic,
including values formatted as UUID version 4.

Generated network addresses, timestamps, colors, prose, and UUIDs are fixtures
only. The script does not assert allocation, reachability, uniqueness, cultural
suitability, or semantic validity beyond the documented output format.

Use the output for fixtures, samples, placeholders, games, layout testing, and
creative work. Do not use it for passwords, access tokens, encryption keys,
session identifiers, password-reset links, or anything protecting access.

## Script identity and updates

- ID: `com.github.aipokalyptik.birc-utils.random`
- Version: `1.0.0`

Generation remains entirely local. If optional HTTPS permission is enabled, a
load-time check consults the public bIRC Utils version manifest at most once
per 24 hours. A newer version notice includes exact source, anchored diff,
documentation, and review-and-replacement URLs and instructions. No update is
downloaded or executed. See [the enforced update contract](../UPDATES.md).

## Development

Run all sandbox contract tests with:

```sh
npm test
```
