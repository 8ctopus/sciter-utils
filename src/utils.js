import * as Env from "@env";
import * as Sciter from "@sciter";
import * as Sys from "@sys";

/**
 * Convert measure in device pixels (ppx)
 * @param {string} measure - (optional)
 * @param {string} axis - (optional) ["width", "height"]
 * @returns {number}
 */
export function devicePixels(measure, axis) {
    if (typeof measure === "undefined")
        measure = "1in";

    return Sciter.devicePixels(measure, axis);
}

/**
 * Convert dip to ppx
 * @param {string} measure
 * @param {number} dpi - resolution
 * @returns {number} value or false on failure
 * @note on a 96 DPI screen, 1 dip === 1ppx, on a 192 DPI screen, 1 dip === 2ppx
 */
export function dipPpx(measure, dpi) {
    // extract value and unit
    const [, value, unit] = measure.match(/(\d+)(\w+)/);

    // convert value to number
    const length = Number.parseInt(value, 10);

    // check types
    if (typeof length !== "number" || unit !== "dip")
        return -1;

    return length * dpi / 96;
}

/**
 * Convert ppx to dip
 * @param {string} measure
 * @param {number} dpi - resolution
 * @returns {number} value or false on failure
 * @note on a 96 DPI screen, 1 dip === 1ppx, on a 192 DPI screen, 1 dip === 2ppx
 */
export function ppxDip(measure, dpi) {
    // extract value and unit
    const [, value, unit] = measure.match(/(\d+)(\w+)/);

    // convert value to number
    const length = Number.parseInt(value, 10);

    // check types
    if (typeof length !== "number" || unit !== "ppx")
        return false;

    return length * 96 / dpi;
}

/**
 * Convert millimeters to ppx
 * @param {string} measure
 * @param {number} dpi - resolution
 * @returns {number} value or false on failure
 */
export function mmPpx(measure, dpi) {
    // extract value and unit
    const [, value, unit] = measure.match(/([\d.]+)(\w+)/);

    // convert value to number
    const length = Number.parseFloat(value);

    // check types
    if (typeof length !== "number" || unit !== "mm")
        return false;

    // 1 inch = 25.4mm = 96dip
    const dip = length * 96 / 25.4;

    return dip * dpi / 96;
}

/**
 * Get monitors count
 * @returns {number}
 */
export function monitorsCount() {
    return Window.screens;
}

/**
 * Log monitors info
 */
export function logMonitors() {
    const screens = monitorsCount();

    for (let index = 0; index < screens; ++index) {
        const [w, h] = Window.screenBox(index, "frame", "dimension");
        const primary = Window.screenBox(index, "isPrimary");
        const device = Window.screenBox(index, "device");
        const ratio = Window.screenBox(index, "devicePixelRatio");

        console.log(`monitor ${index + 1} - ${w} x ${h} - ${primary ? "primary" : "secondary"} - ${device} - ${ratio}`);
    }
}

/**
 * Get screen dimensions
 * @returns {Array} [width, height] in ppx
 */
export function screenDimensions() {
    // get screen dimensions
    const [w, h] = Window.this.screenBox("frame", "dimension");

    //console.debug("screen dimensions", w, h);

    return [w, h];
}

/**
 * Get window rectangle
 * @param {Window} window
 * @param {boolean} ppx - ppx true, dpi false
 * @returns {Array} [left, top, width, height]
 * @throws Error
 */
export function windowRect(window, ppx) {
    if (typeof window !== "object" || window.constructor.name !== "Window" || typeof ppx !== "boolean")
        throw new Error("invalid arguments");

    // get window dimensions with border
    const [wx, wy, ww, wh] = window.box("rectw", "border", "screen", ppx);

    //console.debug("window rect", wx, wy, ww, wh);

    return [wx, wy, ww, wh];
}

/**
 * Get window dimensions
 * @param {Window} window
 * @param {boolean} ppx - ppx true, dpi false
 * @returns {Array} [int,int]
 * @throws Error
 */
export function windowDimensions(window, ppx) {
    // get window dimensions with border
    const [ww, wh] = windowRect(window, ppx).slice(2, 4);

    //console.debug("window dimensions", ww, wh);

    return [ww, wh];
}

