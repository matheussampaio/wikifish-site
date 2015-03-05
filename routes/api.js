var express = require('express');
var router = express.Router();

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


module.exports = router;