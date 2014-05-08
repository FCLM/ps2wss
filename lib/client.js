var util = require('util');
var WebSocket = require('ws');
var baseUrl = 'wss://push.planetside2.com/streaming?service-id=s:';

function Client (sid) {
  WebSocket.call(this, baseUrl + sid);
  this.on('message', function (data, flags) {
    var json = JSON.parse(data);
    if (json.payload && json.payload.event_name) {
      this.emit(json.payload.event_name, json.payload);
    }
  });
}

util.inherits(Client, WebSocket);

Client.prototype.subscribe = function (eventName, data) {
  var sub = {
    "service": "event",
    "action": "subscribe",
    "eventNames": util.isArray(eventName) ? eventName : [eventName]
  };
  this.send(JSON.stringify(util._extend(sub, data)));
  return this;
};

module.exports = Client;
