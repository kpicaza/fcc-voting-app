'use strict';

function CheckPassword() {

  this.action = function (req, res) {

    if (req.body.password !== req.body.verify) {
      return res.status(400).json({ error: 'Password must be same in both inputs.' })
    }

    res.json({});

  };

}

module.exports = CheckPassword;
