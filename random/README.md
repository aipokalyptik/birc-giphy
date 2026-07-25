# bIRC Random Developer Data

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

## Security boundary

The tested bIRC API version 1 runtime exposes `Math.random()` but does not
expose `crypto`, `crypto.getRandomValues()`, or `crypto.randomUUID()`.
Consequently, every value produced by this script is non-cryptographic,
including values formatted as UUID version 4.

Use the output for fixtures, samples, placeholders, games, layout testing, and
creative work. Do not use it for passwords, access tokens, encryption keys,
session identifiers, password-reset links, or anything protecting access.

## Development

Run all sandbox contract tests with:

```sh
npm test
```
