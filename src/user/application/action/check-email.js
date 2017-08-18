'use strict';

function CheckEmail(repository) {

  this.action = function (req, res) {

    req.checkBody('email', 'Invalid email given.').notEmpty().isEmail();

    req.getValidationResult().then(function(result) {
      if(!result.isEmpty()) {
        return res.status(400).json(result.mapped());
      }

      repository.byEmail(req.body.email).then(function () {
        return res.status(400).json({ error: 'Invalid email given.' })
      }).catch(function () {
        res.json({});
      });
    });

  };

}

module.exports = CheckEmail;
