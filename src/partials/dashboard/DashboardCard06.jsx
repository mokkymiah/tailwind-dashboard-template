import React from "react";
import DoughnutChart from "../../charts/DoughnutChart";

// Import utilities
import { getCssVariable } from "../../utils/Utils";

function DashboardCard06() {
  // 🧠 MOCK: RESIDENT RISK DISTRIBUTION
  const chartData = {
    labels: ["Low Risk", "Medium Risk", "High Risk"],

    datasets: [
      {
        label: "Resident Risk Profile",

        data: [62, 28, 10],

        backgroundColor: [
          getCssVariable("--color-violet-500"), // low risk (stable managed cohort)
          getCssVariable("--color-sky-500"), // medium risk (monitoring)
          getCssVariable("--color-violet-800"), // high risk (escalation)
        ],

        hoverBackgroundColor: [
          getCssVariable("--color-violet-600"),
          getCssVariable("--color-sky-600"),
          getCssVariable("--color-violet-900"),
        ],

        borderWidth: 0,
      },
    ],
  };

  // 🧠 derived insight
  const highRiskPercentage = "10% High Risk Residents";

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Resident Risk Distribution
        </h2>

        <div className="text-xs text-gray-500 mt-1">
          Breakdown of safeguarding risk levels across all residents
        </div>
      </header>

      <div className="px-5 pt-3 text-sm font-medium text-gray-600">
        {highRiskPercentage}
      </div>

      <DoughnutChart data={chartData} width={389} height={260} />
    </div>
  );
}

export default DashboardCard06;
