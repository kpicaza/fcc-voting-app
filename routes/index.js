'use strict';

var path = require('path');
var pug = require('pug');
var container = require('./container');

module.exports = function (app, passport) {

  function isLoggedIn(req, res, next) {
    console.log('isAuth', req.isAuthenticated());
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

  app.get('/login', onlyAnon, container.LoginForm());

  app.post('/login', onlyAnon, passport.authenticate('local', {failureRedirect: '/login'}), container.Login());

  app.get('/register', onlyAnon, container.RegisterForm());

  app.post('/register', onlyAnon, container.CreateAnUser());

  app.get('/logout',
    function (req, res) {
      req.logout();
      res.redirect('/login');
    });

  app.route('/').get(
    isLoggedIn,
    function (req, res) {
      var view = pug.compileFile(path.resolve('resources/views/poll/list.pug'));

      res.send(view());
    });

};