/**
 * Set window dimensions
 * @param {Window} window
 * @param {number} width
 * @param {number} height
 * @param {boolean} ppx - ppx true, dpi false
 * @throws Error
 */
export function setWindowDimensions(window, width, height, ppx) {
    if (typeof window !== "object" || window.constructor.name !== "Window"
            || typeof width !== "number" || typeof height !== "number" || typeof ppx !== "boolean")
        throw new Error("invalid arguments");

    // get window top and left
    const rect = windowRect(window, true);

    if (!ppx) {
        // convert dpi to ppx
        width = Sciter.devicePixels(width, "width");
        height = Sciter.devicePixels(height, "height");
    }

    // resize
    Window.this.move(rect[0], rect[1], width, height);
}

/**
 * Center window on screen
 * @param {Window} window
 * @param {string} reference - ["screen", "parent"]
 * @throws Error
 */
export function centerWindow(window, reference) {
    if (typeof window !== "object" || window.constructor.name !== "Window" || typeof reference !== "string")
        throw new Error("invalid arguments");

    let centerX;
    let centerY;

    if (reference === "parent" && window.parent) {
        //console.debug("center window on parent");

        // get parent window rectangle
        const [px, py, pw, ph] = windowRect(window.parent, true);

        centerX = px + (pw / 2);
        centerY = py + (ph / 2);
    }
    else {
        //console.debug("center window on screen");

        // get screen dimensions
        const [sw, sh] = screenDimensions();

        // calculate screen center
        centerX = sw / 2;
        centerY = sh / 2;
    }

    centerWindowXY(window, centerX, centerY);
}

/**
 * Center window around position
 * @param {Window} window
 * @param {number} x - x center in ppx
 * @param {number} y - y center in ppx
 * @throws Error
 */
export function centerWindowXY(window, x, y) {
    if (typeof window !== "object" || window.constructor.name !== "Window"
            || typeof x !== "number" || typeof y !== "number")
        throw new Error("invalid arguments");

    const [ww, wh] = windowDimensions(window, true);

    // calculate position
    const left = x - (ww / 2);
    const top = y - (wh / 2);

    //console.debug("center window", left, top);

    // move window
    window.move(left, top);
}

/**
 * Bring window to front
 * @param {Window} window
 * @throws Error
 */
export function windowToFront(window) {
    if (typeof window !== "object" || window.constructor.name !== "Window")
        throw new Error("invalid arguments");

    // bring window to front
    window.isTopmost = true;
    window.isTopmost = false;
}

/**
 * Focus window
 */
export function focusWindow() {
    // set focus
    document.body.state.focus = true;
}

/**
 * Add window reload with F5
 */
export function addReloadWindow() {
    addKeyboardShortcut(Window.this.document, {
        key: "KeyF5",
    }, function() {
        // reload app
        Window.this.load(location.href);

        // consume event
        return true;
    });
}

/**
 * Add minimize window shortcut
 */
export function minimizeWindowShortcut() {
    addKeyboardShortcut(Window.this.document, {
        key: "KeyM",
        metaKey: true,
    }, function() {
        console.log("Minimize window...");

        Window.this.state = Window.WINDOW_MINIMIZED;

        // consume event
        return true;
    });
}

/**
 * Close window on escape
 * @param {Window} window
 * @throws Error
 */
export function closeWindowOnEscape(window) {
    if (typeof window !== "object" || window.constructor.name !== "Window")
        throw new Error("invalid arguments");

    addKeyboardShortcut(window.document, {
        key: "KeyESCAPE",
    }, () => {
        window.close();
    });
}

/**
 * Get event key as string
 * @param {Event} event
 * @returns {string}
 */
export function keyStr(event) {
    const code = event.code.replace("Key", "");

    return `${event.metaKey ? "meta" : ""} ${event.ctrlKey ? "ctrl" : ""} ${event.altKey ? "alt" : ""} ${event.shiftKey ? "shift" : ""} ${code}`;
}

/**
 * Log keyboard keys
 * @param {Element} element
 * @param {Function} function_ - func to call
 * @returns {boolean}
 */
export function keyLogger(element, function_) {
    if (element === undefined || typeof function_ !== "function")
        return false;

    element.on("keyup", function(event) {
        // call function
        const result = function_(event);

        if (result !== undefined)
            return result;
    });

    return true;
}

