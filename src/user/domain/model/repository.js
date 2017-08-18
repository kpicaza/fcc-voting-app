'use strict';

var Promise = require('rsvp').Promise;
var bcrypt = require('bcrypt');
var User = require('./user');
var UserWasAdded = require('../event/user-was-added');
var saltRounds = 10;

function Repository(store, emitter) {

  var factory = function (data) {
    return new User(data.id, data.username, data.email, data.password);
  };

  var makeFromResult = function (data) {
    return factory(data[0]);
  };

  this.add = function (data) {

    return bcrypt.hash(data.password, saltRounds).then(function(hash) {
      data.password = hash;
      return store(factory(data), 'insert').then(function (user) {
        emitter.emit('UserWasAdded', {
          name: 'UserWasAdded',
          data: new UserWasAdded(user),
          occurredOn: new Date()
        });
      });
    });

  };

  this.byId = function (id) {
    return new Promise(function (resolve, reject) {
      store(id, 'findById').then(function (data) {
        resolve(makeFromResult(data));
      }).catch(function (e) {
        reject(e);
      });
    });
  };

  this.byEmail = function (email) {
    return new Promise(function (resolve, reject) {
      store(email, 'findByEmail').then(function (data) {
        resolve(makeFromResult(data));
      }).catch(function (e) {
        reject(e);
      });
    });
  };

  this.byUsername = function (username) {
    return new Promise(function (resolve, reject) {
      store(username, 'findByUsername').then(function (data) {
        resolve(makeFromResult(data));
      }).catch(function (e) {
        reject(e);
      });
    });
  };

}

module.exports = Repository;
