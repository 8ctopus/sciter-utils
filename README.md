# sciter utils

Useful functions for [sciter.js](https://sciter.com/).

## demo

- git clone the repository
- install packages `npm install`
- install latest sciter sdk `npm run install-sdk`
- start the demo `npm run scapp`

## demo requirements

- A recent version of Node.js `node` (tested with 16 LTS) and its package manager `npm`.
    - On Windows [download](https://nodejs.dev/download/) and run the installer
    - On Linux check the [installation guide](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04#option-2-%E2%80%94-installing-node-js-with-apt-using-a-nodesource-ppa)

## add to your project

### using npm

- install package `npm install sciter-utils`
- add to `<script type="module">`

### copy source

- add the `src` dir to your project
- add to `<script type="module">`

```js
import * as Utils from "node_modules/sciter-utils/src/utils.js";

document.on("ready", function() {
    // add support for F5 reload
    Utils.addReloadWindow();

    // center window on screen
    Utils.centerWindow();

    // center window around position
    Utils.centerWindowXY(100, 100);
});
```

## known issues

- [Crashes are experienced with in sciter.js 4.4.8.24](https://sciter.com/forums/topic/4-4-8-24-new-window-instability/).

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
