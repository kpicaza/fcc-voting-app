'use strict';

var path = require('path');
var pug = require('pug');
var container = require('./container');

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

  app.route('/login')
    .get(onlyAnon, container.LoginForm())
    .post(onlyAnon, passport.authenticate('local', {
      failureRedirect: '/login'
    }), container.Login());

  app.route('/register')
    .get(onlyAnon, container.RegisterForm())
    .post(onlyAnon, container.RegisterValidator(), container.CreateAnUser());

  app.route('/logout')
    .get(function (req, res) {
      req.logout();
      res.redirect('/login');
    });

  app.route('/').get(
    isLoggedIn,
    function (req, res) {
      var view = pug.compileFile(path.resolve('views/poll/list.pug'));

      res.send(view());
    });

  app.route('/api/users/usernames')
    .post(container.CheckUsername());

  app.route('/api/users/emails')
    .post(container.CheckEmail());

  app.route('/api/users/passwords')
    .post(container.CheckPassword());

};
