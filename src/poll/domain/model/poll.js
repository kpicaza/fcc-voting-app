'use strict';

var uuid5 = require('uuid5');

function Poll(id, userId, name, options, voters, date) {

  options = options || [];
  voters = voters || [];
  date = date ? new Date(date) : new Date();

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

  this.addOption = function(option) {
    options.push(option);
  };

  this.options = function () {
    return options;
  };

  this.votesNumber = function () {
    return options.reduce(function (a, b) {

      if ('function' !== typeof a.votes) {
        return a + b.votes();
      }

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
  };

  this.createdAt = function () {
    return date.toISOString();
  }

}

module.exports = Poll;
