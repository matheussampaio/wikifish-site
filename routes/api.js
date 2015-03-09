var express = require('express');
var router = express.Router();

var Comment = require('../models/comment');
var Fish = require('../models/fish');
var User = require('../models/user');

module.exports = function (app) {

    User.register(app, '/api/user');
    Fish.register(app, '/api/fish');
    Comment.register(app, '/api/comment');

    return router;
};