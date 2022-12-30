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

<dl>
<dt><a href="#devicePixels">devicePixels(measure, axis)</a> ⇒ <code>number</code></dt>
<dd><p>Convert measure in device pixels (ppx)</p>
</dd>
<dt><a href="#dipPpx">dipPpx(measure, dpi)</a> ⇒ <code>number</code></dt>
<dd><p>Convert dip to ppx</p>
</dd>
<dt><a href="#ppxDip">ppxDip(measure, dpi)</a> ⇒ <code>number</code></dt>
<dd><p>Convert ppx to dip</p>
</dd>
<dt><a href="#mmPpx">mmPpx(measure, dpi)</a> ⇒ <code>number</code></dt>
<dd><p>Convert millimeters to ppx</p>
</dd>
<dt><a href="#monitorsCount">monitorsCount()</a> ⇒ <code>number</code></dt>
<dd><p>Get monitors count</p>
</dd>
<dt><a href="#logMonitors">logMonitors()</a></dt>
<dd><p>Log monitors info</p>
</dd>
<dt><a href="#screenDimensions">screenDimensions()</a> ⇒ <code>Array</code></dt>
<dd><p>Get screen dimensions</p>
</dd>
<dt><a href="#windowRect">windowRect(window, ppx)</a> ⇒ <code>Array</code></dt>
<dd><p>Get window rectangle</p>
</dd>
<dt><a href="#windowDimensions">windowDimensions(window, ppx)</a> ⇒ <code>Array</code></dt>
<dd><p>Get window dimensions</p>
</dd>
<dt><a href="#setWindowDimensions">setWindowDimensions(window, width, height, ppx)</a></dt>
<dd><p>Set window dimensions</p>
</dd>
<dt><a href="#centerWindow">centerWindow(window, reference)</a> ⇒ <code>void</code></dt>
<dd><p>Center window on screen</p>
</dd>
<dt><a href="#centerWindowXY">centerWindowXY(window, x, y)</a> ⇒ <code>void</code></dt>
<dd><p>Center window around position</p>
</dd>
<dt><a href="#windowToFront">windowToFront(window)</a> ⇒ <code>void</code></dt>
<dd><p>Bring window to front</p>
</dd>
<dt><a href="#focusWindow">focusWindow()</a></dt>
<dd><p>Focus window</p>
</dd>
<dt><a href="#addReloadWindow">addReloadWindow()</a></dt>
<dd><p>Add window reload with F5</p>
</dd>
<dt><a href="#minimizeWindowShortcut">minimizeWindowShortcut()</a></dt>
<dd><p>Add minimize window shortcut</p>
</dd>
<dt><a href="#closeWindowOnEscape">closeWindowOnEscape(window)</a></dt>
<dd><p>Close window on escape</p>
</dd>
<dt><a href="#keyStr">keyStr(event)</a> ⇒ <code>string</code></dt>
<dd><p>Get event key as string</p>
</dd>
<dt><a href="#keyLogger">keyLogger(element, function_)</a> ⇒ <code>boolean</code></dt>
<dd><p>Log keyboard keys</p>
</dd>
<dt><a href="#addKeyboardShortcut">addKeyboardShortcut(element, shortcut, function_)</a> ⇒ <code>boolean</code></dt>
<dd><p>Add keyboard shortcut</p>
</dd>
<dt><a href="#openLink">openLink(url)</a></dt>
<dd><p>Open link in browser</p>
</dd>
<dt><a href="#sciterInfo">sciterInfo()</a> ⇒ <code>string</code></dt>
<dd><p>Get sciter info</p>
</dd>
<dt><a href="#sleep">sleep(delay)</a></dt>
<dd><p>Sleep</p>
</dd>
<dt><a href="#playSound">playSound(file)</a> ⇒ <code>Promise</code></dt>
<dd><p>Play sound</p>
</dd>
<dt><a href="#getUrl">getUrl(url)</a> ⇒ <code>string</code></dt>
<dd><p>Get text from url</p>
</dd>
<dt><a href="#loadJson">loadJson(url, json)</a> ⇒ <code>void</code></dt>
<dd><p>Load json from file</p>
</dd>
<dt><a href="#saveJson">saveJson(url, json)</a> ⇒ <code>void</code></dt>
<dd><p>Save json to file</p>
</dd>
<dt><a href="#flushIOQueue">flushIOQueue()</a></dt>
<dd><p>Flush IO queue</p>
</dd>
<dt><a href="#fileExists">fileExists(file)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if file exists</p>
</dd>
<dt><a href="#dirExists">dirExists(dir)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if directory exists</p>
</dd>
<dt><a href="#getSeparator">getSeparator()</a> ⇒ <code>string</code></dt>
<dd><p>Get directory separator</p>
</dd>
<dt><a href="#splitPath">splitPath(path)</a> ⇒ <code>json</code></dt>
<dd><p>Split file path into composing elements</p>
</dd>
<dt><a href="#capitalizeFirstLetter">capitalizeFirstLetter(string_)</a> ⇒ <code>string</code></dt>
<dd><p>Capitalize first letter</p>
</dd>
<dt><a href="#arrayBufferToHexStr">arrayBufferToHexStr(buffer)</a> ⇒ <code>string</code></dt>
<dd><p>Convert array buffer to hex string</p>
</dd>
<dt><a href="#randomStr">randomStr(length)</a> ⇒ <code>string</code></dt>
<dd><p>Create random string</p>
</dd>
<dt><a href="#uuid">uuid()</a> ⇒ <code>string</code></dt>
<dd><p>Create uuid</p>
</dd>
<dt><a href="#debounce">debounce(callback, time, cancel)</a> ⇒ <code>void</code></dt>
<dd><p>Debounce</p>
</dd>
</dl>

