const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uploadedFileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ownerID: {
        type: String,
        required: true
    },
    receiverID: {
        type: String,
        required: true
    },
}, { timestamps: true });

const UploadedFile = mongoose.model('UploadedFile', uploadedFileSchema);
module.exports = UploadedFile;