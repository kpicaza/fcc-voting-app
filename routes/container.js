'use strict';

var EventEmitter = require('events');
var Login = require('../src/user/application/action/login-action');
var LoginForm = require('../src/user/application/action/login-form-action');
var RegisterForm = require('../src/user/application/action/register-form-action');
var CheckUsername = require('../src/user/application/action/check-username');
var CheckEmail = require('../src/user/application/action/check-email');
var CheckPassword = require('../src/user/application/action/check-password');
var CreateAnUser = require('../src/user/application/action/create-user-action');
var RegisterValidator = require('../src/user/application/middleware/register-validator');
var UserRepository = require('../src/user/domain/model/repository');
var mongoUserStore = require('../src/user/infrastructure/mongo-user-store');

var container = {

  EventEmitter: function () {
    var emitter = new EventEmitter();

    return emitter;
  },

  Login: function () {
    var login = new Login();

    return login.action;
  },

  LoginForm: function () {
    var loginForm = new LoginForm();

    return loginForm.action;
  },

  RegisterValidator: function () {
    var registerValidator = new RegisterValidator();

    return registerValidator.check;
  },

  RegisterForm: function () {
    var registerForm = new RegisterForm();

    return registerForm.action;
  },

  UserRepository: function () {
    return new UserRepository(mongoUserStore, this.EventEmitter());
  },

  CheckUsername: function () {
    var checkUsername = new CheckUsername(
      this.UserRepository()
    );

    return checkUsername.action;
  },

  CheckEmail: function () {
    var checkEmail = new CheckEmail(
      this.UserRepository()
    );

    return checkEmail.action;
  },

  CheckPassword: function () {
    var checkPassword = new CheckPassword();

    return checkPassword.action;
  },

  CreateAnUser: function () {
    var createAnUser = new CreateAnUser(
      this.UserRepository()
    );

    return createAnUser.action;
  }

};

module.exports = container;
