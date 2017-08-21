'use strict';

function DeletePoll(repository) {

  this.action = function (req, res) {

    repository.delete(req.params.id).then(function () {
      res.status(204).send({});
    }).catch(function (e) {
      console.error(e);
      res.status(400).send({});
    });

  };

}

module.exports = DeletePoll;
