const axios = require("axios");
const PatientData = require("../models/PatientData");
const Appointment = require("../models/Appointment");

const symptomQuestions = [
  "Which part of your body is experiencing symptoms?",
  "What is your age?",
  "What is your gender? (0 = Female, 1 = Male)",
  "How frequently do you smoke? (0–10)",
  "How frequently do you consume alcohol? (0–10)",
  "Obesity level? (0–10)",
  "Any family history of cancer? (0/1)",
  "Red meat intake? (0–10)",
  "Salted/processed food intake? (0–10)",
  "Fruit & vegetable intake? (0–10)",
  "Physical activity level? (0–10)",
  "Air pollution exposure? (0–10)",
  "Occupational hazards? (0–10)",
  "BRCA mutation? (0/1)",
  "H. Pylori infection? (0/1)",
  "Calcium intake? (0–10)",
  "BMI?",
  "Physical activity level? (0–10)"
];

exports.predictRisk = async (req, res) => {
  try {
    const pythonURL = "http://localhost:5001/predict";
    const response = await axios.post(pythonURL, req.body);

    const riskLevel =
      response.data.risk ||
      response.data.prediction ||
      response.data.riskLevel ||
      "Unknown";

    const patientId = req.user._id;
    let patientData = await PatientData.findOne({ user: patientId }).populate("user");

    if (!patientData) {
      patientData = new PatientData({
        user: patientId,
        dateOfBirth: new Date(),
        gender: "other",
        phone: "0000000000",
        emergencyContact: "0000000000",
      });
    }

    let incoming = req.body.answers || [];
    let normalizedAnswers = [];

    if (Array.isArray(incoming) && incoming.length > 0) {
      if (typeof incoming[0] === "object" && incoming[0] !== null && "answer" in incoming[0]) {
        normalizedAnswers = incoming.map(it => ({
          question: it.question ?? "",
          answer: String(it.answer ?? "")
        }));
      } else {
        normalizedAnswers = incoming.map((ans, idx) => ({
          question: symptomQuestions[idx] ?? `Q${idx + 1}`,
          answer: String(ans ?? "")
        }));
      }
    }

    patientData.aiPredictions.push({
      riskLevel,
      date: new Date(),
    });

    patientData.reports.push({
      doctor: null,
      specialty: null,
      report: {
        answers: normalizedAnswers,
        prediction: riskLevel,
        message: `AI predicted your cancer risk as ${riskLevel}`,
      },
      date: new Date(),
    });

    await patientData.save();

    // Auto-create appointment (no duplicates)
    const assignedDoctor = patientData.assignedDoctor;
    if (assignedDoctor) {
      const today = new Date().toISOString().slice(0, 10);

      const existing = await Appointment.findOne({
        patientId: patientData._id,
        doctorId: assignedDoctor,
        date: today,
        reason: "AI Prediction Consultation",
      });

      if (!existing) {
        const now = new Date();
        const startTime = now.toTimeString().slice(0, 5);
        const endObj = new Date(now.getTime() + 30 * 60000);
        const endTime = endObj.toTimeString().slice(0, 5);

        const appt = new Appointment({
          patientId: patientData._id,
          patientName: `${patientData.user.firstName} ${patientData.user.lastName}`,
          doctorId: assignedDoctor,
          date: today,
          startTime,
          endTime,
          reason: "AI Prediction Consultation",
          status: "Scheduled",
        });

        await appt.save();
      }
    }

    return res.json({
      status: "success",
      riskLevel,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: "Prediction service failed",
      details: error.response?.data || error.message,
    });
  }
};
