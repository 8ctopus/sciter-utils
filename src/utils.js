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

    console.debug(`screen dimensions ${sw} x ${sh}`);

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

    console.debug(`window rect - (${wx} x ${wy}) ${ww} x ${wh}`);

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
        console.debug("center window on parent");

        // get parent window rectangle
        const [px, py, pw, ph] = windowRect(Window.this.parent);

        centerX = px + pw / 2;
        centerY = py + ph / 2;
    }
    else {
        console.debug("center window on screen");

        // get screen dimensions
        const [sw, sh] = screenDimensions();

        // calculate screen center
        centerX = sw / 2;
        centerY = sh / 2;
    }

    console.debug(`center (${centerX}, ${centerY})`);

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
