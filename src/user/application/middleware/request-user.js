'use strict';

var md5 = require('blueimp-md5');

function requestUser(req, res, next) {
  if (!req.user) {
    return next();
  }

  req.user.hashedEmail = md5(req.user.email());
  res.locals.user = req.user;

  return next();
}

module.exports = requestUser;
