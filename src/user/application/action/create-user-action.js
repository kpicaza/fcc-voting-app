'use strict';

function CreateUser(repository) {

  this.action = function (req, res) {

    repository.add(req.body).then(function (data) {
      req.flash('success', 'Account successfully created. Log in with your username and password.');
      res.redirect('/login');
    });

  };

}

module.exports = CreateUser;
