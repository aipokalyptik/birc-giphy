# bIRC Utils

A collection of plain JavaScript utility scripts for
[bIRC](https://birc.app/). Each script is self-contained and can be imported
independently through bIRC's Scripts window (`⌘⌥S`).

## Scripts

- [GIPHY Search](giphy/README.md) — search GIPHY, preview results locally, and
  send only the selected GIF.
- [Random Developer Data](random/README.md) — generate random sample values,
  text, colors, identifiers, encodings, and network-shaped data locally.
- [Codec Utilities](codec/README.md) — encode, decode, and convert common
  binary, text, web, email, and international-domain formats.
- [Hash Utilities](hash/README.md) — calculate checksums, message digests,
  HMACs, and interoperable legacy password-hash formats locally.
- [Text Effects](text-effects/README.md) — create leetspeak, Zalgo, Unicode
  novelty text, IRC colors, ANSI notation, and compact block lettering.
- [Text Art](text-art/README.md) — search reusable ASCII art with a durable
  local cache, or discover ANSI-scene packs without rebroadcasting protected
  artwork.
- [Vim Colorscheme Adaptations](colorschemes/README.md) — transcript-aware
  bIRC themes rebuilt from canonical Vim and Neovim palettes with semantic
  custom CSS and generated previews.

Each subdirectory contains the importable `.js` file and its complete usage,
configuration, and security notes.

## Updates

Every pasteable script has a stable reverse-domain identifier and an independent
semantic version. At load time it can check this repository's small
[`updates.json`](updates.json) manifest and report a newer version without
downloading or executing code. Checks, privacy behavior, caching, and the
release procedure are documented in [UPDATES.md](UPDATES.md).

## Development

The contract tests execute the scripts in isolated JavaScript contexts with a
mocked `birc` API:

```sh
npm test
```

No package installation is required.
