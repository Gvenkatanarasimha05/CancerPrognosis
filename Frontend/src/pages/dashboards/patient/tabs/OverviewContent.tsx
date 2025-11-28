import React, { useEffect, useState } from 'react';
import { Calendar, Brain, FileText, TrendingUp } from 'lucide-react';
import API from '../../../../api/api';

interface Profile {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
  dateOfBirth?: string;
  gender?: string;
  phone?: string;
  medicalHistory?: string[];
  allergies?: string[];
  aiPredictions?: AIPrediction[];
  history?: HistoryEntry[];
  reports?: Report[];
  upcomingAppointments?: Appointment[];
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

  // -------------------------------
  // Safe date convert helper
  // -------------------------------
  const safeDate = (d: any) => {
    const dt = new Date(d);
    return isNaN(dt.getTime()) ? null : dt;
  };

 // HEALTH SCORE
  
  const calculateHealthScore = () => {
    let base = 10;

    const latestPred = profile?.aiPredictions?.slice(-1)[0];
    if (latestPred) {
      if (latestPred.probability > 0.8) base -= 4;
      else if (latestPred.probability > 0.5) base -= 2;
      else base -= 1;
    }

    if (profile?.medicalHistory?.length)
      base -= Math.min(profile.medicalHistory.length, 3);

    if (profile?.allergies?.length)
      base -= Math.min(profile.allergies.length, 2);

    return Math.max(2, Math.min(base, 10));
  };

  const healthScore = calculateHealthScore().toFixed(1);

 // checkup
  const getLastCheckup = () => {
    const dates: any[] = [];

    profile?.upcomingAppointments?.forEach((a) => dates.push(safeDate(a.date)));
    profile?.aiPredictions?.forEach((p) => dates.push(safeDate(p.date)));
    profile?.reports?.forEach((r) => dates.push(safeDate(r.date)));

    const validDates = dates.filter((d) => d !== null);

    if (!validDates.length) return 'No record';

    const latest = validDates.sort((a, b) => b.getTime() - a.getTime())[0];

    const diffDays = Math.floor(
      (Date.now() - latest.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';

    return `${diffDays} days ago`;
  };

  const lastCheckup = getLastCheckup();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {profile?.user?.firstName} 👋
        </h2>
        <p className="text-gray-600">
          Here’s your latest health overview.
        </p>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Health Score */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Health Score</p>
              <p className="text-3xl font-bold text-blue-900">{healthScore}/10</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        {/* Last Checkup */}
        <div className="bg-green-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Last Checkup</p>
              <p className="text-lg font-semibold text-green-900">
                {lastCheckup}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-green-600" />
          </div>
        </div>

        {/* Predictions Count */}
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

        {/* Reports Count */}
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

      {/* Upcoming Appointments Only */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Upcoming Appointments
        </h3>

        <div className="space-y-3 max-h-80 overflow-y-auto">
          {profile?.upcomingAppointments?.length ? (
            profile.upcomingAppointments.map((app) => (
              <div
                key={app._id}
                className="border-l-4 border-blue-500 pl-4 py-2"
              >
                <p className="font-medium text-gray-900">
                  Dr. {app.doctor.firstName} {app.doctor.lastName}
                </p>

                <p className="text-sm text-gray-600">
                  {app.type} ({app.doctor.specialization})
                </p>

                <p className="text-xs text-gray-400">
                  {new Date(app.date).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No upcoming appointments</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OverviewContent;
