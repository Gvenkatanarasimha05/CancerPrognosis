const PatientData = require("../models/PatientData");
const User = require("../models/User");

// Get patient profile
exports.getProfile = async (req, res) => {
  try {
    let patientData = await PatientData.findOne({ user: req.user._id });
    if (!patientData) {
      patientData = new PatientData({ user: req.user._id });
      await patientData.save();
    }

    res.json({
      success: true,
      data: {
        _id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        role: req.user.role,
        phone: req.user.phone || "",
        dateOfBirth: patientData.dateOfBirth || "",
        gender: patientData.gender || "",
        emergencyContact: patientData.emergencyContact || "",
        medicalHistory: patientData.medicalHistory || [],
        allergies: patientData.allergies || [],
      },
    });
  } catch (err) {
    console.error("getProfile error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update patient profile
exports.updateProfile = async (req, res) => {
  try {
    const {
      email,
      dateOfBirth,
      gender,
      phone,
      emergencyContact,
      medicalHistory,
      allergies,
    } = req.body;

    let patientData = await PatientData.findOne({ user: req.user._id });
    if (!patientData) patientData = new PatientData({ user: req.user._id });

    if (email) patientData.email = email;
    if (dateOfBirth) patientData.dateOfBirth = new Date(dateOfBirth);
    if (gender) patientData.gender = gender;
    if (emergencyContact) patientData.emergencyContact = emergencyContact;
    if (medicalHistory) patientData.medicalHistory = medicalHistory;
    if (allergies) patientData.allergies = allergies;

    if (phone) {
      req.user.phone = phone;
      await req.user.save();
    }

    await patientData.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: patientData,
    });
  } catch (err) {
    console.error("updateProfile error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get full patient data
exports.getPatientData = async (req, res) => {
  try {
    const data = await PatientData.findOne({ user: req.user._id })
      .populate("assignedDoctor", "firstName lastName specialization phone hospital")
      .populate("appointments.doctor", "firstName lastName specialization phone hospital")
      .populate("user", "firstName lastName email role phone");

    if (!data) return res.status(404).json({ message: "Patient data not found" });

    const upcomingAppointments = data.appointments
      .filter(a => a.status === "upcoming")
      .sort((a, b) => a.date - b.date);

    res.json({
      success: true,
      data: {
        id: data.user,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        phone: data.user.phone,
        emergencyContact: data.emergencyContact,
        medicalHistory: data.medicalHistory,
        allergies: data.allergies,
        reports: data.reports,
        aiPredictions: data.aiPredictions,
        assignedDoctor: data.assignedDoctor || null,
        upcomingAppointments: upcomingAppointments || [],
      },
    });
  } catch (err) {
    console.error("getPatientData error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Assign doctor to patient
exports.assignDoctor = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const userId = req.user._id;

    const patientData = await PatientData.findOne({ user: userId }).populate(
      "user",
      "firstName lastName email"
    );

    if (!patientData) {
      return res.status(404).json({ message: "Patient not found" });
    }

    patientData.assignedDoctor = doctorId;

    patientData.appointments.push({
      doctor: doctorId,
      specialty: patientData.problem || "General",
      date: new Date(),
      status: "upcoming",
    });

    await patientData.save();

    res.json({
      success: true,
      message: "Doctor assigned and appointment created",
      data: patientData,
    });
  } catch (err) {
    console.error("assignDoctor error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get assigned doctor
exports.getAssignedDoctor = async (req, res) => {
  try {
    const data = await PatientData.findOne({ user: req.user._id }).populate(
      "assignedDoctor",
      "firstName lastName specialization phone hospital"
    );

    res.json({
      success: true,
      data: data?.assignedDoctor || null,
    });
  } catch (err) {
    console.error("getAssignedDoctor error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get AI reports
exports.getMyReports = async (req, res) => {
  try {
    const patientData = await PatientData.findOne({ user: req.user._id });
    if (!patientData) {
      return res.status(404).json({ success: false, message: "No patient data found" });
    }

    res.json({ success: true, reports: patientData.reports || [] });
  } catch (err) {
    console.error("getMyReports error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get consultation + latest AI report
exports.getConsultationForPatient = async (req, res) => {
  try {
    const data = await PatientData.findOne({ user: req.user._id });
    if (!data) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }

    const latestReport =
      data.reports?.length ? data.reports[data.reports.length - 1] : null;

    const response = {
      patientName: req.user.firstName + " " + req.user.lastName,
      riskLevel: latestReport?.report?.prediction || "Unknown",
      message: latestReport?.report?.message || null,
      answers: latestReport?.report?.answers || [],
      consultationReport: data.consultation?.notes || "",
      medications: data.consultation?.medications || "",
    };

    res.json({ success: true, data: response });
  } catch (err) {
    console.error("getConsultationForPatient error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
