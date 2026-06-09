import React from "react";
import BarChart from "../../charts/BarChart01";

// Import utilities
import { getCssVariable } from "../../utils/Utils";

function DashboardCard04() {
  // 🧠 MOCK: MAINTENANCE WORKLOAD SPLIT
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],

    datasets: [
      // 🟦 Reactive maintenance (breakdowns, urgent repairs)
      {
        label: "Reactive Jobs",
        data: [18, 22, 19, 25, 21, 17],
        backgroundColor: getCssVariable("--color-sky-500"),
        hoverBackgroundColor: getCssVariable("--color-sky-600"),
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },

      // 🟣 Planned maintenance (inspections, scheduled works)
      {
        label: "Planned Jobs",
        data: [32, 30, 35, 28, 40, 38],
        backgroundColor: getCssVariable("--color-violet-500"),
        hoverBackgroundColor: getCssVariable("--color-violet-600"),
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
    ],
  };

  // 🧠 derived insight (mock)
  const reactiveRatio = "38% reactive workload";

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Maintenance Workload Balance
        </h2>

        <div className="text-xs text-gray-500 mt-1">
          Planned vs reactive maintenance activity across properties
        </div>
      </header>

      <div className="px-5 pt-3 text-sm font-medium text-gray-600">
        {reactiveRatio}
      </div>

      <BarChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default DashboardCard04;
