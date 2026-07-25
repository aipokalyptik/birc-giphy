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

### Command, option, and output examples

Random values below are examples; each invocation normally produces different
output. Optional defaults and every named option are shown explicitly.

| Command and option | Example input | Example output |
|---|---|---|
| `integer` defaults | `/random integer` | `46` |
| `integer` bounds and count | `/random integer -10 10 3` | `6`<br>`-7`<br>`-4` |
| `float` count | `/random float 2` | `0.5190133217256516`<br>`0.8854133631102741` |
| `boolean` count | `/random boolean 3` | `true`<br>`true`<br>`false` |
| `string` defaults | `/random string` | `FhzqmRAs2LuBCE6X` |
| `string lower` | `/random string 8 lower` | `lpodruwp` |
| `string upper` | `/random string 8 upper` | `FKLUPTLB` |
| `string letters` | `/random string 8 letters` | `wYBHmjew` |
| `string alphanumeric` | `/random string 8 alphanumeric` | `ogrVeiX7` |
| `string hex` | `/random string 8 hex` | `1ed8311e` |
| `string symbols` | `/random string 8 symbols` | `!#=;^[^]` |
| `string all` | `/random string 8 all` | `!1nY;6Up` |
| `string` count | `/random string 6 hex 2` | `4117d6`<br>`4f188f` |
| `uuid` count | `/random uuid 2` | `77d90c9a-a302-4ab2-bfc9-55699447d7ce`<br>`4716f3f4-63c3-4d7c-af11-74efe6fd3e9b` |
| `unicode` length and count | `/random unicode 8 2` | `ぢ😞ヷ·Ǆ乓Vる`<br>`乁专иƢǈƐЕt` |
| `sentence` word and output counts | `/random sentence 6 2` | `Cobalt thread river winter meadow echo.`<br>`Solar hidden data solar bright binary.` |
| `paragraph` sentence count | `/random paragraph 2` | `Orbit gentle drifting cloud warm system module curious. Midnight stone wandering signal neon soft tiny quiet thread neon pattern forest data cobalt cobalt autumn.` |
| `color` count | `/random color 2` | `#0809e8`<br>`#caf734` |
| `palette complementary` | `/random palette complementary` | `complementary: hsl(152, 68%, 40%) \| hsl(332, 68%, 40%)` |
| `palette analogous` | `/random palette analogous` | `analogous: hsl(216, 56%, 44%) \| hsl(246, 56%, 44%) \| hsl(276, 56%, 44%)` |
| `palette triadic` default | `/random palette` | `triadic: hsl(246, 86%, 56%) \| hsl(6, 86%, 56%) \| hsl(126, 86%, 56%)` |
| `palette tetradic` | `/random palette tetradic` | `tetradic: hsl(111, 82%, 55%) \| hsl(201, 82%, 55%) \| hsl(291, 82%, 55%) \| hsl(21, 82%, 55%)` |
| `palette split` | `/random palette split` | `split: hsl(68, 76%, 52%) \| hsl(218, 76%, 52%) \| hsl(278, 76%, 52%)` |
| `palette monochrome` | `/random palette monochrome` | `monochrome: hsl(41, 74%, 20%) \| hsl(41, 74%, 35%) \| hsl(41, 74%, 50%) \| hsl(41, 74%, 65%) \| hsl(41, 74%, 80%)` |
| `bytes` byte count | `/random bytes 8` | `138, 11, 147, 5, 153, 158, 159, 58` |
| `hex` byte count | `/random hex 8` | `faf0850caebf193e` |
| `base64` byte count | `/random base64 8` | `bUAqF4VHclM=` |
| `choice` | `/random choice deploy \| wait \| rollback` | `wait` |
| `shuffle` | `/random shuffle alpha \| beta \| gamma` | `gamma \| beta \| alpha` |
| `dice` default | `/random dice` | `1d6: [3] = 3` |
| `dice` notation | `/random dice 4d6` | `4d6: [1, 1, 3, 1] = 6` |
| `ip` default / `v4` | `/random ip v4` | `129.8.170.32` |
| `ip v6` | `/random ip v6` | `9839:5fcc:6e2c:3b62:3483:6476:f011:3c68` |
| `mac` count | `/random mac 2` | `a2:b1:7f:70:88:e4`<br>`fa:df:e3:69:0f:12` |
| `timestamp` defaults | `/random timestamp` | `2011-01-23T15:11:06.263Z` |
| `timestamp` year range | `/random timestamp 2020 2028` | `2020-12-01T15:40:20.485Z` |
| `remote status` | `/random remote status` | `Remote @mention use is disabled.` |
| `remote on` | `/random remote on` | `Remote @mention use is enabled.` |
| `remote off` | `/random remote off` | `Remote @mention use is disabled.` |
| `say` output routing | `/random say choice deploy \| wait \| rollback` | Sends `rollback` to the active conversation instead of printing it locally. |
| `help` | `/random help` or `/random` | Prints the complete local generator manual. |

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
