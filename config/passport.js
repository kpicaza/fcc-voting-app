'use strict';

var LocalStrategy = require('passport-local').Strategy;
var userRepository = require('./container').UserRepository();
var emitter = require('./container').EventEmitter();

module.exports = function (passport) {

  var emitLoginFailedEvent = function () {
    emitter.emit('LoginWasFailed', {
      name: 'LoginWasFailed',
      data: 'Invalid username or password.',
      occurredOn: new Date()
    });
  };

  var emitUserLoggedInEvent = function (user) {
    emitter.emit('UserLoggedIn', {
      name: 'UserLoggedIn',
      data: {
        id: user.id(),
        username: user.username(),
        email: user.email()
      },
      occurredOn: new Date()
    });
  };

  passport.serializeUser(function (user, done) {
    done(null, user.username());
  });

  passport.deserializeUser(function (username, done) {
    userRepository.byUsername(username).then(function (user) {
      done(null, user);
    });
  });

  passport.use(new LocalStrategy(
    function (username, password, done) {

      userRepository.byUsername(username)
        .then(function (user) {

          return user.verifyPassword(password).then(function (res) {
            if (!res) {
              emitLoginFailedEvent();
              return done(null, false);
            }

            emitUserLoggedInEvent(user);
            done(null, user);
          });
        })
        .catch(function (e) {
          emitLoginFailedEvent();
          done(null, false);
        });
    }
  ));

};
