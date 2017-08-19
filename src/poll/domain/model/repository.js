'use strict';

var Promise = require('rsvp').Promise;
var PollWasCreated = require('../event/poll-was-created');
var Poll = require('./poll');
var Option = require('./option');

function Repository(store, emitter) {

  const LIMIT = 20;
  var vm = this;

  var factory = function (userId, data) {
    var id = data.id || data.pollId;

    var options = data.options.map(function (option) {
      return new Option(option.name, option.votesNumber);
    });

    return new Poll(id, userId, data.name, options, data.voters);
  };

  this.paged = function (page) {
    page = page || 1;

    var offset = (page - 1) * LIMIT;

    return new Promise(function (resolve, reject) {
      store({}, 'find', LIMIT, offset).then(function (polls) {
        resolve(polls.map(function (poll) {
          return factory(poll.userId, poll);
        }));
      }).catch(function (e) {
        reject(e);
      });

    });
  };

  this.byId = function (id) {

    return new Promise(function (resolve, reject) {
      store({pollId: id}, 'find', 1, 0).then(function (polls) {
        resolve(factory(polls[0].userId, polls[0]));
      }).catch(function (e) {
        reject(e);
      });

    });
  };

  this.add = function (userId, poll) {

    return store(factory(userId, poll), 'insert').then(function (aPoll) {
      console.log(userId, aPoll, poll);
      emitter.emit('PollWasCreated', {
        name: 'PollWasCreated',
        data: new PollWasCreated(aPoll),
        occurredOn: new Date()
      });
    });
  };

  this.vote = function (id, index, userId) {

    console.log(id);

    return vm.byId(id).then(function (aPoll) {

      aPoll.vote(index, userId);

      return store(aPoll, 'update').then(function () {

        emitter.emit('PollWasVoted', {
          name: 'PollWasVoted',
          data: new PollWasCreated(aPoll),
          occurredOn: new Date()
        });

        return aPoll;
      });

    });
  };

}

module.exports = Repository;
