const User = require("../models/User");



// Get all pending doctors
const getPendingDoctors = async (req, res) => {
  try {
    const pendingDoctors = await User.find({ role: "doctor", approvalStatus: "pending" })
      .select("firstName lastName email licenseNumber specialization experience qualification hospital");

    res.json(pendingDoctors);
  } catch (error) {
    console.error("Error fetching pending doctors:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// Approve doctor
const approveDoctor = async (req, res) => {
  try {
    const doctor = await User.findById(req.params.id);
    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }

    doctor.approvalStatus = "approved";
    await doctor.save();
    res.json({ message: "Doctor approved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Reject doctor
const rejectDoctor = async (req, res) => {
  try {
    const doctor = await User.findById(req.params.id);
    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }

    doctor.approvalStatus = "rejected";
    await doctor.save();
    res.json({ message: "Doctor rejected successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getPendingDoctors, approveDoctor, rejectDoctor };
