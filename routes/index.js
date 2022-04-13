var express = require('express');
var router = express.Router();
//var indexRouter = require('./routes/index');
var usersRouter = require('./user');
var streamRouter = require('./streaming');

/* GET home page. */
router.use('/user',usersRouter);
router.use('/stream',streamRouter);

module.exports = router;
