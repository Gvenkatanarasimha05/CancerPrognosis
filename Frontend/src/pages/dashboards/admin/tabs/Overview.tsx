import React from 'react';
import { Users, Shield,TrendingUp,Activity,BarChart3} from 'lucide-react';

const Overview: React.FC = () => {
  return (
    <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
      <p className="text-gray-600">System overview and key metrics at a glance.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-purple-50 p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-600 text-sm font-medium">Total Users</p>
            <p className="text-3xl font-bold text-purple-900">3</p>
          </div>
          <Users className="h-8 w-8 text-purple-600" />
        </div>
        <div className="mt-2 flex items-center text-sm">
          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
          <span className="text-green-600">+10%</span>
          <span className="text-gray-500 ml-1">this month</span>
        </div>
      </div>
      <div className="bg-blue-50 p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-600 text-sm font-medium">Active Doctors</p>
            <p className="text-3xl font-bold text-blue-900">1</p>
          </div>
          <Shield className="h-8 w-8 text-blue-600" />
        </div>
        <div className="mt-2 flex items-center text-sm">
          <span className="text-gray-500">3 pending approvals</span>
        </div>
      </div>
      <div className="bg-green-50 p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-600 text-sm font-medium">System Uptime</p>
            <p className="text-3xl font-bold text-green-900">99.9%</p>
          </div>
          <Activity className="h-8 w-8 text-green-600" />
        </div>
        <div className="mt-2 flex items-center text-sm">
          <span className="text-gray-500">Last 30 days</span>
        </div>
      </div>
      <div className="bg-orange-50 p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-600 text-sm font-medium">Active Sessions</p>
            <p className="text-3xl font-bold text-orange-900">10</p>
          </div>
          <BarChart3 className="h-8 w-8 text-orange-600" />
        </div>
        <div className="mt-2 flex items-center text-sm">
          <span className="text-gray-500">Current online users</span>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">New doctor registration - Dr. Sarah Williams</span>
            <span className="text-xs text-gray-400 ml-auto">2 min ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Patient account verified - John Smith</span>
            <span className="text-xs text-gray-400 ml-auto">5 min ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600">System maintenance scheduled</span>
            <span className="text-xs text-gray-400 ml-auto">10 min ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Security alert - Multiple login attempts</span>
            <span className="text-xs text-gray-400 ml-auto">15 min ago</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600">Server Performance</span>
              <span className="text-sm font-medium text-green-600">Excellent</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{width: '95%'}}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600">Database Performance</span>
              <span className="text-sm font-medium text-blue-600">Good</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{width: '87%'}}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600">API Response Time</span>
              <span className="text-sm font-medium text-yellow-600">Average</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-600 h-2 rounded-full" style={{width: '72%'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Overview;
