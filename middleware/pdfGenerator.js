const PDFDocument = require('pdfkit');
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

const makePdf = (data) => {

    // Create a document
    let doc = new PDFDocument({bufferPages: true});

    let doc_name = data.regNo + '-registration-' + uuid() +'.pdf';
    let doc_path = './generated/' + doc_name;

    // let buffers = [];
    // doc.on('data', buffers.push.bind(buffers));
    // doc.on('end', () => {

    //     let pdfData = Buffer.concat(buffers);
    //     res.writeHead(200, {
    //     'Content-Length': Buffer.byteLength(pdfData),
    //     'Content-Type': 'application/pdf',
    //     'Content-disposition': `attachment;filename=${doc_name}`,})
    //     .end(pdfData);

    // });

    doc.pipe(fs.createWriteStream(doc_path));

    doc
    .fontSize(25)
    .text(`Vehicle Registration - ${data.regNo}`, {
        width: 410,
        align: 'center',
        underline: true
      }
    );

    doc
    .moveDown();
    
    //details
    doc
    .fontSize(10)
    .text(`Registration No: ${data.regNo}`, {
        width: 410,
      }
    );

    doc
    .moveDown();

    doc
    .fontSize(10)
    .text(`Owner NIC: ${data.ownerNIC}`, {
        width: 410,
      }
    );

    doc
    .moveDown();

    doc
    .fontSize(10)
    .text(`Vehicle Type: ${data.type}`, {
        width: 410,
      }
    );

    doc
    .moveDown();

    doc
    .fontSize(10)
    .text(`Vehicle Model: ${data.model}`, {
        width: 410,
      }
    );

    doc
    .moveDown();

    doc
    .fontSize(10)
    .text(`Weight (kg): ${data.weight}`, {
        width: 410,
      }
    );

    doc
    .moveDown();

    doc
    .fontSize(10)
    .text(`No. of Doors: ${data.noOfDoors}`, {
        width: 410,
      }
    );

    doc
    .moveDown();

    let regDate = new Date(data.registeredDate);
    let regYear = regDate.getFullYear();
    let newYear = regYear + 1

    let regDateStr = regYear.toString() + '.' + regDate.getMonth().toString() + '.' + regDate.getDate().toString();
    let expiryDate = newYear.toString() + '.' + regDate.getMonth().toString() + '.' + regDate.getDate().toString();

    doc
    .fontSize(10)
    .text(`Vehicle Registration Date: ${regDateStr}`, {
        width: 410,
      }
    );

    doc
    .moveDown();

    doc
    .fontSize(10)
    .text(`License Expiry Date: ${expiryDate}`, {
        width: 410,
      }
    );

    doc
    .moveDown();

    //add color box
    doc
    .fontSize(10)
    .text(`Color: ${data.color}`, {
        width: 410,
        }
    );

    let color = data.color;
    if(data.color === '#FFFFFF' || data.color === '#ffffff'){
        color = '#f5ffed';
    }
    
    doc.circle(100, 355, 20)
    .lineWidth(3)
    .fillOpacity(1)
    .fillAndStroke(color)

    doc
    .moveDown(5);

    // Add some text with annotations
    // doc
    // .addPage()
    // .fillColor('blue')
    // .text('Here is a link!', 100, 100)
    // .underline(100, 100, 160, 27, { color: '#0000FF' })
    // .link(100, 100, 160, 27, 'http://google.com/');

    // Finalize PDF file
    doc.end();

    return doc_name;
}

module.exports = {
    makePdf,
}