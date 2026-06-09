import React from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Banner from "../partials/Banner";

const sample = [
  {
    id: "I-1",
    name: "Fire Risk Assessment - Maple House",
    date: "2025-03-20",
    status: "Completed",
  },
  { id: "I-2", name: "EICR - Oak Lodge", date: "2025-04-12", status: "Due" },
];

function Inspections() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={false} setSidebarOpen={() => {}} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={false} setSidebarOpen={() => {}} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Inspections</h1>
            <div className="bg-white dark:bg-gray-800 shadow-xs rounded-xl p-4">
              <ul>
                {sample.map((s) => (
                  <li
                    key={s.id}
                    className="py-2 border-t border-gray-100 dark:border-gray-700"
                  >
                    <div className="font-medium">{s.name}</div>
                    <div className="text-sm text-gray-500">
                      {s.date} • {s.status}
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

export default Inspections;
