const multer = require('multer');

const { generateByteSize } = require('../utils');

const uploadHandler = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: generateByteSize(10),
  },
}).single('image');

module.exports = uploadHandler;
