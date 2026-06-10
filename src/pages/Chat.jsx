import React, { useState, useMemo } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Banner from "../partials/Banner";
import {
  Hash,
  MessageCircle,
  Send,
  Inbox,
  ChevronDown,
  Bot,
  User,
  Users,
  Clock,
  Search,
  Building2,
  ShieldCheck,
  Wrench,
  Home,
  Plus,
  X,
} from "lucide-react";

const CHANNELS = {
  Everything: [
    { id: "s1", name: "142 High St, London", type: "group", category: "property", unread: 2 },
    { id: "s2", name: "Zenith Complex Sync", type: "group", category: "property", unread: 0 },
    { id: "s3", name: "Alice Thompson (Resident)", type: "dm", category: "resident", unread: 1 },
    { id: "s4", name: "Sterling Holdings (Landlord)", type: "group", category: "landlord", unread: 0 },
    { id: "s5", name: "Compliance Team — Q2 Review", type: "group", category: "compliance", unread: 3 },
    { id: "s6", name: "Maintenance Dispatch Board", type: "group", category: "maintenance", unread: 0 },
    { id: "s7", name: "Maple House Staff", type: "group", category: "property", unread: 1 },
    { id: "s8", name: "Sarah Jenkins (Support Coach)", type: "dm", category: "staff", unread: 0 },
    { id: "s9", name: "Oak Lodge — Safeguarding Thread", type: "group", category: "safeguarding", unread: 0 },
    { id: "s10", name: "Elena Rostova (Housing Officer)", type: "dm", category: "staff", unread: 2 },
  ],
};

const ALL_HISTORY = {
  s1: [
    { sender: "System", text: "Property manager added John Doe to the thread.", time: "10:00 AM" },
    { sender: "Elena R.", text: "The gas safety inspection is scheduled for Thursday. Contractors will need access to all rooms.", time: "10:15 AM" },
    { sender: "Me", text: "@bot, check the boiler status for 142 High St.", time: "10:05 AM" },
    { sender: "AI Assistant", text: "Boiler pressure at 1.5 bar. Normal operational range confirmed. Last service: 12 March 2026.", time: "10:06 AM" },
    { sender: "Sarah J.", text: "Resident in Room 3 has reported intermittent heating. Could this be related?", time: "10:30 AM" },
    { sender: "Elena R.", text: "I'll ask the contractor to check the zone valve while they're on site.", time: "10:32 AM" },
  ],
  s3: [
    { sender: "Alice Thompson", text: "Hi, the tap in the kitchen is leaking.", time: "Yesterday" },
    { sender: "Me", text: "Thanks Alice, I've logged a maintenance request. A plumber will contact you within 24 hours.", time: "Yesterday" },
    { sender: "Alice Thompson", text: "Great, thank you! Also, could I get a new key for my room? I lost mine.", time: "Yesterday" },
  ],
  s5: [
    { sender: "System", text: "Q2 Compliance Review initiated. 42 certificates to audit.", time: "09:00 AM" },
    { sender: "Compliance Lead", text: "We have 3 EICRs expiring next month — priority review needed.", time: "09:15 AM" },
    { sender: "Me", text: "I've flagged them for renewal. Can we schedule the inspections?", time: "09:30 AM" },
  ],
  s6: [
    { sender: "Dispatch", text: "JOB-2034 (Roof repair, Rowan Terraces) — awaiting contractor quote.", time: "08:00 AM" },
    { sender: "Me", text: "Chased contractor. They've promised the quote by end of day.", time: "08:30 AM" },
    { sender: "Dispatch", text: "Noted. JOB-2041 (Sump pump) — engineer dispatched, ETA 11:00.", time: "08:35 AM" },
  ],
  s7: [
    { sender: "Marcus V.", text: "Room 102 inspection complete. Window seal needs replacing.", time: "2 days ago" },
    { sender: "Me", text: "Logged as JOB-2055. Handyman scheduled for Friday.", time: "2 days ago" },
  ],
  s10: [
    { sender: "Elena Rostova", text: "New resident moving into Room 5 next Monday. Need the room prepared.", time: "1 day ago" },
    { sender: "Me", text: "I'll arrange a deep clean and inventory check for Friday.", time: "1 day ago" },
  ],
};

