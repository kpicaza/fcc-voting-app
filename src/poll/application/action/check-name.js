'use strict';

function CheckName() {

  this.action = function (req, res) {

    req.checkBody('name', 'Invalid poll name given.').notEmpty().isLength({
      min: 3,
      max: 20
    });

    req.getValidationResult().then(function(result) {
      if (!result.isEmpty()) {
        return res.status(400).send(result.mapped());
      }

      res.send({});
    });
  };

}

module.exports = CheckName;