import React, { useState } from "react";
import {
  FileText,
  MessageSquare,
  Calendar,
  Activity,
  User,
} from "lucide-react";

import OverviewTab from "./doctor/tabs/OverviewTab";
import ConsultationsTab from "./doctor/tabs/ConsultationsTab";
import AppointmentsTab from "./doctor/tabs/AppointmentsTab";
import ProfileTab from "./doctor/tabs/ProfileTab";

const DoctorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    null
  );

  const tabs = [
    { id: "overview", name: "Overview", icon: Activity },
    { id: "appointments", name: "Appointments", icon: Calendar },
    { id: "consultations", name: "Consultations", icon: MessageSquare },
    { id: "profile", name: "Profile", icon: User },
  ];

  const renderTab = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;

      case "appointments":
        return (
          <AppointmentsTab
            onStartConsultation={(patientId: string) => {
              setSelectedPatientId(patientId);
              setActiveTab("consultations");
            }}
          />
        );

      case "consultations":
        if (!selectedPatientId) {
          return (
            <div className="text-gray-500">
              Select a patient from Appointments.
            </div>
          );
        }
        return <ConsultationsTab patientId={selectedPatientId} />;

      case "profile":
        return <ProfileTab />;

      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-6 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-2 border-b-2 text-sm font-medium ${
                      activeTab === tab.id
                        ? "border-teal-500 text-teal-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">{renderTab()}</div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
