import React from "react";

function DashboardCard07() {
  // 🧠 MOCK: PROPERTY OPERATIONAL PERFORMANCE TABLE
  const rows = [
    {
      property: "Maple House",
      residents: 10,
      incidents: 6,
      compliance: "At Risk",
      score: 62,
    },
    {
      property: "Oak Villa",
      residents: 8,
      incidents: 2,
      compliance: "Compliant",
      score: 88,
    },
    {
      property: "Cedar Lodge",
      residents: 12,
      incidents: 4,
      compliance: "Warning",
      score: 74,
    },
    {
      property: "Birch House",
      residents: 9,
      incidents: 1,
      compliance: "Compliant",
      score: 91,
    },
  ];

  const getComplianceColor = (status) => {
    if (status === "At Risk") return "text-red-500";
    if (status === "Warning") return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Property Operational Performance
        </h2>

        <div className="text-xs text-gray-500 mt-1">
          Risk, compliance and incident overview across managed properties
        </div>
      </header>

      <div className="p-3">
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-gray-300">
            {/* HEADER */}
            <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="p-2 text-left">Property</th>
                <th className="p-2 text-center">Residents</th>
                <th className="p-2 text-center">Incidents</th>
                <th className="p-2 text-center">Compliance</th>
                <th className="p-2 text-center">Risk Score</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
              {rows.map((row, i) => (
                <tr key={i}>
                  <td className="p-2 text-gray-800 dark:text-gray-100">
                    {row.property}
                  </td>

                  <td className="p-2 text-center">{row.residents}</td>

                  <td className="p-2 text-center">{row.incidents}</td>

                  <td
                    className={`p-2 text-center font-medium ${getComplianceColor(row.compliance)}`}
                  >
                    {row.compliance}
                  </td>

                  <td className="p-2 text-center">{row.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard07;
