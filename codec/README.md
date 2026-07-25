# bIRC Codec Utilities

`birc-codec.js` encodes, decodes, and converts common computer-science and web
development formats entirely inside bIRC.

## Installation

1. Open bIRC's Scripts window with `⌘⌥S`.
2. Import `birc-codec.js`.
3. Enable the script.
4. Run `/codec help`.

The script makes no network requests and needs no HTTPS permission.

## Commands

```text
/codec encode <format> <text>
/codec decode <format> <encoded-data>
/codec convert <input-format> <output-format> <encoded-data>
/codec formats
```

Encoding and decoding operate between UTF-8 text and the selected format.
`convert` decodes bytes from the input format and re-encodes those same bytes
in the output format.

Output is printed locally by default. Prefix an operation with `say` to send
the result to the active conversation:

```text
/codec say encode base64 hello
```

To prevent one decoded value from becoming multiple IRC messages or carrying a
NUL byte, `say` refuses output containing NUL, carriage return, or line feed.
The same result can still be inspected locally without `say`.

Input is limited to 4,096 characters to avoid accidental transcript stalls.

## Byte formats

- `text`, `utf8`, `utf-8`
- `hex`, `base16`
- `base32`
- `base64`
- `base64url`
- `base58`
- `binary`, `bits`
- `bytes`, `decimal`, `numbers`
- `integer`

Examples:

```text
/codec encode hex Hello
/codec decode hex 48656C6C6F
/codec convert hex bytes 48656C6C6F
/codec convert hex integer FF
/codec convert integer hex 65535
```

The `bytes` format is a space- or comma-separated list of decimal octets.
`integer` treats the byte sequence as one unsigned big-endian integer.

Base16, Base32, Base64, and Base64url follow RFC 4648. Base58 uses the Bitcoin
alphabet, which omits visually ambiguous characters.

There is no `base128` format. Unlike Base16, Base32, and Base64, “Base128”
does not identify one common interoperable text encoding. Protocol-specific
base-128 integer encodings such as LEB128 and variable-length quantities have
different contracts and are not silently conflated here.

## Text and web transforms

- `url`, `percent` — URL-component percent encoding
- `html` — the five syntax-significant HTML characters plus numeric entity
  decoding
- `json` — one JSON string literal, including its surrounding quotes
- `unicode`, `codepoints` — `U+0041 U+1F680` notation
- `rot13`
- `quoted-printable`, `qp` — UTF-8 quoted-printable
- `mime-b` — UTF-8 RFC 2047 Base64 encoded-word
- `mime-q` — UTF-8 RFC 2047 Q encoded-word
- `mime` — decode either supported MIME encoded-word
- `punycode` — encode or decode each label in a domain name

Examples:

```text
/codec encode url query string & value
/codec encode html <button title="Save">
/codec encode unicode A🚀
/codec decode unicode U+0041 U+1F680
/codec encode quoted-printable café
/codec encode mime-b Résumé
/codec encode punycode münich.example
```

Punycode implements the RFC 3492 transformation itself. It does not perform
the broader IDNA mapping and policy checks from an IDNA library, so callers
should not treat it as hostname validation.

MIME encoded-word creation accepts one value whose complete encoded form fits
the RFC 2047 limit of 75 characters. It reports an error rather than emitting
an invalid oversized word. Decoding supports one UTF-8 or US-ASCII encoded-word
at a time.

## Failure behavior

Decoders validate their alphabets, padding, complete bytes, UTF-8 structure,
Unicode scalar values, and format-specific syntax. Invalid input produces a
visible `[Codec]` error and no partial result.

HTML decoding intentionally recognizes only named entities emitted by this
script (`amp`, `lt`, `gt`, `quot`, and `apos`) plus numeric entities. It is not
an HTML parser or a complete copy of the HTML named-character-reference table.

## Development

Run the complete repository contract suite with:

```sh
npm test
```
