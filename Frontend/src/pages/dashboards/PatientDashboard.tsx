import React, { useState } from 'react';
import { 
  User, 
  FileText, 
  Brain, 
  Download, 
  Calendar, 
  Activity,
  Heart,
  TrendingUp,
  Upload,
  AlertCircle
} from 'lucide-react';

const PatientDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Activity },
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'history', name: 'Medical History', icon: FileText },
    { id: 'prediction', name: 'AI Prediction', icon: Brain },
    { id: 'reports', name: 'Doctor Reports', icon: Heart },
    { id: 'data', name: 'Manage Data', icon: Download },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewContent />;
      case 'profile':
        return <ProfileContent />;
      case 'history':
        return <HistoryContent />;
      case 'prediction':
        return <PredictionContent />;
      case 'reports':
        return <ReportsContent />;
      case 'data':
        return <DataContent />;
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
                        ? 'border-blue-500 text-blue-600'
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
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, John!</h2>
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
            <p className="text-lg font-semibold text-orange-900">3 Active</p>
          </div>
          <Brain className="h-8 w-8 text-orange-600" />
        </div>
      </div>
      <div className="bg-purple-50 p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-600 text-sm font-medium">Reports</p>
            <p className="text-lg font-semibold text-purple-900">12 Total</p>
          </div>
          <FileText className="h-8 w-8 text-purple-600" />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">AI prediction completed for chest symptoms</span>
            <span className="text-xs text-gray-400">2 days ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Blood test results uploaded</span>
            <span className="text-xs text-gray-400">1 week ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Consultation with Dr. Smith</span>
            <span className="text-xs text-gray-400">2 weeks ago</span>
          </div>
        </div>
      </div>
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h3>
        <div className="space-y-3">
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <p className="font-medium text-gray-900">Dr. Sarah Johnson</p>
            <p className="text-sm text-gray-600">Cardiology Consultation</p>
            <p className="text-xs text-gray-400">March 15, 2024 at 2:00 PM</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4 py-2">
            <p className="font-medium text-gray-900">Dr. Michael Chen</p>
            <p className="text-sm text-gray-600">General Checkup</p>
            <p className="text-xs text-gray-400">March 22, 2024 at 10:30 AM</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProfileContent: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Personal Profile</h2>
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input type="text" defaultValue="John" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input type="text" defaultValue="Doe" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" defaultValue="john.doe@example.com" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input type="date" defaultValue="1990-05-15" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input type="tel" defaultValue="+1 (555) 123-4567" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
              <input type="tel" defaultValue="+1 (555) 987-6543" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Save Changes
            </button>
          </form>
        </div>
      </div>
      
      <div>
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h3>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <User className="h-12 w-12 text-gray-400" />
            </div>
            <button className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-700">
              Upload Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const HistoryContent: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Medical History</h2>
    
    <div className="bg-white border rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Past Medical Records</h3>
      </div>
      <div className="divide-y divide-gray-200">
        <div className="px-6 py-4 hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Annual Physical Examination</h4>
              <p className="text-sm text-gray-600">Dr. Sarah Johnson - Cardiology</p>
              <p className="text-xs text-gray-400">February 28, 2024</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Normal</span>
              <button className="text-blue-600 hover:text-blue-800">
                <FileText className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Blood Test Results</h4>
              <p className="text-sm text-gray-600">Lab Corp - Complete Metabolic Panel</p>
              <p className="text-xs text-gray-400">January 15, 2024</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Review Needed</span>
              <button className="text-blue-600 hover:text-blue-800">
                <FileText className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Chest X-Ray</h4>
              <p className="text-sm text-gray-600">City Medical Center - Radiology</p>
              <p className="text-xs text-gray-400">December 10, 2023</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Clear</span>
              <button className="text-blue-600 hover:text-blue-800">
                <FileText className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PredictionContent: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-900">AI Health Predictions</h2>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
        <Upload className="h-4 w-4" />
        <span>New Prediction</span>
      </button>
    </div>

    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
      <div className="flex items-start space-x-3">
        <Brain className="h-6 w-6 text-blue-600 mt-1" />
        <div>
          <h3 className="font-semibold text-blue-900">How AI Predictions Work</h3>
          <p className="text-blue-700 text-sm">
            Upload your symptoms and medical reports to get AI-powered health predictions, 
            risk assessments, and personalized recommendations.
          </p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Upload New Data</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Drag and drop your files here</p>
          <p className="text-sm text-gray-500 mb-4">or click to browse</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Choose Files
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Predictions</h3>
        <div className="space-y-3">
          <div className="bg-white border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Respiratory Health Analysis</h4>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Low Risk</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Based on chest symptoms and X-ray</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Confidence: 94%</span>
              <span>2 days ago</span>
            </div>
          </div>
          <div className="bg-white border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Cardiovascular Risk Assessment</h4>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Moderate Risk</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Based on blood work and symptoms</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Confidence: 87%</span>
              <span>1 week ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ReportsContent: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Doctor Reports & Feedback</h2>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest Consultation Report</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <div className="flex items-center space-x-2 mb-2">
              <Heart className="h-5 w-5 text-blue-600" />
              <h4 className="font-medium text-gray-900">Dr. Sarah Johnson</h4>
            </div>
            <p className="text-sm text-gray-600 mb-2">Cardiology Specialist</p>
            <p className="text-sm text-gray-700">
              "Your recent test results show significant improvement. Continue with current 
              medication and maintain regular exercise routine. Next follow-up in 3 months."
            </p>
            <p className="text-xs text-gray-400 mt-2">February 28, 2024</p>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Treatment Recommendations</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Medication Adherence</p>
              <p className="text-xs text-gray-600">Continue current prescription as directed</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Lifestyle Changes</p>
              <p className="text-xs text-gray-600">Increase physical activity to 150 min/week</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Follow-up</p>
              <p className="text-xs text-gray-600">Schedule appointment in 3 months</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white border rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">All Reports</h3>
      </div>
      <div className="divide-y divide-gray-200">
        <div className="px-6 py-4 hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Consultation Report</h4>
              <p className="text-sm text-gray-600">Dr. Sarah Johnson - Cardiology Follow-up</p>
              <p className="text-xs text-gray-400">February 28, 2024</p>
            </div>
            <button className="text-blue-600 hover:text-blue-800">
              <FileText className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="px-6 py-4 hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Treatment Plan Update</h4>
              <p className="text-sm text-gray-600">Dr. Michael Chen - General Practice</p>
              <p className="text-xs text-gray-400">January 20, 2024</p>
            </div>
            <button className="text-blue-600 hover:text-blue-800">
              <FileText className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DataContent: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Manage Your Data</h2>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Data</h3>
        <p className="text-gray-600 mb-4">
          Download your complete medical history and reports in PDF format.
        </p>
        <div className="space-y-3">
          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Download Complete Medical Record</span>
          </button>
          <button className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 flex items-center justify-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Download Recent Reports Only</span>
          </button>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Privacy</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Share data with doctors</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Allow AI analysis</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Receive health tips</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Storage Overview</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Medical Records</span>
          <span className="text-sm font-medium text-gray-900">2.4 GB</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full" style={{width: '24%'}}></div>
        </div>
        <p className="text-xs text-gray-500">2.4 GB of 10 GB used</p>
      </div>
    </div>

    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
      <div className="flex items-start space-x-3">
        <AlertCircle className="h-6 w-6 text-red-600 mt-1" />
        <div>
          <h3 className="font-semibold text-red-900">Danger Zone</h3>
          <p className="text-red-700 text-sm mb-4">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default PatientDashboard;