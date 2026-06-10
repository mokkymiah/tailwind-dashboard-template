import React, { useState, useMemo } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Banner from "../partials/Banner";
import {
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Filter,
  Search,
  User,
  Clock,
  Building2,
  Bell,
  X,
  ChevronDown,
  Eye,
  EyeOff,
} from "lucide-react";

const generateMockAlerts = (count) => {
  const assets = ["Property", "Resident", "Compliance", "Maintenance", "Safeguarding"];
  const severities = ["Low", "Medium", "High", "Critical"];
  const staff = ["Sarah J.", "Mike T.", "Elena R.", "System Admin", "Unassigned"];
  const properties = ["Oak Lodge", "Maple House", "Cedar Court", "Willow Pavilion", "Rowan Terraces", "Ashford Mews", "Beechwood House"];
  const sourceTexts = {
    Property: [
      "Unauthorised access attempt detected at main entrance",
      "Communal area cleaning overdue by 3 days",
      "Fire door inspection failed at Block A",
      "Noise complaint logged for Room 204",
      "Property inspection due within 7 days",
    ],
    Resident: [
      "Support session missed — resident unwell",
      "Rent arrears exceeding 4 weeks",
      "Housing benefit claim suspended",
      "Resident requested room transfer",
      "Safeguarding concern raised by neighbour",
    ],
    Compliance: [
      "Gas safety certificate overdue",
      "EICR inspection required within 30 days",
      "Fire risk assessment renewal pending",
      "PAT testing date exceeded by 2 months",
      "HMO licence renewal application due",
    ],
    Maintenance: [
      "Boiler fault reported — no heating in Block B",
      "Emergency leak in communal kitchen",
      "Electrical fault in Room 105",
      "Lift inspection overdue by 1 week",
      "Damp and mould reported in 3 rooms",
    ],
    Safeguarding: [
      "Safeguarding incident report filed",
      "Vulnerable resident welfare check requested",
      "Allegation received — investigation pending",
      "Anti-social behaviour complaint escalated",
      "Missing resident — last seen 48 hours ago",
    ],
  };

  return Array.from({ length: count }, (_, i) => {
    const source = assets[i % 5];
    const texts = sourceTexts[source];
    return {
      id: i + 1,
      text: texts[i % texts.length],
      severity: severities[i % 4],
      source,
      property: properties[i % properties.length],
      assignedTo: staff[i % 5],
      acknowledged: Math.random() > 0.7,
      time: `${Math.floor(Math.random() * 72)}h ago`,
      timestamp: `2026-06-${String((i % 28) + 1).padStart(2, "0")}T${String(8 + (i % 10)).padStart(2, "0")}:${String((i * 7) % 60).padStart(2, "0")}:00`,
    };
  });
};

const MOCK_ALERTS = generateMockAlerts(100);

