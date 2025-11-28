import React, { useEffect, useState } from "react";
import axios from "axios";

interface QA {
  question: string;
  answer: string;
}

interface Report {
  _id?: string;
  appointmentId?: string;
  patientName: string;
  riskLevel: string;
  answers?: QA[];
  consultationReport?: string;
  medications?: string;
  phone?: string;
}

const ConsultationsTab: React.FC<{ patientId: string }> = ({ patientId }) => {
  const [report, setReport] = useState<Report | null>(null);
  const [notes, setNotes] = useState("");
  const [meds, setMeds] = useState("");
  const [loading, setLoading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(false);

  const token = localStorage.getItem("token");

  const fetchConsultation = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/doctor/consultation", {
        params: { patientId },
        headers: { Authorization: `Bearer ${token}` },
      });

      const data: Report = res.data.data;
      setReport(data);

      if (!data.consultationReport && !data.medications) {
        setIsFirstTime(true);
        setNotes("");
        setMeds("");
      } else {
        setIsFirstTime(false);
        setNotes(data.consultationReport || "");
        setMeds(data.medications || "");
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultation();
  }, [patientId]);

  const handleSave = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/doctor/consultation/update",
        {
          patientId,
          consultationReport: notes,
          medications: meds,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(isFirstTime ? "Consultation saved." : "Consultation updated.");
      setIsFirstTime(false);
    } catch {
      alert("Failed to save consultation.");
    }
  };

  const handleComplete = async () => {
    try {
      const appointmentId = report?.appointmentId || report?._id;

      if (!appointmentId) {
        alert("Appointment ID missing");
        return;
      }

      await axios.post(
        `http://localhost:4000/api/appointments/${appointmentId}/complete`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Appointment marked as completed.");
      window.dispatchEvent(new Event("data-updated"));
    } catch {
      alert("Failed to mark as completed.");
    }
  };

  if (loading || !report) return <div>Loading consultation...</div>;

  const whatsappMessage = encodeURIComponent(
    `Hello ${report.patientName},\n\nI would like to discuss your consultation.\n\n- Doctor`
  );

  const whatsappURL = `https://wa.me/${report.phone || ""}?text=${whatsappMessage}`;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        Consultation - {report.patientName}
      </h2>

      <section className="p-4 border rounded bg-gray-50">
        <h4 className="font-semibold mb-2">AI Risk Analysis</h4>
        <div className="text-lg font-bold">
          Risk Level:{" "}
          <span
            className={
              report.riskLevel.toLowerCase() === "high"
                ? "text-red-600"
                : report.riskLevel.toLowerCase() === "medium"
                ? "text-yellow-600"
                : "text-green-600"
            }
          >
            {report.riskLevel}
          </span>
        </div>
      </section>

      <section className="p-4 border rounded bg-gray-50">
        <h4 className="font-semibold mb-2">Patient Answers</h4>

        {report.answers?.length ? (
          <ul className="list-disc ml-6 text-sm text-gray-700">
            {report.answers.map((qa, idx) => (
              <li key={idx} className="mb-2">
                <b>{qa.question}</b>
                <br />
                Answer: {qa.answer}
              </li>
            ))}
          </ul>
        ) : (
          <p>No answers recorded.</p>
        )}
      </section>

      <section className="p-4 border rounded bg-white">
        <h4 className="font-semibold mb-2">Consultation Notes</h4>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={5}
          className="w-full p-2 border rounded mb-3"
        />

        <h4 className="font-semibold mb-2">Medications</h4>
        <textarea
          value={meds}
          onChange={(e) => setMeds(e.target.value)}
          rows={4}
          className="w-full p-2 border rounded mb-3"
        />

        <div className="flex space-x-4">
          <button
            onClick={handleSave}
            className={`px-4 py-2 text-white rounded ${
              isFirstTime ? "bg-blue-600" : "bg-green-600"
            } hover:opacity-90`}
          >
            {isFirstTime ? "Done" : "Update"}
          </button>

          <button
            onClick={handleComplete}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Completed
          </button>
        </div>
      </section>

      <section className="p-4 border rounded bg-green-50">
        <h4 className="font-semibold mb-2">Contact Patient</h4>
        <a
          href={whatsappURL}
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 inline-block"
        >
          Message on WhatsApp
        </a>
      </section>
    </div>
  );
};

export default ConsultationsTab;
