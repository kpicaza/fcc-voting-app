'use strict';

function Option(name, numberVotes) {

  this.name = function () {
    return name;
  };

  this.votes = function () {
    return numberVotes;
  };

  this.addVote = function () {
    numberVotes++;
  };

}

module.exports = Option;
