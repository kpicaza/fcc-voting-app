'use strict';

var uuid5 = require('uuid5');
var bcrypt = require('bcrypt');

var User = function (id, username, email, password) {

  var constructor = function (userId, name, mail, pass) {
    console.log(userId, name, mail, pass);
    id = !userId ? uuid5('') : userId;
    assertValidUsername(name);
    assertValidEmail(mail);
  };

  var assertValidUsername = function (username) {

  };

  var assertValidEmail = function (email) {

  };

  constructor(id, username, email, password);

  this.verifyPassword = function(pass) {
    return bcrypt.compare(pass, password).then(function (res) {
      return res;
    });
  };

  this.id = function () {
    return id;
  };

  this.username = function() {
    return username;
  };

  this.email = function() {
    return email;
  };

  this.password = function() {
    return password;
  };

};

module.exports = User;