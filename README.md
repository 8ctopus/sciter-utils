# sciter utils

![latest version](https://img.shields.io/npm/v/sciter-utils.svg)
![downloads](https://img.shields.io/npm/dy/sciter-utils.svg)

Useful functions for [sciter.js](https://sciter.com/).

## demo

- git clone the repository
- install packages `npm install`
- install latest sciter sdk `npm run install-sdk`
- start the demo `npm run scapp`

## demo requirements

- A recent version of Node.js `node` (tested with 22 LTS) and its package manager `npm`.
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
import Utils from "node_modules/sciter-utils/src/utils.js";

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

[Full documentation](documentation.md)

### dpi

- devicePixels()
- dipPpx()
- ppxDip()
- mmPpx()

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

### files

- fileExists()
- dirExists()
- getSeparator()
- splitPath()

### json

- loadJson()
- saveJson()

### misc.

- sciterInfo()
- openLink()
- playSound()
- sleep()
- flushIOQueue()
- capitalizeFirstletter()
- arrayBufferToHexStr()
- randomStr()
- uuid() - https://developer.mozilla.org/en-US/docs/Glossary/UUID
- debounce()

## generate doc

```sh
./node_modules/.bin/jsdoc2md src/utils.js > documentation.md
```