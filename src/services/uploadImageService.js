const { Storage } = require('@google-cloud/storage');
const path = require('path');
const util = require('util');

const { sanitizeString } = require('../utils');

const storage = new Storage();
const bucket = storage.bucket(process.env.BUCKET_NAME);

const uploadImage = async (folderName, file) => {
  console.log('uploading');

  const timestamp = Date.now();
  const { originalname, buffer } = file;
  const fileExtension = path.extname(file.originalname);
  const fileName = sanitizeString(path.basename(originalname, fileExtension));

  const blob = bucket.file(
    `${folderName}/${fileName}-${timestamp}${fileExtension}`
  );
  const blobStream = blob.createWriteStream({ resumable: false });

  return new Promise((resolve, reject) => {
    blobStream
      .on('finish', () => {
        const publicUrl = util.format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        console.log('upload done');
        resolve(publicUrl);
      })
      .on('error', (err) => {
        console.error(err);
        reject(err);
      })
      .end(buffer);
  });
};

module.exports = uploadImage;
