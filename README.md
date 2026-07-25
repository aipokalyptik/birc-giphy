# bIRC Utils

A collection of plain JavaScript utility scripts for
[bIRC](https://birc.app/). Each script is self-contained and can be imported
independently through bIRC's Scripts window (`⌘⌥S`).

## Scripts

- [GIPHY Search](giphy/README.md) — search GIPHY, preview results locally, and
  send only the selected GIF.
- [Random Developer Data](random/README.md) — generate random sample values,
  text, colors, identifiers, encodings, and network-shaped data locally.

Each subdirectory contains the importable `.js` file and its complete usage,
configuration, and security notes.

## Development

The contract tests execute the scripts in isolated JavaScript contexts with a
mocked `birc` API:

```sh
npm test
```

No package installation is required.
