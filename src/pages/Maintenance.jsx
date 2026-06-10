import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Banner from "../partials/Banner";
import {
  Wrench,
  Search,
  Filter,
  Plus,
  Calendar,
  Clock,
  AlertTriangle,
  Sparkles,
  Upload,
  Send,
  FileText,
  X,
  CheckCircle2,
  ShieldAlert,
  ArrowUpRight,
  BarChart3,
  Building2,
  User,
  Hammer,
  CircleDollarSign,
} from "lucide-react";

// Robust 40-item maintenance ledger tracking emergency repairs, programmatic assets, and reactive contractor dispatches
const INITIAL_JOBS = Array.from({ length: 40 }, (_, i) => {
  const titles = [
    "HVAC Compressor Overhaul",
    "Emergency Main Line Leak Repair",
    "Elevator Brake Shoe Calibration",
    "Fire Door Intumescent Strip Retrofit",
    "Commercial Consumer Unit Upgrade",
    "External Brickwork Repointing",
    "HMO Sump Pump Failure Cleanup",
    "Roof Felt Patching & Flashing Survey",
  ];
  const properties = [
    "Oak Lodge",
    "Maple House",
    "Cedar Court",
    "Willow Pavilion",
    "Rowan Terraces",
    "Ashford Mews",
    "Beechwood House",
  ];
  const priorities = ["Critical", "High", "Medium", "Low"];
  const statuses = [
    "Unassigned",
    "Dispatched",
    "In Progress",
    "Completed",
    "On Hold",
  ];
  const trades = [
    "Mechanical/HVAC",
    "Plumbing",
    "Vertical Transport",
    "Fire Safety",
    "Electrical",
    "Fabric/Building",
  ];

  const titleStr = titles[i % titles.length];
  const propertyStr = properties[i % properties.length];
  const priorityStr = priorities[i % priorities.length];
  const statusStr = statuses[i % statuses.length];
  const tradeStr = trades[i % trades.length];

  // Distribute target operational timestamps inside the active 2026 timeline calendar
  const month = String((i % 12) + 1).padStart(2, "0");
  const day = String((i % 28) + 1).padStart(2, "0");
  const dueStr = `2026-${month}-${day}`;

  return {
    id: `JOB-${2000 + i}`,
    title: `${titleStr} - ${propertyStr}`,
    property: propertyStr,
    trade: tradeStr,
    priority: priorityStr,
    status: statusStr,
    due: dueStr,
    contractor:
      i % 4 === 0
        ? "Pending Allocation"
        : `Nexus Engineering Team ${1 + (i % 3)}`,
    estimatedCost: (i % 10) * 180 + 120,
    costCode: `MNT-EXP-${400 + i}`,
    narrative: `Reactive work order dispatched automatically following tenant incident registration portal ticket tracking properties. Infrastructure requires localized assessment to preserve statutory warranty boundaries.`,
  };
});

// Dynamic Matrix Aggregations
const CALC_METRICS = {
  totalJobs: INITIAL_JOBS.length,
  criticalCount: INITIAL_JOBS.filter(
    (j) => j.priority === "Critical" && j.status !== "Completed",
  ).length,
  inProgressCount: INITIAL_JOBS.filter((j) => j.status === "In Progress")
    .length,
  committedSpend: `£${INITIAL_JOBS.reduce((acc, curr) => acc + curr.estimatedCost, 0).toLocaleString()}`,
};

