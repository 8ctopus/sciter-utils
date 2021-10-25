import * as env from "@env";
import * as sciter from "@sciter";

/**
 * Convert measure in device pixels (ppx)
 * @param string (optional) measure
 * @param string (optional) axis ["width", "height"]
 * @return int
 */
export function devicePixels(measure, axis)
{
    if (typeof measure === "undefined")
        measure = "1in";

    return sciter.devicePixels(measure, axis);
}

/**
 * Convert dip to ppx
 * @param string measure
 * @param number dpi resolution
 * @return float value or false on failure
 * @note on a 96 DPI screen, 1 dip === 1ppx, on a 192 DPI screen, 1 dip === 2ppx
 */
export function dip_ppx(measure, dpi)
{
    // extract value and unit
    const [,value, unit] = measure.match(/(\d+)(\w+)/);

    // convert value to number
    const length = parseInt(value);

    // check types
    if (typeof length !== "number" || unit !== "dip")
        return -1;

    return length * dpi / 96;
}

/**
 * Convert ppx to dip
 * @param string measure
 * @param number dpi resolution
 * @return float value or false on failure
 * @note on a 96 DPI screen, 1 dip === 1ppx, on a 192 DPI screen, 1 dip === 2ppx
 */
export function ppx_dip(measure, dpi)
{
    // extract value and unit
    const [,value, unit] = measure.match(/(\d+)(\w+)/);

    // convert value to number
    const length = parseInt(value);

    // check types
    if (typeof length !== "number" || unit !== "ppx")
        return false;

    return length * 96 / dpi;
}

/**
 * Convert millimeters to ppx
 * @param string measure
 * @param number dpi resolution
 * @return float value or false on failure
 */
export function mm_ppx(measure, dpi)
{
    // extract value and unit
    const [,value, unit] = measure.match(/([.\d]+)(\w+)/);

    // convert value to number
    const length = parseFloat(value);

    // check types
    if (typeof length !== "number" || unit !== "mm")
        return false;

    // 1 inch = 25.4mm = 96dip
    const dip = length * 96 / 25.4;

    return dip * dpi / 96;
}

/**
 * Get monitors count
 * @return int
 */
export function monitorsCount()
{
    return Window.screens;
}

/**
 * Log monitors info
 * @return void
 */
export function logMonitors()
{
    const screens = monitorsCount();

    for (let i=0; i < screens; ++i) {
        const [w, h]  = Window.screenBox(i, "frame", "dimension");
        const primary = Window.screenBox(i, "isPrimary");
        const device  = Window.screenBox(i, "device");
        const ratio   = Window.screenBox(i, "devicePixelRatio");

        console.log(`monitor ${i + 1} - ${w} x ${h} - ${primary ? "primary" : "secondary"} - ${device} - ${ratio}`);
    }
}

/**
 * Get screen dimensions
 * @return [int, int] in ppx
 */
export function screenDimensions()
{
    // get screen dimensions
    const [w, h] = Window.this.screenBox("frame", "dimension");

    //console.debug(`screen dimensions ${w} x ${h}`);

    return [w, h];
}

/**
 * Get window rectangle
 * @param Window window
 * @param bool ppx - ppx true, dpi false
 * @return Array [left, top, width, height]
 * @throws Error
 */
export function windowRect(window, ppx)
{
    if (typeof window !== "object" || window.constructor.name !== "Window" || typeof ppx !== "boolean")
        throw Error("invalid arguments");

    // get window dimensions with border
    const [wx, wy, ww, wh] = window.box("rectw", "border", "screen", ppx);

    //console.debug(`window rect - (${wx} x ${wy}) ${ww} x ${wh}`);

    return [wx, wy, ww, wh];
}

/**
 * Get window dimensions
 * @param Window window
 * @param bool ppx - ppx true, dpi false
 * @return [int, int]
 * @throws Error
 */
export function windowDimensions(window, ppx)
{
    // get window dimensions with border
    const [wx, wy, ww, wh] = windowRect(window, ppx);

    return [ww, wh];
}

/**
 * Set window dimensions
 * @param Window window
 * @param numbereger width
 * @param numbereger height
 * @param bool ppx - ppx true, dpi false
 * @return void
 * @throws Error
 */
export function setWindowDimensions(window, width, height, ppx)
{
    if (typeof window !== "object" || window.constructor.name !== "Window" || typeof width !== "number" || typeof height !== "number" || typeof ppx !== "boolean")
        throw Error("invalid arguments");

    // get window top and left
    const rect = windowRect(window, true);

    if (!ppx) {
        // convert dpi to ppx
        width  = sciter.devicePixels(width, "width");
        height = sciter.devicePixels(height, "height");
    }

    // resize
    Window.this.move(rect[0], rect[1], width, height);
}

/**
 * Center window on screen
 * @param Window window
 * @param string reference - ["screen", "parent"]
 * @return void
 * @throws Error
 */
