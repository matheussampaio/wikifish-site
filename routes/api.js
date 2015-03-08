var express = require('express');
var router = express.Router();

var Comment = require('../models/comment');

module.exports = function (app) {

    /*
     User Routers
     */
    var userRouter = require('./user');
    router.use('/user', userRouter);

    /*
     Fish Routers
     */
    var fishRouter = require('./fish');
    router.use('/fish', fishRouter);

    Comment.register(app, '/api/comment');

    return router;
};