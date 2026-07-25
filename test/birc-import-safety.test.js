"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const acorn = require("acorn");

const repositoryRoot = path.join(__dirname, "..");

function isFunctionNode(node) {
    return node.type === "FunctionDeclaration" ||
        node.type === "FunctionExpression" ||
        node.type === "ArrowFunctionExpression";
}

function visitChildren(node, visitor) {
    for (const propertyName of Object.keys(node)) {
        const child = node[propertyName];

        if (Array.isArray(child)) {
            for (const arrayItem of child) {
                if (arrayItem && typeof arrayItem.type === "string") {
                    visitor(arrayItem, node);
                }
            }
        } else if (child && typeof child.type === "string") {
            visitor(child, node);
        }
    }
}

function functionName(node, parent) {
    if (node.id && node.id.type === "Identifier") {
        return node.id.name;
    }

    if (
        parent &&
        parent.type === "VariableDeclarator" &&
        parent.id.type === "Identifier"
    ) {
        return parent.id.name;
    }

    return "";
}

function inspectScript(relativePath) {
    const source = fs.readFileSync(
        path.join(repositoryRoot, relativePath),
        "utf8"
    );
    const tree = acorn.parse(source, {
        ecmaVersion: "latest",
        sourceType: "script"
    });
    const functionNodes = [];

    function collectFunctions(node, parent) {
        if (isFunctionNode(node)) {
            functionNodes.push({
                name: functionName(node, parent),
                node
            });
        }

        visitChildren(node, collectFunctions);
    }

    collectFunctions(tree, null);

    const callsByFunctionName = new Map();

    for (const functionRecord of functionNodes) {
        if (functionRecord.name.length === 0) {
            continue;
        }

        if (!callsByFunctionName.has(functionRecord.name)) {
            callsByFunctionName.set(functionRecord.name, new Set());
        }

        const calledNames = callsByFunctionName.get(functionRecord.name);

        function collectCalls(node) {
            if (node !== functionRecord.node && isFunctionNode(node)) {
                return;
            }

            if (
                node.type === "CallExpression" &&
                node.callee.type === "Identifier"
            ) {
                calledNames.add(node.callee.name);
            }

            visitChildren(node, collectCalls);
        }

        collectCalls(functionRecord.node.body);
    }

    return {
        callsByFunctionName,
        functionCount: functionNodes.length
    };
}

function findNamedCallCycle(callsByFunctionName) {
    const activeNames = new Set();
    const completedNames = new Set();
    const pathNames = [];

    function visitFunction(functionNameToVisit) {
        if (activeNames.has(functionNameToVisit)) {
            const cycleStart = pathNames.indexOf(functionNameToVisit);
            return pathNames.slice(cycleStart).concat(functionNameToVisit);
        }

        if (completedNames.has(functionNameToVisit)) {
            return null;
        }

        activeNames.add(functionNameToVisit);
        pathNames.push(functionNameToVisit);

        const calledNames =
            callsByFunctionName.get(functionNameToVisit) || new Set();

        for (const calledName of calledNames) {
            if (!callsByFunctionName.has(calledName)) {
                continue;
            }

            const cycle = visitFunction(calledName);

            if (cycle !== null) {
                return cycle;
            }
        }

        pathNames.pop();
        activeNames.delete(functionNameToVisit);
        completedNames.add(functionNameToVisit);
        return null;
    }

    for (const availableName of callsByFunctionName.keys()) {
        const cycle = visitFunction(availableName);

        if (cycle !== null) {
            return cycle;
        }
    }

    return null;
}

test("pasteable hash script stays within bIRC's 200-function limit", () => {
    const inspection = inspectScript("hash/birc-hash.js");

    assert.ok(
        inspection.functionCount <= 200,
        "hash/birc-hash.js defines " + inspection.functionCount + " functions"
    );
});

for (const scriptPath of [
    "codec/birc-codec.js",
    "hash/birc-hash.js"
]) {
    test(scriptPath + " has no named direct or mutual recursion", () => {
        const inspection = inspectScript(scriptPath);
        const cycle = findNamedCallCycle(inspection.callsByFunctionName);

        assert.equal(
            cycle,
            null,
            cycle === null ? "" : "call cycle: " + cycle.join(" -> ")
        );
    });
}
