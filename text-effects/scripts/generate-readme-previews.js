"use strict";

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const textEffectsDirectory = path.join(__dirname, "..");
const scriptSource = fs.readFileSync(
    path.join(textEffectsDirectory, "birc-text-effects.js"),
    "utf8"
);
const outputDirectory = path.join(textEffectsDirectory, "previews");
const statusPrefix = "[Text effects] ";
const ircColors = [
    "#ffffff", "#000000", "#00007f", "#009300",
    "#ff0000", "#7f0000", "#9c009c", "#fc7f00",
    "#ffff00", "#00fc00", "#009393", "#00ffff",
    "#0000fc", "#ff00ff", "#7f7f7f", "#d2d2d2"
];

function createDeterministicMath() {
    const deterministicMath = Object.create(Math);
    let state = 0x5eed1234;

    deterministicMath.random = function deterministicRandom() {
        state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
        return state / 0x100000000;
    };

    return deterministicMath;
}

function createHarness() {
    const commands = {};
    const printedLines = [];
    const birc = {
        target: "#preview",
        print(text) {
            printedLines.push(text);
        },
        say() {},
        onCommand(name, handler) {
            commands[name] = handler;
        },
        onComplete() {},
        on() {}
    };

    vm.runInNewContext(scriptSource, {
        birc,
        console,
        Math: createDeterministicMath()
    });

    return {
        run(command) {
            printedLines.length = 0;
            commands.text(command, {
                target: "#preview"
            });
            return printedLines.map((line) => {
                return line.startsWith(statusPrefix)
                    ? line.slice(statusPrefix.length)
                    : line;
            });
        }
    };
}

function example(label, command, options = {}) {
    return {
        command,
        label,
        tall: options.tall === true,
        zalgo: options.zalgo === true
    };
}

function section(title, examples) {
    return {
        title,
        examples
    };
}

const previewSections = [
    section("Word transformations", [
        example("Leet · light", "leet light Hack the planet"),
        example("Leet · classic", "leet classic Hack the planet"),
        example("Leet · extreme", "leet extreme Hack the planet"),
        example("Alternating", "alternating Mock me please"),
        example("Mock · alias of alternating", "mock Mock me please"),
        example("Reverse", "reverse Hello, IRC!"),
        example("Upside down", "upsidedown Hello, IRC!"),
        example("Clap", "clap one two three")
    ]),
    section("Unicode novelty forms", [
        example("Fullwidth", "fullwidth Hello 123"),
        example("Vaporwave", "vaporwave Hello 123"),
        example("Circled", "circled Hello 123"),
        example("Small capitals", "smallcaps Hello IRC"),
        example("Regional indicators", "regional IRC"),
        example("Mathematical bold", "bold Hello 123"),
        example("Mathematical italic", "italic Hello 123"),
        example("Mathematical monospace", "monospace Hello 123"),
        example("Zalgo · low", "zalgo low Contained", {
            tall: true,
            zalgo: true
        }),
        example("Zalgo · medium", "zalgo medium Contained", {
            tall: true,
            zalgo: true
        }),
        example("Zalgo · high", "zalgo high Contained", {
            tall: true,
            zalgo: true
        })
    ]),
    section("Named IRC color schemes", [
        example("Rainbow", "scheme rainbow Colorful text"),
        example("Rainbow command alias", "rainbow Colorful text"),
        example("Fire", "scheme fire Colorful text"),
        example("Ocean", "scheme ocean Colorful text"),
        example("Catppuccin", "scheme catppuccin Colorful text"),
        example("Dracula", "scheme dracula Colorful text"),
        example("Nord", "scheme nord Colorful text")
    ]),
    section("IRC foreground colors · indexes 00–15", Array.from({
        length: 16
    }, (_, colorIndex) => {
        const paddedIndex = String(colorIndex).padStart(2, "0");
        return example(
            "Foreground " + paddedIndex,
            "color " + colorIndex + " IRC color " + paddedIndex
        );
    })),
    section("IRC background colors · indexes 00–15", Array.from({
        length: 16
    }, (_, backgroundIndex) => {
        const foregroundIndex = [
            1, 0, 0, 1, 0, 0, 0, 1,
            1, 1, 1, 1, 0, 0, 0, 1
        ][backgroundIndex];
        const paddedIndex = String(backgroundIndex).padStart(2, "0");
        return example(
            "Background " + paddedIndex,
            "color " + foregroundIndex + " " + backgroundIndex +
                " IRC background " + paddedIndex
        );
    })),
    section("IRC character formatting", [
        example("Bold", "ircbold Important"),
        example("Italic", "ircitalic Emphasis"),
        example("Underline", "ircunderline Underlined"),
        example("Strikethrough", "ircstrike Corrected")
    ]),
    section("Visible ANSI escape notation", [
        ...[
            "black", "red", "green", "yellow",
            "blue", "magenta", "cyan", "white"
        ].map((colorName) => {
            return example(
                "ANSI · " + colorName,
                "ansi " + colorName + " Terminal text"
            );
        })
    ]),
    section("Boxes and block lettering", [
        example("Unicode box", "box Boxed text", {
            tall: true
        }),
        example("Block · simple (default)", "block simple IRC", {
            tall: true
        }),
        example("ASCII · alias of block", "ascii simple IRC", {
            tall: true
        }),
        example("Block · mini", "block mini IRC", {
            tall: true
        }),
        example("Block · small", "block small IRC", {
            tall: true
        }),
        example("Solid blocks · simple", "blocks simple IRC", {
            tall: true
        }),
        example("Solid blocks · mini", "blocks mini IRC", {
            tall: true
        }),
        example("Solid blocks · small", "blocks small IRC", {
            tall: true
        })
    ])
];

