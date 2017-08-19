'use strict';

function LoginForm() {

  this.action = function (req, res) {
    var data = {
      error: req.flash('error'),
      success: req.flash('success')
    };

    res.render('user/login', data);
  };

}

module.exports = LoginForm;
