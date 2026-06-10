import React, { useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import DashboardCard01 from "../partials/dashboard/DashboardCard01";
import DashboardCard02 from "../partials/dashboard/DashboardCard02";
import DashboardCard03 from "../partials/dashboard/DashboardCard03";
import DashboardCard04 from "../partials/dashboard/DashboardCard04";
import DashboardCard05 from "../partials/dashboard/DashboardCard05";
import DashboardCard06 from "../partials/dashboard/DashboardCard06";
import DashboardCard07 from "../partials/dashboard/DashboardCard07";
import DashboardCard08 from "../partials/dashboard/DashboardCard08";
import DashboardCard09 from "../partials/dashboard/DashboardCard09";
import DashboardCard10 from "../partials/dashboard/DashboardCard10";
import DashboardCard11 from "../partials/dashboard/DashboardCard11";
import DashboardCard12 from "../partials/dashboard/DashboardCard12";
import DashboardCard13 from "../partials/dashboard/DashboardCard13";
import Banner from "../partials/Banner";
import {
  Building2,
  Users,
  Bell,
  ShieldCheck,
  Wrench,
  FileText,
  MessageSquare,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const kpiCards = [
    {
      label: "Total Properties",
      value: "12",
      change: "+1 this month",
      trend: "up",
      icon: Building2,
      color: "text-violet-600",
      bg: "bg-violet-50 dark:bg-violet-950/20",
      link: "/properties",
    },
    {
      label: "Active Residents",
      value: "92",
      change: "88% occupancy",
      trend: "up",
      icon: Users,
      color: "text-cyan-600",
      bg: "bg-cyan-50 dark:bg-cyan-950/20",
      link: "/residents",
    },
    {
      label: "Compliance Rate",
      value: "94%",
      change: "2 certs expiring",
      trend: "down",
      icon: ShieldCheck,
      color: "text-emerald-600",
      bg: "bg-emerald-50 dark:bg-emerald-950/20",
      link: "/compliance",
    },
    {
      label: "Open Jobs",
      value: "16",
      change: "3 critical",
      trend: "up",
      icon: Wrench,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-950/20",
      link: "/maintenance",
    },
    {
      label: "Active Alerts",
      value: "8",
      change: "2 unread",
      trend: "down",
      icon: Bell,
      color: "text-amber-600",
      bg: "bg-amber-50 dark:bg-amber-950/20",
      link: "/alerts",
    },
    {
      label: "Missing Support Files",
      value: "5",
      change: "Need review",
      trend: "down",
      icon: FileText,
      color: "text-rose-600",
      bg: "bg-rose-50 dark:bg-rose-950/20",
      link: "/support-sessions",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* KPI Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
              {kpiCards.map((kpi, idx) => {
                const Icon = kpi.icon;
                return (
                  <Link
                    key={idx}
                    to={kpi.link}
                    className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-xs hover:shadow-sm transition hover:border-gray-200 dark:hover:border-gray-600 group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-2 rounded-lg ${kpi.bg}`}>
                        <Icon size={18} className={kpi.color} />
                      </div>
                      <ArrowUpRight
                        size={14}
                        className="text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition"
                      />
                    </div>
                    <div className="text-2xl font-black font-mono text-gray-900 dark:text-white">
                      {kpi.value}
                    </div>
                    <div className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wider font-medium">
                      {kpi.label}
                    </div>
                    <div
                      className={`text-[10px] mt-1 font-medium ${
                        kpi.trend === "up"
                          ? "text-emerald-600"
                          : "text-amber-600"
                      }`}
                    >
                      {kpi.change}
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Summary Alert Bar */}
            <div className="bg-amber-50 dark:bg-amber-950/10 border border-amber-200 dark:border-amber-900/30 rounded-xl p-3 mb-6 flex items-center gap-3 text-xs text-amber-800 dark:text-amber-300">
              <AlertTriangle size={16} className="shrink-0" />
              <span>
                <strong>Action required:</strong> 2 compliance certificates
                expiring within 30 days · 5 residents with overdue support
                sessions · 3 unread alert acknowledgements
              </span>
            </div>

            <div className="grid grid-cols-12 gap-6">
              <DashboardCard01 />
              <DashboardCard02 />
              <DashboardCard03 />
              <DashboardCard04 />
              <DashboardCard05 />
              <DashboardCard06 />
              <DashboardCard07 />
              <DashboardCard08 />
              <DashboardCard09 />
              <DashboardCard10 />
              <DashboardCard11 />
              <DashboardCard12 />
              <DashboardCard13 />
            </div>
          </div>
        </main>

        <Banner />
      </div>
    </div>
  );
}

export default Dashboard;