<a name="devicePixels"></a>

## devicePixels(measure, axis) ⇒ <code>number</code>
Convert measure in device pixels (ppx)

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| measure | <code>string</code> | (optional) |
| axis | <code>string</code> | (optional) ["width", "height"] |

<a name="dipPpx"></a>

## dipPpx(measure, dpi) ⇒ <code>number</code>
Convert dip to ppx

**Kind**: global function
**Returns**: <code>number</code> - value or false on failure
**Note**: on a 96 DPI screen, 1 dip === 1ppx, on a 192 DPI screen, 1 dip === 2ppx

| Param | Type | Description |
| --- | --- | --- |
| measure | <code>string</code> |  |
| dpi | <code>number</code> | resolution |

<a name="ppxDip"></a>

## ppxDip(measure, dpi) ⇒ <code>number</code>
Convert ppx to dip

**Kind**: global function
**Returns**: <code>number</code> - value or false on failure
**Note**: on a 96 DPI screen, 1 dip === 1ppx, on a 192 DPI screen, 1 dip === 2ppx

| Param | Type | Description |
| --- | --- | --- |
| measure | <code>string</code> |  |
| dpi | <code>number</code> | resolution |

<a name="mmPpx"></a>

## mmPpx(measure, dpi) ⇒ <code>number</code>
Convert millimeters to ppx

**Kind**: global function
**Returns**: <code>number</code> - value or false on failure

| Param | Type | Description |
| --- | --- | --- |
| measure | <code>string</code> |  |
| dpi | <code>number</code> | resolution |

<a name="monitorsCount"></a>

## monitorsCount() ⇒ <code>number</code>
Get monitors count

**Kind**: global function
<a name="logMonitors"></a>

## logMonitors()
Log monitors info

**Kind**: global function
<a name="screenDimensions"></a>

## screenDimensions() ⇒ <code>Array</code>
Get screen dimensions

**Kind**: global function
**Returns**: <code>Array</code> - [width, height] in ppx
<a name="windowRect"></a>

## windowRect(window, ppx) ⇒ <code>Array</code>
Get window rectangle

**Kind**: global function
**Returns**: <code>Array</code> - [left, top, width, height]
**Throws**:

- Error


| Param | Type | Description |
| --- | --- | --- |
| window | <code>Window</code> |  |
| ppx | <code>boolean</code> | ppx true, dpi false |

<a name="windowDimensions"></a>

## windowDimensions(window, ppx) ⇒ <code>Array</code>
Get window dimensions

**Kind**: global function
**Returns**: <code>Array</code> - [int,int]
**Throws**:

- Error


| Param | Type | Description |
| --- | --- | --- |
| window | <code>Window</code> |  |
| ppx | <code>boolean</code> | ppx true, dpi false |

<a name="setWindowDimensions"></a>

## setWindowDimensions(window, width, height, ppx)
Set window dimensions

**Kind**: global function
**Throws**:

- Error


| Param | Type | Description |
| --- | --- | --- |
| window | <code>Window</code> |  |
| width | <code>number</code> |  |
| height | <code>number</code> |  |
| ppx | <code>boolean</code> | ppx true, dpi false |

<a name="centerWindow"></a>

## centerWindow(window, reference) ⇒ <code>void</code>
Center window on screen

**Kind**: global function
**Throws**:

- Error


| Param | Type | Description |
| --- | --- | --- |
| window | <code>Window</code> |  |
| reference | <code>string</code> | ["screen", "parent"] |

<a name="centerWindowXY"></a>

## centerWindowXY(window, x, y) ⇒ <code>void</code>
Center window around position

**Kind**: global function
**Throws**:

- Error


| Param | Type | Description |
| --- | --- | --- |
| window | <code>Window</code> |  |
| x | <code>number</code> | x center in ppx |
| y | <code>number</code> | y center in ppx |

<a name="windowToFront"></a>

## windowToFront(window) ⇒ <code>void</code>
Bring window to front

**Kind**: global function
**Throws**:

- Error


| Param | Type |
| --- | --- |
| window | <code>Window</code> |

