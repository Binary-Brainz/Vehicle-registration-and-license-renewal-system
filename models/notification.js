const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    type:{
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    receiverID: {
        type: String,
        required: true
    },
    requestID: {
        type: String,
        default: null
    },
    files: [String],
    isViewed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;