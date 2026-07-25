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
/random integer <int8|uint8|int16|uint16|int32|uint32|int64|uint64|int128|uint128|safeint> [count]
/random float [count]
/random float <float32|float64> [unit|finite|normal|subnormal|special|all] [count]
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
/random timestamp [unix32|start-year [end-year]]
/random remote <on|off|status>
```

### Command, option, and output examples

Random values below are examples; each invocation normally produces different
output. Optional defaults and every named option are shown explicitly.

| Command and option | Example input | Example output |
|---|---|---|
| `integer` defaults | `/random integer` | `46` |
| `integer` bounds and count | `/random integer -10 10 3` | `6`<br>`-7`<br>`-4` |
| `integer int8` | `/random integer int8 2` | `-9`<br>`-22` |
| `integer uint8` | `/random integer uint8 2` | `193`<br>`44` |
| `integer int16` | `/random integer int16` | `-29029` |
| `integer uint16` | `/random integer uint16` | `29502` |
| `integer int32` | `/random integer int32` | `1779401093` |
| `integer uint32` | `/random integer uint32` | `4073751840` |
| `integer int64` | `/random integer int64` | `2751829112578345810` |
| `integer uint64` | `/random integer uint64` | `2341223684516387412` |
| `integer int128` | `/random integer int128` | `-80520808395249882196632926343013955384` |
| `integer uint128` | `/random integer uint128` | `100437630979565975846613913246018913404` |
| `integer safeint` | `/random integer safeint` | `-912365223219441` |
| legacy `float` count | `/random float 2` | `0.5190133217256516`<br>`0.8854133631102741` |
| `float32 unit` | `/random float float32 unit 2` | `0.9416046738624573`<br>`0.46060729026794434` |
| `float32` default (`finite`) | `/random float float32 2` | `-4.110397450441665e-25`<br>`921.3787841796875` |
| `float32 finite` | `/random float float32 finite 2` | `-9.072006486651854e-31`<br>`-1.678225917609022e-12` |
| `float32 normal` | `/random float float32 normal 2` | `-69400177512808450`<br>`0.0001842977071646601` |
| `float32 subnormal` | `/random float float32 subnormal 2` | `5.078042190601844e-39`<br>`-6.999876791574008e-39` |
| `float32 special` | `/random float float32 special 3` | `Infinity`<br>`-0`<br>`NaN` |
| `float32 all` | `/random float float32 all 2` | `0.0042761387303471565`<br>`77246.21875` |
| `float64 unit` | `/random float float64 unit 2` | `0.0789720225147903`<br>`0.7929071225225925` |
| `float64` default (`finite`) | `/random float float64 2` | `-2.129617708236184e+73`<br>`7.118297469922065e-231` |
| `float64 finite` | `/random float float64 finite 2` | `4.141884027911739e-195`<br>`-3.781453604125919e-297` |
| `float64 normal` | `/random float float64 normal 2` | `1.663757382199476e-169`<br>`4.171567804675023e-198` |
| `float64 subnormal` | `/random float float64 subnormal 2` | `-7.79261871258891e-309`<br>`9.464435088308985e-309` |
| `float64 special` | `/random float float64 special 3` | `0`<br>`NaN`<br>`Infinity` |
| `float64 all` | `/random float float64 all 2` | `-5.193876439504581e+94`<br>`-3.0594835242783924e+236` |
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
| `dice` maximum safe sides | `/random dice 1d9007199254740991` | `1d9007199254740991: [4681445284208869] = 4681445284208869` |
| `ip` default / `v4` | `/random ip v4` | `129.8.170.32` |
| `ip v6` | `/random ip v6` | `9839:5fcc:6e2c:3b62:3483:6476:f011:3c68` |
| `mac` count | `/random mac 2` | `a2:b1:7f:70:88:e4`<br>`fa:df:e3:69:0f:12` |
| `timestamp` default | `/random timestamp` | `1967-04-11T11:59:57.016Z` |
| `timestamp unix32` | `/random timestamp unix32` | `2022-09-08T03:07:19.221Z` |
| `timestamp` one-year interval | `/random timestamp 2020` | `2020-07-30T19:54:31.069Z` |
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

- `integer` uses inclusive bounds and defaults to 0-100. Custom bounds may use
  the complete JavaScript safe-integer interval, -9,007,199,254,740,991 through
  9,007,199,254,740,991. Named types generate across their complete signed
  two's-complement or unsigned 8-, 16-, 32-, 64-, or 128-bit interval.
  `safeint` covers the complete safe-integer interval. Large values are printed
  as exact base-10 integers without JavaScript's `n` suffix.
- Legacy `float [count]` produces binary64 fractions from zero inclusive to one
  exclusive. Typed `float32` and `float64` modes are `unit` for that same
  interval, `finite` for any finite bit pattern, `normal` for normalized finite
  values, `subnormal` for nonzero subnormal values, `special` for positive or
  negative zero, infinity, or NaN, and `all` for unrestricted IEEE 754 bit
  patterns. Bit-pattern modes are uniform over encodings, not uniformly spaced
  over numeric magnitude. `boolean` produces `true` or `false`.
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
- `dice` defaults to `1d6`, permitting 1-100 dice and 2 through
  9,007,199,254,740,991 sides. Rolls and totals remain exact.
- `ip` emits syntactically formatted IPv4 or IPv6 fixture data.
- `mac` creates locally administered unicast addresses.
- `timestamp` emits ISO 8601 UTC. Its default and explicit `unix32` mode cover
  the complete signed-32-bit Unix-time interval:
  1901-12-13T20:45:52.000Z through 2038-01-19T03:14:07.000Z. One year selects
  that calendar year; two years define a half-open year interval.

Examples:

```text
/random integer -10 10 3
/random integer uint64 3
/random float float32 subnormal 2
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

## Range and limit rationale

Machine-oriented ranges follow recognizable representations: two's-complement
and unsigned integer widths, JavaScript's exact safe-integer interval, IEEE 754
binary32/binary64 encodings, and signed 32-bit Unix time. UUID, IP, MAC, CSS
color, hexadecimal, and Base64 shapes likewise follow their named formats.

Other caps are operational safeguards, not standards: at most 20 generated
items, 512 characters per string, 256 random bytes, 100 dice, 30 words per
sentence, 12 sentences per paragraph, and four remote lines of 400 characters.
Palette saturation/lightness and prose vocabulary are deliberately aesthetic
choices. The repository-wide audit and classification are recorded in
[Numeric limits and defaults](../LIMITS.md).

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
- Version: `1.1.0`

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
