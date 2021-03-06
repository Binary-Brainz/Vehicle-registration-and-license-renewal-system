const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  model: {
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
  manufacturedYear: {
    type: String,
    required: true
  },
  ownerNIC: {
    type: String,
    required: true
  },
  noOfDoors: {
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
  },
  expireDate: {
    type: Date,
    required: true
  },
  nextYearFee: {
      type: Number,
      default: 1000
  },
  img: {
      type: String,
      default: ''
  }
}, { timestamps: true });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle;
