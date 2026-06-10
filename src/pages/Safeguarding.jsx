import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Banner from "../partials/Banner";
import {
  ShieldAlert,
  Search,
  Filter,
  Plus,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Upload,
  Send,
  FileText,
  X,
  ChevronRight,
  BarChart3,
  Layers,
  Users,
  Eye,
  ArrowUpRight,
} from "lucide-react";

// Robust 40-item mock ledger across diversified compliance frameworks
const INITIAL_INCIDENTS = Array.from({ length: 40 }, (_, i) => {
  const severities = ["High", "Medium", "Low", "Critical"];
  const statuses = ["Open", "Under Investigation", "Resolved", "Escalated"];
  const locations = [
    "Block A - Common Area",
    "Block C - Main Entrance",
    "Facility Perimeter",
    "Site Workspace 2",
    "Block B - Unit Corridor",
  ];

  const events = [
    {
      text: "Property hardware asset malfunction",
      category: "Facilities Health & Safety",
    },
    {
      text: "Unscheduled facility environmental acoustic disturbance",
      category: "Community Compliance",
    },
    {
      text: "Physical infrastructure barrier damage reported",
      category: "Risk Management",
    },
    {
      text: "Contested property boundary compliance dispute",
      category: "Administrative Matrix",
    },
    {
      text: "Health and safety system baseline warning trigger",
      category: "Facilities Health & Safety",
    },
    {
      text: "Interpersonal communication policy variance",
      category: "Well-being Oversight",
    },
  ];

  const targetEvent = events[i % events.length];
  const severityStr = severities[i % severities.length];
  const statusStr = statuses[i % statuses.length];

  // Date calculations extending directly into current 2026 windows
  const day = String((i % 27) + i === 0 ? 1 : (i % 27) + 1).padStart(2, "0");
  const dateStr = i % 3 === 0 ? `2026-06-${day}` : `2026-05-${day}`;

  return {
    id: `INC-${1000 + i}`,
    text: targetEvent.text,
    category: targetEvent.category,
    severity: severityStr,
    status: statusStr,
    date: dateStr,
    time: i % 2 === 0 ? "08:45" : "21:15",
    location: locations[i % locations.length],
    assignedOfficer:
      i % 2 === 0
        ? "Sarah Jenkins (Compliance Lead)"
        : "Marcus Vance (Risk Auditor)",
    narrative: `Comprehensive risk mitigation walkthrough initiated following baseline entry triggers. Structural audit trails have been generated and archived under standard operational frameworks.`,
    evidenceAttached: i % 4 === 0 ? "facility_incident_log_meta.csv" : null,
  };
});

// Mock Analytical Distribution Metrics
const METRICS_SUMMARY = {
  totalOpen: INITIAL_INCIDENTS.filter(
    (i) => i.status === "Open" || i.status === "Under Investigation",
  ).length,
  criticalCount: INITIAL_INCIDENTS.filter(
    (i) => i.severity === "Critical" || i.severity === "High",
  ).length,
  resolutionRate: "92.4%",
  pendingExternalReview: 3,
};

