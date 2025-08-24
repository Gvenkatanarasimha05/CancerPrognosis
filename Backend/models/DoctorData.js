const mongoose = require("mongoose");

const DoctorDataSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Approval status (for Admin verification)
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    // Doctor specialization (used for matching with patient problems)
    specialization: [{ type: String, required: true }], 
    // Example: ["oncology", "cardiology", "general"]

    // Patients assigned to this doctor
    patients: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    // Consultation records
    consultations: [
      {
        patient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        notes: String,
        date: { type: Date, default: Date.now },
        prescription: String,
      },
    ],

    // Medical reports
    reports: [
      {
        patient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        reportType: String,
        description: String,
        fileUrl: String, // in case you upload reports
        date: { type: Date, default: Date.now },
      },
    ],

    // Appointments
    appointments: [
      {
        patient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        appointmentDate: Date,
        reason: String,
        status: {
          type: String,
          enum: ["pending", "confirmed", "cancelled"],
          default: "pending",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("DoctorData", DoctorDataSchema);
