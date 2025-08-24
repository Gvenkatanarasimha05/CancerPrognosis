// DoctorConsultation.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Report {
  _id: string;
  patientName: string;
  disease: string;
  probability: number;
  riskLevel: string;
  stage: string;
  files?: string[];
  consultationReport?: string;
  medications?: string;
}

const DoctorConsultation: React.FC = () => {
  const { reportId } = useParams();
  const [report, setReport] = useState<Report | null>(null);
  const [notes, setNotes] = useState('');
  const [meds, setMeds] = useState('');

  const fetchReport = async () => {
    try {
      const res = await axios.get(`/api/reports/${reportId}`);
      setReport(res.data.data); // backend should return report under data
      setNotes(res.data.data.consultationReport || '');
      setMeds(res.data.data.medications || '');
    } catch (err) {
      console.error('Error fetching report:', err);
    }
  };

  useEffect(() => {
    if (reportId) fetchReport();
  }, [reportId]);

  const submitConsultation = async () => {
    try {
      await axios.post(`/api/reports/${reportId}/consultation`, {
        consultationReport: notes,
        medications: meds,
      });
      alert('Consultation saved and patient notified.');
      fetchReport(); // Refresh data
    } catch (err) {
      console.error('Error submitting consultation:', err);
      alert('Failed to save consultation.');
    }
  };

  if (!report) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        Consultation - {report.patientName}
      </h2>

      {/* AI Prediction */}
      <section className="p-4 border rounded mb-4">
        <h4 className="font-semibold mb-2">AI Prediction</h4>
        <div>Disease: {report.disease}</div>
        <div>Probability: {(report.probability * 100).toFixed(2)}%</div>
        <div>Risk: {report.riskLevel}</div>
        <div>Stage: {report.stage}</div>
      </section>

      {/* Patient Files */}
      <section className="p-4 border rounded mb-4">
        <h4 className="font-semibold mb-2">Patient Files</h4>
        {report.files && report.files.length > 0 ? (
          report.files.map((f, i) => (
            <div key={i}>
              <a href={f} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                {f.split('/').pop()}
              </a>
            </div>
          ))
        ) : (
          <p>No files uploaded.</p>
        )}
      </section>

      {/* Consultation Notes */}
      <section className="p-4 border rounded mb-4">
        <h4 className="font-semibold mb-2">Write Consultation Notes</h4>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={6}
          className="w-full p-2 border rounded mb-2"
        />
        <h4 className="font-semibold mb-2">Medications</h4>
        <textarea
          value={meds}
          onChange={(e) => setMeds(e.target.value)}
          rows={3}
          className="w-full p-2 border rounded"
        />
        <div className="mt-3">
          <button
            onClick={submitConsultation}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </section>

      {/* Video Conference Placeholder */}
      <section className="p-4 border rounded">
        <h4 className="font-semibold mb-2">Video Conference</h4>
        <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-500">
          Video conference area (Jitsi / Zoom iframe can be added here)
        </div>
      </section>
    </div>
  );
};

export default DoctorConsultation;
