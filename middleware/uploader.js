require('dotenv').config()
const fs = require('fs')
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

const uploadS3 = multer({

    storage: multerS3({

        s3: s3,
        bucket: bucketName,
        acl: "public-read",

        metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
        },

        key: function (req, file, cb) {

            let {originalname } = file;
            let fileName = uuid() + '-' + originalname;
            let fullPath = 'uploads/' + fileName;

            cb(null, fullPath);

            if(!req.body['files']){
                req.body['files'] = [fileName];
            }
            else{
                req.body['files'].push(fileName);
            }
        }
    })
})

module.exports = uploadS3;

function getFileStream(fileKey) {

    const downloadParams = {
      Key: fileKey,
      Bucket: bucketName
    }
  
    return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream;