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

    console.debug(`screen dimensions - ${sw} x ${sh}`);

    return [sw, sh];
}

/**
 * Get window dimensions
 * @return [int, int]
 */
export function windowDimensions()
{
    // get window dimensions with border
    const [wx, wy, ww, wh] = Window.this.box("rectw", "border");

    console.debug(`window dimensions - ${ww} x ${wh}`);

    return [ww, wh];
}

/**
 * Center window on screen
 * @return void
 */
export function centerWindow()
{
    const [sw, sh] = screenDimensions();

    // calculate screen center
    const centerX = sw / 2;
    const centerY = sh / 2;

    console.debug(`screen center - ${centerX} x ${centerY}`);

    centerWindowXY(centerX, centerY);
}

/**
 * Center window around position
 * @param int x - x center
 * @param int y - y center
 * @return void
 */
export function centerWindowXY(x, y)
{
    const [ww, wh] = windowDimensions();

    // calculate position
    const left = x - ww / 2;
    const top  = y - wh / 2;

    console.debug(`position - ${left} x ${top}`);

    // move window
    Window.this.move(left, top);
}

/**
 * Bring window to front
 * @return void
 */
export function bringToFrontWindow()
{
    // bring window to front
    Window.this.isTopmost = true;
    Window.this.isTopmost = false;
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
