'use strict';

function CheckOption() {

  this.action = function (req, res) {
    
    if (Array.isArray(req.body.options)) {
      req.body.options.pop();
    } else {
      req.body.options = [];
    }

    req.checkBody('option', 'Invalid poll option given.').notEmpty().isLength({
      min: 3,
      max: 20
    });

    req.getValidationResult().then(function(result) {
      if (!result.isEmpty() || -1 < req.body.options.indexOf(req.body.option)) {
        return res.status(400).send(result.mapped());
      }

      res.send({});
    });
  };

}

module.exports = CheckOption;