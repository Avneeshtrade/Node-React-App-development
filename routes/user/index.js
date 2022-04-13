var express = require('express');
const { getUsers } = require('./get');
var router = express.Router();

/* GET users listing. */
router.use('/', getUsers);

module.exports = router;