function Safeguarding() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [incidents, setIncidents] = useState(INITIAL_INCIDENTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);

  // Selection Workflow Workspaces
  const [selectedIncident, setSelectedIncident] = useState(
    INITIAL_INCIDENTS[0],
  );
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  // New Incident Entry State
  const [newIncidentForm, setNewIncidentForm] = useState({
    text: "",
    category: "Facilities Health & Safety",
    severity: "Medium",
    location: "",
    narrative: "",
    fileName: "",
  });

  // AI Assistant Chat Logs State
  const [aiChatInput, setAiChatInput] = useState("");
  const [aiMessages, setAiMessages] = useState([
    {
      role: "assistant",
      text: "Welcome to the AI Safeguarding Compliance Advisor. Paste incident details or drafts below, and I will assist you with structuring regulatory definitions and filtering objective terminology.",
    },
  ]);

  // Combined Multi-Filter Engine
  const filteredIncidents = incidents.filter((inc) => {
    const matchesSearch =
      inc.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity =
      severityFilter === "All" || inc.severity === severityFilter;
    const matchesStatus = statusFilter === "All" || inc.status === statusFilter;

    return matchesSearch && matchesSeverity && matchesStatus;
  });

  // Commit Form Action
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const createdIncident = {
      id: `INC-${Date.now().toString().slice(-4)}`,
      text:
        newIncidentForm.text || "Unspecified Environmental Parameter Variance",
      category: newIncidentForm.category,
      severity: newIncidentForm.severity,
      status: "Open",
      date: "2026-06-09",
      time: "11:45",
      location:
        newIncidentForm.location ||
        "Facility Shared Infrastructure Ground Deck",
      assignedOfficer: "Sarah Jenkins (Compliance Lead)",
      narrative:
        newIncidentForm.narrative ||
        "Default structural log submission recorded with baseline category triggers.",
      evidenceAttached: newIncidentForm.fileName || null,
    };

    const updatedData = [createdIncident, ...incidents];
    setIncidents(updatedData);
    setSelectedIncident(createdIncident);
    setIsLogModalOpen(false);

    // Reset Workspace Elements
    setNewIncidentForm({
      text: "",
      category: "Facilities Health & Safety",
      severity: "Medium",
      location: "",
      narrative: "",
      fileName: "",
    });
    setAiMessages([
      {
        role: "assistant",
        text: "Welcome to the AI Safeguarding Compliance Advisor. Paste incident details or drafts below, and I will assist you with structuring regulatory definitions and filtering objective terminology.",
      },
    ]);
  };

  const handleMockFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewIncidentForm({ ...newIncidentForm, fileName: file.name });
      setAiMessages((prev) => [
        ...prev,
        { role: "user", text: `Linked evidence metadata asset: ${file.name}` },
        {
          role: "assistant",
          text: `✨ Metadata file recognized: "${file.name}". \n\n**Incident Framework Analysis:**\n- **Identified Track:** Operational Risk Metrics Framework\n- **Objective Tone Suggestion:** Ensure your descriptions omit emotional phrasing and detail the exact physical timeline. Click 'Apply Compliance Format' above to sync structured corrections.`,
        },
      ]);
    }
  };

  const applyAiFormatting = () => {
    setNewIncidentForm({
      ...newIncidentForm,
      text: "Localized structural access gate mechanical failure",
      narrative:
        "An active structural boundary failure was verified via direct staff walk-through. Automated compliance tracking triggers are functional. Remediation protocols initialized immediately with safety team metrics.",
    });
    setAiMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: "✅ Applied perfectly. Objective corporate terminology maps have been copied to the tracking editor.",
      },
    ]);
  };

  const handleSendAiPrompt = (e) => {
    e.preventDefault();
    if (!aiChatInput.trim()) return;

    const userPrompt = aiChatInput;
    setAiChatInput("");
    setAiMessages((prev) => [...prev, { role: "user", text: userPrompt }]);

    setTimeout(() => {
      setAiMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "This drafting syntax aligns perfectly with statutory accountability benchmarks. Emotional language checked: 0% risk found. You are secure to commit this record.",
        },
      ]);
    }, 450);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar Component Frame */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 dark:bg-gray-900">
        {/* Header Component Frame */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Top Operational Section Header Controls */}
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setIsLogModalOpen(true)}
                className="bg-rose-600 hover:bg-rose-700 text-white font-medium text-sm flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-xs transition duration-150"
              >
                <Plus size={16} />
                <span>Incident</span>
              </button>
            </div>

            {/* Incident KPI Overview Strip Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 p-4 border rounded-xl shadow-3xs flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    Active / Open Incidents
                  </span>
                  <span className="text-2xl font-black font-mono text-rose-600 mt-0.5">
                    {METRICS_SUMMARY.totalOpen}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/20 text-rose-500">
                  <AlertTriangle size={18} />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 border rounded-xl shadow-3xs flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    High & Critical Metrics
                  </span>
                  <span className="text-2xl font-black font-mono text-amber-600 mt-0.5">
                    {METRICS_SUMMARY.criticalCount}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-amber-500">
                  <Layers size={18} />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 border rounded-xl shadow-3xs flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">
                    Historical Resolution Rate
                  </span>
                  <span className="text-2xl font-black font-mono text-emerald-600 mt-0.5">
                    {METRICS_SUMMARY.resolutionRate}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500">
                  <CheckCircle2 size={18} />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 border rounded-xl shadow-3xs flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-violet-600 uppercase tracking-wider block">
                    Pending Statutory Review
                  </span>
                  <span className="text-2xl font-black font-mono text-violet-600 mt-0.5">
                    {METRICS_SUMMARY.pendingExternalReview}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-violet-50 dark:bg-violet-950/20 text-violet-500">
                  <Clock size={18} />
                </div>
              </div>
            </div>

            {/* Split Page Multi Dashboard Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Segment Column: Active Incident Ledger Feed (40 items list space) */}
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs border rounded-lg bg-gray-50 dark:bg-gray-700/40 border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-800 dark:text-gray-200"
                    />
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setFilterOpen(!filterOpen)}
                      className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/40 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                      <Filter size={15} className="text-gray-400" />
                    </button>
                    {filterOpen && (
                      <div className="absolute right-0 top-full mt-1 w-44 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg z-30 p-1.5 space-y-1">
                        <select
                          value={severityFilter}
                          onChange={(e) => setSeverityFilter(e.target.value)}
                          className="w-full text-xs border rounded-lg py-1.5 px-2 bg-gray-50 dark:bg-gray-700/40 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 focus:outline-none"
                        >
                          <option value="All">All Severity</option>
                          <option value="Critical">Critical</option>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                        <hr className="border-gray-100 dark:border-gray-700" />
                        <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="w-full text-xs border rounded-lg py-1.5 px-2 bg-gray-50 dark:bg-gray-700/40 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 focus:outline-none"
                        >
                          <option value="All">All Status</option>
                          <option value="Open">Open</option>
                          <option value="Under Investigation">Under Investigation</option>
                          <option value="Resolved">Resolved</option>
                          <option value="Escalated">Escalated</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
                  {filteredIncidents.length === 0 ? (
                    <div className="p-12 border rounded-xl text-center text-xs text-gray-400 bg-white dark:bg-gray-800 italic">
                      Zero data matrix points verify with applied query
                      selectors.
                    </div>
                  ) : (
                    filteredIncidents.map((inc) => {
                      const isSelected = selectedIncident?.id === inc.id;

                      // Match Severity Colors
                      const severityColors = {
                        Critical:
                          "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-400",
                        High: "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/20 dark:text-rose-400",
                        Medium:
                          "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400",
                        Low: "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/20 dark:text-blue-400",
                      };

                      return (
                        <div
                          key={inc.id}
                          onClick={() => setSelectedIncident(inc)}
                          className={`rounded-xl border cursor-pointer transition p-3.5 bg-white dark:bg-gray-800 shadow-3xs flex flex-col justify-between gap-1.5 relative hover:border-gray-300 dark:hover:border-gray-600 ${
                            isSelected
                              ? "border-rose-500 ring-2 ring-rose-500/10 dark:border-rose-400"
                              : "border-gray-100 dark:border-gray-700/80"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] font-mono font-bold text-gray-400">
                                  {inc.id}
                                </span>
                                <span className="text-[10px] bg-gray-100 dark:bg-gray-700 px-1 py-0.2 rounded font-sans font-medium text-gray-500 dark:text-gray-300">
                                  {inc.category}
                                </span>
                              </div>
                              <h3 className="text-xs font-bold text-gray-900 dark:text-white mt-1 leading-snug">
                                {inc.text}
                              </h3>
                            </div>
                            <span
                              className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold uppercase border shrink-0 ${severityColors[inc.severity] || "bg-gray-100"}`}
                            >
                              {inc.severity}
                            </span>
                          </div>

                          <div className="flex justify-between items-center pt-2 mt-1 border-t border-gray-50 dark:border-gray-700/50 text-[10px] text-gray-400 font-mono">
                            <span>
                              Status:{" "}
                              <strong className="text-gray-700 dark:text-gray-300 font-sans">
                                {inc.status}
                              </strong>
                            </span>
                            <span>{inc.date}</span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Right Segment Column: Comprehensive Profile Incident Deep-Dive View */}
              <div className="lg:col-span-7">
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col h-full">
                  {selectedIncident ? (
                    <>
                      {/* Top Meta Strip */}
                      <div className="p-4 bg-gray-50/70 dark:bg-gray-700/30 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center text-xs">
                        <div>
                          <span className="text-[10px] text-gray-400 block font-mono">
                            FRAMEWORK REF ACCREDITATION: {selectedIncident.id}
                          </span>
                          <h2 className="font-bold text-gray-900 dark:text-white mt-0.5">
                            Classification: {selectedIncident.category}
                          </h2>
                        </div>
                        <span className="px-2 py-0.5 bg-white dark:bg-gray-900 rounded font-mono font-bold uppercase text-[10px] border border-gray-200 dark:border-gray-700">
                          Status: {selectedIncident.status}
                        </span>
                      </div>

                      {/* Expanded Focus Details Node */}
                      <div className="p-5 space-y-5 text-xs grow">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                            Identified Core Action Warning Parameter
                          </span>
                          <p className="text-sm font-bold text-gray-800 dark:text-gray-100 mt-1">
                            {selectedIncident.text}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 bg-gray-50/40 dark:bg-gray-900/20 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                          <div>
                            <span className="text-[10px] text-gray-400 block font-medium">
                              Assigned Regulatory Lead
                            </span>
                            <div className="font-bold text-gray-700 dark:text-gray-300 mt-0.5 flex items-center gap-1.5">
                              <Users size={12} className="text-rose-500" />{" "}
                              {selectedIncident.assignedOfficer}
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-400 block font-medium">
                              Infrastructure Zone Parameter
                            </span>
                            <div className="font-mono font-medium text-gray-700 dark:text-gray-300 mt-0.5">
                              {selectedIncident.location}
                            </div>
                          </div>
                          <div className="mt-2">
                            <span className="text-[10px] text-gray-400 block font-medium">
                              Incident Timestamp Window
                            </span>
                            <div className="font-mono text-gray-600 dark:text-gray-400 mt-0.5">
                              {selectedIncident.date} at {selectedIncident.time}
                            </div>
                          </div>
                          <div className="mt-2">
                            <span className="text-[10px] text-gray-400 block font-medium">
                              Severity Matrix Tier
                            </span>
                            <span className="mt-1 inline-block text-[9px] font-mono font-bold uppercase px-1.5 rounded border border-rose-200 bg-rose-50 text-rose-700">
                              {selectedIncident.severity} IMPACT TIER
                            </span>
                          </div>
                        </div>

                        {/* Audit Narrative Segment */}
                        <div className="space-y-1.5">
                          <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                            Chronological Narrative Event Trail
                          </span>
                          <div className="p-3.5 bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl leading-relaxed text-gray-600 dark:text-gray-300 font-mono text-[11px]">
                            {selectedIncident.narrative}
                          </div>
                        </div>

                        {/* Evidence Tracker Node */}
                        {selectedIncident.evidenceAttached && (
                          <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-center justify-between text-[11px]">
                            <span className="text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                              <FileText size={14} /> Structural Log Asset
                              Attached:{" "}
                              <strong className="font-mono text-[10px]">
                                {selectedIncident.evidenceAttached}
                              </strong>
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] bg-emerald-100 dark:bg-emerald-900/40 font-mono text-emerald-700 px-1.5 py-0.2 rounded">
                                SECURE HASH
                              </span>
                              <ArrowUpRight
                                size={12}
                                className="text-emerald-500 cursor-pointer"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Bottom Quick-Action Control Strip */}
                      <div className="p-3 bg-gray-50 dark:bg-gray-700/20 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-2 text-xs">
                        <button className="px-3 py-1.5 text-gray-500 hover:text-gray-700 font-medium">
                          Print Regulatory Report
                        </button>
                        <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-medium transition">
                          Escalate Incident Scope
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-12 text-center text-xs text-gray-400 italic my-auto">
                      Select a validation block entry from the queue feed panel
                      to load active verification assets.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* MODAL WORKSPACE ARCHITECTURE: LOG INCIDENT + INTEGRATED AI COMPLIANCE ADVISOR */}
        {isLogModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-5xl w-full h-[620px] flex flex-col overflow-hidden border dark:border-gray-700 shadow-2xl relative">
              {/* Modal Core Layout Header */}
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-b flex justify-between items-center shrink-0">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                    <ShieldAlert size={16} className="text-rose-600" /> Log
                    Compliance Incident / Accountability Matrix
                  </h3>
                  <p className="text-[11px] text-gray-400 font-mono">
                    Ensure objective alignment, chronological tracking
                    parameters, and corporate visibility protocols.
                  </p>
                </div>
                <button
                  onClick={() => setIsLogModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Dual-Column Interactive Panel Split */}
              <div className="grow flex overflow-hidden">
                {/* Column 1 Split: Data Input Fields Block Form */}
                <form
                  onSubmit={handleFormSubmit}
                  className="w-1/2 p-5 overflow-y-auto border-r dark:border-gray-700 space-y-4 text-xs"
                >
                  <div>
                    <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                      Incident Headline Identifier
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Unscheduled facility environmental acoustic variance"
                      value={newIncidentForm.text}
                      onChange={(e) =>
                        setNewIncidentForm({
                          ...newIncidentForm,
                          text: e.target.value,
                        })
                      }
                      className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 outline-none font-medium text-gray-800 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                        Category Framework
                      </label>
                      <select
                        value={newIncidentForm.category}
                        onChange={(e) =>
                          setNewIncidentForm({
                            ...newIncidentForm,
                            category: e.target.value,
                          })
                        }
                        className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 outline-none font-mono"
                      >
                        <option value="Facilities Health & Safety">
                          Facilities Health & Safety
                        </option>
                        <option value="Community Compliance">
                          Community Compliance
                        </option>
                        <option value="Risk Management">Risk Management</option>
                        <option value="Well-being Oversight">
                          Well-being Oversight
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                        Severity Profile Tier
                      </label>
                      <select
                        value={newIncidentForm.severity}
                        onChange={(e) =>
                          setNewIncidentForm({
                            ...newIncidentForm,
                            severity: e.target.value,
                          })
                        }
                        className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 outline-none font-mono font-bold"
                      >
                        <option value="Low">Low Priority Scope</option>
                        <option value="Medium">Medium Severity Impact</option>
                        <option value="High">High Severity Profile</option>
                        <option value="Critical">Critical Impact Breach</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                      Infrastructure Zone / Physical Location
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Block C Perimeter Pathway Deck"
                      value={newIncidentForm.location}
                      onChange={(e) =>
                        setNewIncidentForm({
                          ...newIncidentForm,
                          location: e.target.value,
                        })
                      }
                      className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 outline-none text-gray-800 dark:text-gray-100"
                    />
                  </div>

                  {/* Evidence Asset Dropbox Tracker */}
                  <div>
                    <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                      Evidence File Upload / System Log Drag
                    </label>
                    <div className="border border-dashed border-gray-200 dark:border-gray-600 rounded-xl p-4 text-center relative hover:bg-gray-50/50 dark:hover:bg-gray-900/40 transition">
                      <input
                        type="file"
                        onChange={handleMockFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <Upload
                        size={18}
                        className="mx-auto text-gray-400 mb-1"
                      />
                      <p className="text-[11px] text-gray-500">
                        Drop system logs, file captures, or transcription
                        metrics to optimize raw entry
                      </p>
                      {newIncidentForm.fileName && (
                        <div className="mt-2 text-[10px] text-emerald-600 font-mono bg-emerald-50 dark:bg-emerald-950/20 py-1 px-2 rounded inline-flex items-center gap-1">
                          <FileText size={12} /> Verification File Checked:{" "}
                          {newIncidentForm.fileName}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                      Chronological Narrative Log
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Input chronological descriptions or prompt the side-by-side AI tool to cleanse conversational shorthand narrative data points..."
                      value={newIncidentForm.narrative}
                      onChange={(e) =>
                        setNewIncidentForm({
                          ...newIncidentForm,
                          narrative: e.target.value,
                        })
                      }
                      className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 outline-none font-mono leading-relaxed text-[11px]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2.5 rounded-xl text-xs transition duration-150 shadow-xs"
                  >
                    Commit Incident Entry to Operational Record Ledger
                  </button>
                </form>

                {/* Column 2 Split: AI Copilot Assistant & Objective Cleansing Panel */}
                <div className="w-1/2 bg-gray-50 dark:bg-gray-900/60 flex flex-col h-full overflow-hidden">
                  {/* AI Sub Header Control Block */}
                  <div className="p-3 bg-rose-50 dark:bg-rose-950/20 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center shrink-0">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-1">
                      <Sparkles size={14} /> AI Safeguarding Text Cleanser
                    </span>
                    <button
                      type="button"
                      onClick={applyAiFormatting}
                      className="text-[10px] bg-rose-600 hover:bg-rose-700 text-white px-2 py-0.5 rounded font-medium transition"
                    >
                      Apply Compliance Format
                    </button>
                  </div>

                  {/* Messaging Streaming Workspace Area */}
                  <div className="grow overflow-y-auto p-4 space-y-3 text-xs">
                    {aiMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-xl p-3 leading-relaxed ${
                            msg.role === "user"
                              ? "bg-rose-600 text-white font-mono text-[11px]"
                              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border dark:border-gray-700 shadow-3xs text-[11px]"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input Trigger Field */}
                  <form
                    onSubmit={handleSendAiPrompt}
                    className="p-3 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex gap-2 shrink-0"
                  >
                    <input
                      type="text"
                      placeholder="Prompt compliance evaluation tools or optimize narrative phrasing..."
                      value={aiChatInput}
                      onChange={(e) => setAiChatInput(e.target.value)}
                      className="grow bg-gray-50 dark:bg-gray-700 text-xs rounded-lg border px-3 outline-none focus:ring-1 focus:ring-rose-500"
                    />
                    <button
                      type="submit"
                      className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-500"
                    >
                      <Send size={14} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        <Banner />
      </div>
    </div>
  );
}

export default Safeguarding;
