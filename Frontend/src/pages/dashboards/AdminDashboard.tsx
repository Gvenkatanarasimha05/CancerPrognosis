import React, { useState } from "react";
import {
  Users,
  Shield,
  Activity,
  BarChart3,
  Settings,
} from "lucide-react";

// Import your tab components
import Overview from "./admin/tabs/Overview";
import UserManage from "./admin/tabs/UserManage";
import Approvals from "./admin/tabs/Approvals";
import ActivityLogs from "./admin/tabs/ActivityLogs";
import SystemMonitor from "./admin/tabs/SystemMonitor";


const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", name: "Overview", icon: BarChart3 },
    { id: "users", name: "User Management", icon: Users },
    { id: "approvals", name: "Doctor Approvals", icon: Shield },
    { id: "activity", name: "Activity Logs", icon: Activity },
    { id: "monitoring", name: "System Monitor", icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />;
      case "users":
        return <UserManage />;
      case "approvals":
        return <Approvals />;
      case "activity":
        return <ActivityLogs />;
      case "monitoring":
        return <SystemMonitor />;
      default:
        return <Overview />;
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
                        ? "border-purple-500 text-purple-600"
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

          {/* Tab Content */}
          <div className="p-6">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
