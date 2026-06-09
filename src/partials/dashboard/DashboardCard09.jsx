import React from "react";
import Tooltip from "../../components/Tooltip";
import BarChart from "../../charts/BarChart02";
import { getCssVariable } from "../../utils/Utils";

function DashboardCard09() {
  // 🧠 MOCK: FINANCIAL PRESSURE MODEL
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],

    datasets: [
      // 🟣 Income (rent / housing benefit)
      {
        label: "Income (Rent + HB)",
        data: [12000, 13500, 12800, 14000, 15000, 14500],
        backgroundColor: getCssVariable("--color-violet-500"),
        hoverBackgroundColor: getCssVariable("--color-violet-600"),
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },

      // 🔵 Operational costs (maintenance, staffing, voids)
      {
        label: "Operational Costs",
        data: [-8000, -9200, -7600, -8800, -9100, -8700],
        backgroundColor: getCssVariable("--color-violet-200"),
        hoverBackgroundColor: getCssVariable("--color-violet-300"),
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
    ],
  };

  const netPosition = "+£5,800";

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Financial Position Overview
        </h2>

        <Tooltip className="ml-2" size="lg">
          <div className="text-sm">
            Income vs operational cost pressure across portfolio
          </div>
        </Tooltip>
      </header>

      <div className="px-5 py-3">
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">
            {netPosition}
          </div>

          <div className="text-sm font-medium text-green-700 px-1.5 bg-green-500/20 rounded-full">
            Stable
          </div>
        </div>
      </div>

      <div className="grow">
        <BarChart data={chartData} width={595} height={248} />
      </div>
    </div>
  );
}

export default DashboardCard09;
