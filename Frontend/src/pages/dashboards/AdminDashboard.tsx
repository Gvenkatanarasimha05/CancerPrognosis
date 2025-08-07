import React, { useState } from 'react';
import { 
  Users, 
  Shield, 
  Activity, 
  BarChart3, 
  Settings,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  UserCheck,
  UserX
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'approvals', name: 'Doctor Approvals', icon: Shield },
    { id: 'activity', name: 'Activity Logs', icon: Activity },
    { id: 'monitoring', name: 'System Monitor', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewContent />;
      case 'users':
        return <UserManagementContent />;
      case 'approvals':
        return <DoctorApprovalsContent />;
      case 'activity':
        return <ActivityLogsContent />;
      case 'monitoring':
        return <SystemMonitorContent />;
      default:
        return <OverviewContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

const OverviewContent: React.FC = () => (
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
            <p className="text-3xl font-bold text-purple-900">2,847</p>
          </div>
          <Users className="h-8 w-8 text-purple-600" />
        </div>
        <div className="mt-2 flex items-center text-sm">
          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
          <span className="text-green-600">+12%</span>
          <span className="text-gray-500 ml-1">this month</span>
        </div>
      </div>
      <div className="bg-blue-50 p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-600 text-sm font-medium">Active Doctors</p>
            <p className="text-3xl font-bold text-blue-900">127</p>
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
            <p className="text-3xl font-bold text-orange-900">1,234</p>
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

const UserManagementContent: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search users..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="bg-white border rounded-lg p-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">2,847</div>
          <div className="text-sm text-gray-600">Total Users</div>
        </div>
      </div>
      <div className="bg-white border rounded-lg p-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">2,693</div>
          <div className="text-sm text-gray-600">Patients</div>
        </div>
      </div>
      <div className="bg-white border rounded-lg p-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-teal-600">127</div>
          <div className="text-sm text-gray-600">Doctors</div>
        </div>
      </div>
      <div className="bg-white border rounded-lg p-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">27</div>
          <div className="text-sm text-gray-600">Admins</div>
        </div>
      </div>
    </div>

    <div className="bg-white border rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent User Registrations</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium">JS</span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">John Smith</div>
                    <div className="text-sm text-gray-500">john.smith@example.com</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  Patient
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Mar 1, 2024
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                <button className="text-red-600 hover:text-red-900">Block</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                    <span className="text-teal-600 font-medium">SW</span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">Dr. Sarah Williams</div>
                    <div className="text-sm text-gray-500">sarah.williams@hospital.com</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-teal-100 text-teal-800">
                  Doctor
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  Pending
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Mar 1, 2024
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-green-600 hover:text-green-900 mr-3">Approve</button>
                <button className="text-red-600 hover:text-red-900">Reject</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-medium">MD</span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">Mike Davis</div>
                    <div className="text-sm text-gray-500">mike.davis@example.com</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  Patient
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Feb 28, 2024
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                <button className="text-red-600 hover:text-red-900">Block</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const DoctorApprovalsContent: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-900">Doctor Approvals</h2>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Pending:</span>
        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">3</span>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-white border rounded-lg p-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600">3</div>
          <div className="text-sm text-gray-600">Pending Approvals</div>
        </div>
      </div>
      <div className="bg-white border rounded-lg p-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">127</div>
          <div className="text-sm text-gray-600">Approved Doctors</div>
        </div>
      </div>
      <div className="bg-white border rounded-lg p-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">8</div>
          <div className="text-sm text-gray-600">Rejected Applications</div>
        </div>
      </div>
    </div>

    <div className="space-y-6">
      {/* Pending Approvals */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Doctor Applications</h3>
        <div className="space-y-4">
          <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-teal-600 font-medium">SW</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Dr. Sarah Williams</h4>
                  <p className="text-sm text-gray-600">sarah.williams@hospital.com</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-gray-500"><strong>License:</strong> MD-12345-NY</p>
                    <p className="text-xs text-gray-500"><strong>Specialization:</strong> Cardiology</p>
                    <p className="text-xs text-gray-500"><strong>Experience:</strong> 8 years</p>
                    <p className="text-xs text-gray-500"><strong>Hospital:</strong> New York Presbyterian</p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 flex items-center space-x-1">
                  <UserCheck className="h-4 w-4" />
                  <span>Approve</span>
                </button>
                <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 flex items-center space-x-1">
                  <UserX className="h-4 w-4" />
                  <span>Reject</span>
                </button>
                <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50">
                  View Details
                </button>
              </div>
            </div>
          </div>

          <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium">MC</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Dr. Michael Chen</h4>
                  <p className="text-sm text-gray-600">michael.chen@clinic.com</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-gray-500"><strong>License:</strong> MD-67890-CA</p>
                    <p className="text-xs text-gray-500"><strong>Specialization:</strong> Neurology</p>
                    <p className="text-xs text-gray-500"><strong>Experience:</strong> 12 years</p>
                    <p className="text-xs text-gray-500"><strong>Hospital:</strong> UCLA Medical Center</p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 flex items-center space-x-1">
                  <UserCheck className="h-4 w-4" />
                  <span>Approve</span>
                </button>
                <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 flex items-center space-x-1">
                  <UserX className="h-4 w-4" />
                  <span>Reject</span>
                </button>
                <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recently Approved */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recently Approved Doctors</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Dr. Amanda Johnson</p>
                <p className="text-sm text-gray-600">Dermatology - Approved 2 days ago</p>
              </div>
            </div>
            <button className="text-blue-600 hover:text-blue-800 text-sm">View Profile</button>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Dr. Robert Martinez</p>
                <p className="text-sm text-gray-600">Pediatrics - Approved 1 week ago</p>
              </div>
            </div>
            <button className="text-blue-600 hover:text-blue-800 text-sm">View Profile</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ActivityLogsContent: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-900">Activity Logs</h2>
      <div className="flex items-center space-x-4">
        <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
          <option>All Activities</option>
          <option>User Registrations</option>
          <option>Login Activities</option>
          <option>System Events</option>
          <option>Security Events</option>
        </select>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-sm">
          Export Logs
        </button>
      </div>
    </div>

    <div className="bg-white border rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">System Activity</h3>
      </div>
      <div className="divide-y divide-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">New user registration</p>
              <p className="text-sm text-gray-600">John Smith (Patient) created account successfully</p>
              <p className="text-xs text-gray-500">IP: 192.168.1.100 • 2 minutes ago</p>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Activity className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">User login</p>
              <p className="text-sm text-gray-600">Dr. Sarah Johnson logged into the system</p>
              <p className="text-xs text-gray-500">IP: 10.0.1.45 • 5 minutes ago</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Doctor approval pending</p>
              <p className="text-sm text-gray-600">Dr. Michael Chen submitted credentials for review</p>
              <p className="text-xs text-gray-500">License: MD-67890-CA • 10 minutes ago</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="h-4 w-4 text-red-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Security alert</p>
              <p className="text-sm text-gray-600">Multiple failed login attempts detected</p>
              <p className="text-xs text-gray-500">User: suspicious@email.com • IP: 185.220.100.240 • 15 minutes ago</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Settings className="h-4 w-4 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">System maintenance</p>
              <p className="text-sm text-gray-600">Database optimization completed successfully</p>
              <p className="text-xs text-gray-500">Duration: 15 minutes • 1 hour ago</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
              <Shield className="h-4 w-4 text-teal-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Doctor approval</p>
              <p className="text-sm text-gray-600">Dr. Amanda Johnson approved and activated</p>
              <p className="text-xs text-gray-500">Approved by: Admin User • 2 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SystemMonitorContent: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">System Monitoring</h2>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Server Status</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Web Server</span>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-600">Online</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Database Server</span>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-600">Online</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">API Gateway</span>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-600">Online</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">File Storage</span>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm font-medium text-yellow-600">Warning</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600">CPU Usage</span>
              <span className="text-sm font-medium text-gray-900">45%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{width: '45%'}}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600">Memory Usage</span>
              <span className="text-sm font-medium text-gray-900">67%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-orange-600 h-2 rounded-full" style={{width: '67%'}}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600">Disk Usage</span>
              <span className="text-sm font-medium text-gray-900">23%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{width: '23%'}}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600">Network I/O</span>
              <span className="text-sm font-medium text-gray-900">12 MB/s</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{width: '30%'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Database Statistics</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Active Connections</span>
            <span className="font-medium text-gray-900">47</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Queries/sec</span>
            <span className="font-medium text-gray-900">234</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Cache Hit Rate</span>
            <span className="font-medium text-green-600">98.5%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Avg Response Time</span>
            <span className="font-medium text-gray-900">12ms</span>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Status</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Firewall Status</span>
            <span className="font-medium text-green-600">Active</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">SSL Certificate</span>
            <span className="font-medium text-green-600">Valid</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Failed Login Attempts</span>
            <span className="font-medium text-red-600">12 (24h)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Last Security Scan</span>
            <span className="font-medium text-gray-900">2 hours ago</span>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="space-y-2">
          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
            Restart Web Server
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
            Clear Cache
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
            Run Security Scan
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
            Generate Report
          </button>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-6">
      <div className="flex items-center space-x-3">
        <AlertTriangle className="h-6 w-6 text-red-600" />
        <div>
          <h3 className="font-semibold text-red-900">System Alert</h3>
          <p className="text-red-700 text-sm">
            File storage server showing high disk usage (85%). Consider adding more storage capacity.
          </p>
          <button className="mt-2 bg-red-600 text-white px-4 py-1 rounded text-sm hover:bg-red-700">
            View Details
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default AdminDashboard;