import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Banner from "../partials/Banner";
import {
  Building2,
  Search,
  Filter,
  Plus,
  FileText,
  Mail,
  Phone,
  MapPin,
  Send,
  X,
  DollarSign,
  MessageSquare,
} from "lucide-react";

// Curated professional placeholder profiles for company/agent identity visual grids
const IMAGES = {
  corporateLogo:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=150&q=80",
  privateLandlord:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80",
};

// Programmatic Corporate Landlord Dataset Generator (Simulates 100 deep entity profiles)
const generateDetailedLandlords = () => {
  const landlordList = [];
  const companyPrefixes = [
    "Apex",
    "Vanguard",
    "Sovereign",
    "Blueberry",
    "Clarion",
    "Citadel",
    "Meridian",
    "Horizon",
    "Aspect",
    "Beacon",
  ];
  const companySuffixes = [
    "Housing Ltd",
    "Property Holdings",
    "Asset Management",
    "Real Estate Trust",
    "Estates Group",
  ];

  const privateFirstNames = [
    "Arthur",
    "Eleanor",
    "Charles",
    "Victoria",
    "Geoffrey",
    "Beatrice",
    "Raymond",
    "Constance",
  ];
  const privateLastNames = [
    "Pendleton",
    "Harrington",
    "Garrison",
    "Kingsley",
    "Monroe",
    "Chamberlain",
    "Blackwood",
  ];

  const birminghamAreas = [
    "Moseley",
    "Edgbaston",
    "Harborne",
    "Selly Oak",
    "Kings Heath",
    "Digbeth",
    "Sutton Coldfield",
  ];

  for (let i = 1; i <= 100; i++) {
    const isCorporate = i % 3 !== 0;
    let name, contactEmail, contactPhone, image;

    if (isCorporate) {
      const prefix = companyPrefixes[i % companyPrefixes.length];
      const suffix = companySuffixes[i % companySuffixes.length];
      name = `${prefix} ${suffix}`;
      contactEmail = `operations@${prefix.toLowerCase().replace(" ", "")}.test`;
      contactPhone = `0121 ${496 + i} 0192`;
      image = IMAGES.corporateLogo;
    } else {
      const first = privateFirstNames[i % privateFirstNames.length];
      const last = privateLastNames[i % privateLastNames.length];
      name = `${first} ${last}`;
      contactEmail = `${first.toLowerCase()}.${last.toLowerCase()}@bhm-landlords.test`;
      contactPhone = `07700 900 ${100 + i}`;
      image = IMAGES.privateLandlord;
    }

    // Associated building links (simulating a normalized portfolio relationship)
    const linkedProperties = [
      {
        id: `PROP-${100 + i}`,
        name: `${companyPrefixes[i % companyPrefixes.length]} House`,
        area: birminghamAreas[i % birminghamAreas.length],
        address: `${(i % 200) + 1} ${birminghamAreas[(i + 1) % birminghamAreas.length]} Road, Birmingham, B${(i % 90) + 1} 3AB`,
        unitsCount: (i % 4) + 4,
      },
      {
        id: `PROP-${200 + i}`,
        name: `Belgrave Court Segment ${i}`,
        area: birminghamAreas[(i + 1) % birminghamAreas.length],
        address: `${(i % 150) + 50} ${birminghamAreas[i % birminghamAreas.length]} Avenue, Birmingham, B${(i % 80) + 10} 4CD`,
        unitsCount: 5,
      },
    ];

    // Compliance credentials validation mapping
    const complianceDocs = [
      {
        name: "HMO Corporate License Framework",
        reference: `LIC-WM-${7000 + i}`,
        status: i % 15 === 0 ? "Under Review" : "Active / Verified",
        expiry: "2027-04-12",
      },
      {
        name: "Landlord Portal Anti-Money Laundering (AML) Check",
        reference: `AML-${9000 + i}`,
        status: "Approved",
        expiry: "2028-09-20",
      },
    ];

    // Aggregated accounting records
    const financialSummary = {
      totalLeasePayoutMonthly: 2400 + i * 15,
      pendingDisbursements: i % 9 === 0 ? 1200.0 : 0.0,
      paymentTerms: "Net 14 Automated BACS",
      bankReference: `UK-BARC-${8800 + i}`,
    };

    // Payment history (rent payments to landlord + charges)
    const paymentHistory = [];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for (let m = 0; m < 6; m++) {
      const monthIdx = (new Date().getMonth() - m + 12) % 12;
      const year = new Date().getFullYear() - (monthIdx > new Date().getMonth() ? 1 : 0);
      paymentHistory.push({
        id: `PAY-${i}-${m}`,
        date: `${months[monthIdx]} ${year}`,
        description: "Monthly Rent Payment",
        amount: 2400 + i * 15 + Math.round(Math.random() * 200),
        type: "rent",
      });
    }
    // Mock charges
    if (i % 3 === 0) {
      paymentHistory.push({
        id: `CHG-${i}-1`,
        date: "Mar 2026",
        description: "Emergency plumbing repair - boiler replacement",
        amount: 850 + Math.round(Math.random() * 400),
        type: "charge",
      });
    }
    if (i % 5 === 0) {
      paymentHistory.push({
        id: `CHG-${i}-2`,
        date: "Feb 2026",
        description: "Electrical rewire - Room 3 fuse board upgrade",
        amount: 1200 + Math.round(Math.random() * 600),
        type: "charge",
      });
    }
    paymentHistory.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Documents and legals
    const documents = [
      {
        id: `DOC-${i}-1`,
        name: "Tenancy Agreement",
        reference: `TA-${2024 + (i % 2)}-${String(i).padStart(3, "0")}`,
        type: "Contract",
        status: "Signed",
        date: "2024-01-15",
      },
      {
        id: `DOC-${i}-2`,
        name: "Management Agreement",
        reference: `MA-${2024 + (i % 2)}-${String(i).padStart(3, "0")}`,
        type: "Contract",
        status: "Signed",
        date: "2024-01-15",
      },
      {
        id: `DOC-${i}-3`,
        name: "Gas Safety Certificate",
        reference: `GSC-${2025}-${String(i).padStart(4, "0")}`,
        type: "Certificate",
        status: i % 7 === 0 ? "Expired" : "Valid",
        date: i % 7 === 0 ? "2023-11-20" : "2025-11-20",
      },
    ];
    if (i % 4 === 0) {
      documents.push({
        id: `DOC-${i}-4`,
        name: "Deposit Protection Scheme Confirmation",
        reference: `DPS-${2024}-${String(i).padStart(4, "0")}`,
        type: "Legal",
        status: "Active",
        date: "2024-02-01",
      });
    }

    // Open structural issues linked to their lease liabilities
    const landlordDisputes = [];
    if (i % 7 === 0) {
      landlordDisputes.push({
        id: `DISP-${500 + i}`,
        type: "Structural Roof Flashing Repair",
        costLiability: "Landlord Retained Responsibility",
        status: "Awaiting Authorisation Sign-off",
        loggedDate: "2026-06-02",
      });
    }

    // Specific staff logs regarding management account conversations
    const staffChat = [
      {
        sender: "Elena Rostova (Housing Officer)",
        text: `Chased landlord regarding structural repair approval on the roof flashing. They are requesting an alternate quotation match.`,
        timestamp: "2026-06-04 11:15 AM",
      },
      {
        sender: "Sarah Jenkins (Senior Coach)",
        text: `BACS allocation matrix confirmed. June lease terms match internal system figures.`,
        timestamp: "2026-06-08 04:32 PM",
      },
    ];

    landlordList.push({
      id: `LND-${300 + i}`,
      name: name,
      classification: isCorporate ? "Business" : "Person",
      email: contactEmail,
      phone: contactPhone,
      image: image,
      officeAddress: `${i * 12} Corporate Square, Birmingham, B${(i % 15) + 1} 2BB`,
      properties: linkedProperties,
      documents: documents,
      paymentHistory: paymentHistory,
      financialSummary: financialSummary,
      disputes: landlordDisputes,
      staffChat: staffChat,
    });
  }
  return landlordList;
};

