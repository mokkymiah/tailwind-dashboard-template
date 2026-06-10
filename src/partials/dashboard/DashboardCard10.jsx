import React from "react";

import Image01 from "../../images/user-36-05.jpg";
import Image02 from "../../images/user-36-06.jpg";
import Image03 from "../../images/user-36-07.jpg";
import Image04 from "../../images/user-36-08.jpg";
import Image05 from "../../images/user-36-09.jpg";

function DashboardCard10() {
  const residents = [
    {
      id: "0",
      image: Image01,
      name: "John Gallagher",
      email: "john.gallagher@email.com",
      property: "Maple House",
      room: "Room 102",
      status: "Active",
      rent: "£650/mo",
    },
    {
      id: "1",
      image: Image02,
      name: "Charlotte Miller",
      email: "charlotte.m@email.com",
      property: "Oak Lodge",
      room: "Room 205",
      status: "Active",
      rent: "£595/mo",
    },
    {
      id: "2",
      image: Image03,
      name: "Robert Davies",
      email: "robert.davies@email.com",
      property: "Cedar Court",
      room: "Room 104",
      status: "Overdue",
      rent: "£620/mo",
    },
    {
      id: "3",
      image: Image04,
      name: "Rachel Evans",
      email: "rachel.evans@email.com",
      property: "Willow Pavilion",
      room: "Room 301",
      status: "Active",
      rent: "£580/mo",
    },
    {
      id: "4",
      image: Image05,
      name: "Thomas Brown",
      email: "thomas.brown@email.com",
      property: "Belgrave Court",
      room: "Room 108",
      status: "Onboarding",
      rent: "£640/mo",
    },
  ];

  const statusStyles = {
    Active: "text-green-600 bg-green-100 dark:bg-green-950/20 dark:text-green-400",
    Overdue: "text-rose-600 bg-rose-100 dark:bg-rose-950/20 dark:text-rose-400",
    Onboarding: "text-amber-600 bg-amber-100 dark:bg-amber-950/20 dark:text-amber-400",
  };

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Current Residents
        </h2>
      </header>
      <div className="p-3">
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Property</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Room</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Status</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-right">Rent</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
              {residents.map((r) => (
                <tr key={r.id}>
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                        <img
                          className="rounded-full"
                          src={r.image}
                          width="40"
                          height="40"
                          alt={r.name}
                        />
                      </div>
                      <div className="font-medium text-gray-800 dark:text-gray-100">
                        {r.name}
                      </div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left text-gray-600 dark:text-gray-400 text-xs">
                      {r.property}
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left font-mono text-xs text-gray-500">
                      {r.room}
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap text-center">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${statusStyles[r.status] || ""}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-right font-medium text-gray-800 dark:text-gray-100 font-mono">
                      {r.rent}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard10;
