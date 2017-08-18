'use strict';

function CheckUsername(repository) {

  this.action = function (req, res) {

    repository.byUsername(req.body.username).then(function () {
      return res.status(400).json({ error: 'Invalid username given.' })
    }).catch(function () {
      res.json({});
    });

  };

}

module.exports = CheckUsername;
