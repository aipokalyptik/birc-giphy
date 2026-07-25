# Script identities and update checks

Every pasteable bIRC script carries three immutable pieces of update metadata:

- a reverse-domain script identifier;
- an independent semantic version; and
- its canonical directory in this repository.

[`updates.json`](updates.json) is the authoritative, machine-readable list of
current versions. A script checks the raw copy of that file on this
repository's `main` branch when it loads, subject to a 24-hour cache.

## Behavior

The checker:

1. reports a previously cached newer version immediately;
2. attempts a manifest refresh only when the previous attempt is at least 24
   hours old;
3. validates the manifest schema, identifier, and numeric `major.minor.patch`
   version;
4. reports only versions strictly newer than its embedded version;
5. links to the exact hardcoded canonical script file and documentation; and
6. constructs a GitHub comparison link between immutable per-script release
   tags and appends GitHub's SHA-256 file anchor so the page opens at the
   relevant script diff.

The manifest cannot supply a download URL, load JavaScript, or cause automatic
installation. Updating remains an explicit review-and-paste operation.

GitHub comparison pages still cover the repository commits between two tags
and can contain neighboring files changed during the same interval. The anchor
opens the page at the exact script diff; the canonical file link remains the
authoritative replacement.

If HTTPS permission is disabled, GitHub is unavailable, or the response is
invalid, the failure is written only to the script console. Commands and local
features continue normally. Failed attempts are also rate-limited.

## Privacy and storage

The request is an HTTPS GET to:

```text
https://raw.githubusercontent.com/aipokalyptik/birc-utils/main/updates.json
```

It contains no identifier, query string, credentials, user data, network name,
channel, or IRC content beyond the ordinary request metadata supplied by the
HTTP stack. bIRC routes script requests through the triggering IRC profile's
configured proxy.

Each script stores its last-attempt time and last valid public version in its
own `birc.store` namespace. bIRC does not document that store as encrypted, but
the update cache contains no secrets.

## Release procedure

The following is a hard release rule. Tests enforce the embedded identity,
canonical file URL, tag prefix, comparison URL, and complete update-instruction
language. When a pasteable script changes:

1. increment that script's embedded semantic version;
2. update the matching `updates.json` entry in the same commit;
3. update tests and documentation;
4. regenerate the standalone hash bundle when the hash source changes;
5. run `npm test`; and
6. commit and push both changes together;
7. create the immutable tag `birc-utils-<script>-v<version>` at that commit; and
8. push the tag to `origin`.

Do not reuse an identifier for an incompatible or unrelated script. Renaming a
directory does not require changing the identifier, but the script's hardcoded
canonical page URL must move with it.
