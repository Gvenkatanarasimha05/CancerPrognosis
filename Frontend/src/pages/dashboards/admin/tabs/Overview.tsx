import React, { useEffect, useState } from "react";
import { Users, Shield, TrendingUp } from "lucide-react";
import { getAdminStats } from "../../../../api/adminApi"; 

interface Stats {
  totalUsers: number;
  activeDoctors: number;
  pendingDoctors: number;
}

const Overview: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    activeDoctors: 0,
    pendingDoctors: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getAdminStats();
        setStats({
          totalUsers: res.data.total,
          activeDoctors: res.data.doctors,
          pendingDoctors: res.data.pendingDoctors,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
        <p className="text-gray-600">System overview and key metrics at a glance.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Total Users */}
        <div className="bg-purple-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Total Users</p>
              <p className="text-3xl font-bold text-purple-900">{stats.totalUsers}</p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+10%</span>
            <span className="text-gray-500 ml-1">this month</span>
          </div>
        </div>

        {/* Active Doctors */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Active Doctors</p>
              <p className="text-3xl font-bold text-blue-900">{stats.activeDoctors}</p>
            </div>
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-gray-500">{stats.pendingDoctors} pending approvals</span>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">New doctor registration - Dr. Ravi Varama</span>
              <span className="text-xs text-gray-400 ml-auto">10 days ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Patient account verified - Venkat</span>
              <span className="text-xs text-gray-400 ml-auto">20 days ago</span>
            </div>
            
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Server Performance</span>
                <span className="text-sm font-medium text-green-600">Excellent</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Database Performance</span>
                <span className="text-sm font-medium text-blue-600">Good</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">API Response Time</span>
                <span className="text-sm font-medium text-yellow-600">Average</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '72%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
