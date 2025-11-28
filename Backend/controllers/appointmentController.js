const Appointment = require("../models/Appointment");

// Create Appointment
exports.createAppointment = async (req, res) => {
  try {
    const {
      patientId,
      patientName,
      doctorId,
      date,
      startTime,
      endTime,
      reason,
    } = req.body;

    if (!patientId || !patientName || !date) {
      return res.status(400).json({
        success: false,
        message: "patientId, patientName and date are required",
      });
    }

    const appt = await Appointment.create({
      patientId,
      patientName,
      doctorId: doctorId || null,
      date,
      startTime: startTime || "",
      endTime: endTime || "",
      reason: reason || "",
      status: "Scheduled",
    });

    res.json({ success: true, data: appt });
  } catch (err) {
    console.error("createAppointment error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get All Appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appts = await Appointment.find().sort({
      date: 1,
      startTime: 1,
    });
    res.json({ success: true, data: appts });
  } catch (err) {
    console.error("getAllAppointments error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Mark Appointment as Completed
exports.markComplete = async (req, res) => {
  try {
    const appt = await Appointment.findById(req.params.id);

    if (!appt) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    appt.status = "Completed";
    await appt.save();

    res.json({ success: true, message: "Appointment Completed", data: appt });
  } catch (err) {
    console.error("markComplete error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Cancel Appointment
exports.cancelAppointment = async (req, res) => {
  try {
    const appt = await Appointment.findById(req.params.id);

    if (!appt) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    appt.status = "Cancelled";
    await appt.save();

    res.json({ success: true, message: "Appointment Cancelled", data: appt });
  } catch (err) {
    console.error("cancelAppointment error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Doctor Creates Appointment
exports.createDoctorAppointment = async (req, res) => {
  try {
    const { patientId, patientName, date, startTime, reason } = req.body;

    if (!patientId || !patientName || !date || !startTime) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const endObj = new Date(`2000-01-01T${startTime}:00Z`);
    endObj.setMinutes(endObj.getMinutes() + 30);
    const endTime = endObj.toISOString().slice(11, 16);

    const appt = await Appointment.create({
      patientId,
      patientName,
      doctorId: req.user._id,
      date,
      startTime,
      endTime,
      reason: reason || "Manual appointment",
      status: "Scheduled",
    });

    res.json({ success: true, message: "Appointment created", data: appt });
  } catch (err) {
    console.error("CreateDoctorAppointment error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