function escapeXml(value) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function parseIrcLine(line) {
    const runs = [];
    let background = null;
    let bold = false;
    let foreground = null;
    let italic = false;
    let runText = "";
    let strike = false;
    let underline = false;

    function flushRun() {
        if (runText.length === 0) {
            return;
        }

        runs.push({
            background,
            bold,
            foreground,
            italic,
            strike,
            text: runText,
            underline
        });
        runText = "";
    }

    for (let index = 0; index < line.length; index += 1) {
        const character = line[index];

        if (character === "\u0003") {
            flushRun();
            const colorMatch = /^(\d{1,2})(?:,(\d{1,2}))?/.exec(
                line.slice(index + 1)
            );

            if (colorMatch === null) {
                foreground = null;
                background = null;
                continue;
            }

            foreground = Number(colorMatch[1]);
            background = colorMatch[2] === undefined
                ? null
                : Number(colorMatch[2]);
            index += colorMatch[0].length;
            continue;
        }

        if (character === "\u0002") {
            flushRun();
            bold = !bold;
            continue;
        }

        if (character === "\u001d") {
            flushRun();
            italic = !italic;
            continue;
        }

        if (character === "\u001f") {
            flushRun();
            underline = !underline;
            continue;
        }

        if (character === "\u001e") {
            flushRun();
            strike = !strike;
            continue;
        }

        if (character === "\u000f") {
            flushRun();
            background = null;
            bold = false;
            foreground = null;
            italic = false;
            strike = false;
            underline = false;
            continue;
        }

        runText += character;
    }

    flushRun();
    return runs;
}

function renderLine(line, x, y, defaultColor) {
    const runs = parseIrcLine(line);
    const backgroundRun = runs.find((run) => run.background !== null);
    let rendered = "";

    if (backgroundRun !== undefined) {
        rendered +=
            `<rect x="${x - 8}" y="${y - 21}" width="1090" height="30" ` +
            `rx="5" fill="${ircColors[backgroundRun.background]}"/>`;
    }

    rendered +=
        `<text x="${x}" y="${y}" class="output" fill="${defaultColor}" ` +
        'xml:space="preserve">';

    for (const run of runs) {
        const decorations = [];

        if (run.underline) {
            decorations.push("underline");
        }

        if (run.strike) {
            decorations.push("line-through");
        }

        const styles = [
            run.foreground === null
                ? ""
                : "fill:" + ircColors[run.foreground],
            run.bold ? "font-weight:700" : "",
            run.italic ? "font-style:italic" : "",
            decorations.length === 0
                ? ""
                : "text-decoration:" + decorations.join(" ")
        ].filter(Boolean).join(";");

        rendered += `<tspan style="${styles}">${escapeXml(run.text)}</tspan>`;
    }

    return rendered + "</text>";
}

