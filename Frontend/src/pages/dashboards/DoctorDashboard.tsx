// DoctorDashboard.tsx
import React, { useState } from 'react';
import { Users, FileText, MessageSquare, Calendar, Activity, User } from 'lucide-react';
import OverviewTab from './doctor/tabs/OverviewTab';
import PatientsTab from './doctor/tabs/PatientsTab';
import ConsultationsTab from './doctor/tabs/ConsultationsTab';
import ReportsTab from './doctor/tabs/ReportsTab';
import AppointmentsTab from './doctor/tabs/AppointmentsTab';
import ProfileTab from './doctor/tabs/ProfileTab';

const DoctorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Activity },
    { id: 'patients', name: 'Patients', icon: Users },
    { id: 'consultations', name: 'Consultations', icon: MessageSquare },
    { id: 'reports', name: 'Reports', icon: FileText },
    { id: 'appointments', name: 'Appointments', icon: Calendar },
    { id: 'profile', name: 'Profile', icon: User },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewTab />;
      case 'patients': return <PatientsTab />;
      case 'consultations': return <ConsultationsTab />;
      case 'reports': return <ReportsTab />;
      case 'appointments': return <AppointmentsTab />;
      case 'profile': return <ProfileTab />;
      default: return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-6 px-6" aria-label="Tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-2 border-b-2 text-sm font-medium ${
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

          {/* Tab Content */}
          <div className="p-6">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
