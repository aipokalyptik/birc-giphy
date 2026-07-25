"use strict";

const fs = require("node:fs");
const path = require("node:path");

const legalCommentsPath = path.join(
    __dirname,
    "..",
    "birc-hash.js.LEGAL.txt"
);
const originalComments = fs.readFileSync(legalCommentsPath, "utf8");
const normalizedComments = originalComments
    .replace(/\t/g, "    ")
    .replace(/[ ]+$/gm, "");

fs.writeFileSync(legalCommentsPath, normalizedComments);
