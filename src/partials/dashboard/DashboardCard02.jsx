import React from "react";
import { Link } from "react-router-dom";
import LineChart from "../../charts/LineChart01";
import { chartAreaGradient } from "../../charts/ChartjsConfig";
import EditMenu from "../../components/DropdownEditMenu";

// Import utilities
import { adjustColorOpacity, getCssVariable } from "../../utils/Utils";

function DashboardCard02() {
  // 🧠 MOCK: SAFEGUARDING / RISK ESCALATION TREND
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
      // 🔴 Risk escalation trend (active cases / interventions)
      {
        data: [
          22, 24, 28, 31, 29, 33, 36, 34, 38, 41, 39, 42, 45, 47, 44, 48, 52,
          50, 55, 58, 60, 57, 61, 63, 59, 62,
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

      // ⚪ Baseline: expected stable safeguarding caseload
      {
        data: [
          35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35,
          35, 35, 35, 35, 35, 35, 35, 35, 35,
        ],

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

  // 🧠 derived KPI (mock)
  const currentRiskIndex = 62;
  const trend = "+18% intervention load";

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Safeguarding Risk Trend
          </h2>

          <EditMenu align="right" className="relative inline-flex">
            <li>
              <Link
                className="text-sm text-gray-600 hover:text-gray-800 flex py-1 px-3"
                to="#"
              >
                View Incidents
              </Link>
            </li>
            <li>
              <Link
                className="text-sm text-gray-600 hover:text-gray-800 flex py-1 px-3"
                to="#"
              >
                Case Notes
              </Link>
            </li>
            <li>
              <Link
                className="text-sm text-red-500 hover:text-red-600 flex py-1 px-3"
                to="#"
              >
                Escalate Review
              </Link>
            </li>
          </EditMenu>
        </header>

        <div className="text-xs font-semibold text-gray-400 uppercase mb-1">
          Active safeguarding & support interventions
        </div>

        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">
            {currentRiskIndex}
          </div>

          <div className="text-sm font-medium text-red-700 px-1.5 bg-red-500/20 rounded-full">
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

export default DashboardCard02;
