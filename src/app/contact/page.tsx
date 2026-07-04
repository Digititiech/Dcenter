"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export default function Contact() {
  const [activeFAQ, setActiveFAQ] = useState<string | null>(null);
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string>(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`);
  const [selectedSlot, setSelectedSlot] = useState<string>("09:00 GST");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [requestedService, setRequestedService] = useState("Financial & Valuation Modeling");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const faqs: FAQ[] = [
    {
      id: "faq1",
      question: "Is my information safe?",
      answer:
        "Decision Center employs bank-grade encryption and sovereign-level data isolation protocols. All proprietary client data is housed in strictly segregated, offline-capable environments.",
    },
    {
      id: "faq2",
      question: "Are the reports accepted officially?",
      answer:
        "Yes. Our forensic accounting and valuation reports are strictly formatted to adhere to the evidentiary requirements of the Sultanate of Oman's judicial system, providing robust support in litigation and arbitration.",
    },
    {
      id: "faq3",
      question: "What is the success rate?",
      answer:
        "Feasibility studies prepared by Decision Center maintain an institutional acceptance rate exceeding 94% across major Omani banks and sovereign wealth funds.",
    },
  ];

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOffset = (year: number, month: number) => new Date(year, month, 1).getDay();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleConfirmConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const dateObj = new Date(selectedDate);
    const day = dateObj.getDate();

    const message = `Hello Decision Center, I would like to book a strategic consultation.\n\nClient Details:\n- Name: ${clientName}\n- Email: ${clientEmail}\n- Phone: ${clientPhone}\n- Requested Service: ${requestedService}\n\nSelected Date: ${formatDate(selectedDate)}\nTime Slot: ${selectedSlot}`;

    const newBooking = {
      clientName,
      clientEmail,
      clientPhone,
      day,
      timeSlot: selectedSlot,
      status: "Pending",
      booking_date: selectedDate
    };

    try {
      if (isSupabaseConfigured()) {
        await supabase.from("bookings").insert(newBooking);
      } else {
        const localBookings = localStorage.getItem("bookings-slots");
        const currentBookings = localBookings ? JSON.parse(localBookings) : [];
        localStorage.setItem("bookings-slots", JSON.stringify([...currentBookings, { id: Date.now().toString(), ...newBooking }]));
      }

      // Send auto WhatsApp via connected WhatsApp server
      const serverUrl = localStorage.getItem("wa-server-url") || "https://wa.powerpod.ae";
      
      // 1. Send confirmation to client
      const clientMessage = `Hello ${clientName}, your strategic consultation request with Decision Center has been received for ${formatDate(selectedDate)} at ${selectedSlot}. We will review and confirm your slot shortly.`;
      
      await fetch(`${serverUrl}/api/send-whatsapp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          number: clientPhone,
          message: clientMessage
        })
      });

      // 2. Notify the admin
      await fetch(`${serverUrl}/api/send-whatsapp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          number: "96896680001",
          message: message
        })
      });

      setShowConfirmation(true);
      setClientName("");
      setClientEmail("");
      setClientPhone("");
      setTimeout(() => {
        setShowConfirmation(false);
      }, 6000);
    } catch (err) {
      console.error("Booking submission failed:", err);
      alert("Failed to submit request. Please try again or contact us directly on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFAQ = (id: string) => {
    setActiveFAQ(activeFAQ === id ? null : id);
  };

  const timeSlots = ["09:00 GST", "11:30 GST", "14:00 GST", "16:00 GST"];

  return (
    <>
      <Header locale="en" />
      <main className="flex-grow pt-20">
        {/* Section: Conversion Header & Objection Handling */}
        <section className="px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <div className="md:col-span-5 flex flex-col justify-center">
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-foreground mb-6">
                Proceed with <span className="text-secondary">Absolute Clarity.</span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
                Our institutional-grade reporting structure leaves no ambiguity. Address your concerns directly below.
              </p>
            </div>
            <div className="md:col-span-6 md:col-start-7 flex flex-col justify-center space-y-4">
              {faqs.map((faq) => {
                const isActive = activeFAQ === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="border border-outline-variant/30 bg-surface-container-high rounded-none overflow-hidden"
                  >
                    <button
                      className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none cursor-pointer"
                      onClick={() => toggleFAQ(faq.id)}
                    >
                      <span className="font-body-md text-body-md text-foreground font-semibold">
                        {faq.question}
                      </span>
                      <span
                        className={`material-symbols-outlined accordion-icon text-secondary ${
                          isActive ? "rotate-180" : ""
                        }`}
                      >
                        expand_more
                      </span>
                    </button>
                    <div
                      className={`transition-all duration-300 ${
                        isActive ? "max-h-[500px] opacity-100 p-6 pt-0" : "max-h-0 opacity-0 overflow-hidden"
                      } bg-surface`}
                    >
                      <div className="w-full h-px bg-outline-variant/10 mb-4"></div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">{faq.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-px bg-outline-variant/30"></div>

        {/* Section: Secure Contact & Scheduling */}
        <section className="px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Trust & Coordinates Box */}
            <div className="md:col-span-4 bg-surface-container-high border border-outline-variant/20 p-8 flex flex-col h-full">
              <h3 className="font-display-lg text-headline-md text-foreground mb-8 border-b border-outline-variant/20 pb-4">
                Contact Us
              </h3>
              <div className="space-y-6 flex-grow">
                <div className="flex items-start space-x-4">
                  <span
                    className="material-symbols-outlined text-secondary mt-1"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    location_on
                  </span>
                  <div>
                    <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">Our Office</p>
                    <p className="font-body-md text-body-md text-foreground">Sohar, Sultanate of Oman</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <span
                    className="material-symbols-outlined text-secondary mt-1"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    phone_enabled
                  </span>
                  <div>
                    <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">Call Us</p>
                    <p className="font-body-md text-body-md text-foreground">+968 96680001</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <span
                    className="material-symbols-outlined text-secondary mt-1"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    mail
                  </span>
                  <div>
                    <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">Email Us</p>
                    <p className="font-body-md text-body-md text-foreground">dcenterfe@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="#e9c176"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-1 flex-shrink-0"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  <div>
                    <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">Instagram</p>
                    <a
                      href="https://instagram.com/center.decision"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body-md text-body-md text-foreground hover:text-secondary transition-colors"
                    >
                      center.decision
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-outline-variant/20 flex space-x-4 items-center animate-pulse">
                <span className="material-symbols-outlined text-outline text-3xl">verified_user</span>
                <p className="font-body-sm text-body-sm text-outline">Encrypted Communication Protocol Active</p>
              </div>
            </div>

            {/* Scheduling Interface */}
            <div className="md:col-span-8 bg-surface-container border border-outline-variant/20 p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
              <h3 className="font-display-lg text-headline-md text-foreground mb-2">Book Your Consultation Now</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-8">
                Select a date and slot for your confidential session.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Calendar Widget */}
                <div className="border border-outline-variant/20 bg-surface-dim p-4">
                  <div className="flex justify-between items-center mb-4">
                    <button 
                      onClick={handlePrevMonth}
                      className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-secondary"
                    >
                      chevron_left
                    </button>
                    <span id="current-month" className="font-data-tabular text-data-tabular text-foreground font-bold">
                      {monthNames[currentMonth]} {currentYear}
                    </span>
                    <button 
                      onClick={handleNextMonth}
                      className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-secondary"
                    >
                      chevron_right
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {["S", "M", "T", "W", "T", "F", "S"].map((d, index) => (
                      <div key={index} className="font-label-caps text-label-caps text-on-surface-variant text-[10px]">
                        {d}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {/* offset empty cells */}
                    {Array.from({ length: getFirstDayOffset(currentYear, currentMonth) }).map((_, i) => (
                      <div key={`offset-${i}`} className="p-2"></div>
                    ))}
                    {/* real days */}
                    {Array.from({ length: getDaysInMonth(currentYear, currentMonth) }, (_, i) => {
                      const dayNum = i + 1;
                      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
                      const isSelected = selectedDate === dateStr;
                      return (
                        <button
                          key={dayNum}
                          type="button"
                          onClick={() => setSelectedDate(dateStr)}
                          className={`p-2 font-data-tabular text-data-tabular text-foreground cursor-pointer hover:border hover:border-secondary ${
                            isSelected ? "border border-secondary text-secondary bg-secondary/10" : ""
                          }`}
                        >
                          {dayNum}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots & CTA */}
                <form onSubmit={handleConfirmConsultation} className="flex flex-col">
                  <p className="font-label-caps text-label-caps text-on-surface-variant mb-4">
                    Available Slots for {formatDate(selectedDate)}
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {timeSlots.map((slot) => {
                      const isSelected = selectedSlot === slot;
                      return (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`border py-2 font-data-tabular text-data-tabular transition-colors cursor-pointer ${
                            isSelected
                              ? "border-secondary text-secondary bg-secondary/10"
                              : "border-outline-variant/30 text-foreground bg-surface-dim hover:border-secondary hover:text-secondary"
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>

                  {/* Contact Fields */}
                  <div className="space-y-4 mb-6 text-left">
                    <div>
                      <label className="font-body-sm text-body-sm text-foreground block mb-1">Full Name</label>
                      <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Abdullah Al Rushdi"
                        className="w-full bg-surface-dim border border-outline-variant/30 text-foreground font-body-sm text-body-sm px-4 py-2.5 rounded-none focus:outline-none focus:border-secondary focus:ring-0 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="font-body-sm text-body-sm text-foreground block mb-1">Email Address</label>
                      <input
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="e.g. client@sovereign.om"
                        className="w-full bg-surface-dim border border-outline-variant/30 text-foreground font-body-sm text-body-sm px-4 py-2.5 rounded-none focus:outline-none focus:border-secondary focus:ring-0 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="font-body-sm text-body-sm text-foreground block mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="e.g. +968 96680001"
                        className="w-full bg-surface-dim border border-outline-variant/30 text-foreground font-body-sm text-body-sm px-4 py-2.5 rounded-none focus:outline-none focus:border-secondary focus:ring-0 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="font-body-sm text-body-sm text-foreground block mb-1">Requested Service</label>
                      <div className="relative">
                        <select
                          value={requestedService}
                          onChange={(e) => setRequestedService(e.target.value)}
                          className="w-full bg-surface-dim border border-outline-variant/30 text-foreground font-body-sm text-body-sm px-4 py-2.5 rounded-none focus:outline-none focus:border-secondary focus:ring-0 transition-colors appearance-none"
                        >
                          <option>Financial & Valuation Modeling</option>
                          <option>Evidentiary Feasibility Studies</option>
                          <option>Debt Restructuring & ERM</option>
                          <option>Sovereign Policy Support</option>
                          <option>Other Strategy Consultations</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-secondary text-primary-container py-4 font-label-caps text-label-caps font-semibold border border-secondary hover:bg-transparent hover:text-secondary transition-all duration-300 mt-auto shadow-[0_0_15px_rgba(197,160,89,0.2)] cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? "Scheduling..." : "Confirm Consultation"}
                  </button>
                  {showConfirmation && (
                    <div className="mt-4 text-secondary font-label-caps text-xs text-center border border-secondary/30 p-2 bg-secondary/5">
                      Secure Briefing Scheduled for {formatDate(selectedDate)} at {selectedSlot}!
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale="en" />
    </>
  );
}
