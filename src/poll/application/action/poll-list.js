'use strict';

function PollList(repository) {

  this.action = function (req, res) {

    repository.paged().then(function (polls) {
      res.render('poll/list', {
        polls: polls
      });
    });

  };

}

module.exports = PollList;
