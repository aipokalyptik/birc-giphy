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

### Command, option, and output examples

| Digest option | Example input | Exact output |
|---|---|---|
| `md5` | `/hash digest md5 abc` | `900150983cd24fb0d6963f7d28e17f72` |
| `sha1` | `/hash digest sha1 abc` | `a9993e364706816aba3e25717850c26c9cd0d89d` |
| `sha224` | `/hash digest sha224 abc` | `23097d223405d8228642a477bda255b32aadbce4bda0b3f7e36c9da7` |
| `sha256` | `/hash digest sha256 abc` | `ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad` |
| `sha384` | `/hash digest sha384 abc` | `cb00753f45a35e8bb5a03d699ac65007272c32ab0eded1631a8b605a43ff5bed8086072ba1e7cc2358baeca134c825a7` |
| `sha512` | `/hash digest sha512 abc` | `ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f` |
| `ripemd160` | `/hash digest ripemd160 abc` | `8eb208f7e05d987a9b044a8e98c6b087f15a0bfc` |

| Checksum option | Example input | Exact output |
|---|---|---|
| `crc32` | `/hash checksum crc32 123456789` | `cbf43926` |
| `crc32c` | `/hash checksum crc32c 123456789` | `e3069283` |
| `adler32` | `/hash checksum adler32 Wikipedia` | `11e60398` |
| `fnv1a32` | `/hash checksum fnv1a32 hello` | `4f9f2cab` |

All HMAC rows use key `secret` and message `message`:

| HMAC option | Example input | Exact output |
|---|---|---|
| `md5` | `/hash hmac md5 secret \| message` | `7e0d0767775312154ba16fd3af9771a2` |
| `sha1` | `/hash hmac sha1 secret \| message` | `0caf649feee4953d87bf903ac1176c45e028df16` |
| `sha224` | `/hash hmac sha224 secret \| message` | `99476f8dd28f3065c1787c8351a6d8f157541d9bcc0b7d1ee649850a` |
| `sha256` | `/hash hmac sha256 secret \| message` | `8b5f48702995c1598c573db1e21866a9b825d4a794d169d7060a03605796360b` |
| `sha384` | `/hash hmac sha384 secret \| message` | `ad0ef4e80da427b2a33d4457c972bf759f50766fbb665690d50b7cb38dd5217db559c93ea7cbee48e2ae1a5b4aafd34b` |
| `sha512` | `/hash hmac sha512 secret \| message` | `1bba587c730eedba31f53abb0b6ca589e09de4e894ee455e6140807399759adaafa069eec7c01647bb173dcb17f55d22af49a18071b748c5c2edd7f7a829c632` |
| `ripemd160` | `/hash hmac ripemd160 secret \| message` | `c66cf705f6c9dd35a0dfe512c7a9bd0bbcf533a2` |

| Password or control option | Example input | Exact output |
|---|---|---|
| Explicit bcrypt | `/hash password bcrypt 4 ...................... \| password` | `$2b$04$......................LAtw7/ohmmBAhnXqmkuIz83Rl5Qdjhm` |
| bcrypt stored setting | `/hash password $2b$04$...................... \| password` | `$2b$04$......................LAtw7/ohmmBAhnXqmkuIz83Rl5Qdjhm` |
| bcrypt stored hash | `/hash password $2b$04$......................LAtw7/ohmmBAhnXqmkuIz83Rl5Qdjhm \| password` | The same complete hash |
| bcrypt `$2a$` / `$2y$` | `/hash password $2y$04$...................... \| password` | A `$2y$04$…` hash with the supplied setting |
| Explicit phpass | `/hash password phpass 8 12345678 \| password` | `$P$612345678U1QdGJQj/LH52EnuhEn170` |
| phpass `$P$` setting | `/hash password $P$612345678 \| password` | `$P$612345678U1QdGJQj/LH52EnuhEn170` |
| phpass `$H$` setting | `/hash password $H$612345678 \| password` | `$H$612345678U1QdGJQj/LH52EnuhEn170` |
| DES crypt explicit salt | `/hash password crypt ab \| password` | `abJnggxhB/yWI` |
| DES crypt stored setting | `/hash password ab \| password` | `abJnggxhB/yWI` |
| DES crypt stored hash | `/hash password abJnggxhB/yWI \| password` | `abJnggxhB/yWI` |
| Verify matching | `/hash verify $P$612345678U1QdGJQj/LH52EnuhEn170 \| password` | `MATCH` |
| Verify nonmatching | `/hash verify $P$612345678U1QdGJQj/LH52EnuhEn170 \| wrong` | `NO MATCH` |
| `data status` | `/hash data status` | `bcrypt data is ready.` after validated data has loaded |
| `data refresh` | `/hash data refresh` | On success: `bcrypt data downloaded, validated, and cached.` |
| `remote status` | `/hash remote status` | `Remote @mention use is disabled.` |
| `remote on` | `/hash remote on` | `Remote @mention use is enabled.` |
| `remote off` | `/hash remote off` | `Remote @mention use is disabled.` |
| `help` | `/hash help` or `/hash` | Prints the complete local hashing manual. |

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
