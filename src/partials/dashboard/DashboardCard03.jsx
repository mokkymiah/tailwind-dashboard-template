import React from "react";
import { Link } from "react-router-dom";
import LineChart from "../../charts/LineChart01";
import { chartAreaGradient } from "../../charts/ChartjsConfig";
import EditMenu from "../../components/DropdownEditMenu";

// Import utilities
import { adjustColorOpacity, getCssVariable } from "../../utils/Utils";

function DashboardCard03() {
  // 🧠 MOCK: INCIDENT + ALERT VOLUME ACROSS PORTFOLIO
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
      // 🔴 Active incident volume (safeguarding + maintenance + compliance alerts)
      {
        data: [
          28, 26, 30, 27, 25, 29, 24, 23, 22, 21, 19, 20, 18, 19, 17, 18, 16,
          15, 14, 13, 15, 14, 13, 12, 11, 12,
        ],

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
        tension: 0.25,
      },

      // ⚪ Expected baseline incident load (normal operational noise)
      {
        data: Array(26).fill(20),

        borderColor: adjustColorOpacity(
          getCssVariable("--color-gray-500"),
          0.25,
        ),
        borderWidth: 2,
        pointRadius: 0,
        borderDash: [4, 4],
        tension: 0,
      },
    ],
  };

  // 🧠 derived KPI (mock system health score)
  const currentLoad = 12;
  const trend = "-38% operational pressure";

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Operational Incident Load
          </h2>

          <EditMenu align="right" className="relative inline-flex">
            <li>
              <Link
                className="text-sm text-gray-600 hover:text-gray-800 flex py-1 px-3"
                to="#"
              >
                View Incident Log
              </Link>
            </li>
            <li>
              <Link
                className="text-sm text-gray-600 hover:text-gray-800 flex py-1 px-3"
                to="#"
              >
                Breakdown Report
              </Link>
            </li>
            <li>
              <Link
                className="text-sm text-red-500 hover:text-red-600 flex py-1 px-3"
                to="#"
              >
                Escalation Review
              </Link>
            </li>
          </EditMenu>
        </header>

        <div className="text-xs font-semibold text-gray-400 uppercase mb-1">
          Combined alerts from safeguarding, compliance & maintenance
        </div>

        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">
            {currentLoad}
          </div>

          <div className="text-sm font-medium text-green-700 px-1.5 bg-green-500/20 rounded-full">
            {trend}
          </div>
        </div>
      </div>

      <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
        <LineChart data={chartData} width={389} height={128} />
      </div>
    </div>
  );
}

export default DashboardCard03;
