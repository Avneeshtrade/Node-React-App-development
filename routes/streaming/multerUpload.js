const multer =  require('multer');

const storage = multer.memoryStorage();

const uploadFile =(name) => multer({ storage }).single(name);

module.exports = {uploadFile};