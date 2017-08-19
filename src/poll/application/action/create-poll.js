'use strict';

function CreatePoll(repository) {

  this.action = function (req, res) {

    console.log(req.body);

    repository.add(req.user.id(), req.body).then(function (poll) {
      console.log(poll);
      res.status(200).send({});
    }).catch(function (e) {
      console.log(e);
      res.status(400).send({});
    });

  };

}

module.exports = CreatePoll;
