# bIRC GIPHY Search

## Summary

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

By default, `/gif send` and `/gif more` are valid only on the same network and
in the same conversation where the search began. This prevents a result from
one channel, query, or network from being used in another. Set the context
policy to `anywhere` only when cross-conversation result use is intentional.
Search terms are limited to the 50 characters accepted by GIPHY.

## Configuration

```text
/gif config key <key>
/gif config rating <g|pg|pg-13|r>
/gif config results <1-10>
/gif config context <strict|anywhere>
/gif config show
/gif config test
/gif config clear key
/gif config clear all
```

Defaults:

- Content rating: `pg-13`
- Results per search: `3`
- Search context policy: `strict`

`config key` and `config test` require a non-empty key. `config rating` accepts
only the four listed ratings, and `config results` accepts whole numbers from
1 through 10. `config show` masks the key. `config clear key` preserves other
preferences; `config context` selects `strict` or `anywhere`; `config clear
all` restores every default.

## Complete command reference

- `/gif <terms>` starts a search, replaces prior results, and prints numbered
  titles plus HTTPS preview URLs locally.
- `/gif send <number>` sends that current result to the conversation where
  the search began. In the default `strict` mode, run it from that same
  network and conversation.
- `/gif more` fetches the next page and replaces the numbered result set. It
  has the same context requirement in `strict` mode.
- `/gif random <terms>` immediately sends a random matching GIF to the active
  conversation.
- `/gif cancel` discards the active query, offset, target, and results.
- `/gif help`, or `/gif` without arguments, prints the complete manual.

Complete workflow:

```text
/gif config key YOUR_GIPHY_API_KEY
/gif config rating pg
/gif config results 5
/gif config context strict
/gif config test
/gif excited penguin
/gif send 2
```

Inspection and reset:

```text
/gif config show
/gif config context anywhere
/gif config clear key
/gif config clear all
```

HTTP failures, malformed provider JSON, missing media URLs, invalid selections,
missing conversations, and unconfigured access produce visible local errors
rather than sending incomplete output.

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

## Script identity and updates

- ID: `com.github.aipokalyptik.birc-utils.giphy`
- Version: `1.0.0`

At load time the script checks the public bIRC Utils version manifest at most
once per 24 hours. A newer version notice includes the installed and available
versions, the exact canonical script URL, a comparison link anchored to this
file, complete review-and-replacement instructions, and the documentation URL.
It never downloads or executes an update. See [the enforced update
contract](../UPDATES.md).

## Development

The tests run the importable script inside a JavaScript sandbox with a mocked
`birc` API:

```sh
npm test
```

No package installation is required.
