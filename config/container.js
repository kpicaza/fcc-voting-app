'use strict';

var EventEmitter = require('events');
var colors = require('../src/common/colors');
var Login = require('../src/user/application/action/login-action');
var LoginForm = require('../src/user/application/action/login-form-action');
var RegisterForm = require('../src/user/application/action/register-form-action');
var CheckUsername = require('../src/user/application/action/check-username');
var CheckEmail = require('../src/user/application/action/check-email');
var CheckPassword = require('../src/user/application/action/check-password');
var CreateAnUser = require('../src/user/application/action/create-user-action');
var PollForm = require('../src/poll/application/action/poll-form');
var PollDetail = require('../src/poll/application/action/poll-detail');
var PollList = require('../src/poll/application/action/poll-list');
var PollOptions = require('../src/poll/application/action/poll-options');
var MyPollList = require('../src/poll/application/action/my-poll-list');
var CheckPollName = require('../src/poll/application/action/check-name');
var CheckPollOption = require('../src/poll/application/action/check-option');
var CreatePoll = require('../src/poll/application/action/create-poll');
var VotePoll = require('../src/poll/application/action/vote-poll');
var RegisterValidator = require('../src/user/application/middleware/register-validator');
var UserRepository = require('../src/user/domain/model/repository');
var PollRepository = require('../src/poll/domain/model/repository');
var mongoUserStore = require('../src/user/infrastructure/db/mongo-user-store');
var mongoPollStore = require('../src/poll/infrastructure/db/mongo-poll-store');

var container = {

  EventEmitter: function () {
    var emitter = new EventEmitter();

    return emitter;
  },

  // User Dependencies.

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
  },

  // Poll Dependencies.

  PollRepository: function () {
    return new PollRepository(mongoPollStore, this.EventEmitter());
  },

  PollList: function () {
    var pollList = new PollList(this.PollRepository());

    return pollList.action;
  },

  PollOptions: function () {
    var pollOptions = new PollOptions(this.PollRepository(), colors);

    return pollOptions.action;
  },

  MyPollList: function () {
    var myPollList = new MyPollList(this.PollRepository());

    return myPollList.action;
  },

  PollDetail: function () {
    var pollDetail = new PollDetail(this.PollRepository());

    return pollDetail.action;
  },

  PollForm: function () {
    var pollForm = new PollForm();

    return pollForm.action;
  },

  CheckPollName: function () {
    var checkPollName = new CheckPollName();

    return checkPollName.action;
  },

  CheckPollOption: function () {
    var checkPollOption = new CheckPollOption();

    return checkPollOption.action;
  },

  CreatePoll: function () {
    var createPoll= new CreatePoll(this.PollRepository());

    return createPoll.action;
  },

  VotePoll: function () {
    var votePoll = new VotePoll(this.PollRepository(), colors);

    return votePoll.action;
  }

};

module.exports = container;
