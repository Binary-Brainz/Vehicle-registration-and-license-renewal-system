const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
  regNo: {
    type: String,
    required: true,
    unique: true
  },
  weight: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  ownerNIC: {
    type: String,
    required: true
  },
  wheelType: {
    type: Number,
    required: true
  },
  isExpired: {
    type: Boolean,
    default: false
  },
  registeredDate: {
    type: Date,
    required: true
  }
}, { timestamps: true });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle;