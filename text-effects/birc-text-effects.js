/*
 * bIRC Text Effects
 *
 * Import this single file in bIRC's Scripts window. Run `/text help` for the
 * complete command reference. Effects are previewed locally unless `say` is
 * placed before the effect name.
 *
 * Script ID: com.github.aipokalyptik.birc-utils.text-effects
 * Script version: 1.0.0
 */

(function registerBircTextEffectsScript() {
    "use strict";

    var SCRIPT_ID = "com.github.aipokalyptik.birc-utils.text-effects";
    var SCRIPT_VERSION = "1.0.0";
    var SCRIPT_UPDATE_PAGE_URL =
        "https://github.com/aipokalyptik/birc-utils/tree/main/text-effects";
    var SCRIPT_UPDATE_FILE_URL =
        "https://github.com/aipokalyptik/birc-utils/blob/main/text-effects/birc-text-effects.js";
    var SCRIPT_RELEASE_TAG_PREFIX = "birc-utils-text-effects-v";
    var SCRIPT_COMPARE_URL_PREFIX =
        "https://github.com/aipokalyptik/birc-utils/compare/";
    var SCRIPT_FILE_DIFF_ANCHOR =
        "#diff-0a8c5d6780709ce19a4716fd98a6e419d14b1bcaf7f2dc8931c5d7319eb8ce8d";
    var UPDATE_MANIFEST_URL =
        "https://raw.githubusercontent.com/aipokalyptik/birc-utils/main/updates.json";
    var UPDATE_CACHE_KEY = "bircUtils.updateCheck.v1";
    var UPDATE_CHECK_INTERVAL_MILLISECONDS = 24 * 60 * 60 * 1000;

    var MAXIMUM_INPUT_LENGTH = 160;
    var MAXIMUM_OUTPUT_LENGTH = 420;
    var MAXIMUM_OUTPUT_LINES = 6;
    var MAXIMUM_BLOCK_TEXT_LENGTH = 12;

    var IRC_COLOR = "\u0003";
    var IRC_BOLD = "\u0002";
    var IRC_ITALIC = "\u001d";
    var IRC_UNDERLINE = "\u001f";
    var IRC_STRIKETHROUGH = "\u001e";
    var IRC_RESET = "\u000f";

    function parseSemanticVersion(version) {
        var match;

        if (typeof version !== "string") {
            return null;
        }

        match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version);
        if (match === null) {
            return null;
        }

        return [Number(match[1]), Number(match[2]), Number(match[3])];
    }

    function isNewerScriptVersion(candidateVersion) {
        var candidate = parseSemanticVersion(candidateVersion);
        var installed = parseSemanticVersion(SCRIPT_VERSION);
        var partIndex;

        if (candidate === null || installed === null) {
            return false;
        }

        for (partIndex = 0; partIndex < installed.length; partIndex += 1) {
            if (candidate[partIndex] > installed[partIndex]) {
                return true;
            }

            if (candidate[partIndex] < installed[partIndex]) {
                return false;
            }
        }

        return false;
    }

    function readUpdateCache() {
        var storedCache = birc.store.get(UPDATE_CACHE_KEY);

        if (!storedCache || typeof storedCache !== "object") {
            return {
                lastAttemptAt: 0,
                latestVersion: ""
            };
        }

        if (typeof storedCache.latestVersion !== "string") {
            storedCache.latestVersion = "";
        }

        return {
            lastAttemptAt: Number(storedCache.lastAttemptAt) || 0,
            latestVersion: storedCache.latestVersion
        };
    }

    function reportAvailableScriptUpdate(latestVersion) {
        var comparisonUrl = SCRIPT_COMPARE_URL_PREFIX +
            SCRIPT_RELEASE_TAG_PREFIX + SCRIPT_VERSION + "..." +
            SCRIPT_RELEASE_TAG_PREFIX + latestVersion + SCRIPT_FILE_DIFF_ANCHOR;

        birc.print(
            "[Text effects] Update available for " + SCRIPT_ID + ": installed " +
            SCRIPT_VERSION + ", current " + latestVersion + "."
        );
        birc.print(
            "[Text effects] Canonical update file: " + SCRIPT_UPDATE_FILE_URL
        );
        birc.print(
            "[Text effects] Changes since the installed version: " +
            comparisonUrl + " (opens at text-effects/birc-text-effects.js)."
        );
        birc.print(
            "[Text effects] Update instructions: open the canonical file URL, " +
            "review the file, click Raw, and copy the entire file. In bIRC open " +
            "Scripts with ⌘⌥S, replace this script's contents, and save. " +
            "Documentation: " + SCRIPT_UPDATE_PAGE_URL
        );
    }

    function checkForScriptUpdate() {
        var cache;
        var now;
        var reportedVersion = "";

        if (
            typeof birc.fetch !== "function" ||
            !birc.store ||
            typeof birc.store.get !== "function"
        ) {
            return;
        }

        cache = readUpdateCache();

        if (isNewerScriptVersion(cache.latestVersion)) {
            reportedVersion = cache.latestVersion;
            reportAvailableScriptUpdate(cache.latestVersion);
        }

        now = Date.now();
        if (now - cache.lastAttemptAt < UPDATE_CHECK_INTERVAL_MILLISECONDS) {
            return;
        }

        cache.lastAttemptAt = now;
        birc.store.set(UPDATE_CACHE_KEY, cache);

        birc.fetch(UPDATE_MANIFEST_URL).then(function handleUpdateResponse(response) {
            var manifest;
            var latestVersion;

            if (!response || response.status < 200 || response.status > 299) {
                throw new Error("update manifest returned a non-success status");
            }

            if (typeof response.text !== "string" || response.text.length > 65536) {
                throw new Error("update manifest has an invalid size");
            }

            manifest = JSON.parse(response.text);
            if (!manifest || manifest.schemaVersion !== 1 || !manifest.scripts) {
                throw new Error("update manifest has an unsupported format");
            }

            latestVersion = manifest.scripts[SCRIPT_ID];
            if (parseSemanticVersion(latestVersion) === null) {
                throw new Error("update manifest has no valid entry for this script");
            }

            cache.latestVersion = latestVersion;
            birc.store.set(UPDATE_CACHE_KEY, cache);

            if (
                isNewerScriptVersion(latestVersion) &&
                latestVersion !== reportedVersion
            ) {
                reportAvailableScriptUpdate(latestVersion);
            }
        }).catch(function handleUpdateFailure(error) {
            console.info("Text effects update check was not completed", error);
        });
    }

    var ZALGO_ABOVE = [
        "\u0300", "\u0301", "\u0302", "\u0303", "\u0304", "\u0305",
        "\u0306", "\u0307", "\u0308", "\u0309", "\u030a", "\u030b",
        "\u030c", "\u030d", "\u030e", "\u030f", "\u0310", "\u0311",
        "\u0312", "\u0313", "\u0314", "\u033d", "\u033e", "\u033f"
    ];
    var ZALGO_MIDDLE = [
        "\u0315", "\u031b", "\u0321", "\u0322", "\u0334", "\u0335",
        "\u0336", "\u0337", "\u0338", "\u0340", "\u0341", "\u0342"
    ];
    var ZALGO_BELOW = [
        "\u0316", "\u0317", "\u0318", "\u0319", "\u031c", "\u031d",
        "\u031e", "\u031f", "\u0320", "\u0323", "\u0324", "\u0325",
        "\u0326", "\u0327", "\u0328", "\u0329", "\u032a", "\u032b",
        "\u032c", "\u032d", "\u032e", "\u032f", "\u0330", "\u0331"
    ];

    var SMALL_CAPITALS = {
        a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ꜰ", g: "ɢ",
        h: "ʜ", i: "ɪ", j: "ᴊ", k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ",
        o: "ᴏ", p: "ᴘ", q: "ǫ", r: "ʀ", s: "ꜱ", t: "ᴛ", u: "ᴜ",
        v: "ᴠ", w: "ᴡ", x: "x", y: "ʏ", z: "ᴢ"
    };

    var UPSIDE_DOWN = {
        a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ",
        h: "ɥ", i: "ᴉ", j: "ɾ", k: "ʞ", l: "l", m: "ɯ", n: "u",
        o: "o", p: "d", q: "b", r: "ɹ", s: "s", t: "ʇ", u: "n",
        v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z",
        A: "∀", B: "𐐒", C: "Ɔ", D: "◖", E: "Ǝ", F: "Ⅎ", G: "פ",
        H: "H", I: "I", J: "ſ", K: "⋊", L: "˥", M: "W", N: "N",
        O: "O", P: "Ԁ", Q: "Ό", R: "ᴚ", S: "S", T: "⊥", U: "∩",
        V: "Λ", W: "M", X: "X", Y: "⅄", Z: "Z",
        "0": "0", "1": "Ɩ", "2": "ᄅ", "3": "Ɛ", "4": "ㄣ",
        "5": "ϛ", "6": "9", "7": "ㄥ", "8": "8", "9": "6",
        ".": "˙", ",": "'", "'": ",", "\"": "„", "?": "¿", "!": "¡",
        "(": ")", ")": "(", "[": "]", "]": "[", "{": "}", "}": "{",
        "<": ">", ">": "<", "_": "‾"
    };

    /*
     * Five rows of five cells make each block glyph easy to inspect and edit.
     * A blank separates neighboring glyphs when a complete row is rendered.
     */
    var SIMPLE_BLOCK_GLYPHS = {
        A: [" ### ", "#   #", "#####", "#   #", "#   #"],
        B: ["#### ", "#   #", "#### ", "#   #", "#### "],
        C: [" ####", "#    ", "#    ", "#    ", " ####"],
        D: ["#### ", "#   #", "#   #", "#   #", "#### "],
        E: ["#####", "#    ", "#### ", "#    ", "#####"],
        F: ["#####", "#    ", "#### ", "#    ", "#    "],
        G: [" ####", "#    ", "# ###", "#   #", " ####"],
        H: ["#   #", "#   #", "#####", "#   #", "#   #"],
        I: ["#####", "  #  ", "  #  ", "  #  ", "#####"],
        J: ["#####", "   # ", "   # ", "#  # ", " ##  "],
        K: ["#   #", "#  # ", "###  ", "#  # ", "#   #"],
        L: ["#    ", "#    ", "#    ", "#    ", "#####"],
        M: ["#   #", "## ##", "# # #", "#   #", "#   #"],
        N: ["#   #", "##  #", "# # #", "#  ##", "#   #"],
        O: [" ### ", "#   #", "#   #", "#   #", " ### "],
        P: ["#### ", "#   #", "#### ", "#    ", "#    "],
        Q: [" ### ", "#   #", "# # #", "#  ##", " ####"],
        R: ["#### ", "#   #", "#### ", "#  # ", "#   #"],
        S: [" ####", "#    ", " ### ", "    #", "#### "],
        T: ["#####", "  #  ", "  #  ", "  #  ", "  #  "],
        U: ["#   #", "#   #", "#   #", "#   #", " ### "],
        V: ["#   #", "#   #", "#   #", " # # ", "  #  "],
        W: ["#   #", "#   #", "# # #", "## ##", "#   #"],
        X: ["#   #", " # # ", "  #  ", " # # ", "#   #"],
        Y: ["#   #", " # # ", "  #  ", "  #  ", "  #  "],
        Z: ["#####", "   # ", "  #  ", " #   ", "#####"],
        "0": [" ### ", "#  ##", "# # #", "##  #", " ### "],
        "1": ["  #  ", " ##  ", "  #  ", "  #  ", "#####"],
        "2": [" ### ", "#   #", "   # ", "  #  ", "#####"],
        "3": ["#### ", "    #", " ### ", "    #", "#### "],
        "4": ["#  # ", "#  # ", "#####", "   # ", "   # "],
        "5": ["#####", "#    ", "#### ", "    #", "#### "],
        "6": [" ### ", "#    ", "#### ", "#   #", " ### "],
        "7": ["#####", "   # ", "  #  ", " #   ", "#    "],
        "8": [" ### ", "#   #", " ### ", "#   #", " ### "],
        "9": [" ### ", "#   #", " ####", "    #", " ### "],
        " ": ["     ", "     ", "     ", "     ", "     "],
        "?": [" ### ", "#   #", "  ## ", "     ", "  #  "]
    };

    /*
     * Adding a block font requires one declarative registration:
     *
     * registerBlockFont({
     *     name: "example",
     *     height: 3,
     *     spacing: 1,
     *     convertsToUppercase: true,
     *     glyphs: {
     *         A: [" A ", "AAA", "A A"],
     *         "?": ["??", " ?", " ?"]
     *     }
     * });
     *
     * Every glyph must contain exactly `height` rows. The renderer handles
     * selection, fallback glyphs, line limits, and the optional solid ink.
     */
    var BLOCK_FONTS = Object.create(null);
    var BLOCK_FONT_NAMES = [];
    var COLOR_SCHEMES = Object.create(null);
    var COLOR_SCHEME_NAMES = [];

    function registerBlockFont(fontDefinition) {
        var glyphCharacters;
        var glyphIndex;
        var rowIndex;
        var glyph;

        if (typeof fontDefinition.name !== "string") {
            return false;
        }

        if (!/^[a-z0-9-]+$/.test(fontDefinition.name)) {
            return false;
        }

        if (!Number.isInteger(fontDefinition.height) || fontDefinition.height < 1) {
            return false;
        }

        if (fontDefinition.height > MAXIMUM_OUTPUT_LINES) {
            return false;
        }

        if (typeof fontDefinition.glyphs !== "object") {
            return false;
        }

        if (BLOCK_FONTS[fontDefinition.name] !== undefined) {
            return false;
        }

        glyphCharacters = Object.keys(fontDefinition.glyphs);

        if (glyphCharacters.length === 0) {
            return false;
        }

        for (glyphIndex = 0; glyphIndex < glyphCharacters.length; glyphIndex += 1) {
            glyph = fontDefinition.glyphs[glyphCharacters[glyphIndex]];

            if (!Array.isArray(glyph) || glyph.length !== fontDefinition.height) {
                return false;
            }

            for (rowIndex = 0; rowIndex < glyph.length; rowIndex += 1) {
                if (typeof glyph[rowIndex] !== "string") {
                    return false;
                }
            }
        }

        BLOCK_FONTS[fontDefinition.name] = fontDefinition;
        BLOCK_FONT_NAMES.push(fontDefinition.name);
        return true;
    }

    registerBlockFont({
        name: "simple",
        height: 5,
        spacing: 1,
        convertsToUppercase: true,
        glyphs: SIMPLE_BLOCK_GLYPHS
    });

    /* BEGIN GENERATED FIGLET FONT DEFINITIONS */
    registerBlockFont({
        name: "mini",
        height: 4,
        spacing: 0,
        convertsToUppercase: false,
        source: "FIGlet 2.2 official distribution",
        author: "Glenn Chappell",
        glyphs: {
            "0": ["  _  "," / \\ "," \\_/ ","     "],
            "1": ["    "," /| ","  | ","    "],
            "2": [" _  ","  ) "," /_ ","    "],
            "3": [" _  "," _) "," _) ","    "],
            "4": ["      "," |_|_ ","   |  ","      "],
            "5": ["  _  "," |_  ","  _) ","     "],
            "6": ["  _  "," |_  "," |_) ","     "],
            "7": [" __ ","  / "," /  ","    "],
            "8": ["  _  "," (_) "," (_) ","     "],
            "9": ["  _  "," (_| ","   | ","     "],
            " ": ["  ","  ","  ","  "],
            "!": ["   "," | "," o ","   "],
            "\"": ["    "," || ","    ","    "],
            "#": ["       "," -|-|- "," -|-|- ","       "],
            "$": ["   _ "," (|  "," _|) ","     "],
            "%": ["    "," O/ "," /O ","    "],
            "&": ["     "," ()  "," (_X ","     "],
            "'": ["   "," / ","   ","   "],
            "(": ["    ","  / "," |  ","  \\ "],
            ")": ["    "," \\  ","  | "," /  "],
            "*": ["     "," \\|/ "," /|\\ ","     "],
            "+": ["     "," _|_ ","  |  ","     "],
            ",": ["   ","   "," o "," / "],
            "-": ["    "," __ ","    ","    "],
            ".": ["   ","   "," o ","   "],
            "/": ["    ","  / "," /  ","    "],
            ":": ["   "," o "," o ","   "],
            ";": ["   "," o "," o "," / "],
            "<": ["   "," / "," \\ ","   "],
            "=": ["    "," -- "," -- ","    "],
            ">": ["   "," \\ "," / ","   "],
            "?": [" _  ","  ) "," o  ","    "],
            "@": ["   __  ","  /  \\ "," | (|/ ","  \\__  "],
            "A": ["      ","  /\\  "," /--\\ ","      "],
            "B": ["  _  "," |_) "," |_) ","     "],
            "C": ["  _ "," /  "," \\_ ","    "],
            "D": ["  _  "," | \\ "," |_/ ","     "],
            "E": ["  _ "," |_ "," |_ ","    "],
            "F": ["  _ "," |_ "," |  ","    "],
            "G": ["  __ "," /__ "," \\_| ","     "],
            "H": ["     "," |_| "," | | ","     "],
            "I": [" ___ ","  |  "," _|_ ","     "],
            "J": ["     ","   | "," \\_| ","     "],
            "K": ["    "," |/ "," |\\ ","    "],
            "L": ["    "," |  "," |_ ","    "],
            "M": ["      "," |\\/| "," |  | ","      "],
            "N": ["      "," |\\ | "," | \\| ","      "],
            "O": ["  _  "," / \\ "," \\_/ ","     "],
            "P": ["  _  "," |_) "," |   ","     "],
            "Q": ["  _  "," / \\ "," \\_X ","     "],
            "R": ["  _  "," |_) "," | \\ ","     "],
            "S": ["  __ "," (_  "," __) ","     "],
            "T": [" ___ ","  |  ","  |  ","     "],
            "U": ["     "," | | "," |_| ","     "],
            "V": ["      "," \\  / ","  \\/  ","      "],
            "W": ["        "," \\    / ","  \\/\\/  ","        "],
            "X": ["    "," \\/ "," /\\ ","    "],
            "Y": ["     "," \\_/ ","  |  ","     "],
            "Z": [" __ ","  / "," /_ ","    "],
            "[": ["  _ "," |  "," |_ ","    "],
            "\\": ["    "," \\  ","  \\ ","    "],
            "]": [" _  ","  | "," _| ","    "],
            "^": [" /\\ ","    ","    ","    "],
            "_": ["    ","    ","    "," __ "],
            "`": ["   "," \\ ","   ","   "],
            "a": ["     ","  _. "," (_| ","     "],
            "b": ["     "," |_  "," |_) ","     "],
            "c": ["    ","  _ "," (_ ","    "],
            "d": ["     ","  _| "," (_| ","     "],
            "e": ["     ","  _  "," (/_ ","     "],
            "f": ["   _ "," _|_ ","  |  ","     "],
            "g": ["     ","  _  "," (_| ","  _| "],
            "h": ["     "," |_  "," | | ","     "],
            "i": ["   "," o "," | ","   "],
            "j": ["    ","  o ","  | "," _| "],
            "k": ["    "," |  "," |< ","    "],
            "l": ["   "," | "," | ","   "],
            "m": ["       "," ._ _  "," | | | ","       "],
            "n": ["     "," ._  "," | | ","     "],
            "o": ["     ","  _  "," (_) ","     "],
            "p": ["     "," ._  "," |_) "," |   "],
            "q": ["     ","  _. "," (_| ","   | "],
            "r": ["    "," ._ "," |  ","    "],
            "s": ["    ","  _ "," _> ","    "],
            "t": ["     "," _|_ ","  |_ ","     "],
            "u": ["     ","     "," |_| ","     "],
            "v": ["    ","    "," \\/ ","    "],
            "w": ["      ","      "," \\/\\/ ","      "],
            "x": ["    ","    "," >< ","    "],
            "y": ["    ","    "," \\/ "," /  "],
            "z": ["    "," _  "," /_ ","    "],
            "{": ["  ,- "," _|  ","  |  ","  `- "],
            "|": [" | "," | "," | "," | "],
            "}": [" -.  ","  |_ ","  |  "," -'  "],
            "~": [" /\\/ ","     ","     ","     "]
        }
    });

    registerBlockFont({
        name: "small",
        height: 5,
        spacing: 0,
        convertsToUppercase: false,
        source: "FIGlet 2.2 official distribution",
        author: "Glenn Chappell",
        glyphs: {
            "0": ["   __  ","  /  \\ "," | () |","  \\__/ ","       "],
            "1": ["  _ "," / |"," | |"," |_|","    "],
            "2": ["  ___ "," |_  )","  / / "," /___|","      "],
            "3": ["  ____"," |__ /","  |_ \\"," |___/","      "],
            "4": ["  _ _  "," | | | "," |_  _|","   |_| ","       "],
            "5": ["  ___ "," | __|"," |__ \\"," |___/","      "],
            "6": ["   __ ","  / / "," / _ \\"," \\___/","      "],
            "7": ["  ____ "," |__  |","   / / ","  /_/  ","       "],
            "8": ["  ___ "," ( _ )"," / _ \\"," \\___/","      "],
            "9": ["  ___ "," / _ \\"," \\_, /","  /_/ ","      "],
            " ": ["  ","  ","  ","  ","  "],
            "!": ["  _ "," | |"," |_|"," (_)","    "],
            "\"": ["  _ _ "," ( | )","  V V ","      ","      "],
            "#": ["    _ _   ","  _| | |_ "," |_  .  _|"," |_     _|","   |_|_|  "],
            "$": ["     ","  ||_"," (_-<"," / _/","  || "],
            "%": ["  _  __ "," (_)/ / ","   / /_ ","  /_/(_)","        "],
            "&": ["  __     "," / _|___ "," > _|_ _|"," \\_____| ","         "],
            "'": ["  _ "," ( )"," |/ ","    ","    "],
            "(": ["   __","  / /"," | | "," | | ","  \\_\\"],
            ")": [" __  "," \\ \\ ","  | |","  | |"," /_/ "],
            "*": ["     "," _/\\_"," >  <","  \\/ ","     "],
            "+": ["    _   ","  _| |_ "," |_   _|","   |_|  ","        "],
            ",": ["    ","    ","  _ "," ( )"," |/ "],
            "-": ["      ","  ___ "," |___|","      ","      "],
            ".": ["    ","    ","  _ "," (_)","    "],
            "/": ["    __","   / /","  / / "," /_/  ","      "],
            ":": ["  _ "," (_)","  _ "," (_)","    "],
            ";": ["  _ "," (_)","  _ "," ( )"," |/ "],
            "<": ["   __","  / /"," < < ","  \\_\\","     "],
            "=": ["      ","  ___ "," |___|"," |___|","      "],
            ">": [" __  "," \\ \\ ","  > >"," /_/ ","     "],
            "?": ["  ___ "," |__ \\","   /_/","  (_) ","      "],
            "@": ["   ____  ","  / __ \\ "," / / _` |"," \\ \\__,_|","  \\____/ "],
            "A": ["    _   ","   /_\\  ","  / _ \\ "," /_/ \\_\\","        "],
            "B": ["  ___ "," | _ )"," | _ \\"," |___/","      "],
            "C": ["   ___ ","  / __|"," | (__ ","  \\___|","       "],
            "D": ["  ___  "," |   \\ "," | |) |"," |___/ ","       "],
            "E": ["  ___ "," | __|"," | _| "," |___|","      "],
            "F": ["  ___ "," | __|"," | _| "," |_|  ","      "],
            "G": ["   ___ ","  / __|"," | (_ |","  \\___|","       "],
            "H": ["  _  _ "," | || |"," | __ |"," |_||_|","       "],
            "I": ["  ___ "," |_ _|","  | | "," |___|","      "],
            "J": ["     _ ","  _ | |"," | || |","  \\__/ ","       "],
            "K": ["  _  __"," | |/ /"," | ' < "," |_|\\_\\","       "],
            "L": ["  _    "," | |   "," | |__ "," |____|","       "],
            "M": ["  __  __ "," |  \\/  |"," | |\\/| |"," |_|  |_|","         "],
            "N": ["  _  _ "," | \\| |"," | .` |"," |_|\\_|","       "],
            "O": ["   ___  ","  / _ \\ "," | (_) |","  \\___/ ","        "],
            "P": ["  ___ "," | _ \\"," |  _/"," |_|  ","      "],
            "Q": ["   ___  ","  / _ \\ "," | (_) |","  \\__\\_\\","        "],
            "R": ["  ___ "," | _ \\"," |   /"," |_|_\\","      "],
            "S": ["  ___ "," / __|"," \\__ \\"," |___/","      "],
            "T": ["  _____ "," |_   _|","   | |  ","   |_|  ","        "],
            "U": ["  _   _ "," | | | |"," | |_| |","  \\___/ ","        "],
            "V": [" __   __"," \\ \\ / /","  \\ V / ","   \\_/  ","        "],
            "W": [" __      __"," \\ \\    / /","  \\ \\/\\/ / ","   \\_/\\_/  ","           "],
            "X": [" __  __"," \\ \\/ /","  >  < "," /_/\\_\\","       "],
            "Y": [" __   __"," \\ \\ / /","  \\ V / ","   |_|  ","        "],
            "Z": ["  ____"," |_  /","  / / "," /___|","      "],
            "[": ["  __ "," | _|"," | | "," | | "," |__|"],
            "\\": [" __   "," \\ \\  ","  \\ \\ ","   \\_\\","      "],
            "]": ["  __ "," |_ |","  | |","  | |"," |__|"],
            "^": ["  /\\ "," |/\\|","     ","     ","     "],
            "_": ["      ","      ","      ","  ___ "," |___|"],
            "`": ["  _ "," ( )","  \\|","    ","    "],
            "a": ["       ","  __ _ "," / _` |"," \\__,_|","       "],
            "b": ["  _    "," | |__ "," | '_ \\"," |_.__/","       "],
            "c": ["     ","  __ "," / _|"," \\__|","     "],
            "d": ["     _ ","  __| |"," / _` |"," \\__,_|","       "],
            "e": ["      ","  ___ "," / -_)"," \\___|","      "],
            "f": ["   __ ","  / _|"," |  _|"," |_|  ","      "],
            "g": ["       ","  __ _ "," / _` |"," \\__, |"," |___/ "],
            "h": ["  _    "," | |_  "," | ' \\ "," |_||_|","       "],
            "i": ["  _ "," (_)"," | |"," |_|","    "],
            "j": ["    _ ","   (_)","   | |","  _/ |"," |__/ "],
            "k": ["  _   "," | |__"," | / /"," |_\\_\\","      "],
            "l": ["  _ "," | |"," | |"," |_|","    "],
            "m": ["        ","  _ __  "," | '  \\ "," |_|_|_|","        "],
            "n": ["       ","  _ _  "," | ' \\ "," |_||_|","       "],
            "o": ["      ","  ___ "," / _ \\"," \\___/","      "],
            "p": ["       ","  _ __ "," | '_ \\"," | .__/"," |_|   "],
            "q": ["       ","  __ _ "," / _` |"," \\__, |","    |_|"],
            "r": ["      ","  _ _ "," | '_|"," |_|  ","      "],
            "s": ["     ","  ___"," (_-<"," /__/","     "],
            "t": ["  _   "," | |_ "," |  _|","  \\__|","      "],
            "u": ["       ","  _  _ "," | || |","  \\_,_|","       "],
            "v": ["      "," __ __"," \\ V /","  \\_/ ","      "],
            "w": ["         "," __ __ __"," \\ V  V /","  \\_/\\_/ ","         "],
            "x": ["      "," __ __"," \\ \\ /"," /_\\_\\","      "],
            "y": ["       ","  _  _ "," | || |","  \\_, |","  |__/ "],
            "z": ["     ","  ___"," |_ /"," /__|","     "],
            "{": ["    __","   / /"," _| | ","  | | ","   \\_\\"],
            "|": ["  _ "," | |"," | |"," | |"," |_|"],
            "}": [" __   "," \\ \\  ","  | |_","  | | "," /_/  "],
            "~": ["  /\\/|"," |/\\/ ","      ","      ","      "]
        }
    });
    /* END GENERATED FIGLET FONT DEFINITIONS */

    /*
     * Color schemes contain IRC palette indexes, not RGB values. Additions are
     * intentionally declarative so their order is visible and easy to test.
     */
    function registerColorScheme(colorScheme) {
        var colorIndex;

        if (typeof colorScheme.name !== "string") {
            return false;
        }

        if (!/^[a-z0-9-]+$/.test(colorScheme.name)) {
            return false;
        }

        if (!Array.isArray(colorScheme.colors) || colorScheme.colors.length === 0) {
            return false;
        }

        if (COLOR_SCHEMES[colorScheme.name] !== undefined) {
            return false;
        }

        for (colorIndex = 0; colorIndex < colorScheme.colors.length; colorIndex += 1) {
            if (!Number.isInteger(colorScheme.colors[colorIndex])) {
                return false;
            }

            if (colorScheme.colors[colorIndex] < 0 || colorScheme.colors[colorIndex] > 15) {
                return false;
            }
        }

        COLOR_SCHEMES[colorScheme.name] = colorScheme;
        COLOR_SCHEME_NAMES.push(colorScheme.name);
        return true;
    }

    registerColorScheme({
        name: "rainbow",
        colors: [4, 7, 8, 9, 11, 12, 13, 6],
        description: "A bright spectrum designed for IRC."
    });

    registerColorScheme({
        name: "fire",
        colors: [5, 4, 7, 8, 7, 4],
        description: "Red, orange, and yellow."
    });

    registerColorScheme({
        name: "ocean",
        colors: [2, 12, 11, 10, 11, 12],
        description: "Blue, cyan, and teal."
    });

    registerColorScheme({
        name: "catppuccin",
        colors: [13, 6, 4, 7, 8, 9, 10, 11, 12],
        description: "IRC approximation of Catppuccin Mocha accents."
    });

    registerColorScheme({
        name: "dracula",
        colors: [11, 9, 7, 13, 6, 4, 8],
        description: "IRC approximation of the Dracula OSS palette."
    });

    registerColorScheme({
        name: "nord",
        colors: [10, 11, 12, 2, 4, 7, 8, 9, 6],
        description: "IRC approximation of Nord Frost and Aurora."
    });

    function successfulTextResult(lines, containsAnsi) {
        return {
            succeeded: true,
            lines: lines,
            containsAnsi: containsAnsi,
            error: ""
        };
    }

    function failedTextResult(error) {
        return {
            succeeded: false,
            lines: [],
            containsAnsi: false,
            error: error
        };
    }

    function printTextStatus(message) {
        birc.print("[Text effects] " + message);
    }

    function splitFirstWord(input) {
        var trimmedInput = input.trim();
        var firstWhitespaceIndex = trimmedInput.search(/\s/);

        if (firstWhitespaceIndex === -1) {
            return {
                word: trimmedInput,
                remainder: ""
            };
        }

        return {
            word: trimmedInput.slice(0, firstWhitespaceIndex),
            remainder: trimmedInput.slice(firstWhitespaceIndex).trim()
        };
    }

    function textContainsUnsafeControls(text) {
        var characterIndex;
        var characterCode;

        for (characterIndex = 0; characterIndex < text.length; characterIndex += 1) {
            characterCode = text.charCodeAt(characterIndex);

            if (characterCode < 32 || characterCode === 127) {
                return true;
            }
        }

        return false;
    }

    function validateInput(text) {
        if (text.length === 0) {
            return failedTextResult("Supply text to transform.");
        }

        if (text.length > MAXIMUM_INPUT_LENGTH) {
            return failedTextResult(
                "Input is limited to " + MAXIMUM_INPUT_LENGTH + " characters."
            );
        }

        if (textContainsUnsafeControls(text)) {
            return failedTextResult("Input must not contain control characters.");
        }

        return null;
    }

    function mapCharacters(text, replacements) {
        var characters = Array.from(text);
        var output = "";
        var characterIndex;
        var character;

        for (characterIndex = 0; characterIndex < characters.length; characterIndex += 1) {
            character = characters[characterIndex];

            if (Object.prototype.hasOwnProperty.call(replacements, character)) {
                output += replacements[character];
            } else {
                output += character;
            }
        }

        return output;
    }

    function transformLeetspeak(text, level) {
        var replacements;

        if (level === "light") {
            replacements = {
                a: "4", e: "3", i: "1", o: "0", s: "5"
            };
        } else if (level === "extreme") {
            replacements = {
                a: "/-\\", b: "|3", c: "(", d: "|)", e: "3", f: "|=",
                g: "6", h: "|-|", i: "!", j: "_|", k: "|<", l: "1",
                m: "/\\/\\", n: "|\\|", o: "0", p: "|*", q: "0_", r: "|2",
                s: "5", t: "7", u: "|_|", v: "\\/", w: "\\/\\/", x: "><",
                y: "`/", z: "2"
            };
        } else {
            replacements = {
                a: "4", b: "8", e: "3", g: "6", i: "1", l: "1",
                o: "0", s: "5", t: "7", z: "2"
            };
        }

        return mapCharacters(text.toLowerCase(), replacements);
    }

    function transformAlternatingCase(text) {
        var characters = Array.from(text);
        var output = "";
        var useUppercase = false;
        var characterIndex;
        var character;

        for (characterIndex = 0; characterIndex < characters.length; characterIndex += 1) {
            character = characters[characterIndex];

            if (character.toLowerCase() === character.toUpperCase()) {
                output += character;
                continue;
            }

            if (useUppercase) {
                output += character.toUpperCase();
            } else {
                output += character.toLowerCase();
            }

            useUppercase = !useUppercase;
        }

        return output;
    }

    function transformFullwidth(text, addSpacing) {
        var characters = Array.from(text);
        var outputCharacters = [];
        var characterIndex;
        var codePoint;

        for (characterIndex = 0; characterIndex < characters.length; characterIndex += 1) {
            codePoint = characters[characterIndex].codePointAt(0);

            if (codePoint === 32) {
                outputCharacters.push("\u3000");
            } else if (codePoint >= 33 && codePoint <= 126) {
                outputCharacters.push(String.fromCodePoint(codePoint + 65248));
            } else {
                outputCharacters.push(characters[characterIndex]);
            }
        }

        if (addSpacing) {
            return outputCharacters.join("\u3000");
        }

        return outputCharacters.join("");
    }

    function transformCircled(text) {
        var characters = Array.from(text);
        var output = "";
        var characterIndex;
        var codePoint;

        for (characterIndex = 0; characterIndex < characters.length; characterIndex += 1) {
            codePoint = characters[characterIndex].codePointAt(0);

            if (codePoint >= 65 && codePoint <= 90) {
                output += String.fromCodePoint(0x24b6 + codePoint - 65);
            } else if (codePoint >= 97 && codePoint <= 122) {
                output += String.fromCodePoint(0x24d0 + codePoint - 97);
            } else if (codePoint === 48) {
                output += "⓪";
            } else if (codePoint >= 49 && codePoint <= 57) {
                output += String.fromCodePoint(0x2460 + codePoint - 49);
            } else {
                output += characters[characterIndex];
            }
        }

        return output;
    }

    function transformRegionalIndicators(text) {
        var characters = Array.from(text.toUpperCase());
        var output = "";
        var characterIndex;
        var codePoint;

        for (characterIndex = 0; characterIndex < characters.length; characterIndex += 1) {
            codePoint = characters[characterIndex].codePointAt(0);

            if (codePoint >= 65 && codePoint <= 90) {
                output += String.fromCodePoint(0x1f1e6 + codePoint - 65);
                output += " ";
            } else {
                output += characters[characterIndex];
            }
        }

        return output.trim();
    }

    function transformMathematicalAlphabet(text, uppercaseStart, lowercaseStart, digitStart) {
        var characters = Array.from(text);
        var output = "";
        var characterIndex;
        var codePoint;

        for (characterIndex = 0; characterIndex < characters.length; characterIndex += 1) {
            codePoint = characters[characterIndex].codePointAt(0);

            if (codePoint >= 65 && codePoint <= 90) {
                output += String.fromCodePoint(uppercaseStart + codePoint - 65);
            } else if (codePoint >= 97 && codePoint <= 122) {
                /*
                 * Mathematical italic h is the older Planck constant symbol,
                 * U+210E, rather than a contiguous character in Plane 1.
                 */
                if (lowercaseStart === 0x1d44e && codePoint === 104) {
                    output += "\u210e";
                } else {
                    output += String.fromCodePoint(lowercaseStart + codePoint - 97);
                }
            } else if (digitStart !== null && codePoint >= 48 && codePoint <= 57) {
                output += String.fromCodePoint(digitStart + codePoint - 48);
            } else {
                output += characters[characterIndex];
            }
        }

        return output;
    }

    function transformUpsideDown(text) {
        var characters = Array.from(text);
        var reversedCharacters = [];
        var characterIndex;
        var character;

        for (characterIndex = characters.length - 1; characterIndex >= 0; characterIndex -= 1) {
            character = characters[characterIndex];

            if (Object.prototype.hasOwnProperty.call(UPSIDE_DOWN, character)) {
                reversedCharacters.push(UPSIDE_DOWN[character]);
            } else {
                reversedCharacters.push(character);
            }
        }

        return reversedCharacters.join("");
    }

    function randomArrayItem(items) {
        var randomIndex = Math.floor(Math.random() * items.length);
        return items[randomIndex];
    }

    function appendRandomMarks(output, marks, count) {
        var markIndex;

        for (markIndex = 0; markIndex < count; markIndex += 1) {
            output += randomArrayItem(marks);
        }

        return output;
    }

    function transformZalgo(text, intensity) {
        var marksPerDirection = 2;
        var characters = Array.from(text);
        var output = "";
        var characterIndex;
        var character;

        if (intensity === "medium") {
            marksPerDirection = 4;
        } else if (intensity === "high") {
            marksPerDirection = 7;
        }

        for (characterIndex = 0; characterIndex < characters.length; characterIndex += 1) {
            character = characters[characterIndex];
            output += character;

            if (/\s/.test(character)) {
                continue;
            }

            output = appendRandomMarks(output, ZALGO_ABOVE, marksPerDirection);
            output = appendRandomMarks(output, ZALGO_MIDDLE, Math.ceil(marksPerDirection / 2));
            output = appendRandomMarks(output, ZALGO_BELOW, marksPerDirection);
        }

        return output;
    }

    function twoDigitNumber(number) {
        if (number < 10) {
            return "0" + number;
        }

        return String(number);
    }

    function transformIrcColorScheme(text, colorSchemeName) {
        var colorScheme = COLOR_SCHEMES[colorSchemeName];
        var characters = Array.from(text);
        var output = "";
        var colorIndex = 0;
        var characterIndex;

        if (colorScheme === undefined) {
            return failedTextResult(
                "Unknown color scheme. Choose " + COLOR_SCHEME_NAMES.join(", ") + "."
            );
        }

        for (characterIndex = 0; characterIndex < characters.length; characterIndex += 1) {
            if (/\s/.test(characters[characterIndex])) {
                output += characters[characterIndex];
                continue;
            }

            output += IRC_COLOR + twoDigitNumber(colorScheme.colors[colorIndex]);
            output += characters[characterIndex];
            colorIndex = (colorIndex + 1) % colorScheme.colors.length;
        }

        return successfulTextResult([output + IRC_RESET], false);
    }

    function transformIrcColor(text, foregroundText, backgroundText) {
        var foreground = Number(foregroundText);
        var background = Number(backgroundText);
        var prefix;

        if (!Number.isInteger(foreground) || foreground < 0 || foreground > 15) {
            return failedTextResult("IRC foreground color must be a whole number from 0 to 15.");
        }

        prefix = IRC_COLOR + twoDigitNumber(foreground);

        if (backgroundText.length > 0) {
            if (!Number.isInteger(background) || background < 0 || background > 15) {
                return failedTextResult("IRC background color must be a whole number from 0 to 15.");
            }

            prefix += "," + twoDigitNumber(background);
        }

        return successfulTextResult([prefix + text + IRC_RESET], false);
    }

    function transformAnsi(text, colorName) {
        var ansiCodes = {
            black: 30,
            red: 31,
            green: 32,
            yellow: 33,
            blue: 34,
            magenta: 35,
            cyan: 36,
            white: 37
        };

        if (!Object.prototype.hasOwnProperty.call(ansiCodes, colorName)) {
            return failedTextResult(
                "ANSI color must be black, red, green, yellow, blue, magenta, cyan, or white."
            );
        }

        /*
         * Use a visible, copyable escape notation. Sending an actual ESC byte
         * through IRC is intentionally unsupported.
         */
        return successfulTextResult([
            "\\x1b[" + ansiCodes[colorName] + "m" + text + "\\x1b[0m"
        ], true);
    }

    function transformBlockText(text, ink, fontName) {
        var fontDefinition = BLOCK_FONTS[fontName];
        var normalizedText = text;
        var lines = [];
        var characters = Array.from(normalizedText);
        var characterIndex;
        var rowIndex;
        var glyph;
        var renderedRow;
        var spacing = "";

        if (fontDefinition === undefined) {
            return failedTextResult(
                "Unknown block font. Choose " + BLOCK_FONT_NAMES.join(", ") + "."
            );
        }

        if (characters.length > MAXIMUM_BLOCK_TEXT_LENGTH) {
            return failedTextResult(
                "Block text is limited to " + MAXIMUM_BLOCK_TEXT_LENGTH + " characters."
            );
        }

        if (fontDefinition.convertsToUppercase) {
            normalizedText = text.toUpperCase();
            characters = Array.from(normalizedText);
        }

        for (rowIndex = 0; rowIndex < fontDefinition.height; rowIndex += 1) {
            lines.push("");
        }

        for (rowIndex = 0; rowIndex < fontDefinition.spacing; rowIndex += 1) {
            spacing += " ";
        }

        for (characterIndex = 0; characterIndex < characters.length; characterIndex += 1) {
            glyph = fontDefinition.glyphs[characters[characterIndex]];

            if (glyph === undefined) {
                glyph = fontDefinition.glyphs["?"];
            }

            for (rowIndex = 0; rowIndex < glyph.length; rowIndex += 1) {
                renderedRow = glyph[rowIndex];

                if (ink !== null) {
                    renderedRow = renderedRow.replace(/\S/g, ink);
                }

                if (characterIndex > 0) {
                    lines[rowIndex] += spacing;
                }

                lines[rowIndex] += renderedRow;
            }
        }

        return successfulTextResult(lines, false);
    }

    function transformNamedBlockText(argumentsText, ink) {
        var firstPart = splitFirstWord(argumentsText);
        var fontName = "simple";
        var text = argumentsText;
        var validationFailure;

        if (BLOCK_FONTS[firstPart.word.toLowerCase()] !== undefined) {
            fontName = firstPart.word.toLowerCase();
            text = firstPart.remainder;
        }

        validationFailure = validateInput(text);

        if (validationFailure !== null) {
            return validationFailure;
        }

        return transformBlockText(text, ink, fontName);
    }

    function transformBox(text) {
        var horizontalBorder = "";
        var characterIndex;

        for (characterIndex = 0; characterIndex < Array.from(text).length + 2; characterIndex += 1) {
            horizontalBorder += "─";
        }

        return successfulTextResult([
            "┌" + horizontalBorder + "┐",
            "│ " + text + " │",
            "└" + horizontalBorder + "┘"
        ], false);
    }

    function parseEffectAndText(argumentsText) {
        var firstPart = splitFirstWord(argumentsText);
        var effectName = firstPart.word.toLowerCase();
        var effectArguments = firstPart.remainder;
        var secondPart;
        var thirdPart;
        var validationFailure;
        var transformed;

        if (effectName === "fonts") {
            return successfulTextResult([
                "Block fonts: " + BLOCK_FONT_NAMES.join(", ")
            ], false);
        }

        if (effectName === "schemes") {
            return successfulTextResult([
                "Color schemes: " + COLOR_SCHEME_NAMES.join(", ")
            ], false);
        }

        validationFailure = validateInput(effectArguments);

        if (
            effectName === "color" ||
            effectName === "scheme" ||
            effectName === "ansi" ||
            effectName === "zalgo" ||
            effectName === "leet"
        ) {
            secondPart = splitFirstWord(effectArguments);
            effectArguments = secondPart.remainder;
            validationFailure = validateInput(effectArguments);
        }

        if (effectName === "color") {
            thirdPart = splitFirstWord(effectArguments);

            /*
             * A second number is an optional background. If the next word is
             * not a number, it is the beginning of the text instead.
             */
            if (/^\d+$/.test(thirdPart.word)) {
                effectArguments = thirdPart.remainder;
                validationFailure = validateInput(effectArguments);
                return transformIrcColor(
                    effectArguments,
                    secondPart.word,
                    thirdPart.word
                );
            }

            return transformIrcColor(
                effectArguments,
                secondPart.word,
                ""
            );
        }

        if (validationFailure !== null) {
            return validationFailure;
        }

        switch (effectName) {
            case "leet":
                if (
                    secondPart.word !== "light" &&
                    secondPart.word !== "classic" &&
                    secondPart.word !== "extreme"
                ) {
                    return failedTextResult("Leet level must be light, classic, or extreme.");
                }
                transformed = transformLeetspeak(effectArguments, secondPart.word);
                break;
            case "zalgo":
                if (
                    secondPart.word !== "low" &&
                    secondPart.word !== "medium" &&
                    secondPart.word !== "high"
                ) {
                    return failedTextResult("Zalgo intensity must be low, medium, or high.");
                }
                transformed = transformZalgo(effectArguments, secondPart.word);
                break;
            case "alternating":
            case "mock":
                transformed = transformAlternatingCase(effectArguments);
                break;
            case "reverse":
                transformed = Array.from(effectArguments).reverse().join("");
                break;
            case "upsidedown":
                transformed = transformUpsideDown(effectArguments);
                break;
            case "fullwidth":
                transformed = transformFullwidth(effectArguments, false);
                break;
            case "vaporwave":
                transformed = transformFullwidth(effectArguments, true);
                break;
            case "circled":
                transformed = transformCircled(effectArguments);
                break;
            case "smallcaps":
                transformed = mapCharacters(effectArguments.toLowerCase(), SMALL_CAPITALS);
                break;
            case "regional":
                transformed = transformRegionalIndicators(effectArguments);
                break;
            case "bold":
                transformed = transformMathematicalAlphabet(
                    effectArguments, 0x1d400, 0x1d41a, 0x1d7ce
                );
                break;
            case "italic":
                transformed = transformMathematicalAlphabet(
                    effectArguments, 0x1d434, 0x1d44e, null
                );
                break;
            case "monospace":
                transformed = transformMathematicalAlphabet(
                    effectArguments, 0x1d670, 0x1d68a, 0x1d7f6
                );
                break;
            case "clap":
                transformed = effectArguments.trim().split(/\s+/).join(" 👏 ");
                break;
            case "rainbow":
                return transformIrcColorScheme(effectArguments, "rainbow");
            case "scheme":
                return transformIrcColorScheme(effectArguments, secondPart.word);
            case "ircbold":
                transformed = IRC_BOLD + effectArguments + IRC_RESET;
                break;
            case "ircitalic":
                transformed = IRC_ITALIC + effectArguments + IRC_RESET;
                break;
            case "ircunderline":
                transformed = IRC_UNDERLINE + effectArguments + IRC_RESET;
                break;
            case "ircstrike":
                transformed = IRC_STRIKETHROUGH + effectArguments + IRC_RESET;
                break;
            case "ansi":
                return transformAnsi(effectArguments, secondPart.word);
            case "block":
            case "ascii":
                return transformNamedBlockText(effectArguments, null);
            case "blocks":
                return transformNamedBlockText(effectArguments, "█");
            case "box":
                return transformBox(effectArguments);
            default:
                return failedTextResult("Unknown effect. Run /text help.");
        }

        return successfulTextResult([transformed], false);
    }

    function getCommandTarget(commandEvent) {
        if (commandEvent) {
            if (typeof commandEvent.target === "string" && commandEvent.target.length > 0) {
                return commandEvent.target;
            }
        }

        if (typeof birc.target === "string") {
            return birc.target;
        }

        return "";
    }

    function outputTextResult(result, sendOutput, commandEvent) {
        var target;
        var lineIndex;

        if (!result.succeeded) {
            printTextStatus(result.error);
            return;
        }

        if (result.lines.length > MAXIMUM_OUTPUT_LINES) {
            printTextStatus("The effect produced too many output lines.");
            return;
        }

        for (lineIndex = 0; lineIndex < result.lines.length; lineIndex += 1) {
            if (result.lines[lineIndex].length > MAXIMUM_OUTPUT_LENGTH) {
                printTextStatus(
                    "The effect exceeded the " + MAXIMUM_OUTPUT_LENGTH + "-character output limit."
                );
                return;
            }
        }

        if (!sendOutput) {
            for (lineIndex = 0; lineIndex < result.lines.length; lineIndex += 1) {
                printTextStatus(result.lines[lineIndex]);
            }
            return;
        }

        if (result.containsAnsi) {
            printTextStatus("ANSI escape sequences are preview-only and cannot be sent to IRC.");
            return;
        }

        target = getCommandTarget(commandEvent);

        if (target.length === 0) {
            printTextStatus("There is no active conversation to receive the output.");
            return;
        }

        for (lineIndex = 0; lineIndex < result.lines.length; lineIndex += 1) {
            birc.say(target, result.lines[lineIndex]);
        }
    }

    function printTextHelp() {
        printTextStatus("bIRC Text Effects help");
        printTextStatus("PREVIEW OR SEND");
        printTextStatus("/text <effect> <arguments> — preview locally");
        printTextStatus(
            "/text preview <effect> <arguments> — explicit local-only preview"
        );
        printTextStatus("/text say <effect> <arguments> — send to the active conversation");
        printTextStatus("WORD EFFECTS");
        printTextStatus("/text leet <light|classic|extreme> <text>");
        printTextStatus("/text alternating <text> — alternating lower and upper case; alias: mock");
        printTextStatus("/text reverse <text>; /text upsidedown <text>; /text clap <text>");
        printTextStatus("UNICODE EFFECTS");
        printTextStatus("/text fullwidth <text>; /text vaporwave <text>; /text circled <text>");
        printTextStatus("/text smallcaps <text>; /text regional <text>");
        printTextStatus("/text bold <text>; /text italic <text>; /text monospace <text>");
        printTextStatus("/text zalgo <low|medium|high> <text> — randomized combining marks");
        printTextStatus("IRC FORMATTING");
        printTextStatus("/text schemes — list installed color schemes");
        printTextStatus("/text scheme <name> <text> — apply a named IRC color sequence");
        printTextStatus("/text rainbow <text> — alias for scheme rainbow");
        printTextStatus("/text color <foreground 0-15> [background 0-15] <text>");
        printTextStatus("/text ircbold <text>; /text ircitalic <text>");
        printTextStatus("/text ircunderline <text>; /text ircstrike <text>");
        printTextStatus("TEXT ART");
        printTextStatus("/text fonts — list installed block fonts");
        printTextStatus("/text block [font] <text> — ASCII lettering; default font: simple; alias: ascii");
        printTextStatus("/text blocks [font] <text> — solid-block version of a font");
        printTextStatus("/text box <text> — Unicode box around one line");
        printTextStatus("TERMINAL OUTPUT");
        printTextStatus("/text ansi <black|red|green|yellow|blue|magenta|cyan|white> <text>");
        printTextStatus("ANSI produces visible \\\\x1b notation for copying and is never sent to IRC.");
        printTextStatus("EXAMPLES");
        printTextStatus("/text leet classic Hack the planet");
        printTextStatus("/text say scheme catppuccin Hello IRC");
        printTextStatus("/text say color 4 1 Warning");
        printTextStatus("/text zalgo low Something approaches");
        printTextStatus("/text say block mini HELLO");
        printTextStatus("LIMITS AND COMPATIBILITY");
        printTextStatus("Input is limited to 160 characters; block text is limited to 12.");
        printTextStatus("Block output sends five IRC messages. Avoid flooding busy channels.");
        printTextStatus("Zalgo may impair readability, search, copy/paste, and accessibility.");
        printTextStatus("Unicode novelty alphabets may render as missing glyphs and are not semantic styling.");
        printTextStatus("IRC colors and formatting depend on the receiving client.");
        printTextStatus(
            "Script " + SCRIPT_ID + " version " + SCRIPT_VERSION +
            " checks the public bIRC Utils version manifest at most once per day."
        );
        printTextStatus("Run /text help at any time to print this guide.");
    }

    function handleTextCommand(argumentsText, commandEvent) {
        var firstPart = splitFirstWord(argumentsText);
        var effectName = firstPart.word.toLowerCase();
        var effectArguments = firstPart.remainder;
        var sendOutput = false;
        var result;

        if (effectName.length === 0 || effectName === "help") {
            printTextHelp();
            return;
        }

        if (effectName === "say") {
            sendOutput = true;
            firstPart = splitFirstWord(effectArguments);
            effectName = firstPart.word.toLowerCase();
            effectArguments = firstPart.remainder;
        } else if (effectName === "preview") {
            firstPart = splitFirstWord(effectArguments);
            effectName = firstPart.word.toLowerCase();
            effectArguments = firstPart.remainder;
        }

        if (effectName.length === 0) {
            printTextStatus(
                "Choose an effect after 'preview' or 'say'. Run /text help."
            );
            return;
        }

        result = parseEffectAndText(effectName + " " + effectArguments);
        outputTextResult(result, sendOutput, commandEvent);
    }

    birc.onCommand("text", handleTextCommand);

    birc.onComplete(function completeTextCommand(word) {
        var candidates = [
            "help", "preview", "say", "leet", "alternating", "mock", "reverse",
            "upsidedown", "clap", "fullwidth", "vaporwave", "circled",
            "smallcaps", "regional", "bold", "italic", "monospace",
            "zalgo", "schemes", "scheme", "rainbow", "color", "ircbold", "ircitalic",
            "ircunderline", "ircstrike", "ansi", "fonts", "block", "ascii",
            "blocks", "box"
        ];
        var matchingCandidates = [];
        var candidateIndex;
        var normalizedWord = word.toLowerCase();

        for (candidateIndex = 0; candidateIndex < candidates.length; candidateIndex += 1) {
            if (candidates[candidateIndex].indexOf(normalizedWord) === 0) {
                matchingCandidates.push(candidates[candidateIndex]);
            }
        }

        return matchingCandidates;
    });

    birc.on("load", function announceTextEffectsLoaded() {
        checkForScriptUpdate();
        printTextStatus("Loaded. Run /text help for effects and examples.");
    });
}());
