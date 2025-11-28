const Appointment = require('../models/Appointment');
const Report = require('../models/Report');

// Today's date (YYYY-MM-DD)
function todayString() {
  return new Date().toISOString().slice(0, 10);
}

// Today's Appointments
exports.getTodayAppointments = async (req, res) => {
  try {
    const doctorId = req.user ? req.user._id : undefined;
    const today = todayString();

    const filter = { date: today };
    if (doctorId) filter.doctorId = doctorId;

    const appts = await Appointment.find(filter)
      .select('patientName startTime endTime reason status')
      .sort({ startTime: 1 });

    return res.json({ success: true, data: appts });
  } catch (err) {
    console.error('getTodayAppointments', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Completed Appointments (Today)
exports.getCompletedAppointments = async (req, res) => {
  try {
    const doctorId = req.user ? req.user._id : undefined;
    const today = todayString();

    const filter = { date: today, status: 'Completed' };
    if (doctorId) filter.doctorId = doctorId;

    const count = await Appointment.countDocuments(filter);
    return res.json({ success: true, count });
  } catch (err) {
    console.error('getCompletedAppointments', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Pending Reports
exports.getPendingReports = async (req, res) => {
  try {
    const doctorId = req.user ? req.user._id : undefined;

    const filter = { status: 'PendingReview' };
    if (doctorId) filter.doctorId = doctorId;

    const count = await Report.countDocuments(filter);
    return res.json({ success: true, count });
  } catch (err) {
    console.error('getPendingReports', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Recent Activity (Reports + Appointments)
exports.getDoctorActivity = async (req, res) => {
  try {
    const recentReports = await Report.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const recentAppts = await Appointment.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const activities = [];

    recentReports.forEach(r => {
      activities.push({
        text: `Report created - ${r.patientName}`,
        timeAgo: `${Math.round((Date.now() - r.createdAt.getTime()) / 3600000)} hours ago`,
        color: "#10B981"
      });
    });

    recentAppts.forEach(a => {
      activities.push({
        text: `Appointment scheduled - ${a.patientName}`,
        timeAgo: `${Math.round((Date.now() - a.createdAt.getTime()) / 3600000)} hours ago`,
        color: "#3B82F6"
      });
    });

    return res.json({ success: true, data: activities.slice(0, 8) });
  } catch (err) {
    console.error('getDoctorActivity', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
