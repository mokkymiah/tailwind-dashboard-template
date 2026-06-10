import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";

const SUGGESTIONS = [
  "Summarise today's critical alerts",
  "Which compliance certs are expiring?",
  "Show me properties with vacancies",
  "List urgent maintenance jobs",
];

const initialMessages = [
  {
    role: "assistant",
    text: "Hey, I'm Arlo — your AI ops assistant. Ask me anything about your portfolio.",
  },
];

function ArloWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  function handleSend() {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `Thanks for your question about "${text}". I'm scanning your portfolio data now — I'll have a full breakdown ready shortly.`,
        },
      ]);
    }, 800);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      {/* Floating Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-violet-600 hover:bg-violet-700 text-white rounded-full p-3.5 shadow-lg shadow-violet-600/25 transition hover:scale-105"
      >
        <MessageCircle size={22} />
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700 bg-violet-50 dark:bg-violet-950/20">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-violet-600 text-white">
                <Bot size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Arlo</p>
                <p className="text-[10px] text-gray-400">AI Ops Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={listRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[400px]"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3.5 py-2 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-violet-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {messages.length === 1 && (
              <div className="pt-2 space-y-1.5">
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Try asking:</p>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setMessages((prev) => [...prev, { role: "user", text: s }]);
                      setTimeout(() => {
                        setMessages((prev) => [
                          ...prev,
                          {
                            role: "assistant",
                            text: `Great question! Let me pull that data for you. I'll scan the relevant records and get back with a full update.`,
                          },
                        ]);
                      }, 800);
                    }}
                    className="block w-full text-left text-xs bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-gray-100 dark:border-gray-700 p-3 flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Arlo anything..."
              className="flex-1 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-800 dark:text-gray-200 placeholder-gray-400"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="bg-violet-600 hover:bg-violet-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl p-2 transition"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ArloWidget;
