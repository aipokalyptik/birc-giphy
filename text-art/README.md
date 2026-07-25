# Text Art

`birc-text-art.js` adds two deliberately separate commands:

- `/ascii` searches legally reusable plain-text art and can send a selected
  item.
- `/ansi` searches ANSI-scene pack metadata and opens the path to the original
  archive, but never rebroadcasts the artwork.

That separation matters. Plain text is not automatically free to copy, and
publicly archived ANSI art remains the intellectual property of its creator.

## Installation

1. Open bIRC's Scripts window with `⌘⌥S`.
2. Create a script and paste the complete contents of `birc-text-art.js`.
3. Enable HTTPS access for the script.
4. Run `/ascii help` and `/ansi help`.

The pasted file is self-contained. It downloads only source indexes, metadata,
and a selected ASCII item.

## Quick examples

```text
/ascii cat
/ascii preview 1
/ascii info 1
/ascii send 1

/ansi acid
/ansi info 1
```

An ASCII search is printed locally:

```text
[ASCII] Results for "cat":
1. Cat [animals; 29×15] — Use when mentioning cats, pets, or cozy vibes
[ASCII] Use /ascii info <number>, /ascii send <number>, or /ascii cancel.
```

`/ascii preview 1` downloads that item once, validates it, saves it in the
per-script data store, and prints its lines only in the active bIRC window.
Nothing is sent to IRC. A later `/ascii send 1` reuses the validated cache.

An ANSI search prints links rather than injecting escape sequences or artwork:

```text
[ANSI] Pack results for "acid":
1. acid-100 [2004] — acid — https://16colo.rs/pack/acid-100
[ANSI] Discovery only: artwork rights remain with its creator.
```

## `/ascii` reference

```text
/ascii search <terms>
/ascii <terms>
/ascii preview <number>
/ascii info <number>
/ascii send <number>
/ascii cancel
/ascii cache status
/ascii cache refresh
/ascii config show
/ascii config context <strict|anywhere>
/ascii help
```

Every ASCII option, beside an illustrative Artscii fixture:

| Option | Example input | Example output or action |
|---|---|---|
| Search shorthand | `/ascii cat` | `[ASCII] Results for "cat":`<br>`1. Cat [animals; 5×2] — A friendly cat` |
| Explicit search | `/ascii search cat` | The same numbered local result list as the shorthand. |
| Preview | `/ascii preview 1` | Prints `Local preview of Cat (2 lines; nothing will be sent):`, then ` /\_/\\` and `( o.o )`. |
| Information | `/ascii info 1` | Prints name, description, category, tags, declared size, canonical source, and MIT license. |
| Send | `/ascii send 1` | Sends the two validated art lines, then prints `Sent Cat (2 lines) to #art. Source: Artscii, MIT License.` |
| Cancel | `/ascii cancel` | `The current ASCII results were discarded.` |
| Cache status, empty | `/ascii cache status` | `The catalog is not cached. Art files are cached individually.` |
| Cache status, populated | `/ascii cache status` | `The local catalog contains 2 entries. Art files are cached individually after first use.` |
| Cache refresh | `/ascii cache refresh` | Fetches, validates, and replaces the local catalog; prints its entry count. |
| Configuration show | `/ascii config show` | `Search context policy: strict.` |
| Strict context | `/ascii config context strict` | `Search context policy set to strict.` |
| Anywhere context | `/ascii config context anywhere` | Confirms `anywhere`, then warns that selections may be used outside their search conversation. |
| Help | `/ascii help` or `/ascii` | Prints the complete local ASCII manual. |

