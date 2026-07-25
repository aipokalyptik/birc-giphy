# Numeric Limits and Defaults

This inventory explains numeric limits that could otherwise look arbitrary.
It distinguishes representation or protocol boundaries from conservative
operational safeguards and aesthetic defaults.

| Area | Limit or default | Basis |
|---|---|---|
| Random integers | Signed/unsigned 8, 16, 32, 64, and 128 bit; JavaScript safe integers | Standard machine widths and JavaScript's exact integer boundary |
| Random floats | IEEE 754 binary32 and binary64 categories | Standard floating-point representations |
| Random timestamp | Complete signed-32-bit Unix time by default | Familiar interoperable Unix timestamp interval |
| Random strings and bytes | 512 characters; 256 bytes | Powers of two used as paste/transcript safety budgets |
| Random output | 20 items; 100 dice; 30 words; 12 sentences | Flood and readability safeguards |
| Remote replies | 4 lines of 400 characters | IRC transcript and anti-flood safeguard |
| Codec input | 4,096 characters | Paste-time work safeguard, not a format limit |
| Codec PHP data | Depth 64; 1,000 members | Denial-of-service safeguards for nested/untrusted data |
| MIME wrapping | 75 characters | MIME encoded-word line-length allowance |
| Hash input and work factors | 4,096 characters; bcrypt cost 4-12; phpass count logarithm 7-18 | Runtime safeguards inside the algorithms' valid parameter ranges |
| GIPHY query | 50 characters | Provider request contract |
| GIPHY results | Default 3; maximum 10 cached choices | Interactive presentation choice and provider courtesy |
| Text effects | 160 input characters; 420 characters per output line; 6 lines; 12 block-text characters | IRC readability and combining-mark containment safeguards |
| IRC colors | Indices 0 through 15 | Traditional mIRC color palette |
| Text-art search/render | 80-character query; 8 results; 80 columns; 20 lines; 350 characters per IRC line | Transcript safety and archive-provider courtesy |
| Update manifest | 65,536 bytes | Defensive network-response cap |

Color-scheme values, generated palette saturation/lightness, prose vocabulary,
and decorative effect intensity are aesthetic decisions. They are named and
documented as such rather than presented as technical standards.

When a limit is changed, its script README and tests must identify whether the
new value comes from a standard/provider contract or remains an operational or
aesthetic choice.
