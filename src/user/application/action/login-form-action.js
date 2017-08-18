'use strict';

var path = require('path');
var pug = require('pug');

function LoginForm() {

  this.action = function (req, res) {
    var view = pug.compileFile(path.resolve('views/user/login.pug'));
    var data = {
      error: req.flash('error'),
      success: req.flash('success')
    };

    res.send(view(data));
  };

}

module.exports = LoginForm;
