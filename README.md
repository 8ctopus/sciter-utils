# sciter utils

Useful functions for [sciter.js](https://sciter.com/).

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
import {addReloadWindow, centerWindow} from "src/utils.js";

document.on("ready", function() {
    // add support for F5 reload
    addReloadWindow();

    // center window on screen
    centerWindow();
});
```