export function centerWindow(window, reference)
{
    if (typeof window !== "object" || window.constructor.name !== "Window" || typeof reference !== "string")
        throw Error("invalid arguments");

    let centerX, centerY;

    if (reference === "parent" && window.parent) {
        //console.debug("center window on parent");

        // get parent window rectangle
        const [px, py, pw, ph] = windowRect(window.parent, true);

        centerX = px + pw / 2;
        centerY = py + ph / 2;
    }
    else {
        //console.debug("center window on screen");

        // get screen dimensions
        const [sw, sh] = screenDimensions();

        // calculate screen center
        centerX = sw / 2;
        centerY = sh / 2;
    }

    //console.debug(`center (${centerX}, ${centerY})`);

    centerWindowXY(window, centerX, centerY);
}

/**
 * Center window around position
 * @param Window window
 * @param number x - x center in ppx
 * @param number y - y center in ppx
 * @return void
 * @throws Error
 */
export function centerWindowXY(window, x, y)
{
    if (typeof window !== "object" || window.constructor.name !== "Window" || typeof x !== "number" || typeof y !== "number")
        throw Error("invalid arguments");

    const [ww, wh] = windowDimensions(window, true);

    // calculate position
    const left = x - ww / 2;
    const top  = y - wh / 2;

    //console.debug(`position ${left} x ${top}`);

    // move window
    window.move(left, top);
}

/**
 * Bring window to front
 * @param Window window
 * @return void
 * @throws Error
 */
export function windowToFront(window)
{
    if (typeof window !== "object" || window.constructor.name !== "Window")
        throw Error("invalid arguments");

    // bring window to front
    window.isTopmost = true;
    window.isTopmost = false;
}

/**
 * Focus window
 * @return void
 */
export function focusWindow()
{
    // set focus
    document.body.state.focus = true;
}

/**
 * Add window reload with F5
 * @return void
 */
export function addReloadWindow()
{
    addKeyboardShortcut(window.document, {
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
 * @return void
 */
export function minimizeWindowShortcut()
{
    addKeyboardShortcut(window.document, {
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
 * @param Window window
 * @return void
 * @throws Error
 */
export function closeWindowOnEscape(window)
{
    if (typeof window !== "object" || window.constructor.name !== "Window")
        throw Error("invalid arguments");

    addKeyboardShortcut(window.document, {
        key: "KeyESCAPE",
    }, function() {
        window.close();
    })
}

/**
 * Get event key as string
 * @param Event event
 * @return string
 */
export function keyStr(event)
{
    const code = event.code.replace("Key", "");

    return `${event.metaKey ? "meta": ""} ${event.ctrlKey ? "ctrl" : ""} ${event.altKey ? "alt" : ""} ${event.shiftKey ? "shift": ""} ${code}`;
}

/**
 * Log keyboard keys
 * @param DOMElement element
 * @param function func to call
 * @return bool
 */
export function keyLogger(element, func)
{
    if (element === undefined || typeof func !== "function")
        return false;

    element.on("keyup", function(event) {
        // call function
        let result = func(event);

        if (result !== undefined)
            return result;
    });

    return true;
}

/**
 * Add keyboard shortcut
 * @param DOMElement element
 * @param object shortcut
 * @param function func to call
 * @return bool
 */
export function addKeyboardShortcut(element, shortcut, func)
{
    if (element === undefined || shortcut === undefined || shortcut.key === undefined || typeof func !== "function")
        return false;

    shortcut.ctrlKey  = shortcut.ctrlKey ?? false;
    shortcut.shiftKey = shortcut.shiftKey ?? false;
    shortcut.altKey   = shortcut.altKey ?? false;
    shortcut.metaKey  = shortcut.metaKey ?? false;

    element.on("keyup", function(event) {
        //console.debug("keyup - " + keyStr(event));

        // compare key
        if (event.code === shortcut.key &&
                // compare modifiers
                event.ctrlKey === shortcut.ctrlKey && event.shiftKey === shortcut.shiftKey && event.altKey === shortcut.altKey) {
            // call function
            let result = func(event);

            if (result !== undefined)
                return result;
        }
    });

    return true;
}

/**
 * Open link in browser
 * @param  string url
 * @return void
 */
export function openLink(url)
{
    console.log(`GUI - Open link in browser - ${url}`);

    // open url in default browser
    env.launch(url);
}

/**
 * Get sciter info
 * @return string
 */
export function sciterInfo()
{
    return `sciter v${sciter.VERSION} r${sciter.REVISION} quick.js v${sciter.QUICKJS_VERSION}`;
}

/**
 * Sleep function
 * @param number delay in milliseconds
 * @return void
 * @note blocks code execution until completion, see https://stackoverflow.com/questions/1141302/is-there-a-sleep-function-in-javascript
 */
export function sleep(delay)
{
    const start = new Date().getTime();

    while (new Date().getTime() < start + delay);
}

/**
 * Play sound
 * @param  string file
 * @return Promise
 */
export async function play(file)
{
    // try catch not needed because of the promise
    const audio = await Audio.load(file);
    await audio.play();
}
