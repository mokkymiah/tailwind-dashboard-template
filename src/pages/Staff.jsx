import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Banner from "../partials/Banner";
import {
  Users,
  Search,
  Filter,
  Plus,
  Calendar,
  Shield,
  Sparkles,
  Upload,
  Send,
  FileText,
  X,
  CheckCircle2,
  UserCheck,
  Mail,
  Phone,
  BadgeCheck,
  BarChart3,
  Briefcase,
  Building,
  KeyRound,
  MessageSquare,
  Video,
  Clock,
  ChevronRight,
  AlertCircle,
  Check,
} from "lucide-react";

// Robust 40-item personnel database with live operational status metrics and calendar events
const INITIAL_STAFF = Array.from({ length: 40 }, (_, i) => {
  const roles = [
    "Senior Facilities Manager",
    "RICS Chartered Surveyor",
    "H&S Compliance Lead",
    "Senior Electrical Engineer",
    "HVAC Technical Specialist",
    "Plumbing Operations Lead",
    "HMO Property Coordinator",
    "Environmental Impact Assessor",
  ];
  const departments = [
    "Operations",
    "Compliance",
    "Engineering",
    "Asset Management",
  ];
  const baseStatuses = ["Active", "On Site", "In Training", "On Leave"];
  const clearableTiers = [
    "Tier 1 (Full Admin)",
    "Tier 2 (Operator)",
    "Tier 3 (View-Only)",
  ];

  // Realtime structural availability signals
  const liveAvailabilityStates = [
    "Online",
    "In a Meeting",
    "On Site Inspection",
    "Do Not Disturb",
    "Offline",
  ];

  const names = [
    "Liam Vance",
    "Clara Sterling",
    "David Mercer",
    "Rachel Cross",
    "Marcus Brody",
    "Elena Rostova",
    "Simon Pendelton",
    "Aisha Rahman",
    "Julian Vance",
    "Fiona Gallagher",
  ];

  const baseName = names[i % names.length];
  const formattedName = `${baseName} ${String.fromCharCode(65 + (i % 26))}.`;
  const roleStr = roles[i % roles.length];
  const deptStr = departments[i % departments.length];
  const statusStr = baseStatuses[i % baseStatuses.length];
  const tierStr = clearableTiers[i % clearableTiers.length];
  const livePresence =
    liveAvailabilityStates[i % liveAvailabilityStates.length];

  return {
    id: `STF-${3000 + i}`,
    name: formattedName,
    role: roleStr,
    department: deptStr,
    status: statusStr,
    clearance: tierStr,
    presence: livePresence,
    avatar: `https://images.unsplash.com/photo-${i % 2 === 0 ? "1534528741775-53994a69daeb" : "1507003211169-0a1dd7228f2d"}?auto=format&fit=crop&w=150&h=150&q=80`,
    email: `${baseName.toLowerCase().replace(" ", ".")}@nexus-facilities.com`,
    phone: `+44 7700 900${100 + i}`,
    joinedDate: `202${(i % 6) + 1}-03-${String((i % 28) + 1).padStart(2, "0")}`,
    biography: `Certified specialist managing physical framework vectors across standard operational boundaries. Assigned primary validation clearing duties aligned with 2026 organizational directives.`,
    // Mock structural timeline calendar arrays
    calendarSchedule: [
      {
        time: "09:00 - 10:30",
        event: "Asset Handover Briefing",
        type: "meeting",
      },
      {
        time: "11:00 - 13:00",
        event: "HVAC Plant Inspection (Zone B)",
        type: "site",
      },
      {
        time: "14:30 - 15:30",
        event: "Compliance Sign-off Review",
        type: "compliance",
      },
      { time: "16:00 - 17:00", event: "Engineering Team Sync", type: "sync" },
    ],
  };
});

