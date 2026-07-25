# bIRC GIPHY Search

A personal-use bIRC script that searches GIPHY, prints numbered GIF previews
locally, and sends only the result you choose.

No source editing is required. Configuration is stored persistently through
bIRC's per-script `birc.store` API.

## Installation

1. Create a GIPHY API key at
   [developers.giphy.com](https://developers.giphy.com/).
2. Open bIRC's Scripts window with `⌘⌥S`.
3. Import `birc-giphy.js`.
4. Enable the script and allow its HTTPS access.
5. In any bIRC conversation, configure the key:

   ```text
   /gif config key YOUR_GIPHY_API_KEY
   ```

6. Verify the configuration:

   ```text
   /gif config test
   ```

To see animated previews, enable inline images in bIRC's privacy settings.
Whether locally printed script URLs receive inline previews depends on bIRC's
transcript rendering behavior. The URLs remain clickable if they do not expand.

## Usage

Search without sending:

```text
/gif excited penguin
```

The script prints each numbered result and its preview link together on one
local transcript line. Send one result:

```text
/gif send 2
```

Other commands:

```text
/gif more
/gif random celebration
/gif cancel
/gif help
```

`/gif help` is the complete in-bIRC manual. It covers setup, every command,
defaults, preview behavior, storage, API-key handling, and proxy behavior.
Changes to the script's user-facing behavior must update this help output and
its contract test in the same change.

The selected GIF is sent to the conversation where the search began. This
prevents a later window change from accidentally sending it somewhere else.
Search terms are limited to the 50 characters accepted by GIPHY.

## Configuration

```text
/gif config key <key>
/gif config rating <g|pg|pg-13|r>
/gif config results <1-10>
/gif config show
/gif config test
/gif config clear key
/gif config clear all
```

Defaults:

- Content rating: `pg-13`
- Results per search: `3`

## Security and privacy

- The repository contains no API key.
- The complete configured key is never printed by the script.
- bIRC documents `birc.store` as persistent per-script storage, but does not
  document it as encrypted or Keychain-backed. Treat the stored key as ordinary
  local application data.
- GIPHY authenticates GET requests with the API key in the URL. Request URLs
  can appear in network diagnostics or intermediary logs.
- Search terms are sent to GIPHY.
- Preview media is loaded only if the user enables bIRC's remote-media
  functionality.
- bIRC routes `birc.fetch()` and remote media through the current server
  profile's proxy when one is configured. GIPHY's integration guidance asks
  clients not to proxy its API calls, and bIRC does not expose a script-level
  proxy bypass. Users of proxied IRC profiles should evaluate that limitation
  before enabling this script.

GIF search results display the attribution required by GIPHY:
**Powered by GIPHY**.

## Development

The tests run the importable script inside a JavaScript sandbox with a mocked
`birc` API:

```sh
npm test
```

No package installation is required.
