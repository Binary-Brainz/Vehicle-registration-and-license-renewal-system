require('dotenv').config();
const fs = require('fs');
const multer = require("multer");
const path = require("path");
const uuid = require('uuid').v4;
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.AWS_STORAGE_BUCKET_NAME;

const s3 = new aws.S3({
    accessKeyId,
    secretAccessKey,
})

function getFileStream(fileKey) {

    const downloadParams = {
      Key: fileKey,
      Bucket: bucketName
    }
  
    return s3.getObject(downloadParams).createReadStream();
}

module.exports = getFileStream;