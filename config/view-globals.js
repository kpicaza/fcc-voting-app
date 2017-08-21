'use strict';

function viewGlobals(req, res, next) {

  res.locals.siteUrl = process.env.APP_URL;

  next();
}

module.exports = viewGlobals;
