const PatientData = require("../models/PatientData");
const User = require("../models/User");

// GET /patient/me – basic profile info
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
        dateOfBirth: patientData.dateOfBirth || '',
        gender: patientData.gender || '',
        phone: patientData.phone || '',
        emergencyContact: patientData.emergencyContact || '',
        medicalHistory: patientData.medicalHistory || [],
        allergies: patientData.allergies || [],
      },
    });
  } catch (err) {
    console.error('❌ getProfile error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// PUT /patient/update – update profile
exports.updateProfile = async (req, res) => {
  try {
    const { email, dateOfBirth, gender, phone, emergencyContact, medicalHistory, allergies } = req.body;

    let patientData = await PatientData.findOne({ user: req.user._id });
    if (!patientData) patientData = new PatientData({ user: req.user._id });

    if (email) patientData.email = email;
    if (dateOfBirth) patientData.dateOfBirth = new Date(dateOfBirth);
    if (gender) patientData.gender = gender;
    if (phone) patientData.phone = phone;
    if (emergencyContact) patientData.emergencyContact = emergencyContact;
    if (medicalHistory) patientData.medicalHistory = medicalHistory;
    if (allergies) patientData.allergies = allergies;

    await patientData.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: patientData,
    });
  } catch (err) {
    console.error('❌ updateProfile error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET /patient/data – full patient data including assigned doctor
// GET /patient/data – full patient data including assigned doctor and appointments
exports.getPatientData = async (req, res) => {
  try {
    const data = await PatientData.findOne({ user: req.user._id })
      .populate('assignedDoctor', 'firstName lastName specialization hospital')
      .populate('appointments.doctor', 'firstName lastName specialization hospital')
      .populate('user', 'firstName lastName email role'); // <- populate user info

         
      console.log('Patient Data:', data);

    if (!data) {
      return res.status(404).json({ message: 'Patient data not found' });
    }

    // Filter upcoming appointments
    const upcomingAppointments = data.appointments
      .filter(app => app.status === 'upcoming')
      .sort((a, b) => a.date - b.date); // sort by date ascending

    res.json({
      success: true,
      data: {
        id: data.user,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        phone: data.phone,
        emergencyContact: data.emergencyContact,
        medicalHistory: data.medicalHistory,
        allergies: data.allergies,
        history: data.history,
        reports: data.reports,
        aiPredictions: data.aiPredictions,
        assignedDoctor: data.assignedDoctor || null,
        upcomingAppointments: upcomingAppointments || [],
      },
    });
  } catch (err) {
    console.error("❌ getPatientData error:", err);
 
    res.status(500).json({ message: 'Server error' });
  }
};


// POST /patient/assign-doctor – assign a doctor
exports.assignDoctor = async (req, res) => {
  try {
    const { doctorId } = req.body;

    const patientData = await PatientData.findOne({ user: req.user._id });
    if (!patientData) return res.status(404).json({ message: "Patient not found" });

    patientData.assignedDoctor = doctorId;
    await patientData.save();

    res.json({
      success: true,
      message: 'Doctor assigned successfully',
      data: patientData,
    });
  } catch (err) {
    console.error('❌ assignDoctor error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
// GET /patient/me – full profile + dashboard data
exports.getDashboardData = async (req, res) => {
  try {
    let patientData = await PatientData.findOne({ user: req.user._id })
      .populate('assignedDoctor', 'firstName lastName specialization hospital');

    if (!patientData) {
      patientData = new PatientData({ user: req.user._id });
      await patientData.save();
    }

    // Recent activities – last 5
    const recentActivities = (patientData.history || [])
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    // Upcoming appointments – for now, we can mock or use future history items with type 'appointment'
    const upcomingAppointments = (patientData.history || [])
      .filter(item => item.date && new Date(item.date) > new Date() && item.type === 'appointment')
      .slice(0, 5)
      .map(item => ({
        doctor: item.doctor || (patientData.assignedDoctor ? `${patientData.assignedDoctor.firstName} ${patientData.assignedDoctor.lastName}` : 'TBD'),
        specialty: item.specialty || patientData.problem || 'General',
        date: item.date,
      }));

    res.json({
      success: true,
      data: {
        _id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        role: req.user.role,
        dateOfBirth: patientData.dateOfBirth || '',
        gender: patientData.gender || '',
        phone: patientData.phone || '',
        emergencyContact: patientData.emergencyContact || '',
        medicalHistory: patientData.medicalHistory || [],
        allergies: patientData.allergies || [],
        reports: patientData.reports || [],
        aiPredictions: patientData.aiPredictions || [],
        assignedDoctor: patientData.assignedDoctor || null,
        recentActivities,
        upcomingAppointments,
      }
    });
  } catch (err) {
    console.error('❌ getDashboardData error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
