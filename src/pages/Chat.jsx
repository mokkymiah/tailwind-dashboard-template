import React, { useState } from "react";
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
  AlertCircle,
} from "lucide-react";

// Mock Data: Populated with existing conversation history
const INITIAL_SESSIONS = {
  Everything: [
    {
      id: "s1",
      name: "142 High St, London",
      type: "group",
      category: "property",
      unread: 2,
    },
    {
      id: "s2",
      name: "Zenith Complex Sync",
      type: "group",
      category: "property",
      unread: 0,
    },
    {
      id: "s3",
      name: "Alice Thompson (Tenant)",
      type: "dm",
      category: "tenant",
      unread: 1,
    },
    {
      id: "s4",
      name: "Sterling Holdings",
      type: "group",
      category: "landlord",
      unread: 0,
    },
  ],
};

const INITIAL_HISTORY = {
  s1: [
    {
      sender: "System",
      text: "Property manager added John Doe to the thread.",
      time: "10:00 AM",
    },
    {
      sender: "Me",
      text: "@bot, check the boiler status for 142 High St.",
      time: "10:05 AM",
    },
    {
      sender: "AI Assistant",
      text: "Boiler pressure at 1.5 bar. Normal operational range confirmed.",
      time: "10:06 AM",
    },
  ],
  s3: [
    {
      sender: "Alice Thompson",
      text: "Hi, the tap in the kitchen is leaking.",
      time: "Yesterday",
    },
    {
      sender: "Me",
      text: "Thanks Alice, I've logged a maintenance request.",
      time: "Yesterday",
    },
  ],
};

function Chat() {
  const [activeCategory, setActiveCategory] = useState("Everything");
  const [activeSession, setActiveSession] = useState(
    INITIAL_SESSIONS["Everything"][0],
  );
  const [sessionData, setSessionData] = useState(INITIAL_HISTORY);
  const [input, setInput] = useState("");

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
        const aiMsg = {
          sender: "AI Assistant",
          text: "I have retrieved the latest property logs. What specific data do you need?",
          time: "Just now",
        };
        setSessionData((prev) => ({
          ...prev,
          [activeSession.id]: [...(prev[activeSession.id] || []), aiMsg],
        }));
      }, 1200);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 text-xs text-gray-800">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
            Channels
            <div className="bg-gray-200 px-1.5 rounded-full">4</div>
          </div>
          <button className="w-full flex items-center justify-between bg-gray-50 border p-2.5 rounded-lg font-bold">
            <div className="flex items-center gap-2">
              <Inbox size={14} /> {activeCategory}
            </div>
            <ChevronDown size={14} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {INITIAL_SESSIONS["Everything"].map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSession(s)}
              className={`w-full text-left px-4 py-3 border-b flex items-center justify-between hover:bg-gray-50 ${activeSession.id === s.id ? "bg-teal-50 border-l-4 border-l-teal-600" : ""}`}
            >
              <div className="flex items-center gap-3">
                {s.type === "group" ? (
                  <Hash size={14} className="text-gray-400" />
                ) : (
                  <MessageCircle size={14} className="text-gray-400" />
                )}
                <span className="font-medium">{s.name}</span>
              </div>
              {s.unread > 0 && (
                <span className="bg-teal-600 text-white text-[9px] px-1.5 rounded-full">
                  {s.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <div className="font-bold flex items-center gap-2">
            {activeSession.type === "group" ? (
              <Users size={16} />
            ) : (
              <User size={16} />
            )}
            {activeSession.name}
          </div>
          <div className="flex gap-2">
            <button className="text-gray-400 text-[10px] font-bold border px-2 py-1 rounded">
              View Details
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {(sessionData[activeSession.id] || []).map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.sender === "Me" ? "justify-end" : ""}`}
            >
              <div
                className={`p-3 rounded-2xl max-w-sm ${msg.sender === "Me" ? "bg-teal-600 text-white" : "bg-gray-100 border"}`}
              >
                {msg.sender !== "Me" && (
                  <div className="text-[9px] font-bold opacity-60 mb-0.5">
                    {msg.sender}
                  </div>
                )}
                {msg.text}
                <div className="text-[9px] opacity-50 mt-1">{msg.time}</div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={sendMessage} className="p-4 border-t flex gap-2">
          <input
            className="flex-1 bg-gray-100 rounded-xl px-4 py-2 outline-none"
            placeholder="Type your message, @bot for help..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-teal-600 text-white px-4 py-2 rounded-xl"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
