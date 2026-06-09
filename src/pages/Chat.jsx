import React from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Banner from "../partials/Banner";

function Chat() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={false} setSidebarOpen={() => {}} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={false} setSidebarOpen={() => {}} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Internal Chat (mock)</h1>
            <div className="bg-white dark:bg-gray-800 shadow-xs rounded-xl p-4">
              <div className="text-sm text-gray-500">
                Simple mock chat placeholder — no backend.
              </div>
            </div>
          </div>
        </main>
        <Banner />
      </div>
    </div>
  );
}

export default Chat;
