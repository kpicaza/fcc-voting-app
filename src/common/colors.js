'use strict';

var ColorScheme = require('color-scheme');

function colors(length) {
  var scheme = new ColorScheme();

  return scheme.from_hue(210)
    .scheme('contrast')
    .variation('hard')
    .colors()
    .slice(0, length)
    .map(function (color) {
      return '#' + color;
    });
}

module.exports = colors;
