import React from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Banner from "../partials/Banner";

const sample = [
  { id: "C-1", type: "EICR", property: "Oak Lodge", expiry: "2025-07-01" },
  {
    id: "C-2",
    type: "Gas Safety",
    property: "Maple House",
    expiry: "2024-12-01",
  },
];

function Compliance() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={false} setSidebarOpen={() => {}} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={false} setSidebarOpen={() => {}} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Compliance</h1>
            <div className="bg-white dark:bg-gray-800 shadow-xs rounded-xl p-4">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="py-2">ID</th>
                    <th className="py-2">Type</th>
                    <th className="py-2">Property</th>
                    <th className="py-2">Expiry</th>
                  </tr>
                </thead>
                <tbody>
                  {sample.map((c) => (
                    <tr
                      key={c.id}
                      className="border-t border-gray-100 dark:border-gray-700"
                    >
                      <td className="py-2">{c.id}</td>
                      <td className="py-2">{c.type}</td>
                      <td className="py-2">{c.property}</td>
                      <td className="py-2">{c.expiry}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
        <Banner />
      </div>
    </div>
  );
}

export default Compliance;
