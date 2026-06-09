import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Banner from "../partials/Banner";
import {
  Building2,
  BedDouble,
  AlertTriangle,
  Key,
  Users,
  Wrench,
  FileCheck,
  Search,
  Filter,
  MessageSquare,
  Plus,
  DollarSign,
  MapPin,
  User,
  Calendar,
  AlertCircle,
  X,
  ShieldAlert,
  Send,
} from "lucide-react";

// Curated image assets for a professional UI layout
const IMAGES = {
  exterior1:
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
  exterior2:
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
  exterior3:
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  tenantMale:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80",
  tenantFemale:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80",
};

const STAFF_COACHES = [
  "Sarah Jenkins (Senior Coach)",
  "Marcus Vance (Lead Practitioner)",
  "Alex Mercer (Support Worker)",
  "Elena Rostova (Housing Officer)",
];

// Programmatic Generator for 100 detailed property records
const generateDetailedProperties = () => {
  const list = [];
  const areas = [
    "Moseley",
    "Edgbaston",
    "Harborne",
    "Selly Oak",
    "Kings Heath",
    "Digbeth",
    "Erdington",
    "Aston",
  ];
  const prefixes = [
    "Oakridge",
    "Elm Street",
    "Sovereign",
    "Belgrave",
    "Highfield",
    "Parkview",
    "Victoria",
    "Priory",
  ];
  const names = ["House", "Court", "Manor", "Gateway", "Lodge", "Hall"];

  const tenantFirstNames = [
    "Liam",
    "James",
    "David",
    "Richard",
    "Michael",
    "Charlotte",
    "Amelie",
    "Robert",
    "Rachel",
    "Thomas",
  ];
  const tenantLastNames = [
    "Gallagher",
    "Ashcroft",
    "Miller",
    "Weller",
    "Jones",
    "Smith",
    "Davies",
    "Taylor",
    "Evans",
    "Brown",
  ];

  for (let i = 1; i <= 100; i++) {
    const prefix = prefixes[i % prefixes.length];
    const nameType = names[i % names.length];
    const area = areas[i % areas.length];
    const type = i % 3 === 0 ? "Standard HMO" : "Supported Accommodation";
    const totalRooms = (i % 3) + 4; // 4 to 6 rooms
    const occupiedRooms = totalRooms - 1;

    const lat = (52.4431 + i * 0.0021).toFixed(4);
    const lng = (-1.8821 - i * 0.0015).toFixed(4);

    // Current Tenants
    const currentTenants = Array.from({ length: occupiedRooms }, (_, rIdx) => {
      const isMale = rIdx % 2 === 0;
      const firstName = tenantFirstNames[(i + rIdx) % tenantFirstNames.length];
      const lastName = tenantLastNames[(i + rIdx) % tenantLastNames.length];
      const birthYear = 1975 + ((i + rIdx) % 25);
      const isSessionOverdue = (i + rIdx) % 4 === 0;

      return {
        roomNumber: `Room 10${rIdx + 1}`,
        fullName: `${firstName} ${lastName}`,
        dob: `${birthYear}-05-${(rIdx % 28) + 1}`,
        niNumber: `QQ ${10 + (i % 80)}${22 + rIdx}45 ${String.fromCharCode(65 + (i % 4))}`,
        image: isMale ? IMAGES.tenantMale : IMAGES.tenantFemale,
        assignedCoach: STAFF_COACHES[(i + rIdx) % STAFF_COACHES.length],
        supportSession: {
          lastDone: `2026-05-${20 + (rIdx % 10)}`,
          status: isSessionOverdue ? "Overdue" : "Up to date",
          notes: isSessionOverdue
            ? "Resident missed the scheduled consultation on June 4th. Re-booking critical."
            : "Session carried out successfully. Target progression outcomes updating normally.",
        },
      };
    });

    // Deep Maintenance Log Records
    const maintenanceJobs = [
      {
        id: `JOB-${200 + i}A`,
        title: "Communal Boiler Thermostat Malfunction",
        priority: i % 4 === 0 ? "High" : "Medium",
        assignedTo: "Express Gas & Heating Ltd",
        status: i % 4 === 0 ? "In Progress" : "Resolved",
        raisedDate: "2026-06-02",
      },
      {
        id: `JOB-${200 + i}B`,
        title: "Room 102 Window Frame Seal Realignment",
        priority: "Low",
        assignedTo: "Internal Multi-Trade Team",
        status: "Pending Allocation",
        raisedDate: "2026-06-07",
      },
    ];

    // Staff Chat Logs regarding this property
    const staffChat = [
      {
        sender: "Sarah Jenkins",
        text: `I've updated the support schedules for the active residents here. Let's monitor Room 102's attendance next week.`,
        timestamp: "2026-06-08 09:14 AM",
      },
      {
        sender: "Elena Rostova",
        text: `Understood. Contractors are scheduled to arrive on Thursday morning to review the structural window frame seals.`,
        timestamp: "2026-06-08 11:30 AM",
      },
    ];

    list.push({
      id: `PROP-${100 + i}`,
      name: `${prefix} ${nameType}`,
      address: `${i * 7} ${prefix} Road, ${area}, Birmingham, B${(i % 40) + 1} 4AL`,
      coordinates: `${lat},${lng}`,
      type: type,
      landlord: i % 2 === 0 ? "Apex Housing Ltd" : "Vanguard Property Holdings",
      image: i % 2 === 0 ? IMAGES.exterior1 : IMAGES.exterior2,
      totalRooms: totalRooms,
      occupiedRooms: occupiedRooms,
      complianceStatus: i % 12 === 0 ? "Action Required" : "Compliant",
      nextInspection: "2026-08-14",
      alerts:
        i % 12 === 0
          ? [{ message: "Property compliance window requires updating" }]
          : [],
      keySafes: [
        {
          id: "KS-MAIN",
          label: "Master Front Portal Entry",
          code: `20${(i % 90) + 10}#`,
        },
        {
          id: "KS-BOILER",
          label: "Basement Utility Hub",
          code: `49${(i % 90) + 10}*`,
        },
      ],
      visitLogs: [
        {
          timestamp: "2026-06-08 14:30",
          visitor: "Alex Mercer",
          purpose: "Routine Property Health Audit",
          notes: "Communal areas clear. Fire doors validated.",
        },
      ],
      currentTenants: currentTenants,
      pastTenants: [
        {
          fullName: `Past Resident ${i * 2}`,
          tenancyPeriod: "2024-01-15 to 2025-03-22",
          reasonForLeaving: "Graduated to independent long-term tenancy",
          balanceAtExit: "£0.00",
        },
      ],
      complianceDocs: [
        {
          name: "Gas Safety Certificate (CP12)",
          status: i % 12 === 0 ? "Review Needed" : "Valid",
          expiry: "2026-11-22",
        },
        {
          name: "EICR 5-Year Inspection",
          status: "Valid",
          expiry: "2029-04-10",
        },
      ],
      maintenanceJobs: maintenanceJobs,
      staffChat: staffChat,
    });
  }
  return list;
};

