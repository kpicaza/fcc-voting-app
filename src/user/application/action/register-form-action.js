'use strict';

function RegisterForm() {
  this.action = function (req, res) {

    req.getValidationResult().then(function(result) {
      if (true === result.isEmpty()) {
        res.render('user/register', {});
        return;
      }

      res.render('user/register', {
        errors: result.mapped()
      });
    });

  }
}

module.exports = RegisterForm;
