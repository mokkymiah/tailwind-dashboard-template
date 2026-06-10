import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Banner from "../partials/Banner";
import {
  Bot,
  Send,
  Sparkles,
  User,
  FileText,
  ShieldCheck,
  Wrench,
  Building2,
  Users,
  AlertTriangle,
  Calendar,
  CheckCircle2,
} from "lucide-react";

const SUGGESTED_PROMPTS = [
  "Summarise the current compliance status across all properties",
  "Clean up my support session notes for today",
  "What actions are needed for overdue maintenance jobs?",
  "Draft a landlord update for June 2026",
  "Identify high-risk residents needing review",
  "Check which compliance certificates are expiring soon",
];

const mockAiResponse = (prompt) => {
  const lower = prompt.toLowerCase();
  if (lower.includes("compliance") || lower.includes("certificate") || lower.includes("expir"))
    return `**Compliance Summary — June 2026**

Across the portfolio:

| Certificate Type | Total | Valid | Action Required | Expired |
|------------------|-------|-------|----------------|---------|
| EICR             | 12    | 10    | 1              | 1       |
| Gas Safety       | 15    | 12    | 2              | 1       |
| FRA              | 8     | 7     | 1              | 0       |
| PAT Testing      | 20    | 18    | 1              | 1       |
| Legionella       | 6     | 5     | 1              | 0       |
| HMO Licence      | 5     | 4     | 1              | 0       |

**⚠️ Immediate Actions:**
- Oak Lodge — Gas Safety cert expired 3 days ago
- Cedar Court — EICR requires renewal within 14 days

**Recommendation:** Prioritise Oak Lodge gas re-inspection before end of week.`;
  if (lower.includes("note") || lower.includes("clean") || lower.includes("session"))
    return `**✨ AI Note Cleanup Applied**

I've reviewed your draft session notes and standardised them against our internal framework:

**Before:**
"Met with resident, they're doing ok, talked about budgeting, need to follow up next week"

**After:**
> **Support Session Summary — 10 June 2026**
> **Resident:** J. Doe (Room 102, Maple House)
> **Coach:** Sarah Jenkins
> **Focus:** Independent Living Budgeting Strategy
> **Outcome:** Resident engaged positively with financial planning exercises. Budget tracker reviewed and updated. Goals set for next session.
> **Next Actions:** Follow-up scheduled for 17 June 2026 to review savings milestones.

✅ Compliance check passed — all required fields populated.`;
  if (lower.includes("maintenance") || lower.includes("job") || lower.includes("overdue"))
    return `**Maintenance Overview — Outstanding Actions**

| Priority | Count | Examples |
|----------|-------|---------|
| 🔴 Critical | 3 | HVAC compressor failure (Oak Lodge), main leak (Maple House) |
| 🟡 High     | 5 | Fire door repairs (Cedar Ct), boiler service (Willow Pav) |
| 🔵 Medium   | 8 | Window seal replacements, PAT retesting |
| ⚪ Low      | 12 | Routine carpentry, decor touch-ups |

**Overdue Jobs (>7 days past target):**
1. **JOB-2034** — Roof flashing repair (Rowan Terraces) — 12 days overdue
2. **JOB-2041** — Sump pump cleanup (Ashford Mews) — 9 days overdue
3. **JOB-2050** — Communal lighting repair (Beechwood) — 8 days overdue

**Suggested Action:** Dispatch a multi-trade crew to Rowan Terraces this week to clear the backlog.`;
  if (lower.includes("landlord") || lower.includes("update") || lower.includes("draft"))
    return `**Draft Landlord Update — June 2026**

> Dear Partner,
>
> **Monthly Portfolio Summary — May 2026**
>
| Metric | Value |
|--------|-------|
| Occupancy Rate | 88% (+2% MoM) |
| Rent Collected | £184,320 (98.2%) |
| Active Maintenance Jobs | 16 (8 resolved this month) |
| Compliance Status | 94% current (2 certs in renewal) |
| New Residents Onboarded | 7 |
>
> **Key Highlights:**
> - Maple House reached full occupancy for the first time this year
> - All outstanding EICR works have been completed at Oak Lodge
> - New fire risk assessments completed across 3 properties
>
> **Actions Required:**
> - Gas safety renewal at Cedar Court due by 30 June
> - Please review attached quarterly financial statement
>
> Best regards,
> Housing Management Team

Would you like me to adjust the tone or add specific property details?`;
  if (lower.includes("risk") || lower.includes("resident") || lower.includes("high-risk"))
    return `**Resident Risk Assessment — High Priority Cases**

| Resident | Property | Risk Level | Concerns | Last Session |
|----------|----------|------------|----------|-------------|
| A. Khan   | Maple House | 🔴 **High** | Missed 3 sessions, benefit claim suspended | 14 days ago |
| J. Smith  | Oak Lodge | 🟡 **Medium** | Support plan needs review, arrears building | 7 days ago |
| T. Brown  | Cedar Court | 🟡 **Medium** | Safeguarding alert raised last month | 10 days ago |

**Recommended Actions:**
1. **A. Khan** — Urgent welfare check and benefit claim support. Schedule emergency keywork session.
2. **J. Smith** — Arrange financial capability assessment with support coach.
3. **T. Brown** — Review safeguarding plan with allocated officer.

Would you like me to draft session plans for any of these residents?`;
  return `I've analysed your request regarding "${prompt.substring(0, 60)}..."

Based on the current data available in the system, here's what I can tell you:

✅ The relevant records have been checked
📊 Key metrics are within normal operational ranges
📋 No immediate compliance flags detected

**What would you like me to help with next?** You can ask me about:
- Compliance certificate status and expiry tracking
- Support session note cleanup and formatting
- Maintenance job priorities and overdue items
- Resident risk assessments and safeguarding flags
- Drafting landlord updates and portfolio summaries`;
};

