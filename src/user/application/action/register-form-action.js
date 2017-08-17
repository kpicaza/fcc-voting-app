'use strict';

var path = require('path');
var pug = require('pug');

function RegisterForm() {
  this.action = function (req, res) {

    var view = pug.compileFile(path.resolve('resources/views/user/register.pug'));

    res.send(view());
  }
}

module.exports = RegisterForm;
