'use strict';

var container = require('../config/container');

module.exports = function (app, passport) {

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/login');
    }
  }

  function onlyAnon(req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect('/');
    } else {
      return next();
    }
  }

  // user routes

  app.route('/login')
    .get(onlyAnon, container.LoginForm())
    .post(onlyAnon, passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: 'Invalid username or password.'
    }), container.Login());

  app.route('/register')
    .get(onlyAnon, container.RegisterForm())
    .post(onlyAnon, container.RegisterValidator(), container.CreateAnUser());

  app.route('/logout')
    .get(function (req, res) {
      req.logout();
      res.redirect('/login');
    });

  // poll routes

  app.route('/').get(container.PollList());

  app.route('/polls/me').get(isLoggedIn, container.MyPollList());

  app.route('/polls/new').get(isLoggedIn, container.PollForm());

  app.route('/polls/:id').get(container.PollDetail());

  // api routes

  app.route('/api/users/usernames')
    .post(container.CheckUsername());

  app.route('/api/users/emails')
    .post(container.CheckEmail());

  app.route('/api/users/passwords')
    .post(container.CheckPassword());

  app.route('/api/polls/names')
    .post(isLoggedIn, container.CheckPollName());

  app.route('/api/polls/options')
    .post(isLoggedIn, container.CheckPollOption());

  app.route('/api/polls')
    .post(isLoggedIn, container.CreatePoll());

  app.route('/api/polls/:id')
    .delete(container.DeletePoll());

  app.route('/api/polls/:id/voters')
    .get(container.CanVote());

  app.route('/api/polls/:id/options')
    .get(container.PollOptions())
    .post(container.VotePoll())
    .put(container.CreatePollOption());

};