<a name="focusWindow"></a>

## focusWindow()
Focus window

**Kind**: global function
<a name="addReloadWindow"></a>

## addReloadWindow()
Add window reload with F5

**Kind**: global function
<a name="minimizeWindowShortcut"></a>

## minimizeWindowShortcut()
Add minimize window shortcut

**Kind**: global function
<a name="closeWindowOnEscape"></a>

## closeWindowOnEscape(window)
Close window on escape

**Kind**: global function
**Throws**:

- Error


| Param | Type |
| --- | --- |
| window | <code>Window</code> |

<a name="keyStr"></a>

## keyStr(event) ⇒ <code>string</code>
Get event key as string

**Kind**: global function

| Param | Type |
| --- | --- |
| event | <code>Event</code> |

<a name="keyLogger"></a>

## keyLogger(element, function_) ⇒ <code>boolean</code>
Log keyboard keys

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Element</code> |  |
| function_ | <code>function</code> | func to call |

<a name="addKeyboardShortcut"></a>

## addKeyboardShortcut(element, shortcut, function_) ⇒ <code>boolean</code>
Add keyboard shortcut

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Element</code> |  |
| shortcut | <code>object</code> |  |
| function_ | <code>function</code> | func to call |

<a name="openLink"></a>

## openLink(url)
Open link in browser

**Kind**: global function

| Param | Type |
| --- | --- |
| url | <code>string</code> |

<a name="sciterInfo"></a>

## sciterInfo() ⇒ <code>string</code>
Get sciter info

**Kind**: global function
<a name="sleep"></a>

## sleep(delay)
Sleep

**Kind**: global function
**Note**: blocks code execution until completion,
see https://stackoverflow.com/questions/1141302/is-there-a-sleep-function-in-javascript

| Param | Type | Description |
| --- | --- | --- |
| delay | <code>number</code> | in milliseconds |

<a name="playSound"></a>

## playSound(file) ⇒ <code>Promise</code>
Play sound

**Kind**: global function

| Param | Type |
| --- | --- |
| file | <code>string</code> |

<a name="getUrl"></a>

## getUrl(url) ⇒ <code>string</code>
Get text from url

**Kind**: global function
**Throws**:

- Error if get fails


| Param | Type |
| --- | --- |
| url | <code>string</code> |

<a name="loadJson"></a>

## loadJson(url, json) ⇒ <code>void</code>
Load json from file

**Kind**: global function
**Throws**:

- Error if json cannot be parsed


| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> |  |
| json | <code>object</code> | [in,out] |

<a name="saveJson"></a>

## saveJson(url, json) ⇒ <code>void</code>
Save json to file

**Kind**: global function
**Throws**:

- Error if save file fails


| Param | Type |
| --- | --- |
| url | <code>string</code> |
| json | <code>object</code> |

<a name="flushIOQueue"></a>

## flushIOQueue()
Flush IO queue

**Kind**: global function
**Note**: avoid closing app while some operations still haven't been executed
<a name="fileExists"></a>

## fileExists(file) ⇒ <code>boolean</code>
Check if file exists

**Kind**: global function
**Note**: use file, not url

| Param | Type |
| --- | --- |
| file | <code>string</code> |

<a name="dirExists"></a>

## dirExists(dir) ⇒ <code>boolean</code>
Check if directory exists

**Kind**: global function
**Note**: use file, not url

| Param | Type |
| --- | --- |
| dir | <code>string</code> |

<a name="getSeparator"></a>

## getSeparator() ⇒ <code>string</code>
Get directory separator

**Kind**: global function
**Throws**:

- Error when platform is unknown

<a name="splitPath"></a>

## splitPath(path) ⇒ <code>json</code>
Split file path into composing elements

**Kind**: global function

| Param | Type |
| --- | --- |
| path | <code>string</code> |

<a name="capitalizeFirstLetter"></a>

## capitalizeFirstLetter(string_) ⇒ <code>string</code>
Capitalize first letter

**Kind**: global function

| Param | Type |
| --- | --- |
| string_ | <code>string</code> |

<a name="arrayBufferToHexStr"></a>

## arrayBufferToHexStr(buffer) ⇒ <code>string</code>
Convert array buffer to hex string

**Kind**: global function

| Param | Type |
| --- | --- |
| buffer | <code>ArrayBuffer</code> |

<a name="randomStr"></a>

## randomStr(length) ⇒ <code>string</code>
Create random string

**Kind**: global function

| Param | Type |
| --- | --- |
| length | <code>number</code> |

<a name="uuid"></a>

## uuid() ⇒ <code>string</code>
Create uuid

**Kind**: global function
<a name="debounce"></a>

## debounce(callback, time, cancel) ⇒ <code>void</code>
Debounce

**Kind**: global function

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| callback | <code>function</code> |  |  |
| time | <code>number</code> |  | in milliseconds |
| cancel | <code>bool</code> | <code>false</code> |  |
