'use strict';

var UserWasAdded = function (user) {

  this.userId = user.userId;

  this.username = user.username;

  this.email = user.email;

};

module.exports = UserWasAdded;
