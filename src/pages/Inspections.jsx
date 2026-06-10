import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Banner from "../partials/Banner";
import { 
  ClipboardCheck, Search, Filter, Plus, Calendar, Clock, AlertTriangle, 
  Sparkles, Upload, Send, FileText, X, CheckCircle2, ShieldAlert,
  ArrowUpRight, BarChart3, Building2, UserCheck, ChevronRight, Eye
} from "lucide-react";

// Robust 40-item structural register mapping dynamic property assessments within the 2026 calendar timeline
const INITIAL_INSPECTIONS = Array.from({ length: 40 }, (_, i) => {
  const inspectionTypes = ["Fire Risk Assessment", "EICR Structural Audit", "Legionella Water Quality", "Asbestos Condition Survey", "Elevator Lifting Equipment", "HMO Habitation Review"];
  const properties = ["Maple House", "Oak Lodge", "Cedar Court", "Willow Pavilion", "Rowan Terraces", "Ashford Mews", "Beechwood House"];
  const inspectors = ["Liam Vance (Lead Assessor)", "Clara Sterling (RICS Engineer)", "David Mercer (H&S Consultant)", "Rachel Cross (Water Quality Tech)"];
  
  const typeStr = inspectionTypes[i % inspectionTypes.length];
  const propertyStr = properties[i % properties.length];
  const inspectorStr = inspectors[i % inspectors.length];

  // Distribute schedule dates into past completions and upcoming 2026 milestones
  const month = String((i % 12) + 1).padStart(2, "0");
  const day = String((i % 28) + 1).padStart(2, "0");
  let year = "2026";
  if (i % 6 === 0) year = "2025"; // Legacy archival reference data
  
  const targetDateStr = `${year}-${month}-${day}`;
  const inspectionDate = new Date(targetDateStr);
  const currentDate = new Date("2026-06-09");
  
  // Calculate status matrices based on date proximity thresholds
  let statusStr = "Completed";
  if (inspectionDate > currentDate) {
    const dayVariance = Math.ceil((inspectionDate - currentDate) / (1000 * 60 * 60 * 24));
    statusStr = dayVariance <= 14 ? "Urgent Review" : "Scheduled";
  } else if (i % 7 === 1 && year === "2026") {
    statusStr = "Due"; // Missed target milestones
  }

  return {
    id: `INSP-${1000 + i}`,
    name: `${typeStr} - ${propertyStr}`,
    type: typeStr,
    property: propertyStr,
    date: targetDateStr,
    status: statusStr,
    assignedInspector: inspectorStr,
    riskScore: (i % 5) * 2 + 1, // Scaled index metric representation
    notes: `Standard regulatory walkthrough finalized. Structural elements analyzed according to regional safety criteria amendments. Detailed line defects logged inside secure digital cloud repositories.`,
    verificationRef: `INSP_ATTACH_REF_${100 + i}.pdf`
  };
});

// Structural Operational Metrics
const COUNTERS = {
  totalLogged: INITIAL_INSPECTIONS.length,
  overdueCount: INITIAL_INSPECTIONS.filter(i => i.status === "Due").length,
  urgentCount: INITIAL_INSPECTIONS.filter(i => i.status === "Urgent Review").length,
  completedCount: INITIAL_INSPECTIONS.filter(i => i.status === "Completed").length
};