const QUICK_STATS = [
  { label: "Properties Managed", value: "12", icon: Building2 },
  { label: "Active Residents", value: "84", icon: Users },
  { label: "Compliance Rate", value: "94%", icon: ShieldCheck },
  { label: "Open Jobs", value: "16", icon: Wrench },
  { label: "Active Alerts", value: "3", icon: AlertTriangle },
];

function AiAssistant() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello! I'm your HMO Management AI Assistant. I can help you with:\n\n• **Compliance summaries** — certificate status, expiry tracking\n• **Note cleanup** — standardise support session logs\n• **Maintenance insights** — outstanding jobs, prioritisation\n• **Landlord updates** — draft portfolio communications\n• **Risk analysis** — identify high-priority cases\n\nWhat would you like help with today?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = { role: "user", text: input, timestamp: new Date().toLocaleTimeString() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = mockAiResponse(input);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: response,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSuggestedClick = (prompt) => {
    if (isTyping) return;
    const userMsg = { role: "user", text: prompt, timestamp: new Date().toLocaleTimeString() };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const response = mockAiResponse(prompt);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: response,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 dark:bg-gray-900">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold flex items-center gap-2.5">
                  <Bot className="text-violet-600" size={28} /> AI Management
                  Assistant
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Your intelligent copilot for HMO operations — summaries, note
                  cleanup, risk analysis and more.
                </p>
              </div>
            </div>

            {/* Quick Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
              {QUICK_STATS.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-3 flex items-center gap-3 shadow-xs"
                  >
                    <div className="p-2 rounded-lg bg-violet-50 dark:bg-violet-950/20 text-violet-600">
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white font-mono">
                        {stat.value}
                      </div>
                      <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chat Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Suggested Prompts — Left sidebar */}
              <div className="lg:col-span-3 space-y-3">
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-xs">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-violet-500" /> Suggested
                    Prompts
                  </h3>
                  <div className="space-y-2">
                    {SUGGESTED_PROMPTS.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestedClick(prompt)}
                        disabled={isTyping}
                        className="w-full text-left text-xs p-2.5 rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 text-gray-700 dark:text-gray-300 hover:border-violet-200 dark:hover:border-violet-800 hover:bg-violet-50/50 dark:hover:bg-violet-950/20 transition disabled:opacity-50 leading-relaxed"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-950/10 border border-amber-200 dark:border-amber-900/30 rounded-xl p-3 text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                  <strong>💡 Tip:</strong> You can type natural language
                  questions or choose a suggested prompt above. The AI
                  understands context across all your management modules.
                </div>
              </div>

              {/* Chat Area — Main */}
              <div className="lg:col-span-9 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col h-[600px]">
                {/* Chat Header */}
                <div className="px-5 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3 shrink-0">
                  <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-600">
                    <Bot size={20} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                      AI Assistant
                    </h2>
                    <p className="text-[10px] text-gray-400 flex items-center gap-1">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />{" "}
                      Online — HMO Management Suite
                    </p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-xl p-4 text-xs leading-relaxed whitespace-pre-wrap ${
                          msg.role === "user"
                            ? "bg-violet-600 text-white"
                            : "bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {msg.role === "assistant" && (
                          <div className="flex items-center gap-1.5 mb-2 text-[10px] font-bold text-violet-500 uppercase tracking-wider">
                            <Bot size={12} /> AI Assistant
                          </div>
                        )}
                        <div className="leading-relaxed">{msg.text}</div>
                        <div
                          className={`text-[9px] mt-2 ${msg.role === "user" ? "text-violet-200" : "text-gray-400"}`}
                        >
                          {msg.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl p-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <Bot size={12} className="text-violet-500" />
                          <span>Analysing</span>
                          <span className="animate-pulse">...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <form
                  onSubmit={handleSend}
                  className="p-4 border-t border-gray-100 dark:border-gray-700 shrink-0"
                >
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Ask me anything about properties, compliance, residents, maintenance..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      disabled={isTyping}
                      className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-violet-500 text-gray-800 dark:text-gray-200 placeholder:text-gray-400 disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isTyping}
                      className="bg-violet-600 hover:bg-violet-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white px-4 py-2.5 rounded-xl transition flex items-center gap-2 text-xs font-medium disabled:cursor-not-allowed"
                    >
                      <Send size={14} />
                      <span className="hidden sm:inline">Send</span>
                    </button>
                  </div>
                </form>
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
