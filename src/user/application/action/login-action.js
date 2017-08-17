'use strict';

function Login() {

  this.action = function (req, res) {
    res.redirect('/');
  };

}

module.exports = Login;
