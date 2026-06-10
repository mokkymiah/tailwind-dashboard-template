import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Banner from "../partials/Banner";
import {
  Calendar,
  Search,
  Filter,
  Plus,
  Clock,
  CheckCircle2,
  User,
  Sparkles,
  Upload,
  Send,
  FileText,
  X,
  AlertCircle,
  ChevronRight,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";

// Robust 40-item mock database representing a diversified corporate supported living account framework
const INITIAL_SESSIONS = Array.from({ length: 40 }, (_, i) => {
  const residents = [
    "John Doe",
    "Jane Smith",
    "Liam Williams",
    "Olivia Brown",
    "Noah Jones",
    "Emma Garcia",
    "Oliver Miller",
    "Ava Davis",
    "Elijah Smith",
    "Sophia Taylor",
  ];
  const coaches = [
    "Emma Worker",
    "Olivia Admin",
    "Sarah Jenkins",
    "David Marcus",
    "Amara Okafor",
    "Marcus Vance",
  ];
  const focuses = [
    "Independent Living Budgeting Strategy Plan Review",
    "Exempt Tenancy Compliance Review",
    "Quarterly Outcome Framework Progress Update",
    "Community Integration & Well-being Follow-up",
    "Action Metric & Goal Matrix Realignment",
    "Occupational Engagement & Workspace Skill Audit",
  ];
  const outcomes = [
    "Completed - Target support matrix tracks successfully established. Financial milestones remain fully on track.",
    "Completed - Resident successfully verified compliance metrics across all indicators. Active engagement logged.",
    "Completed - Outlined key action items regarding upcoming local authority accounting review framework.",
    "Completed - Safe workspace transition strategy mapped. Continuous engagement milestones locked with coach.",
    "Completed - Identified minor documentation anomalies; updated target fields and resolved localized logging gap.",
    "Completed - Evaluated independent tenancy cost model guidelines. Core indicators remain authorized.",
  ];

  const residentName = residents[i % residents.length];
  const coachName = coaches[i % coaches.length];
  const isUpcoming = i % 4 === 0; // Create clean separation distribution

  // Backdated and forward dates mapping to 2026 window
  const day = String((i % 28) + i === 0 ? 1 : (i % 28) + 1).padStart(2, "0");
  const dateStr = isUpcoming ? `2026-07-${day}` : `2026-05-${day}`;

  return {
    id: `SS-${1000 + i}`,
    resident: residentName,
    worker: coachName,
    date: dateStr,
    time: i % 2 === 0 ? "10:30" : "14:15",
    focus: focuses[i % focuses.length],
    notes: outcomes[i % outcomes.length],
    status: isUpcoming ? "Scheduled" : "Completed",
    documentAttached: i % 3 === 0 ? "framework_matrix_v4.pdf" : null,
  };
});

// Mock analytics for Worker Performance Framework Tracking
const WORKER_PERFORMANCE = [
  {
    name: "Sarah Jenkins",
    sessionsThisMonth: 24,
    complianceScore: "100%",
    feedbackRating: "4.9/5",
  },
  {
    name: "Emma Worker",
    sessionsThisMonth: 19,
    complianceScore: "98.2%",
    feedbackRating: "4.8/5",
  },
  {
    name: "David Marcus",
    sessionsThisMonth: 15,
    complianceScore: "100%",
    feedbackRating: "4.7/5",
  },
  {
    name: "Amara Okafor",
    sessionsThisMonth: 22,
    complianceScore: "95.5%",
    feedbackRating: "4.9/5",
  },
];

function SupportSessions() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sessions, setSessions] = useState(INITIAL_SESSIONS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [coachFilter, setCoachFilter] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);

  // Selection and Modal Workspaces
  const [selectedSession, setSelectedSession] = useState(INITIAL_SESSIONS[1]); // Preselect a completed one
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  // New Session State Entry
  const [newSessionForm, setNewSessionForm] = useState({
    resident: "",
    worker: "Sarah Jenkins",
    date: "2026-06-10",
    time: "11:00",
    focus: "",
    notes: "",
    fileName: "",
  });

  // AI Assistant Interaction Interface
  const [aiChatInput, setAiChatInput] = useState("");
  const [aiMessages, setAiMessages] = useState([
    {
      role: "assistant",
      text: "Welcome to the AI Support Advisor panel. Upload a file or paste meeting drafts, and I will sanitize logs, format indicators, or isolate missing compliance parameters.",
    },
  ]);

  // Filters Calculation Nodes
  const filteredSessions = sessions.filter((s) => {
    const matchesSearch =
      s.resident.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.focus.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || s.status === statusFilter;
    const matchesCoach = coachFilter === "All" || s.worker === coachFilter;

    return matchesSearch && matchesStatus && matchesCoach;
  });

  // Unique lists for dropdown selectors
  const totalUpcoming = sessions.filter((s) => s.status === "Scheduled").length;
  const totalCompleted = sessions.filter(
    (s) => s.status === "Completed",
  ).length;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const createdSession = {
      id: `SS-${Date.now().toString().slice(-4)}`,
      resident: newSessionForm.resident || "Anonymous Account",
      worker: newSessionForm.worker,
      date: newSessionForm.date,
      time: newSessionForm.time,
      focus: newSessionForm.focus || "Standard Progress Interaction Monitoring",
      notes:
        newSessionForm.notes ||
        "Administrative session summary committed successfully without noted formatting warnings.",
      status: "Completed",
      documentAttached: newSessionForm.fileName || null,
    };

    const updatedData = [createdSession, ...sessions];
    setSessions(updatedData);
    setSelectedSession(createdSession);
    setIsLogModalOpen(false);

    // Reset Form Assets
    setNewSessionForm({
      resident: "",
      worker: "Sarah Jenkins",
      date: "2026-06-10",
      time: "11:00",
      focus: "",
      notes: "",
      fileName: "",
    });
    setAiMessages([
      {
        role: "assistant",
        text: "Welcome to the AI Support Advisor panel. Upload a file or paste meeting drafts, and I will sanitize logs, format indicators, or isolate missing compliance parameters.",
      },
    ]);
  };

  const handleMockFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewSessionForm({ ...newSessionForm, fileName: file.name });
      setAiMessages((prev) => [
        ...prev,
        {
          role: "user",
          text: `Attached document framework asset: ${file.name}`,
        },
        {
          role: "assistant",
          text: `✨ I've processed your attachment "${file.name}". \n\n**Extracted Framework Parameters:**\n- **Focus Verified:** Tenancy Independence Framework & Cost Budgeting Metrics\n- **AI Cleanup Suggestion:** The uploaded draft text contained some rough formatting shorthand. I've optimized it to match our internal compliance standards. \n\nClick 'Apply Suggestions' above to synchronize text fields.`,
        },
      ]);
    }
  };

  const applyAiSuggestions = () => {
    setNewSessionForm({
      ...newSessionForm,
      focus: "Structured Tenancy Independent Living Matrix Audit",
      notes:
        "Account owner successfully verified compliance across all internal indicators. Session logs demonstrate alignment with core support benchmarks. Follow up scheduled next month.",
    });
    setAiMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: "✅ System synchronized. Cleaned structured text successfully pushed to layout input fields.",
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
          text: "I have scrutinized your current log entry text block. Grammatical formatting satisfies our regulatory transparency standards, and zero missing asset metadata tracks were found.",
        },
      ]);
    }, 500);
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
            {/* Top Workspace Header Controls */}
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setIsLogModalOpen(true)}
                className="bg-violet-600 hover:bg-violet-700 text-white font-medium text-sm flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-xs transition duration-150"
              >
                <Plus size={16} />
                <span>Session</span>
              </button>
            </div>

            {/* Metric KPI Overview Strip Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 p-4 border rounded-xl shadow-3xs flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    Total Track Records
                  </span>
                  <span className="text-2xl font-black font-mono text-gray-900 dark:text-white mt-0.5">
                    {sessions.length}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-400">
                  <BarChart3 size={18} />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 border rounded-xl shadow-3xs flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-violet-600 uppercase tracking-wider block">
                    Completed Audits
                  </span>
                  <span className="text-2xl font-black font-mono text-violet-600 mt-0.5">
                    {totalCompleted}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-violet-50 dark:bg-violet-950/20 text-violet-500">
                  <CheckCircle2 size={18} />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 border rounded-xl shadow-3xs flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">
                    Upcoming Tracks
                  </span>
                  <span className="text-2xl font-black font-mono text-amber-600 mt-0.5">
                    {totalUpcoming}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-amber-500">
                  <Clock size={18} />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 border rounded-xl shadow-3xs flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">
                    Audit Score Integrity
                  </span>
                  <span className="text-2xl font-black font-mono text-emerald-600 mt-0.5">
                    98.4%
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500">
                  <ShieldCheck size={18} />
                </div>
              </div>
            </div>

            {/* Split Page Multi Dashboard Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Segment Column: Active System Ledger (Lists 40 entries with query filters) */}
              <div className="lg:col-span-5 space-y-3">
                <div className="flex flex-col sm:flex-row items-center gap-2 mb-2">
                  <div className="relative w-full sm:flex-1">
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
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="w-full text-xs border rounded-lg py-1.5 px-2 bg-gray-50 dark:bg-gray-700/40 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 focus:outline-none"
                        >
                          <option value="All">All Status</option>
                          <option value="Completed">Completed</option>
                          <option value="Scheduled">Scheduled</option>
                        </select>
                        <hr className="border-gray-100 dark:border-gray-700" />
                        <select
                          value={coachFilter}
                          onChange={(e) => setCoachFilter(e.target.value)}
                          className="w-full text-xs border rounded-lg py-1.5 px-2 bg-gray-50 dark:bg-gray-700/40 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 focus:outline-none"
                        >
                          <option value="All">All Coaches</option>
                          <option value="Sarah Jenkins">Sarah Jenkins</option>
                          <option value="Emma Worker">Emma Worker</option>
                          <option value="Amara Okafor">Amara Okafor</option>
                          <option value="David Marcus">David Marcus</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
                  {filteredSessions.length === 0 ? (
                    <div className="p-12 border rounded-xl text-center text-xs text-gray-400 bg-white dark:bg-gray-800 italic">
                      Zero logs verify with applied filter selections.
                    </div>
                  ) : (
                    filteredSessions.map((s) => {
                      const isSelected = selectedSession?.id === s.id;
                      return (
                        <div
                          key={s.id}
                          onClick={() => setSelectedSession(s)}
                          className={`rounded-xl border cursor-pointer transition p-3.5 bg-white dark:bg-gray-800 shadow-3xs flex flex-col justify-between gap-1.5 relative hover:border-gray-300 dark:hover:border-gray-600 ${
                            isSelected
                              ? "border-violet-500 ring-2 ring-violet-500/10 dark:border-violet-400"
                              : "border-gray-100 dark:border-gray-700/80"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                                {s.resident}
                              </h3>
                              <p className="text-[10px] text-gray-400 truncate max-w-[260px] font-medium mt-0.5">
                                {s.focus}
                              </p>
                            </div>
                            <span
                              className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold uppercase border shrink-0 ${
                                s.status === "Scheduled"
                                  ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400"
                                  : "bg-violet-50 text-violet-700 border-violet-100 dark:bg-violet-950/20 dark:text-violet-400"
                              }`}
                            >
                              {s.status}
                            </span>
                          </div>

                          <div className="flex justify-between items-center pt-2 mt-1 border-t border-gray-50 dark:border-gray-700/50 text-[10px] text-gray-400 font-mono">
                            <span>
                              Coach:{" "}
                              <strong className="text-gray-600 dark:text-gray-300 font-sans">
                                {s.worker}
                              </strong>
                            </span>
                            <span>
                              {s.date} @ {s.time}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Right Segment Column: Detailed Record Review & Worker Metrics Grid */}
              <div className="lg:col-span-7 space-y-6">
                {/* Panel 1: Interactive Record Focus Viewer Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col">
                  {selectedSession ? (
                    <>
                      {/* Header block status identifier strip */}
                      <div className="p-4 bg-gray-50/70 dark:bg-gray-700/30 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center text-xs">
                        <div>
                          <span className="text-[10px] text-gray-400 block font-mono">
                            TRACKING REFERENCE: {selectedSession.id}
                          </span>
                          <h2 className="font-bold text-gray-900 dark:text-white mt-0.5">
                            Account Profile Targeted: {selectedSession.resident}
                          </h2>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded font-mono font-bold uppercase text-[10px] border ${
                            selectedSession.status === "Scheduled"
                              ? "bg-amber-100 text-amber-700 border-amber-200"
                              : "bg-emerald-50 text-emerald-700 border-emerald-200"
                          }`}
                        >
                          {selectedSession.status} Framework
                        </span>
                      </div>

                      {/* Expanded Focus Details Node Fields */}
                      <div className="p-5 space-y-4 text-xs">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                            Scheduled Support Focus Indicators
                          </span>
                          <p className="text-sm font-bold text-gray-800 dark:text-gray-100 mt-1">
                            {selectedSession.focus}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 bg-gray-50/40 dark:bg-gray-900/20 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                          <div>
                            <span className="text-[10px] text-gray-400 block font-medium">
                              Assigned Support Coach
                            </span>
                            <div className="font-bold text-gray-700 dark:text-gray-300 mt-0.5 flex items-center gap-1">
                              <User size={12} className="text-violet-500" />{" "}
                              {selectedSession.worker}
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-400 block font-medium">
                              Clearance Window Timestamp
                            </span>
                            <div className="font-mono text-gray-700 dark:text-gray-300 mt-0.5">
                              {selectedSession.date} at {selectedSession.time}
                            </div>
                          </div>
                        </div>

                        {/* Outcomes Block Section */}
                        <div className="space-y-1.5">
                          <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                            Logged Outcome / Discussion Metrics
                          </span>
                          <div className="p-3 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-xl leading-relaxed text-gray-600 dark:text-gray-300 italic font-mono text-[11px]">
                            "{selectedSession.notes}"
                          </div>
                        </div>

                        {/* Attachment Tracker Node */}
                        {selectedSession.documentAttached && (
                          <div className="p-2.5 bg-emerald-500/5 border border-emerald-500/10 rounded-lg flex items-center justify-between text-[11px]">
                            <span className="text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                              <FileText size={14} /> Compliance Asset Attached:{" "}
                              <strong className="font-mono">
                                {selectedSession.documentAttached}
                              </strong>
                            </span>
                            <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/40 font-mono text-emerald-700 px-1.5 py-0.2 rounded">
                              VERIFIED
                            </span>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="p-12 text-center text-xs text-gray-400 italic my-auto">
                      Highlight any session log from the ledger column to audit
                      detailed records.
                    </div>
                  )}
                </div>

                {/* Panel 2: Secondary Worker Performance Matrix Tracker */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-3 border-b pb-2">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                      <TrendingUp size={14} className="text-emerald-500" />{" "}
                      Support Coach Audit Framework Performance
                    </h4>
                    <span className="text-[10px] text-gray-400">
                      Monthly Rolling KPI
                    </span>
                  </div>

                  <div className="overflow-x-auto text-xs">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-gray-400 font-medium border-b dark:border-gray-700/60">
                          <th className="pb-2">Coach Name</th>
                          <th className="pb-2 text-center">Sessions Logged</th>
                          <th className="pb-2 text-center">
                            Compliance Rating
                          </th>
                          <th className="pb-2 text-right">Feedback Rating</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 dark:divide-gray-700 text-gray-600 dark:text-gray-300">
                        {WORKER_PERFORMANCE.map((worker, wIdx) => (
                          <tr key={wIdx} className="hover:bg-gray-50/40">
                            <td className="py-2 font-bold text-gray-800 dark:text-gray-200">
                              {worker.name}
                            </td>
                            <td className="py-2 text-center font-mono font-bold text-violet-600">
                              {worker.sessionsThisMonth}
                            </td>
                            <td className="py-2 text-center font-mono text-emerald-600 font-bold">
                              {worker.complianceScore}
                            </td>
                            <td className="py-2 text-right font-mono text-gray-400">
                              {worker.feedbackRating}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* COMPREHENSIVE MODAL FRAME: LOG NEW SESSION + SIDE-BY-SIDE AI WORKSPACE ADVISOR */}
        {isLogModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-5xl w-full max-h-[90dvh] flex flex-col overflow-hidden border dark:border-gray-700 shadow-2xl relative animate-fadeIn">
              {/* Modal Core Layout Header */}
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-b flex justify-between items-center shrink-0">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                    <Calendar size={16} className="text-violet-600" /> Log
                    Active Support Framework Interaction
                  </h3>
                  <p className="text-[11px] text-gray-400 font-mono">
                    Ensuring structural logging adherence across operational
                    compliance boundaries.
                  </p>
                </div>
                <button
                  onClick={() => setIsLogModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Twin Split Column Layout Arena */}
              <div className="grow flex flex-col lg:flex-row overflow-hidden">
                {/* Column 1 Split: Data Input Fields Block Form */}
                <form
                  onSubmit={handleFormSubmit}
                  className="w-full lg:w-1/2 p-5 overflow-y-auto border-r dark:border-gray-700 space-y-4 text-xs"
                >
                  <div>
                    <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                      Target Resident Profile
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Liam Williams"
                      value={newSessionForm.resident}
                      onChange={(e) =>
                        setNewSessionForm({
                          ...newSessionForm,
                          resident: e.target.value,
                        })
                      }
                      className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 outline-none font-medium text-gray-800 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                        Conducting Support Coach
                      </label>
                      <select
                        value={newSessionForm.worker}
                        onChange={(e) =>
                          setNewSessionForm({
                            ...newSessionForm,
                            worker: e.target.value,
                          })
                        }
                        className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 outline-none font-mono"
                      >
                        <option value="Sarah Jenkins">Sarah Jenkins</option>
                        <option value="Emma Worker">Emma Worker</option>
                        <option value="Amara Okafor">Amara Okafor</option>
                        <option value="David Marcus">David Marcus</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                          Date
                        </label>
                        <input
                          type="date"
                          value={newSessionForm.date}
                          onChange={(e) =>
                            setNewSessionForm({
                              ...newSessionForm,
                              date: e.target.value,
                            })
                          }
                          className="w-full border border-gray-200 rounded-lg p-1.5 bg-gray-50 dark:bg-gray-700 font-mono text-[11px]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                          Time
                        </label>
                        <input
                          type="text"
                          value={newSessionForm.time}
                          onChange={(e) =>
                            setNewSessionForm({
                              ...newSessionForm,
                              time: e.target.value,
                            })
                          }
                          className="w-full border border-gray-200 rounded-lg p-1.5 bg-gray-50 dark:bg-gray-700 font-mono text-[11px]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Document Attachment Field Box */}
                  <div>
                    <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                      Evidence File / Framework Upload
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
                        Drag verification files or raw transcript documents here
                        to parse
                      </p>
                      {newSessionForm.fileName && (
                        <div className="mt-2 text-[10px] text-emerald-600 font-mono bg-emerald-50 dark:bg-emerald-950/20 py-1 px-2 rounded inline-flex items-center gap-1 animate-fadeIn">
                          <FileText size={12} /> {newSessionForm.fileName}{" "}
                          Linked Successfully
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                      Interaction Focus Parameter
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Budgeting Review Strategy or Independent Framework assessment"
                      value={newSessionForm.focus}
                      onChange={(e) =>
                        setNewSessionForm({
                          ...newSessionForm,
                          focus: e.target.value,
                        })
                      }
                      className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 outline-none text-gray-800 dark:text-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                      Discussion Outcomes Notes Summary
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Draft details or use the AI Advisor panel on the right to auto-populate cleaned narratives..."
                      value={newSessionForm.notes}
                      onChange={(e) =>
                        setNewSessionForm({
                          ...newSessionForm,
                          notes: e.target.value,
                        })
                      }
                      className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 outline-none font-mono leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2.5 rounded-xl text-xs transition duration-150 shadow-xs"
                  >
                    Commit Clean Log to Track History Ledger
                  </button>
                </form>

                {/* Column 2 Split: AI Copilot Assistant & Clean Advisor panel Node */}
                <div className="w-full lg:w-1/2 bg-gray-50 dark:bg-gray-900/60 flex flex-col h-full overflow-hidden">
                  {/* AI Sub Header Control Block */}
                  <div className="p-3 bg-violet-50 dark:bg-violet-950/20 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center shrink-0">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-violet-700 dark:text-violet-400 flex items-center gap-1">
                      <Sparkles size={14} /> AI Log Advisor & Cleansing Tool
                    </span>
                    <button
                      type="button"
                      onClick={applyAiSuggestions}
                      className="text-[10px] bg-violet-600 hover:bg-violet-700 text-white px-2 py-0.5 rounded font-medium transition"
                    >
                      Apply Suggestions
                    </button>
                  </div>

                  {/* Messaging Streaming Area */}
                  <div className="grow overflow-y-auto p-4 space-y-3 text-xs">
                    {aiMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-xl p-3 leading-relaxed whitespace-pre-wrap ${
                            msg.role === "user"
                              ? "bg-violet-600 text-white font-mono text-[11px]"
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
                      placeholder="Ask advisor to detect missing data or analyze logs syntax..."
                      value={aiChatInput}
                      onChange={(e) => setAiChatInput(e.target.value)}
                      className="grow bg-gray-50 dark:bg-gray-700 text-xs rounded-lg border px-3 outline-none focus:ring-1 focus:ring-violet-500"
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

export default SupportSessions;
