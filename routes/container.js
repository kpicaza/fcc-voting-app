'use strict';

var Login = require('../src/user/application/action/login-action');
var LoginForm = require('../src/user/application/action/login-form-action');
var RegisterForm = require('../src/user/application/action/register-form-action');
var CreateAnUser = require('../src/user/application/action/create-user-action');
var UserRepository = require('../src/user/domain/model/repository');
var mongoUserStore = require('../src/user/infrastructure/mongo-user-store');

var container = {

  Login: function () {
    var login = new Login();

    return login.action;
  },

  LoginForm: function () {
    var loginForm = new LoginForm();

    return loginForm.action;
  },

  RegisterForm: function () {
    var registerForm = new RegisterForm();

    return registerForm.action;
  },

  UserRepository: function () {
    return new UserRepository(mongoUserStore);
  },

  CreateAnUser: function () {
    var createAnUser = new CreateAnUser(
      this.UserRepository()
    );

    return createAnUser.action;
  }

};

module.exports = container;
