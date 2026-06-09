import React from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Banner from "../partials/Banner";

const sample = [
  {
    id: "INC-1",
    severity: "High",
    text: "Assault reported",
    status: "Open",
    date: "2025-05-10",
  },
  {
    id: "INC-2",
    severity: "Low",
    text: "Noise complaint",
    status: "Closed",
    date: "2025-04-28",
  },
];

function Safeguarding() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={false} setSidebarOpen={() => {}} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={false} setSidebarOpen={() => {}} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">
              Safeguarding / Incidents
            </h1>
            <div className="bg-white dark:bg-gray-800 shadow-xs rounded-xl p-4">
              <ul>
                {sample.map((s) => (
                  <li
                    key={s.id}
                    className="py-2 border-t border-gray-100 dark:border-gray-700"
                  >
                    <div className="font-medium">
                      {s.text}{" "}
                      <span className="text-sm text-gray-400">
                        ({s.severity})
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {s.status} • {s.date}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
        <Banner />
      </div>
    </div>
  );
}

export default Safeguarding;
