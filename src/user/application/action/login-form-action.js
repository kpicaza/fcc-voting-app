'use strict';

var path = require('path');
var pug = require('pug');

function LoginForm() {

  this.action = function (req, res) {
    var view = pug.compileFile(path.resolve('views/user/login.pug'));
    var error = { error: req.flash('error'), success: req.flash('success') };

    res.send(view(error));
  };

}

module.exports = LoginForm;
