"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export default function ArabicContact() {
  const [activeFAQ, setActiveFAQ] = useState<string | null>(null);
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string>(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`);
  const [selectedSlot, setSelectedSlot] = useState<string>("11:30 GST");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [requestedService, setRequestedService] = useState("النمذجة والتقييم المالي");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [dayAvailability, setDayAvailability] = useState<{ is_available: boolean; time_from: string; time_to: string } | null>(null);
  const [busyTimeSlots, setBusyTimeSlots] = useState<{ start: string; end: string }[]>([]);
  const [dbBookings, setDbBookings] = useState<{ timeSlot: string }[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [timezoneValue, setTimezoneValue] = useState("Asia/Muscat");
  const [timezoneLabel, setTimezoneLabel] = useState("GST");

  const getTimezoneLabel = (tz: string) => {
    if (tz === "Asia/Riyadh") return "AST";
    if (tz === "Europe/London") return "GMT";
    if (tz === "UTC") return "UTC";
    return "GST";
  };

  const getTimezoneOffset = (tz: string) => {
    if (tz === "Asia/Riyadh") return "+03:00";
    if (tz === "Europe/London") return "+00:00";
    if (tz === "UTC") return "+00:00";
    return "+04:00";
  };

  const baseSlots = ["09:00", "11:30", "14:00", "16:00"];

  const getFilteredTimeSlots = () => {
    if (!dayAvailability || !dayAvailability.is_available) return [];
    
    const slots = baseSlots.map(time => `${time} ${timezoneLabel}`);
    return slots.filter(slot => {
      // 1. Check if within working hours
      const slotTime = slot.split(" ")[0]; // "09:00"
      if (slotTime < dayAvailability.time_from || slotTime > dayAvailability.time_to) {
        return false;
      }

      // 2. Check if already booked in DB
      const inDb = dbBookings.some(b => b.timeSlot === slot);
      if (inDb) return false;

      // 3. Check if overlaps with Google Calendar events
      const offset = getTimezoneOffset(timezoneValue);
      const slotStart = new Date(`${selectedDate}T${slotTime}:00${offset}`).getTime();
      const slotEnd = slotStart + 2.5 * 60 * 60 * 1000; // assume 2.5 hour slots
      
      const isBusy = busyTimeSlots.some(busy => {
        const busyStart = new Date(busy.start).getTime();
        const busyEnd = new Date(busy.end).getTime();
        return (slotStart >= busyStart && slotStart < busyEnd) || (slotEnd > busyStart && slotEnd <= busyEnd);
      });

      return !isBusy;
    });
  };

  useEffect(() => {
    const fetchSlotsAndAvailability = async () => {
      setLoadingSlots(true);
      const dateObj = new Date(selectedDate);
      const dayOfWeek = dateObj.getDay();

      // 1. Fetch Timezone and Availability from Supabase
      let selectedTz = "Asia/Muscat";
      if (isSupabaseConfigured()) {
        try {
          const { data: tzData } = await supabase
            .from("settings")
            .select("value")
            .eq("key", "calendar_timezone")
            .maybeSingle();
          if (tzData?.value) {
            selectedTz = tzData.value;
          }
        } catch (e) {
          console.error(e);
        }
        setTimezoneValue(selectedTz);
        setTimezoneLabel(getTimezoneLabel(selectedTz));

        try {
          const { data, error } = await supabase
            .from("calendar_availability")
            .select("*")
            .eq("day_of_week", dayOfWeek)
            .maybeSingle();
          if (!error && data) {
            setDayAvailability(data);
          } else {
            setDayAvailability({
              is_available: dayOfWeek !== 5 && dayOfWeek !== 6,
              time_from: "09:00",
              time_to: "18:00",
            });
          }
        } catch (e) {
          console.error(e);
        }
      } else {
        const savedTz = localStorage.getItem("calendar-timezone");
        if (savedTz) {
          selectedTz = savedTz;
        }
        setTimezoneValue(selectedTz);
        setTimezoneLabel(getTimezoneLabel(selectedTz));

        const localAvail = localStorage.getItem("calendar-availability");
        if (localAvail) {
          const list = JSON.parse(localAvail);
          const found = list.find((a: any) => a.day_of_week === dayOfWeek);
          setDayAvailability(found || { is_available: dayOfWeek !== 5 && dayOfWeek !== 6, time_from: "09:00", time_to: "18:00" });
        } else {
          setDayAvailability({
            is_available: dayOfWeek !== 5 && dayOfWeek !== 6,
            time_from: "09:00",
            time_to: "18:00",
          });
        }
      }

      // 2. Fetch Live Google Calendar Busy Slots
      if (isSupabaseConfigured()) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/google-calendar-auth?action=get-busy-slots&date=${selectedDate}`
          );
          if (res.ok) {
            const data = await res.json();
            if (data.connected && data.busySlots) {
              setBusyTimeSlots(data.busySlots);
            } else {
              setBusyTimeSlots([]);
            }
          }
        } catch (e) {
          console.error("Error fetching Google Calendar busy slots:", e);
          setBusyTimeSlots([]);
        }

        // 3. Fetch Database confirmed bookings for selected date
        try {
          const { data: dbB, error: dbBErr } = await supabase
            .from("bookings")
            .select("timeSlot")
            .eq("booking_date", selectedDate)
            .eq("status", "Confirmed");
          if (!dbBErr && dbB) {
            setDbBookings(dbB);
          } else {
            setDbBookings([]);
          }
        } catch (e) {
          console.error(e);
        }
      } else {
        const localBookings = localStorage.getItem("bookings-slots");
        const list = localBookings ? JSON.parse(localBookings) : [];
        const filtered = list
          .filter((b: any) => b.booking_date === selectedDate && b.status === "Confirmed")
          .map((b: any) => ({ timeSlot: b.timeSlot }));
        setDbBookings(filtered);
        setBusyTimeSlots([]);
      }
      setLoadingSlots(false);
    };

    fetchSlotsAndAvailability();
  }, [selectedDate]);

  // Set default selectedSlot once filtered changes
  useEffect(() => {
    const filtered = getFilteredTimeSlots();
    if (filtered.length > 0 && !filtered.includes(selectedSlot)) {
      setSelectedSlot(filtered[0]);
    }
  }, [dayAvailability, busyTimeSlots, dbBookings]);

  const faqs: FAQ[] = [
    {
      id: "faq1",
      question: "هل معلوماتي آمنة؟",
      answer:
        "يستخدم مركز القرار تشفيراً من الدرجة المصرفية وبروتوكولات عزل البيانات على المستوى السيادي. يتم استضافة جميع بيانات العملاء الخاصة في بيئات معزولة تماماً وقادرة على العمل دون اتصال بالإنترنت.",
    },
    {
      id: "faq2",
      question: "هل التقارير مقبولة رسمياً؟",
      answer:
        "نعم. يتم تنسيق تقارير المحاسبة الجنائية والتقييم الخاصة بنا بدقة للالتزام بالمتطلبات الإثباتية للنظام القضائي في سلطنة عمان، مما يوفر دعماً قوياً في قضايا التقاضي والتحكيم.",
    },
    {
      id: "faq3",
      question: "ما هي نسبة النجاح؟",
      answer:
        "تحافظ دراسات الجدوى التي يعدها مركز القرار على معدل قبول مؤسسي يتجاوز 94٪ لدى البنوك العمانية الكبرى وصناديق الثروة السيادية.",
    },
  ];

  const monthNames = [
    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
  ];

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOffset = (year: number, month: number) => new Date(year, month, 1).getDay();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("ar-EG", { month: "long", day: "numeric", year: "numeric" });
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

    const message = `مرحباً مركز القرار، أود حجز جلسة استشارية استراتيجية.\n\nتفاصيل العميل:\n- الاسم: ${clientName}\n- البريد الإلكتروني: ${clientEmail}\n- رقم الهاتف: ${clientPhone}\n- الخدمة المطلوبة: ${requestedService}\n\nالموعد المفضل: ${formatDate(selectedDate)} في الساعة ${selectedSlot}`;

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
      const clientMessage = `مرحباً ${clientName}، تم استلام طلب الاستشارة الاستراتيجية الخاص بك مع مركز القرار ليوم ${formatDate(selectedDate)} الساعة ${selectedSlot}. سنقوم بمراجعة طلبك وتأكيده قريباً.`;
      
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
      alert("فشل تقديم الطلب. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة عبر واتساب.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFAQ = (id: string) => {
    setActiveFAQ(activeFAQ === id ? null : id);
  };

  return (
    <>
      <Header locale="ar" />
      <main className="flex-grow pt-20">
        {/* Section: Conversion Header & Objection Handling */}
        <section className="px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <div className="md:col-span-5 flex flex-col justify-center">
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-foreground mb-6">
                امضِ قدماً <span className="text-secondary">بوضوح تام.</span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
                هيكلية تقاريرنا ذات المستوى المؤسسي لا تدع مجالاً للغموض. وجه اهتماماتك مباشرة أدناه.
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
                      className="w-full px-6 py-4 flex justify-between items-center text-right focus:outline-none cursor-pointer"
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
                اتصل بنا
              </h3>
              <div className="space-y-6 flex-grow">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <span
                    className="material-symbols-outlined text-secondary mt-1"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    location_on
                  </span>
                  <div>
                    <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">مكتبنا</p>
                    <p className="font-body-md text-body-md text-foreground">صحار، سلطنة عمان</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 space-x-reverse">
                  <span
                    className="material-symbols-outlined text-secondary mt-1"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    phone_enabled
                  </span>
                  <div>
                    <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">اتصل بنا</p>
                    <p className="font-body-md text-body-md text-foreground" dir="ltr">
                      +968 96680001
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 space-x-reverse">
                  <span
                    className="material-symbols-outlined text-secondary mt-1"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    mail
                  </span>
                  <div>
                    <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">بريدنا الإلكتروني</p>
                    <p className="font-body-md text-body-md text-foreground">dcenterfe@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 space-x-reverse">
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
                    <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">الانستجرام</p>
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
              <div className="mt-8 pt-8 border-t border-outline-variant/20 flex space-x-4 space-x-reverse items-center animate-pulse">
                <span className="material-symbols-outlined text-outline text-3xl">verified_user</span>
                <p className="font-body-sm text-body-sm text-outline">بروتوكول الاتصال المشفر نشط</p>
              </div>
            </div>

            {/* Scheduling Interface */}
            <div className="md:col-span-8 bg-surface-container border border-outline-variant/20 p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -ml-32 -mt-32 pointer-events-none"></div>
              <h3 className="font-display-lg text-headline-md text-foreground mb-2">احجز جلسة استشارية الآن</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-8">
                حدد تاريخاً وموعداً لجلستك السرية.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Calendar Widget */}
                <div className="border border-outline-variant/20 bg-surface-dim p-4">
                  <div className="flex justify-between items-center mb-4" dir="ltr">
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
                    {["ح", "ن", "ث", "ر", "خ", "ج", "س"].map((d, index) => (
                      <div key={index} className="font-label-caps text-label-caps text-on-surface-variant text-[10px]">
                        {d}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center" dir="ltr">
                    {/* offset slots */}
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
                    المواعيد المتاحة ليوم {formatDate(selectedDate)}
                  </p>
                  
                  {loadingSlots ? (
                    <div className="py-6 text-center text-xs text-secondary animate-pulse">
                      جاري التحقق من التوافر...
                    </div>
                  ) : !dayAvailability?.is_available ? (
                    <div className="py-6 text-center text-xs text-red-400 border border-red-500/20 bg-red-500/5 font-label-caps uppercase mb-6">
                      لا توجد ساعات عمل في هذا اليوم
                    </div>
                  ) : getFilteredTimeSlots().length === 0 ? (
                    <div className="py-6 text-center text-xs text-amber-400 border border-amber-500/20 bg-amber-500/5 font-label-caps uppercase mb-6">
                      جميع المواعيد محجوزة أو غير متاحة
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {getFilteredTimeSlots().map((slot) => {
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
                            dir="ltr"
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Contact Fields */}
                  <div className="space-y-4 mb-6 text-right">
                    <div>
                      <label className="font-body-sm text-body-sm text-foreground block mb-1">الاسم الكامل</label>
                      <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="مثال: عبدالله الروشدي"
                        className="w-full bg-surface-dim border border-outline-variant/30 text-foreground font-body-sm text-body-sm px-4 py-2.5 rounded-none focus:outline-none focus:border-secondary focus:ring-0 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="font-body-sm text-body-sm text-foreground block mb-1">البريد الإلكتروني</label>
                      <input
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="مثال: client@sovereign.om"
                        className="w-full bg-surface-dim border border-outline-variant/30 text-foreground font-body-sm text-body-sm px-4 py-2.5 rounded-none focus:outline-none focus:border-secondary focus:ring-0 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="font-body-sm text-body-sm text-foreground block mb-1">رقم الهاتف</label>
                      <input
                        type="tel"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="مثال: +968 96680001"
                        className="w-full bg-surface-dim border border-outline-variant/30 text-foreground font-body-sm text-body-sm px-4 py-2.5 rounded-none focus:outline-none focus:border-secondary focus:ring-0 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="font-body-sm text-body-sm text-foreground block mb-1">الخدمة المطلوبة</label>
                      <div className="relative">
                        <select
                          value={requestedService}
                          onChange={(e) => setRequestedService(e.target.value)}
                          className="w-full bg-surface-dim border border-outline-variant/30 text-foreground font-body-sm text-body-sm px-4 py-2.5 rounded-none focus:outline-none focus:border-secondary focus:ring-0 transition-colors appearance-none"
                        >
                          <option>النمذجة والتقييم المالي</option>
                          <option>دراسات الجدوى المعتمدة</option>
                          <option>إعادة هيكلة الديون وإدارة المخاطر</option>
                          <option>دعم السياسات السيادية</option>
                          <option>استشارات استراتيجية أخرى</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-secondary text-primary-container py-4 font-label-caps text-label-caps font-semibold border border-secondary hover:bg-transparent hover:text-secondary transition-all duration-300 mt-auto shadow-[0_0_15px_rgba(197,160,89,0.2)] cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? "جاري الحجز..." : "تأكيد الاستشارة"}
                  </button>
                  {showConfirmation && (
                    <div className="mt-4 text-secondary font-label-caps text-xs text-center border border-secondary/30 p-2 bg-secondary/5">
                      تم تأكيد موعد الاستشارة ليوم {formatDate(selectedDate)} في تمام الساعة {selectedSlot} بنجاح!
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale="ar" />
    </>
  );
}
