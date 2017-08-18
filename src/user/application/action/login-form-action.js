'use strict';

var path = require('path');
var pug = require('pug');

function LoginForm() {

  this.action = function (req, res) {
    var view = pug.compileFile(path.resolve('views/user/login.pug'));

    res.send(view());
  };

}

module.exports = LoginForm;
