# bIRC Random Capability Report

`birc-random-capabilities.js` reports which JavaScript and bIRC facilities are
available to scripts in the current bIRC runtime.

## Installation and usage

1. Open bIRC's Scripts window with `⌘⌥S`.
2. Import `birc-random-capabilities.js`.
3. Enable the script.
4. Run:

   ```text
   /randomtest
   ```

The report covers:

- `Math.random()`
- `crypto.getRandomValues()` and `crypto.randomUUID()`
- typed arrays, `DataView`, and `BigInt`
- Base64 and UTF-8 helpers
- Unicode code points, normalization, and property regular expressions
- promises, maps, sets, arrays, and JSON
- the bIRC output, command, completion, and HTTPS-fetching APIs

The probe makes no network request and does not require HTTPS permission. It
prints sample random values only to the active bIRC window.

## Security

This script reports capabilities; it does not certify a random source as
cryptographically secure. In particular, the presence of `Math.random()` says
nothing about suitability for secrets or authentication.
