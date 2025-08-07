import React, { useState } from 'react';
import { 
  Users, 
  FileText, 
  MessageSquare, 
  Calendar, 
  Activity,
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const DoctorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Activity },
    { id: 'patients', name: 'Patients', icon: Users },
    { id: 'consultations', name: 'Consultations', icon: MessageSquare },
    { id: 'reports', name: 'Medical Reports', icon: FileText },
    { id: 'appointments', name: 'Appointments', icon: Calendar },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewContent />;
      case 'patients':
        return <PatientsContent />;
      case 'consultations':
        return <ConsultationsContent />;
      case 'reports':
        return <ReportsContent />;
      case 'appointments':
        return <AppointmentsContent />;
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
                        ? 'border-teal-500 text-teal-600'
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
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, Dr. Johnson!</h2>
      <p className="text-gray-600">Here's your practice overview for today.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-teal-50 p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-teal-600 text-sm font-medium">Active Patients</p>
            <p className="text-3xl font-bold text-teal-900">47</p>
          </div>
          <Users className="h-8 w-8 text-teal-600" />
        </div>
      </div>
      <div className="bg-blue-50 p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-600 text-sm font-medium">Today's Appointments</p>
            <p className="text-3xl font-bold text-blue-900">8</p>
          </div>
          <Calendar className="h-8 w-8 text-blue-600" />
        </div>
      </div>
      <div className="bg-green-50 p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-600 text-sm font-medium">Completed Today</p>
            <p className="text-3xl font-bold text-green-900">12</p>
          </div>
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
      </div>
      <div className="bg-orange-50 p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-600 text-sm font-medium">Pending Reviews</p>
            <p className="text-3xl font-bold text-orange-900">5</p>
          </div>
          <FileText className="h-8 w-8 text-orange-600" />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <Clock className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium text-gray-900">John Doe - Follow-up</p>
              <p className="text-sm text-gray-600">9:00 AM - 9:30 AM</p>
            </div>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs ml-auto">Next</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Clock className="h-5 w-5 text-gray-600" />
            <div>
              <p className="font-medium text-gray-900">Sarah Smith - Consultation</p>
              <p className="text-sm text-gray-600">10:00 AM - 10:45 AM</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Clock className="h-5 w-5 text-gray-600" />
            <div>
              <p className="font-medium text-gray-900">Michael Johnson - Check-up</p>
              <p className="text-sm text-gray-600">11:00 AM - 11:30 AM</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Patient Activities</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">New patient registration - Emily Davis</span>
            <span className="text-xs text-gray-400 ml-auto">1 hour ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Lab results uploaded - John Doe</span>
            <span className="text-xs text-gray-400 ml-auto">2 hours ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Appointment rescheduled - Sarah Smith</span>
            <span className="text-xs text-gray-400 ml-auto">3 hours ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Consultation completed - Michael Brown</span>
            <span className="text-xs text-gray-400 ml-auto">4 hours ago</span>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-teal-900">Patient Feedback Summary</h3>
          <p className="text-teal-700">Average rating: 4.8/5 stars based on recent consultations</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-teal-900">4.8★</p>
          <p className="text-sm text-teal-600">23 reviews this month</p>
        </div>
      </div>
    </div>
  </div>
);

