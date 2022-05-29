const PDFDocument = require('pdfkit');
const fs = require('fs');
const uuid = require('uuid').v4;

const makePdf = (data) => {

    // Create a document
    let doc = new PDFDocument();

    let doc_name = data.regNo + '-registration-' + uuid() +'.pdf';
    let doc_path = './generated/' + doc_name;
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