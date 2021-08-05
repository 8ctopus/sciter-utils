import * as env from '@env';

/**
 * Add window reload with F5
 * @return void
 */
export function addReloadWindow()
{
    document.on("keydown", function(event, element) {
        if (event.code !== "KeyF5")
            return;

        // reload app
        Window.this.load(location.href);

        // consume event
        return true;
    });
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
 * Add minimize window shortcut
 * @return void
 */
export function minimizeWindowShortcut()
{
    document.on("keyup", function(event, element) {
        //console.log(`code ${event.code} - shift ${event.shiftKey} - ctrl ${event.ctrlKey} - meta ${event.metaKey}`);

        if (!(event.code === "KeyM" && event.metaKey))
            return;

        console.log("Minimize window...");

        Window.this.state = Window.WINDOW_MINIMIZED;

        // consume event
        return true;
    });
}

/**
 * Close window on escape
 * @param Window window - window handle or if null Window.this
 * @return {[type]}
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
                event.ctrlKey === shortcut.ctrlKey && event.shiftKey === shortcut.shiftKey && event.altKey === shortcut.altKey)
            // call function
            func(event);
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