function Inspections() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inspectionsList, setInspectionsList] = useState(INITIAL_INSPECTIONS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);

  // Selection Focused Views
  const [selectedInspection, setSelectedInspection] = useState(INITIAL_INSPECTIONS[1]); // Pre-select item
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  // Modular Creation State Schemas
  const [newForm, setNewForm] = useState({
    type: "Fire Risk Assessment", property: "", inspector: "", date: "2026-06-25", notes: "", fileName: ""
  });

  // AI Assistant Chat Array Infrastructure
  const [aiChatInput, setAiChatInput] = useState("");
  const [aiMessages, setAiMessages] = useState([
    { role: "assistant", text: "Welcome to the AI Inspection Report Analyzer. Drag site logs, text summaries, or contractor invoices here to auto-populate scheduling grids, assess compliance criteria weights, and isolate hidden advisory flags." }
  ]);

  // Combined Multi-Filter Engine Processing
  const filteredInspections = inspectionsList.filter(ins => {
    const matchesSearch = ins.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ins.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ins.assignedInspector.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || ins.status === statusFilter;
    const matchesType = typeFilter === "All" || ins.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Commit Form Logic Actions
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const targetDate = new Date(newForm.date);
    const currentDate = new Date("2026-06-09");
    const dayVariance = Math.ceil((targetDate - currentDate) / (1000 * 60 * 60 * 24));
    
    let calculatedStatus = "Scheduled";
    if (targetDate < currentDate) calculatedStatus = "Completed";
    else if (dayVariance <= 14) calculatedStatus = "Urgent Review";

    const createdRecord = {
      id: `INSP-${Date.now().toString().slice(-4)}`,
      name: `${newForm.type} - ${newForm.property || "Global Framework Asset"}`,
      type: newForm.type,
      property: newForm.property || "Global Framework Asset",
      date: newForm.date,
      status: calculatedStatus,
      assignedInspector: newForm.inspector || "Internal Compliance Assessor",
      riskScore: 2,
      notes: newForm.notes || "No supplemental engineering addendums added. Record initialized manually under operational guidelines.",
      verificationRef: newForm.fileName || "scanned_checklist_unlinked.pdf"
    };

    const expandedArray = [createdRecord, ...inspectionsList];
    setInspectionsList(expandedArray);
    setSelectedInspection(createdRecord);
    setIsLogModalOpen(false);

    // Revert form fields to defaults
    setNewForm({ type: "Fire Risk Assessment", property: "", inspector: "", date: "2026-06-25", notes: "", fileName: "" });
    setAiMessages([{ role: "assistant", text: "Welcome to the AI Inspection Report Analyzer. Drag site logs, text summaries, or contractor invoices here to auto-populate scheduling grids, assess compliance criteria weights, and isolate hidden advisory flags." }]);
  };

  // Mock Field Intelligence Extraction
  const handleMockFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewForm({ ...newForm, fileName: file.name });
      setAiMessages(prev => [
        ...prev,
        { role: "user", text: `Uploaded engineer log sheet: ${file.name}` },
        { role: "assistant", text: `✨ **Automated Field Scan Parse Success:**\n- **Identified Class:** Fire Risk Assessment Matrix\n- **Target Landmark:** Rowan Terraces - Structural Wing B\n- **Assigned Inspector:** Clara Sterling (RICS Engineer)\n- **Target Calibration Date:** 2026-07-10\n\nClick 'Apply Extracted Properties' above to map these elements into your structural data entry lines.` }
      ]);
    }
  };

  const applyAiDataParsing = () => {
    setNewForm({
      ...newForm,
      type: "Fire Risk Assessment",
      property: "Rowan Terraces",
      inspector: "Clara Sterling (RICS Engineer)",
      date: "2026-07-10"
    });
    setAiMessages(prev => [
      ...prev,
      { role: "assistant", text: "✅ Integration confirmed. Synced form attributes mapped to target scheduling variables successfully." }
    ]);
  };

  const handleSendAiPrompt = (e) => {
    e.preventDefault();
    if (!aiChatInput.trim()) return;

    const promptText = aiChatInput;
    setAiChatInput("");
    setAiMessages(prev => [...prev, { role: "user", text: promptText }]);

    setTimeout(() => {
      setAiMessages(prev => [
        ...prev,
        { role: "assistant", text: "Compliance review update: Structured check items line up with current statutory provisions. Field dependencies have been double-checked for entry clearance validation." }
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
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-xs transition duration-150"
              >
                <Plus size={16} />
                <span>Inspection</span>
              </button>
            </div>

            {/* KPI Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-xs">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Inspections</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{filteredInspections.length}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-xs">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Scheduled</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{filteredInspections.filter((i) => i.status === "Scheduled").length}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-xs">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Completed</p>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{filteredInspections.filter((i) => i.status === "Completed" || i.status === "Pass").length}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-xs">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Overdue</p>
                <p className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1">{filteredInspections.filter((i) => i.status === "Overdue" || i.status === "Failed").length}</p>
              </div>
            </div>

            {/* Metrics Dashboard Row Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 p-4 border rounded-xl shadow-3xs flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Total Scheduled Audits</span>
                  <span className="text-2xl font-black font-mono text-gray-900 dark:text-white mt-0.5">{COUNTERS.totalLogged}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-400"><BarChart3 size={18} /></div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 border rounded-xl shadow-3xs flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block">Overdue Action Milestones</span>
                  <span className="text-2xl font-black font-mono text-rose-600 mt-0.5">{COUNTERS.overdueCount}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/20 text-rose-500"><ShieldAlert size={18} /></div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 border rounded-xl shadow-3xs flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">Urgent Review Status (14d)</span>
                  <span className="text-2xl font-black font-mono text-amber-600 mt-0.5">{COUNTERS.urgentCount}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-amber-500"><Clock size={18} /></div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 border rounded-xl shadow-3xs flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">Completed Validation Archives</span>
                  <span className="text-2xl font-black font-mono text-emerald-600 mt-0.5">{COUNTERS.completedCount}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500"><CheckCircle2 size={18} /></div>
              </div>
            </div>

            {/* Split Page Multi Dashboard Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Segment Column: Active Inspections Feed Queue List (40 items space) */}
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
                          <option value="Due">Due</option>
                          <option value="Urgent Review">Urgent Review</option>
                        </select>
                        <hr className="border-gray-100 dark:border-gray-700" />
                        <select
                          value={typeFilter}
                          onChange={(e) => setTypeFilter(e.target.value)}
                          className="w-full text-xs border rounded-lg py-1.5 px-2 bg-gray-50 dark:bg-gray-700/40 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 focus:outline-none"
                        >
                          <option value="All">All Types</option>
                          <option value="Fire Risk Assessment">Fire Risk Assessment</option>
                          <option value="EICR Structural Audit">EICR Structural Audit</option>
                          <option value="Legionella Water Quality">Legionella Water Quality</option>
                          <option value="Asbestos Condition Survey">Asbestos Survey</option>
                          <option value="Elevator Lifting Equipment">Elevator Equipment</option>
                          <option value="HMO Habitation Review">HMO Habitation Review</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
                  {filteredInspections.length === 0 ? (
                    <div className="p-12 border rounded-xl text-center text-xs text-gray-400 bg-white dark:bg-gray-800 italic">
                      Zero data matrix points map to the current query properties.
                    </div>
                  ) : (
                    filteredInspections.map((ins) => {
                      const isSelected = selectedInspection?.id === ins.id;
                      
                      // Status framework colors
                      const statusStyles = {
                        Completed: "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400",
                        Scheduled: "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/20 dark:text-blue-400",
                        Due: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/20 dark:text-rose-400",
                        "Urgent Review": "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400"
                      };

                      return (
                        <div
                          key={ins.id}
                          onClick={() => setSelectedInspection(ins)}
                          className={`rounded-xl border cursor-pointer transition p-3.5 bg-white dark:bg-gray-800 shadow-3xs flex flex-col justify-between gap-2 relative hover:border-gray-300 dark:hover:border-gray-600 ${
                            isSelected ? "border-indigo-500 ring-2 ring-indigo-500/10 dark:border-indigo-400" : "border-gray-100 dark:border-gray-700/80"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] font-mono font-bold text-gray-400">{ins.id}</span>
                                <span className="text-[10px] bg-gray-100 dark:bg-gray-700 px-1.5 py-0.2 rounded font-sans text-gray-500 dark:text-gray-300">{ins.type}</span>
                              </div>
                              <h3 className="text-xs font-bold text-gray-900 dark:text-white mt-1 leading-snug">
                                {ins.property}
                              </h3>
                            </div>
                            <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold uppercase border shrink-0 ${statusStyles[ins.status] || "bg-gray-100"}`}>
                              {ins.status}
                            </span>
                          </div>

                          <div className="flex justify-between items-center pt-2 mt-0.5 border-t border-gray-50 dark:border-gray-700/50 text-[10px] text-gray-400 font-mono">
                            <span className="flex items-center gap-1 font-sans text-gray-500 dark:text-gray-400">
                              <UserCheck size={11} className="text-gray-400" /> {ins.assignedInspector.split(" ")[0]}
                            </span>
                            <span className="flex items-center gap-1"><Calendar size={10} /> {ins.date}</span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Right Segment Column: Comprehensive Detailed Profile Overview Node */}
              <div className="lg:col-span-7">
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col h-full">
                  {selectedInspection ? (
                    <>
                      {/* Top Meta Strip */}
                      <div className="p-4 bg-gray-50/70 dark:bg-gray-700/30 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center text-xs">
                        <div>
                          <span className="text-[10px] text-gray-400 block font-mono">INSPECTION PROTOCOL MASTER TOKEN: {selectedInspection.id}</span>
                          <h2 className="font-bold text-gray-900 dark:text-white mt-0.5">{selectedInspection.name}</h2>
                        </div>
                        <span className="px-2 py-0.5 bg-white dark:bg-gray-900 rounded font-mono font-bold uppercase text-[10px] border border-gray-200 dark:border-gray-700">
                          State: {selectedInspection.status}
                        </span>
                      </div>

                      {/* Expanded Focus Details Node */}
                      <div className="p-5 space-y-5 text-xs grow">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Infrastructure Asset Parameter</span>
                          <p className="text-sm font-bold text-gray-800 dark:text-gray-100 mt-1 flex items-center gap-1.5">
                            <Building2 size={14} className="text-indigo-600" /> {selectedInspection.property}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 bg-gray-50/40 dark:bg-gray-900/20 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                          <div>
                            <span className="text-[10px] text-gray-400 block font-medium">Assigned Surveyor Body</span>
                            <div className="font-bold text-gray-700 dark:text-gray-300 mt-0.5 flex items-center gap-1.5">
                              <UserCheck size={13} className="text-indigo-500" /> {selectedInspection.assignedInspector}
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-400 block font-medium">Framework Type</span>
                            <div className="font-sans font-semibold text-gray-700 dark:text-gray-300 mt-0.5">
                              {selectedInspection.type}
                            </div>
                          </div>
                          <div className="mt-2">
                            <span className="text-[10px] text-gray-400 block font-medium">Target Inspection Date</span>
                            <div className="font-mono font-semibold text-gray-900 dark:text-white mt-0.5 flex items-center gap-1">
                              <Calendar size={12} className="text-gray-400" /> {selectedInspection.date}
                            </div>
                          </div>
                          <div className="mt-2">
                            <span className="text-[10px] text-gray-400 block font-medium">Assigned Operational Risk Matrix Score</span>
                            <div className="mt-1 flex items-center gap-1">
                              <span className="font-mono font-bold text-gray-800 dark:text-gray-200">{selectedInspection.riskScore} / 10</span>
                              <span className={`w-2 h-2 rounded-full ${selectedInspection.riskScore > 6 ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                            </div>
                          </div>
                        </div>

                        {/* Audit Commentary Summary Area */}
                        <div className="space-y-1.5">
                          <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Field Notes & Structural Annotations</span>
                          <div className="p-3.5 bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-xl leading-relaxed text-gray-600 dark:text-gray-300 font-mono text-[11px]">
                            {selectedInspection.notes}
                          </div>
                        </div>

                        {/* Document Attributions Node */}
                        <div className="p-3 bg-indigo-500/5 border border-indigo-500/10 rounded-xl flex items-center justify-between text-[11px]">
                          <span className="text-indigo-700 dark:text-indigo-400 font-medium flex items-center gap-1.5">
                            <FileText size={14} /> Structural Checklist Reference: <strong className="font-mono text-[10px]">{selectedInspection.verificationRef}</strong>
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] bg-indigo-100 dark:bg-indigo-900/40 font-mono text-indigo-700 px-1.5 py-0.2 rounded">SECURE HASH</span>
                            <ArrowUpRight size={12} className="text-indigo-500 cursor-pointer" />
                          </div>
                        </div>
                      </div>

                      {/* Bottom Quick-Action Control Strip */}
                      <div className="p-3 bg-gray-50 dark:bg-gray-700/20 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-2 text-xs">
                        <button className="px-3 py-1.5 text-gray-500 hover:text-gray-700 font-medium">Export Checklist PDF</button>
                        <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-medium transition">Re-assign Auditor Body</button>
                      </div>
                    </>
                  ) : (
                    <div className="p-12 text-center text-xs text-gray-400 italic my-auto">
                      Select an active inspection item row block to display structural audit metadata logs.
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        </main>

        {/* INTERACTIVE COMPLIANCE MODAL WINDOW LAYER: LOG SCHEDULER & SIDE AI TEXT EXTRACTIONS */}
        {isLogModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-5xl w-full max-h-[90dvh] flex flex-col overflow-hidden border dark:border-gray-700 shadow-2xl relative">
              
              {/* Modal Core Layout Header */}
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-b flex justify-between items-center shrink-0">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                    <ClipboardCheck size={16} className="text-indigo-600" /> Initialize Asset Inspection & Compliance Schedule
                  </h3>
                  <p className="text-[11px] text-gray-400 font-mono">Configure site walkthrough parameters, assign surveying engineers, and coordinate document records.</p>
                </div>
                <button onClick={() => setIsLogModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition"><X size={20} /></button>
              </div>

              {/* Split Twin Interactive Workspace Panel */}
              <div className="grow flex flex-col lg:flex-row overflow-hidden">
                
                {/* Column 1 Split: Data Input Fields Block Form */}
                <form onSubmit={handleFormSubmit} className="w-full lg:w-1/2 p-5 overflow-y-auto border-r dark:border-gray-700 space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">Inspection Framework Class</label>
                    <select 
                      value={newForm.type} 
                      onChange={e => setNewForm({...newForm, type: e.target.value})} 
                      className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 outline-none font-medium text-gray-800 dark:text-white"
                    >
                      <option value="Fire Risk Assessment">Fire Risk Assessment</option>
                      <option value="EICR Structural Audit">EICR Structural Audit</option>
                      <option value="Legionella Water Quality">Legionella Water Quality</option>
                      <option value="Asbestos Condition Survey">Asbestos Condition Survey</option>
                      <option value="Elevator Lifting Equipment">Elevator Lifting Equipment</option>
                      <option value="HMO Habitation Review">HMO Habitation Review</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">Target Asset Building</label>
                      <input 
                        required 
                        type="text" 
                        placeholder="e.g. Rowan Terraces" 
                        value={newForm.property} 
                        onChange={e => setNewForm({...newForm, property: e.target.value})} 
                        className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">Scheduled Calendar Target</label>
                      <input 
                        required 
                        type="date" 
                        value={newForm.date} 
                        onChange={e => setNewForm({...newForm, date: e.target.value})} 
                        className="w-full border rounded-lg p-1.5 bg-gray-50 dark:bg-gray-700 outline-none font-mono text-[11px]" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">Assigned Inspector / Surveying Specialist</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Clara Sterling (RICS Engineer)" 
                      value={newForm.inspector} 
                      onChange={e => setNewForm({...newForm, inspector: e.target.value})} 
                      className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 outline-none text-gray-800 dark:text-gray-100" 
                    />
                  </div>

                  {/* Scanned Media Ingestion Drag Drop Block */}
                  <div>
                    <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">Upload Field Log Sheet / Asset Checklist Scan</label>
                    <div className="border border-dashed border-gray-200 dark:border-gray-600 rounded-xl p-4 text-center relative hover:bg-gray-50/50 dark:hover:bg-gray-900/40 transition">
                      <input type="file" onChange={handleMockFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                      <Upload size={18} className="mx-auto text-gray-400 mb-1" />
                      <p className="text-[11px] text-gray-500">Drop engineering worksheets here to run real-time automated metadata ingestion checks</p>
                      {newForm.fileName && (
                        <div className="mt-2 text-[10px] text-indigo-600 font-mono bg-indigo-50 dark:bg-indigo-950/20 py-1 px-2 rounded inline-flex items-center gap-1">
                          <FileText size={12} /> Verification Attached: {newForm.fileName}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">Supplemental Structural Directives</label>
                    <textarea 
                      rows={3}
                      placeholder="Add primary site walk summaries or prompt the side-by-side AI assistant panel to normalize raw engineering shorthand text parameters..." 
                      value={newForm.notes} 
                      onChange={e => setNewForm({...newForm, notes: e.target.value})} 
                      className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 outline-none font-mono leading-relaxed text-[11px]" 
                    />
                  </div>

                  <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl text-xs transition duration-150 shadow-xs">
                    Commit Scheduled Inspection Block to Active Core Logs
                  </button>
                </form>

                {/* Column 2 Split: AI Copilot Assistant Extraction Panel */}
                <div className="w-full lg:w-1/2 bg-gray-50 dark:bg-gray-900/60 flex flex-col h-full overflow-hidden">
                  
                  {/* AI Sub Header Control Block */}
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-950/20 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center shrink-0">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-1">
                      <Sparkles size={14} /> AI Inspection Field Analyzer
                    </span>
                    <button 
                      type="button"
                      onClick={applyAiDataParsing}
                      className="text-[10px] bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-0.5 rounded font-medium transition"
                    >
                      Apply Extracted Properties
                    </button>
                  </div>

                  {/* Message Stream Workspace Area */}
                  <div className="grow overflow-y-auto p-4 space-y-3 text-xs">
                    {aiMessages.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-xl p-3 leading-relaxed ${
                          msg.role === 'user' 
                            ? 'bg-indigo-600 text-white font-mono text-[11px]' 
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border dark:border-gray-700 shadow-3xs text-[11px]'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input Trigger Field */}
                  <form onSubmit={handleSendAiPrompt} className="p-3 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex gap-2 shrink-0">
                    <input 
                      type="text" 
                      placeholder="Ask the assistant to convert shorthand, evaluate code limits..." 
                      value={aiChatInput}
                      onChange={e => setAiChatInput(e.target.value)}
                      className="grow bg-gray-50 dark:bg-gray-700 text-xs rounded-lg border px-3 outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <button type="submit" className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-500">
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

export default Inspections;