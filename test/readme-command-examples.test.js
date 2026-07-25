"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repositoryRoot = path.join(__dirname, "..");

const requiredExamplesByReadme = {
    "random/README.md": [
        "/random integer",
        "/random float 2",
        "/random boolean 3",
        "/random string 8 lower",
        "/random string 8 upper",
        "/random string 8 letters",
        "/random string 8 alphanumeric",
        "/random string 8 hex",
        "/random string 8 symbols",
        "/random string 8 all",
        "/random uuid 2",
        "/random unicode 8 2",
        "/random sentence 6 2",
        "/random paragraph 2",
        "/random color 2",
        "/random palette complementary",
        "/random palette analogous",
        "/random palette",
        "/random palette tetradic",
        "/random palette split",
        "/random palette monochrome",
        "/random bytes 8",
        "/random hex 8",
        "/random base64 8",
        "/random choice",
        "/random shuffle",
        "/random dice",
        "/random ip v4",
        "/random ip v6",
        "/random mac 2",
        "/random timestamp",
        "/random remote status",
        "/random remote on",
        "/random remote off",
        "/random say",
        "/random help"
    ],
    "codec/README.md": [
        "/codec encode text",
        "/codec encode hex",
        "/codec encode base32",
        "/codec encode base64",
        "/codec encode base64url",
        "/codec encode base58",
        "/codec encode binary",
        "/codec encode bytes",
        "/codec encode integer",
        "all 81 canonical byte-format pairs",
        "/codec encode url",
        "/codec encode html",
        "/codec encode json",
        "/codec encode unicode",
        "/codec encode rot13",
        "/codec encode quoted-printable",
        "/codec encode mime-b",
        "/codec encode mime-q",
        "/codec encode punycode",
        "/codec encode php",
        "/codec formats",
        "/codec remote status",
        "/codec remote on",
        "/codec remote off",
        "/codec say encode",
        "/codec say decode",
        "/codec say convert",
        "/codec help"
    ],
    "hash/README.md": [
        "/hash digest md5",
        "/hash digest sha1",
        "/hash digest sha224",
        "/hash digest sha256",
        "/hash digest sha384",
        "/hash digest sha512",
        "/hash digest ripemd160",
        "/hash checksum crc32",
        "/hash checksum crc32c",
        "/hash checksum adler32",
        "/hash checksum fnv1a32",
        "/hash hmac md5",
        "/hash hmac sha1",
        "/hash hmac sha224",
        "/hash hmac sha256",
        "/hash hmac sha384",
        "/hash hmac sha512",
        "/hash hmac ripemd160",
        "/hash password bcrypt",
        "/hash password phpass",
        "/hash password crypt",
        "/hash verify",
        "/hash data status",
        "/hash data refresh",
        "/hash remote status",
        "/hash remote on",
        "/hash remote off",
        "/hash help"
    ],
    "giphy/README.md": [
        "/gif excited penguin",
        "/gif send 1",
        "/gif more",
        "/gif random celebration",
        "/gif cancel",
        "/gif help",
        "/gif config key",
        "/gif config rating g",
        "/gif config rating pg",
        "/gif config rating pg-13",
        "/gif config rating r",
        "/gif config results 1",
        "/gif config results 5",
        "/gif config results 10",
        "/gif config context strict",
        "/gif config context anywhere",
        "/gif config show",
        "/gif config test",
        "/gif config clear key",
        "/gif config clear all"
    ],
    "text-art/README.md": [
        "/ascii cat",
        "/ascii search cat",
        "/ascii preview 1",
        "/ascii info 1",
        "/ascii send 1",
        "/ascii cancel",
        "/ascii cache status",
        "/ascii cache refresh",
        "/ascii config show",
        "/ascii config context strict",
        "/ascii config context anywhere",
        "/ascii help",
        "/ansi acid",
        "/ansi search acid",
        "/ansi info 1",
        "/ansi cancel",
        "/ansi cache refresh acid",
        "/ansi config show",
        "/ansi config context strict",
        "/ansi config context anywhere",
        "/ansi send 1",
        "/ansi help"
    ]
};

for (const [readmePath, requiredExamples] of Object.entries(
    requiredExamplesByReadme
)) {
    test(readmePath + " documents input beside output for every option", () => {
        const readme = fs.readFileSync(
            path.join(repositoryRoot, readmePath),
            "utf8"
        );

        assert.match(readme, /\|[^|]*Example input[^|]*\|[^|]*output/i);

        for (const requiredExample of requiredExamples) {
            assert.equal(
                readme.includes(requiredExample),
                true,
                readmePath + " is missing an example for " + requiredExample
            );
        }
    });
}
