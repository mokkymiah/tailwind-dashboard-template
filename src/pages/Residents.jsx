import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Banner from "../partials/Banner";
import { 
  Users, Search, Filter, Plus, Calendar, AlertTriangle, 
  CheckCircle2, Clock, ShieldAlert, X, Check, MapPin, Landmark, 
  Receipt, AlertOctagon, History, Upload, Sparkles, Send, FileText
} from "lucide-react";

const AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a45e?auto=format&fit=crop&w=100&q=80"
];

const generateDetailedResidents = () => {
  const residentList = [];
  const firstNames = ["Liam", "Olivia", "Noah", "Emma", "Oliver", "Ava", "Elijah", "Charlotte", "William", "Sophia"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis"];
  const properties = ["Belgrave Court", "Moseley Haven", "Edgbaston Hub", "Harborne Suite"];
  const coaches = ["Sarah Jenkins", "David Marcus", "Amara Okafor", "Marcus Vance"];
  
  const benefitStatuses = [
    "Authorized & Active", 
    "Pending Assessment", 
    "CANCELLED / STOPPED", 
    "Suspended — Info Requested"
  ];

  for (let i = 1; i <= 40; i++) {
    const first = firstNames[i % firstNames.length];
    const last = lastNames[i % lastNames.length];
    const targetProperty = properties[i % properties.length];
    const hbStatus = benefitStatuses[i % benefitStatuses.length];
    const assignedCoach = coaches[i % coaches.length];
    const baseWeeklyRate = 184.30 + (i * 2.10);
    
    // Past Sessions Track
    const pastSessions = [
      { id: `SESS-${800 + i}`, date: "2026-05-14", time: "14:00", coach: assignedCoach, focus: "Independent Living Budgeting & Support Plan Review", outcome: "Completed - Target support matrix tracks established. Financial milestones on track." },
      { id: `SESS-${840 + i}`, date: "2026-06-02", time: "10:30", coach: assignedCoach, focus: "Exempt Tenancy Compliance Review", outcome: "Completed - Resident engaging well with personalized housing goals." }
    ];

    // Upcoming Scheduled Sessions
    const upcomingSessions = [
      { id: `SESS-FUT-${900 + i}`, date: "2026-06-18", time: "11:00", coach: assignedCoach, focus: "Quarterly Outcome Framework Progress Update" },
      { id: `SESS-FUT-${950 + i}`, date: "2026-07-02", time: "15:30", coach: assignedCoach, focus: "Community Integration & Well-being Follow-up" }
    ];

    const supportTickets = [];
    if (hbStatus.includes("CANCELLED") || hbStatus.includes("Suspended")) {
      supportTickets.push({ 
        id: `TCK-${900 + i}`, 
        title: `CRITICAL: Housing Benefit ${hbStatus.split(" ")[0]} Overpayment/Stop Notice Escalation`, 
        priority: "High", 
        status: "Open / Critical", 
        logged: "Just Now" 
      });
    }

    const paymentHistory = [
      { period: "Feb 2026 Cycle (Wks 5-8)", amountPaid: baseWeeklyRate * 4, dateCleared: "2026-02-26", method: "Direct Provider BACS", status: "Paid" },
      { period: "Mar 2026 Cycle (Wks 9-12)", amountPaid: baseWeeklyRate * 4, dateCleared: "2026-03-26", method: "Direct Provider BACS", status: "Paid" },
      { period: "Apr 2026 Cycle (Wks 13-16)", amountPaid: baseWeeklyRate * 4, dateCleared: "2026-04-28", method: "Direct Provider BACS", status: "Paid" }
    ];

    if (hbStatus === "Authorized & Active") {
      paymentHistory.push({ period: "May 2026 Cycle (Wks 17-20)", amountPaid: baseWeeklyRate * 4, dateCleared: "2026-05-28", method: "Direct Provider BACS", status: "Paid" });
    } else if (hbStatus === "CANCELLED / STOPPED") {
      paymentHistory.push({ period: "May 2026 Cycle (Wks 17-20)", amountPaid: 0, dateCleared: "—", method: "BACS REJECTED", status: "Cancelled" });
    } else if (hbStatus === "Suspended — Info Requested") {
      paymentHistory.push({ period: "May 2026 Cycle (Wks 17-20)", amountPaid: 0, dateCleared: "—", method: "HOLD", status: "Suspended" });
    } else {
      paymentHistory.push({ period: "May 2026 Cycle (Wks 17-20)", amountPaid: 0, dateCleared: "—", method: "PENDING ASSESS", status: "Awaiting Assessment" });
    }

    paymentHistory.reverse();

    const housingBenefitClaim = {
      referenceNumber: `HB-BHM-${90000 + i}`,
      status: hbStatus,
      weeklyAmount: baseWeeklyRate,
      monthlyEquivalent: baseWeeklyRate * 4.333,
      localAuthority: "Birmingham City Council",
      lastAwardReviewDate: "2026-04-10",
      nextHarvestSchedule: hbStatus.includes("CANCELLED") ? "SUSPENDED / HALTED" : "2026-06-25",
      paymentHistory: paymentHistory
    };

    residentList.push({
      id: `RES-${4000 + i}`,
      name: `${first} ${last}`,
      dob: `19${80 + (i % 15)}-04-12`,
      risk: i % 5 === 0 ? "High" : i % 3 === 0 ? "Medium" : "Low",
      propertyName: targetProperty,
      roomAllocated: `Room ${100 + (i % 8)}`,
      avatar: AVATARS[i % AVATARS.length],
      phone: `07700 900 ${400 + i}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}@bhm-supported.test`,
      supportCoach: assignedCoach,
      pastSessions: pastSessions,
      upcomingSessions: upcomingSessions,
      supportTickets: supportTickets,
      housingBenefitClaim: housingBenefitClaim
    });
  }
  return residentList;
};

const INITIAL_RESIDENTS = generateDetailedResidents();

function Residents() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [residentsData, setResidentsData] = useState(INITIAL_RESIDENTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");
  const [hbFilter, setHbFilter] = useState("All"); 
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedResident, setSelectedResident] = useState(INITIAL_RESIDENTS[0]);
  const [activeTab, setActiveTab] = useState("benefits"); 

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);

  // New Resident State
  const [newResident, setNewResident] = useState({
    name: "", dob: "", risk: "Low", propertyName: "Belgrave Court", roomAllocated: "Room 101", phone: "", email: "",
    hbStatus: "Pending Assessment", hbWeeklyAmount: "195.00", supportCoach: "Sarah Jenkins"
  });

  // Log Session / AI Form State
  const [sessionForm, setSessionForm] = useState({
    date: "2026-06-10", time: "10:00", focus: "", outcome: "", fileUploaded: null, fileName: ""
  });
  const [aiChatInput, setAiChatInput] = useState("");
  const [aiMessages, setAiMessages] = useState([
    { role: "assistant", text: "Hello! I am your AI Support Advisor. Upload session notes or typed drafts, and I will scan for missing data metrics, verify compliance structure, or clean up text summaries." }
  ]);

  const filteredResidents = residentsData.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.propertyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === "All" || r.risk === riskFilter;
    
    let matchesHb = true;
    if (hbFilter === "Issues Only") {
      matchesHb = r.housingBenefitClaim?.status.includes("CANCELLED") || r.housingBenefitClaim?.status.includes("Suspended");
    } else if (hbFilter !== "All") {
      matchesHb = r.housingBenefitClaim?.status === hbFilter;
    }

    return matchesSearch && matchesRisk && matchesHb;
  });

  const activeResident = filteredResidents.find(r => r.id === selectedResident?.id) || filteredResidents[0] || null;

  const handleRegisterResident = (e) => {
    e.preventDefault();
    const parsedWeekly = parseFloat(newResident.hbWeeklyAmount) || 195.00;
    
    const createdObject = {
      id: `RES-${Date.now().toString().slice(-4)}`,
      name: newResident.name,
      dob: newResident.dob || "1995-08-24",
      risk: newResident.risk,
      propertyName: newResident.propertyName,
      roomAllocated: newResident.roomAllocated,
      avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)],
      phone: newResident.phone || "07700 900 1234",
      email: `${newResident.name.toLowerCase().replace(/\s+/g, '')}@bhm-supported.test`,
      supportCoach: newResident.supportCoach,
      pastSessions: [],
      upcomingSessions: [
        { id: `SESS-FUT-${Date.now().toString().slice(-3)}`, date: "2026-06-15", time: "10:00", coach: newResident.supportCoach, focus: "Initial Onboarding Assessment & Goal Matrix Setup" }
      ],
      supportTickets: [],
      housingBenefitClaim: {
        referenceNumber: `HB-NEW-${Date.now().toString().slice(-4)}`,
        status: newResident.hbStatus,
        weeklyAmount: parsedWeekly,
        monthlyEquivalent: parsedWeekly * 4.333,
        localAuthority: "Birmingham City Council",
        lastAwardReviewDate: "Initial Assessment Setup",
        nextHarvestSchedule: "Awaiting Scheduling Check",
        paymentHistory: [
          { period: "Current Opening Cycle", amountPaid: 0, dateCleared: "—", method: "Awaiting Data", status: "Pending New Claim" }
        ]
      }
    };

    setResidentsData([createdObject, ...residentsData]);
    setSelectedResident(createdObject);
    setIsModalOpen(false);
  };

  const handleLogSessionSubmit = (e) => {
    e.preventDefault();
    if (!activeResident) return;

    const loggedSession = {
      id: `SESS-NEW-${Date.now().toString().slice(-3)}`,
      date: sessionForm.date,
      time: sessionForm.time,
      coach: activeResident.supportCoach,
      focus: sessionForm.focus || "Standard Progress Tracking Session",
      outcome: sessionForm.outcome || "Session logs committed via administrative processing update."
    };

    const updatedResidents = residentsData.map(res => {
      if (res.id === activeResident.id) {
        return {
          ...res,
          pastSessions: [loggedSession, ...res.pastSessions]
        };
      }
      return res;
    });

    setResidentsData(updatedResidents);
    setIsSessionModalOpen(false);
    // Reset form
    setSessionForm({ date: "2026-06-10", time: "10:00", focus: "", outcome: "", fileUploaded: null, fileName: "" });
    setAiMessages([{ role: "assistant", text: "Hello! I am your AI Support Advisor. Upload session notes or typed drafts, and I will scan for missing data metrics, verify compliance structure, or clean up text summaries." }]);
  };

  const handleFileUploadMock = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSessionForm({ ...sessionForm, fileName: file.name, fileUploaded: true });
      
      // AI automatically reads and cleans data
      setAiMessages(prev => [
        ...prev,
        { role: "user", text: `Uploaded document: ${file.name}` },
        { role: "assistant", text: `✨ I've analyzed "${file.name}". I detected a Support Session held by ${activeResident?.supportCoach || "Support Coach"}. \n\n**Suggested Cleanup:**\n- **Focus Field:** Extracted independent tenancy milestone parameters.\n- **Identified Missing Data:** The outcome notes lacked an explicit next-action date. Added placeholder recommendation.\n\nClick 'Apply Suggestions' or continue drafting below.` }
      ]);
    }
  };

  const handleApplyAiSuggestions = () => {
    setSessionForm({
      ...sessionForm,
      focus: "Structured Tenancy Independent Living Matrix Audit",
      outcome: "Resident successfully verified compliance metrics across all indicators. Action items established regarding upcoming local authority assessment. Document attached successfully."
    });
    setAiMessages(prev => [
      ...prev,
      { role: "assistant", text: "✅ Applied cleaned summaries directly into your active workspace fields." }
    ]);
  };

  const handleSendAiMessage = (e) => {
    e.preventDefault();
    if (!aiChatInput.trim()) return;

    const userMsg = aiChatInput;
    setAiChatInput("");
    setAiMessages(prev => [...prev, { role: "user", text: userMsg }]);

    setTimeout(() => {
      setAiMessages(prev => [
        ...prev,
        { role: "assistant", text: "I've reviewed your request. Based on standard framework standards, your phrasing looks compliant. Ensure all specific outcome progress benchmarks remain logged to prevent localized tracking gaps." }
      ]);
    }, 600);
  };

  const getHbStatusClasses = (status) => {
    if (status.includes("CANCELLED")) return "bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-900 font-bold";
    if (status.includes("Suspended")) return "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900 font-bold";
    if (status.includes("Active")) return "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-100";
    return "bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 border-blue-100";
  };

  const getHistoryBadgeClass = (status) => {
    switch (status) {
      case "Paid": return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400";
      case "Cancelled": return "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/20 dark:text-rose-400 font-bold";
      case "Suspended": return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 font-bold";
      default: return "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const isClaimBroken = (status) => status?.includes("CANCELLED") || status?.includes("Suspended");

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 dark:bg-gray-900">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            
            {/* Header Layout */}
            <div className="flex justify-end mb-6">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium inline-flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-xs transition duration-150"
              >
                <Plus size={16} />
                <span>Resident</span>
              </button>
            </div>

            {/* KPI Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-xs">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Residents</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{filteredResidents.length}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-xs">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Active HB</p>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{filteredResidents.filter((r) => r.hbStatus === "Active" || r.housingBenefit === "Active").length}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-xs">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">High Risk</p>
                <p className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1">{filteredResidents.filter((r) => r.risk === "High" || r.risk === "high").length}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-xs">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Support Plans</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{filteredResidents.filter((r) => r.supportPlan || r.supportStatus === "Active").length}</p>
              </div>
            </div>

            {/* Main Section Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Active Profiles Ledger */}
              <div className="lg:col-span-4 space-y-3">
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
                          value={hbFilter}
                          onChange={(e) => setHbFilter(e.target.value)}
                          className="w-full text-xs border rounded-lg py-1.5 px-2 bg-gray-50 dark:bg-gray-700/40 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 focus:outline-none"
                        >
                          <option value="All">All HB Status</option>
                          <option value="Issues Only">Issues Only</option>
                          <option value="Authorized & Active">Authorized & Active</option>
                          <option value="CANCELLED / STOPPED">Cancelled</option>
                          <option value="Suspended — Info Requested">Suspended</option>
                        </select>
                        <hr className="border-gray-100 dark:border-gray-700" />
                        <select
                          value={riskFilter}
                          onChange={(e) => setRiskFilter(e.target.value)}
                          className="w-full text-xs border rounded-lg py-1.5 px-2 bg-gray-50 dark:bg-gray-700/40 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 focus:outline-none"
                        >
                          <option value="All">All Risk</option>
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
                  {filteredResidents.map((r) => {
                    const isSelected = activeResident?.id === r.id;
                    const hasAlert = isClaimBroken(r.housingBenefitClaim?.status);
                    return (
                      <div
                        key={r.id}
                        onClick={() => setSelectedResident(r)}
                        className={`rounded-xl border cursor-pointer transition p-3.5 bg-white dark:bg-gray-800 shadow-xs flex flex-col justify-between gap-2 relative ${
                          isSelected ? "border-violet-500 ring-2 ring-violet-500/10" : "border-gray-100 dark:border-gray-700 hover:border-gray-200"
                        } ${hasAlert ? "border-l-4 border-l-rose-500" : ""}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-3 min-w-0">
                            <img src={r.avatar} alt="" className="w-9 h-9 rounded-full object-cover shrink-0" />
                            <div className="min-w-0">
                              <h3 className="text-xs font-bold text-gray-900 dark:text-white truncate flex items-center gap-1">
                                {r.name}
                                {hasAlert && <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />}
                              </h3>
                              <p className="text-[10px] text-gray-400 font-mono">{r.id} • Coach: {r.supportCoach}</p>
                            </div>
                          </div>
                          <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono border uppercase shrink-0 ${getHbStatusClasses(r.housingBenefitClaim?.status)}`}>
                            {r.housingBenefitClaim?.status.split(" ")[0]}
                          </span>
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t border-gray-50 dark:border-gray-700/50 text-[11px]">
                          <span className="text-gray-400 font-medium">Weekly Metric:</span>
                          <strong className="text-gray-800 dark:text-gray-200 font-mono">£{(r.housingBenefitClaim?.weeklyAmount || 0).toFixed(2)}</strong>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Detailed Workspace Deck */}
              <div className="lg:col-span-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col">
                {activeResident && (
                  <>
                    {isClaimBroken(activeResident.housingBenefitClaim?.status) && (
                      <div className="bg-rose-600 text-white px-6 py-2.5 text-xs font-semibold flex items-center gap-2 shadow-inner">
                        <AlertOctagon size={16} className="shrink-0" />
                        <span>ATTENTION REQUIRED: Local Authority claim status is currently marked as {activeResident.housingBenefitClaim?.status}.</span>
                      </div>
                    )}

                    {/* Profile Information Block */}
                    <div className="p-6 bg-gray-50/50 dark:bg-gray-700/20 border-b border-gray-100 dark:border-gray-700">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                        <div className="flex gap-3 items-center">
                          <img src={activeResident.avatar} alt="" className="w-12 h-12 rounded-full object-cover border" />
                          <div>
                            <h2 className="text-base font-bold text-gray-900 dark:text-white">{activeResident.name}</h2>
                            <p className="text-xs text-gray-400">
                              Unit Suite: {activeResident.propertyName} ({activeResident.roomAllocated}) • **Assigned Coach**: {activeResident.supportCoach}
                            </p>
                          </div>
                        </div>
                        <span className={`text-xs px-2.5 py-1 rounded-lg font-bold border ${getHbStatusClasses(activeResident.housingBenefitClaim?.status)}`}>
                          Claim: {activeResident.housingBenefitClaim?.status}
                        </span>
                      </div>

                      {/* Navigation Nodes Switcher */}
                      <div className="mt-5 flex gap-4 border-b border-gray-200 dark:border-gray-700 pb-0.5 overflow-x-auto scrollbar-none">
                        <button
                          onClick={() => setActiveTab("benefits")}
                          className={`flex items-center gap-1.5 pb-2 text-xs font-semibold uppercase tracking-wider border-b-2 transition whitespace-nowrap ${
                            activeTab === "benefits" ? "border-violet-600 text-violet-600 dark:border-violet-400 dark:text-violet-400" : "border-transparent text-gray-400 hover:text-gray-600"
                          }`}
                        >
                          <Receipt size={14} /> Payment History Logs
                        </button>
                        <button
                          onClick={() => setActiveTab("sessions")}
                          className={`flex items-center gap-1.5 pb-2 text-xs font-semibold uppercase tracking-wider border-b-2 transition whitespace-nowrap ${
                            activeTab === "sessions" ? "border-violet-600 text-violet-600 dark:border-violet-400 dark:text-violet-400" : "border-transparent text-gray-400 hover:text-gray-600"
                          }`}
                        >
                          <Calendar size={14} /> Support Sessions Tracker
                        </button>
                        <button
                          onClick={() => setActiveTab("tickets")}
                          className={`flex items-center gap-1.5 pb-2 text-xs font-semibold uppercase tracking-wider border-b-2 transition whitespace-nowrap ${
                            activeTab === "tickets" ? "border-violet-600 text-violet-600 dark:border-violet-400 dark:text-violet-400" : "border-transparent text-gray-400 hover:text-gray-600"
                          }`}
                        >
                          <AlertTriangle size={14} /> Escalations ({activeResident.supportTickets?.length || 0})
                        </button>
                      </div>
                    </div>

                    {/* Scrollable Workspace Center */}
                    <div className="p-6 grow overflow-y-auto max-h-[480px]">

                      {/* HOUSING BENEFIT & CYCLE CODES */}
                      {activeTab === "benefits" && (
                        <div className="space-y-5">
                          <div className="bg-gray-50 dark:bg-gray-900/40 border dark:border-gray-700 p-4 rounded-xl flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                            <div>
                              <h4 className="text-xs font-bold text-gray-400 uppercase">Local Authority Remittance Parameters</h4>
                              <p className="text-sm font-mono font-bold text-gray-800 dark:text-gray-200 mt-0.5">
                                Ref Number: {activeResident.housingBenefitClaim?.referenceNumber}
                              </p>
                            </div>
                            <span className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1">
                              <Landmark size={12} className="text-violet-500" /> {activeResident.housingBenefitClaim?.localAuthority}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 border dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-3xs">
                              <span className="text-[11px] text-gray-400 block font-semibold uppercase">Weekly Payment Equivalents</span>
                              <span className={`text-2xl font-black block mt-1 font-mono ${isClaimBroken(activeResident.housingBenefitClaim?.status) ? "text-rose-500 line-through" : "text-gray-900 dark:text-white"}`}>
                                £{(activeResident.housingBenefitClaim?.weeklyAmount || 0).toFixed(2)}
                              </span>
                            </div>
                            <div className="p-4 border dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-3xs">
                              <span className="text-[11px] text-gray-400 block font-semibold uppercase">4-Weekly Trailing Cycle Base</span>
                              <span className={`text-2xl font-black block mt-1 font-mono ${isClaimBroken(activeResident.housingBenefitClaim?.status) ? "text-rose-500 line-through" : "text-gray-900 dark:text-white"}`}>
                                £{((activeResident.housingBenefitClaim?.weeklyAmount || 0) * 4).toFixed(2)}
                              </span>
                            </div>
                          </div>

                          <div className="border dark:border-gray-700 rounded-xl overflow-hidden text-xs shadow-3xs">
                            <table className="w-full text-left">
                              <thead className="bg-gray-50 dark:bg-gray-700/40 text-gray-400 font-medium border-b dark:border-gray-700">
                                <tr>
                                  <th className="p-2.5">Remittance Cycle Period</th>
                                  <th className="p-2.5">Method</th>
                                  <th className="p-2.5">Clearance Date</th>
                                  <th className="p-2.5">Status Check</th>
                                  <th className="p-2.5 text-right">Amount Disbursed</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-600 dark:text-gray-300">
                                {activeResident.housingBenefitClaim?.paymentHistory.map((pay, pIdx) => (
                                  <tr key={pIdx} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/20">
                                    <td className="p-2.5 font-medium text-gray-800 dark:text-gray-200">{pay.period}</td>
                                    <td className="p-2.5 font-mono text-[11px] text-gray-400">{pay.method}</td>
                                    <td className="p-2.5 font-mono text-[11px] text-gray-400">{pay.dateCleared}</td>
                                    <td className="p-2.5">
                                      <span className={`text-[10px] px-2 py-0.5 border rounded-sm font-medium ${getHistoryBadgeClass(pay.status)}`}>
                                        {pay.status}
                                      </span>
                                    </td>
                                    <td className="p-2.5 font-mono text-right font-bold text-gray-900 dark:text-white">
                                      £{pay.amountPaid.toFixed(2)}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* SUPPORT SESSIONS SEPARATION SYSTEM */}
                      {activeTab === "sessions" && (
                        <div className="space-y-6">
                          <div className="flex justify-between items-center border-b pb-2">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Support Delivery Infrastructure</h3>
                            <button 
                              onClick={() => setIsSessionModalOpen(true)}
                              className="bg-violet-600 hover:bg-violet-700 text-white text-[11px] font-medium px-2.5 py-1 rounded-md flex items-center gap-1 transition"
                            >
                              <Plus size={12} /> Log New Session
                            </button>
                          </div>

                          {/* Section: Upcoming Track */}
                          <div className="space-y-2.5">
                            <h4 className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide flex items-center gap-1">
                              <Clock size={12} /> Upcoming Scheduled Consultations
                            </h4>
                            {activeResident.upcomingSessions?.length === 0 ? (
                              <p className="text-xs text-gray-400 italic pl-1">No upcoming sessions mapped.</p>
                            ) : (
                              activeResident.upcomingSessions?.map((sess) => (
                                <div key={sess.id} className="p-3 border border-dashed border-gray-200 dark:border-gray-700 rounded-xl bg-amber-500/5 text-xs flex justify-between items-start">
                                  <div>
                                    <div className="font-bold text-gray-800 dark:text-gray-200">Focus: {sess.focus}</div>
                                    <p className="text-[11px] text-gray-400 mt-0.5 font-mono">Coach: {sess.coach}</p>
                                  </div>
                                  <div className="text-right text-[10px] font-mono text-amber-700 font-bold bg-amber-100 dark:bg-amber-950/40 px-2 py-0.5 rounded">
                                    {sess.date} @ {sess.time}
                                  </div>
                                </div>
                              ))
                            )}
                          </div>

                          {/* Section: Historical Logs */}
                          <div className="space-y-2.5">
                            <h4 className="text-[11px] font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wide flex items-center gap-1">
                              <CheckCircle2 size={12} /> Completed Historical Logs
                            </h4>
                            {activeResident.pastSessions?.length === 0 ? (
                              <p className="text-xs text-gray-400 italic pl-1">No historical support interaction records verified.</p>
                            ) : (
                              activeResident.pastSessions?.map((sess) => (
                                <div key={sess.id} className="p-3 border dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800 text-xs">
                                  <div className="flex justify-between text-gray-400 text-[10px] mb-1 font-mono">
                                    <span>Date Monitored: <strong className="text-gray-600 dark:text-gray-300">{sess.date} ({sess.time})</strong></span>
                                    <span>Ref: {sess.id}</span>
                                  </div>
                                  <div className="font-bold text-gray-800 dark:text-gray-100">Focus Parameters: {sess.focus}</div>
                                  <p className="text-gray-500 text-[11px] mt-1 bg-white dark:bg-gray-900 p-2 rounded border border-gray-100 dark:border-gray-800 italic">
                                    "{sess.outcome}"
                                  </p>
                                  <div className="mt-2 text-[10px] text-gray-400">
                                    Verified Support Coach: <span className="font-medium text-gray-600 dark:text-gray-300">{sess.coach}</span>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      )}

                      {/* STRUCTURAL CASES */}
                      {activeTab === "tickets" && (
                        <div className="space-y-3">
                          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Administrative Escalations</h3>
                          {activeResident.supportTickets?.length === 0 ? (
                            <p className="text-xs text-gray-400 italic py-4 text-center">No structural verification holds or agency notifications active.</p>
                          ) : (
                            activeResident.supportTickets?.map((tck) => (
                              <div key={tck.id} className="p-3 border dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-between text-xs">
                                <div>
                                  <span className="text-[9px] uppercase font-bold text-red-600 bg-red-50 px-1 rounded">{tck.priority} Priority</span>
                                  <h4 className="font-bold text-gray-800 dark:text-gray-200 mt-1">{tck.title}</h4>
                                </div>
                                <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-violet-50 text-violet-700">{tck.status}</span>
                              </div>
                            ))
                          )}
                        </div>
                      )}

                    </div>
                  </>
                )}
              </div>

            </div>

          </div>
        </main>

        {/* MODAL: LOG NEW SUPPORT SESSION + AI CO-PILOT ASSISTANT */}
        {isSessionModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full h-[600px] flex flex-col overflow-hidden border dark:border-gray-700 shadow-2xl relative animate-fadeIn">
              
              {/* Modal Core Header */}
              <div className="p-4 bg-gray-50 dark:bg-gray-700/40 border-b flex justify-between items-center shrink-0">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                    <Calendar size={16} className="text-violet-600" /> Log Active Support Framework Interaction
                  </h3>
                  <p className="text-[11px] text-gray-400 font-mono">Recording Account: {activeResident?.name} | Coach: {activeResident?.supportCoach}</p>
                </div>
                <button onClick={() => setIsSessionModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
              </div>

              {/* Two Column Split Workspace Arena */}
              <div className="grow flex overflow-hidden">
                
                {/* Left side: Data Entry Fields */}
                <form onSubmit={handleLogSessionSubmit} className="w-1/2 p-5 overflow-y-auto border-r dark:border-gray-700 space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-gray-400 mb-1">Date Conducted</label>
                      <input type="date" value={sessionForm.date} onChange={e => setSessionForm({...sessionForm, date: e.target.value})} className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 outline-none font-mono" />
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-400 mb-1">Time Block</label>
                      <input type="text" value={sessionForm.time} onChange={e => setSessionForm({...sessionForm, time: e.target.value})} className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 outline-none font-mono" />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-400 mb-1">Document Attachment / Evidence File</label>
                    <div className="border border-dashed border-gray-200 dark:border-gray-600 rounded-xl p-4 text-center relative hover:bg-gray-50/50 transition">
                      <input type="file" onChange={handleFileUploadMock} className="absolute inset-0 opacity-0 cursor-pointer" />
                      <Upload size={20} className="mx-auto text-gray-400 mb-1.5" />
                      <p className="text-[11px] text-gray-500">Drag meeting transcripts, hand-written draft notes, or outcome frameworks here</p>
                      {sessionForm.fileName && (
                        <div className="mt-2 text-[10px] text-emerald-600 font-mono bg-emerald-50 dark:bg-emerald-950/20 py-1 px-2 rounded inline-flex items-center gap-1">
                          <FileText size={12} /> {sessionForm.fileName} Attached
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-400 mb-1">Session Support Focus Parameters</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="e.g. Tenancy Independence Strategy review" 
                      value={sessionForm.focus} 
                      onChange={e => setSessionForm({...sessionForm, focus: e.target.value})} 
                      className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 outline-none text-gray-800 dark:text-gray-100" 
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-400 mb-1">Monitored Outcomes / Discussion Summary</label>
                    <textarea 
                      required
                      rows={5}
                      placeholder="Type details or use the AI Log Advisor on the right to auto-populate cleaned summaries..." 
                      value={sessionForm.outcome} 
                      onChange={e => setSessionForm({...sessionForm, outcome: e.target.value})} 
                      className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 outline-none text-gray-800 dark:text-gray-100 font-mono leading-relaxed" 
                    />
                  </div>

                  <button type="submit" className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2.5 rounded-lg transition text-xs shadow-xs">
                    Commit Clean Log to Track History
                  </button>
                </form>

                {/* Right side: AI Advisor Interface Node */}
                <div className="w-1/2 bg-gray-50 dark:bg-gray-900/60 flex flex-col h-full overflow-hidden">
                  
                  {/* AI Sub Header */}
                  <div className="p-3 bg-violet-50 dark:bg-violet-950/20 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center shrink-0">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-violet-700 dark:text-violet-400 flex items-center gap-1">
                      <Sparkles size={14} /> AI Log Assistant Advisor
                    </span>
                    <button 
                      onClick={handleApplyAiSuggestions}
                      className="text-[10px] bg-violet-600 hover:bg-violet-700 text-white px-2 py-0.5 rounded font-medium shadow-3xs transition"
                    >
                      Apply Suggestions
                    </button>
                  </div>

                  {/* Chat Message Scroll Node */}
                  <div className="grow overflow-y-auto p-4 space-y-3 text-xs">
                    {aiMessages.map((msg, mIdx) => (
                      <div key={mIdx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-xl p-3 leading-relaxed whitespace-pre-wrap ${
                          msg.role === 'user' 
                            ? 'bg-violet-600 text-white font-mono text-[11px]' 
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border dark:border-gray-700 shadow-3xs text-[11px]'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input Bar */}
                  <form onSubmit={handleSendAiMessage} className="p-3 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex gap-2 shrink-0">
                    <input 
                      type="text" 
                      placeholder="Ask advisor to clean notes, verify formatting anomalies..." 
                      value={aiChatInput}
                      onChange={e => setAiChatInput(e.target.value)}
                      className="grow bg-gray-50 dark:bg-gray-700 text-xs rounded-lg border px-3 outline-none focus:ring-1 focus:ring-violet-500"
                    />
                    <button type="submit" className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 rounded-lg transition text-gray-500">
                      <Send size={14} />
                    </button>
                  </form>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* MODAL: ONBOARD NEW PROFILE ENTRY */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-xs">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6 border dark:border-gray-700 shadow-2xl relative">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={20} /></button>
              <h3 className="text-xs font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Initialize Support Suite Setup</h3>
              
              <form onSubmit={handleRegisterResident} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-medium text-gray-400 mb-1">Full Legal Name</label>
                  <input required type="text" placeholder="e.g. Liam Smith" value={newResident.name} onChange={e => setNewResident({...newResident, name: e.target.value})} className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 outline-none" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-gray-400 mb-1">Target Property placement</label>
                    <select value={newResident.propertyName} onChange={e => setNewResident({...newResident, propertyName: e.target.value})} className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 outline-none">
                      <option value="Belgrave Court">Belgrave Court</option>
                      <option value="Moseley Haven">Moseley Haven</option>
                      <option value="Edgbaston Hub">Edgbaston Hub</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium text-gray-400 mb-1">Support Coach Assignment</label>
                    <select value={newResident.supportCoach} onChange={e => setNewResident({...newResident, supportCoach: e.target.value})} className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 outline-none">
                      <option value="Sarah Jenkins">Sarah Jenkins</option>
                      <option value="David Marcus">David Marcus</option>
                      <option value="Amara Okafor">Amara Okafor</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-violet-500/5 border border-violet-500/10 rounded-xl space-y-3">
                  <h4 className="text-[10px] font-bold text-violet-600 uppercase tracking-wider">Housing Benefit Framework Parameters</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-gray-400 mb-1">Initial Entitlement Status</label>
                      <select value={newResident.hbStatus} onChange={e => setNewResident({...newResident, hbStatus: e.target.value})} className="w-full border rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-800 outline-none">
                        <option value="Authorized & Active">Authorized & Active</option>
                        <option value="Pending Assessment">Pending Assessment</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-medium text-gray-400 mb-1">Weekly Claim Index (£)</label>
                      <input type="number" step="0.01" placeholder="195.00" value={newResident.hbWeeklyAmount} onChange={e => setNewResident({...newResident, hbWeeklyAmount: e.target.value})} className="w-full border rounded-lg p-2 bg-white dark:bg-gray-700 outline-none" />
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 rounded-lg transition mt-2">
                  Commit Entry to Active Registers
                </button>
              </form>
            </div>
          </div>
        )}

        <Banner />
      </div>
    </div>
  );
}

function AlertCircle(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

export default Residents;