function renderPreview(themeName) {
    const harness = createHarness();
    const darkTheme = themeName === "dark";
    const pageBackground = darkTheme ? "#0d1117" : "#ffffff";
    const cardBackground = darkTheme ? "#161b22" : "#f6f8fa";
    const cardBorder = darkTheme ? "#30363d" : "#d0d7de";
    const headingColor = darkTheme ? "#f0f6fc" : "#1f2328";
    const labelColor = darkTheme ? "#8c959f" : "#59636e";
    const outputColor = darkTheme ? "#e6edf3" : "#1f2328";
    const accentColor = darkTheme ? "#a371f7" : "#8250df";
    const width = 1280;
    const margin = 48;
    const cardWidth = width - margin * 2;
    const fragments = [];
    let y = 52;
    let clipIndex = 0;

    fragments.push(
        `<text x="${margin}" y="${y}" class="title" fill="${headingColor}">` +
        `bIRC Text Effects · ${themeName} background</text>`
    );
    y += 30;
    fragments.push(
        `<text x="${margin}" y="${y}" class="subtitle" fill="${labelColor}">` +
        "Generated from birc-text-effects.js · IRC controls are rendered visually" +
        "</text>"
    );
    y += 42;

    for (const previewSection of previewSections) {
        fragments.push(
            `<text x="${margin}" y="${y}" class="section" fill="${accentColor}">` +
            escapeXml(previewSection.title) +
            "</text>"
        );
        y += 20;

        for (const previewExample of previewSection.examples) {
            const outputLines = harness.run(previewExample.command);
            const outputLineHeight = previewExample.zalgo ? 40 : 24;
            const outputTopPadding = previewExample.zalgo ? 43 : 30;
            const cardHeight = Math.max(
                previewExample.tall ? 98 : 72,
                48 + outputTopPadding +
                    Math.max(1, outputLines.length - 1) * outputLineHeight
            );
            const clipId = "output-clip-" + clipIndex;
            clipIndex += 1;

            fragments.push(
                `<rect x="${margin}" y="${y}" width="${cardWidth}" ` +
                `height="${cardHeight}" rx="9" fill="${cardBackground}" ` +
                `stroke="${cardBorder}"/>`
            );
            fragments.push(
                `<text x="${margin + 18}" y="${y + 23}" class="label" ` +
                `fill="${labelColor}">${escapeXml(previewExample.label)} · ` +
                `<tspan class="command">/text ${escapeXml(previewExample.command)}` +
                "</tspan></text>"
            );
            fragments.push(
                `<clipPath id="${clipId}"><rect x="${margin + 12}" ` +
                `y="${y + 31}" width="${cardWidth - 24}" ` +
                `height="${cardHeight - 38}" rx="5"/></clipPath>`
            );
            fragments.push(`<g clip-path="url(#${clipId})">`);

            outputLines.forEach((line, lineIndex) => {
                fragments.push(renderLine(
                    line,
                    margin + 22,
                    y + 31 + outputTopPadding + lineIndex * outputLineHeight,
                    outputColor
                ));
            });

            fragments.push("</g>");
            y += cardHeight + 10;
        }

        y += 25;
    }

    y += 24;

    return [
        `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${y}" ` +
            `viewBox="0 0 ${width} ${y}" role="img" ` +
            `aria-label="All bIRC text effects on a ${themeName} background">`,
        "<style>",
        ".title{font:700 25px -apple-system,BlinkMacSystemFont,\"Segoe UI\",sans-serif}",
        ".subtitle{font:14px -apple-system,BlinkMacSystemFont,\"Segoe UI\",sans-serif}",
        ".section{font:700 17px -apple-system,BlinkMacSystemFont,\"Segoe UI\",sans-serif}",
        ".label{font:600 13px -apple-system,BlinkMacSystemFont,\"Segoe UI\",sans-serif}",
        ".command{font:400 12px ui-monospace,SFMono-Regular,Consolas,monospace}",
        ".output{font:18px ui-monospace,SFMono-Regular,Consolas,\"DejaVu Sans Mono\",monospace}",
        "</style>",
        `<rect width="${width}" height="${y}" fill="${pageBackground}"/>`,
        ...fragments,
        "</svg>",
        ""
    ].join("\n");
}

fs.mkdirSync(outputDirectory, {
    recursive: true
});

for (const themeName of ["light", "dark"]) {
    fs.writeFileSync(
        path.join(
            outputDirectory,
            "text-effects-" + themeName + ".svg"
        ),
        renderPreview(themeName)
    );
}
