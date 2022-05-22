const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workdaySchema = new Schema({
  day: {
    type: Date,
    required: true
  },
  owners: [String]
}, { timestamps: true });

const Workday = mongoose.model('Workday', workdaySchema);
module.exports = Workday;