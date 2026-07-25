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

`/ascii send 1` then downloads that item once, validates it, saves it in the
per-script data store, and sends its lines to the conversation.

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
/ascii info <number>
/ascii send <number>
/ascii cancel
/ascii cache status
/ascii cache refresh
/ascii config show
/ascii config context <strict|anywhere>
/ascii help
```

The initial search downloads the
[Artscii](https://github.com/rxolve/artscii) JSON catalog. Later searches use
the stored catalog and make no network request. A selected art file is fetched
once and is reused from the cache thereafter. `/ascii cache refresh` is the
only normal way to repeat the catalog request.

Searches match every normalized query word against the item's name, identifier,
category, description, and tags. Exact names rank first. At most eight results
are shown.

Before sending, the script rejects:

- control characters other than line breaks;
- more than 20 lines;
- lines wider than 80 characters; and
- empty or malformed responses.

It never silently crops or rewrites the artist's work. Each line is passed to
`birc.say` only after the whole item has passed validation. Sending twenty IRC
messages can still be too fast for a particular network; use judgment and
respect channel rules.

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
