'use strict';

var express = require('express');
var routes = require('./routes/index.js');
var passport = require('passport');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var session = require('express-session');
var flash = require('express-flash');
var path = require('path');

var app = express();
require('dotenv').load();
require('./config/passport')(passport);

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, "public")));
app.use('/jquery', express.static(path.join(__dirname, "node_modules/jquery/dist")));
app.use('/bootstrap', express.static(path.join(__dirname, "node_modules/bootstrap/dist")));
app.use('/tether', express.static(path.join(__dirname, "node_modules/tether/dist")));
app.use('/chartjs', express.static(path.join(__dirname, "node_modules/chart.js/dist")));
app.use('/font-awesome/css', express.static(path.join(__dirname, "node_modules/font-awesome/css")));
app.use('/font-awesome/fonts', express.static(path.join(__dirname, "node_modules/font-awesome/fonts")));
app.use('/js/user', express.static(path.join(__dirname, "src/user/infrastructure/client")));
app.use('/js/poll', express.static(path.join(__dirname, "src/poll/infrastructure/client")));
app.use('/js/common', express.static(path.join(__dirname, "src/util")));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator({}));
app.use(require('cookie-parser')());
app.use(session({
	secret: 'secretClementine',
  saveUninitialized: true,
	resave: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){
  res.locals.user = req.user;
  next();
});

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
