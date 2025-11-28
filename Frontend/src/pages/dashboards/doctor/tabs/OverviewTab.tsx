import React, { useEffect, useState } from "react";
import { Users, Calendar, CheckCircle, FileText, Clock } from "lucide-react";
import API from "../../../../api/api";

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  specialization?: string;
}

interface Appointment {
  patientName: string;
  startTime: string;
  endTime: string;
}

interface Activity {
  text: string;
  timeAgo: string;
  color: string;
}

const OverviewTab: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activePatients, setActivePatients] = useState(0);
  const [todaysAppointments, setTodaysAppointments] = useState<Appointment[]>([]);
  const [completedToday, setCompletedToday] = useState(0);
  const [pendingReviews, setPendingReviews] = useState(0);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      const profileRes = await API.get("/doctor/profile");
      setProfile(profileRes.data.data);

      const patientsRes = await API.get("/doctor/assigned");
      setActivePatients(patientsRes.data.data.length);

      const todayRes = await API.get("/doctor/appointments/today");
      setTodaysAppointments(todayRes.data.data);

      const completedRes = await API.get("/doctor/appointments/completed");
      setCompletedToday(completedRes.data.count);

      const pending = patientsRes.data.data.filter(
        (p: any) => !p.consultation || !p.consultation.notes
      ).length;
      setPendingReviews(pending);

      const autoActivities: Activity[] = todayRes.data.data.map((a: any) => ({
        text: `Upcoming appointment with ${a.patientName}`,
        timeAgo: "Today",
        color: "#3b82f6",
      }));

      setActivities(autoActivities);
    } catch {
      setError("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
    const refresh = () => loadDashboard();
    window.addEventListener("data-updated", refresh);
    return () => window.removeEventListener("data-updated", refresh);
  }, []);

  if (loading) return <p>Loading overview...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, Dr. {profile?.firstName} {profile?.lastName}!
        </h2>
        <p className="text-gray-600">Here’s your practice overview for today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-teal-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-600 text-sm font-medium">Active Patients</p>
              <p className="text-3xl font-bold text-teal-900">{activePatients}</p>
            </div>
            <Users className="h-8 w-8 text-teal-600" />
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Today's Appointments</p>
              <p className="text-3xl font-bold text-blue-900">{todaysAppointments.length}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Completed Today</p>
              <p className="text-3xl font-bold text-green-900">{completedToday}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-orange-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium">Pending Reviews</p>
              <p className="text-3xl font-bold text-orange-900">{pendingReviews}</p>
            </div>
            <FileText className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
          <div className="space-y-3">
            {todaysAppointments.length > 0 ? (
              todaysAppointments.map((appt, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">{appt.patientName}</p>
                    <p className="text-sm text-gray-600">
                      {appt.startTime} - {appt.endTime}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No appointments for today.</p>
            )}
          </div>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Patient Activities</h3>
          <div className="space-y-3">
            {activities.length > 0 ? (
              activities.map((act, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: act.color }}></div>
                  <span className="text-sm text-gray-600">{act.text}</span>
                  <span className="text-xs text-gray-400 ml-auto">{act.timeAgo}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No recent activity.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
