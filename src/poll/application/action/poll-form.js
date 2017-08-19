'use strict';

function PollForm() {

  this.action = function (req, res) {

    res.render('poll/add-form', {
      params: req.body
    });

  };

}

module.exports = PollForm;
