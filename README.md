# sciter utils

Useful functions for [sciter.js](https://sciter.com/).

## demo

- git clone the repository
- on Linux/Mac `chmod +x install.sh start.sh`
- run `install.bat` (Win) or `./install.sh` (Linux/Mac) to download the latest sciter binaries and the sciter package manager
- install packages `npm install`
- run `start.bat` (Win) or `./start.sh` (Linux/Mac)

## install

- use npm (`npm install git://github.com/8ctopus/sciter-utils#0.7.0`), alternatively add the `src` dir to your project
- add to `<script type="module">`

```js
import * as Utils from "src/utils.js";

document.on("ready", function() {
    // add support for F5 reload
    Utils.addReloadWindow();

    // center window on screen
    Utils.centerWindow();

    // center window around position
    Utils.centerWindowXY(100, 100);
});
```

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
- addReloadWindow()
- minimizeWindowShortcut()
- closeWindowOnEscape()
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

### files

- fileExists()
- dirExists()

### misc.

- sciterInfo()
- openLink()
- play()
- sleep()
- flushIOQueue()
- capitalizeFirstletter()
