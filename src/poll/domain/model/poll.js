'use strict';

var uuid5 = require('uuid5');

function Poll(id, userId, name, options, voters) {

  options = options || [];
  voters = voters || [];

  var constructor = function (pollId) {
    id = !pollId ? uuid5(Date.now().toString()) : pollId;
  };

  var addVoter = function(userId) {
    voters.push(userId);
  };

  constructor(id);

  this.id = function () {
    return id;
  };

  this.userId = function () {
    return userId;
  };

  this.name = function () {
    return name;
  };

  this.options = function () {
    return options;
  };

  this.votesNumber = function () {
    return options.reduce(function (a, b) {
      return a.votes() + b.votes();
    });
  };

  this.voters = function () {
    return voters;
  };

  this.vote = function (i, userId) {
    if (userId) {
      addVoter(userId);
    }

    options[i].addVote();
    console.log(options[i]);
  };

}

module.exports = Poll;
