'use strict';

var express = require('express');
var routes = require('./routes/index.js');
var passport = require('passport');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');

var app = express();
require('dotenv').load();
require('./config/passport')(passport);

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('cookie-parser')());
app.use(session({
	secret: 'secretClementine',
  saveUninitialized: true,
	resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