const INITIAL_LANDLORDS_DATA = generateDetailedLandlords();

function Landlords() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [landlords, setLandlords] = useState(INITIAL_LANDLORDS_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);

  const [selectedLandlord, setSelectedLandlord] = useState(
    INITIAL_LANDLORDS_DATA[0],
  );
  const [activeTab, setActiveTab] = useState("properties");
  const [chatInput, setChatInput] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const [newLandlord, setNewLandlord] = useState({
    name: "",
    classification: "Business",
    email: "",
    phone: "",
    officeAddress: "",
  });

  // Advanced search/filter operational engine
  const filteredLandlords = landlords.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass =
      classFilter === "All" || l.classification === classFilter;
    return matchesSearch && matchesClass;
  });

  const handleCreateLandlord = (e) => {
    e.preventDefault();
    const createdObject = {
      id: `LND-${Date.now().toString().slice(-3)}`,
      name: newLandlord.name,
      classification: newLandlord.classification,
      email: newLandlord.email,
      phone: newLandlord.phone,
      image:
        newLandlord.classification === "Business"
          ? IMAGES.corporateLogo
          : IMAGES.privateLandlord,
      officeAddress:
        newLandlord.officeAddress || "Noted Corporate Office Hub, Birmingham",
      properties: [],
      documents: [
        {
          name: "Management Agreement",
          reference: "PENDING-REV",
          type: "Contract",
          status: "Pending",
          date: "Just Now",
        },
      ],
      paymentHistory: [],
      financialSummary: {
        totalLeasePayoutMonthly: 0,
        pendingDisbursements: 0.0,
        paymentTerms: "Net 14 Automated BACS",
        bankReference: "UNASSIGNED",
      },
      staffChat: [
        {
          sender: "System Engine",
          text: "Landlord profile created. Awaiting regulatory onboarding license validation checks.",
          timestamp: "Just Now",
        },
      ],
    };

    setLandlords([createdObject, ...landlords]);
    setSelectedLandlord(createdObject);
    setIsModalOpen(false);
    setNewLandlord({
      name: "",
      classification: "Business",
      email: "",
      phone: "",
      officeAddress: "",
    });
  };

  const handlePostChatMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const updatedChat = [
      ...selectedLandlord.staffChat,
      {
        sender: "Current User (Staff Desk)",
        text: chatInput,
        timestamp: "Just Now",
      },
    ];

    const updatedLandlordObj = { ...selectedLandlord, staffChat: updatedChat };
    setSelectedLandlord(updatedLandlordObj);
    setLandlords(
      landlords.map((l) =>
        l.id === selectedLandlord.id ? updatedLandlordObj : l,
      ),
    );
    setChatInput("");
  };

  const tabOptions = [
    { id: "properties", label: "Properties", icon: Building2 },
    { id: "payment", label: "Payment", icon: DollarSign },
    { id: "documents", label: "Documents and Legals", icon: FileText },
    { id: "chat", label: "Chat", icon: MessageSquare },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 dark:bg-gray-900">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Context Header */}
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium inline-flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-xs transition duration-150"
              >
                <Plus size={16} />
                <span>Landlord</span>
              </button>
            </div>

            {/* KPI Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3 sm:p-4 mb-3 sm:mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-3 sm:p-4 shadow-xs">
                <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Providers</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">{filteredLandlords.length}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-3 sm:p-4 shadow-xs">
                <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">Active Contracts</p>
                <p className="text-lg sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{filteredLandlords.filter((l) => l.status === "Active").length}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-3 sm:p-4 shadow-xs">
                <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Properties</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">{filteredLandlords.reduce((s, l) => s + (l.properties?.length || 0), 0)}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-3 sm:p-4 shadow-xs">
                <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">Disputes</p>
                <p className="text-lg sm:text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">{filteredLandlords.filter((l) => l.disputes?.length > 0).length}</p>
              </div>
            </div>

            {/* Workspace Frame Wrapper Layout Splitter */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column Ledger List View */}
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
                          value={classFilter}
                          onChange={(e) => setClassFilter(e.target.value)}
                          className="w-full text-xs border rounded-lg py-1.5 px-2 bg-gray-50 dark:bg-gray-700/40 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 focus:outline-none"
                        >
                          <option value="All">All Types</option>
                          <option value="Business">Business</option>
                          <option value="Person">Person</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-2.5 max-h-[700px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                  {filteredLandlords.map((l) => {
                    const isSelected = selectedLandlord.id === l.id;
                    return (
                      <div
                        key={l.id}
                        onClick={() => {
                          setSelectedLandlord(l);
                          setActiveTab("properties");
                          setMobileDetailOpen(true);
                        }}
                        className={`rounded-xl border cursor-pointer transition p-3 bg-white dark:bg-gray-800 shadow-xs flex gap-3 ${
                          isSelected
                            ? "border-violet-500 ring-2 ring-violet-500/10"
                            : "border-gray-100 dark:border-gray-700 hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={l.image}
                          alt="Landlord Identity Thumbnail Profile Image"
                          className="w-12 h-12 rounded-lg object-cover bg-gray-100 shrink-0 border dark:border-gray-700 shadow-2xs"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex justify-between items-start gap-1">
                            <h3 className="text-xs font-bold text-gray-900 dark:text-white truncate">
                              {l.name}
                            </h3>
                          </div>
                          <p className="text-[11px] text-gray-400 truncate mt-0.5 font-mono">
                            {l.id} • {l.classification}
                          </p>

                          <div className="flex justify-between items-center text-[10px] mt-2 pt-1.5 border-t dark:border-gray-700 text-gray-400">
                            <span className="flex items-center gap-1">
                              <Building2 size={11} /> Portfolio:{" "}
                              <strong>{l.properties.length} Assets</strong>
                            </span>
                            <span className="text-gray-500 dark:text-gray-400 truncate max-w-[130px] font-mono">
                              {l.email}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column Workspace Detail Workspace Frame */}
              {mobileDetailOpen && (
                <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setMobileDetailOpen(false)} />
              )}
              <div className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col ${
                mobileDetailOpen
                  ? 'fixed inset-4 z-50 overflow-y-auto lg:static lg:inset-auto lg:z-auto lg:col-span-8 lg:flex lg:overflow-hidden'
                  : 'hidden lg:col-span-8 lg:flex lg:overflow-hidden'
              }`}>
                {/* Active Focus Header Block */}
                <div className="p-6 bg-gray-50/50 dark:bg-gray-700/20 border-b border-gray-100 dark:border-gray-700 relative">
                  <button
                    onClick={() => setMobileDetailOpen(false)}
                    className="lg:hidden absolute top-3 sm:p-4 right-4 p-1.5 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition text-gray-500 dark:text-gray-300"
                  >
                    <X size={18} />
                  </button>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:p-4">
                    <div className="flex gap-3 sm:p-4 items-center">
                      <img
                        src={selectedLandlord.image}
                        alt="Enlarged Landlord Entity Profile Photo"
                        className="w-14 h-14 rounded-xl object-cover bg-gray-100 border dark:border-gray-600 shadow-sm"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                            {selectedLandlord.name}
                          </h2>
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 font-mono px-2 py-0.5 rounded-sm">
                            {selectedLandlord.id}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {selectedLandlord.classification} • Office Base:{" "}
                          {selectedLandlord.officeAddress}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Operational Detail Tabs Control Bar */}
                  <div className="mt-5 flex gap-3 sm:p-4 overflow-x-auto border-b border-gray-200 dark:border-gray-700 pb-0.5 scrollbar-none">
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

                {/* Tab Content */}
                <div className="p-6 grow overflow-y-auto max-h-[550px]">
                  {/* Properties */}
                  {activeTab === "properties" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:p-4">
                        <div className="p-3.5 border dark:border-gray-700 rounded-xl space-y-2 bg-gray-50/30 dark:bg-gray-800/50 text-xs">
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Contact</h4>
                          <div className="space-y-2 pt-1 text-gray-600 dark:text-gray-300">
                            <div className="flex items-center gap-2 font-mono">
                              <Mail size={13} className="text-gray-400" /> {selectedLandlord.email}
                            </div>
                            <div className="flex items-center gap-2 font-mono">
                              <Phone size={13} className="text-gray-400" /> {selectedLandlord.phone}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin size={13} className="text-gray-400" /> {selectedLandlord.officeAddress}
                            </div>
                          </div>
                        </div>

                        <div className="p-3.5 border dark:border-gray-700 rounded-xl bg-gray-50/30 dark:bg-gray-800/50 text-xs flex items-center justify-between">
                          <div>
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Portfolio</h4>
                            <p className="text-gray-500 mt-1">{selectedLandlord.properties.length} properties linked</p>
                          </div>
                          <Building2 size={28} className="text-violet-400" />
                        </div>
                      </div>

                      <div className="space-y-2.5">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Properties</h4>
                        {selectedLandlord.properties.length === 0 ? (
                          <p className="text-xs text-gray-400 italic py-4 border border-dashed rounded-xl text-center">
                            No properties linked.
                          </p>
                        ) : (
                          <div className="grid grid-cols-1 gap-3 text-xs">
                            {selectedLandlord.properties.map((prop, idx) => (
                              <Link
                                key={idx}
                                to="/properties"
                                className="p-3 border dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 hover:border-gray-300 hover:shadow-sm transition block"
                              >
                                <div className="flex items-start justify-between">
                                  <div className="space-y-1">
                                    <div className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                      {prop.name}
                                      <span className="text-[10px] font-mono text-gray-400 font-normal">{prop.id}</span>
                                    </div>
                                    <div className="text-[11px] text-gray-400 flex items-start gap-1">
                                      <MapPin size={11} className="mt-0.5 shrink-0" /> {prop.address || prop.area}
                                    </div>
                                  </div>
                                  <div className="text-right shrink-0">
                                    <span className="text-[10px] text-gray-400 block uppercase font-mono tracking-wider">Units</span>
                                    <span className="font-mono font-bold text-gray-800 dark:text-gray-200">{prop.unitsCount}</span>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Payment */}
                  {activeTab === "payment" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:p-4">
                        <div className="p-3 sm:p-4 border dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-xs">
                          <span className="text-[11px] text-gray-400 block uppercase font-semibold">Monthly Rent</span>
                          <span className="text-xl font-bold text-gray-900 dark:text-white">
                            £{selectedLandlord.financialSummary.totalLeasePayoutMonthly}
                          </span>
                          <span className="text-[10px] text-gray-400 block mt-1">Total fixed monthly</span>
                        </div>
                        <div className="p-3 sm:p-4 border dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-xs">
                          <span className="text-[11px] text-gray-400 block uppercase font-semibold">Total Charges</span>
                          <span className="text-xl font-bold text-amber-600">
                            £{selectedLandlord.paymentHistory.filter((p) => p.type === "charge").reduce((s, p) => s + p.amount, 0)}
                          </span>
                          <span className="text-[10px] text-gray-400 block mt-1">Repairs on behalf</span>
                        </div>
                        <div className="p-3 sm:p-4 border dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-xs">
                          <span className="text-[11px] text-gray-400 block uppercase font-semibold">Payment Terms</span>
                          <span className="text-xs font-bold text-violet-600 dark:text-violet-400 block mt-1">
                            {selectedLandlord.financialSummary.paymentTerms}
                          </span>
                        </div>
                      </div>

                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Transaction History</h4>
                      <div className="overflow-x-auto border dark:border-gray-700 rounded-xl text-xs">
                        <table className="w-full text-left">
                          <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-400 font-medium">
                            <tr>
                              <th className="p-3">Date</th>
                              <th className="p-3">Description</th>
                              <th className="p-3 text-right">Amount</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-600 dark:text-gray-300">
                            {selectedLandlord.paymentHistory.map((tx) => (
                              <tr key={tx.id} className="hover:bg-gray-50/20">
                                <td className="p-3 font-mono text-[11px] text-gray-400">{tx.date}</td>
                                <td className="p-3">
                                  <span className="font-medium text-gray-900 dark:text-white">{tx.description}</span>
                                  <span className={`ml-2 text-[10px] px-1.5 py-0.2 rounded ${tx.type === "rent" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/10" : "bg-amber-50 text-amber-700 dark:bg-amber-950/10"}`}>
                                    {tx.type === "rent" ? "Rent" : "Charge"}
                                  </span>
                                </td>
                                <td className={`p-3 text-right font-mono font-bold ${tx.type === "charge" ? "text-amber-600" : "text-gray-800 dark:text-gray-200"}`}>
                                  {tx.type === "charge" ? "-" : ""}£{tx.amount.toFixed(2)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Documents and Legals */}
                  {activeTab === "documents" && (
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Documents & Agreements</h3>
                      <div className="overflow-x-auto border dark:border-gray-700 rounded-xl text-xs">
                        <table className="w-full text-left">
                          <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-400 font-medium">
                            <tr>
                              <th className="p-3">Document</th>
                              <th className="p-3">Reference</th>
                              <th className="p-3">Type</th>
                              <th className="p-3">Status</th>
                              <th className="p-3">Date</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-600 dark:text-gray-300">
                            {selectedLandlord.documents.map((doc, index) => (
                              <tr key={index} className="hover:bg-gray-50/20">
                                <td className="p-3 font-medium text-gray-900 dark:text-white">{doc.name}</td>
                                <td className="p-3 font-mono text-[11px] text-gray-400">{doc.reference}</td>
                                <td className="p-3">
                                  <span className={`text-[10px] px-1.5 py-0.2 rounded ${
                                    doc.type === "Contract" ? "bg-violet-50 text-violet-700 dark:bg-violet-950/10" :
                                    doc.type === "Certificate" ? "bg-blue-50 text-blue-700 dark:bg-blue-950/10" :
                                    "bg-gray-50 text-gray-700 dark:bg-gray-950/10"
                                  }`}>{doc.type}</span>
                                </td>
                                <td className="p-3">
                                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                                    doc.status === "Signed" || doc.status === "Valid" || doc.status === "Active"
                                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/10"
                                      : doc.status === "Expired"
                                        ? "bg-rose-50 text-rose-700 dark:bg-rose-950/10"
                                        : "bg-amber-50 text-amber-700 dark:bg-amber-950/10"
                                  }`}>{doc.status}</span>
                                </td>
                                <td className="p-3 font-mono text-gray-400 text-[11px]">{doc.date}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Chat */}
                  {activeTab === "chat" && (
                    <div className="space-y-4 flex flex-col h-full justify-between">
                      <div className="flex-1 overflow-y-auto space-y-3 max-h-[400px] pr-1">
                        {selectedLandlord.staffChat.map((msg, idx) => (
                          <div
                            key={idx}
                            className={`flex ${msg.sender === "Current User (Staff Desk)" ? "justify-end" : "justify-start"}`}
                          >
                            <div className={`max-w-[80%] rounded-xl px-3.5 py-2 text-sm leading-relaxed ${
                              msg.sender === "Current User (Staff Desk)"
                                ? "bg-violet-600 text-white"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                            }`}>
                              <div className="text-[10px] font-semibold mb-0.5 opacity-70">
                                {msg.sender === "Current User (Staff Desk)" ? "You" : msg.sender}
                              </div>
                              <p>{msg.text}</p>
                              <p className="text-[10px] mt-1 opacity-50">{msg.timestamp}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <form onSubmit={handlePostChatMessage} className="flex gap-2 pt-3 border-t dark:border-gray-700">
                        <input
                          type="text"
                          placeholder="Message the landlord..."
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          className="grow border rounded-lg text-xs px-3.5 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-200 dark:border-gray-600 outline-none focus:ring-1 focus:ring-violet-500"
                        />
                        <button
                          type="submit"
                          className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg flex items-center justify-center transition"
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

        {/* ACCOUNT INITIALIZATION ONBOARDING MODAL FRAME */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-gray-900/50 backdrop-blur-xs">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6 border dark:border-gray-700 shadow-2xl relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 sm:p-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
                Register Provider Profile
              </h3>

              <form
                onSubmit={handleCreateLandlord}
                className="space-y-4 text-xs"
              >
                <div>
                  <label className="block font-medium text-gray-500 mb-1">
                    Provider Entity/Corporate Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Apex Property Holdings"
                    value={newLandlord.name}
                    onChange={(e) =>
                      setNewLandlord({ ...newLandlord, name: e.target.value })
                    }
                    className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-1 focus:ring-violet-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-500 mb-1">
                    Type
                  </label>
                  <select
                    value={newLandlord.classification}
                    onChange={(e) =>
                      setNewLandlord({
                        ...newLandlord,
                        classification: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 outline-none"
                  >
                    <option value="Business">Business</option>
                    <option value="Person">Person</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-gray-500 mb-1">
                      Primary Email Gateway
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="operations@provider.test"
                      value={newLandlord.email}
                      onChange={(e) =>
                        setNewLandlord({
                          ...newLandlord,
                          email: e.target.value,
                        })
                      }
                      className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-1 focus:ring-violet-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-500 mb-1">
                      Primary Phone Contact
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="0121 496 0192"
                      value={newLandlord.phone}
                      onChange={(e) =>
                        setNewLandlord({
                          ...newLandlord,
                          phone: e.target.value,
                        })
                      }
                      className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-1 focus:ring-violet-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-gray-500 mb-1">
                    Registered Office Address HQ
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Complete statutory address for notices delivery"
                    value={newLandlord.officeAddress}
                    onChange={(e) =>
                      setNewLandlord({
                        ...newLandlord,
                        officeAddress: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2.5 rounded-lg transition mt-2"
                >
                  Commit Provider to Active Index Registry
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

export default Landlords;
