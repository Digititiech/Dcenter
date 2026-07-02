"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export default function Contact() {
  const [activeFAQ, setActiveFAQ] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<number>(8);
  const [selectedSlot, setSelectedSlot] = useState<string>("11:30 GST");
  const [showConfirmation, setShowConfirmation] = useState(false);

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

  const handleConfirmConsultation = () => {
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
    }, 5000);
  };

  const toggleFAQ = (id: string) => {
    setActiveFAQ(activeFAQ === id ? null : id);
  };

  const days = [
    { num: 1, current: false },
    { num: 2, current: false },
    { num: 3, current: false },
    { num: 4, current: false },
    { num: 5, current: true },
    { num: 6, current: true },
    { num: 7, current: true },
    { num: 8, current: true },
    { num: 9, current: true },
    { num: 10, current: true },
    { num: 11, current: false },
    { num: 12, current: false },
    { num: 13, current: true },
    { num: 14, current: true },
    { num: 15, current: true },
  ];

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
                  <span
                    className="material-symbols-outlined text-secondary mt-1"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    public
                  </span>
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
                    <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-secondary">
                      chevron_left
                    </span>
                    <span id="current-month" className="font-data-tabular text-data-tabular text-foreground font-bold">
                      October 2026
                    </span>
                    <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-secondary">
                      chevron_right
                    </span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {["S", "M", "T", "W", "T", "F", "S"].map((d, index) => (
                      <div key={index} className="font-label-caps text-label-caps text-on-surface-variant text-[10px]">
                        {d}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {/* offset for sun-mon-tue */}
                    <div></div>
                    <div></div>
                    <div></div>
                    {days.map((d, index) => {
                      if (!d.current) {
                        return (
                          <div key={index} className="p-2 font-data-tabular text-data-tabular text-outline-variant">
                            {d.num}
                          </div>
                        );
                      }
                      const isSelected = selectedDay === d.num;
                      return (
                        <div
                          key={index}
                          onClick={() => setSelectedDay(d.num)}
                          className={`p-2 font-data-tabular text-data-tabular text-foreground cursor-pointer hover:border hover:border-secondary ${
                            isSelected ? "border border-secondary text-secondary bg-secondary/10" : ""
                          }`}
                        >
                          {d.num}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots & CTA */}
                <div className="flex flex-col">
                  <p className="font-label-caps text-label-caps text-on-surface-variant mb-4">
                    Available Slots for Oct {selectedDay}
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {timeSlots.map((slot) => {
                      const isSelected = selectedSlot === slot;
                      return (
                        <button
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
                  <button
                    onClick={handleConfirmConsultation}
                    className="w-full bg-secondary text-primary-container py-4 font-label-caps text-label-caps font-semibold border border-secondary hover:bg-transparent hover:text-secondary transition-all duration-300 mt-auto shadow-[0_0_15px_rgba(197,160,89,0.2)] cursor-pointer"
                  >
                    Confirm Consultation
                  </button>
                  {showConfirmation && (
                    <div className="mt-4 text-secondary font-label-caps text-xs text-center border border-secondary/30 p-2 bg-secondary/5">
                      Secure Briefing Scheduled for Oct {selectedDay} at {selectedSlot}!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale="en" />
    </>
  );
}
