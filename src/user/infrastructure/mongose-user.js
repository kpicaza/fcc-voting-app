'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../domain/model/user');


var MongoseUser = new Schema(User.schema);

module.exports = mongoose.model('Users', MongoseUser);
