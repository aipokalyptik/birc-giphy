# bIRC Hash Utilities

## Summary

`birc-hash.js` calculates hashes locally. Import that generated standalone file
in bIRC and run `/hash help`.

## Commands

```text
/hash digest <md5|sha1|sha224|sha256|sha384|sha512|ripemd160> <text>
/hash checksum <crc32|crc32c|adler32|fnv1a32> <text>
/hash hmac <md5|sha1|sha224|sha256|sha384|sha512|ripemd160> <key> | <message>
/hash password <setting-or-hash> | <password>
/hash password bcrypt <cost 4-12> <22-character-salt> | <password>
/hash password phpass <count-log2 7-18> <8-character-salt> | <password>
/hash password crypt <2-character-salt> | <password>
/hash verify <encoded-password-hash> | <password>
/hash data <status|refresh>
/hash remote <on|off|status>
```

The generic password form accepts the common stored representation directly:
bcrypt `$2a$`, `$2b$`, and `$2y$` settings or complete hashes; portable phpass
`$P$` and `$H$` settings or complete hashes; and traditional DES `crypt`
two-character settings or complete 13-character hashes. When given a complete
hash, the script reuses its embedded algorithm parameters and salt and emits a
new hash for the supplied password. The explicit forms remain available.

## Optional remote use

Remote use is disabled by default. Enable it with `/hash remote on`; the
setting persists for this script. Another user can then use:

```text
@YourNick hash digest sha256 hello
@YourNick /hash checksum crc32 123456789
```

The response is sent to the originating channel, or back to the sender for a
direct message, and is prefixed with their nick. Self-authored and backlog
messages are ignored. Remote use is deliberately limited to digest and
checksum operations: HMAC, password hashing, verification, and data-management
commands could expose secrets or consume excessive work. Replies are limited
to four lines and 400 characters per line. Disable the listener with
`/hash remote off`.

`/hash remote status` reports the persistent setting. Remote callers cannot
change it. Both `@YourNick hash ...` and `@YourNick /hash ...` are accepted,
using bIRC's network-aware nick comparison.

The first `|` separates fields for HMAC and password commands. Values containing
a literal pipe cannot be represented by those commands.

## Command reference and examples

Digests hash the UTF-8 text following the algorithm:

```text
/hash digest md5 abc
/hash digest sha256 hello
/hash digest sha512 The quick brown fox
```

Checksums emit lowercase, zero-padded hexadecimal:

```text
/hash checksum crc32 123456789
/hash checksum crc32c 123456789
/hash checksum adler32 Wikipedia
/hash checksum fnv1a32 hello
```

HMAC places the key left of the first pipe and the message on its right:

```text
/hash hmac sha256 secret | message
```

Password hashing accepts explicit parameters:

```text
/hash password bcrypt 4 ...................... | password
/hash password phpass 8 12345678 | password
/hash password crypt ab | password
```

It also accepts a stored setting or complete hash:

```text
/hash password $2b$04$...................... | password
/hash password $P$612345678 | password
/hash password abJnggxhB/yWI | password
```

A complete stored hash is not reversed. Its parameters and salt are reused to
hash the supplied candidate. For comparison, use:

```text
/hash verify $P$612345678U1QdGJQj/LH52EnuhEn170 | password
```

The result is exactly `MATCH` or `NO MATCH`; malformed or unsupported formats
produce visible errors. `/hash data status` reports bcrypt readiness, while
`/hash data refresh` downloads and validates the authoritative tables again.
Digest, checksum, HMAC, phpass, and DES operations do not require those tables.

## Security boundaries

bIRC API version 1 does not expose Web Crypto. This script therefore requires
the caller to supply password salts and never substitutes `Math.random()`.
Generate salts with a cryptographically secure tool outside bIRC.

The standalone script downloads the immutable Blowfish initialization tables
from the IETF's permanent archive of `draft-schneier-blowfish-00`. It extracts
only Appendix A's P-array and S-boxes, pins the normalized table's SHA-256
digest, validates its shape, and stores validated compact JSON through
`birc.store`. Later loads use the cached copy. bcrypt commands remain
unavailable until initialization succeeds; all other commands remain usable.
Use `/hash data status` to inspect state or `/hash data refresh` to retry.

The script requires HTTPS permission for this data request. No password, HMAC
key, message, digest, or salt is included in the request.

For new password systems, use a platform password API with Argon2id or bcrypt
and automatic secure salt generation. The bundled bcrypt command is provided
for explicit-salt interoperability and caps cost at 12 to avoid freezing the
bIRC interface indefinitely. bcrypt rejects passwords beyond its 72-byte
limit.

MD5, SHA-1, phpass portable hashes, and traditional DES `crypt` are present
only for legacy interoperability. DES `crypt` accepts at most eight ASCII
characters. None should be selected for a new security design. CRC, Adler-32,
and FNV are checksums, not cryptographic hashes.

HMAC keys are secrets. Although computation is local, typing a key into a chat
composer may leave it in input history. Use this convenience only when that
local exposure is acceptable.

## Script identity and updates

- ID: `com.github.aipokalyptik.birc-utils.hash`
- Version: `1.0.1`

At load time the script checks the public bIRC Utils version manifest at most
once per 24 hours. A newer version notice includes the installed and available
versions, exact standalone script URL, a comparison link anchored to that
file, complete review-and-replacement instructions, and documentation. It
never downloads or executes an update. See [the enforced update
contract](../UPDATES.md).

## Vendored implementations

The standalone build contains:

- CryptoJS 4.2.0 (MIT) for MD5, SHA, and HMAC primitives.
- bcrypt.js 3.0.3 (BSD-3-Clause) for bcrypt.
- unix-crypt-td-js 1.1.4 (BSD-3-Clause) for traditional DES `crypt`.

Their notices are recorded in `THIRD_PARTY_NOTICES.md`. The readable command
layer is `src/birc-hash.js`; rebuild the importable script with:

```sh
npm install
npm run build:hash
```

The build extracts bcrypt's fixed P/S tables from the pinned bcrypt.js
dependency to calculate the normalized SHA-256 digest and generates the small
runtime contract used by the standalone script. The table itself is not hosted
by this repository. Generated build-input modules under `generated/` are
intentionally not committed.
