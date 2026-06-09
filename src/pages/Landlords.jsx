import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Banner from "../partials/Banner";
import {
  Building2,
  Users,
  Wrench,
  MessageSquare,
  DollarSign,
  Search,
  Filter,
  Plus,
  FileText,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Send,
  X,
  ClipboardList,
  AlertCircle,
  Briefcase,
  ChevronRight,
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
        unitsCount: (i % 4) + 4,
      },
      {
        id: `PROP-${200 + i}`,
        name: `Belgrave Court Segment ${i}`,
        area: birminghamAreas[(i + 1) % birminghamAreas.length],
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
      classification: isCorporate ? "Corporate Provider" : "Private Freeholder",
      email: contactEmail,
      phone: contactPhone,
      image: image,
      officeAddress: `${i * 12} Corporate Square, Birmingham, B${(i % 15) + 1} 2BB`,
      properties: linkedProperties,
      complianceDocs: complianceDocs,
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
  const [selectedLandlord, setSelectedLandlord] = useState(
    INITIAL_LANDLORDS_DATA[0],
  );
  const [activeTab, setActiveTab] = useState("properties");
  const [chatInput, setChatInput] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLandlord, setNewLandlord] = useState({
    name: "",
    classification: "Corporate Provider",
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
        newLandlord.classification === "Corporate Provider"
          ? IMAGES.corporateLogo
          : IMAGES.privateLandlord,
      officeAddress:
        newLandlord.officeAddress || "Noted Corporate Office Hub, Birmingham",
      properties: [],
      complianceDocs: [
        {
          name: "Initial Account Review Audit",
          reference: "PENDING-REV",
          status: "Under Review",
          expiry: "2027-01-01",
        },
      ],
      financialSummary: {
        totalLeasePayoutMonthly: 0,
        pendingDisbursements: 0.0,
        paymentTerms: "Net 14 Automated BACS",
        bankReference: "UNASSIGNED",
      },
      disputes: [],
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
      classification: "Corporate Provider",
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
    { id: "properties", label: "Linked Portfolio", icon: Building2 },
    { id: "finance", label: "Financial Accounts", icon: DollarSign },
    { id: "compliance", label: "Onboarding & Compliance", icon: ShieldCheck },
    { id: "disputes", label: "Open Structural Claims", icon: Wrench },
    { id: "chat", label: "Account Management Notes", icon: MessageSquare },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 dark:bg-gray-900">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Context Header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                  Landlords & Providers
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Manage lease compliance trackers, monthly capital
                  disbursements, commercial portfolios, and structural dispute
                  claims.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn bg-violet-600 hover:bg-violet-700 text-white flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition shadow-xs"
              >
                <Plus size={16} />
                <span>Register Provider</span>
              </button>
            </div>

            {/* Filter and Search Infrastructure */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-xs mb-6 border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by Provider ID, Corporation title, Contact..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-800 dark:text-gray-200"
                />
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg text-sm py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-700 dark:text-gray-200"
                >
                  <option value="All">All Provider Models</option>
                  <option value="Corporate Provider">Corporate Provider</option>
                  <option value="Private Freeholder">Private Freeholder</option>
                </select>
              </div>
            </div>

            {/* Workspace Frame Wrapper Layout Splitter */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column Ledger List View */}
              <div className="lg:col-span-4 space-y-3">
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1">
                  Registered Providers ({filteredLandlords.length})
                </h2>
                <div className="space-y-2.5 max-h-[700px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                  {filteredLandlords.map((l) => {
                    const isSelected = selectedLandlord.id === l.id;
                    return (
                      <div
                        key={l.id}
                        onClick={() => {
                          setSelectedLandlord(l);
                          setActiveTab("properties");
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
              <div className="lg:col-span-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col">
                {/* Active Focus Header Block */}
                <div className="p-6 bg-gray-50/50 dark:bg-gray-700/20 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div className="flex gap-4 items-center">
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

                {/* Sub-Panel Output Main Frame Variable Router Area */}
                <div className="p-6 grow overflow-y-auto max-h-[550px]">
                  {/* TAB 1: PROPERTIES MANAGED REGISTRY */}
                  {activeTab === "properties" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3.5 border dark:border-gray-700 rounded-xl space-y-2 bg-gray-50/30 dark:bg-gray-800/50 text-xs">
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                            Contact Gateway Profile
                          </h4>
                          <div className="space-y-2 pt-1 text-gray-600 dark:text-gray-300">
                            <div className="flex items-center gap-2 font-mono">
                              <Mail size={13} className="text-gray-400" />{" "}
                              {selectedLandlord.email}
                            </div>
                            <div className="flex items-center gap-2 font-mono">
                              <Phone size={13} className="text-gray-400" />{" "}
                              {selectedLandlord.phone}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin size={13} className="text-gray-400" />{" "}
                              {selectedLandlord.officeAddress}
                            </div>
                          </div>
                        </div>

                        <div className="p-3.5 border dark:border-gray-700 rounded-xl flex items-center justify-between bg-gray-50/30 dark:bg-gray-800/50">
                          <div className="space-y-1 text-xs">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                              Core Operations Summary
                            </h4>
                            <p className="text-gray-500">
                              Active real estate holdings under contract
                              assignment parameters:
                            </p>
                            <span className="inline-flex items-center gap-1.5 font-bold text-violet-600 pt-1 dark:text-violet-400">
                              <Building2 size={14} /> Total Portfolio Assets
                              Blocked: {selectedLandlord.properties.length}{" "}
                              Properties
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2.5">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                          Lease Registered Asset Nodes
                        </h4>
                        {selectedLandlord.properties.length === 0 ? (
                          <p className="text-xs text-gray-400 italic py-4 border border-dashed rounded-xl text-center">
                            No portfolio structure entities paired with this
                            manager registry entry.
                          </p>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            {selectedLandlord.properties.map((prop, idx) => (
                              <div
                                key={idx}
                                className="p-3 border dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-between hover:border-gray-300 transition"
                              >
                                <div className="space-y-0.5">
                                  <div className="font-bold text-gray-900 dark:text-white">
                                    {prop.name}
                                  </div>
                                  <div className="text-[11px] text-gray-400 flex items-center gap-1">
                                    <MapPin size={11} /> Location: {prop.area}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <span className="text-[10px] text-gray-400 block uppercase font-mono tracking-wider">
                                    Units
                                  </span>
                                  <span className="font-mono font-bold text-gray-800 dark:text-gray-200">
                                    {prop.unitsCount} Rooms
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* TAB 2: FINANCIAL PAYMENTS STATEMENTS BALANCE */}
                  {activeTab === "finance" && (
                    <div className="space-y-5">
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Commercial Accounts Ledger Profile
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-4 border dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-xs">
                          <span className="text-[11px] text-gray-400 block uppercase font-semibold">
                            Contracted Lease Payout
                          </span>
                          <span className="text-xl font-bold text-gray-900 dark:text-white">
                            £
                            {
                              selectedLandlord.financialSummary
                                .totalLeasePayoutMonthly
                            }
                          </span>
                          <span className="text-[10px] text-gray-400 block mt-1">
                            Total Fixed Monthly Liability
                          </span>
                        </div>
                        <div className="p-4 border dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-xs">
                          <span className="text-[11px] text-gray-400 block uppercase font-semibold">
                            Held Escrow Maintenance
                          </span>
                          <span
                            className={`text-xl font-bold block ${selectedLandlord.financialSummary.pendingDisbursements > 0 ? "text-amber-600" : "text-gray-500"}`}
                          >
                            £
                            {selectedLandlord.financialSummary.pendingDisbursements.toFixed(
                              2,
                            )}
                          </span>
                          <span className="text-[10px] text-gray-400 block mt-1">
                            Pending Retained Allocation
                          </span>
                        </div>
                        <div className="p-4 border dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-xs">
                          <span className="text-[11px] text-gray-400 block uppercase font-semibold">
                            Disbursement Mandate
                          </span>
                          <span className="text-xs font-bold text-gray-800 dark:text-gray-200 block mt-1 text-violet-600 dark:text-violet-400">
                            {selectedLandlord.financialSummary.paymentTerms}
                          </span>
                          <span className="text-[10px] text-gray-400 block mt-1">
                            Corporate Protocol Frame
                          </span>
                        </div>
                      </div>

                      <div className="p-3 border dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-900/20 text-xs flex justify-between items-center font-mono">
                        <span className="text-gray-400">
                          Internal Clearing Bank Reference Token:
                        </span>
                        <span className="text-gray-800 dark:text-gray-200 font-bold">
                          {selectedLandlord.financialSummary.bankReference}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: REGULATORY COMPLIANCE AUDITS */}
                  {activeTab === "compliance" && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                          Provider Licensing Credentials
                        </h3>
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
                          <ShieldCheck size={14} /> Framework Cleared
                        </span>
                      </div>

                      <div className="overflow-hidden border dark:border-gray-700 rounded-xl text-xs">
                        <table className="w-full text-left">
                          <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-400 font-medium">
                            <tr>
                              <th className="p-3">
                                Compliance File Credential
                              </th>
                              <th className="p-3">Reference Index</th>
                              <th className="p-3">Verification Track</th>
                              <th className="p-3">Renewal Date</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-600 dark:text-gray-300">
                            {selectedLandlord.complianceDocs.map(
                              (doc, index) => (
                                <tr key={index} className="hover:bg-gray-50/20">
                                  <td className="p-3 font-medium text-gray-900 dark:text-white">
                                    {doc.name}
                                  </td>
                                  <td className="p-3 font-mono text-[11px] text-gray-400">
                                    {doc.reference}
                                  </td>
                                  <td className="p-3">
                                    <span
                                      className={`px-2 py-0.2 rounded font-medium text-[11px] ${
                                        doc.status === "Approved" ||
                                        doc.status === "Active / Verified"
                                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/10"
                                          : "bg-amber-50 text-amber-700 dark:bg-amber-950/10"
                                      }`}
                                    >
                                      {doc.status}
                                    </span>
                                  </td>
                                  <td className="p-3 font-mono text-gray-400 text-[11px]">
                                    {doc.expiry}
                                  </td>
                                </tr>
                              ),
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: DISPUTES & CAPITAL LIABILITIES */}
                  {activeTab === "disputes" && (
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Lease Retained Liability & Structural Dispute Track
                      </h3>

                      {selectedLandlord.disputes.length === 0 ? (
                        <div className="p-8 border border-dashed rounded-xl text-center text-xs text-gray-400 space-y-1">
                          <ShieldCheck
                            size={24}
                            className="mx-auto text-emerald-500"
                          />
                          <p className="font-medium text-gray-700 dark:text-gray-300">
                            No active structural dispute files logged.
                          </p>
                          <p className="text-[11px]">
                            Provider account matches all current internal work
                            order definitions.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2.5">
                          {selectedLandlord.disputes.map((disp) => (
                            <div
                              key={disp.id}
                              className="p-3.5 border dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800/60 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="px-1.5 py-0.2 text-[10px] uppercase font-bold rounded bg-amber-50 text-amber-700">
                                    Liability Dispute
                                  </span>
                                  <span className="text-gray-400 font-mono text-[11px]">
                                    {disp.id}
                                  </span>
                                </div>
                                <h4 className="font-bold text-gray-800 dark:text-gray-200">
                                  {disp.type}
                                </h4>
                                <p className="text-gray-400 text-[11px]">
                                  {disp.costLiability} | Logged:{" "}
                                  {disp.loggedDate}
                                </p>
                              </div>
                              <div className="sm:text-right shrink-0">
                                <span className="inline-block px-2 py-0.5 text-[11px] font-bold rounded bg-violet-50 text-violet-700 dark:bg-violet-950/20">
                                  {disp.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 5: STAFF INTERNAL ACCOUNT CORRESPONDENCE CHAT */}
                  {activeTab === "chat" && (
                    <div className="space-y-4 flex flex-col h-full justify-between">
                      <div className="space-y-1">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                          Account Handover Matrix & Notes
                        </h3>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          Secure operations tracking log for landlord engagement
                          and commercial adjustments.
                        </p>
                      </div>

                      <div className="border dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-900/20 p-3.5 h-48 overflow-y-auto space-y-3">
                        {selectedLandlord.staffChat.map((msg, idx) => (
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
                          placeholder="Type an internal provider account update alert..."
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

        {/* ACCOUNT INITIALIZATION ONBOARDING MODAL FRAME */}
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
                    Registration Framework Model
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
                    <option value="Corporate Provider">
                      Corporate Provider (Ltd/PLC/Trust)
                    </option>
                    <option value="Private Freeholder">
                      Private Freeholder (Individual)
                    </option>
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
