// inside ConsultationsTab.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Patient {
  _id: string;
  firstName: string;
  lastName: string;
  problem: string;
  assignedDoctor?: string;
  status?: 'pending' | 'in-progress' | 'completed';
}

const ConsultationsTab: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get('/api/doctor/patients');
        setPatients(res.data.data || []);
      } catch (err) {
        console.error('Error fetching patients:', err);
      }
    };
    fetchPatients();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Active Consultations</h2>
      {patients.length === 0 && <p>No active patients assigned.</p>}
      <div className="space-y-4">
        {patients.map((p) => (
          <div key={p._id} className="border rounded p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">{p.firstName} {p.lastName}</p>
              <p className="text-sm text-gray-600">{p.problem}</p>
            </div>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => navigate(`/doctor-consultation/${p._id}`)}
            >
              {p.status === 'in-progress' ? 'Continue' : 'Start'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultationsTab;
