'use strict';

function CreateUser(repository) {

  this.action = function (req, res) {

    repository.add(req.body).then(function (data) {
      res.redirect('/login');
    });

  };

}

module.exports = CreateUser;
