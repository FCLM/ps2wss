var util = require('util');
var WebSocket = require('ws');
var baseUrl = 'wss://push.planetside2.com/streaming?service-id=s:';

function action (action) {
  return { "service": "event", "action": action };
}

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

Client.prototype.echo = function (payload) {
  var msg = action('echo');
  msg.payload = payload;
  this.send(JSON.stringify(msg));
  return this;
};

Client.prototype.subscribe = function (eventName, data) {
  var sub = action('subscribe');
  sub.eventNames = util.isArray(eventName) ? eventName : [eventName];
  this.send(JSON.stringify(util._extend(sub, data)));
  return this;
};

Client.prototype.unsubscribe = function (opts) {
  var unsub = action('clearSubscribe');
  this.send(JSON.stringify(util._extend(unsub, opts)));
  return this;
};

Client.prototype.clear = function () {
  var msg = action('clearSubscribe');
  msg['all'] = 'true';
  this.send(JSON.stringify(msg));
  return this;
};

module.exports = Client;
