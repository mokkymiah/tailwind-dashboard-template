import React, { useState, useEffect } from "react";
import Tooltip from "../../components/Tooltip";
import { chartAreaGradient } from "../../charts/ChartjsConfig";
import RealtimeChart from "../../charts/RealtimeChart";

// Import utilities
import { adjustColorOpacity, getCssVariable } from "../../utils/Utils";

function DashboardCard05() {
  // 🧠 MOCK: REAL-TIME ALERT STREAM (SYSTEM ACTIVITY)
  const [counter, setCounter] = useState(0);
  const [increment, setIncrement] = useState(0);
  const [range, setRange] = useState(35);

  // ⚠️ Simulated incoming system load (alerts per interval)
  const data = [
    2, 3, 2, 4, 3, 5, 6, 4, 3, 5, 6, 7, 5, 6, 8, 7, 6, 9, 8, 7, 10, 9, 8, 7, 6,
    5, 6, 7, 8, 9, 7, 6, 5, 4, 5, 6, 7, 8, 6, 5, 4, 3, 5, 6, 7, 8, 6, 5, 4, 3,
    2, 4, 5, 6, 7, 5, 4, 3, 2, 3,
  ];

  const [slicedData, setSlicedData] = useState(data.slice(0, range));

  // 🕒 generate timestamps (mock event stream)
  const generateDates = () => {
    const now = new Date();
    const dates = [];
    data.forEach((_, i) => {
      dates.push(new Date(now - i * 60000)); // every minute
    });
    return dates;
  };

  const [slicedLabels, setSlicedLabels] = useState(
    generateDates().slice(0, range).reverse(),
  );

  // 🔄 fake live update
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(counter + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [counter]);

  // 📡 streaming simulation
  useEffect(() => {
    setIncrement(increment + 1);

    if (increment + range < data.length) {
      setSlicedData(([...arr]) => [...arr.slice(1), data[increment + range]]);
    } else {
      setIncrement(0);
      setRange(0);
    }

    setSlicedLabels(([...arr]) => [...arr.slice(1), new Date()]);

    return () => setIncrement(0);
  }, [counter]);

  const chartData = {
    labels: slicedLabels,
    datasets: [
      // ⚡ Live system alert load
      {
        data: slicedData,
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
    ],
  };

  // 🧠 derived system state
  const currentLoad = slicedData[slicedData.length - 1] || 0;
  const status =
    currentLoad > 8
      ? "High Alert Activity"
      : currentLoad > 5
        ? "Moderate Activity"
        : "Stable System Load";

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Live Operational Alert Feed
        </h2>

        <Tooltip className="ml-2">
          <div className="text-xs text-center whitespace-nowrap">
            Real-time system activity across safeguarding, maintenance &
            compliance
          </div>
        </Tooltip>
      </header>

      <div className="px-5 pt-3">
        <div className="text-xs text-gray-500 uppercase mb-1">
          Incoming system alerts per minute
        </div>

        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">
            {currentLoad}
          </div>

          <div className="text-sm font-medium text-green-700 px-1.5 bg-green-500/20 rounded-full">
            {status}
          </div>
        </div>
      </div>

      <RealtimeChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default DashboardCard05;
