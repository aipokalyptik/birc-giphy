# bIRC Hash Utilities

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
```

The generic password form accepts the common stored representation directly:
bcrypt `$2a$`, `$2b$`, and `$2y$` settings or complete hashes; portable phpass
`$P$` and `$H$` settings or complete hashes; and traditional DES `crypt`
two-character settings or complete 13-character hashes. When given a complete
hash, the script reuses its embedded algorithm parameters and salt and emits a
new hash for the supplied password. The explicit forms remain available.

The first `|` separates fields for HMAC and password commands. Values containing
a literal pipe cannot be represented by those commands.

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