/**
 * Add keyboard shortcut
 * @param {Element} element
 * @param {object} shortcut
 * @param {Function} function_ - func to call
 * @returns {boolean}
 */
export function addKeyboardShortcut(element, shortcut, function_) {
    if (element === undefined || shortcut === undefined
            || shortcut.key === undefined || typeof function_ !== "function")
        return false;

    shortcut.ctrlKey = shortcut.ctrlKey ?? false;
    shortcut.shiftKey = shortcut.shiftKey ?? false;
    shortcut.altKey = shortcut.altKey ?? false;
    shortcut.metaKey = shortcut.metaKey ?? false;

    element.on("keyup", function(event) {
        //console.debug("keyup", keyStr(event));

        // compare key
        if (event.code === shortcut.key
            // compare modifiers
            && event.ctrlKey === shortcut.ctrlKey
            && event.shiftKey === shortcut.shiftKey
            && event.altKey === shortcut.altKey) {
            // call function
            const result = function_(event);

            if (result !== undefined)
                return result;
        }
    });

    return true;
}

/**
 * Open link in browser
 * @param {string} url
 */
export function openLink(url) {
    console.log(`GUI - Open link in browser - ${url}`);

    // open url in default browser
    Env.launch(url);
}

/**
 * Get sciter info
 * @returns {string}
 */
export function sciterInfo() {
    return `sciter v${Sciter.VERSION} r${Sciter.REVISION} quick.js v${Sciter.QUICKJS_VERSION}`;
}

/**
 * Sleep
 * @param {number} delay - in milliseconds
 * @note blocks code execution until completion,
 * see https://stackoverflow.com/questions/1141302/is-there-a-sleep-function-in-javascript
 */
export function sleep(delay) {
    const start = Date.now();

    while (Date.now() < start + delay);

    // not implemented yet
    //Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, delay);
}

/**
 * Play sound
 * @param {string} file
 * @returns {Promise}
 */
export async function playSound(file) {
    // try catch not needed because of the promise
    const audio = await Audio.load(file);
    await audio.play();
}

/**
 * Load string from file
 * @param {string} url
 * @returns {string}
 * @throws Error if load file fails
 */
export function loadFile(url) {
    // get url content
    const result = fetch(url, {sync: true});

    if (result.ok)
        return result.text();

    throw new Error(`Load file - result ${result.status} - url ${url}`);
}

/**
 * Load json from file
 * @param {string} url
 * @param {object} json - [in,out]
 * @throws Error if load file fails
 */
export function loadJson(url, json) {
    // clear json object
    for (const property of Object.getOwnPropertyNames(json))
        delete json[property];

    const text = loadFile(url);

    // convert text to json
    Object.assign(json, JSON.parse(text));
}

/**
 * Save json to file
 * @param {string} url
 * @param {object} json
 * @throws Error if save file fails
 */
export function saveJson(url, json) {
    // convert json to string
    const string_ = JSON.stringify(json, undefined, 4);

    (async () => {
        // open file for writing
        const file = await Sys.fs.open(URL.toPath(url), "wb+");

        // write to file
        await file.write(string_);

        // close file
        file.close();
    })();
}

/**
 * Flush IO queue
 * @note avoid closing app while some operations still haven't been executed
 */
export function flushIOQueue() {
    // flush i/o queue before closing app otherwise the previous line never gets executed
    for (let n = 0; n < 100; ++n) {
        if (!Window.this.doEvent("I/O"))
            break;
    }
}

/**
 * Check if file exists
 * @param {string} file
 * @returns {boolean}
 * @note use file, not url
 */
export function fileExists(file) {
    const stat = Sys.fs.$stat(file);

    return stat === null ? false : (Boolean(stat.st_mode & 0x80_00));
}

/**
 * Check if directory exists
 * @param {string} dir
 * @returns {boolean}
 * @note use file, not url
 */
export function dirExists(dir) {
    const stat = Sys.fs.$stat(dir);

    return stat === null ? false : (Boolean(stat.st_mode & 0x40_00));
}

/**
 * Capitalize first letter
 * @param {string} string_
 * @returns {string}
 */
export function capitalizeFirstLetter(string_) {
    return string_.charAt(0).toUpperCase() + string_.slice(1);
}
