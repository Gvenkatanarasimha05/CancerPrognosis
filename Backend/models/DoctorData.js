// models/DoctorData.js
const mongoose = require('mongoose');

const DoctorDataSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  licenseNumber: { type: String },
  specialization: { type: String },
  experience: { type: Number },
  qualification: { type: String },
  hospital: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('DoctorData', DoctorDataSchema);
