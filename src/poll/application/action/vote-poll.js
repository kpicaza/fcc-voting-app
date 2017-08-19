'use strict';

function VotePoll(repository) {

  this.action = function (req, res) {

    repository.vote(req.params.id, req.body.option, req.user.id()).then(function (poll) {
      res.status(202).send();
    }).catch(function (e) {
      console.error(e);
      res.status(400).json({error: e.message});
    });

  };

}

module.exports = VotePoll;
