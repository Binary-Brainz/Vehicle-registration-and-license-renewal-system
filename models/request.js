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
        required: true
    },
    type: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true,
        default: 'pending'
    },
    files: [String],
    isViewed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;

/*
owner sends requests - pending
officer views - mark request viewed
if approves:
    mark approved
    send notification with neccessary files and details
else:
    mark rejected
    send a notification with the reason
*/