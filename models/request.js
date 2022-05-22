const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    ownerID: {
        type: String,
        required: true
    },
    officerID: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    files: [String],
    isViewed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;