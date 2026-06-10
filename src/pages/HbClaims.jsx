import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Banner from "../partials/Banner";
import {
  Search, Filter, Receipt, X, Eye, Calendar, PoundSterling,
  MapPin, CreditCard, AlertCircle, ChevronLeft, ChevronRight,
  FileText
} from "lucide-react";

const AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a45e?auto=format&fit=crop&w=100&q=80"
];

const PROPERTIES = [
  "Belgrave Court, 12 Bristol Rd, Birmingham B5 7AA",
  "Moseley Haven, 45 Salisbury Rd, Birmingham B13 8AB",
  "Edgbaston Hub, 78 Hagley Rd, Birmingham B15 9PQ",
  "Harborne Suite, 23 Northfield Rd, Birmingham B17 0ST",
  "Maple House, 5 Alcester Rd, Birmingham B13 8AR",
  "Oak Lodge, 90 Pershore Rd, Birmingham B29 7EE"
];

const CLAIM_STATUSES = ["Active", "Cancelled", "Suspended", "Error"];

function generateClaims(count) {
  const firstNames = ["Liam", "Olivia", "Noah", "Emma", "Oliver", "Ava", "Elijah", "Charlotte", "William", "Sophia", "James", "Amelia"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Wilson", "Taylor", "Thomas", "Roberts"];

  return Array.from({ length: count }, (_, i) => {
    const first = firstNames[i % firstNames.length];
    const last = lastNames[i % lastNames.length];
    const status = CLAIM_STATUSES[i % CLAIM_STATUSES.length];
    const weeklyAmount = 150 + (i * 7.5) + Math.round(Math.random() * 50);
    const prop = PROPERTIES[i % PROPERTIES.length];

    const paymentRecords = [
      { period: "Apr 2026 (Weeks 14-17)", amount: weeklyAmount * 4, paidDate: "2026-04-28", method: "BACS Direct", ref: "BACS-APR-26" },
      { period: "May 2026 (Weeks 18-21)", amount: weeklyAmount * 4, paidDate: "2026-05-28", method: "BACS Direct", ref: "BACS-MAY-26" },
    ];

    if (status === "Active") {
      paymentRecords.push(
        { period: "Jun 2026 (Weeks 22-25)", amount: weeklyAmount * 4, paidDate: "2026-06-28", method: "BACS Direct", ref: "BACS-JUN-26" }
      );
    } else if (status === "Cancelled" || status === "Error") {
      paymentRecords.push(
        { period: "Jun 2026 (Weeks 22-25)", amount: 0, paidDate: "—", method: "HALTED", ref: "N/A" }
      );
    } else {
      paymentRecords.push(
        { period: "Jun 2026 (Weeks 22-25)", amount: 0, paidDate: "—", method: "ON HOLD", ref: "N/A" }
      );
    }

    return {
      id: `HB-${String(90000 + i).slice(1)}`,
      tenantName: `${first} ${last}`,
      avatar: AVATARS[i % AVATARS.length],
      dob: new Date(1970 + (i % 25), i % 12, (i % 28) + 1).toLocaleDateString("en-GB"),
      niNumber: `AB ${String(12 + i).padStart(2, "0")} ${String(100 + i).padStart(3, "0")} C`,
      propertyAddress: prop,
      weeklyAmount: weeklyAmount,
      status: status,
      paymentHistory: paymentRecords,
    };
  });
}

const INITIAL_CLAIMS = generateClaims(24);

const statusStyles = {
  Active: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900",
  Cancelled: "bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-900 font-bold",
  Suspended: "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900 font-bold",
  Error: "bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-900 font-bold",
};

const paymentStatusStyles = {
  Paid: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400",
  HALTED: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/20 dark:text-rose-400 font-bold",
  "ON HOLD": "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 font-bold",
    "N/A": "bg-gray-100 text-gray-500 border-gray-200 dark:bg-gray-700 dark:text-gray-400",
};

const ITEMS_PER_PAGE = 10;

function HbClaims() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [claims, setClaims] = useState(INITIAL_CLAIMS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredClaims = claims.filter((c) => {
    const matchesSearch =
      c.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.niNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredClaims.length / ITEMS_PER_PAGE);
  const paginatedClaims = filteredClaims.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const openPaymentsModal = (claim) => {
    setSelectedClaim(claim);
    setIsPaymentModalOpen(true);
  };

  const totalWeekly = filteredClaims.reduce((sum, c) => sum + (c.status === "Active" ? c.weeklyAmount : 0), 0);
  const activeCount = filteredClaims.filter((c) => c.status === "Active").length;
  const issueCount = filteredClaims.filter((c) => c.status === "Cancelled" || c.status === "Error" || c.status === "Suspended").length;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 dark:bg-gray-900">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-3 sm:p-4 shadow-xs">
                <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Claims</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">{filteredClaims.length}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-3 sm:p-4 shadow-xs">
                <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">Active — Weekly Total</p>
                <p className="text-lg sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">£{totalWeekly.toFixed(2)}</p>
                <p className="text-xs text-gray-400 mt-0.5">{activeCount} active claims</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-3 sm:p-4 shadow-xs">
                <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">Requires Attention</p>
                <p className="text-lg sm:text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1">{issueCount}</p>
                <p className="text-xs text-gray-400 mt-0.5">cancelled, suspended, or error</p>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 shadow-xs mb-6 border border-gray-100 dark:border-gray-700 flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, claim ref, NI, or address..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-800 dark:text-gray-200"
                />
              </div>
              <div className="flex items-center gap-1.5 w-full lg:w-auto">
                <Filter className="h-4 w-4 text-gray-400 shrink-0" />
                <select
                  value={statusFilter}
                  onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                  className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg text-xs py-1.5 px-2.5 focus:outline-none text-gray-700 dark:text-gray-200 font-medium w-full lg:w-auto"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Error">Error</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                      <th className="p-3 whitespace-nowrap"><div className="font-semibold text-left">Tenant</div></th>
                      <th className="p-3 whitespace-nowrap"><div className="font-semibold text-left">Date of Birth</div></th>
                      <th className="p-3 whitespace-nowrap"><div className="font-semibold text-left">NI Number</div></th>
                      <th className="p-3 whitespace-nowrap"><div className="font-semibold text-left">Property</div></th>
                      <th className="p-3 whitespace-nowrap"><div className="font-semibold text-right">Weekly Amount</div></th>
                      <th className="p-3 whitespace-nowrap"><div className="font-semibold text-center">Status</div></th>
                      <th className="p-3 whitespace-nowrap"><div className="font-semibold text-center">Payments</div></th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                    {paginatedClaims.map((claim) => (
                      <tr key={claim.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-colors">
                        <td className="p-3 whitespace-nowrap">
                          <div className="flex items-center gap-2.5">
                            <img src={claim.avatar} alt="" className="w-8 h-8 rounded-full object-cover shrink-0" />
                            <div>
                              <div className="font-medium text-gray-800 dark:text-gray-100 text-sm">{claim.tenantName}</div>
                              <div className="text-[10px] text-gray-400 font-mono">{claim.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 whitespace-nowrap text-gray-600 dark:text-gray-400 text-xs font-mono">{claim.dob}</td>
                        <td className="p-3 whitespace-nowrap text-gray-600 dark:text-gray-400 text-xs font-mono">{claim.niNumber}</td>
                        <td className="p-3 whitespace-nowrap text-gray-600 dark:text-gray-400 text-xs max-w-[200px] truncate">{claim.propertyAddress}</td>
                        <td className="p-3 whitespace-nowrap text-right font-mono font-bold text-gray-800 dark:text-gray-100">
                          £{claim.weeklyAmount.toFixed(2)}
                        </td>
                        <td className="p-3 whitespace-nowrap text-center">
                          <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${statusStyles[claim.status] || ""}`}>
                            {claim.status}
                          </span>
                        </td>
                        <td className="p-3 whitespace-nowrap text-center">
                          <button
                            onClick={() => openPaymentsModal(claim)}
                            className="inline-flex items-center gap-1 text-xs font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300 bg-violet-50 dark:bg-violet-950/20 hover:bg-violet-100 dark:hover:bg-violet-950/40 px-2.5 py-1 rounded-lg transition"
                          >
                            <Eye size={14} />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 dark:border-gray-700/60">
                  <p className="text-xs text-gray-400">
                    Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredClaims.length)} of {filteredClaims.length}
                  </p>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:pointer-events-none transition"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => setCurrentPage(p)}
                        className={`w-7 h-7 text-xs font-medium rounded-md transition ${
                          currentPage === p
                            ? "bg-violet-600 text-white"
                            : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:pointer-events-none transition"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </main>

        {/* Payment History Modal */}
        {isPaymentModalOpen && selectedClaim && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full border dark:border-gray-700 shadow-2xl relative overflow-hidden animate-fadeIn">
              {/* Modal Header */}
              <div className="p-5 bg-gray-50 dark:bg-gray-700/40 border-b border-gray-100 dark:border-gray-700 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center shrink-0">
                    <Receipt className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      Payment History
                      <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${statusStyles[selectedClaim.status] || ""}`}>
                        {selectedClaim.status}
                      </span>
                    </h3>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">
                      {selectedClaim.tenantName} — {selectedClaim.id}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Claim Summary */}
              <div className="px-5 py-4 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-gray-400 block font-medium">NI Number</span>
                    <span className="text-gray-800 dark:text-gray-200 font-mono font-bold">{selectedClaim.niNumber}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-medium">Weekly Entitlement</span>
                    <span className="text-gray-800 dark:text-gray-200 font-mono font-bold">£{selectedClaim.weeklyAmount.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-medium">Date of Birth</span>
                    <span className="text-gray-800 dark:text-gray-200 font-mono">{selectedClaim.dob}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-medium">Claim Ref</span>
                    <span className="text-gray-800 dark:text-gray-200 font-mono">{selectedClaim.id}</span>
                  </div>
                </div>
                <div className="mt-3 flex items-start gap-1.5 text-xs text-gray-400">
                  <MapPin size={14} className="shrink-0 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-300">{selectedClaim.propertyAddress}</span>
                </div>
              </div>

              {/* Payment Records */}
              <div className="p-5">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <CreditCard size={14} /> Payment Records
                </h4>
                <div className="space-y-2.5">
                  {selectedClaim.paymentHistory.map((pay, idx) => {
                    const payStatus = pay.amount > 0 ? "Paid" : pay.method === "HALTED" ? "HALTED" : pay.method === "ON HOLD" ? "ON HOLD" : "N/A";
                    return (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/40 text-xs"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                            pay.amount > 0 ? "bg-emerald-100 dark:bg-emerald-900/30" : "bg-rose-100 dark:bg-rose-900/30"
                          }`}>
                            {pay.amount > 0 ? (
                              <PoundSterling size={14} className="text-emerald-600 dark:text-emerald-400" />
                            ) : (
                              <X size={14} className="text-rose-600 dark:text-rose-400" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-800 dark:text-gray-200">{pay.period}</p>
                            <p className="text-[10px] text-gray-400 font-mono flex items-center gap-1">
                              {pay.paidDate !== "—" && <Calendar size={10} />}
                              {pay.paidDate} — {pay.method} — Ref: {pay.ref}
                            </p>
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-3">
                          <p className="font-mono font-bold text-gray-900 dark:text-white">
                            {pay.amount > 0 ? `£${pay.amount.toFixed(2)}` : "—"}
                          </p>
                          <span className={`text-[10px] px-1.5 py-0.25 rounded border font-medium ${paymentStatusStyles[payStatus] || ""}`}>
                            {payStatus}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-gray-50 dark:bg-gray-700/20 border-t border-gray-100 dark:border-gray-700 text-center text-[10px] text-gray-400 flex items-center justify-center gap-1">
                <FileText size={12} />
                Housing benefit payments are processed by the local authority via BACS.
              </div>
            </div>
          </div>
        )}

        <Banner />
      </div>
    </div>
  );
}

export default HbClaims;
