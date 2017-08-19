'use strict';

function VotePoll(repository, colors) {

  this.action = function (req, res) {

    repository.vote(req.params.id, req.body.option, req.user.id()).then(function (poll) {
      var options = poll.options();

      res.status(202).json({
        colors: colors(options.length),
        options: options.map(function (option) {
          return {
            name: option.name(),
            votes: option.votes()
          }
        })
      });
    }).catch(function (e) {
      console.error(e);
      res.status(400).json({error: e.message});
    });

  };

}

module.exports = VotePoll;
