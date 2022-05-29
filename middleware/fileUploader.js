const path = require('path');
const uuid = require('uuid').v4;
const multer = require('multer');

const storage = multer.diskStorage({

    destination: (req, file, callback) => {

        callback(null, 'uploads');
    },
    filename: (req, file, callback) => {

        let {originalname } = file;
        let fileName = uuid() + '-' + originalname;
        
        callback(null, fileName);

        if(!req.body['files']){
            req.body['files'] = [fileName];
        }
        else{
            req.body['files'].push(fileName);
        }
    }
});

module.exports = multer({ storage });