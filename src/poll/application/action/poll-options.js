'use strict';

function PollOptions(repository, colors) {

  this.action = function (req, res) {

    repository.byId(req.params.id).then(function (poll) {
      var options = poll.options();

      res.status(200).json({
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

module.exports = PollOptions;
