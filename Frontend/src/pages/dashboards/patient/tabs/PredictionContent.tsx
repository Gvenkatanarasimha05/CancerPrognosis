import React, { useState, useEffect, useRef } from "react";
import {
  Brain,
  Send,
  Loader,
  Upload,
  Download,
  Stethoscope,
  Check,
  X,
} from "lucide-react";
import axios from "axios";
import { jsPDF } from "jspdf";

interface Message {
  sender: "user" | "system";
  text: string;
}

interface Profile {
  _id: string;
  firstName: string;
  lastName: string;
  gender?: string;
  phone?: number;
}

interface Doctor {
  _id: string;
  firstName: string;
  lastName: string;
  specialization: string;
}

type Props = {
  setActiveTab: (tab: string) => void;
};

/* --------------------------
  18 QUESTIONS
--------------------------- */
const symptomQuestions = [
  "Which part of your body is experiencing symptoms? (e.g., lungs, breast, skin, stomach, etc.)",
  "What is your age?",
  "What is your gender? (0 = Female, 1 = Male)",
  "How frequently do you smoke? (0–10 scale)",
  "How frequently do you consume alcohol? (0–10 scale)",
  "What is your obesity level? (BMI-related, 0–10 scale)",
  "Do you have any family history of cancer? (0 = No, 1 = Yes)",
  "How often do you eat red meat? (0–10 scale)",
  "How often do you eat salted/processed foods? (0–10 scale)",
  "How much fruits & vegetables do you intake daily? (0–10 scale)",
  "How active are you physically? (0–10 scale)",
  "How much are you exposed to air pollution? (0–10 scale)",
  "Are you exposed to occupational hazards? (0–10 scale)",
  "Do you carry BRCA mutation? (0 = No, 1 = Yes)",
  "Do you have H. Pylori infection? (0 = No, 1 = Yes)",
  "What is your calcium intake level? (0–10 scale)",
  "What is your BMI?",
  "What is your physical activity level? (0–10 scale)",
];

/* --------------------------
 Format data → ML model
--------------------------- */
const formatForModel = (answers: any[]) => {
  return {
    Age: Number(answers[1]?.answer || 0),
    Gender: Number(answers[2]?.answer || 0),
    Smoking: Number(answers[3]?.answer || 0),
    Alcohol_Use: Number(answers[4]?.answer || 0),
    Obesity: Number(answers[5]?.answer || 0),
    Family_History: Number(answers[6]?.answer || 0),
    Diet_Red_Meat: Number(answers[7]?.answer || 0),
    Diet_Salted_Processed: Number(answers[8]?.answer || 0),
    Fruit_Veg_Intake: Number(answers[9]?.answer || 0),
    Physical_Activity: Number(answers[10]?.answer || 0),
    Air_Pollution: Number(answers[11]?.answer || 0),
    Occupational_Hazards: Number(answers[12]?.answer || 0),
    BRCA_Mutation: Number(answers[13]?.answer || 0),
    H_Pylori_Infection: Number(answers[14]?.answer || 0),
    Calcium_Intake: Number(answers[15]?.answer || 0),
    BMI: Number(answers[16]?.answer || 0),
    Physical_Activity_Level: Number(answers[17]?.answer || 0),
  };
};

