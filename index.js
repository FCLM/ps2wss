module.exports = require('./lib/client');

module.exports.connect = function (sid, onOpen) {
  var client = new module.exports(sid);
  if (typeof onOpen === 'function') {
    client.on('open', onOpen);
  }
  return client;
};