const CATEGORY_META = {
  property: { label: "Property", icon: Building2, color: "text-violet-500 bg-violet-50 dark:bg-violet-950/20" },
  resident: { label: "Resident", icon: User, color: "text-cyan-500 bg-cyan-50 dark:bg-cyan-950/20" },
  landlord: { label: "Landlord", icon: Home, color: "text-amber-500 bg-amber-50 dark:bg-amber-950/20" },
  compliance: { label: "Compliance", icon: ShieldCheck, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20" },
  maintenance: { label: "Maintenance", icon: Wrench, color: "text-blue-500 bg-blue-50 dark:bg-blue-950/20" },
  staff: { label: "Staff", icon: Users, color: "text-teal-500 bg-teal-50 dark:bg-teal-950/20" },
  safeguarding: { label: "Safeguarding", icon: ShieldCheck, color: "text-rose-500 bg-rose-50 dark:bg-rose-950/20" },
};

function Chat() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [activeSession, setActiveSession] = useState(CHANNELS["Everything"][0]);
  const [sessionData, setSessionData] = useState(ALL_HISTORY);
  const [input, setInput] = useState("");

  const filteredChannels = useMemo(() => {
    return CHANNELS["Everything"].filter((ch) => {
      const matchesSearch =
        ch.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "All" || ch.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, categoryFilter]);

  const totalUnread = useMemo(() => {
    return CHANNELS["Everything"].reduce((acc, ch) => acc + ch.unread, 0);
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = { sender: "Me", text: input, time: "Just now" };
    setSessionData((prev) => ({
      ...prev,
      [activeSession.id]: [...(prev[activeSession.id] || []), newMsg],
    }));
    setInput("");

    if (input.includes("@bot")) {
      setTimeout(() => {
        setSessionData((prev) => ({
          ...prev,
          [activeSession.id]: [
            ...(prev[activeSession.id] || []),
            {
              sender: "AI Assistant",
              text: "I've checked the system. Here's what I found based on your request. Would you like me to take any further action?",
              time: "Just now",
            },
          ],
        }));
      }, 1200);
    }

    if (input.toLowerCase().includes("maintenance") || input.toLowerCase().includes("plumber")) {
      setTimeout(() => {
        setSessionData((prev) => ({
          ...prev,
          [activeSession.id]: [
            ...(prev[activeSession.id] || []),
            {
              sender: "AI Assistant",
              text: "I've logged this as a maintenance request. A work order will be created and assigned to the appropriate trade team.",
              time: "Just now",
            },
          ],
        }));
      }, 1500);
    }
  };

  const getMeta = (category) => CATEGORY_META[category] || CATEGORY_META.property;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 dark:bg-gray-900">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow flex overflow-hidden">
          {/* Channels Sidebar */}
          <div className="w-72 lg:w-80 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 flex flex-col shrink-0">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageCircle size={14} /> Channels
                </h2>
                {totalUnread > 0 && (
                  <span className="text-[10px] bg-teal-600 text-white px-1.5 py-0.5 rounded-full font-bold">
                    {totalUnread}
                  </span>
                )}
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search channels..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 border rounded-lg bg-gray-50 dark:bg-gray-700/40 text-[11px] outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full border rounded-lg py-1.5 px-2 text-[11px] bg-gray-50 dark:bg-gray-700/40 outline-none text-gray-600 dark:text-gray-400"
              >
                <option value="All">All Categories</option>
                <option value="property">Property</option>
                <option value="resident">Resident</option>
                <option value="landlord">Landlord</option>
                <option value="compliance">Compliance</option>
                <option value="maintenance">Maintenance</option>
                <option value="staff">Staff</option>
                <option value="safeguarding">Safeguarding</option>
              </select>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredChannels.map((ch) => {
                const meta = getMeta(ch.category);
                const Icon = meta.icon;
                const isActive = activeSession.id === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setActiveSession(ch)}
                    className={`w-full text-left px-4 py-3 border-b border-gray-50 dark:border-gray-700/50 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition ${
                      isActive
                        ? "bg-teal-50 dark:bg-teal-950/20 border-l-2 border-l-teal-600"
                        : ""
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg ${meta.color}`}>
                      <Icon size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-900 dark:text-white truncate">
                          {ch.name}
                        </span>
                        {ch.unread > 0 && (
                          <span className="bg-teal-600 text-white text-[9px] px-1.5 rounded-full shrink-0 ml-1">
                            {ch.unread}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-400">{meta.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 min-w-0">
            <div className="px-6 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-lg ${getMeta(activeSession.category).color}`}>
                  {React.createElement(getMeta(activeSession.category).icon, { size: 16 })}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    {activeSession.name}
                  </h3>
                  <span className="text-[10px] text-gray-400">
                    {activeSession.type === "group" ? "Group conversation" : "Direct message"} ·{" "}
                    {getMeta(activeSession.category).label}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {(sessionData[activeSession.id] || []).length === 0 && (
                <div className="flex items-center justify-center h-full text-gray-400 text-xs italic">
                  No messages yet in this channel.
                </div>
              )}
              {(sessionData[activeSession.id] || []).map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === "Me" ? "justify-end" : ""}`}
                >
                  <div
                    className={`p-3 rounded-2xl max-w-lg text-xs leading-relaxed ${
                      msg.sender === "Me"
                        ? "bg-teal-600 text-white"
                        : msg.sender === "AI Assistant"
                          ? "bg-violet-50 dark:bg-violet-950/20 border border-violet-100 dark:border-violet-900/30 text-gray-700 dark:text-gray-300"
                          : "bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {msg.sender !== "Me" && (
                      <div className="text-[9px] font-bold opacity-60 mb-1 flex items-center gap-1">
                        {msg.sender === "AI Assistant" && <Bot size={10} />}
                        {msg.sender}
                      </div>
                    )}
                    {msg.text}
                    <div
                      className={`text-[9px] mt-1 ${
                        msg.sender === "Me"
                          ? "text-teal-200"
                          : "text-gray-400"
                      }`}
                    >
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={sendMessage}
              className="p-4 border-t border-gray-100 dark:border-gray-700 shrink-0"
            >
              <div className="flex gap-2">
                <input
                  className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-gray-200"
                  placeholder="Type your message, @bot for AI help..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white px-4 py-2.5 rounded-xl transition flex items-center gap-2 text-xs font-medium disabled:cursor-not-allowed"
                >
                  <Send size={14} />
                </button>
              </div>
            </form>
          </div>
        </main>

        <Banner />
      </div>
    </div>
  );
}

export default Chat;
