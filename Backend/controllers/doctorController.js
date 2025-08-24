const User = require('../models/User'); // doctor is just a user with role='doctor'
const Patient = require('../models/PatientData');

// ---------------- Doctor Profile ----------------
exports.getDoctorProfile = async (req, res) => {
  try {
    const user = req.user; // from protect middleware

    if (user.role !== 'doctor') {
      return res.status(403).json({ success: false, message: 'Not a doctor' });
    }

    res.json({
      success: true,
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        licenseNumber: user.licenseNumber || '',
        specialization: user.specialization || '',
        experience: user.experience || 0,
        qualification: user.qualification || '',
        hospital: user.hospital || '',
      },
    });
  } catch (err) {
    console.error('❌ getDoctorProfile error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateDoctorProfile = async (req, res) => {
  try {
    const { licenseNumber, specialization, experience, qualification, hospital } = req.body;
    const user = req.user;

    if (licenseNumber !== undefined) user.licenseNumber = licenseNumber;
    if (specialization !== undefined) user.specialization = specialization;
    if (experience !== undefined) user.experience = experience;
    if (qualification !== undefined) user.qualification = qualification;
    if (hospital !== undefined) user.hospital = hospital;

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        licenseNumber: user.licenseNumber || '',
        specialization: user.specialization || '',
        experience: user.experience || 0,
        qualification: user.qualification || '',
        hospital: user.hospital || '',
      },
    });
  } catch (err) {
    console.error('❌ updateDoctorProfile error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ---------------- Patients ----------------
exports.getPatients = async (req, res) => {
  try {
    const doctor = req.user; // from protect middleware

    if (doctor.role !== "doctor") {
      return res.status(403).json({ success: false, message: "Not a doctor" });
    }

    const allPatients = await Patient.find();

    const assignedPatients = allPatients.filter((p) =>
      doctor.specialization
        ? p.problem?.toLowerCase() === doctor.specialization.toLowerCase()
        : true
    );

    res.json({ success: true, data: assignedPatients });
  } catch (err) {
    console.error("❌ getPatients error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ success: false, message: 'Patient not found' });
    res.json({ success: true, data: patient });
  } catch (err) {
    console.error('❌ getPatientById error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.assignPatientToDoctor = async (req, res) => {
  try {
    const doctor = req.user; // logged-in doctor
    const patientId = req.params.id;

    if (doctor.role !== 'doctor') {
      return res.status(403).json({ success: false, message: 'Not a doctor' });
    }

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    if (!doctor.specialization) {
      return res.status(400).json({ success: false, message: 'Doctor specialization not set' });
    }

    if (!patient.problem || patient.problem.toLowerCase() !== doctor.specialization.toLowerCase()) {
      return res.status(400).json({ success: false, message: 'Patient problem does not match doctor specialization' });
    }

    patient.assignedDoctor = doctor._id;
    await patient.save();

    res.json({ success: true, message: 'Patient assigned to doctor successfully', data: patient });
  } catch (err) {
    console.error('❌ assignPatientToDoctor error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.addPatientReport = async (req, res) => {
  try {
    const { report } = req.body;
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ success: false, message: 'Patient not found' });

    patient.reports.push(report);
    await patient.save();

    res.json({ success: true, message: 'Report added successfully', data: patient });
  } catch (err) {
    console.error('❌ addPatientReport error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getPatientAIPredictions = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ success: false, message: 'Patient not found' });

    res.json({ success: true, data: patient.aiPredictions || [] });
  } catch (err) {
    console.error('❌ getPatientAIPredictions error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ---------------- Fetch All Doctors ----------------
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select(
      "firstName lastName email specialization experience qualification hospital"
    );

    res.json({ success: true, data: doctors });
  } catch (err) {
    console.error("❌ getAllDoctors error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
