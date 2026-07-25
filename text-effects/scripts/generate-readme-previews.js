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

function renderLine(line, x, y, defaultColor, maximumWidth) {
    const runs = parseIrcLine(line);
    const backgroundRun = runs.find((run) => run.background !== null);
    let rendered = "";

    if (backgroundRun !== undefined) {
        rendered +=
            `<rect x="${x - 8}" y="${y - 21}" width="${maximumWidth}" height="30" ` +
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

function sectionFileName(sectionTitle) {
    return sectionTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") + ".svg";
}

function renderSectionPreview(previewSection) {
    const harness = createHarness();
    const width = 1440;
    const margin = 24;
    const labelWidth = 350;
    const gap = 12;
    const paneWidth = (width - margin * 2 - labelWidth - gap * 2) / 2;
    const lightPaneX = margin + labelWidth + gap;
    const darkPaneX = lightPaneX + paneWidth + gap;
    const fragments = [];
    let y = 44;
    let clipIndex = 0;

    fragments.push(
        `<text x="${margin}" y="${y}" class="title" fill="#1f2328">` +
        escapeXml(previewSection.title) + "</text>"
    );
    fragments.push(
        `<text x="${lightPaneX + 12}" y="${y}" class="column" fill="#59636e">` +
        "LIGHT TRANSCRIPT</text>"
    );
    fragments.push(
        `<text x="${darkPaneX + 12}" y="${y}" class="column" fill="#8c959f">` +
        "DARK TRANSCRIPT</text>"
    );
    y += 18;

    for (const previewExample of previewSection.examples) {
        const outputLines = harness.run(previewExample.command);
        const outputLineHeight = previewExample.zalgo ? 40 : 23;
        const outputTopPadding = previewExample.zalgo ? 42 : 29;
        const rowHeight = Math.max(
            previewExample.tall ? 112 : 78,
            34 + outputTopPadding +
                Math.max(1, outputLines.length - 1) * outputLineHeight
        );
        const lightClipId = "light-output-" + clipIndex;
        const darkClipId = "dark-output-" + clipIndex;
        clipIndex += 1;

        fragments.push(
            `<rect x="${margin}" y="${y}" width="${labelWidth}" ` +
            `height="${rowHeight}" rx="8" fill="#ffffff" stroke="#d0d7de"/>`
        );
        fragments.push(
            `<text x="${margin + 14}" y="${y + 27}" class="label" ` +
            `fill="#1f2328">${escapeXml(previewExample.label)}</text>`
        );
        fragments.push(
            `<text x="${margin + 14}" y="${y + 51}" class="command" ` +
            `fill="#59636e">/text ${escapeXml(previewExample.command)}</text>`
        );
        fragments.push(
            `<rect x="${lightPaneX}" y="${y}" width="${paneWidth}" ` +
            `height="${rowHeight}" rx="8" fill="#f6f8fa" stroke="#d0d7de"/>`
        );
        fragments.push(
            `<rect x="${darkPaneX}" y="${y}" width="${paneWidth}" ` +
            `height="${rowHeight}" rx="8" fill="#161b22" stroke="#30363d"/>`
        );

        for (const pane of [
            {
                clipId: lightClipId,
                color: "#1f2328",
                x: lightPaneX
            },
            {
                clipId: darkClipId,
                color: "#e6edf3",
                x: darkPaneX
            }
        ]) {
            fragments.push(
                `<clipPath id="${pane.clipId}"><rect x="${pane.x + 8}" ` +
                `y="${y + 8}" width="${paneWidth - 16}" ` +
                `height="${rowHeight - 16}" rx="5"/></clipPath>`
            );
            fragments.push(`<g clip-path="url(#${pane.clipId})">`);

            outputLines.forEach((line, lineIndex) => {
                fragments.push(renderLine(
                    line,
                    pane.x + 18,
                    y + outputTopPadding + lineIndex * outputLineHeight,
                    pane.color,
                    paneWidth - 28
                ));
            });

            fragments.push("</g>");
        }

        y += rowHeight + 8;
    }

    y += 16;

    return [
        `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${y}" ` +
            `viewBox="0 0 ${width} ${y}" role="img" aria-label="` +
            escapeXml(previewSection.title) +
            ' examples on light and dark transcript backgrounds">',
        "<style>",
        ".title{font:700 20px -apple-system,BlinkMacSystemFont,\"Segoe UI\",sans-serif}",
        ".column{font:700 12px -apple-system,BlinkMacSystemFont,\"Segoe UI\",sans-serif}",
        ".label{font:600 14px -apple-system,BlinkMacSystemFont,\"Segoe UI\",sans-serif}",
        ".command{font:12px ui-monospace,SFMono-Regular,Consolas,monospace}",
        ".output{font:16px ui-monospace,SFMono-Regular,Consolas,\"DejaVu Sans Mono\",monospace}",
        "</style>",
        `<rect width="${width}" height="${y}" fill="#ffffff"/>`,
        ...fragments,
        "</svg>",
        ""
    ].join("\n");
}

fs.mkdirSync(outputDirectory, {
    recursive: true
});

for (const previewSection of previewSections) {
    fs.writeFileSync(
        path.join(
            outputDirectory,
            sectionFileName(previewSection.title)
        ),
        renderSectionPreview(previewSection)
    );
}
