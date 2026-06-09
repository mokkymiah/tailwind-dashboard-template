import React, { useState, useMemo } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Banner from "../partials/Banner";
import {
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Filter,
  User,
} from "lucide-react";

// 1. Dynamic Data Generator (100 items)
const generateMockAlerts = (count) => {
  const assets = [
    "Property",
    "Resident",
    "Compliance",
    "Maintenance",
    "Safeguarding",
  ];
  const severities = ["Low", "Medium", "High", "Critical"];
  const staff = [
    "Sarah J.",
    "Mike T.",
    "Elena R.",
    "System Admin",
    "Unassigned",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    text: `${assets[i % 5]} Alert #${1000 + i}: ${assets[i % 5]} sector intervention required.`,
    severity: severities[i % 4],
    source: assets[i % 5],
    assignedTo: staff[i % 5],
    acknowledged: Math.random() > 0.7,
    time: `${Math.floor(Math.random() * 24)}h ago`,
  }));
};

const MOCK_ALERTS = generateMockAlerts(100);

function Alerts() {
  const [alerts, setAlerts] = useState(MOCK_ALERTS);

  const toggleAcknowledge = (id) => {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, acknowledged: !a.acknowledged } : a,
      ),
    );
  };

  const getSeverityStyle = (severity) => {
    switch (severity) {
      case "Critical":
        return "text-red-700 bg-red-100 border-red-200";
      case "High":
        return "text-amber-700 bg-amber-100 border-amber-200";
      case "Medium":
        return "text-blue-700 bg-blue-100 border-blue-200";
      default:
        return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar sidebarOpen={false} setSidebarOpen={() => {}} />
      <div className="relative flex flex-col flex-1 overflow-hidden">
        <Header sidebarOpen={false} setSidebarOpen={() => {}} />
        <main className="grow flex flex-col overflow-hidden p-8 max-w-7xl mx-auto w-full">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <ShieldAlert className="text-teal-600" /> Global Asset Alerts
            </h1>
            <p className="text-sm text-gray-500">
              Managing company-wide operational events.
            </p>
          </div>

          {/* Scrollable Container */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex-1 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b sticky top-0">
                <tr className="text-left text-gray-500 uppercase text-[10px] tracking-wider">
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Alert Description</th>
                  <th className="px-6 py-4">Severity</th>
                  <th className="px-6 py-4">Assigned To</th>
                  <th className="px-6 py-4 text-right">Workflow</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {alerts.map((a) => (
                  <tr
                    key={a.id}
                    className={a.acknowledged ? "opacity-50" : "bg-white"}
                  >
                    <td className="px-6 py-4">
                      {a.acknowledged ? (
                        <CheckCircle2 className="text-green-500" size={18} />
                      ) : (
                        <div className="w-4 h-4 rounded-full bg-teal-500 animate-pulse" />
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {a.text}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-md text-[10px] font-bold border ${getSeverityStyle(a.severity)}`}
                      >
                        {a.severity.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                      <User size={14} /> {a.assignedTo}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => toggleAcknowledge(a.id)}
                        className="text-teal-600 hover:text-teal-800 font-bold"
                      >
                        {a.acknowledged ? "Re-open" : "Acknowledge"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
        <Banner />
      </div>
    </div>
  );
}

export default Alerts;
