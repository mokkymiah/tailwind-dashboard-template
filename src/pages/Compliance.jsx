import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Banner from "../partials/Banner";
import {
  ShieldCheck,
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
  HardDrive,
  RefreshCw,
} from "lucide-react";

// Robust 40-item mock ledger mapping statutory asset certifications directly within 2026/2027 timelines
const INITIAL_COMPLIANCE = Array.from({ length: 40 }, (_, i) => {
  const certTypes = [
    "EICR",
    "Gas Safety",
    "PAT Testing",
    "Fire Risk Assessment (FRA)",
    "Legionella Risk",
    "Asbestos Register",
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
  const contractors = [
    "Apex Electrical Ltd",
    "SafeGas Solutions",
    "Metro Fire & Safety",
    "HydroClean Environmental",
    "Vanguard Building Inspectors",
  ];

  const typeStr = certTypes[i % certTypes.length];
  const propertyStr = properties[i % properties.length];
  const contractorStr = contractors[i % contractors.length];

  // Distribute expiration matrices (some historical/expired, most tracking safely through 2026/2027)
  const month = String((i % 12) + 1).padStart(2, "0");
  const day = String((i % 28) + 1).padStart(2, "0");
  let year = "2026";
  if (i % 5 === 0) year = "2025"; // Expired records
  if (i % 4 === 0) year = "2027"; // Distant safe tracking

  const expiryStr = `${year}-${month}-${day}`;

  // Calculate dynamic status indicators relative to present timeline window
  const expiryDate = new Date(expiryStr);
  const currentDate = new Date("2026-06-09");
  const varianceDays = Math.ceil(
    (expiryDate - currentDate) / (1000 * 60 * 60 * 24),
  );

  let statusStr = "Valid";
  if (varianceDays < 0) {
    statusStr = "Expired";
  } else if (varianceDays <= 30) {
    statusStr = "Action Required";
  }

  return {
    id: `COMP-${1000 + i}`,
    type: typeStr,
    property: propertyStr,
    contractor: contractorStr,
    expiry: expiryStr,
    status: statusStr,
    daysRemaining: varianceDays,
    costCode: `CC-ST-${800 + i}`,
    lastAudited: `2025-11-${day}`,
    documentRef: `CERT_${typeStr.replace(/\s+/g, "")}_${i + 400}.pdf`,
  };
});

// Dynamic Aggregations Framework
const AGGREGATES = {
  totalCertificates: INITIAL_COMPLIANCE.length,
  expiredCount: INITIAL_COMPLIANCE.filter((c) => c.status === "Expired").length,
  actionCount: INITIAL_COMPLIANCE.filter((c) => c.status === "Action Required")
    .length,
  complianceRating: `${Math.round(((INITIAL_COMPLIANCE.length - INITIAL_COMPLIANCE.filter((c) => c.status === "Expired").length) / INITIAL_COMPLIANCE.length) * 100)}%`,
};

function Compliance() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [ledger, setLedger] = useState(INITIAL_COMPLIANCE);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);

  // Selection & Modal Focus Anchors
  const [selectedCert, setSelectedCert] = useState(INITIAL_COMPLIANCE[2]); // Pre-select a Valid certificate
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

  // Form Field State Definitions
  const [newCertForm, setNewCertForm] = useState({
    type: "EICR",
    property: "",
    contractor: "",
    expiry: "2027-06-01",
    narrative: "",
    fileName: "",
  });

  // AI Chat Logs Panel Tracking Context
  const [aiChatInput, setAiChatInput] = useState("");
  const [aiMessages, setAiMessages] = useState([
    {
      role: "assistant",
      text: "Welcome to the AI Statutory Certificate Inspector. Drag-and-drop a scanned document asset or paste standard compliance properties here to auto-extract expiration timestamps, verify contractor accreditations, and cross-reference regulatory standards.",
    },
  ]);

  // Unified Filtering Core Execution
  const filteredLedger = ledger.filter((c) => {
    const matchesSearch =
      c.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.contractor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
    const matchesType = typeFilter === "All" || c.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Form Submissions Interceptor
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const expiryDate = new Date(newCertForm.expiry);
    const currentDate = new Date("2026-06-09");
    const varianceDays = Math.ceil(
      (expiryDate - currentDate) / (1000 * 60 * 60 * 24),
    );
    const calculatedStatus =
      varianceDays < 0
        ? "Expired"
        : varianceDays <= 30
          ? "Action Required"
          : "Valid";

    const createdCert = {
      id: `COMP-${Date.now().toString().slice(-4)}`,
      type: newCertForm.type,
      property: newCertForm.property || "Global Hub Asset",
      contractor:
        newCertForm.contractor || "Verified Corporate Engineering Partner",
      expiry: newCertForm.expiry,
      status: calculatedStatus,
      daysRemaining: varianceDays,
      costCode: "CC-ST-NEW",
      lastAudited: "2026-06-09",
      documentRef:
        newCertForm.fileName || "scanned_regulatory_receipt_unlinked.pdf",
    };

    const updatedData = [createdCert, ...ledger];
    setLedger(updatedData);
    setSelectedCert(createdCert);
    setIsLogModalOpen(false);

    // Clean fields back to baseline definitions
    setNewCertForm({
      type: "EICR",
      property: "",
      contractor: "",
      expiry: "2027-06-01",
      narrative: "",
      fileName: "",
    });
    setAiMessages([
      {
        role: "assistant",
        text: "Welcome to the AI Statutory Certificate Inspector. Drag-and-drop a scanned document asset or paste standard compliance properties here to auto-extract expiration timestamps, verify contractor accreditations, and cross-reference regulatory standards.",
      },
    ]);
  };

  // Mock Scanning Document Extraction Stream
  const handleMockFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCertForm({ ...newCertForm, fileName: file.name });
      setAiMessages((prev) => [
        ...prev,
        { role: "user", text: `Submitted document scan: ${file.name}` },
        {
          role: "assistant",
          text: `✨ **OCR Digital Capture Evaluation Complete:**\n- **Document Type Identified:** Gas Safety Certificate (CP12)\n- **Registered Location:** Cedar Court - Block B\n- **Extracted Expiry Date:** 2027-05-14\n- **Contractor Validation Status:** SafeGas Solutions (Gas Safe Registered ID #584902)\n\nClick 'Sync Extracted Properties' above to automatically populate form elements.`,
        },
      ]);
    }
  };

  const applyAiExtraction = () => {
    setNewCertForm({
      ...newCertForm,
      type: "Gas Safety",
      property: "Cedar Court",
      contractor: "SafeGas Solutions",
      expiry: "2027-05-14",
    });
    setAiMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: "✅ System synchronized. Scanned verification data successfully committed to the active input schema lines.",
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
          text: "Inspection check: Scanned text contains standard structural parameters. NIC-EIC enrollment verification confirmed via live check simulation. Form fields structurally complete.",
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
            {/* Main Header Presentation Blocks */}
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setIsLogModalOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-xs transition duration-150"
              >
                <Plus size={16} />
                <span>Certificate</span>
              </button>
            </div>

            {/* KPI Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-xs">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Documents</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{filteredLedger.length}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-xs">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Compliant</p>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{filteredLedger.filter((d) => d.status === "Compliant").length}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-xs">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Expiring Soon</p>
                <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">{filteredLedger.filter((d) => d.status === "Expiring Soon").length}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-xs">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Overdue</p>
                <p className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1">{filteredLedger.filter((d) => d.status === "Overdue").length}</p>
              </div>
            </div>

            {/* Aggregates Summary Ribbon */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 p-4 border rounded-xl shadow-3xs flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    Managed Documents Ledger
                  </span>
                  <span className="text-2xl font-black font-mono text-gray-900 dark:text-white mt-0.5">
                    {AGGREGATES.totalCertificates}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-400">
                  <BarChart3 size={18} />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 border rounded-xl shadow-3xs flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block">
                    Expired / Lapsed Certs
                  </span>
                  <span className="text-2xl font-black font-mono text-rose-600 mt-0.5">
                    {AGGREGATES.expiredCount}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/20 text-rose-500">
                  <ShieldAlert size={18} />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 border rounded-xl shadow-3xs flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">
                    Critical Renewal Windows
                  </span>
                  <span className="text-2xl font-black font-mono text-amber-600 mt-0.5">
                    {AGGREGATES.actionCount}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-amber-500">
                  <Clock size={18} />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 border rounded-xl shadow-3xs flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">
                    Global Compliance Integrity
                  </span>
                  <span className="text-2xl font-black font-mono text-emerald-600 mt-0.5">
                    {AGGREGATES.complianceRating}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500">
                  <CheckCircle2 size={18} />
                </div>
              </div>
            </div>

            {/* Split Page Multi Dashboard Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Segment Column: Dense Active Compliance Spreadsheet Ledger */}
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
                          <option value="Valid">Valid</option>
                          <option value="Action Required">Action Required</option>
                          <option value="Expired">Expired</option>
                        </select>
                        <hr className="border-gray-100 dark:border-gray-700" />
                        <select
                          value={typeFilter}
                          onChange={(e) => setTypeFilter(e.target.value)}
                          className="w-full text-xs border rounded-lg py-1.5 px-2 bg-gray-50 dark:bg-gray-700/40 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 focus:outline-none"
                        >
                          <option value="All">All Types</option>
                          <option value="EICR">EICR</option>
                          <option value="Gas Safety">Gas Safety</option>
                          <option value="PAT Testing">PAT Testing</option>
                          <option value="Fire Risk Assessment (FRA)">Fire Risk Assessment</option>
                          <option value="Legionella Risk">Legionella</option>
                          <option value="Asbestos Register">Asbestos</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                <div className="overflow-x-auto max-h-[550px] overflow-y-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="text-gray-400 font-bold bg-gray-50/30 dark:bg-gray-700/10 border-b dark:border-gray-700">
                        <th className="p-3 font-mono">Reference</th>
                        <th className="p-3">Class Type</th>
                        <th className="p-3">Infrastructure Asset</th>
                        <th className="p-3">Expiry Matrix</th>
                        <th className="p-3 text-right">Status State</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50 text-gray-600 dark:text-gray-300">
                      {filteredLedger.length === 0 ? (
                        <tr>
                          <td
                            colSpan={5}
                            className="p-12 text-center text-xs italic text-gray-400"
                          >
                            Zero certification tokens correspond with the
                            configured filter conditions.
                          </td>
                        </tr>
                      ) : (
                        filteredLedger.map((c) => {
                          const isSelected = selectedCert?.id === c.id;

                          // Map Contextual Row Status Framework colors
                          const badgeStyles = {
                            Valid:
                              "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400",
                            "Action Required":
                              "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400",
                            Expired:
                              "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/20 dark:text-rose-400",
                          };

                          return (
                            <tr
                              key={c.id}
                              onClick={() => { setSelectedCert(c); setMobileDetailOpen(true); }}
                              className={`cursor-pointer transition group hover:bg-gray-50/60 dark:hover:bg-gray-700/20 ${
                                isSelected
                                  ? "bg-emerald-500/5 font-semibold border-l-2 border-l-emerald-500"
                                  : ""
                              }`}
                            >
                              <td className="p-3 font-mono font-bold text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200">
                                {c.id}
                              </td>
                              <td className="p-3 font-medium text-gray-900 dark:text-white">
                                {c.type}
                              </td>
                              <td className="p-3 text-gray-600 dark:text-gray-400 flex items-center gap-1.5 mt-0.5">
                                <Building2
                                  size={12}
                                  className="text-gray-400"
                                />{" "}
                                {c.property}
                              </td>
                              <td className="p-3 font-mono">{c.expiry}</td>
                              <td className="p-3 text-right">
                                <span
                                  className={`text-[9px] px-1.5 py-0.2 rounded border font-mono font-bold uppercase tracking-wide inline-block ${badgeStyles[c.status]}`}
                                >
                                  {c.status}
                                </span>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Segment Column: Comprehensive Registry Detail Context Node */}
              {mobileDetailOpen && (
                <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setMobileDetailOpen(false)} />
              )}
              <div className={`${
                mobileDetailOpen
                  ? 'fixed inset-4 z-50 overflow-y-auto lg:static lg:inset-auto lg:z-auto lg:col-span-5 lg:block lg:overflow-visible'
                  : 'hidden lg:col-span-5 lg:block'
              }`}>
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-3xs overflow-hidden h-full flex flex-col">
                  {selectedCert ? (
                    <>
                      {/* Meta Context Header block */}
                      <div className="p-4 bg-gray-50/70 dark:bg-gray-700/30 border-b border-gray-100 dark:border-gray-700 relative">
                        <button
                          onClick={() => setMobileDetailOpen(false)}
                          className="lg:hidden absolute top-4 right-4 p-1.5 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition text-gray-500 dark:text-gray-300"
                        >
                          <X size={18} />
                        </button>
                        <span className="text-[10px] text-gray-400 block font-mono">
                          REGULATORY SYSTEM TRACK: {selectedCert.id}
                        </span>
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm mt-0.5">
                          {selectedCert.type} Certification
                        </h3>
                      </div>

                      {/* Detail Parameters Fields Matrix */}
                      <div className="p-5 space-y-4 text-xs grow">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                            Infrastructure Property Node
                          </span>
                          <div className="text-sm font-bold text-gray-800 dark:text-gray-100 mt-1 flex items-center gap-1.5">
                            <Building2 size={14} className="text-emerald-500" />{" "}
                            {selectedCert.property}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 bg-gray-50/40 dark:bg-gray-900/20 p-3.5 rounded-xl border border-gray-100 dark:border-gray-800">
                          <div>
                            <span className="text-[10px] text-gray-400 block font-medium">
                              Certified Engineer Body
                            </span>
                            <div className="font-bold text-gray-700 dark:text-gray-300 mt-0.5">
                              {selectedCert.contractor}
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-400 block font-medium">
                              Cost center Attribution
                            </span>
                            <div className="font-mono text-gray-600 dark:text-gray-400 mt-0.5">
                              {selectedCert.costCode}
                            </div>
                          </div>
                          <div className="mt-2">
                            <span className="text-[10px] text-gray-400 block font-medium">
                              Last Physical Audit
                            </span>
                            <div className="font-mono text-gray-500 mt-0.5">
                              {selectedCert.lastAudited}
                            </div>
                          </div>
                          <div className="mt-2">
                            <span className="text-[10px] text-gray-400 block font-medium">
                              Expiration Timeline Target
                            </span>
                            <div className="font-mono font-bold text-gray-900 dark:text-white mt-0.5">
                              {selectedCert.expiry}
                            </div>
                          </div>
                        </div>

                        {/* Relative Tolerance Alarm Section */}
                        <div className="space-y-1.5">
                          <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                            Compliance Tolerance Status
                          </span>
                          {selectedCert.status === "Expired" ? (
                            <div className="p-3 bg-rose-500/5 border border-rose-500/10 rounded-xl flex items-center gap-2.5 text-rose-700 dark:text-rose-400 font-mono text-[11px]">
                              <ShieldAlert size={16} className="shrink-0" />
                              <span>
                                **CRITICAL LAPSE:** Cert lapsed{" "}
                                {Math.abs(selectedCert.daysRemaining)} days ago.
                                Remediation required.
                              </span>
                            </div>
                          ) : selectedCert.status === "Action Required" ? (
                            <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl flex items-center gap-2.5 text-amber-700 dark:text-amber-400 font-mono text-[11px]">
                              <AlertTriangle size={16} className="shrink-0" />
                              <span>
                                **WARNING WINDOW:** This framework token expires
                                in {selectedCert.daysRemaining} days. Renewal
                                scheduled.
                              </span>
                            </div>
                          ) : (
                            <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-center gap-2.5 text-emerald-700 dark:text-emerald-400 font-mono text-[11px]">
                              <CheckCircle2 size={16} className="shrink-0" />
                              <span>
                                **SECURE ARCHIVE:** System clearance remains
                                verified ({selectedCert.daysRemaining} days safe
                                threshold).
                              </span>
                            </div>
                          )}
                        </div>

                        {/* File Ref Asset Block */}
                        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border dark:border-gray-700 flex items-center justify-between text-[11px]">
                          <span className="text-gray-600 dark:text-gray-400 font-mono flex items-center gap-1.5 truncate max-w-[210px]">
                            <FileText
                              size={14}
                              className="text-gray-400 shrink-0"
                            />{" "}
                            {selectedCert.documentRef}
                          </span>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[9px] bg-gray-200/60 dark:bg-gray-700 font-mono text-gray-500 px-1.5 py-0.2 rounded">
                              SHA-256
                            </span>
                            <ArrowUpRight
                              size={13}
                              className="text-emerald-600 cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Bottom Context Trigger Actions */}
                      <div className="p-3 bg-gray-50 dark:bg-gray-700/20 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-xs shrink-0">
                        <button className="text-gray-400 hover:text-emerald-600 transition flex items-center gap-1">
                          <RefreshCw size={12} /> Force Re-Audit
                        </button>
                        <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition">
                          Download Certificate Asset
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-12 text-center text-xs text-gray-400 italic my-auto">
                      Select an indexed certification token row from the ledger
                      block to load historical validation proofs.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* INTERACTIVE FULL WORKSPACE MODAL: INGEST DOCUMENT + SIDE-BY-SIDE AI FIELD EXTRACTOR */}
        {isLogModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-5xl w-full max-h-[90dvh] flex flex-col overflow-hidden border dark:border-gray-700 shadow-2xl relative">
              {/* Modal Core Layout Header */}
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-b flex justify-between items-center shrink-0">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                    <ShieldCheck size={16} className="text-emerald-600" />{" "}
                    Ingest Statutory Asset Certification Token
                  </h3>
                  <p className="text-[11px] text-gray-400 font-mono">
                    Process digital certification archives, verify validation
                    thresholds, and synchronize metadata.
                  </p>
                </div>
                <button
                  onClick={() => setIsLogModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Split Twin Panel Content Area */}
              <div className="grow flex flex-col lg:flex-row overflow-hidden">
                {/* Column 1 Split: Data Input Fields Block Form */}
                <form
                  onSubmit={handleFormSubmit}
                  className="w-full lg:w-1/2 p-5 overflow-y-auto border-r dark:border-gray-700 space-y-4 text-xs"
                >
                  <div>
                    <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                      Document Classification Class
                    </label>
                    <select
                      value={newCertForm.type}
                      onChange={(e) =>
                        setNewCertForm({ ...newCertForm, type: e.target.value })
                      }
                      className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 outline-none font-medium text-gray-800 dark:text-white"
                    >
                      <option value="EICR">EICR Electrical Inspection</option>
                      <option value="Gas Safety">Gas Safety Matrix</option>
                      <option value="PAT Testing">PAT Portable Testing</option>
                      <option value="Fire Risk Assessment (FRA)">
                        Fire Risk Assessment (FRA)
                      </option>
                      <option value="Legionella Risk">Legionella Risk</option>
                      <option value="Asbestos Register">
                        Asbestos Register
                      </option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                        Infrastructure Asset Zone
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Oak Lodge"
                        value={newCertForm.property}
                        onChange={(e) =>
                          setNewCertForm({
                            ...newCertForm,
                            property: e.target.value,
                          })
                        }
                        className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 outline-none font-sans"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                        Expiration Target Timeline
                      </label>
                      <input
                        required
                        type="date"
                        value={newCertForm.expiry}
                        onChange={(e) =>
                          setNewCertForm({
                            ...newCertForm,
                            expiry: e.target.value,
                          })
                        }
                        className="w-full border rounded-lg p-1.5 bg-gray-50 dark:bg-gray-700 outline-none font-mono text-[11px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                      Certified Contractor / Engineering Body
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Apex Electrical Ltd"
                      value={newCertForm.contractor}
                      onChange={(e) =>
                        setNewCertForm({
                          ...newCertForm,
                          contractor: e.target.value,
                        })
                      }
                      className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 outline-none text-gray-800 dark:text-gray-100"
                    />
                  </div>

                  {/* Scanned Media Dropbox Area */}
                  <div>
                    <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                      Upload Statutory Digital Scan Archive
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
                        Drop scanned PDF certificates here to run automated key
                        data extraction
                      </p>
                      {newCertForm.fileName && (
                        <div className="mt-2 text-[10px] text-emerald-600 font-mono bg-emerald-50 dark:bg-emerald-950/20 py-1 px-2 rounded inline-flex items-center gap-1">
                          <FileText size={12} /> Scan Reference Coupled:{" "}
                          {newCertForm.fileName}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-400 mb-1 uppercase tracking-wide">
                      Registry Verification Remarks
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Input additional engineering tracking notes or structural annotations manually..."
                      value={newCertForm.narrative}
                      onChange={(e) =>
                        setNewCertForm({
                          ...newCertForm,
                          narrative: e.target.value,
                        })
                      }
                      className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 outline-none font-mono leading-relaxed text-[11px]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl text-xs transition duration-150 shadow-xs"
                  >
                    Commit Verified Certificate to Active Database Ledger
                  </button>
                </form>

                {/* Column 2 Split: AI Copilot Assistant Extraction Node */}
                <div className="w-full lg:w-1/2 bg-gray-50 dark:bg-gray-900/60 flex flex-col h-full overflow-hidden">
                  {/* AI Sub Header Control Block */}
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center shrink-0">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                      <Sparkles size={14} /> AI Statutory Data Extractor
                    </span>
                    <button
                      type="button"
                      onClick={applyAiExtraction}
                      className="text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-0.5 rounded font-medium transition"
                    >
                      Sync Extracted Properties
                    </button>
                  </div>

                  {/* Message Stream Workspace Area */}
                  <div className="grow overflow-y-auto p-4 space-y-3 text-xs">
                    {aiMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-xl p-3 leading-relaxed ${
                            msg.role === "user"
                              ? "bg-emerald-600 text-white font-mono text-[11px]"
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
                      placeholder="Ask the inspector to query accreditation databases or analyze scan rows..."
                      value={aiChatInput}
                      onChange={(e) => setAiChatInput(e.target.value)}
                      className="grow bg-gray-50 dark:bg-gray-700 text-xs rounded-lg border px-3 outline-none focus:ring-1 focus:ring-emerald-500"
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

export default Compliance;
