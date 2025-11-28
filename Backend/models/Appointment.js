const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'PatientData', required: true },
    patientName: { type: String, required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true },
    startTime: { type: String },
    endTime: { type: String },
    reason: { type: String, default: '' },
    status: {
      type: String,
      enum: ['Scheduled', 'Completed', 'Cancelled'],
      default: 'Scheduled'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Appointment', AppointmentSchema);
