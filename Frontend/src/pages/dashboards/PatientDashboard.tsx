import React, { useState } from 'react';
import { 
  User, FileText, Brain, Activity, Heart 
} from 'lucide-react';

import OverviewContent from './patient/tabs/OverviewContent';
import ProfileContent from './patient/tabs/ProfileContent';
import PredictionContent from './patient/tabs/PredictionContent';
import DoctorConsultation from './patient/tabs/DoctorConsultation';
import HistoryContent from './patient/tabs/HistoryContent';

const tabs = [
  { id: 'overview', name: 'Overview', icon: Activity },
  { id: 'prediction', name: 'AI Prediction', icon: Brain },
  { id: 'consultation', name: 'Doctor Consultation', icon: Heart },
  { id: 'history', name: 'Medical History', icon: FileText },
  { id: 'profile', name: 'Profile', icon: User },
];

const tabComponents = {
  overview: OverviewContent,
  profile: ProfileContent,
  history: HistoryContent,
  prediction: PredictionContent,
  consultation: DoctorConsultation,
};

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const ActiveTabComponent = tabComponents[activeTab];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
      <div className="max-w-7xl mx-auto flex-1 flex flex-col w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm flex flex-col flex-1 overflow-hidden">
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

          <div className={`flex-1 overflow-hidden ${activeTab === 'prediction' ? 'p-0 flex flex-col' : 'p-6'}`}>
            <ActiveTabComponent setActiveTab={setActiveTab} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
