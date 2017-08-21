'use strict';

var Promise = require('rsvp').Promise;
var PollWasCreated = require('../event/poll-was-created');
var Poll = require('./poll');
var Option = require('./option');

function Repository(store, emitter) {

  const LIMIT = 20;
  var vm = this;

  var optionFactory = function (option) {
    return new Option(option.name, option.votesNumber);
  };

  var factory = function (userId, data) {
    var id = data.id || data.pollId;

    var options = data.options.map(function (option) {
      return optionFactory(option);
    });

    return new Poll(id, userId, data.name, options, data.voters, data.createdAt);
  };

  var getOffset = function (page) {
    page = page || 1;

    return (page - 1) * LIMIT;
  };

  var mapPolls = function (polls, resolve) {
    resolve(polls.map(function (poll) {
      return factory(poll.userId, poll);
    }));
  };

  this.paged = function (page) {
    var offset = getOffset(page);

    return new Promise(function (resolve, reject) {
      store({}, 'find', LIMIT, offset).then(function (polls) {
        mapPolls(polls, resolve);
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

  this.byUserId = function (userId, page) {
    var offset = getOffset(page);

    return new Promise(function (resolve, reject) {
      store({
        userId: userId
      }, 'find', LIMIT, offset).then(function (polls) {
        mapPolls(polls, resolve);
      }).catch(function (e) {
        reject(e);
      });

    });
  };

  this.add = function (userId, poll) {

    return store(factory(userId, poll), 'insert').then(function (aPoll) {
      emitter.emit('PollWasCreated', {
        name: 'PollWasCreated',
        data: new PollWasCreated(aPoll),
        occurredOn: new Date()
      });
    });
  };

  this.vote = function (id, index, userId, ip) {

    return vm.byId(id).then(function (aPoll) {

      aPoll.vote(index, userId, ip);

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

  this.addOption = function (id, optionName, userId) {

    return vm.byId(id).then(function (aPoll) {

      aPoll.addOption(optionFactory({
        name: optionName,
        votesNumber: 0
      }));

      return store(aPoll, 'update').then(function () {

        emitter.emit('PollOptionWasAdded', {
          name: 'PollOptionWasAdded',
          data: new PollWasCreated(aPoll),
          occurredOn: new Date()
        });

        return aPoll;
      });

    });
  };

  this.delete = function (id) {

    return store(id, 'delete').then(function () {
      emitter.emit('PollWasDeleted', {
        name: 'PollWasDeleted',
        data: {pollId: id},
        occurredOn: new Date()
      });
    });

  };

}

module.exports = Repository;
