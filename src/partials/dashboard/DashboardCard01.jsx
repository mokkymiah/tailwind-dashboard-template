import React from "react";
import { Link } from "react-router-dom";
import LineChart from "../../charts/LineChart01";
import { chartAreaGradient } from "../../charts/ChartjsConfig";
import EditMenu from "../../components/DropdownEditMenu";

// Import utilities
import { adjustColorOpacity, getCssVariable } from "../../utils/Utils";

function DashboardCard01() {
  // 🏠 MOCK: PROPERTY OCCUPANCY ACROSS PORTFOLIO
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
      // 🟣 Occupied beds across portfolio
      {
        data: [78, 81, 79, 83, 85, 87, 86, 88, 89, 91, 90, 92],
        fill: true,
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          return chartAreaGradient(ctx, chartArea, [
            {
              stop: 0,
              color: adjustColorOpacity(
                getCssVariable("--color-violet-500"),
                0,
              ),
            },
            {
              stop: 1,
              color: adjustColorOpacity(
                getCssVariable("--color-violet-500"),
                0.25,
              ),
            },
          ]);
        },
        borderColor: getCssVariable("--color-violet-500"),
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.3,
      },

      // ⚪ Maximum capacity baseline
      {
        data: [85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85],
        borderColor: adjustColorOpacity(
          getCssVariable("--color-gray-500"),
          0.35,
        ),
        borderWidth: 2,
        pointRadius: 0,
        borderDash: [4, 4],
        tension: 0,
      },
    ],
  };

  // 🧠 MOCK KPI
  const currentOccupancy = 92;

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Portfolio Occupancy Overview
          </h2>

          <EditMenu align="right" className="relative inline-flex">
            <li>
              <Link
                className="text-sm text-gray-600 hover:text-gray-800 flex py-1 px-3"
                to="#"
              >
                View Properties
              </Link>
            </li>
            <li>
              <Link
                className="text-sm text-gray-600 hover:text-gray-800 flex py-1 px-3"
                to="#"
              >
                Occupancy Report
              </Link>
            </li>
            <li>
              <Link
                className="text-sm text-red-500 hover:text-red-600 flex py-1 px-3"
                to="#"
              >
                Flag Capacity Issue
              </Link>
            </li>
          </EditMenu>
        </header>

        <div className="text-xs font-semibold text-gray-400 uppercase mb-1">
          Total occupied beds across all properties
        </div>

        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">
            {currentOccupancy}%
          </div>

          <div className="text-sm font-medium text-green-700 px-1.5 bg-green-500/20 rounded-full">
            Stable growth
          </div>
        </div>
      </div>

      <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
        <LineChart data={chartData} width={389} height={128} />
      </div>
    </div>
  );
}

export default DashboardCard01;
