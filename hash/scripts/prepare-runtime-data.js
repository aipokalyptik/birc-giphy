"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.join(__dirname, "..", "..");
const bcryptSourcePath = path.join(
    projectRoot,
    "node_modules",
    "bcryptjs",
    "index.js"
);
const generatedDirectory = path.join(projectRoot, "hash", "generated");
const runtimePath = path.join(generatedDirectory, "bcrypt-runtime.js");
const contractPath = path.join(
    generatedDirectory,
    "hash-data-contract.js"
);
const dataUrl =
    "https://www.ietf.org/archive/id/draft-schneier-blowfish-00.txt";

const bcryptSource = fs.readFileSync(bcryptSourcePath, "utf8");
const pTablePattern = /var P_ORIG = \[([\s\S]*?)\];/;
const sTablePattern = /var S_ORIG = \[([\s\S]*?)\];/;
const pTableMatch = pTablePattern.exec(bcryptSource);
const sTableMatch = sTablePattern.exec(bcryptSource);

if (pTableMatch === null || sTableMatch === null) {
    throw new Error("bcrypt table declarations were not found");
}

const bcryptP = Function(`"use strict"; return [${pTableMatch[1]}];`)();
const bcryptS = Function(`"use strict"; return [${sTableMatch[1]}];`)();

if (bcryptP.length !== 18) {
    throw new Error("bcrypt P table does not contain 18 words");
}

if (bcryptS.length !== 1024) {
    throw new Error("bcrypt S table does not contain 1024 words");
}

const dataDocument = JSON.stringify({
    version: 1,
    bcryptP,
    bcryptS
});
const dataPayload = dataDocument + "\n";
const dataDigest = crypto
    .createHash("sha256")
    .update(dataPayload, "utf8")
    .digest("hex");
const setterSource = [
    "export function setHashTables(hashTables) {",
    "  P_ORIG = hashTables.bcryptP;",
    "  S_ORIG = hashTables.bcryptS;",
    "}"
].join("\n");
const runtimeSource = bcryptSource
    .replace(
        "import nodeCrypto from \"crypto\";",
        "var nodeCrypto = {};"
    )
    .replace(pTablePattern, "var P_ORIG = [];")
    .replace(sTablePattern, "var S_ORIG = [];\n\n" + setterSource);
const contractSource = [
    `export const HASH_DATA_URL = ${JSON.stringify(dataUrl)};`,
    `export const HASH_DATA_SHA256 = ${JSON.stringify(dataDigest)};`,
    "export const HASH_DATA_STORE_KEY = \"hash.runtimeData.v1\";",
    ""
].join("\n");

fs.mkdirSync(generatedDirectory, { recursive: true });
fs.writeFileSync(runtimePath, runtimeSource);
fs.writeFileSync(contractPath, contractSource);
