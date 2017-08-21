'use strict';

var ipParser = require('../../../common/ip-parser');

function CanVote(repository) {

  this.action = function (req, res) {

    var userId = req.user ? req.user.id() : null;
    var ip = ipParser(req.headers['x-forwarded-for']);
    var canVote = true;

    repository.byId(req.params.id).then(function (poll) {
      poll.assertCanVote(userId, ip, function () {
        canVote = false
      });

      if (canVote) {
        res.json({ canVote: canVote });
      }

      return res.redirect('/api/polls/' + req.params.id + '/options' );
    });

  };

}

module.exports = CanVote;
