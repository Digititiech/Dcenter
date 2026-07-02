"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Message {
  sender: "ai" | "user";
  text: string;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Hello. I'm your AI consultant. I can help you with project reviews, bank preparation, or banking questions. How can I help you today?",
    },
  ]);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [timeframe, setTimeframe] = useState("Immediate (1-3 Business Days)");

  const handleRequestSession = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hello Decision Center, I would like to request a secure consulting session.\nName: ${name}\nCompany: ${company}\nPreferred Timeframe: ${timeframe}`;
    const waUrl = `https://wa.me/96896680001?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  };

  const responses: Record<string, string> = {
    "Check Project Value":
      "To evaluate your project's financial value, we perform full discounted cash flow (DCF) modeling, IRR analysis, and weighted average cost of capital (WACC) estimations. Would you like us to schedule a formal evaluation?",
    "Get Ready for Bank":
      "Preparing for bank funding requires a robust feasibility study conforming strictly to Omani banking evidentiary standards. We compile full market research, operational structures, and risk mitigation profiles. Shall we book a preparation slot?",
    "Banking Advice":
      "Decision Center has decades of regional banking leadership. We advise on restructuring, capital structuring, debt negotiations, and ERM compliance. Please details your target bank or funding size.",
  };

  const handleQuickAction = (actionName: string) => {
    setShowQuickActions(false);
    setMessages((prev) => [...prev, { sender: "user", text: actionName }]);

    setTimeout(() => {
      const reply = responses[actionName] || "Thank you. Let me review that request and get back to you shortly.";
      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    }, 800);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const text = inputValue.trim();
    setInputValue("");
    setShowQuickActions(false);
    setMessages((prev) => [...prev, { sender: "user", text }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Thank you for the detail. Your request has been queued in our Qualification Engine. Our strategic consulting team will address this. You can also request an Executive Session using the form on the right.",
        },
      ]);
    }, 800);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Header locale="en" />
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-section-gap grid grid-cols-1 lg:grid-cols-12 gap-gutter pt-36">
        {/* Left Panel: AI Consultant Chat */}
        <div className="lg:col-span-7 flex flex-col h-[700px] border border-outline-variant/20 bg-primary-container rounded-none relative overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-outline-variant/20 bg-surface-container-high flex justify-between items-center">
            <div>
              <h2 className="font-display-lg text-headline-md text-foreground">Decision Intelligence AI Assistant</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Institutional Qualification Engine</p>
            </div>
            <span className="material-symbols-outlined text-secondary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              smart_toy
            </span>
          </div>

          {/* Chat Area */}
          <div className="flex-grow p-6 overflow-y-auto space-y-6">
            {messages.map((msg, index) => (
              <div key={index} className="flex gap-4">
                {msg.sender === "ai" ? (
                  <>
                    <div className="w-10 h-10 rounded-none bg-surface-container-highest flex items-center justify-center border border-outline-variant/30 flex-shrink-0">
                      <span className="material-symbols-outlined text-secondary">memory</span>
                    </div>
                    <div className="bg-surface-container-highest border border-outline-variant/20 p-4 rounded-none max-w-[85%]">
                      <p className="font-body-md text-body-md text-foreground">{msg.text}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-surface-container border border-outline-variant/20 p-4 rounded-none max-w-[85%] ml-auto">
                      <p className="font-body-md text-body-md text-foreground">{msg.text}</p>
                    </div>
                    <div className="w-10 h-10 rounded-none bg-secondary flex items-center justify-center text-background font-bold flex-shrink-0">
                      U
                    </div>
                  </>
                )}
              </div>
            ))}

            {showQuickActions && (
              <div className="pl-14 space-y-3">
                {Object.keys(responses).map((action) => (
                  <button
                    key={action}
                    onClick={() => handleQuickAction(action)}
                    className="w-full text-left p-4 border border-outline-variant/20 bg-surface-container-lowest hover:bg-surface-container-low transition-colors rounded-none flex items-center justify-between group cursor-pointer"
                  >
                    <span className="font-data-tabular text-data-tabular text-foreground">{action}</span>
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary transition-colors">
                      arrow_forward
                    </span>
                  </button>
                ))}
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-outline-variant/20 bg-surface-container-high">
            <div className="flex gap-4 gold-border-focus">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-grow bg-surface-container-lowest border border-outline-variant/30 text-foreground font-body-sm text-body-sm px-4 py-3 rounded-none focus:outline-none focus:ring-0 focus:border-secondary"
                placeholder="Detail your institutional requirement..."
                type="text"
              />
              <button
                onClick={handleSendMessage}
                className="btn-gold px-4 py-3 rounded-none flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel: Filters & Form */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          {/* Target Sector Filter */}
          <div className="border border-outline-variant/20 bg-primary-container p-6 rounded-none">
            <h3 className="font-label-caps text-label-caps uppercase text-secondary mb-4 border-b border-outline-variant/20 pb-2">
              Oman Vision 2040 Alignment
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Logistics", "Energy", "Mining", "Tourism", "SMEs", "Real Estate"].map((sector, i) => (
                <button
                  key={sector}
                  className={`border px-3 py-1 font-body-sm text-body-sm rounded-full transition-colors cursor-pointer ${
                    i === 0
                      ? "border-secondary text-secondary bg-secondary/10"
                      : "border-outline-variant/50 text-on-surface-variant hover:border-secondary hover:text-secondary"
                  }`}
                >
                  {sector}
                </button>
              ))}
            </div>
          </div>

          {/* Capture Form */}
          <div className="border border-outline-variant/20 bg-surface-container-highest p-6 rounded-none flex-grow relative overflow-hidden">
            {/* Abstract visual element */}
            <div className="absolute -right-16 -top-16 w-32 h-32 border border-secondary/20 rounded-full"></div>
            <h3 className="font-display-lg text-headline-md text-foreground mb-6">Executive Scheduling</h3>
            <form onSubmit={handleRequestSession} className="space-y-5">
              <div className="space-y-1">
                <label className="font-body-sm text-body-sm text-foreground">Full Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant/30 text-foreground font-body-sm text-body-sm px-4 py-3 rounded-none focus:outline-none focus:border-secondary focus:ring-0 transition-colors"
                  placeholder="e.g. Abdullah Al Rushdi"
                  type="text"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="font-body-sm text-body-sm text-foreground">Company Name</label>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant/30 text-foreground font-body-sm text-body-sm px-4 py-3 rounded-none focus:outline-none focus:border-secondary focus:ring-0 transition-colors"
                  placeholder="e.g. Muscat Sovereign Fund"
                  type="text"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="font-body-sm text-body-sm text-foreground">When would you like to meet?</label>
                <div className="relative">
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant/30 text-foreground font-body-sm text-body-sm px-4 py-3 rounded-none focus:outline-none focus:border-secondary focus:ring-0 transition-colors appearance-none"
                  >
                    <option>Immediate (1-3 Business Days)</option>
                    <option>Standard (1-2 Weeks)</option>
                    <option>Exploratory (Q3 2024)</option>
                  </select>
                </div>
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full btn-gold font-label-caps text-label-caps uppercase px-6 py-4 rounded-none flex justify-center items-center gap-2 cursor-pointer"
                >
                  <span>Request Secure Session</span>
                  <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                    lock
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer locale="en" />
    </>
  );
}
