'use strict';

var path = require('path');
var pug = require('pug');

function RegisterForm() {
  this.action = function (req, res) {

    var view = pug.compileFile(path.resolve('views/user/register.pug'));

    req.getValidationResult().then(function(result) {
      if (true === result.isEmpty()) {
        res.send(view());
        return;
      }

      var foo = result.mapped();

      console.log(foo);

      res.send(view({
        errors: foo
      }));
    });

  }
}

module.exports = RegisterForm;
