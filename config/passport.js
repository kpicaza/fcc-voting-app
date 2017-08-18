'use strict';

var LocalStrategy = require('passport-local').Strategy;
var userRepository = require('../routes/container').UserRepository();

module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		done(null, user.id());
	});

	passport.deserializeUser(function (id, done) {
    userRepository.byId(id).then(function (user) {
			done(null, user);
    });
	});

  passport.use(new LocalStrategy(
    function(username, password, done) {

      userRepository.byUsername(username).then(function (user) {

        return user.verifyPassword(password).then(function (res) {
          if (!res) {
            return done(null, false);
          }
          done(null, user);
        });
      }).catch(function(e) {
        done(null, false);
			});
    }
  ));

};
