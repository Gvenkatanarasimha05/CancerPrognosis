import React, { useEffect, useState } from "react";
import axios from "axios";

interface Doctor {
  _id: string;
  firstName: string;
  lastName: string;
  specialization: string;
  phone?: string;
}

interface QA {
  question: string;
  answer: string;
}

interface Report {
  patientName: string;
  riskLevel: string;
  message?: string;
  answers?: QA[];
  consultationReport?: string;
  medications?: string;
}

const DoctorConsultation: React.FC = () => {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAssignedDoctor = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:4000/api/patient/assigned-doctor", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDoctor(res.data.data || null);
    } catch (error) {
      console.error("Error fetching doctor:", error);
    }
  };

  const fetchConsultation = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:4000/api/patient/consultation", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const d = res.data.data;
      if (!d) return;

      const formatted: Report = {
        patientName: d.patientName,
        riskLevel: d.riskLevel || d.prediction || "Unknown",
        message: d.message,
        answers: d.answers || [],
        consultationReport: d.consultationReport || "",
        medications: d.medications || ""
      };

      setReport(formatted);
    } catch (error) {
      console.error("Error fetching consultation:", error);
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchAssignedDoctor();
      await fetchConsultation();
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <div>Loading consultation...</div>;

  if (!doctor) {
    return (
      <div className="p-6 text-center border rounded-lg bg-red-50 text-red-600">
        No doctor assigned yet.
        <br />
        Please complete AI Prediction to get a doctor assigned.
      </div>
    );
  }

  const whatsappMsg = encodeURIComponent(
    `Hello Doctor ${doctor.firstName}, I am your patient. I would like to discuss my consultation report.`
  );

  return (
    <div className="space-y-6">
      <section className="p-4 border rounded bg-blue-50">
        <h2 className="text-xl font-bold text-gray-900">Your Assigned Doctor</h2>
        <p className="text-gray-700 mt-1">
          Dr. <b>{doctor.firstName} {doctor.lastName}</b>
        </p>
        <p className="text-gray-600">
          Specialization: <b>{doctor.specialization}</b>
        </p>

        {doctor.phone && (
          <div className="mt-4">
            <a
              href={`https://wa.me/${doctor.phone}?text=${whatsappMsg}`}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full shadow-md transition"
              title="Chat on WhatsApp"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="22"
                height="22"
              >
                <path d="M20.52 3.48A11.78 11.78 0 0012 0a11.82 11.82 0 00-8.4 3.48A11.78 11.78 0 000 12a11.6 11.6 0 001.62 6.06L0 24l6.12-1.6A11.9 11.9 0 0012 24a11.82 11.82 0 008.4-3.48A11.78 11.78 0 0024 12a11.82 11.82 0 00-3.48-8.52zM12 22a9.93 9.93 0 01-5.12-1.44l-.36-.2-3.64.96 1-3.52-.24-.36A10.13 10.13 0 012 12a10.06 10.06 0 013-7.2A10.13 10.13 0 0112 2a10 10 0 017.2 3 10.13 10.13 0 013 7.2 10.06 10.06 0 01-3 7.2A10 10 0 0112 22zm5.28-7.4c-.28-.14-1.64-.8-1.9-.9s-.44-.14-.62.14-.72.9-.88 1.08-.32.2-.6.06a8.13 8.13 0 01-2.4-1.48 9 9 0 01-1.68-2.12c-.18-.32 0-.48.14-.62.14-.14.32-.36.46-.54s.2-.32.32-.54a.57.57 0 000-.54c-.06-.14-.62-1.48-.86-2-.22-.52-.46-.46-.62-.46h-.54a1 1 0 00-.72.34 3 3 0 00-.94 2.26 5.2 5.2 0 001.1 2.8 11.87 11.87 0 004.12 3.78 12.65 12.65 0 003.7 1.38 3.2 3.2 0 002.08-.34 2.7 2.7 0 001.12-1.68c.14-.32.14-.58.1-.64s-.24-.1-.52-.24z" />
              </svg>
            </a>
          </div>
        )}
      </section>

      {!report && (
        <div className="p-4 border rounded bg-yellow-50 text-gray-700">
          Your doctor has not added any consultation notes yet.
        </div>
      )}

      {report && (
        <>
          <section className="p-4 border rounded bg-gray-50">
            <h3 className="font-semibold">AI Risk Evaluation</h3>
            <p className="text-lg font-bold mt-1">
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
            </p>
            <p className="text-gray-700 mt-2">
              <b>AI Message:</b> {report.message}
            </p>
          </section>

          <section className="p-4 border rounded bg-gray-50">
            <h3 className="font-semibold mb-2">Your Submitted Answers</h3>
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
              <p className="text-gray-600">No answers recorded.</p>
            )}
          </section>

          <section className="p-4 border rounded bg-gray-50">
            <h3 className="font-semibold mb-2">Doctor’s Notes</h3>
            <p className="whitespace-pre-line text-gray-800">
              {report.consultationReport || "Doctor has not added any notes."}
            </p>

            <h3 className="font-semibold mt-4 mb-2">Medications</h3>
            <p className="whitespace-pre-line text-gray-800">
              {report.medications || "No medications added yet."}
            </p>
          </section>
        </>
      )}
    </div>
  );
};

export default DoctorConsultation;