function Maintenance() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [jobsList, setJobsList] = useState(INITIAL_JOBS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);

  // Selection & Modal Anchor Toggles
  const [selectedJob, setSelectedJob] = useState(INITIAL_JOBS[1]); // Pre-select item 1 for layout depth
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

  // Form Field State Definitions
  const [newJobForm, setNewJobForm] = useState({
    title: "",
    property: "",
    trade: "Mechanical/HVAC",
    priority: "Medium",
    due: "2026-06-15",
    cost: "",
    narrative: "",
    fileAttached: "",
  });

  // AI Diagnostic Chat Stream Context Tracking State
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState([
    {
      role: "assistant",
      text: "Welcome to the AI Maintenance Diagnostics & Dispatch Panel. Describe a building defect or paste raw engineering invoice descriptions here to synthesize budget estimations, isolate asset categories, and frame detailed instructions.",
    },
  ]);

  // Combined Multi-Filter Ledger Core Filter Evaluation
  const filteredJobs = jobsList.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.property.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || job.status === statusFilter;
    const matchesPriority =
      priorityFilter === "All" || job.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Form Submission Event Interceptor
  const handleCreateJob = (e) => {
    e.preventDefault();

    const createdRecord = {
      id: `JOB-${Date.now().toString().slice(-4)}`,
      title: newJobForm.title || `${newJobForm.trade} Intervention`,
      property: newJobForm.property || "Global Hub Asset",
      trade: newJobForm.trade,
      priority: newJobForm.priority,
      status: "Unassigned",
      due: newJobForm.due,
      contractor: "Pending Allocation",
      estimatedCost: parseFloat(newJobForm.cost) || 250,
      costCode: "MNT-EXP-NEW",
      narrative:
        newJobForm.narrative ||
        "No custom maintenance history notes applied during ingestion.",
    };

    setJobsList([createdRecord, ...jobsList]);
    setSelectedJob(createdRecord);
    setIsFormOpen(false);

    // Revert operational values to defaults
    setNewJobForm({
      title: "",
      property: "",
      trade: "Mechanical/HVAC",
      priority: "Medium",
      due: "2026-06-15",
      cost: "",
      narrative: "",
      fileAttached: "",
    });
    setAiMessages([
      {
        role: "assistant",
        text: "Welcome to the AI Maintenance Diagnostics & Dispatch Panel. Describe a building defect or paste raw engineering invoice descriptions here to synthesize budget estimations, isolate asset categories, and frame detailed instructions.",
      },
    ]);
  };

  // Mock Invoice OCR Processing Data Mapping
  const handleMockInvoiceUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewJobForm((prev) => ({ ...prev, fileAttached: file.name }));
      setAiMessages((prev) => [
        ...prev,
        {
          role: "user",
          text: `Uploaded maintenance work breakdown quote: ${file.name}`,
        },
        {
          role: "assistant",
          text: `✨ **AI Diagnostics Engine Extraction Complete:**\n- **Identified Class:** Emergency Main Line Leak Repair\n- **Infrastructure Zone:** Maple House - Ground Floor Plant Room\n- **Estimated Cost Base:** £680.00\n- **Recommended Trade Group:** Plumbing\n- **Calculated Severity Matrix Level:** High Priority\n\nClick 'Sync Extraction Matrix' above to update active entry fields instantly.`,
        },
      ]);
    }
  };

  const applyAiDiagnosticExtraction = () => {
    setNewJobForm({
      title: "Emergency Main Line Leak Repair",
      property: "Maple House",
      trade: "Plumbing",
      priority: "High",
      due: "2026-06-10",
      cost: "680",
      narrative:
        "OCR Extraction Summary: Main commercial distribution run tracking continuous active pressure fluid loss. Urgent plumbing deployment required.",
      fileAttached: newJobForm.fileAttached,
    });
    setAiMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: "✅ System synchronized. Parsed asset values applied directly to current form inputs.",
      },
    ]);
  };

  const handleSendAiPrompt = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    const userText = aiInput;
    setAiInput("");
    setAiMessages((prev) => [...prev, { role: "user", text: userText }]);

    setTimeout(() => {
      setAiMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Diagnostic Check: Job definition parameters confirm conformity with statutory facility criteria. Financial boundaries register within normal historical ranges for comparable building profiles.",
        },
      ]);
    }, 400);
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
            {/* Context Header Area */}
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setIsFormOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-xs transition duration-150"
              >
                <Plus size={16} />
                <span>Work Order</span>
              </button>
            </div>

            {/* KPI Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-xs">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Jobs</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{filteredJobs.length}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-xs">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Open</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{filteredJobs.filter((j) => j.status === "Open" || j.status === "In Progress").length}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-xs">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Urgent</p>
                <p className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1">{filteredJobs.filter((j) => j.priority === "Urgent" || j.priority === "Critical" || j.urgent).length}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-xs">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Completed</p>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{filteredJobs.filter((j) => j.status === "Completed" || j.status === "Resolved").length}</p>
              </div>
            </div>

            {/* Aggregates Financial & Operational Row Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 p-4 border rounded-xl shadow-3xs flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    Active Open Tickets
                  </span>
                  <span className="text-2xl font-black font-mono text-gray-900 dark:text-white mt-0.5">
                    {CALC_METRICS.totalJobs}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-400">
                  <BarChart3 size={18} />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 border rounded-xl shadow-3xs flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block">
                    Outstanding Critical Faults
                  </span>
                  <span className="text-2xl font-black font-mono text-rose-600 mt-0.5">
                    {CALC_METRICS.criticalCount}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/20 text-rose-500">
                  <ShieldAlert size={18} />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 border rounded-xl shadow-3xs flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">
                    Active Contractor Dispatches
                  </span>
                  <span className="text-2xl font-black font-mono text-amber-600 mt-0.5">
                    {CALC_METRICS.inProgressCount}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-amber-500">
                  <Clock size={18} />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 border rounded-xl shadow-3xs flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">
                    Projected Cost Commitments
                  </span>
                  <span className="text-2xl font-black font-mono text-blue-600 mt-0.5">
                    {CALC_METRICS.committedSpend}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/20 text-blue-500">
                  <CircleDollarSign size={18} />
                </div>
              </div>
            </div>

            {/* Split Page Multi Dashboard Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Dense Interactive Maintenance Spreadsheet View Ledger */}
              <div className="lg:col-span-7 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700/60 shadow-xs overflow-hidden flex flex-col">
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
                          <option value="Unassigned">Unassigned</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="In Progress">In Progress</option>
                          <option value="On Hold">On Hold</option>
                          <option value="Completed">Completed</option>
                        </select>
                        <hr className="border-gray-100 dark:border-gray-700" />
                        <select
                          value={priorityFilter}
                          onChange={(e) => setPriorityFilter(e.target.value)}
                          className="w-full text-xs border rounded-lg py-1.5 px-2 bg-gray-50 dark:bg-gray-700/40 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 focus:outline-none"
                        >
                          <option value="All">All Priority</option>
                          <option value="Critical">Critical</option>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                <div className="overflow-x-auto max-h-[550px] overflow-y-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="text-gray-400 font-bold bg-gray-50/30 dark:bg-gray-700/10 border-b dark:border-gray-700">
                        <th className="p-3 font-mono">ID</th>
                        <th className="p-3">Title Description</th>
                        <th className="p-3">Priority</th>
                        <th className="p-3">Progression</th>
                        <th className="p-3 text-right">Target Due</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50 text-gray-600 dark:text-gray-300">
                      {filteredJobs.length === 0 ? (
                        <tr>
                          <td
                            colSpan={5}
                            className="p-12 text-center text-xs italic text-gray-400"
                          >
                            Zero reactive maintenance records match the
                            configured evaluation queries.
                          </td>
                        </tr>
                      ) : (
                        filteredJobs.map((j) => {
                          const isSelected = selectedJob?.id === j.id;

                          // Map conditional color indicators for structural state visual overlays
                          const priorityBadge = {
                            Critical:
                              "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/20 dark:text-rose-400",
                            High: "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400",
                            Medium:
                              "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/20 dark:text-blue-400",
                            Low: "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-700 dark:text-gray-400",
                          };

                          const statusBadge = {
                            Completed:
                              "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
                            "In Progress":
                              "bg-amber-500/10 text-amber-600 border-amber-500/20",
                            Dispatched:
                              "bg-blue-500/10 text-blue-600 border-blue-500/20",
                            Unassigned:
                              "bg-purple-500/10 text-purple-600 border-purple-500/20",
                            "On Hold":
                              "bg-rose-500/10 text-rose-600 border-rose-500/20",
                          };

                          return (
                            <tr
                              key={j.id}
                              onClick={() => { setSelectedJob(j); setMobileDetailOpen(true); }}
                              className={`cursor-pointer transition group hover:bg-gray-50/60 dark:hover:bg-gray-700/20 ${
                                isSelected
                                  ? "bg-blue-500/5 font-semibold border-l-2 border-l-blue-500"
                                  : ""
                              }`}
                            >
                              <td className="p-3 font-mono font-bold text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200">
                                {j.id}
                              </td>
                              <td className="p-3">
                                <div className="font-medium text-gray-900 dark:text-white max-w-[220px] truncate">
                                  {j.title}
                                </div>
                                <div className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                                  <Building2 size={10} /> {j.property}
                                </div>
                              </td>
                              <td className="p-3">
                                <span
                                  className={`text-[9px] px-1.5 py-0.2 rounded border font-mono font-bold uppercase ${priorityBadge[j.priority]}`}
                                >
                                  {j.priority}
                                </span>
                              </td>
                              <td className="p-3">
                                <span
                                  className={`text-[9px] px-1.5 py-0.2 rounded font-sans font-medium border ${statusBadge[j.status]}`}
                                >
                                  {j.status}
                                </span>
                              </td>
                              <td className="p-3 text-right font-mono text-gray-500">
                                {j.due}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Column: In-depth Asset Maintenance Detailed Parameters Module */}
              {mobileDetailOpen && (
                <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setMobileDetailOpen(false)} />
              )}
              <div className={`${
                mobileDetailOpen
                  ? 'fixed inset-4 z-50 overflow-y-auto lg:static lg:inset-auto lg:z-auto lg:col-span-5 lg:block lg:overflow-visible'
                  : 'hidden lg:col-span-5 lg:block'
              }`}>
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-3xs overflow-hidden h-full flex flex-col">
                  {selectedJob ? (
                    <>
                      {/* Detailed Module Profile Header */}
                      <div className="p-4 bg-gray-50/70 dark:bg-gray-700/30 border-b border-gray-100 dark:border-gray-700 relative">
                        <button
                          onClick={() => setMobileDetailOpen(false)}
                          className="lg:hidden absolute top-4 right-4 p-1.5 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition text-gray-500 dark:text-gray-300"
                        >
                          <X size={18} />
                        </button>
                        <span className="text-[10px] text-gray-400 block font-mono">
                          WORK ORDER ATTRIBUTION TOKEN: {selectedJob.id}
                        </span>
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm mt-0.5 truncate">
                          {selectedJob.title}
                        </h3>
                      </div>

                      {/* Descriptive Core Matrix Elements */}
                      <div className="p-5 space-y-4 text-xs grow">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                            Property Association Location
                          </span>
                          <div className="text-sm font-bold text-gray-800 dark:text-gray-100 mt-1 flex items-center gap-1.5">
                            <Building2 size={14} className="text-blue-500" />{" "}
                            {selectedJob.property}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 bg-gray-50/40 dark:bg-gray-900/20 p-3.5 rounded-xl border border-gray-100 dark:border-gray-800">
                          <div>
                            <span className="text-[10px] text-gray-400 block font-medium">
                              Assigned Engineer Unit
                            </span>
                            <div className="font-bold text-gray-700 dark:text-gray-300 mt-0.5 flex items-center gap-1">
                              <User size={13} className="text-gray-400" />{" "}
                              {selectedJob.contractor}
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-400 block font-medium">
                              Trade Classification
                            </span>
                            <div className="font-sans font-semibold text-gray-700 dark:text-gray-300 mt-0.5 flex items-center gap-1">
                              <Hammer size={12} className="text-blue-500" />{" "}
                              {selectedJob.trade}
                            </div>
                          </div>
                          <div className="mt-2">
                            <span className="text-[10px] text-gray-400 block font-medium">
                              Committed Fiscal Budget
                            </span>
                            <div className="font-mono font-bold text-gray-900 dark:text-white mt-0.5 text-sm">
                              £{selectedJob.estimatedCost.toLocaleString()}
                            </div>
                          </div>
                          <div className="mt-2">
                            <span className="text-[10px] text-gray-400 block font-medium">
                              Internal Cost Center Code
                            </span>
                            <div className="font-mono text-gray-500 mt-1 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded inline-block text-[10px]">
                              {selectedJob.costCode}
                            </div>
                          </div>
                        </div>

                        {/* Summary Scope Execution Narrative */}
                        <div className="space-y-1.5">
                          <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                            Work Statement Scope Narrative
                          </span>
                          <div className="p-3.5 bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl leading-relaxed text-gray-600 dark:text-gray-300 font-mono text-[11px]">
                            {selectedJob.narrative}
                          </div>
                        </div>

                        {/* Timeline Critical Flag Status Indicators */}
                        <div className="space-y-1.5">
                          <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                            SLA Timeline Tolerance
                          </span>
                          <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border flex items-center justify-between font-mono text-[11px]">
                            <span className="text-gray-500 flex items-center gap-1">
                              <Calendar size={13} /> Scheduled Milestone Date:
                            </span>
                            <strong className="text-gray-900 dark:text-white">
                              {selectedJob.due}
                            </strong>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Level Control Action Ribbon */}
                      <div className="p-3 bg-gray-50 dark:bg-gray-700/20 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-xs shrink-0">
                        <span className="text-[10px] font-mono text-gray-400">
                          Priority Tier Check Cleared
                        </span>
                        <div className="flex gap-2">
                          <button className="px-3 py-1.5 text-gray-500 hover:text-gray-700 font-medium">
                            Modify Scope
                          </button>
                          <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition">
                            {selectedJob.status === "Unassigned"
                              ? "Dispatch Crew"
                              : "Update Operational Status"}
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="p-12 text-center text-xs text-gray-400 italic my-auto">
                      Select an operational reactive maintenance ticket row from
                      the active table ledger to render structural property
                      details.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* INTERACTIVE FULL WORKSPACE CREATION DRAWER: LOG DISPATCH + SIDE-BY-SIDE AI FIELD DIAGNOSTICS */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-5xl w-full max-h-[90dvh] flex flex-col overflow-hidden border dark:border-gray-700 shadow-2xl relative">
              {/* Modal Window Architecture Header */}
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-b flex justify-between items-center shrink-0">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                    <Wrench size={16} className="text-blue-600" /> Dispatch
                    Facilities Reactive Maintenance Ticket
                  </h3>
                  <p className="text-[11px] text-gray-400 font-mono">
                    Initialize trade tickets, configure financial cost
                    allocations, and run structural extraction matrices.
                  </p>
                </div>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Split Twin Panel Workflow Panel */}
              <div className="grow flex flex-col lg:flex-row overflow-hidden">
                {/* Column 1 Split: Data Input Fields Block Form */}
                <form
                  onSubmit={handleCreateJob}
                  className="w-full lg:w-1/2 p-5 overflow-y-auto border-r dark:border-gray-700 space-y-4 text-xs"
                >
                  <div>
                    <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                      Work Order Title Summary
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Commercial Consumer Unit Upgrade"
                      value={newJobForm.title}
                      onChange={(e) =>
                        setNewJobForm({ ...newJobForm, title: e.target.value })
                      }
                      className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 outline-none font-medium text-gray-800 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                        Infrastructure Asset Zone
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Maple House"
                        value={newJobForm.property}
                        onChange={(e) =>
                          setNewJobForm({
                            ...newJobForm,
                            property: e.target.value,
                          })
                        }
                        className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                        Trade Allocation Group
                      </label>
                      <select
                        value={newJobForm.trade}
                        onChange={(e) =>
                          setNewJobForm({
                            ...newJobForm,
                            trade: e.target.value,
                          })
                        }
                        className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 outline-none"
                      >
                        <option value="Mechanical/HVAC">Mechanical/HVAC</option>
                        <option value="Plumbing">Plumbing</option>
                        <option value="Vertical Transport">
                          Vertical Transport
                        </option>
                        <option value="Fire Safety">Fire Safety</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Fabric/Building">Fabric/Building</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                        Severity Matrix Overlay
                      </label>
                      <select
                        value={newJobForm.priority}
                        onChange={(e) =>
                          setNewJobForm({
                            ...newJobForm,
                            priority: e.target.value,
                          })
                        }
                        className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 outline-none font-sans font-medium"
                      >
                        <option value="Critical">Critical Severity</option>
                        <option value="High">High Proximity</option>
                        <option value="Medium">Medium Base</option>
                        <option value="Low">Low Scheduled</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                        Target Resolution Timeline
                      </label>
                      <input
                        required
                        type="date"
                        value={newJobForm.due}
                        onChange={(e) =>
                          setNewJobForm({ ...newJobForm, due: e.target.value })
                        }
                        className="w-full border rounded-lg p-1.5 bg-gray-50 dark:bg-gray-700 outline-none font-mono text-[11px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                      Estimated Outlay Budget (£)
                    </label>
                    <input
                      required
                      type="number"
                      placeholder="e.g. 450"
                      value={newJobForm.cost}
                      onChange={(e) =>
                        setNewJobForm({ ...newJobForm, cost: e.target.value })
                      }
                      className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 outline-none font-mono"
                    />
                  </div>

                  {/* Contractor Quote Data Dropzone Block */}
                  <div>
                    <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                      Attach Engineer Work Log Sheet / Preliminary Quote
                    </label>
                    <div className="border border-dashed border-gray-200 dark:border-gray-600 rounded-xl p-4 text-center relative hover:bg-gray-50/50 dark:hover:bg-gray-900/40 transition">
                      <input
                        type="file"
                        onChange={handleMockInvoiceUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <Upload
                        size={18}
                        className="mx-auto text-gray-400 mb-1"
                      />
                      <p className="text-[11px] text-gray-500">
                        Drop contractor documents here to initialize automated
                        diagnostic metadata ingestion checks
                      </p>
                      {newJobForm.fileAttached && (
                        <div className="mt-2 text-[10px] text-blue-600 font-mono bg-blue-50 dark:bg-blue-950/20 py-1 px-2 rounded inline-flex items-center gap-1">
                          <FileText size={12} /> Verification Token Coupled:{" "}
                          {newJobForm.fileAttached}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                      Comprehensive Operational Statement
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Input core scope parameters or use the side-by-side AI tool to structure raw multi-line repair shorthand notes..."
                      value={newJobForm.narrative}
                      onChange={(e) =>
                        setNewJobForm({
                          ...newJobForm,
                          narrative: e.target.value,
                        })
                      }
                      className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 outline-none font-mono text-[11px] leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-xs transition duration-150 shadow-xs"
                  >
                    Commit Active Work Order Token to Core Database Register
                  </button>
                </form>

                {/* Column 2 Split: AI Copilot Assistant Extraction Panel */}
                <div className="w-full lg:w-1/2 bg-gray-50 dark:bg-gray-900/60 flex flex-col h-full overflow-hidden">
                  {/* AI Section Dynamic Context Header Ribbon */}
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center shrink-0">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-1">
                      <Sparkles size={14} /> AI Diagnostic & Scope Extractor
                    </span>
                    <button
                      type="button"
                      onClick={applyAiDiagnosticExtraction}
                      className="text-[10px] bg-blue-600 hover:bg-blue-700 text-white px-2 py-0.5 rounded font-medium transition"
                    >
                      Sync Extraction Matrix
                    </button>
                  </div>

                  {/* Message Workspace Area */}
                  <div className="grow overflow-y-auto p-4 space-y-3 text-xs">
                    {aiMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-xl p-3 leading-relaxed ${
                            msg.role === "user"
                              ? "bg-blue-600 text-white font-mono text-[11px]"
                              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border dark:border-gray-700 shadow-3xs text-[11px]"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Prompt Field Form */}
                  <form
                    onSubmit={handleSendAiPrompt}
                    className="p-3 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex gap-2 shrink-0"
                  >
                    <input
                      type="text"
                      placeholder="Ask the inspector to cross-reference budget ceilings, categorize faults..."
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      className="grow bg-gray-50 dark:bg-gray-700 text-xs rounded-lg border px-3 outline-none focus:ring-1 focus:ring-blue-500"
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

export default Maintenance;