function Alerts() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [alerts, setAlerts] = useState(MOCK_ALERTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [showAcknowledged, setShowAcknowledged] = useState(false);

  const toggleAcknowledge = (id) => {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, acknowledged: !a.acknowledged } : a,
      ),
    );
  };

  const clearAcknowledged = () => {
    setAlerts((prev) => prev.filter((a) => !a.acknowledged));
  };

  const filteredAlerts = useMemo(() => {
    return alerts.filter((a) => {
      if (!showAcknowledged && a.acknowledged) return false;
      const matchesSearch =
        a.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSource = sourceFilter === "All" || a.source === sourceFilter;
      const matchesSeverity =
        severityFilter === "All" || a.severity === severityFilter;
      return matchesSearch && matchesSource && matchesSeverity;
    });
  }, [alerts, searchTerm, sourceFilter, severityFilter, showAcknowledged]);

  const counts = useMemo(() => {
    return {
      total: alerts.length,
      critical: alerts.filter((a) => a.severity === "Critical" && !a.acknowledged).length,
      high: alerts.filter((a) => a.severity === "High" && !a.acknowledged).length,
      unacknowledged: alerts.filter((a) => !a.acknowledged).length,
      property: alerts.filter((a) => a.source === "Property" && !a.acknowledged).length,
      compliance: alerts.filter((a) => a.source === "Compliance" && !a.acknowledged).length,
    };
  }, [alerts]);

  const getSeverityStyle = (severity) => {
    switch (severity) {
      case "Critical":
        return "text-red-700 bg-red-100 border-red-200 dark:text-red-400 dark:bg-red-950/30 dark:border-red-900";
      case "High":
        return "text-amber-700 bg-amber-100 border-amber-200 dark:text-amber-400 dark:bg-amber-950/30 dark:border-amber-900";
      case "Medium":
        return "text-blue-700 bg-blue-100 border-blue-200 dark:text-blue-400 dark:bg-blue-950/30 dark:border-blue-900";
      default:
        return "text-gray-600 bg-gray-100 border-gray-200 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-700";
    }
  };

  const getSourceIcon = (source) => {
    switch (source) {
      case "Property":
        return <Building2 size={14} className="text-violet-500" />;
      case "Resident":
        return <User size={14} className="text-cyan-500" />;
      case "Compliance":
        return <ShieldAlert size={14} className="text-emerald-500" />;
      case "Maintenance":
        return <WrenchIcon size={14} className="text-blue-500" />;
      case "Safeguarding":
        return <AlertTriangle size={14} className="text-rose-500" />;
      default:
        return <Bell size={14} className="text-gray-400" />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 dark:bg-gray-900">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold flex items-center gap-2.5">
                  <Bell className="text-teal-600" /> Global Alert Engine
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Real-time operational alerts across properties, compliance,
                  maintenance and safeguarding.
                </p>
              </div>
            </div>

            {/* KPI Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
              {[
                { label: "Total Alerts", value: counts.total, color: "text-gray-900 dark:text-white", bg: "bg-gray-50 dark:bg-gray-700" },
                { label: "Unacknowledged", value: counts.unacknowledged, color: "text-teal-600", bg: "bg-teal-50 dark:bg-teal-950/20" },
                { label: "Critical", value: counts.critical, color: "text-red-600", bg: "bg-red-50 dark:bg-red-950/20" },
                { label: "High Priority", value: counts.high, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950/20" },
                { label: "Property", value: counts.property, color: "text-violet-600", bg: "bg-violet-50 dark:bg-violet-950/20" },
                { label: "Compliance", value: counts.compliance, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/20" },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 p-3 border rounded-xl shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">{stat.label}</span>
                    <span className={`text-xl font-black font-mono mt-0.5 block ${stat.color}`}>{stat.value}</span>
                  </div>
                  <div className={`p-2 rounded-lg ${stat.bg}`}>
                    <Bell size={16} className="text-gray-400" />
                  </div>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-xs mb-6 border border-gray-100 dark:border-gray-700 flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="relative w-full lg:w-72">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search alerts by text, property, assignee..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700/40 border-gray-200 dark:border-gray-600 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-gray-200"
                />
              </div>
              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end text-xs font-medium">
                <div className="flex items-center gap-1.5">
                  <Filter className="h-3.5 w-3.5 text-gray-400" />
                  <select
                    value={sourceFilter}
                    onChange={(e) => setSourceFilter(e.target.value)}
                    className="bg-gray-50 dark:bg-gray-700/50 border rounded-lg py-1.5 px-2.5 text-gray-700 dark:text-gray-200 focus:outline-none"
                  >
                    <option value="All">All Sources</option>
                    <option value="Property">Property</option>
                    <option value="Resident">Resident</option>
                    <option value="Compliance">Compliance</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Safeguarding">Safeguarding</option>
                  </select>
                </div>
                <select
                  value={severityFilter}
                  onChange={(e) => setSeverityFilter(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-700/50 border rounded-lg py-1.5 px-2.5 text-gray-700 dark:text-gray-200 focus:outline-none"
                >
                  <option value="All">All Severities</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                {filteredAlerts.length < alerts.length && (
                  <span className="text-[10px] text-gray-400 font-mono">
                    {filteredAlerts.length} of {alerts.length}
                  </span>
                )}
              </div>
            </div>

            {/* Toggle Controls */}
            <div className="flex items-center justify-between mb-3 px-1">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Active Alerts ({filteredAlerts.length})
              </h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowAcknowledged(!showAcknowledged)}
                  className={`flex items-center gap-1.5 text-[10px] font-medium px-2.5 py-1 rounded-lg border transition ${
                    showAcknowledged
                      ? "bg-teal-50 border-teal-200 text-teal-700 dark:bg-teal-950/20 dark:border-teal-800 dark:text-teal-400"
                      : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500"
                  }`}
                >
                  {showAcknowledged ? <Eye size={12} /> : <EyeOff size={12} />}
                  {showAcknowledged ? "Showing All" : "Unacknowledged Only"}
                </button>
                <button
                  onClick={clearAcknowledged}
                  className="flex items-center gap-1.5 text-[10px] font-medium px-2.5 py-1 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-rose-600 hover:border-rose-200 transition"
                >
                  <X size={12} /> Clear Ack'd
                </button>
              </div>
            </div>

            {/* Alerts Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="overflow-x-auto max-h-[520px] overflow-y-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-50 dark:bg-gray-700/30 border-b dark:border-gray-700 sticky top-0">
                    <tr className="text-left text-gray-400 uppercase text-[9px] tracking-wider font-bold">
                      <th className="px-4 py-3 w-10">Status</th>
                      <th className="px-4 py-3">Alert Description</th>
                      <th className="px-4 py-3">Source</th>
                      <th className="px-4 py-3">Property</th>
                      <th className="px-4 py-3">Severity</th>
                      <th className="px-4 py-3">Assigned To</th>
                      <th className="px-4 py-3">Time</th>
                      <th className="px-4 py-3 text-right w-24">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
                    {filteredAlerts.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-4 py-12 text-center text-gray-400 italic">
                          <CheckCircle2 size={28} className="mx-auto mb-2 text-emerald-500" />
                          No alerts match your current filters.
                        </td>
                      </tr>
                    ) : (
                      filteredAlerts.map((a) => (
                        <tr
                          key={a.id}
                          className={`hover:bg-gray-50/60 dark:hover:bg-gray-700/20 transition ${
                            a.acknowledged ? "opacity-40" : ""
                          }`}
                        >
                          <td className="px-4 py-3">
                            {a.acknowledged ? (
                              <CheckCircle2 className="text-green-500" size={16} />
                            ) : (
                              <div className="w-3 h-3 rounded-full bg-teal-500 animate-pulse" />
                            )}
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-900 dark:text-white max-w-xs truncate">
                            {a.text}
                          </td>
                          <td className="px-4 py-3">
                            <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                              {getSourceIcon(a.source)}
                              {a.source}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-500 dark:text-gray-400 font-mono text-[10px]">
                            {a.property}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[9px] font-bold border ${getSeverityStyle(a.severity)}`}
                            >
                              {a.severity.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
                            <User size={12} /> {a.assignedTo}
                          </td>
                          <td className="px-4 py-3 text-gray-400 font-mono text-[10px] flex items-center gap-1">
                            <Clock size={10} /> {a.time}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button
                              onClick={() => toggleAcknowledge(a.id)}
                              className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition border ${
                                a.acknowledged
                                  ? "text-gray-400 border-gray-200 dark:border-gray-700 hover:text-gray-600"
                                  : "text-teal-600 border-teal-200 dark:border-teal-900 hover:bg-teal-50 dark:hover:bg-teal-950/20"
                              }`}
                            >
                              {a.acknowledged ? "Re-open" : "Acknowledge"}
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
        <Banner />
      </div>
    </div>
  );
}

function WrenchIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

export default Alerts;