const COUNTERS = {
  totalStaff: INITIAL_STAFF.length,
  onlineCount: INITIAL_STAFF.filter(
    (s) => s.presence === "Online" || s.presence === "In a Meeting",
  ).length,
  engineeringCount: INITIAL_STAFF.filter((s) => s.department === "Engineering")
    .length,
  adminClearance: INITIAL_STAFF.filter((s) => s.clearance.includes("Tier 1"))
    .length,
};

function Staff() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [staffList, setStaffList] = useState(INITIAL_STAFF);
  const [searchTerm, setSearchTerm] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [presenceFilter, setPresenceFilter] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);

  // Selection Profiles Focus
  const [selectedStaff, setSelectedStaff] = useState(INITIAL_STAFF[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

  // Workspace Utility Panel Toggle Interactions
  const [activePanelTab, setActivePanelTab] = useState("calendar"); // calendar | message | schedule
  const [chatMessageInput, setChatMessageInput] = useState("");
  const [chatLog, setChatLog] = useState([
    {
      sender: "them",
      text: "Hey! Just finished checking the primary boiler pressure metrics.",
      time: "10:24 AM",
    },
  ]);

  // Meeting Schedule Worksheet State
  const [meetingForm, setMeetingForm] = useState({
    title: "",
    date: "2026-06-10",
    time: "10:00",
    duration: "30",
  });
  const [notificationBanner, setNotificationBanner] = useState(null);

  // Form Field State Infrastructure
  const [formState, setFormState] = useState({
    name: "",
    role: "Senior Facilities Manager",
    department: "Operations",
    status: "Active",
    clearance: "Tier 2 (Operator)",
    narrative: "",
    cvName: "",
  });

  // AI Assistant Ingestion State
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState([
    {
      role: "assistant",
      text: "Welcome to the AI Profile Processing Copilot. Drop a team member CV to extract credentials automatically.",
    },
  ]);

  // Filter Operations Logic
  const filteredStaff = staffList.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === "All" || s.department === deptFilter;
    const matchesPresence =
      presenceFilter === "All" || s.presence === presenceFilter;

    return matchesSearch && matchesDept && matchesPresence;
  });

  // Presence Color Indicator Utilities
  const getPresenceStyles = (presence) => {
    switch (presence) {
      case "Online":
        return "bg-green-500 ring-green-100 dark:ring-green-950/50";
      case "In a Meeting":
        return "bg-amber-500 ring-amber-100 dark:ring-amber-950/50";
      case "On Site Inspection":
        return "bg-blue-500 ring-blue-100 dark:ring-blue-950/50";
      case "Do Not Disturb":
        return "bg-red-500 ring-red-100 dark:ring-red-950/50";
      default:
        return "bg-gray-400 ring-gray-100 dark:ring-gray-800";
    }
  };

  const triggerToastNotification = (msg) => {
    setNotificationBanner(msg);
    setTimeout(() => setNotificationBanner(null), 4000);
  };

  const handleSendInstantMessage = (e) => {
    e.preventDefault();
    if (!chatMessageInput.trim()) return;

    setChatLog((prev) => [
      ...prev,
      { sender: "me", text: chatMessageInput, time: "11:49 PM" },
    ]);
    setChatMessageInput("");

    setTimeout(() => {
      setChatLog((prev) => [
        ...prev,
        {
          sender: "them",
          text: "Received. Updating system logs shortly.",
          time: "11:50 PM",
        },
      ]);
    }, 1000);
  };

  const handleBookMeeting = (e) => {
    e.preventDefault();
    if (!meetingForm.title.trim()) return;

    triggerToastNotification(
      `Meeting "${meetingForm.title}" scheduled successfully with ${selectedStaff.name}`,
    );
    setMeetingForm({
      title: "",
      date: "2026-06-10",
      time: "10:00",
      duration: "30",
    });
  };

  const handleOnboardStaff = (e) => {
    e.preventDefault();
    const createdRecord = {
      id: `STF-${Date.now().toString().slice(-4)}`,
      name: formState.name || "Anonymous Asset Associate",
      role: formState.role,
      department: formState.department,
      status: formState.status,
      clearance: formState.clearance,
      presence: "Online",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
      email: formState.name
        ? `${formState.name.toLowerCase().replace(/\s+/g, "")}@nexus-facilities.com`
        : "internal@nexus-facilities.com",
      phone: "+44 7700 955211",
      joinedDate: "2026-06-09",
      biography:
        formState.narrative ||
        "Profile initialized manually via framework deployment utility engines.",
      calendarSchedule: [
        { time: "10:00 - 11:00", event: "System Induction Sync", type: "sync" },
      ],
    };

    setStaffList([createdRecord, ...staffList]);
    setSelectedStaff(createdRecord);
    setIsModalOpen(false);
    setFormState({
      name: "",
      role: "Senior Facilities Manager",
      department: "Operations",
      status: "Active",
      clearance: "Tier 2 (Operator)",
      narrative: "",
      cvName: "",
    });
  };

  return (
    <div className="flex h-screen overflow-hidden text-xs">
      {/* Dynamic Toast Feedback Container banner */}
      {notificationBanner && (
        <div className="fixed top-4 right-4 z-[100] bg-gray-900 text-white dark:bg-teal-950 dark:text-teal-200 border border-teal-500/20 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-in">
          <CheckCircle2 className="text-teal-400 shrink-0" size={16} />
          <span className="font-medium tracking-tight">
            {notificationBanner}
          </span>
        </div>
      )}

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Component Layout Heading Control Block */}
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium inline-flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-xs transition duration-150"
              >
                <Plus size={16} />
                <span>Staff</span>
              </button>
            </div>

            {/* KPI Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-xs">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Staff</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{filteredStaff.length}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-xs">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">On Duty</p>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{filteredStaff.filter((s) => s.status === "Active" || s.status === "On Duty").length}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-xs">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">On Leave</p>
                <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">{filteredStaff.filter((s) => s.status === "On Leave" || s.status === "Leave").length}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-xs">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Unavailable</p>
                <p className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1">{filteredStaff.filter((s) => s.status === "Offline" || s.status === "Inactive").length}</p>
              </div>
            </div>

            {/* Matrix Operational Analytics Summary Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 text-gray-800 dark:text-gray-200">
              <div className="bg-white dark:bg-gray-800 p-4 border dark:border-gray-700 rounded-xl shadow-3xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Total Tracked Personnel
                  </span>
                  <span className="text-2xl font-black font-mono text-gray-900 dark:text-white mt-0.5">
                    {COUNTERS.totalStaff}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-400">
                  <BarChart3 size={18} />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 border dark:border-gray-700 rounded-xl shadow-3xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase tracking-wider block">
                    Available Online Now
                  </span>
                  <span className="text-2xl font-black font-mono text-green-600 dark:text-green-400 mt-0.5">
                    {COUNTERS.onlineCount}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-green-50 dark:bg-green-950/20 text-green-500">
                  <UserCheck size={18} />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 border dark:border-gray-700 rounded-xl shadow-3xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                    Engineering Force Base
                  </span>
                  <span className="text-2xl font-black font-mono text-blue-600 dark:text-blue-400 mt-0.5">
                    {COUNTERS.engineeringCount}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/20 text-blue-500">
                  <Briefcase size={18} />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 border dark:border-gray-700 rounded-xl shadow-3xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                    Tier 1 Permissions Matrix
                  </span>
                  <span className="text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400 mt-0.5">
                    {COUNTERS.adminClearance}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/20 text-indigo-500">
                  <Shield size={18} />
                </div>
              </div>
            </div>

            {/* Split Page Multi Dashboard Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Staff Roster Feed Container Grid */}
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
                          value={deptFilter}
                          onChange={(e) => setDeptFilter(e.target.value)}
                          className="w-full text-xs border rounded-lg py-1.5 px-2 bg-gray-50 dark:bg-gray-700/40 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 focus:outline-none"
                        >
                          <option value="All">All Departments</option>
                          <option value="Operations">Operations</option>
                          <option value="Compliance">Compliance</option>
                          <option value="Engineering">Engineering</option>
                          <option value="Asset Management">Asset Management</option>
                        </select>
                        <hr className="border-gray-100 dark:border-gray-700" />
                        <select
                          value={presenceFilter}
                          onChange={(e) => setPresenceFilter(e.target.value)}
                          className="w-full text-xs border rounded-lg py-1.5 px-2 bg-gray-50 dark:bg-gray-700/40 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 focus:outline-none"
                        >
                          <option value="All">All Presence</option>
                          <option value="Online">Online</option>
                          <option value="In a Meeting">In a Meeting</option>
                          <option value="On Site Inspection">On Site Inspection</option>
                          <option value="Do Not Disturb">Do Not Disturb</option>
                          <option value="Offline">Offline</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
                  {filteredStaff.length === 0 ? (
                    <div className="p-12 border rounded-xl text-center text-gray-400 bg-white dark:bg-gray-800 italic">
                      Zero personnel matrix points match the configured query
                      values.
                    </div>
                  ) : (
                    filteredStaff.map((person) => {
                      const isSelected = selectedStaff?.id === person.id;

                      return (
                        <div
                          key={person.id}
                          onClick={() => {
                            setSelectedStaff(person);
                            setMobileDetailOpen(true);
                            setChatLog([
                              {
                                sender: "them",
                                text: `Hi, this is ${person.name.split(" ")[0]}. Let me know if you need updates on my assigned zones.`,
                                time: "10:00 AM",
                              },
                            ]);
                          }}
                          className={`rounded-xl border cursor-pointer transition p-3.5 bg-white dark:bg-gray-800 shadow-3xs flex flex-col justify-between gap-2 relative hover:border-gray-300 dark:hover:border-gray-600 ${
                            isSelected
                              ? "border-teal-500 ring-2 ring-teal-500/10 dark:border-teal-400"
                              : "border-gray-100 dark:border-gray-700/80"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex gap-3">
                              {/* Portals Avatar Wrapper With Presence Color Dot */}
                              <div className="relative shrink-0">
                                <img
                                  src={person.avatar}
                                  alt={person.name}
                                  className="w-10 h-10 rounded-full object-cover border border-gray-100 dark:border-gray-700 bg-gray-50"
                                />
                                <span
                                  className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white dark:ring-gray-800 ${getPresenceStyles(person.presence)}`}
                                />
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[10px] font-mono font-bold text-gray-400">
                                    {person.id}
                                  </span>
                                  <span className="text-[10px] bg-gray-100 dark:bg-gray-700 px-1.5 py-0.2 rounded font-sans text-gray-500 dark:text-gray-300">
                                    {person.department}
                                  </span>
                                </div>
                                <h3 className="text-xs font-bold text-gray-900 dark:text-white mt-1 leading-snug">
                                  {person.name}
                                </h3>
                                <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium mt-0.5">
                                  {person.role}
                                </p>
                              </div>
                            </div>

                            <span className="text-[10px] font-medium text-gray-400 dark:text-gray-400 flex items-center gap-1">
                              <Clock size={11} /> {person.presence}
                            </span>
                          </div>

                          <div className="flex justify-between items-center pt-2 mt-0.5 border-t border-gray-50 dark:border-gray-700/50 text-[10px] text-gray-400 font-mono">
                            <span className="flex items-center gap-1 font-sans text-gray-500 dark:text-gray-400 truncate max-w-[180px]">
                              <Mail size={11} className="text-gray-400" />{" "}
                              {person.email}
                            </span>
                            <span className="text-teal-600 dark:text-teal-400 font-medium flex items-center gap-0.5">
                              View Workspace <ChevronRight size={12} />
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Right Column: Detailed View Tabbed Control Frame Matrix */}
              {mobileDetailOpen && (
                <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setMobileDetailOpen(false)} />
              )}
              <div className={`flex flex-col ${
                mobileDetailOpen
                  ? 'fixed inset-4 z-50 overflow-y-auto lg:static lg:inset-auto lg:z-auto lg:col-span-7 lg:flex lg:overflow-visible'
                  : 'hidden lg:col-span-7 lg:flex'
              }`}>
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col h-full min-h-[600px]">
                  {selectedStaff ? (
                    <>
                      {/* Detailed View Master Header Subsystem */}
                      <div className="p-4 bg-gray-50/70 dark:bg-gray-700/30 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative">
                        <button
                          onClick={() => setMobileDetailOpen(false)}
                          className="lg:hidden absolute top-4 right-4 p-1.5 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition text-gray-500 dark:text-gray-300"
                        >
                          <X size={18} />
                        </button>
                        <div className="flex items-center gap-3.5">
                          <div className="relative">
                            <img
                              src={selectedStaff.avatar}
                              alt={selectedStaff.name}
                              className="w-12 h-12 rounded-xl object-cover border-2 border-white dark:border-gray-700 shadow-sm bg-gray-100"
                            />
                            <span
                              className={`absolute -bottom-1 -right-1 block h-3 w-3 rounded-full ring-2 ring-white dark:ring-gray-800 ${getPresenceStyles(selectedStaff.presence)}`}
                            />
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-400 block font-mono">
                              NEXUS SYSTEM INDEX ENTITY: {selectedStaff.id}
                            </span>
                            <h2 className="font-bold text-gray-900 dark:text-white mt-0.5 text-sm flex items-center gap-1.5">
                              {selectedStaff.name}{" "}
                              <BadgeCheck
                                size={14}
                                className="text-teal-600 fill-teal-50 dark:fill-transparent"
                              />
                            </h2>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400">
                              {selectedStaff.role} •{" "}
                              <span className="font-medium text-teal-600 dark:text-teal-400">
                                {selectedStaff.presence}
                              </span>
                            </p>
                          </div>
                        </div>

                        {/* Interactive Tab Headers Switch Controls */}
                        <div className="flex bg-gray-100 dark:bg-gray-900 p-0.5 rounded-lg border dark:border-gray-700 text-[11px] font-medium self-start sm:self-center">
                          <button
                            onClick={() => setActivePanelTab("calendar")}
                            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition ${activePanelTab === "calendar" ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-xs" : "text-gray-500 hover:text-gray-700"}`}
                          >
                            <Calendar size={13} /> Schedule
                          </button>
                          <button
                            onClick={() => setActivePanelTab("message")}
                            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition ${activePanelTab === "message" ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-xs" : "text-gray-500 hover:text-gray-700"}`}
                          >
                            <MessageSquare size={13} /> Chat Link
                          </button>
                          <button
                            onClick={() => setActivePanelTab("schedule")}
                            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition ${activePanelTab === "schedule" ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-xs" : "text-gray-500 hover:text-gray-700"}`}
                          >
                            <Video size={13} /> Book Meeting
                          </button>
                        </div>
                      </div>

                      {/* Tab Display Area Layer */}
                      <div className="p-5 grow overflow-y-auto bg-white dark:bg-gray-800">
                        {/* Tab Segment A: Core Calendar Tracking Overview */}
                        {activePanelTab === "calendar" && (
                          <div className="space-y-5 animate-fade-in">
                            <div>
                              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                                Live Availability Timeline (Today)
                              </h4>
                              <div className="border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden divide-y divide-gray-50 dark:divide-gray-700 font-mono text-[11px]">
                                {selectedStaff.calendarSchedule.map(
                                  (slot, sIdx) => {
                                    const colors = {
                                      meeting:
                                        "border-l-amber-500 bg-amber-50/30 dark:bg-amber-950/5",
                                      site: "border-l-blue-500 bg-blue-50/30 dark:bg-blue-950/5",
                                      compliance:
                                        "border-l-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/5",
                                      sync: "border-l-purple-500 bg-purple-50/30 dark:bg-purple-950/5",
                                    };
                                    return (
                                      <div
                                        key={sIdx}
                                        className={`p-3 border-l-4 flex items-center justify-between gap-4 ${colors[slot.type] || "border-l-gray-300"}`}
                                      >
                                        <div className="flex items-center gap-3">
                                          <Clock
                                            size={13}
                                            className="text-gray-400 shrink-0"
                                          />
                                          <span className="font-semibold text-gray-800 dark:text-gray-200 w-24 shrink-0">
                                            {slot.time}
                                          </span>
                                          <span className="text-gray-600 dark:text-gray-300 font-sans">
                                            {slot.event}
                                          </span>
                                        </div>
                                        <span className="text-[9px] uppercase px-1.5 rounded border dark:border-gray-600 font-bold bg-white dark:bg-gray-900">
                                          {slot.type}
                                        </span>
                                      </div>
                                    );
                                  },
                                )}
                              </div>
                            </div>

                            <div className="bg-gray-50/50 dark:bg-gray-900/40 border p-4 rounded-xl space-y-3">
                              <h5 className="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                                <Building size={14} className="text-gray-400" />{" "}
                                Divisional Node Context
                              </h5>
                              <div className="grid grid-cols-2 gap-4 font-mono text-[11px]">
                                <div>
                                  <span className="text-gray-400 block">
                                    Comms Terminal
                                  </span>
                                  <span className="font-semibold text-gray-700 dark:text-gray-300 break-all">
                                    {selectedStaff.email}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-gray-400 block">
                                    Secure Mobile Run
                                  </span>
                                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                                    {selectedStaff.phone}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Tab Segment B: Live Instant Messenger Terminal */}
                        {activePanelTab === "message" && (
                          <div className="flex flex-col h-[380px] border dark:border-gray-700 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900/20 animate-fade-in">
                            <div className="bg-gray-100/70 dark:bg-gray-800 p-2.5 border-b dark:border-gray-700 flex items-center justify-between px-4">
                              <span className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                                <span
                                  className={`h-2 w-2 rounded-full ${getPresenceStyles(selectedStaff.presence)}`}
                                />{" "}
                                Secure Chat Connection
                              </span>
                              <span className="text-[10px] text-gray-400 font-mono">
                                AES-256 Encrypted
                              </span>
                            </div>

                            {/* Chat Thread Matrix Elements */}
                            <div className="grow overflow-y-auto p-4 space-y-3 font-mono text-[11px]">
                              {chatLog.map((chat, cIdx) => (
                                <div
                                  key={cIdx}
                                  className={`flex ${chat.sender === "me" ? "justify-end" : "justify-start"}`}
                                >
                                  <div
                                    className={`max-w-[80%] p-2.5 rounded-xl ${chat.sender === "me" ? "bg-teal-600 text-white" : "bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-3xs"}`}
                                  >
                                    <p className="leading-relaxed">
                                      {chat.text}
                                    </p>
                                    <span
                                      className={`text-[9px] block mt-1 text-right ${chat.sender === "me" ? "text-teal-200" : "text-gray-400"}`}
                                    >
                                      {chat.time}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <form
                              onSubmit={handleSendInstantMessage}
                              className="p-2 bg-white dark:bg-gray-800 border-t dark:border-gray-700 flex gap-2"
                            >
                              <input
                                type="text"
                                placeholder={`Transmit secure operational text packet to ${selectedStaff.name.split(" ")[0]}...`}
                                value={chatMessageInput}
                                onChange={(e) =>
                                  setChatMessageInput(e.target.value)
                                }
                                className="grow bg-gray-50 dark:bg-gray-700 px-3 py-2 border rounded-lg outline-none focus:ring-1 focus:ring-teal-500 text-[11px]"
                              />
                              <button
                                type="submit"
                                className="p-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition shrink-0"
                              >
                                <Send size={14} />
                              </button>
                            </form>
                          </div>
                        )}

                        {/* Tab Segment C: Interactive Scheduling Framework Form Sheet */}
                        {activePanelTab === "schedule" && (
                          <form
                            onSubmit={handleBookMeeting}
                            className="space-y-4 max-w-md animate-fade-in"
                          >
                            <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl flex items-start gap-2.5 text-amber-800 dark:text-amber-400">
                              <AlertCircle
                                size={14}
                                className="shrink-0 mt-0.5"
                              />
                              <p className="text-[11px]">
                                System confirmation: Scheduling actions
                                reference corporate calendar entries before
                                committing blocks.
                              </p>
                            </div>

                            <div>
                              <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                                Meeting Objective Title
                              </label>
                              <input
                                type="text"
                                required
                                placeholder="e.g. Structural Sign-Off & Permit Audit"
                                value={meetingForm.title}
                                onChange={(e) =>
                                  setMeetingForm({
                                    ...meetingForm,
                                    title: e.target.value,
                                  })
                                }
                                className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 text-xs text-gray-800 dark:text-white outline-none focus:ring-1 focus:ring-teal-500"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                                  Target Date
                                </label>
                                <input
                                  type="date"
                                  value={meetingForm.date}
                                  onChange={(e) =>
                                    setMeetingForm({
                                      ...meetingForm,
                                      date: e.target.value,
                                    })
                                  }
                                  className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 text-xs outline-none"
                                />
                              </div>
                              <div>
                                <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                                  Start Time (BST)
                                </label>
                                <input
                                  type="time"
                                  value={meetingForm.time}
                                  onChange={(e) =>
                                    setMeetingForm({
                                      ...meetingForm,
                                      time: e.target.value,
                                    })
                                  }
                                  className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 text-xs outline-none"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                                Session Duration Block
                              </label>
                              <select
                                value={meetingForm.duration}
                                onChange={(e) =>
                                  setMeetingForm({
                                    ...meetingForm,
                                    duration: e.target.value,
                                  })
                                }
                                className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 text-xs outline-none"
                              >
                                <option value="15">
                                  15 Minute Operational Sprint
                                </option>
                                <option value="30">
                                  30 Minute Status Sync
                                </option>
                                <option value="60">
                                  60 Minute Extended Technical Review
                                </option>
                              </select>
                            </div>

                            <button
                              type="submit"
                              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2.5 rounded-xl transition shadow-3xs"
                            >
                              Dispatch Calendar Invite & Lock Time Slot
                            </button>
                          </form>
                        )}

                        <div className="mt-6 pt-5 border-t dark:border-gray-700">
                          <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider mb-1">
                            Associate Biography Summary
                          </span>
                          <p className="font-mono text-[11px] leading-relaxed text-gray-600 dark:text-gray-400 p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                            {selectedStaff.biography}
                          </p>
                        </div>
                      </div>

                      {/* View Layer Operational Footer */}
                      <div className="p-3 bg-gray-50 dark:bg-gray-700/20 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-2 shrink-0">
                        <button className="px-3 py-1.5 text-gray-500 hover:text-gray-700 font-medium transition">
                          Audit System Entry History
                        </button>
                        <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-medium transition">
                          Modify Security Profile
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-12 text-center text-xs text-gray-400 italic my-auto">
                      Select an active personnel record row to render
                      interactive dashboard widgets.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* FULL INTERACTIVE ROSTER MODAL LAYER: STAFF CREATION SHEET + CO-RUN AI CV PARSING TOOL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-5xl w-full max-h-[90dvh] flex flex-col overflow-hidden border dark:border-gray-700 shadow-2xl relative">
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-b flex justify-between items-center shrink-0">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                    <Users size={16} className="text-teal-600" /> Onboard New
                    Operations & Technical Personnel
                  </h3>
                  <p className="text-[11px] text-gray-400 font-mono">
                    Map corporate resource parameters, allocate platform tiers,
                    and verify external accreditations.
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grow flex flex-col lg:flex-row overflow-hidden">
                <form
                  onSubmit={handleOnboardStaff}
                  className="w-full lg:w-1/2 p-5 overflow-y-auto border-r dark:border-gray-700 space-y-4"
                >
                  <div>
                    <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                      Associate Full Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Elena Rostova"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 outline-none font-medium text-gray-800 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                        Core Department Segment
                      </label>
                      <select
                        value={formState.department}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            department: e.target.value,
                          })
                        }
                        className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 outline-none text-gray-800 dark:text-white"
                      >
                        <option value="Operations">Operations</option>
                        <option value="Compliance">Compliance</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Asset Management">
                          Asset Management
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                        Functional Title Specialty
                      </label>
                      <select
                        value={formState.role}
                        onChange={(e) =>
                          setFormState({ ...formState, role: e.target.value })
                        }
                        className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 outline-none text-gray-800 dark:text-white"
                      >
                        <option value="Senior Facilities Manager">
                          Senior Facilities Manager
                        </option>
                        <option value="RICS Chartered Surveyor">
                          RICS Chartered Surveyor
                        </option>
                        <option value="H&S Compliance Lead">
                          H&S Compliance Lead
                        </option>
                        <option value="Senior Electrical Engineer">
                          Senior Electrical Engineer
                        </option>
                        <option value="HVAC Technical Specialist">
                          HVAC Technical Specialist
                        </option>
                        <option value="Plumbing Operations Lead">
                          Plumbing Operations Lead
                        </option>
                        <option value="HMO Property Coordinator">
                          HMO Property Coordinator
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                        Access Control Profile Level
                      </label>
                      <select
                        value={formState.clearance}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            clearance: e.target.value,
                          })
                        }
                        className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 outline-none text-gray-800 dark:text-white"
                      >
                        <option value="Tier 1 (Full Admin)">
                          Tier 1 (Full Admin)
                        </option>
                        <option value="Tier 2 (Operator)">
                          Tier 2 (Operator)
                        </option>
                        <option value="Tier 3 (View-Only)">
                          Tier 3 (View-Only)
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                        Active Field Status
                      </label>
                      <select
                        value={formState.status}
                        onChange={(e) =>
                          setFormState({ ...formState, status: e.target.value })
                        }
                        className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 outline-none text-gray-800 dark:text-white"
                      >
                        <option value="Active">Active Operational</option>
                        <option value="On Site">On Site Dispatched</option>
                        <option value="In Training">
                          In Training / Induction
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                      Supplemental Notes
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Input custom notes here..."
                      value={formState.narrative}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          narrative: e.target.value,
                        })
                      }
                      className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 outline-none font-mono text-[11px] text-gray-800 dark:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-xl transition duration-150 shadow-xs"
                  >
                    Commit Record to Core Active Database
                  </button>
                </form>

                {/* Column 2 Split Layout Panel: Placeholder Workspace */}
                <div className="w-full lg:w-1/2 bg-gray-50 dark:bg-gray-900/60 flex flex-col h-full overflow-hidden p-6 items-center justify-center text-center">
                  <Sparkles size={24} className="text-teal-500 mb-2" />
                  <h4 className="font-bold text-gray-800 dark:text-white">
                    AI Profile Ingestion Panel
                  </h4>
                  <p className="text-[11px] text-gray-400 max-w-xs mt-1">
                    Automatic parsing assets are offline during manual schema
                    entry processes.
                  </p>
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

export default Staff;
