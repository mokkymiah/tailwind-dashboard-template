import React from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Banner from "../partials/Banner";
import { jobs } from "../lib/mockData";

function Maintenance() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={false} setSidebarOpen={() => {}} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={false} setSidebarOpen={() => {}} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Jobs & Maintenance</h1>
            <div className="bg-white dark:bg-gray-800 shadow-xs rounded-xl p-4">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="py-2">ID</th>
                    <th className="py-2">Title</th>
                    <th className="py-2">Priority</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Due</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((j) => (
                    <tr
                      key={j.id}
                      className="border-t border-gray-100 dark:border-gray-700"
                    >
                      <td className="py-2">{j.id}</td>
                      <td className="py-2">{j.title}</td>
                      <td className="py-2">{j.priority}</td>
                      <td className="py-2">{j.status}</td>
                      <td className="py-2">{j.due}</td>
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

export default Maintenance;