const INITIAL_PROPERTIES_DATA = generateDetailedProperties();

function Properties() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [properties, setProperties] = useState(INITIAL_PROPERTIES_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedProperty, setSelectedProperty] = useState(
    INITIAL_PROPERTIES_DATA[0],
  );
  const [activeTab, setActiveTab] = useState("overview");
  const [chatInput, setChatInput] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProp, setNewProp] = useState({
    name: "",
    address: "",
    type: "Supported Accommodation",
    landlord: "",
    coordinates: "52.4862,-1.8904",
    totalRooms: "4",
  });

  const filteredProperties = properties.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All" || p.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleCreateProperty = (e) => {
    e.preventDefault();
    const createdObject = {
      id: `PROP-${Date.now().toString().slice(-3)}`,
      name: newProp.name,
      address: newProp.address,
      coordinates: newProp.coordinates,
      type: newProp.type,
      landlord: newProp.landlord || "Internal Trust Account",
      image: IMAGES.exterior3,
      totalRooms: parseInt(newProp.totalRooms) || 4,
      occupiedRooms: 0,
      complianceStatus: "Compliant",
      nextInspection: "2026-10-01",
      alerts: [],
      keySafes: [{ id: "KS-MAIN", label: "Master Entry Port", code: "3481#" }],
      visitLogs: [
        {
          timestamp: "Just Now",
          visitor: "System Engine",
          purpose: "Property Onboard Initial Setup",
          notes: "Default configurations generated.",
        },
      ],
      currentTenants: [],
      pastTenants: [],
      complianceDocs: [
        {
          name: "First Verification Audit",
          status: "Valid",
          expiry: "2027-01-01",
        },
      ],
      maintenanceJobs: [],
      staffChat: [
        {
          sender: "System",
          text: "Property onboarding verification initialization complete.",
          timestamp: "Just Now",
        },
      ],
    };

    setProperties([createdObject, ...properties]);
    setSelectedProperty(createdObject);
    setIsModalOpen(false);
    setNewProp({
      name: "",
      address: "",
      type: "Supported Accommodation",
      landlord: "",
      coordinates: "52.4862,-1.8904",
      totalRooms: "4",
    });
  };

  const handlePostChatMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const updatedChat = [
      ...selectedProperty.staffChat,
      {
        sender: "Current User (Staff)",
        text: chatInput,
        timestamp: "Just Now",
      },
    ];

    // Update state inline for the selection item as well as the parent tracking dataset
    const updatedProp = { ...selectedProperty, staffChat: updatedChat };
    setSelectedProperty(updatedProp);
    setProperties(
      properties.map((p) => (p.id === selectedProperty.id ? updatedProp : p)),
    );
    setChatInput("");
  };

  const tabOptions = [
    { id: "overview", label: "Overview & Map", icon: Building2 },
    { id: "tenants", label: "Tenants Ledger", icon: Users },
    { id: "keys", label: "Keys & Access", icon: Key },
    { id: "maintenance", label: "Maintenance Log", icon: Wrench },
    { id: "chat", label: "Staff Communication", icon: MessageSquare },
    { id: "compliance", label: "Audits & Compliance", icon: FileCheck },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 dark:bg-gray-900">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Top Action Ribbon */}
            <div className="sm:flex sm:justify-between sm:items-center mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                  Properties Portfolio
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Manage infrastructure assets, real-time maintenance workflows,
                  operational keys, and resident records.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn bg-violet-600 hover:bg-violet-700 text-white flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition shadow-xs"
              >
                <Plus size={16} />
                <span>Add Property</span>
              </button>
            </div>

            {/* Filter Hub */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-xs mb-6 border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Filter records by property name, road, area..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg text-sm py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-700 dark:text-gray-200"
                >
                  <option value="All">All Portfolio Allocations</option>
                  <option value="Supported Accommodation">
                    Supported Accommodation
                  </option>
                  <option value="Standard HMO">Standard HMO</option>
                </select>
              </div>
            </div>

            {/* Workplace Frame Splitter */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Segment: List Panel */}
              <div className="lg:col-span-4 space-y-3">
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1">
                  Indexed Registries ({filteredProperties.length})
                </h2>
                <div className="space-y-2.5 max-h-[720px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                  {filteredProperties.map((p) => {
                    const isSelected = selectedProperty.id === p.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => {
                          setSelectedProperty(p);
                          setActiveTab("overview");
                        }}
                        className={`rounded-xl border cursor-pointer transition p-3 bg-white dark:bg-gray-800 shadow-xs flex gap-3 ${
                          isSelected
                            ? "border-violet-500 ring-2 ring-violet-500/10"
                            : "border-gray-100 dark:border-gray-700 hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-16 h-16 rounded-lg object-cover bg-gray-100 shrink-0 shadow-2xs"
                        />
                        <div className="min-w-0 flex-1">
                          <h3 className="text-xs font-bold text-gray-900 dark:text-white truncate">
                            {p.name}
                          </h3>
                          <p className="text-[11px] text-gray-400 truncate mt-0.5">
                            {p.address}
                          </p>
                          <div className="flex justify-between items-center text-[10px] mt-2 pt-1.5 border-t dark:border-gray-700 text-gray-400">
                            <span>
                              Units:{" "}
                              <strong>
                                {p.occupiedRooms}/{p.totalRooms}
                              </strong>
                            </span>
                            <span
                              className={
                                p.complianceStatus === "Compliant"
                                  ? "text-emerald-600 font-medium"
                                  : "text-rose-600 font-medium"
                              }
                            >
                              {p.complianceStatus}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Segment: Master Detailed Workspace View Card */}
              <div className="lg:col-span-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col">
                {/* Section Profile Context Card */}
                <div className="p-6 bg-gray-50/50 dark:bg-gray-700/20 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        {selectedProperty.name}
                      </h2>
                      <p className="text-xs text-gray-400 dark:text-gray-500 font-mono mt-0.5">
                        {selectedProperty.id} | {selectedProperty.address}
                      </p>
                    </div>
                  </div>

                  {/* Adaptive Tab Navigation Interface */}
                  <div className="mt-5">
                    <div className="sm:hidden">
                      <select
                        value={activeTab}
                        onChange={(e) => setActiveTab(e.target.value)}
                        className="w-full bg-white border border-gray-200 dark:border-gray-600 dark:bg-gray-700 rounded-lg text-xs p-2 font-medium focus:outline-none"
                      >
                        {tabOptions.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="hidden sm:flex gap-4 overflow-x-auto border-b border-gray-200 dark:border-gray-700 pb-0.5 scrollbar-none">
                      {tabOptions.map((tab) => {
                        const TabIcon = tab.icon;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 pb-2 text-xs font-semibold uppercase tracking-wider border-b-2 whitespace-nowrap transition ${
                              activeTab === tab.id
                                ? "border-violet-600 text-violet-600 dark:border-violet-400 dark:text-violet-400"
                                : "border-transparent text-gray-400 hover:text-gray-600"
                            }`}
                          >
                            <TabIcon size={14} />
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Information Output Field Container */}
                <div className="p-6 grow overflow-y-auto max-h-[580px]">
                  {/* TAB 1: OVERVIEW & EXTERNAL VECTOR MAPS */}
                  {activeTab === "overview" && (
                    <div className="space-y-4">
                      <div className="w-full h-56 bg-gray-100 rounded-xl overflow-hidden border dark:border-gray-600 shadow-xs relative">
                        <iframe
                          title="Property Navigation Coordinates Frame"
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          scrolling="no"
                          src={`https://maps.google.com/maps?q=${selectedProperty.coordinates}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                        ></iframe>
                      </div>

                      <div className="border dark:border-gray-700 rounded-xl overflow-hidden">
                        <div className="p-3 bg-gray-50 dark:bg-gray-700/50 border-b dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-200">
                          Recent Visit & Audit Log Entries
                        </div>
                        <div className="divide-y divide-gray-100 dark:divide-gray-700">
                          {selectedProperty.visitLogs.map((log, idx) => (
                            <div
                              key={idx}
                              className="p-3 text-xs space-y-1 hover:bg-gray-50/20"
                            >
                              <div className="flex justify-between font-medium">
                                <span className="text-gray-900 dark:text-white font-bold">
                                  {log.visitor}
                                </span>
                                <span className="text-gray-400 font-mono">
                                  {log.timestamp}
                                </span>
                              </div>
                              <div className="text-violet-600 dark:text-violet-400 font-medium">
                                Purpose: {log.purpose}
                              </div>
                              <p className="text-gray-500 dark:text-gray-400 italic">
                                "{log.notes}"
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: TENANTS DEEP PROFILE MODULE */}
                  {activeTab === "tenants" && (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                          Current Active Occupancy
                        </h3>
                        {selectedProperty.currentTenants.length === 0 ? (
                          <p className="text-xs text-gray-400 text-center py-4 border border-dashed rounded-xl">
                            No residents assigned to this structure setup.
                          </p>
                        ) : (
                          <div className="space-y-4">
                            {selectedProperty.currentTenants.map(
                              (tenant, idx) => (
                                <div
                                  key={idx}
                                  className="border dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-800/40 shadow-xs space-y-3"
                                >
                                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-b dark:border-gray-700 pb-3">
                                    <div className="flex gap-3 items-center">
                                      <img
                                        src={tenant.image}
                                        alt={tenant.fullName}
                                        className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700"
                                      />
                                      <div>
                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                                          {tenant.fullName}{" "}
                                          <span className="text-xs font-mono text-gray-400 ml-1">
                                            ({tenant.roomNumber})
                                          </span>
                                        </h4>
                                        <p className="text-[11px] text-gray-400 mt-0.5">
                                          Support Coach:{" "}
                                          <strong className="text-gray-700 dark:text-gray-200">
                                            {tenant.assignedCoach}
                                          </strong>
                                        </p>
                                      </div>
                                    </div>
                                    <div className="text-right text-[11px] font-mono space-y-0.5 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 px-2.5 py-1 rounded-md border dark:border-gray-600">
                                      <div>
                                        DOB: <strong>{tenant.dob}</strong>
                                      </div>
                                      <div>
                                        NINo: <strong>{tenant.niNumber}</strong>
                                      </div>
                                    </div>
                                  </div>

                                  <div
                                    className={`p-3 rounded-lg border text-xs ${
                                      tenant.supportSession.status === "Overdue"
                                        ? "bg-rose-50/40 border-rose-100 text-rose-900 dark:bg-rose-950/10 dark:border-rose-900/40"
                                        : "bg-emerald-50/40 border-emerald-100 text-emerald-900 dark:bg-emerald-950/10 dark:border-emerald-900/40"
                                    }`}
                                  >
                                    <div className="flex justify-between items-center font-bold mb-1">
                                      <span className="flex items-center gap-1.5">
                                        {tenant.supportSession.status ===
                                        "Overdue" ? (
                                          <ShieldAlert
                                            size={14}
                                            className="text-rose-600"
                                          />
                                        ) : (
                                          <FileCheck
                                            size={14}
                                            className="text-emerald-600"
                                          />
                                        )}
                                        Support Assessment Status:{" "}
                                        {tenant.supportSession.status}
                                      </span>
                                      <span className="font-mono font-normal text-[11px]">
                                        Last Done:{" "}
                                        {tenant.supportSession.lastDone}
                                      </span>
                                    </div>
                                    <p className="text-[11px] opacity-90 mt-1">
                                      <strong>Session Track Summary:</strong>{" "}
                                      {tenant.supportSession.notes}
                                    </p>
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                          Historical Tenancy Archival Records
                        </h3>
                        <div className="overflow-hidden border dark:border-gray-700 rounded-xl text-xs">
                          <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-400 font-medium">
                              <tr>
                                <th className="p-2.5">Former Resident</th>
                                <th className="p-2.5">Tenancy Window</th>
                                <th className="p-2.5">Exit Classification</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-500 dark:text-gray-400">
                              {selectedProperty.pastTenants.map(
                                (past, pIdx) => (
                                  <tr
                                    key={pIdx}
                                    className="hover:bg-gray-50/20"
                                  >
                                    <td className="p-2.5 font-bold text-gray-700 dark:text-gray-300">
                                      {past.fullName}
                                    </td>
                                    <td className="p-2.5 font-mono text-[11px]">
                                      {past.tenancyPeriod}
                                    </td>
                                    <td className="p-2.5 truncate max-w-xs">
                                      {past.reasonForLeaving}
                                    </td>
                                  </tr>
                                ),
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: KEY SAFE & ACCESS CONTROLS */}
                  {activeTab === "keys" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedProperty.keySafes.map((safe) => (
                          <div
                            key={safe.id}
                            className="p-4 border dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-between shadow-xs"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-amber-600">
                                <Key size={20} />
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                                  {safe.label}
                                </h4>
                                <span className="text-[10px] bg-gray-100 dark:bg-gray-700 text-gray-500 font-mono px-1.5 py-0.2 rounded mt-1 inline-block">
                                  {safe.id}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] text-gray-400 block uppercase font-mono tracking-wider">
                                Access Token
                              </span>
                              <span className="text-sm font-mono font-bold text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 px-2 py-0.5 rounded border dark:border-gray-600">
                                {safe.code}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 4: MAINTENANCE LOGS & REQUESTS */}
                  {activeTab === "maintenance" && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                          Active Structural Work Orders
                        </h3>
                        <span className="text-[10px] bg-violet-50 text-violet-700 dark:bg-violet-950/30 dark:text-violet-400 px-2 py-0.5 rounded font-mono font-bold">
                          Jobs Raised: {selectedProperty.maintenanceJobs.length}
                        </span>
                      </div>

                      {selectedProperty.maintenanceJobs.length === 0 ? (
                        <p className="text-xs text-gray-400 text-center py-8">
                          All job files are currently checked and closed.
                        </p>
                      ) : (
                        <div className="space-y-2.5">
                          {selectedProperty.maintenanceJobs.map((job) => (
                            <div
                              key={job.id}
                              className="p-3.5 border dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800/60 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`px-1.5 py-0.2 text-[10px] uppercase font-bold rounded ${
                                      job.priority === "High"
                                        ? "bg-rose-50 text-rose-700"
                                        : "bg-amber-50 text-amber-700"
                                    }`}
                                  >
                                    {job.priority} Priority
                                  </span>
                                  <span className="text-gray-400 font-mono text-[11px]">
                                    {job.id}
                                  </span>
                                </div>
                                <h4 className="font-bold text-gray-800 dark:text-gray-200">
                                  {job.title}
                                </h4>
                                <p className="text-gray-400 text-[11px]">
                                  Assigned Agent:{" "}
                                  <strong className="text-gray-600 dark:text-gray-400">
                                    {job.assignedTo}
                                  </strong>{" "}
                                  | Raised: {job.raisedDate}
                                </p>
                              </div>
                              <div className="sm:text-right shrink-0">
                                <span
                                  className={`inline-block px-2 py-0.5 text-[11px] font-bold rounded ${
                                    job.status === "Resolved"
                                      ? "bg-emerald-50 text-emerald-700"
                                      : "bg-violet-50 text-violet-700"
                                  }`}
                                >
                                  {job.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 5: STAFF INTERNAL COMMUNICATION CHAT */}
                  {activeTab === "chat" && (
                    <div className="space-y-4 flex flex-col h-full justify-between">
                      <div className="space-y-1">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                          Property Notes & Internal Collaboration Logs
                        </h3>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          Secure internal communications regarding localized
                          operations or resident sync updates.
                        </p>
                      </div>

                      <div className="border dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-900/20 p-3.5 h-64 overflow-y-auto space-y-3">
                        {selectedProperty.staffChat.map((msg, idx) => (
                          <div
                            key={idx}
                            className="bg-white dark:bg-gray-800 p-3 rounded-xl border dark:border-gray-700 text-xs shadow-3xs space-y-1 max-w-xl"
                          >
                            <div className="flex justify-between items-center border-b dark:border-gray-700 pb-1 mb-1">
                              <span className="font-bold text-violet-600 dark:text-violet-400">
                                {msg.sender}
                              </span>
                              <span className="text-[10px] text-gray-400 font-mono">
                                {msg.timestamp}
                              </span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {msg.text}
                            </p>
                          </div>
                        ))}
                      </div>

                      <form
                        onSubmit={handlePostChatMessage}
                        className="flex gap-2"
                      >
                        <input
                          type="text"
                          placeholder="Type internal operational update for this property..."
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          className="grow border rounded-lg text-xs px-3.5 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-200 dark:border-gray-600 outline-none focus:ring-1 focus:ring-violet-500"
                        />
                        <button
                          type="submit"
                          className="bg-gray-900 hover:bg-gray-800 dark:bg-violet-600 dark:hover:bg-violet-700 text-white px-4 py-2 rounded-lg flex items-center justify-center transition"
                        >
                          <Send size={14} />
                        </button>
                      </form>
                    </div>
                  )}

                  {/* TAB 6: COMPLIANCE INTEGRATION */}
                  {activeTab === "compliance" && (
                    <div className="space-y-2">
                      {selectedProperty.complianceDocs.map((doc, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center p-3 border dark:border-gray-700 rounded-xl bg-gray-50/20 text-xs"
                        >
                          <div>
                            <div className="font-bold text-gray-800 dark:text-gray-200">
                              {doc.name}
                            </div>
                            <div className="text-gray-400 mt-0.5">
                              Expiry Threshold: {doc.expiry}
                            </div>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              doc.status === "Valid"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {doc.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* MODAL SHEET FOR NEW ENTRIES */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-xs">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6 border dark:border-gray-700 shadow-2xl relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
                Add Property
              </h3>

              <form
                onSubmit={handleCreateProperty}
                className="space-y-4 text-xs"
              >
                <div>
                  <label className="block font-medium text-gray-500 mb-1">
                    Property Title Designation
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Sovereign Manor"
                    value={newProp.name}
                    onChange={(e) =>
                      setNewProp({ ...newProp, name: e.target.value })
                    }
                    className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-1 focus:ring-violet-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-500 mb-1">
                    Operational Address
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Complete physical corporate listing address"
                    value={newProp.address}
                    onChange={(e) =>
                      setNewProp({ ...newProp, address: e.target.value })
                    }
                    className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-1 focus:ring-violet-500 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-gray-500 mb-1">
                      Classification Type
                    </label>
                    <select
                      value={newProp.type}
                      onChange={(e) =>
                        setNewProp({ ...newProp, type: e.target.value })
                      }
                      className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 outline-none"
                    >
                      <option value="Supported Accommodation">
                        Supported Accommodation
                      </option>
                      <option value="Standard HMO">Standard HMO</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium text-gray-500 mb-1">
                      Total Unit Rooms
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={newProp.totalRooms}
                      onChange={(e) =>
                        setNewProp({ ...newProp, totalRooms: e.target.value })
                      }
                      className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-medium text-gray-500 mb-1">
                    GPS Mapping Pins (Lat,Lng)
                  </label>
                  <input
                    type="text"
                    placeholder="52.4862,-1.8904"
                    value={newProp.coordinates}
                    onChange={(e) =>
                      setNewProp({ ...newProp, coordinates: e.target.value })
                    }
                    className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 font-mono text-gray-800 dark:text-gray-100 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2.5 rounded-lg transition mt-2"
                >
                  Add Property
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

export default Properties;
