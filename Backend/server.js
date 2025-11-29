require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const path = require("path");
const fs = require("fs");
const cron = require("node-cron");

const Appointment = require("./models/Appointment");
const PatientData = require("./models/PatientData");
const sendEmail = require("./utils/sendEmail");

const createAdminIfNotExists = require("./utils/createAdmin");  // <-- ADDED

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL ,
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

const authRoutes = require("./routes/auth");
const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const predictionRoutes = require("./routes/predictionRoutes");
const adminRoutes = require("./routes/adminRoutes");

let appointmentRoutes;
try {
  appointmentRoutes = require("./routes/appointmentRoutes");
} catch {}

app.use("/api/auth", authRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api", predictionRoutes);
app.use("/api/admin", adminRoutes);

if (appointmentRoutes) {
  app.use("/api/appointments", appointmentRoutes);
}

const uploadsDir = path.join(__dirname, "uploads");
if (fs.existsSync(uploadsDir)) {
  app.use("/uploads", express.static(uploadsDir));
}

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong",
  });
});

const server = http.createServer(app);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("MongoDB connected");

    await createAdminIfNotExists();  // <-- ADDED (This actually creates admin)

    cron.schedule("*/1 * * * *", async () => {
      try {
        const now = new Date();
        const today = now.toISOString().slice(0, 10);
        const nowMinutes = now.getHours() * 60 + now.getMinutes();

        const appointments = await Appointment.find({ date: today });

        for (const appt of appointments) {
          if (!appt.startTime) continue;

          const [h, m] = appt.startTime.split(":").map(Number);
          const apptMinutes = h * 60 + m;
          const diff = apptMinutes - nowMinutes;

          const patient = await PatientData.findById(appt.patientId).populate(
            "user",
            "email firstName phone"
          );

          if (!patient || !patient.user?.email) continue;

          const email = patient.user.email;
          const name = patient.user.firstName;

          if (diff === 1440) {
            await sendEmail(name, `Reminder: You have an appointment tomorrow at ${appt.startTime}.`, email);
          }

          if (diff === 60) {
            await sendEmail(name, `Reminder: Your appointment is in 1 hour at ${appt.startTime}.`, email);
          }
        }
      } catch (err) {
        console.error("Cron error:", err);
      }
    });

    server.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
