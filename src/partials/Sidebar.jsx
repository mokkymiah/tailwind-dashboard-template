import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  UserCheck,
  BedDouble,
  Users,
  Receipt,
  Handshake,
  ShieldAlert,
  FileCheck,
  ClipboardCheck,
  Wrench,
  UserSquare2,
  MessageSquare,
  Bell,
  Bot,
  Bird,
  ChevronDown,
} from "lucide-react";

// 1. Navigation Schema Configuration
const navigationConfig = [
  {
    group: "Overview",
    items: [{ to: "/", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    group: "Properties",
    items: [
      {
        label: "Properties",
        icon: Building2,
        children: [
          { to: "/properties", label: "Overview" },
          { to: "/rooms", label: "Rooms", icon: BedDouble },
          { to: "/maintenance", label: "Jobs & Maintenance", icon: Wrench },
        ],
      },
      { to: "/landlords", label: "Landlords", icon: UserCheck },
    ],
  },
  {
    group: "People",
    items: [
      { to: "/residents", label: "Residents", icon: Users },
      { to: "/staff", label: "Staff", icon: UserSquare2 },
      { to: "/support-sessions", label: "Support Sessions", icon: Handshake },
    ],
  },
  {
    group: "Finance",
    items: [
      { to: "/hb-claims", label: "HB Claims", icon: Receipt },
    ],
  },
  {
    group: "Compliance & Safety",
    items: [
      { to: "/compliance", label: "Compliance", icon: FileCheck },
      { to: "/inspections", label: "Inspections", icon: ClipboardCheck },
      { to: "/safeguarding", label: "Safeguarding", icon: ShieldAlert },
    ],
  },
  {
    group: "System",
    items: [
      { to: "/chat", label: "Internal Chat", icon: MessageSquare },
      { to: "/alerts", label: "Alerts", icon: Bell },
      { to: "/ai", label: "AI Assistant", icon: Bot },
    ],
  },
];

// Helper sub-component for items that have nested submenus
function SidebarSubmenu({ item, pathname }) {
  // Check if any child route is currently active to auto-expand on load
  const isChildActive = item.children?.some((child) => pathname === child.to);
  const [isOpen, setIsOpen] = useState(isChildActive);

  const Icon = item.icon;

  return (
    <li className="mb-0.5 last:mb-0">
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        className={`w-full flex items-center justify-between pl-4 pr-3 py-2 rounded-lg text-gray-800 dark:text-gray-100 transition duration-150 hover:text-gray-900 dark:hover:text-white ${
          isChildActive ? "bg-gray-100 dark:bg-gray-700/50" : ""
        }`}
      >
        <div className="flex items-center truncate">
          {Icon && (
            <Icon className="shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500" />
          )}
          <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
            {item.label}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Nested Expandable Submenu container */}
      <ul className={`pl-9 mt-1 space-y-1 ${isOpen ? "block" : "hidden"}`}>
        {item.children.map((child) => (
          <li key={child.to}>
            <NavLink
              end
              to={child.to}
              className={({ isActive }) =>
                `block text-sm font-medium truncate transition duration-150 ${
                  isActive
                    ? "text-violet-600 dark:text-violet-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`
              }
            >
              {child.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </li>
  );
}

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [sidebarOpen]);

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [sidebarOpen]);

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div className="min-w-fit">
      {/* Backdrop for Mobile view */}
      <div
        className={`fixed inset-0 bg-gray-900/30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Main Sidebar Shell */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:w-64 bg-white dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          <NavLink end to="/" className="flex items-center gap-2.5">
            <Bird className="text-violet-500 shrink-0" size={32} strokeWidth={1.5} />
            <span className="text-sm font-bold text-gray-800 dark:text-gray-100 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
              SafeNest
            </span>
          </NavLink>
        </div>

        {/* Dynamic Groups & Items Generation */}
        <div className="space-y-6">
          {navigationConfig.map((group, groupIdx) => (
            <div key={groupIdx}>
              {/* Group Heading Header label */}
              <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3 mb-2">
                <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                  {group.group}
                </span>
              </h3>

              <ul className="space-y-0.5">
                {group.items.map((item, itemIdx) => {
                  // If the item contains children configurations, defer to the nested component
                  if (item.children) {
                    return (
                      <SidebarSubmenu
                        key={itemIdx}
                        item={item}
                        pathname={pathname}
                      />
                    );
                  }

                  const Icon = item.icon;
                  const isLinkActive = pathname === item.to;

                  return (
                    <li key={item.to || itemIdx}>
                      <NavLink
                        end
                        to={item.to}
                        className={({ isActive }) =>
                          `flex items-center justify-between pl-4 pr-3 py-2 rounded-lg transition duration-150 text-gray-800 dark:text-gray-100 ${
                            isActive
                              ? "bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-200"
                              : "hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700/30"
                          }`
                        }
                      >
                        <div className="flex items-center truncate">
                          {Icon && (
                            <Icon
                              className={`shrink-0 h-4 w-4 ${isLinkActive ? "text-violet-500" : "text-gray-400 dark:text-gray-500"}`}
                            />
                          )}
                          <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            {item.label}
                          </span>
                        </div>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
