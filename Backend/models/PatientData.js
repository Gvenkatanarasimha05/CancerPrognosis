const mongoose = require('mongoose');

const patientDataSchema = new mongoose.Schema(
  {
    patientId: { type: Number, unique: true },
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
        type: { type: String, enum: ['activity', 'appointment'], default: 'activity' },
        doctor: { type: String }, // optional doctor for activity or appointment
        specialty: { type: String },
      },
    ],

    appointments: [
      {
        doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        specialty: { type: String },
        date: { type: Date, required: true },
        status: { type: String, enum: ['upcoming', 'completed', 'cancelled'], default: 'upcoming' },
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

    assignedDoctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    problem: { type: String }, // helpful for matching with doctor's specialization
  },
  { timestamps: true }
);

// Auto-increment patientId
patientDataSchema.pre('save', async function (next) {
  if (this.isNew && !this.patientId) {
    try {
      const lastPatient = await this.constructor.findOne().sort({ patientId: -1 });
      this.patientId = lastPatient ? lastPatient.patientId + 1 : 1;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

module.exports = mongoose.models.PatientData || mongoose.model('PatientData', patientDataSchema);
