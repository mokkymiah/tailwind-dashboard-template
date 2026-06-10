import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Banner from "../partials/Banner";
import {
  BedDouble,
  Building2,
  Users,
  Wrench,
  MessageSquare,
  DollarSign,
  ClipboardList,
  Search,
  Filter,
  Plus,
  Calendar,
  ShieldCheck,
  User,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Send,
  X,
  ShieldAlert,
  Zap,
} from "lucide-react";

// Curated high-quality asset images for UI mock styling
const IMAGES = {
  roomOccupied:
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80",
  roomVacant:
    "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80",
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

// Programmatic Room Dataset Generator (Creates 100 deeply defined room structures)
const generateDetailedRooms = () => {
  const roomsList = [];
  const properties = [
    "Oakridge House",
    "Elm Street Court",
    "Sovereign Manor",
    "Belgrave Gateway",
    "Highfield Lodge",
    "Parkview Hall",
    "Victoria House",
    "Priory Court",
  ];
  const areas = [
    "Moseley",
    "Edgbaston",
    "Harborne",
    "Selly Oak",
    "Kings Heath",
  ];

  const firstNames = [
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
  const lastNames = [
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
    const propertyName = properties[i % properties.length];
    const propertyArea = areas[i % areas.length];
    const floor =
      i % 3 === 0 ? "Ground Floor" : i % 3 === 1 ? "1st Floor" : "2nd Floor";
    const roomNum = 100 + (i % 12) + 1;
    const status =
      i % 5 === 0 ? "Vacant" : i % 14 === 0 ? "Under Maintenance" : "Occupied";

    // Core structural metrics
    const rentAmount = 450 + i * 2.5;
    const isMale = i % 2 === 0;
    const tenantName = `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`;

    // Tenant detail block
    const tenantDetails =
      status === "Occupied"
        ? {
            fullName: tenantName,
            dob: `${1978 + (i % 22)}-04-${(i % 25) + 1}`,
            niNumber: `QQ ${20 + (i % 60)}${10 + i}32 ${String.fromCharCode(65 + (i % 4))}`,
            image: isMale ? IMAGES.tenantMale : IMAGES.tenantFemale,
            assignedCoach: STAFF_COACHES[i % STAFF_COACHES.length],
            tenancyStart: `2025-02-${(i % 20) + 1}`,
            weeklySupportStatus: i % 7 === 0 ? "Overdue" : "Completed",
            paymentMethod: "Direct Housing Benefit (HB / UC)",
          }
        : null;

    // Room inventory profile
    const inventory = [
      {
        item: "Single Bed Frame & Ortho Mattress",
        condition: "Good",
        verifiedDate: "2026-05-10",
      },
      {
        item: "Wardrobe & Compact Chest of Drawers",
        condition: i % 9 === 0 ? "Wear Noted" : "Excellent",
        verifiedDate: "2026-05-10",
      },
      {
        item: "Radiator Smart TRV Valve",
        condition: "Functional",
        verifiedDate: "2026-04-18",
      },
      {
        item: "Carbon Monoxide Det. & Smoke Sounder",
        condition: "Tested Pass",
        verifiedDate: "2026-06-01",
      },
    ];

    // Room maintenance ledger
    const maintenanceJobs = [];
    if (status === "Under Maintenance" || i % 6 === 0) {
      maintenanceJobs.push({
        id: `JOB-RM-${400 + i}`,
        title: "En-suite Mixer Shower Valve Leak Fix",
        priority: "High",
        status:
          status === "Under Maintenance" ? "In Progress" : "Pending Allocation",
        raisedDate: "2026-06-05",
      });
    }

    // Room ledger accounting profile
    const financialLedger = {
      monthlyRent: rentAmount,
      balance: i % 8 === 0 && status === "Occupied" ? -120.0 : 0.0, // Negative reflects arrears
      lastPaymentDate: "2026-06-01",
      utilityCapStatus: "Within Allowance Limit",
    };

    // Chat Logs regarding this room specifically
    const staffChat = [
      {
        sender: "Elena Rostova",
        text: `Room ${roomNum} move-in inventory inventory file has been digitally signed and filed.`,
        timestamp: "2026-05-12 10:15 AM",
      },
      {
        sender: "Marcus Vance",
        text: `Resident indicated the window catch is tight. Will check it over during the next support review loop.`,
        timestamp: "2026-05-14 02:22 PM",
      },
    ];

    roomsList.push({
      id: `RM-${200 + i}`,
      name: `Room ${roomNum}`,
      floor: floor,
      property: propertyName,
      locationDetails: `${propertyName}, ${propertyArea} Layout Segment`,
      status: status,
      image: status === "Occupied" ? IMAGES.roomOccupied : IMAGES.roomVacant,
      hasEnsuite: i % 2 === 0,
      licensedSizeSqM: (11.5 + (i % 5)).toFixed(1),
      tenant: tenantDetails,
      inventory: inventory,
      maintenanceJobs: maintenanceJobs,
      financialLedger: financialLedger,
      staffChat: staffChat,
    });
  }
  return roomsList;
};

const INITIAL_ROOMS_DATA = generateDetailedRooms();

function Rooms() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rooms, setRooms] = useState(INITIAL_ROOMS_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(INITIAL_ROOMS_DATA[0]);
  const [activeTab, setActiveTab] = useState("ledger");
  const [chatInput, setChatInput] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({
    name: "Room 105",
    property: "Oakridge House",
    floor: "Ground Floor",
    hasEnsuite: "true",
    licensedSizeSqM: "12.5",
    monthlyRent: "480",
  });

  // Filter Algorithm Engine
  const filteredRooms = rooms.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.tenant &&
        r.tenant.fullName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "All" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateRoom = (e) => {
    e.preventDefault();
    const createdObject = {
      id: `RM-${Date.now().toString().slice(-3)}`,
      name: newRoom.name,
      floor: newRoom.floor,
      property: newRoom.property,
      locationDetails: `${newRoom.property}, Internal Layout Segment`,
      status: "Vacant",
      image: IMAGES.roomVacant,
      hasEnsuite: newRoom.hasEnsuite === "true",
      licensedSizeSqM: parseFloat(newRoom.licensedSizeSqM) || 12.0,
      tenant: null,
      inventory: [
        {
          item: "Standard Asset Pack Onboarded",
          condition: "New / Verified",
          verifiedDate: "Just Now",
        },
      ],
      maintenanceJobs: [],
      financialLedger: {
        monthlyRent: parseInt(newRoom.monthlyRent) || 450,
        balance: 0.0,
        lastPaymentDate: "N/A",
        utilityCapStatus: "Calculated Standard",
      },
      staffChat: [
        {
          sender: "System Engine",
          text: "Room registry added to system database setup.",
          timestamp: "Just Now",
        },
      ],
    };

    setRooms([createdObject, ...rooms]);
    setSelectedRoom(createdObject);
    setIsModalOpen(false);
    // Reset defaults
    setNewRoom({
      name: "Room 105",
      property: "Oakridge House",
      floor: "Ground Floor",
      hasEnsuite: "true",
      licensedSizeSqM: "12.5",
      monthlyRent: "480",
    });
  };

  const handlePostChatMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const updatedChat = [
      ...selectedRoom.staffChat,
      {
        sender: "Current User (Staff Desk)",
        text: chatInput,
        timestamp: "Just Now",
      },
    ];

    const updatedRoomObj = { ...selectedRoom, staffChat: updatedChat };
    setSelectedRoom(updatedRoomObj);
    setRooms(rooms.map((r) => (r.id === selectedRoom.id ? updatedRoomObj : r)));
    setChatInput("");
  };

  const tabOptions = [
    { id: "ledger", label: "Resident & Licensing", icon: Users },
    { id: "inventory", label: "Asset Inventory", icon: ClipboardList },
    { id: "finance", label: "Rent & Financials", icon: DollarSign },
    { id: "maintenance", label: "Room Defects", icon: Wrench },
    { id: "chat", label: "Room Staff Chat", icon: MessageSquare },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 dark:bg-gray-900">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Header Ribbon Section */}
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium inline-flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-xs transition duration-150"
              >
                <Plus size={16} />
                <span>Unit</span>
              </button>
            </div>

            {/* KPI Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-xs">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Rooms</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{filteredRooms.length}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-xs">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Occupied</p>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{filteredRooms.filter((r) => r.status === "Occupied").length}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-xs">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Vacant</p>
                <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">{filteredRooms.filter((r) => r.status === "Vacant" || r.status === "Available").length}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-xs">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Maintenance</p>
                <p className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1">{filteredRooms.filter((r) => r.status === "Maintenance" || r.maintenance).length}</p>
              </div>
            </div>

            {/* Workspace Split Frame Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Registry List Panel */}
              <div className="lg:col-span-4 space-y-3">
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
                          <option value="Occupied">Occupied</option>
                          <option value="Vacant">Vacant</option>
                          <option value="Under Maintenance">Under Maintenance</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-2.5 max-h-[700px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                  {filteredRooms.map((r) => {
                    const isSelected = selectedRoom.id === r.id;
                    return (
                      <div
                        key={r.id}
                        onClick={() => {
                          setSelectedRoom(r);
                          setActiveTab("ledger");
                          setMobileDetailOpen(true);
                        }}
                        className={`rounded-xl border cursor-pointer transition p-3 bg-white dark:bg-gray-800 shadow-xs flex gap-3 ${
                          isSelected
                            ? "border-violet-500 ring-2 ring-violet-500/10"
                            : "border-gray-100 dark:border-gray-700 hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={r.image}
                          alt={r.name}
                          className="w-16 h-16 rounded-lg object-cover bg-gray-100 shrink-0 shadow-2xs"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex justify-between items-start gap-1">
                            <h3 className="text-xs font-bold text-gray-900 dark:text-white truncate">
                              {r.name} -{" "}
                              <span className="text-gray-400">{r.floor}</span>
                            </h3>
                            <span
                              className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded shrink-0 ${
                                r.status === "Occupied"
                                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400"
                                  : r.status === "Vacant"
                                    ? "bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400"
                                    : "bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400"
                              }`}
                            >
                              {r.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-400 truncate mt-1 flex items-center gap-1">
                            <Building2 size={12} /> {r.property}
                          </p>

                          <div className="flex justify-between items-center text-[10px] mt-2 pt-1.5 border-t dark:border-gray-700 text-gray-400">
                            <span>
                              Lic Size: <strong>{r.licensedSizeSqM} m²</strong>
                            </span>
                            {r.tenant ? (
                              <span className="text-gray-700 dark:text-gray-300 truncate font-medium max-w-[120px]">
                                👤 {r.tenant.fullName}
                              </span>
                            ) : (
                              <span className="text-gray-400 italic">
                                No Resident Assigned
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Segment - Room Master Workspace Workspace Card */}
              {mobileDetailOpen && (
                <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setMobileDetailOpen(false)} />
              )}
              <div className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col ${
                mobileDetailOpen
                  ? 'fixed inset-4 z-50 overflow-y-auto lg:static lg:inset-auto lg:z-auto lg:col-span-8 lg:flex lg:overflow-hidden'
                  : 'hidden lg:col-span-8 lg:flex lg:overflow-hidden'
              }`}>
                {/* Active Workspace Header Meta */}
                <div className="p-6 bg-gray-50/50 dark:bg-gray-700/20 border-b border-gray-100 dark:border-gray-700 relative">
                  <button
                    onClick={() => setMobileDetailOpen(false)}
                    className="lg:hidden absolute top-4 right-4 p-1.5 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition text-gray-500 dark:text-gray-300"
                  >
                    <X size={18} />
                  </button>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                          {selectedRoom.name} Workspace
                        </h2>
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 font-mono px-2 py-0.5 rounded-sm">
                          {selectedRoom.id}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {selectedRoom.locationDetails} • Licensed HMO Asset
                      </p>
                    </div>
                  </div>

                  {/* Internal Workspace Tabs Bar */}
                  <div className="mt-5 flex gap-4 overflow-x-auto border-b border-gray-200 dark:border-gray-700 pb-0.5 scrollbar-none">
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

                {/* Sub-Panel Variable Output Container */}
                <div className="p-6 grow overflow-y-auto max-h-[550px]">
                  {/* TAB 1: RESIDENT LEDGER & LICENSING PROFILE */}
                  {activeTab === "ledger" && (
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3.5 border dark:border-gray-700 rounded-xl space-y-2 bg-gray-50/30 dark:bg-gray-800/50">
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                            HMO Space Licensing Metrics
                          </h4>
                          <div className="text-xs space-y-1.5 text-gray-600 dark:text-gray-300">
                            <div className="flex justify-between">
                              <span>Floor Designation:</span>{" "}
                              <strong className="text-gray-900 dark:text-white">
                                {selectedRoom.floor}
                              </strong>
                            </div>
                            <div className="flex justify-between">
                              <span>Licensed Spatial Size:</span>{" "}
                              <strong className="text-gray-900 dark:text-white">
                                {selectedRoom.licensedSizeSqM} Square Meters
                              </strong>
                            </div>
                            <div className="flex justify-between">
                              <span>Ensuite Bathroom Hub:</span>{" "}
                              <strong className="text-gray-900 dark:text-white">
                                {selectedRoom.hasEnsuite
                                  ? "Yes (Private Facilities)"
                                  : "No (Shared Facilities)"}
                              </strong>
                            </div>
                            <div className="flex justify-between">
                              <span>Permitted Density Max:</span>{" "}
                              <strong className="text-gray-900 dark:text-white">
                                1 Adult (Single Occupancy Only)
                              </strong>
                            </div>
                          </div>
                        </div>

                        <div className="p-3.5 border dark:border-gray-700 rounded-xl flex items-center justify-between bg-gray-50/30 dark:bg-gray-800/50">
                          <div className="space-y-1">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                              Asset Safety Rating
                            </h4>
                            <p className="text-[11px] text-gray-500">
                              Local fire partition barriers & door self-closers
                              checked.
                            </p>
                            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium pt-1">
                              <ShieldCheck size={14} /> Compliant with Part 2
                              HMO Standards
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                          Assigned Occupancy Details
                        </h4>
                        {!selectedRoom.tenant ? (
                          <div className="p-8 border border-dashed rounded-xl text-center text-xs text-gray-400 space-y-2 bg-white dark:bg-transparent">
                            <BedDouble
                              size={28}
                              className="mx-auto text-gray-300"
                            />
                            <p className="font-medium">
                              This allocation unit is currently vacant.
                            </p>
                            <p className="text-[11px] max-w-xs mx-auto">
                              Ready for tenant pairing matching sequence or
                              housing officer intake booking processing.
                            </p>
                          </div>
                        ) : (
                          <div className="border dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-800/40 space-y-4">
                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-b dark:border-gray-700 pb-3">
                              <div className="flex gap-3 items-center">
                                <img
                                  src={selectedRoom.tenant.image}
                                  alt="Resident Profile photo"
                                  className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700"
                                />
                                <div>
                                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                                    {selectedRoom.tenant.fullName}
                                  </h4>
                                  <p className="text-[11px] text-gray-400 mt-0.5">
                                    Assigned Coach:{" "}
                                    <strong className="text-gray-700 dark:text-gray-200">
                                      {selectedRoom.tenant.assignedCoach}
                                    </strong>
                                  </p>
                                </div>
                              </div>
                              <div className="text-right text-[11px] font-mono space-y-0.5 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 px-2.5 py-1 rounded-md border dark:border-gray-600">
                                <div>
                                  DOB:{" "}
                                  <strong>{selectedRoom.tenant.dob}</strong>
                                </div>
                                <div>
                                  NINo:{" "}
                                  <strong>
                                    {selectedRoom.tenant.niNumber}
                                  </strong>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                              <div>
                                <span className="text-gray-400 block">
                                  Tenancy Agreement Commenced:
                                </span>{" "}
                                <span className="font-mono font-medium text-gray-800 dark:text-gray-200">
                                  {selectedRoom.tenant.tenancyStart}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-400 block">
                                  Funding Stream Class:
                                </span>{" "}
                                <span className="font-medium text-gray-800 dark:text-gray-200">
                                  {selectedRoom.tenant.paymentMethod}
                                </span>
                              </div>
                            </div>

                            <div
                              className={`p-3 rounded-lg border text-xs ${
                                selectedRoom.tenant.weeklySupportStatus ===
                                "Overdue"
                                  ? "bg-rose-50/40 border-rose-100 text-rose-900 dark:bg-rose-950/10 dark:border-rose-900/40"
                                  : "bg-emerald-50/40 border-emerald-100 text-emerald-900 dark:bg-emerald-950/10 dark:border-emerald-900/40"
                              }`}
                            >
                              <div className="flex justify-between items-center font-bold">
                                <span className="flex items-center gap-1.5">
                                  {selectedRoom.tenant.weeklySupportStatus ===
                                  "Overdue" ? (
                                    <ShieldAlert
                                      size={14}
                                      className="text-rose-600"
                                    />
                                  ) : (
                                    <CheckCircle2
                                      size={14}
                                      className="text-emerald-600"
                                    />
                                  )}
                                  Weekly Practitioner Consultation Status:{" "}
                                  {selectedRoom.tenant.weeklySupportStatus}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* TAB 2: ASSET INVENTORY MODULE */}
                  {activeTab === "inventory" && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                          Unit Furnishings & Safety Asset Inventory
                        </h3>
                        <span className="text-[11px] text-gray-400">
                          Last verified: 2026-05-10
                        </span>
                      </div>

                      <div className="overflow-hidden border dark:border-gray-700 rounded-xl text-xs">
                        <table className="w-full text-left">
                          <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-400 font-medium">
                            <tr>
                              <th className="p-3">Tracked Item Component</th>
                              <th className="p-3">Condition Index</th>
                              <th className="p-3">Last Verified Loop</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-600 dark:text-gray-300">
                            {selectedRoom.inventory.map((item, index) => (
                              <tr key={index} className="hover:bg-gray-50/20">
                                <td className="p-3 font-medium text-gray-900 dark:text-white">
                                  {item.item}
                                </td>
                                <td className="p-3">
                                  <span
                                    className={`px-2 py-0.2 rounded font-medium text-[11px] ${
                                      item.condition === "Excellent" ||
                                      item.condition === "Good" ||
                                      item.condition === "Functional" ||
                                      item.condition === "Tested Pass"
                                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/10"
                                        : "bg-amber-50 text-amber-700 dark:bg-amber-950/10"
                                    }`}
                                  >
                                    {item.condition}
                                  </span>
                                </td>
                                <td className="p-3 font-mono text-gray-400 text-[11px]">
                                  {item.verifiedDate}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: RENT & FINANCIALS LEDGER */}
                  {activeTab === "finance" && (
                    <div className="space-y-5">
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Unit Financial Run-Sheet
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-4 border dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-xs">
                          <span className="text-[11px] text-gray-400 block uppercase font-semibold">
                            Rent Charging Threshold
                          </span>
                          <span className="text-xl font-bold text-gray-900 dark:text-white">
                            £{selectedRoom.financialLedger.monthlyRent}
                          </span>
                          <span className="text-[10px] text-gray-400 block mt-1">
                            Calculated Per Month
                          </span>
                        </div>
                        <div className="p-4 border dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-xs">
                          <span className="text-[11px] text-gray-400 block uppercase font-semibold">
                            Statement Net Balance
                          </span>
                          <span
                            className={`text-xl font-bold block ${selectedRoom.financialLedger.balance < 0 ? "text-rose-600" : "text-emerald-600"}`}
                          >
                            {selectedRoom.financialLedger.balance === 0
                              ? "£0.00"
                              : `-£${Math.abs(selectedRoom.financialLedger.balance).toFixed(2)}`}
                          </span>
                          <span className="text-[10px] text-gray-400 block mt-1">
                            {selectedRoom.financialLedger.balance < 0
                              ? "Arrears Alert Action Required"
                              : "Account Clear / Up to Date"}
                          </span>
                        </div>
                        <div className="p-4 border dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-xs">
                          <span className="text-[11px] text-gray-400 block uppercase font-semibold">
                            Energy Consumption Cap
                          </span>
                          <span className="text-sm font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1 mt-1 text-amber-600">
                            <Zap size={14} /> Smart Cap Normal
                          </span>
                          <span className="text-[10px] text-gray-400 block mt-1">
                            {selectedRoom.financialLedger.utilityCapStatus}
                          </span>
                        </div>
                      </div>

                      <div className="p-3.5 border border-gray-100 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-900/20 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 font-medium">
                            Last Audited Direct Housing Benefit Transmission
                            Check:
                          </span>
                          <span className="font-mono text-gray-900 dark:text-white font-bold">
                            {selectedRoom.financialLedger.lastPaymentDate}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: MAINTENANCE REQUESTS & ACTIVE DEFECTS */}
                  {activeTab === "maintenance" && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                          Local Room Structural Defects Log
                        </h3>
                        <span className="text-[11px] font-mono font-bold bg-violet-50 text-violet-700 px-2 py-0.5 rounded">
                          Active Defects: {selectedRoom.maintenanceJobs.length}
                        </span>
                      </div>

                      {selectedRoom.maintenanceJobs.length === 0 ? (
                        <div className="p-8 border border-dashed rounded-xl text-center text-xs text-gray-400 space-y-1">
                          <CheckCircle2
                            size={24}
                            className="mx-auto text-emerald-500"
                          />
                          <p className="font-medium text-gray-700 dark:text-gray-300">
                            No active work orders for this localized unit room
                            space.
                          </p>
                          <p className="text-[11px]">
                            All previous tenant exit repairs or reporting
                            requests stand completed.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2.5">
                          {selectedRoom.maintenanceJobs.map((job) => (
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
                                  Raised Date Threshold:{" "}
                                  <strong>{job.raisedDate}</strong>
                                </p>
                              </div>
                              <div className="sm:text-right shrink-0">
                                <span className="inline-block px-2 py-0.5 text-[11px] font-bold rounded bg-violet-50 text-violet-700">
                                  {job.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 5: STAFF INTERNAL REVIEWS & CHAT LOG */}
                  {activeTab === "chat" && (
                    <div className="space-y-4 flex flex-col h-full justify-between">
                      <div className="space-y-1">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                          Unit Operations Notes & Handover Streams
                        </h3>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          Secure internal communications specific to this unit
                          room asset setup.
                        </p>
                      </div>

                      <div className="border dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-900/20 p-3.5 h-48 overflow-y-auto space-y-3">
                        {selectedRoom.staffChat.map((msg, idx) => (
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
                          placeholder="Type internal operational room alert note..."
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
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* ONBOARD NEW ROOM UNIT MODAL POPUP */}
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
                Onboard New Unit Room
              </h3>

              <form onSubmit={handleCreateRoom} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-gray-500 mb-1">
                      Room Designation Code
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Room 105"
                      value={newRoom.name}
                      onChange={(e) =>
                        setNewRoom({ ...newRoom, name: e.target.value })
                      }
                      className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-1 focus:ring-violet-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-500 mb-1">
                      Floor Level
                    </label>
                    <select
                      value={newRoom.floor}
                      onChange={(e) =>
                        setNewRoom({ ...newRoom, floor: e.target.value })
                      }
                      className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 outline-none"
                    >
                      <option value="Ground Floor">Ground Floor</option>
                      <option value="1st Floor">1st Floor</option>
                      <option value="2nd Floor">2nd Floor</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-gray-500 mb-1">
                    Parent Portfolio Property Association
                  </label>
                  <select
                    value={newRoom.property}
                    onChange={(e) =>
                      setNewRoom({ ...newRoom, property: e.target.value })
                    }
                    className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 outline-none"
                  >
                    <option value="Oakridge House">Oakridge House</option>
                    <option value="Elm Street Court">Elm Street Court</option>
                    <option value="Sovereign Manor">Sovereign Manor</option>
                    <option value="Belgrave Gateway">Belgrave Gateway</option>
                    <option value="Highfield Lodge">Highfield Lodge</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-gray-500 mb-1">
                      Licensed Size (m²)
                    </label>
                    <input
                      type="text"
                      placeholder="12.5"
                      value={newRoom.licensedSizeSqM}
                      onChange={(e) =>
                        setNewRoom({
                          ...newRoom,
                          licensedSizeSqM: e.target.value,
                        })
                      }
                      className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-500 mb-1">
                      Ensuite Facility Built-in
                    </label>
                    <select
                      value={newRoom.hasEnsuite}
                      onChange={(e) =>
                        setNewRoom({ ...newRoom, hasEnsuite: e.target.value })
                      }
                      className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 outline-none"
                    >
                      <option value="true">Yes, Private Ensuite</option>
                      <option value="false">No, Shared Facilities</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-gray-500 mb-1">
                    Assigned Target Monthly Rent Core (£)
                  </label>
                  <input
                    type="number"
                    value={newRoom.monthlyRent}
                    onChange={(e) =>
                      setNewRoom({ ...newRoom, monthlyRent: e.target.value })
                    }
                    className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2.5 rounded-lg transition mt-2"
                >
                  Commit Room to Database Registry
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

export default Rooms;
