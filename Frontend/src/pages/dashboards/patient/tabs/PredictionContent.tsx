import React, { useState, useEffect } from "react";
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

const symptomQuestions = [
  "Please describe your symptoms:",
  "How long have you had these symptoms?",
  "Do you have any family history of cancer?",
  "Do you smoke or consume alcohol?",
];

const PredictionContent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<string>("");
  const [riskLevel, setRiskLevel] = useState<string>("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [showDoctors, setShowDoctors] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [assignedDoctor, setAssignedDoctor] = useState<Doctor | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);

  // Fetch patient profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/patient/me");
        setProfile(res.data.data || res.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchProfile();
  }, []);

  // File Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setMessages((prev) => [
        ...prev,
        { sender: "system", text: `📂 File uploaded: ${e.target.files[0].name}` },
      ]);
    }
  };

  // Analyze answers to decide risk
  const analyzeRisk = (answers: string[]): { level: string; msg: string } => {
    const allText = answers.join(" ").toLowerCase();
    if (allText.includes("lump")) {
      return {
        level: "high",
        msg: "⚠️ High Risk detected. Please consult a doctor immediately.\n\nDoctor Suggestions:\n- Schedule an appointment\n- Prepare medical history\n- Avoid self-medication",
      };
    } else if (allText.includes("skin")) {
      return {
        level: "moderate",
        msg: "🟠 Moderate Risk detected.\n\nRecommended:\n- Maintain a healthy diet\n- Avoid smoking/alcohol\n- Follow proper medications\n- Regular exercise",
      };
    } else if (allText.includes("cough")) {
      return {
        level: "low",
        msg: "🟢 Low Risk detected. No immediate danger, but stay cautious and attend regular check-ups.",
      };
    }
    return {
      level: "unknown",
      msg: "ℹ️ Unable to determine risk clearly. Please provide more detailed symptoms or consult a doctor.",
    };
  };

  // Send answer
  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setAnswers((prev) => [...prev, input]);
    setInput("");

    if (step < symptomQuestions.length - 1) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: "system", text: symptomQuestions[step + 1] },
        ]);
      }, 600);
      setStep(step + 1);
    } else {
      setLoading(true);
      setTimeout(() => {
        const outcome = analyzeRisk([...answers, input]);
        setPrediction(outcome.msg);
        setRiskLevel(outcome.level);
        setMessages((prev) => [...prev, { sender: "system", text: outcome.msg }]);
        setLoading(false);
      }, 1500);
    }
  };

  // Reset for new prediction
  const handleNewPrediction = () => {
    setMessages([]);
    setInput("");
    setStep(0);
    setFile(null);
    setPrediction("");
    setRiskLevel("");
    setAnswers([]);
    setAssignedDoctor(null);
  };

  // Download PDF
  const handleDownloadPDF = () => {
    if (!prediction) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Patient Prediction Report", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text(
      `Patient Name: ${profile?.firstName || "N/A"} ${profile?.lastName || ""}`,
      20,
      40
    );
    if (profile?.phone) doc.text(`Phone No: ${profile.phone}`, 20, 50);
    if (profile?.gender) doc.text(`Gender: ${profile.gender}`, 20, 60);
    doc.text(`Uploaded File: ${file?.name || "N/A"}`, 20, 80);

    answers.forEach((ans, idx) => {
      doc.text(`Q${idx + 1}: ${symptomQuestions[idx]}`, 20, 90 + idx * 15);
      doc.text(`A${idx + 1}: ${ans}`, 25, 95 + idx * 15);
    });

    doc.text("Prediction / Risk Analysis:", 20, 100 + answers.length * 15);
    const lines = doc.splitTextToSize(prediction, 170);
    doc.text(lines, 20, 110 + answers.length * 15);
    doc.save("Patient_Report.pdf");
  };

  // Fetch doctors
  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/doctor/doctors");
      setDoctors(res.data.data || res.data);
      setShowDoctors(true);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  };

  // Assign doctor
const handleAssignDoctor = async (doc: any) => {
  try {
    const token = localStorage.getItem("token"); // patient's token
    if (!token) return alert("You must be logged in");

    const res = await axios.post(
      "http://localhost:4000/api/patient/assign-doctor",
      { doctorId: doc._id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data.success) {
      alert(`Doctor ${doc.firstName} ${doc.lastName} assigned successfully!`);
      // Optionally update local state to show assigned doctor immediately
      setAssignedDoctor(doc);
    } else {
      alert(res.data.message || "Failed to assign doctor");
    }
  } catch (err: any) {
    console.error("Error assigning doctor:", err);
    alert(err.response?.data?.message || "Server error");
  }
};




  return (
    <div className="flex flex-col h-full w-full bg-white rounded-xl shadow-md p-4">
      {/* Chat area */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 p-2 border rounded-md bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-xl text-sm max-w-[75%] whitespace-pre-line ${
                msg.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-xl bg-gray-200 text-gray-900 flex items-center space-x-2">
              <Loader className="animate-spin w-4 h-4" /> <span>Analyzing...</span>
            </div>
          </div>
        )}
      </div>

      {/* File Upload */}
      <div className="flex items-center space-x-2 mb-2">
        <label className="cursor-pointer flex items-center bg-gray-200 px-3 py-2 rounded-xl hover:bg-gray-300">
          <Upload className="w-4 h-4 mr-2" />
          <span>{file ? file.name : "Upload Report"}</span>
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>
      </div>

      {/* Input + Buttons */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder={step === 0 ? symptomQuestions[0] : "Type your answer..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 flex items-center"
        >
          <Send className="w-4 h-4 mr-1" /> Send
        </button>

        {prediction && (
          <>
            <button
              onClick={handleDownloadPDF}
              className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 flex items-center"
            >
              <Download className="w-4 h-4 mr-1" /> Download PDF
            </button>

            <button
              onClick={handleNewPrediction}
              className="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600 flex items-center"
            >
              <Brain className="w-4 h-4 mr-1" /> New Prediction
            </button>
          </>
        )}
      </div>

      {/* Doctor Consultation */}
      {riskLevel === "high" && !assignedDoctor && (
        <div className="mt-4">
          <button
            onClick={fetchDoctors}
            className="w-full bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 flex items-center justify-center"
          >
            <Stethoscope className="w-4 h-4 mr-2" /> Consult a Doctor
          </button>
        </div>
      )}

      {/* Doctor Selection Modal */}
      {showDoctors && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Available Doctors</h2>
              <button onClick={() => setShowDoctors(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            {doctors.length === 0 ? (
              <p>No doctors available.</p>
            ) : (
              <div className="space-y-2">
                {doctors.map((doc) => (
                  <div
                    key={doc._id}
                    className="flex justify-between items-center p-3 bg-gray-100 rounded-lg"
                  >
                    <span>
                      {doc.firstName} {doc.lastName} - <i>{doc.specialization}</i>
                    </span>
                    <button
                      onClick={() => handleAssignDoctor(doc)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 flex items-center"
                    >
                      <Check className="w-4 h-4 mr-1" /> Assign
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Assigned Doctor */}
      {assignedDoctor && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-xl flex justify-between items-center">
          <span>
            ✅ You are now connected with{" "}
            <b>
              {assignedDoctor.firstName} {assignedDoctor.lastName}
            </b>{" "}
            ({assignedDoctor.specialization}).
          </span>
          <a
            href="/doctor-consultation"
            className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
          >
            Go to Consultation
          </a>
        </div>
      )}
    </div>
  );
};

export default PredictionContent;
