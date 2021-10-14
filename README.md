# sciter utils

Useful functions for [sciter.js](https://sciter.com/).

## functions

### dpi

- devicePixels(string) : int
- dip_ppx(string) : float
- ppx_dip(string) : float
- mm_ppx(string) : float

### screen and window

- monitorsCount() : int
- logMonitors() : void
- screenDimensions() : int [width, height]
- windowRect(window) : int [left, top, width, height]
- windowDimensions(window) : int [width, height]
- centerWindow(reference) : void
- centerWindowXY(window, x, y) : void
- bringToFrontWindow(window) : void
- focusWindow() : void

### keyboard

- keyLogger(DOMElement, function) : bool
- addKeyboardShortcut(DOMElement, shortcut, function) : bool
- keyStr(Event) : string

### misc.

- sleep(ms) : void
- addReloadWindow() : void
- minimizeWindowShortcut() : void
- closeWindowOnEscape(window) : void

- openLink(string) : void

- sciterInfo() : string

- play(string) : Promise

## demo

- git clone the repository
- run `install.bat` to download the latest sciter binaries and the sciter package manager
- install packages `php spm.phar install`
- run `scapp.bat`
- to refresh the app after changes to the html/css click `F5`

## install

- add the `src` dir to your project
- add to `<script type="module">`

```js
import * as utils from "src/utils.js";

document.on("ready", function() {
    // add support for F5 reload
    utils.addReloadWindow();

    // center window on screen
    utils.centerWindow();

    // center window around position
    utils.centerWindowXY(100, 100);
});
```
