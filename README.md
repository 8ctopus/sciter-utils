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

## demo

- git clone the repository
- on Linux/Mac `chmod +x install.sh start.sh`
- run `install.bat` (Win) or `./install.sh` (Linux/Mac) to download the latest sciter binaries and the sciter package manager
- install packages `php bin/spm.phar install`
- run `start.bat` (Win) or `./start.sh` (Linux/Mac)

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
