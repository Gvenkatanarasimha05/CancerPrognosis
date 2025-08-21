const mongoose = require('mongoose');

const patientDataSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    dateOfBirth: { type: Date, required: true, default: Date.now },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true, default: 'other' },
    phone: { type: String, required: true, default: '0000000000' },
    emergencyContact: { type: String, required: true, default: '0000000000' },

    medicalHistory: [{ type: String }],
    allergies: [{ type: String }],

    history: [
      {
        title: String,
        description: String,
        date: Date,
      },
    ],
    reports: [
      {
        doctor: String,
        specialty: String,
        report: String,
        date: Date,
      },
    ],
    aiPredictions: [
      {
        disease: String,
        probability: Number,
        date: Date,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.models.PatientData || mongoose.model('PatientData', patientDataSchema);
