const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const superUserSchema = new Schema({
  nic: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

const SuperUser = mongoose.model('SuperUser', superUserSchema);
module.exports = SuperUser;