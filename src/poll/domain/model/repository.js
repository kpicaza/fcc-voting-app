'use strict';

var Promise = require('rsvp').Promise;
var PollWasCreated = require('../event/poll-was-created');
var Poll = require('./poll');
var Option = require('./option');

function Repository(store, emitter) {

  const LIMIT = 20;

  var factory = function (userId, data) {
    var options = data.options.map(function (option) {
      return new Option(option, 0);
    });

    return new Poll(data.id, userId, data.name, options, data.voters);
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

}

module.exports = Repository;
