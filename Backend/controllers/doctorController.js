const User = require("../models/User");
const Patient = require("../models/PatientData");
const Appointment = require("../models/Appointment");

// Doctor Profile
exports.getDoctorProfile = async (req, res) => {
  try {
    const user = req.user;

    if (user.role !== "doctor") {
      return res.status(403).json({ success: false, message: "Not a doctor" });
    }

    res.json({
      success: true,
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone || "",
        licenseNumber: user.licenseNumber || "",
        specialization: user.specialization || "",
        experience: user.experience || 0,
        qualification: user.qualification || "",
        hospital: user.hospital || "",
      },
    });
  } catch (err) {
    console.error("getDoctorProfile error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update Doctor Profile
exports.updateDoctorProfile = async (req, res) => {
  try {
    const { licenseNumber, specialization, experience, qualification, hospital } = req.body;
    const user = req.user;

    if (licenseNumber) user.licenseNumber = licenseNumber;
    if (specialization) user.specialization = specialization;
    if (experience) user.experience = experience;
    if (qualification) user.qualification = qualification;
    if (hospital) user.hospital = hospital;

    await user.save();
    res.json({ success: true, message: "Profile updated", data: user });
  } catch (err) {
    console.error("updateDoctorProfile error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Assigned Patients
exports.getAssignedPatients = async (req, res) => {
  try {
    const doctorId = req.user._id;

    const patients = await Patient.find({ assignedDoctor: doctorId })
      .populate("user", "firstName lastName email phone");

    res.json({ success: true, data: patients });
  } catch (err) {
    console.error("getAssignedPatients error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Assign Patient to Doctor
exports.assignPatientToDoctor = async (req, res) => {
  try {
    const doctor = req.user;
    const patientId = req.params.id;

    const patient = await Patient.findById(patientId);
    if (!patient)
      return res.status(404).json({ success: false, message: "Patient not found" });

    patient.assignedDoctor = doctor._id;
    await patient.save();

    res.json({ success: true, message: "Patient assigned", data: patient });
  } catch (err) {
    console.error("assignPatientToDoctor error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get Doctor Appointments
exports.getDoctorAppointments = async (req, res) => {
  try {
    const doctorId = req.user._id;

    const appts = await Appointment.find({ doctorId }).sort({
      date: 1,
      startTime: 1,
    });

    res.json({ success: true, data: appts });
  } catch (err) {
    console.error("getDoctorAppointments error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Today's Appointments
exports.getTodayAppointments = async (req, res) => {
  try {
    const doctorId = req.user._id;
    const today = new Date().toISOString().slice(0, 10);

    const appts = await Appointment.find({
      doctorId,
      date: today,
    }).sort({ startTime: 1 });

    res.json({ success: true, data: appts });
  } catch (err) {
    console.error("getTodayAppointments error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Completed Count (Today)
exports.getCompletedCount = async (req, res) => {
  try {
    const doctorId = req.user._id;
    const today = new Date().toISOString().slice(0, 10);

    const count = await Appointment.countDocuments({
      doctorId,
      date: today,
      status: "Completed",
    });

    res.json({ success: true, count });
  } catch (err) {
    console.error("getCompletedCount error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Patient Details
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate(
      "user",
      "firstName lastName email phone"
    );

    if (!patient)
      return res.status(404).json({ success: false, message: "Patient not found" });

    res.json({ success: true, data: patient });
  } catch (err) {
    console.error("getPatientById error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Consultation (Latest Appointment + AI Data)
exports.getConsultation = async (req, res) => {
  try {
    const { patientId } = req.query;

    const patient = await Patient.findById(patientId).populate(
      "user",
      "firstName lastName phone"
    );

    if (!patient) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }

    const appointment = await Appointment.findOne({
      patientId: patient._id,
      doctorId: req.user._id,
    }).sort({ createdAt: -1 });

    const latestAI =
      patient.aiPredictions?.length > 0
        ? patient.aiPredictions[patient.aiPredictions.length - 1].riskLevel
        : "Unknown";

    const latestReport =
      patient.reports?.length > 0
        ? patient.reports[patient.reports.length - 1].report
        : null;

    const answers = latestReport?.answers || [];

    return res.json({
      success: true,
      data: {
        _id: appointment ? appointment._id : null,
        appointmentId: appointment ? appointment._id : null,
        patientId: patient._id,
        patientName: `${patient.user.firstName} ${patient.user.lastName}`,
        phone: patient.user.phone || "",
        riskLevel: latestAI,
        answers,
        message: latestReport?.message || "",
        consultationReport: patient.consultation?.notes || "",
        medications: patient.consultation?.medications || "",
      },
    });
  } catch (err) {
    console.error("getConsultation error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update Consultation
exports.updateConsultation = async (req, res) => {
  try {
    const { patientId, consultationReport, medications } = req.body;

    const patient = await Patient.findById(patientId);
    if (!patient)
      return res.status(404).json({ success: false, message: "Patient not found" });

    patient.consultation = {
      notes: consultationReport,
      medications,
      files: patient.consultation?.files || [],
    };

    await patient.save();

    res.json({
      success: true,
      message: "Consultation updated",
      data: patient.consultation,
    });
  } catch (err) {
    console.error("updateConsultation error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Add Patient Report
exports.addPatientReport = async (req, res) => {
  try {
    const { report } = req.body;

    const patient = await Patient.findById(req.params.id);
    if (!patient)
      return res.status(404).json({ success: false, message: "Patient not found" });

    patient.reports.push({
      doctor: req.user._id,
      specialty: req.user.specialization || "",
      report,
    });

    await patient.save();

    res.json({ success: true, message: "Report added", data: patient.reports });
  } catch (err) {
    console.error("addPatientReport error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// AI Predictions
exports.getPatientAIPredictions = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient)
      return res.status(404).json({ success: false, message: "Patient not found" });

    res.json({ success: true, data: patient.aiPredictions || [] });
  } catch (err) {
    console.error("getPatientAIPredictions error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Approved Doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find(
      { role: "doctor", approvalStatus: "approved" },
      "firstName lastName specialization phone email hospital"
    );

    res.json({ success: true, data: doctors });
  } catch (err) {
    console.error("getAllDoctors error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Completed Appointments
exports.getCompletedAppointments = async (req, res) => {
  try {
    const doctorId = req.user._id;

    const completed = await Appointment.find({
      doctorId,
      status: "Completed",
    }).sort({ date: -1 });

    res.json({ success: true, data: completed });
  } catch (err) {
    console.error("getCompletedAppointments error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Create Appointment (Doctor)
exports.createDoctorAppointment = async (req, res) => {
  try {
    const doctorId = req.user._id;
    const { patientId, patientName, date, startTime, endTime, reason } = req.body;

    if (!patientId || !patientName || !date) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const appt = new Appointment({
      patientId,
      patientName,
      doctorId,
      date,
      startTime,
      endTime,
      reason,
      status: "Scheduled",
    });

    await appt.save();

    res.json({
      success: true,
      message: "Appointment created successfully",
      data: appt,
    });
  } catch (err) {
    console.error("createDoctorAppointment error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
