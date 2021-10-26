# sciter utils

Useful functions for [sciter.js](https://sciter.com/).

## functions

### dpi

- devicePixels()
- dip_ppx()
- ppx_dip()
- mm_ppx()

### screen and window

- monitorsCount()
- logMonitors()
- screenDimensions()
- windowRect()
- windowDimensions()
- setWindowDimensions()
- centerWindow()
- centerWindowXY()
- bringToFrontWindow()
- focusWindow()

### keyboard

- keyLogger()
- addKeyboardShortcut()
- keyStr()

### json

- loadFile()
- loadJson()
- saveJson()

### misc.

- sleep()
- addReloadWindow()
- minimizeWindowShortcut()
- closeWindowOnEscape()

- openLink()

- sciterInfo()

- play()

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
