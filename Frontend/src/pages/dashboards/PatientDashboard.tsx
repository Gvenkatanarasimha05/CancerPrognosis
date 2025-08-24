import React, { useState } from 'react';
import { 
  User, FileText, Brain, Download, Activity, Heart
} from 'lucide-react';

// Import your content components
import OverviewContent from './patient/tabs/OverviewContent';
import ProfileContent from './patient/tabs/ProfileContent';
import PredictionContent from './patient/tabs/PredictionContent';
import DoctorConsultation from './patient/tabs/DoctorConsultation';
import HistoryContent from './patient/tabs/HistoryContent';
import DataContent from './patient/tabs/DataContent';

const tabs = [
  { id: 'overview', name: 'Overview', icon: Activity },
  { id: 'prediction', name: 'AI Prediction', icon: Brain },
  { id: 'consultation', name: 'Doctor Consultation', icon: Heart },
  { id: 'history', name: 'Medical History', icon: FileText },
  { id: 'data', name: 'Manage Data', icon: Download },
  { id: 'profile', name: 'Profile', icon: User },
];

const tabComponents: { [key: string]: React.FC } = {
  overview: OverviewContent,
  profile: ProfileContent,
  history: HistoryContent,
  prediction: PredictionContent,
  consultation: DoctorConsultation,
  data: DataContent,
};

const PatientDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const ActiveTabComponent = tabComponents[activeTab];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="max-w-7xl mx-auto flex-1 flex flex-col w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm flex flex-col flex-1 overflow-hidden">
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

          {/* Content Area */}
          <div className={`flex-1 overflow-hidden ${activeTab === 'prediction' ? 'p-0 flex flex-col' : 'p-6'}`}>
            <ActiveTabComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
