'use strict';

var mongo = require('mongodb').MongoClient;
var Promise = require('rsvp').Promise;

module.exports = function (data, method, limit, offset) {
  return new Promise(function (resolve, reject) {
    mongo.connect(process.env.MONGO, function (err, db) {
      if (err) {
        reject(err);
      }

      var store = new Store(db);

      // Returns Promise.
      var callable = store[method];

      callable(data, limit, offset).then(function (data) {
        resolve(data);
      });
    });
  });
};

function Store(db) {

  var vm = this;
  var collection;

  var construct = function (db) {
    collection = db.collection('polls');
  };

  var serializePoll = function (poll) {
    console.log('options', poll.options());

    var options = poll.options().map(function (option) {
      return {
        name: option.name(),
        votesNumber: option.votes()
      };
    });
    console.log(poll, options);

    return {
      pollId: poll.id(),
      userId: poll.userId(),
      name: poll.name(),
      options: options,
      voters: poll.voters()
    }
  };

  construct(db);

  this.find = function (criteria, limit, offset) {
    limit = limit || 10;
    offset = offset || 0;

    return new Promise(function (resolve, reject) {
      collection
        .find(criteria)
        .skip(offset)
        .limit(limit)
        .toArray(function (err, documents) {
          if (err) {
            reject(err);
          }

          resolve(documents);

          db.close();
        });
    });
  };

  this.insert = function (poll, a, b) {
    return new Promise(function (resolve, reject) {

      console.log('toInsert', poll);
      var aPoll = serializePoll(poll);

      collection.insert(aPoll, function (err, data) {
        if (err) {
          reject(err);
        }

        resolve(vm.find({pollId: poll.id()}, 1, 0));
      });
    });
  };

}
