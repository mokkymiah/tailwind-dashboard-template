import React from "react";
import LineChart from "../../charts/LineChart02";
import { getCssVariable } from "../../utils/Utils";

function DashboardCard08() {
  // 🧠 MOCK: SUPPORT WORKLOAD DATA
  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],

    datasets: [
      // 🔵 Current workload (this year)
      {
        label: "Current Period (2026)",
        data: [120, 132, 140, 128, 155, 170, 182, 175, 160, 172, 185, 190],
        borderColor: getCssVariable("--color-violet-500"),
        fill: false,
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.3,
      },

      // 🔷 Previous year
      {
        label: "Previous Period (2025)",
        data: [110, 118, 125, 120, 135, 140, 150, 148, 142, 150, 158, 162],
        borderColor: getCssVariable("--color-sky-500"),
        fill: false,
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.3,
      },

      // 🟢 Operational baseline (expected capacity)
      {
        label: "Capacity Baseline",
        data: [130, 130, 135, 135, 140, 145, 150, 150, 150, 155, 155, 160],
        borderColor: getCssVariable("--color-green-500"),
        fill: false,
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Support Workload Trends
        </h2>

        <span className="ml-2 text-xs text-gray-500">
          Cases & support sessions over time
        </span>
      </header>

      <LineChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default DashboardCard08;
