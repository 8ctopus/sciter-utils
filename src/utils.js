import * as env from "@env";
import * as sciter from "@sciter";

/**
 * Convert measure in device pixels (ppx)
 * @param string(optional) measure
 * @return int
 */
export function devicePixels(measure)
{
    if (typeof measure === "undefined")
        measure = "1in";

    return sciter.devicePixels(measure);
}

/**
 * Convert dip to ppx
 * @param string measure
 * @param int dpi resolution
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
 * @param int dpi resolution
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
 * @param int dpi resolution
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
 * Get screen dimensions
 * @return [int, int]
 */
export function screenDimensions()
{
    // get screen dimensions
    let [sx, sy, sw, sh] = Window.this.screenBox("frame");

    sw += 1;
    sh += 1;

    //console.debug(`screen dimensions ${sw} x ${sh}`);

    return [sw, sh];
}

/**
 * Get window rectangle
 * @param Window (optional) - if no Window is provided Window.this will be used
 * @return [int, int, int, int]
 */
export function windowRect(window)
{
    if (!window)
        window = Window.this;

    // get window dimensions with border
    const [wx, wy, ww, wh] = window.box("rectw", "border", "screen");

    //console.debug(`window rect - (${wx} x ${wy}) ${ww} x ${wh}`);

    return [wx, wy, ww, wh];
}

/**
 * Get window dimensions
 * @param Window (optional) - if no Window is provided Window.this will be used
 * @return [int, int]
 */
export function windowDimensions(window)
{
    // get window dimensions with border
    const [wx, wy, ww, wh] = windowRect(window);

    return [ww, wh];
}

/**
 * Center window on screen
 * @param string reference - "screen" | "parent"
 * @return void
 */
export function centerWindow(reference)
{
    let centerX, centerY;

    if (reference === "parent" && Window.this.parent) {
        //console.debug("center window on parent");

        // get parent window rectangle
        const [px, py, pw, ph] = windowRect(Window.this.parent);

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

    centerWindowXY(Window.this, centerX, centerY);
}

/**
 * Center window around position
 * @param Window window - if null, Window.this will be used
 * @param int x - x center
 * @param int y - y center
 * @return void
 */
export function centerWindowXY(window, x, y)
{
    if (!window)
        window = Window.this;

    const [ww, wh] = windowDimensions(window);

    // calculate position
    const left = x - ww / 2;
    const top  = y - wh / 2;

    //console.debug(`position ${left} x ${top}`);

    // move window
    window.move(left, top);
}

/**
 * Bring window to front
 * @param Window window - if null, Window.this will be used
 * @return void
 */
export function windowToFront(window)
{
    if (!window)
        window = Window.this;

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
 * @param Window window - window handle or if null Window.this
 * @return void
 */
export function closeWindowOnEscape(window)
{
    if (!window)
        window = Window.this;

    addKeyboardShortcut(window.document, {
        key: "KeyESCAPE",
    }, function() {
        window.close();
    })
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
