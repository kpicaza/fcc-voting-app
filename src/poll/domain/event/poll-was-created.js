'use strict';

var PollWasCreated = function (poll) {

  this.pollId = poll.pollId;
  this.userId = poll.userId;
  this.name = poll.name;
  this.options = poll.options;

};

module.exports = PollWasCreated;
