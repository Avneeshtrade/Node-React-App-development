var express = require('express');
const getMediaFile = require('./getMediaFile');
const { uploadFile } = require('./multerUpload');
const uploadMedia = require('./uploadMedia');
const getVedioStream = require('./vedio');
var router = express.Router();
// const vedioStream = require('./vedio');
/* GET users listing. */
router.get('/vedio/:id', getVedioStream);
router.get('/mediafile',getMediaFile);
router.post('/mediafile',uploadFile('file'),uploadMedia);
module.exports = router;