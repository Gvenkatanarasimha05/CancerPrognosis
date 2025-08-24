import React, { useEffect, useState } from 'react';
import { Calendar, Brain, FileText, TrendingUp } from 'lucide-react';
import API from '../../../../api/api';

interface Profile {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    role: 'patient' | 'doctor' | string;
  };
  dateOfBirth?: string;
  gender?: string;
  phone?: string;
  emergencyContact?: string;
  medicalHistory?: string[];
  allergies?: string[];
  aiPredictions?: AIPrediction[];
  history?: HistoryEntry[];
  reports?: Report[];
  upcomingAppointments?: Appointment[];
  assignedDoctor?: {
    firstName: string;
    lastName: string;
    specialization: string;
    hospital: string;
  };
}

interface AIPrediction {
  disease: string;
  probability: number;
  date: string;
}

interface HistoryEntry {
  title: string;
  description: string;
  date: string;
}

interface Report {
  doctor: string;
  specialty: string;
  report: string;
  date: string;
}

interface Appointment {
  _id: string;
  doctor: {
    firstName: string;
    lastName: string;
    specialization: string;
    hospital: string;
  };
  date: string;
  type: string;
  status: string;
}

const OverviewContent: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get('/patient/data');
        if (res.data && res.data.data) setProfile(res.data.data);
      } catch (err) {
        console.error('❌ Failed to load profile', err);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <p>Loading overview...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Merge activities for timeline
  const activities = [
    ...(profile?.aiPredictions?.map(p => ({
      type: 'AI Prediction',
      description: `${p.disease} (${(p.probability * 100).toFixed(1)}%)`,
      date: new Date(p.date),
      color: 'bg-orange-500'
    })) || []),
    ...(profile?.history?.map(h => ({
      type: 'History',
      description: `${h.title}: ${h.description}`,
      date: new Date(h.date),
      color: 'bg-blue-500'
    })) || []),
    ...(profile?.reports?.map(r => ({
      type: 'Report',
      description: `${r.doctor} (${r.specialty}) - ${r.report}`,
      date: new Date(r.date),
      color: 'bg-purple-500'
    })) || [])
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {profile?.user?.firstName || 'Patient'} {profile?.user?.lastName || ''}
        </h2>
        <p className="text-gray-600">Here's your health overview at a glance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Health Score</p>
              <p className="text-3xl font-bold text-blue-900">8.5/10</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Last Checkup</p>
              <p className="text-lg font-semibold text-green-900">2 weeks ago</p>
            </div>
            <Calendar className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-orange-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium">Predictions</p>
              <p className="text-lg font-semibold text-orange-900">
                {profile?.aiPredictions?.length || 0} Active
              </p>
            </div>
            <Brain className="h-8 w-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Reports</p>
              <p className="text-lg font-semibold text-purple-900">
                {profile?.reports?.length || 0} Total
              </p>
            </div>
            <FileText className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {activities.length ? (
              activities.map((act, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <div className={`w-2 h-2 ${act.color} rounded-full`}></div>
                  <span className="text-sm text-gray-600">{act.description}</span>
                  <span className="text-xs text-gray-400">{act.date.toLocaleDateString()}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No recent activities</p>
            )}
          </div>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {profile?.upcomingAppointments?.length ? (
              profile.upcomingAppointments.map((app) => (
                <div key={app._id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="font-medium text-gray-900">
                    Dr. {app.doctor.firstName} {app.doctor.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{app.type} ({app.doctor.specialization})</p>
                  <p className="text-xs text-gray-400">{new Date(app.date).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No upcoming appointments</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewContent;