const PatientsContent: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-900">Patient Management</h2>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search patients..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Active Patients</h3>
          </div>
          <div className="divide-y divide-gray-200">
            <div className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                    <span className="text-teal-600 font-medium">JD</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">John Doe</h4>
                    <p className="text-sm text-gray-600">ID: P001 • Age: 34 • Male</p>
                    <p className="text-xs text-gray-500">Last visit: Feb 28, 2024</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Stable</span>
                  <button className="text-teal-600 hover:text-teal-800">
                    <FileText className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium">SS</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Sarah Smith</h4>
                    <p className="text-sm text-gray-600">ID: P002 • Age: 28 • Female</p>
                    <p className="text-xs text-gray-500">Last visit: Feb 25, 2024</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Follow-up</span>
                  <button className="text-teal-600 hover:text-teal-800">
                    <FileText className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-medium">MJ</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Michael Johnson</h4>
                    <p className="text-sm text-gray-600">ID: P003 • Age: 45 • Male</p>
                    <p className="text-xs text-gray-500">Last visit: Feb 20, 2024</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">Critical</span>
                  <button className="text-teal-600 hover:text-teal-800">
                    <FileText className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Patients</span>
              <span className="font-semibold text-gray-900">47</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">New This Month</span>
              <span className="font-semibold text-green-600">+8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Critical Cases</span>
              <span className="font-semibold text-red-600">3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Follow-ups Due</span>
              <span className="font-semibold text-yellow-600">12</span>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
              View All Lab Results
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
              Schedule Follow-ups
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
              Export Patient List
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ConsultationsContent: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Consultation Management</h2>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Consultations</h3>
        <div className="space-y-4">
          <div className="border rounded-lg p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">John Doe</h4>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">In Progress</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Chest pain evaluation - Follow-up consultation</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Started: 9:00 AM</span>
              <button className="text-blue-600 hover:text-blue-800">Continue</button>
            </div>
          </div>
          <div className="border rounded-lg p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Sarah Smith</h4>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Pending</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Routine checkup - New patient consultation</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Scheduled: 10:00 AM</span>
              <button className="text-blue-600 hover:text-blue-800">Start</button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Consultation History</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-900">Michael Johnson</p>
              <p className="text-sm text-gray-600">Hypertension management</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Feb 20</p>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Completed</span>
            </div>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-900">Emily Davis</p>
              <p className="text-sm text-gray-600">Diabetes consultation</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Feb 18</p>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Communication</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Recent Messages</h4>
          <div className="space-y-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">John Doe</span>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
              <p className="text-sm text-gray-700">"Doctor, I'm still experiencing some chest discomfort..."</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">Sarah Smith</span>
                <span className="text-xs text-gray-500">5 hours ago</span>
              </div>
              <p className="text-sm text-gray-700">"Thank you for the prescription. When should I schedule follow-up?"</p>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Quick Response</h4>
          <textarea 
            placeholder="Type your message here..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <div className="flex justify-between items-center mt-3">
            <select className="border border-gray-300 rounded px-3 py-1 text-sm">
              <option>Select Patient</option>
              <option>John Doe</option>
              <option>Sarah Smith</option>
            </select>
            <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ReportsContent: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Medical Reports</h2>
    
    <div className="bg-white border rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">
          Create New Report
        </button>
      </div>
      <div className="divide-y divide-gray-200">
        <div className="px-6 py-4 hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">John Doe - Consultation Report</h4>
              <p className="text-sm text-gray-600">Follow-up for chest pain evaluation</p>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-xs text-gray-500">Created: Feb 28, 2024</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Completed</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-blue-600 hover:text-blue-800">
                <FileText className="h-4 w-4" />
              </button>
              <button className="text-gray-600 hover:text-gray-800">
                <MessageSquare className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Sarah Smith - Initial Assessment</h4>
              <p className="text-sm text-gray-600">New patient consultation and health evaluation</p>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-xs text-gray-500">Created: Feb 25, 2024</span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Draft</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-blue-600 hover:text-blue-800">
                <FileText className="h-4 w-4" />
              </button>
              <button className="text-gray-600 hover:text-gray-800">
                <MessageSquare className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Michael Johnson - Treatment Plan</h4>
              <p className="text-sm text-gray-600">Hypertension management and medication adjustment</p>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-xs text-gray-500">Created: Feb 20, 2024</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Completed</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-blue-600 hover:text-blue-800">
                <FileText className="h-4 w-4" />
              </button>
              <button className="text-gray-600 hover:text-gray-800">
                <MessageSquare className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Templates</h3>
        <div className="space-y-3">
          <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
            <h4 className="font-medium text-gray-900">Consultation Report</h4>
            <p className="text-sm text-gray-600">Standard patient consultation template</p>
          </button>
          <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
            <h4 className="font-medium text-gray-900">Treatment Plan</h4>
            <p className="text-sm text-gray-600">Comprehensive treatment planning template</p>
          </button>
          <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
            <h4 className="font-medium text-gray-900">Follow-up Report</h4>
            <p className="text-sm text-gray-600">Progress evaluation and follow-up template</p>
          </button>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Analytics</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Reports This Month</span>
            <span className="font-semibold text-gray-900">23</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Completed</span>
            <span className="font-semibold text-green-600">18</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">In Progress</span>
            <span className="font-semibold text-yellow-600">3</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Pending Review</span>
            <span className="font-semibold text-blue-600">2</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AppointmentsContent: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-900">Appointment Management</h2>
      <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">
        Schedule Appointment
      </button>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Appointments</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <Clock className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">John Doe</h4>
                <p className="text-sm text-gray-600">Follow-up consultation</p>
                <p className="text-xs text-gray-500">9:00 AM - 9:30 AM</p>
              </div>
              <div className="flex space-x-2">
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                  Start
                </button>
                <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50">
                  Reschedule
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300">
              <Clock className="h-5 w-5 text-gray-600" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Sarah Smith</h4>
                <p className="text-sm text-gray-600">Initial consultation</p>
                <p className="text-xs text-gray-500">10:00 AM - 10:45 AM</p>
              </div>
              <div className="flex space-x-2">
                <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50">
                  View Details
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300">
              <Clock className="h-5 w-5 text-gray-600" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Michael Johnson</h4>
                <p className="text-sm text-gray-600">Routine check-up</p>
                <p className="text-xs text-gray-500">11:00 AM - 11:30 AM</p>
              </div>
              <div className="flex space-x-2">
                <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Today</span>
              <span className="font-semibold text-blue-600">8 appointments</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Tomorrow</span>
              <span className="font-semibold text-gray-900">6 appointments</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">This Week</span>
              <span className="font-semibold text-gray-900">32 appointments</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Pending Confirmations</span>
              <span className="font-semibold text-yellow-600">4</span>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
              Block Time Slot
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
              View Weekly Schedule
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
              Export Calendar
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
              Appointment History
            </button>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-lg p-6">
      <div className="flex items-center space-x-3">
        <AlertTriangle className="h-6 w-6 text-teal-600" />
        <div>
          <h3 className="font-semibold text-teal-900">Appointment Reminders</h3>
          <p className="text-teal-700 text-sm">
            Automatic reminders will be sent to patients 24 hours and 1 hour before their appointments.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default DoctorDashboard;