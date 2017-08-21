
var firstMatch = require('./first-match');

module.exports = function (forwardedFor) {
  var regex = /([0-9]+\.)([0-9]+\.)([0-9]+\.)([0-9]+)/g;

  return firstMatch(forwardedFor, regex);
};
