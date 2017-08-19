'use strict';

function PollDetail(repository) {

  this.action = function (req, res) {

    repository.byId(req.params.id).then(function (poll) {

      poll.options().map(function (option) {
        console.log(option.name());
      });

      res.render('poll/detail', {
        poll: poll
      });

    });

  };

}

module.exports = PollDetail;
