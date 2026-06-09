import React from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Banner from "../partials/Banner";

function AiAssistant() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={false} setSidebarOpen={() => {}} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={false} setSidebarOpen={() => {}} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">AI Assistant (mock)</h1>
            <div className="bg-white dark:bg-gray-800 shadow-xs rounded-xl p-4">
              <div className="text-sm text-gray-500">
                Mock chat assistant for summaries and note cleanup.
              </div>
            </div>
          </div>
        </main>
        <Banner />
      </div>
    </div>
  );
}

export default AiAssistant;
