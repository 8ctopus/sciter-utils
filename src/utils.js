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
 * Center window on screen
 * @return void
 */
export function centerWindow()
{
    // bring window to front
    Window.this.isTopmost = true;
    Window.this.isTopmost = false;

    // get screen dimensions
    const [sx, sy, sw, sh] = Window.this.screenBox("frame");

    //console.log(`${sx} ${sy} ${sw} ${sh}`)

    // calculate screen center
    const centerX = sx + sw / 2;
    const centerY = sy + sh / 2;

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
    // bring window to front
    Window.this.isTopmost = true;
    Window.this.isTopmost = false;

    // get window dimensions with border
    const [wx, wy, ww, wh] = Window.this.box("rectw", "border");

    //console.log(`${wx} ${wy} ${ww} ${wh}`)

    // calculate position
    const left = x - ww / 2;
    const top  = y - wh / 2;

    // move window
    Window.this.move(left, top);

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