The initial search downloads the
[Artscii](https://github.com/rxolve/artscii) JSON catalog. Later searches use
the stored catalog and make no network request. A selected art file is fetched
once and is reused from the cache thereafter. `/ascii cache refresh` is the
only normal way to repeat the catalog request.

Searches match every normalized query word against the item's name, identifier,
category, description, and tags. Exact names rank first. At most eight results
are shown.

Before previewing, caching, or sending, the script rejects:

- control characters other than line breaks;
- more than 20 lines;
- lines wider than 80 characters; and
- empty or malformed responses.

It never silently crops or rewrites the artist's work. Preview uses
`birc.print`, which is local to bIRC. Each line is passed to `birc.say` only
after the whole item has passed validation and only when the user separately
runs `/ascii send`. Sending twenty IRC messages can still be too fast for a
particular network; use judgment and respect channel rules.

Artscii is distributed under the MIT License. `/ascii info <number>` and the
post-send status identify the source and license. The full upstream license is
available in the [canonical repository](https://github.com/rxolve/artscii).

## `/ansi` reference

```text
/ansi search <terms>
/ansi <terms>
/ansi info <number>
/ansi cancel
/ansi cache refresh <terms>
/ansi config show
/ansi config context <strict|anywhere>
/ansi help
```

Every ANSI option, beside an illustrative Sixteen Colors fixture:

| Option | Example input | Example output or action |
|---|---|---|
| Search shorthand | `/ansi acid` | `[ANSI] Pack results for "acid":`<br>`1. acid-100 [2004] — acid — https://16colo.rs/pack/acid-100` |
| Explicit search | `/ansi search acid` | The same discovery-only result list as the shorthand. |
| Cached search | `/ansi acid` again | Adds `(local cache)` to the result heading and makes no request. |
| Information | `/ansi info 1` | Prints pack name, year, groups, gallery URL, and the creator-rights warning. |
| Cancel | `/ansi cancel` | `The current ANSI results were discarded.` |
| Cache refresh | `/ansi cache refresh acid` | Deletes only the cached `acid` query and fetches it again. |
| Configuration show | `/ansi config show` | `Search context policy: strict.` |
| Strict context | `/ansi config context strict` | `Search context policy set to strict.` |
| Anywhere context | `/ansi config context anywhere` | Confirms `anywhere`, then prints the cross-conversation warning. |
| Send refusal | `/ansi send 1` | Explains that archive discovery does not grant permission to rebroadcast the work; sends nothing. |
| Help | `/ansi help` or `/ansi` | Prints the complete local ANSI manual. |

`/ansi` searches pack names through the
[Sixteen Colors](https://16colo.rs/) metadata API. It stores each distinct
query indefinitely, so the same query is normally sent to the volunteer-run
service only once. Use `/ansi cache refresh <terms>` when an intentionally
fresh result is worth another request.

The command is discovery-only:

- it does not fetch `.ANS`, `.ICE`, or archive files;
- it does not interpret or strip terminal escape sequences;
- it does not convert ANSI art into IRC formatting; and
- `/ansi send` always refuses.

Sixteen Colors' [archive policy](https://16colo.rs/privacy-policy/) says the
individual artwork remains its creator's intellectual property and that
viewing it publicly does not grant permission to reuse or alter it. A gallery
link lets the user see the work in its intended archival context without this
script asserting rights that it does not have.

## Search-context protection

By default, both commands bind their current results to the network and
conversation where the search began. A result found in `#cats` cannot be sent
or inspected from `#general`, nor can an identically named channel on another
network reuse it.

The setting is shared by the two commands:

```text
/ascii config context strict
/ascii config context anywhere
/ansi config show
```

`anywhere` is an explicit opt-out. It is useful when bIRC does not supply a
network or target to command callbacks, but it also removes the guard against
using stale results in the wrong place.

## Cache and privacy details

bIRC documents `birc.store` as persistent per-script data. It is not documented
as encrypted. This script stores public indexes, public art, public result
metadata, and the context policy—never credentials.

ASCII search terms stay local after the catalog has been cached. A Sixteen
Colors search term is sent to `api.16colo.rs` in an HTTPS request only when
that normalized query is absent from the cache or explicitly refreshed.

Cached data has versioned keys. A future incompatible script release can move
to a new key without misreading old data. bIRC currently exposes no way for a
script to enumerate all store keys, so the script provides targeted refreshes
rather than a misleading “clear everything” command.

## Script identity and updates

- ID: `com.github.aipokalyptik.birc-utils.text-art`
- Version: `1.0.0`

At load time the script checks the public bIRC Utils version manifest at most
once per 24 hours. A newer version notice includes the installed and available
versions, exact canonical script URL, a comparison link anchored to this file,
complete review-and-replacement instructions, and documentation. It never
downloads or executes an update. See [the enforced update
contract](../UPDATES.md).

## Adding another archive

A source should not become sendable merely because it has an API. Before
adding one, document all of the following:

1. a stable machine-readable search or catalog endpoint;
2. an explicit license covering each returned work;
3. the attribution and share-alike obligations, if any;
4. the archive's robots and rate-limit expectations; and
5. a representation that is safe and useful in IRC.

Sources without blanket or item-level reuse permission belong on the
discovery-only side. Generated-art services, scraped web galleries, and
collections whose terms grant only site-display rights are not interchangeable
with freely licensed art archives.