/* --------------------------
 Call ML Model API
--------------------------- */
const callMLModel = async (fullQA: any[]) => {
  try {
    const formattedData = formatForModel(fullQA);
    const token = localStorage.getItem("token");

    const res = await axios.post(
      "http://localhost:4000/api/predict",
      {
        ...formattedData,
        body_part: fullQA[0].answer,
        answers: fullQA,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const rawPred =
      res.data.riskLevel ||
      res.data.prediction ||
      res.data.risk ||
      "unknown";

    return {
      level: String(rawPred).toLowerCase(), 
      msg: `🧠 AI Prediction Result: Your cancer risk is **${rawPred}**.`,
    };
  } catch (err) {
    console.error("ML Prediction Error:", err);
    return {
      level: "unknown",
      msg: "⚠️ AI service unavailable.",
    };
  }
};

/* --------------------------
 Component Start
--------------------------- */
const PredictionContent: React.FC<Props> = ({ setActiveTab }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [prediction, setPrediction] = useState("");
  const [riskLevel, setRiskLevel] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [showDoctors, setShowDoctors] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [assignedDoctor, setAssignedDoctor] = useState<Doctor | null>(null);
  const [answers, setAnswers] = useState<any[]>([]);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  /* Auto scroll */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* Fetch patient data */
  useEffect(() => {
    axios.get("http://localhost:4000/api/patient/me").then((res) => {
      setProfile(res.data.data || res.data);
    });

    setMessages([{ sender: "system", text: symptomQuestions[0] }]);
  }, []);

  /* File Upload */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);

    setMessages((prev) => [
      ...prev,
      { sender: "system", text: `📂 File uploaded: ${f.name}` },
    ]);
  };

  /* Handle Send */
  const handleSend = async () => {
    if (!input.trim()) return;

    const qna = {
      question: symptomQuestions[step],
      answer: input,
    };

    setAnswers((prev) => [...prev, qna]);
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    const currentStep = step;
    setInput("");

    if (currentStep < symptomQuestions.length - 1) {
      setStep(currentStep + 1);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: "system", text: symptomQuestions[currentStep + 1] },
        ]);
      }, 300);
      return;
    }

    /* Final Step → Predict */
    setLoading(true);

    const outcome = await callMLModel([...answers, qna]);

    setPrediction(outcome.msg);
    setRiskLevel(outcome.level);
    setMessages((prev) => [...prev, { sender: "system", text: outcome.msg }]);

    setLoading(false);

    /* -----------------------------
       MEDIUM + HIGH RISK LOGIC 
    ----------------------------- */
    if (outcome.level === "high" || outcome.level === "medium") {
      setMessages((prev) => [
        ...prev,
        {
          sender: "system",
          text:
            outcome.level === "high"
              ? "⚠️ High risk detected! You should consult a doctor immediately."
              : "⚠️ Medium risk detected! Please consult a doctor as soon as possible.",
        },
      ]);

      fetchDoctors(); // auto-load doctor list
    }
  };

  /* Reset */
  const handleNewPrediction = () => {
    setStep(0);
    setInput("");
    setFile(null);
    setPrediction("");
    setRiskLevel("");
    setAnswers([]);
    setAssignedDoctor(null);
    setMessages([{ sender: "system", text: symptomQuestions[0] }]);
  };

  /* Download PDF */
  const handleDownloadPDF = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:4000/api/patient/reports", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const latest = res.data.reports?.slice(-1)[0];
    if (!latest) return alert("No report available.");

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("AI Prediction Report", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.text(
      `Patient Name: ${profile?.firstName} ${profile?.lastName}`,
      20,
      40
    );
    doc.text(`Phone: ${profile?.phone}`, 20, 50);
    doc.text(`Gender: ${profile?.gender}`, 20, 60);

    doc.text(`Risk Level: ${latest.report.prediction}`, 20, 80);
    doc.text(`Message: ${latest.report.message}`, 20, 90);

    doc.text("Answers:", 20, 110);
    latest.report.answers.forEach((qa: any, index: number) => {
      doc.text(
        `${index + 1}. ${qa.question} — ${qa.answer}`,
        25,
        120 + index * 8
      );
    });

    doc.save("AI_Report.pdf");
  };

  /* Fetch Doctors */
  const fetchDoctors = async () => {
    const res = await axios.get("http://localhost:4000/api/doctor/doctors");
    setDoctors(res.data.data || res.data);
    setShowDoctors(true);
  };

  /* Assign Doctor */
  const handleAssignDoctor = async (doc: Doctor) => {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:4000/api/patient/assign-doctor",
      { doctorId: doc._id },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setAssignedDoctor(doc);
    setShowDoctors(false);

    setMessages((prev) => [
      ...prev,
      {
        sender: "system",
        text: `🎉 Dr. ${doc.firstName} ${doc.lastName} assigned! Opening consultation...`,
      },
    ]);

    setTimeout(() => setActiveTab("consultation"), 600);
  };

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-xl shadow-md p-4">
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 p-2 border rounded-md bg-gray-50">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-xl text-sm max-w-[75%] ${
                m.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="px-4 py-2 bg-gray-200 rounded-xl">
            <Loader className="animate-spin w-4 h-4 inline-block mr-2" />
            AI is analyzing...
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* File Upload */}
      <div className="flex items-center space-x-2 mb-2">
        <label className="cursor-pointer flex items-center bg-gray-200 px-3 py-2 rounded-xl">
          <Upload className="w-4 h-4 mr-2" />
          <span>{file?.name || "Upload Report"}</span>
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>
      </div>

      {/* Input Box */}
      <div className="flex items-center space-x-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={symptomQuestions[step]}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 border rounded-xl px-4 py-2"
        />

        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl"
        >
          <Send className="w-4 h-4" />
        </button>

        {prediction && (
          <>
            <button
              onClick={handleDownloadPDF}
              className="bg-green-600 text-white px-4 py-2 rounded-xl"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={handleNewPrediction}
              className="bg-yellow-500 text-white px-4 py-2 rounded-xl"
            >
              <Brain className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* CONSULT DOCTOR BUTTON — HIGH + MEDIUM RISK */}
      {(riskLevel === "high" || riskLevel === "medium") && !assignedDoctor && (
        <button
          onClick={fetchDoctors}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-xl"
        >
          <Stethoscope className="w-4 h-4 inline-block mr-2" />
          {riskLevel === "high"
            ? "High Risk — Consult a Doctor"
            : "Medium Risk — Consult a Doctor ASAP"}
        </button>
      )}

      {/* Doctor Modal */}
      {showDoctors && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-96">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-bold">Available Doctors</h2>
              <X
                className="cursor-pointer"
                onClick={() => setShowDoctors(false)}
              />
            </div>

            {doctors.map((doc) => (
              <div
                key={doc._id}
                className="flex justify-between p-3 bg-gray-100 mb-2 rounded-lg"
              >
                <span>
                  {doc.firstName} {doc.lastName} — {doc.specialization}
                </span>

                <button
                  onClick={() => handleAssignDoctor(doc)}
                  className="bg-blue-600 text-white px-3 py-1 rounded-lg"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {assignedDoctor && (
        <div className="mt-4 p-3 bg-green-100 text-green-900 rounded-xl">
          Assigned to Dr. {assignedDoctor.firstName}{" "}
          {assignedDoctor.lastName}.{" "}
          <button
            onClick={() => setActiveTab("consultation")}
            className="ml-2 underline text-blue-700"
          >
            Go to Consultation →
          </button>
        </div>
      )}
    </div>
  );
};

export default PredictionContent;
