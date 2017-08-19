'use strict';

var mongo = require('mongodb').MongoClient;
var Promise = require('rsvp').Promise;

module.exports = function (data, method) {
  return new Promise(function (resolve, reject) {
    mongo.connect(process.env.MONGO, function (err, db) {
      if (err) {
        reject(err);
      }

      var store = new Store(db);

      // Returns Promise.
      var callable = store[method];

      callable(data).then(function (data) {
        resolve(data);
      });
    });
  });
};

function Store(db) {

  var vm = this;
  var collection;

  var construct = function (db) {
    collection = db.collection('users');
  };

  var find = function (criteria, limit) {
    return new Promise(function (resolve, reject) {
      collection
        .find(criteria)
        .toArray(function (err, documents) {
          if (err) {
            reject(err);
          }

          resolve(documents);

          db.close();
        });
    });
  };

  construct(db);

  this.findById = function(id) {
    return find({
      userId: id
    });
  };

  this.findByEmail = function(email) {
    return find({
      email: email
    });
  };

  this.findByUsername = function(username) {
    return find({
      username: username
    });
  };

  this.insert = function (user) {
    return new Promise(function (resolve, reject) {
      collection.insert({
        userId: user.id(),
        username: user.username(),
        email: user.email(),
        password: user.password()
      }, function (err, data) {
        if (err) {
          reject(err);
        }

        resolve(vm.findById(user.id()));
      });
    });
  };

  return this;
}
