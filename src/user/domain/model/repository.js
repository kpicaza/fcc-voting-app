'use strict';

var Promise = require('rsvp').Promise;
var bcrypt = require('bcrypt');
var User = require('./user');
var saltRounds = 10;

function Repository(store) {

  var factory = function (data) {
    return new User(data.id, data.username, data.email, data.password);
  };

  var makeFromResult = function (data) {
    data[0].id = data[0]._id;

    return factory(data[0]);
  };

  this.add = function (data) {

    return bcrypt.hash(data.password, saltRounds).then(function(hash) {
      data.password = hash;
      return store(factory(data), 'insert');
    });

  };

  this.byId = function (id) {
    return new Promise(function (resolve, reject) {
      store(id, 'findById').then(function (data) {
        resolve(makeFromResult(data));
      });
    });
  };

  this.byUsername = function (username) {
    return new Promise(function (resolve, reject) {
      store(username, 'findByUsername').then(function (data) {
        resolve(makeFromResult(data));
      });
    });
  };

}

module.exports = Repository;
