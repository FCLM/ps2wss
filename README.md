# ps2wss

A super simple extension of [WebSocket](https://github.com/einaros/ws) built to abstract away some of the complexity in working with [SOE's Planetside 2 Web Socket Service](http://census.soe.com/#ps2-websocket1).

**Please note that this is a work-in-progress and should not be used for anything but experimentation!**

## Usage

### Installing

`npm install ps2wss`

### Example

```js
var stream = require('ps2wss').connect('example', function () {
  stream.subscribe(['PlayerLogin', 'PlayerLogout'], {"worlds": ["1"]});
  stream.on('PlayerLogin', function (payload) {});
  stream.on('PlayerLogout', function (payload) {});
});
```
