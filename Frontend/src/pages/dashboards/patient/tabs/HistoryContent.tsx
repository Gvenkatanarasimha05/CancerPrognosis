
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FileText, ChevronDown, ChevronUp, Download } from "lucide-react";
import { jsPDF } from "jspdf";

const HistoryContent: React.FC = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:4000/api/patient/reports",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setReports(res.data.reports || []);
      } catch (err) {
        console.error("Error fetching reports:", err);
      }
    };

    fetchReports();
  }, []);

  // ⭐ FIXED PDF DOWNLOAD WITH QUESTION + ANSWER
  const downloadPDF = (rep: any, index: number) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("AI Prediction Report", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Prediction: ${rep.report.prediction}`, 20, 40);
    doc.text(`Message: ${rep.report.message}`, 20, 50);
    doc.text(`Date: ${new Date(rep.date).toLocaleString()}`, 20, 60);

    doc.text("Answers:", 20, 80);

    rep.report.answers.forEach((qa: any, idx: number) => {
      doc.text(
        `${idx + 1}. ${qa.question}: ${qa.answer}`,
        25,
        90 + idx * 8
      );
    });

    doc.save(`AI_Report_${index + 1}.pdf`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Medical History</h2>

      <div className="bg-white border rounded-lg overflow-hidden shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Past AI Prediction Reports
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {reports.length === 0 && (
            <p className="text-gray-500 p-6">No reports available</p>
          )}

          {reports.map((rep, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="px-6 py-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      AI Report #{index + 1}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {new Date(rep.date).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        rep.report.prediction === "High"
                          ? "bg-red-100 text-red-800"
                          : rep.report.prediction === "Low"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {rep.report.prediction}
                    </span>

                    <button
                      onClick={() => downloadPDF(rep, index)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Download className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      {isOpen ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* COLLAPSIBLE DETAILS */}
                {isOpen && (
                  <div className="mt-3 pl-3 border-l">
                    <p className="text-gray-700">
                      <b>Message:</b> {rep.report.message}
                    </p>

                    <p className="text-gray-700 mt-2 mb-1">
                      <b>Answers Provided:</b>
                    </p>

                    <ul className="list-disc ml-6 text-sm text-gray-700">
                      {rep.report.answers.map(
                        (qa: any, idx: number) => (
                          <li key={idx}>
                            <b>{qa.question}</b>: {qa.answer}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HistoryContent;
