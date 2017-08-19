'use strict';

function CreatePoll(repository) {

  this.action = function (req, res) {

    req.body.options.pop();
    req.body.options = req.body.options.map(function (option) {
      return {
        name: option,
        votesNumber: 0
      }
    });

    repository.add(req.user.id(), req.body).then(function (poll) {
      res.status(201).send({});
    }).catch(function (e) {
      console.error(e);
      res.status(400).send({});
    });

  };

}

module.exports = CreatePoll;
