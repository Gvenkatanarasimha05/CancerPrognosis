import React, { useEffect, useState } from "react";
import axios from "axios";
import { AlertTriangle, Clock, CheckCircle2 } from "lucide-react";

interface Appointment {
  _id: string;
  patientId: string;
  patientName: string;
  reason: string;
  startTime: string;
  endTime: string;
  date: string;
  status?: string;
}

interface AssignedPatient {
  _id: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

const AppointmentsTab: React.FC<{ onStartConsultation: (patientId: string) => void }> = ({
  onStartConsultation,
}) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [assignedPatients, setAssignedPatients] = useState<AssignedPatient[]>([]);
  const [completedAppointments, setCompletedAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const loadAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/doctor/appointments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(res.data.data || []);
    } catch {}
  };

  const loadAssignedPatients = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/doctor/assigned", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssignedPatients(res.data.data || []);
    } catch {}
  };

  const loadCompletedAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/doctor/appointments/completed", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCompletedAppointments(res.data.data || []);
    } catch {}
  };

  const handleStart = (patientId: string) => {
    onStartConsultation(patientId);
  };

  const loadAll = () => {
    Promise.all([
      loadAppointments(),
      loadAssignedPatients(),
      loadCompletedAppointments(),
    ]).finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAll();
    const refresh = () => loadAll();
    window.addEventListener("data-updated", refresh);
    return () => window.removeEventListener("data-updated", refresh);
  }, []);

  const today = new Date().toISOString().slice(0, 10);

  const todaysAppointments: Appointment[] = [
    ...appointments.filter((a) => a.date === today),
    ...assignedPatients.map((p) => ({
      _id: `assigned-${p._id}`,
      patientId: p._id,
      patientName: `${p.user.firstName} ${p.user.lastName}`,
      reason: "Assigned Patient",
      startTime: "-",
      endTime: "-",
      date: today,
    })),
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Appointment Management</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">
              Today's Appointments & Assigned Patients
            </h3>

            {todaysAppointments.length === 0 ? (
              <p className="text-gray-500">No appointments today.</p>
            ) : (
              todaysAppointments.map((a) => (
                <div
                  key={a._id}
                  className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg mb-3 border-l-4 border-blue-500"
                >
                  <Clock className="h-5 w-5 text-blue-600" />

                  <div className="flex-1">
                    <h4 className="font-medium">{a.patientName}</h4>
                    <p className="text-sm">{a.reason}</p>
                    <p className="text-xs text-gray-500">
                      {a.startTime} - {a.endTime}
                    </p>
                  </div>

                  <button
                    onClick={() => handleStart(a.patientId)}
                    className="bg-blue-600 text-white px-3 py-2 rounded text-sm"
                  >
                    Start
                  </button>
                </div>
              ))
            )}
          </section>

          <section className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Completed Appointments</h3>

            {completedAppointments.length === 0 ? (
              <p className="text-gray-500">No completed appointments yet.</p>
            ) : (
              completedAppointments.map((a) => (
                <div
                  key={a._id}
                  className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg mb-3 border-l-4 border-green-500"
                >
                  <CheckCircle2 className="h-5 w-5 text-green-600" />

                  <div className="flex-1">
                    <h4 className="font-medium">{a.patientName}</h4>
                    <p className="text-xs text-gray-500">{a.date}</p>
                  </div>
                </div>
              ))
            )}
          </section>
        </div>

        <div className="space-y-6">
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Overview</h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Completed Appointments</span>
                <span className="font-semibold">{completedAppointments.length}</span>
              </div>

              <div className="flex justify-between">
                <span>Assigned Patients</span>
                <span className="font-semibold">{assignedPatients.length}</span>
              </div>

              <div className="flex justify-between">
                <span>Total Appointments</span>
                <span className="font-semibold">{appointments.length}</span>
              </div>
            </div>
          </div>

          <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-6 w-6 text-teal-600" />
              <div>
                <h3 className="font-semibold text-teal-900">Appointment Reminders</h3>
                <p className="text-sm text-teal-700">
                  Reminders will be sent 24 hours & 1 hour before appointments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsTab;
