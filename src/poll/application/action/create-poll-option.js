'use strict';

function CreatePollOption(repository) {

  this.action = function (req, res) {

    repository.addOption(req.params.id, req.body.option, req.user.id()).then(function (poll) {
      res.status(202).send({});
    }).catch(function (e) {
      console.error(e);
      res.status(400).send({});
    });

  };

}

module.exports = CreatePollOption;
