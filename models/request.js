const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    ownerName: {
        type: String,
        required: true
    },
    ownerID: {
        type: String,
        required: true
    },
    officerID: {
        type: String,
        required: true
    },
    regNo: {
        type: String,
        default: null
    },
    type: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true,
        default: 'new'
    },
    files: [String],
    isViewed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;