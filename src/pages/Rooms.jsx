import React from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Banner from "../partials/Banner";

const sample = [
  { id: "RM-1", name: "Unit A1", property: "Maple House", status: "Occupied" },
  { id: "RM-2", name: "Unit A2", property: "Maple House", status: "Vacant" },
];

function Rooms() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={false} setSidebarOpen={() => {}} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={false} setSidebarOpen={() => {}} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Rooms</h1>
            <div className="bg-white dark:bg-gray-800 shadow-xs rounded-xl p-4">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="py-2">ID</th>
                    <th className="py-2">Name</th>
                    <th className="py-2">Property</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sample.map((r) => (
                    <tr
                      key={r.id}
                      className="border-t border-gray-100 dark:border-gray-700"
                    >
                      <td className="py-2">{r.id}</td>
                      <td className="py-2">{r.name}</td>
                      <td className="py-2">{r.property}</td>
                      <td className="py-2">{r.status}</td>
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

export default Rooms;
