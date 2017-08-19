'use strict';

function MyPollList(repository) {

  this.action = function (req, res) {

    repository.byUserId(req.user.id() || null).then(function (polls) {
      res.render('poll/my-list', {
        polls: polls
      });
    });

  };

}

module.exports = MyPollList;
