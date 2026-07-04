"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  timeframe: string;
  status: "Pending" | "Contacted" | "Qualified" | "Booked";
  created_at: string;
  notes?: string;
  flagged_for_followup?: boolean;
}

interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  day: number;
  timeSlot: string;
  status: "Pending" | "Confirmed" | "Rescheduled";
  booking_date?: string;
}

interface PresetMessage {
  id: string;
  title: string;
  text: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "crm" | "bookings" | "settings">("overview");
  const [activeSettingsTab, setActiveSettingsTab] = useState<"email" | "calendar" | "whatsapp">("email");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isUsingSupabase, setIsUsingSupabase] = useState(false);
  const [loading, setLoading] = useState(true);

  // SMTP Settings State
  const [smtpHost, setSmtpHost] = useState("smtp.gmail.com");
  const [smtpPort, setSmtpPort] = useState("587");
  const [smtpUser, setSmtpUser] = useState("dcenterfe@gmail.com");
  const [smtpPass, setSmtpPass] = useState("••••••••••••");
  const [calendarUrl, setCalendarUrl] = useState("https://calendar.google.com/calendar/ical/dcenter...");
  
  // Google Calendar Auth State
  const [gcalConnected, setGcalConnected] = useState(false);
  const [gcalEmail, setGcalEmail] = useState<string | null>(null);
  const [gcalLoading, setGcalLoading] = useState(false);

  // WhatsApp QR State
  const [waServerUrl, setWaServerUrl] = useState("https://wa.powerpod.ae");
  const [qrStatus, setQrStatus] = useState<"disconnected" | "generating" | "waiting" | "connected">("disconnected");
  const [serverOnline, setServerOnline] = useState(true);
  const [initializingWa, setInitializingWa] = useState(false);
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [connectionLogs, setConnectionLogs] = useState<string[]>([
    "[SYSTEM] Initiating WhatsApp bot client connection checker..."
  ]);
  const [connectedNumber, setConnectedNumber] = useState<string | null>(null);
  const [testNumber, setTestNumber] = useState("");
  const [testMessage, setTestMessage] = useState("Test message from Decision Center");
  const [sendingTest, setSendingTest] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);

  // CRM Chat Dialog State
  const [activeReachOutLead, setActiveReachOutLead] = useState<Lead | null>(null);
  const [customMessageText, setCustomMessageText] = useState("");
  const [sendingCrmMessage, setSendingCrmMessage] = useState(false);

  // CRM Lead Editing State
  const [activeEditLead, setActiveEditLead] = useState<Lead | null>(null);
  const [editLeadName, setEditLeadName] = useState("");
  const [editLeadEmail, setEditLeadEmail] = useState("");
  const [editLeadPhone, setEditLeadPhone] = useState("");
  const [editLeadCompany, setEditLeadCompany] = useState("");
  const [editLeadTimeframe, setEditLeadTimeframe] = useState("");
  const [editLeadNotes, setEditLeadNotes] = useState("");
  const [editLeadFlagged, setEditLeadFlagged] = useState(false);
  const [savingLeadDetails, setSavingLeadDetails] = useState(false);

  // SMTP Test State
  const [testEmailRecipient, setTestEmailRecipient] = useState("");
  const [sendingTestEmail, setSendingTestEmail] = useState(false);

  // Full Calendar State
  const today = new Date();
  const [currentCalendarYear, setCurrentCalendarYear] = useState(today.getFullYear());
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState(today.getMonth());
  const [selectedCalendarFilterDate, setSelectedCalendarFilterDate] = useState<string | null>(null);

  // Manual Booking Add State
  const [showingAddBookingModal, setShowingAddBookingModal] = useState(false);
  const [newBookingName, setNewBookingName] = useState("");
  const [newBookingEmail, setNewBookingEmail] = useState("");
  const [newBookingPhone, setNewBookingPhone] = useState("");
  const [newBookingDate, setNewBookingDate] = useState(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`);
  const [newBookingSlot, setNewBookingSlot] = useState("09:00 GST");
  const [newBookingStatus, setNewBookingStatus] = useState<"Pending" | "Confirmed" | "Rescheduled">("Confirmed");
  const [savingNewBooking, setSavingNewBooking] = useState(false);

  // Reschedule Booking Modal State
  const [activeRescheduleBooking, setActiveRescheduleBooking] = useState<Booking | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`);
  const [rescheduleSlot, setRescheduleSlot] = useState("09:00 GST");
  const [savingReschedule, setSavingReschedule] = useState(false);

  // Slots availability states for Add Booking Modal
  const [addModalDayAvailability, setAddModalDayAvailability] = useState<any>(null);
  const [addModalBusySlots, setAddModalBusySlots] = useState<{ start: string; end: string }[]>([]);
  const [addModalDbBookings, setAddModalDbBookings] = useState<{ timeSlot: string }[]>([]);
  const [loadingAddModalSlots, setLoadingAddModalSlots] = useState(false);

  // Slots availability states for Reschedule Booking Modal
  const [rescheduleModalDayAvailability, setRescheduleModalDayAvailability] = useState<any>(null);
  const [rescheduleModalBusySlots, setRescheduleModalBusySlots] = useState<{ start: string; end: string }[]>([]);
  const [rescheduleModalDbBookings, setRescheduleModalDbBookings] = useState<{ timeSlot: string }[]>([]);
  const [loadingRescheduleModalSlots, setLoadingRescheduleModalSlots] = useState(false);

  // Preset Template Management State
  const [presets, setPresets] = useState<PresetMessage[]>([]);
  const [editingPresetId, setEditingPresetId] = useState<string | null>(null);
  const [presetTitle, setPresetTitle] = useState("");
  const [presetText, setPresetText] = useState("");
  interface CalendarAvailability {
    day_of_week: number;
    is_available: boolean;
    time_from: string;
    time_to: string;
  }

  const [availabilities, setAvailabilities] = useState<CalendarAvailability[]>([
    { day_of_week: 0, is_available: true, time_from: "09:00", time_to: "18:00" },
    { day_of_week: 1, is_available: true, time_from: "09:00", time_to: "18:00" },
    { day_of_week: 2, is_available: true, time_from: "09:00", time_to: "18:00" },
    { day_of_week: 3, is_available: true, time_from: "09:00", time_to: "18:00" },
    { day_of_week: 4, is_available: true, time_from: "09:00", time_to: "18:00" },
    { day_of_week: 5, is_available: false, time_from: "09:00", time_to: "18:00" },
    { day_of_week: 6, is_available: false, time_from: "09:00", time_to: "18:00" },
  ]);
  const [savingAvailability, setSavingAvailability] = useState(false);
  const [calendarTimezone, setCalendarTimezone] = useState("Asia/Muscat");

  useEffect(() => {
    const loadSettings = async () => {
      // LocalStorage WhatsApp endpoint fallback
      let resolvedUrl = "https://wa.powerpod.ae";
      const savedUrl = localStorage.getItem("wa-server-url");
      if (savedUrl) resolvedUrl = savedUrl;

      // Calendar default fallbacks
      const savedCal = localStorage.getItem("calendar-subscription-url");
      if (savedCal) setCalendarUrl(savedCal);

      if (isSupabaseConfigured()) {
        try {
          const { data, error } = await supabase.from("settings").select("*");
          if (!error && data) {
            data.forEach((row: any) => {
              if (row.key === "smtp_host") setSmtpHost(row.value);
              if (row.key === "smtp_port") setSmtpPort(row.value);
              if (row.key === "smtp_user") setSmtpUser(row.value);
              if (row.key === "smtp_pass") setSmtpPass(row.value);
              if (row.key === "calendar_timezone") setCalendarTimezone(row.value);
              if (row.key === "wa_server_url") {
                setWaServerUrl(row.value);
                resolvedUrl = row.value;
              }
            });
          }
        } catch (err) {
          console.error("Failed to load settings from Supabase, falling back to LocalStorage:", err);
        }

        try {
          const { data: availData, error: availErr } = await supabase
            .from("calendar_availability")
            .select("*")
            .order("day_of_week", { ascending: true });
          if (!availErr && availData && availData.length > 0) {
            setAvailabilities(availData);
          }
        } catch (e) {
          console.error("Error loading availability settings:", e);
        }
      } else {
        const savedAvail = localStorage.getItem("calendar-availability");
        if (savedAvail) {
          setAvailabilities(JSON.parse(savedAvail));
        }
        const savedTz = localStorage.getItem("calendar-timezone");
        if (savedTz) {
          setCalendarTimezone(savedTz);
        }
      }

      setWaServerUrl(resolvedUrl);
    };

    loadSettings();
  }, [isUsingSupabase]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("admin-theme");
    if (savedTheme === "light") {
      setTheme("light");
    }
  }, []);

  const timeSlots = ["09:00 GST", "11:30 GST", "14:00 GST", "16:00 GST"];

  const getFilteredAddModalSlots = () => {
    if (!addModalDayAvailability || !addModalDayAvailability.is_available) return [];
    return timeSlots.filter(slot => {
      const slotTime = slot.split(" ")[0];
      if (slotTime < addModalDayAvailability.time_from || slotTime > addModalDayAvailability.time_to) return false;
      if (addModalDbBookings.some(b => b.timeSlot === slot)) return false;
      const slotStart = new Date(`${newBookingDate}T${slotTime}:00+04:00`).getTime();
      const slotEnd = slotStart + 2.5 * 60 * 60 * 1000;
      return !addModalBusySlots.some(busy => {
        const bStart = new Date(busy.start).getTime();
        const bEnd = new Date(busy.end).getTime();
        return (slotStart >= bStart && slotStart < bEnd) || (slotEnd > bStart && slotEnd <= bEnd);
      });
    });
  };

  const getFilteredRescheduleModalSlots = () => {
    if (!rescheduleModalDayAvailability || !rescheduleModalDayAvailability.is_available) return [];
    return timeSlots.filter(slot => {
      const slotTime = slot.split(" ")[0];
      if (slotTime < rescheduleModalDayAvailability.time_from || slotTime > rescheduleModalDayAvailability.time_to) return false;
      if (rescheduleModalDbBookings.some(b => b.timeSlot === slot)) return false;
      const slotStart = new Date(`${rescheduleDate}T${slotTime}:00+04:00`).getTime();
      const slotEnd = slotStart + 2.5 * 60 * 60 * 1000;
      return !rescheduleModalBusySlots.some(busy => {
        const bStart = new Date(busy.start).getTime();
        const bEnd = new Date(busy.end).getTime();
        return (slotStart >= bStart && slotStart < bEnd) || (slotEnd > bStart && slotEnd <= bEnd);
      });
    });
  };

  useEffect(() => {
    if (!showingAddBookingModal || !newBookingDate) return;
    const fetchAddModalSlots = async () => {
      setLoadingAddModalSlots(true);
      const dateObj = new Date(newBookingDate);
      const dayOfWeek = dateObj.getDay();

      if (isUsingSupabase) {
        try {
          const { data, error } = await supabase
            .from("calendar_availability")
            .select("*")
            .eq("day_of_week", dayOfWeek)
            .maybeSingle();
          if (!error && data) {
            setAddModalDayAvailability(data);
          } else {
            setAddModalDayAvailability({
              is_available: dayOfWeek !== 5 && dayOfWeek !== 6,
              time_from: "09:00",
              time_to: "18:00",
            });
          }
        } catch (e) {
          console.error(e);
        }
      } else {
        const localAvail = localStorage.getItem("calendar-availability");
        if (localAvail) {
          const list = JSON.parse(localAvail);
          const found = list.find((a: any) => a.day_of_week === dayOfWeek);
          setAddModalDayAvailability(found || { is_available: dayOfWeek !== 5 && dayOfWeek !== 6, time_from: "09:00", time_to: "18:00" });
        } else {
          setAddModalDayAvailability({
            is_available: dayOfWeek !== 5 && dayOfWeek !== 6,
            time_from: "09:00",
            time_to: "18:00",
          });
        }
      }

      if (isUsingSupabase) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/google-calendar-auth?action=get-busy-slots&date=${newBookingDate}`
          );
          if (res.ok) {
            const data = await res.json();
            if (data.connected && data.busySlots) {
              setAddModalBusySlots(data.busySlots);
            } else {
              setAddModalBusySlots([]);
            }
          }
        } catch (e) {
          console.error(e);
          setAddModalBusySlots([]);
        }

        try {
          const { data: dbB } = await supabase
            .from("bookings")
            .select("timeSlot")
            .eq("booking_date", newBookingDate)
            .eq("status", "Confirmed");
          if (dbB) setAddModalDbBookings(dbB);
          else setAddModalDbBookings([]);
        } catch (e) {
          console.error(e);
        }
      } else {
        const localBookings = localStorage.getItem("bookings-slots");
        const list = localBookings ? JSON.parse(localBookings) : [];
        const filtered = list
          .filter((b: any) => b.booking_date === newBookingDate && b.status === "Confirmed")
          .map((b: any) => ({ timeSlot: b.timeSlot }));
        setAddModalDbBookings(filtered);
        setAddModalBusySlots([]);
      }
      setLoadingAddModalSlots(false);
    };

    fetchAddModalSlots();
  }, [newBookingDate, showingAddBookingModal]);

  useEffect(() => {
    const filtered = getFilteredAddModalSlots();
    if (filtered.length > 0 && !filtered.includes(newBookingSlot)) {
      setNewBookingSlot(filtered[0]);
    }
  }, [addModalDayAvailability, addModalBusySlots, addModalDbBookings]);

  useEffect(() => {
    if (!activeRescheduleBooking || !rescheduleDate) return;
    const fetchRescheduleModalSlots = async () => {
      setLoadingRescheduleModalSlots(true);
      const dateObj = new Date(rescheduleDate);
      const dayOfWeek = dateObj.getDay();

      if (isUsingSupabase) {
        try {
          const { data, error } = await supabase
            .from("calendar_availability")
            .select("*")
            .eq("day_of_week", dayOfWeek)
            .maybeSingle();
          if (!error && data) {
            setRescheduleModalDayAvailability(data);
          } else {
            setRescheduleModalDayAvailability({
              is_available: dayOfWeek !== 5 && dayOfWeek !== 6,
              time_from: "09:00",
              time_to: "18:00",
            });
          }
        } catch (e) {
          console.error(e);
        }
      } else {
        const localAvail = localStorage.getItem("calendar-availability");
        if (localAvail) {
          const list = JSON.parse(localAvail);
          const found = list.find((a: any) => a.day_of_week === dayOfWeek);
          setRescheduleModalDayAvailability(found || { is_available: dayOfWeek !== 5 && dayOfWeek !== 6, time_from: "09:00", time_to: "18:00" });
        } else {
          setRescheduleModalDayAvailability({
            is_available: dayOfWeek !== 5 && dayOfWeek !== 6,
            time_from: "09:00",
            time_to: "18:00",
          });
        }
      }

      if (isUsingSupabase) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/google-calendar-auth?action=get-busy-slots&date=${rescheduleDate}`
          );
          if (res.ok) {
            const data = await res.json();
            if (data.connected && data.busySlots) {
              setRescheduleModalBusySlots(data.busySlots);
            } else {
              setRescheduleModalBusySlots([]);
            }
          }
        } catch (e) {
          console.error(e);
          setRescheduleModalBusySlots([]);
        }

        try {
          const { data: dbB } = await supabase
            .from("bookings")
            .select("timeSlot")
            .eq("booking_date", rescheduleDate)
            .eq("status", "Confirmed");
          if (dbB) setRescheduleModalDbBookings(dbB);
          else setRescheduleModalDbBookings([]);
        } catch (e) {
          console.error(e);
        }
      } else {
        const localBookings = localStorage.getItem("bookings-slots");
        const list = localBookings ? JSON.parse(localBookings) : [];
        const filtered = list
          .filter((b: any) => b.booking_date === rescheduleDate && b.status === "Confirmed")
          .map((b: any) => ({ timeSlot: b.timeSlot }));
        setRescheduleModalDbBookings(filtered);
        setRescheduleModalBusySlots([]);
      }
      setLoadingRescheduleModalSlots(false);
    };

    fetchRescheduleModalSlots();
  }, [rescheduleDate, activeRescheduleBooking]);

  useEffect(() => {
    const filtered = getFilteredRescheduleModalSlots();
    if (filtered.length > 0 && !filtered.includes(rescheduleSlot)) {
      setRescheduleSlot(filtered[0]);
    }
  }, [rescheduleModalDayAvailability, rescheduleModalBusySlots, rescheduleModalDbBookings]);

  useEffect(() => {
    const loadPresets = async () => {
      const defaultPresets: PresetMessage[] = [
        {
          id: "1",
          title: "Greeting & Inquiry Acknowledged",
          text: "Hello {name}, thank you for contacting Decision Center. We have received your inquiry for {company}. How can we assist you today?"
        },
        {
          id: "2",
          title: "Schedule Strategic Consultation",
          text: "Hello {name}, we would like to schedule a secure executive session to review your project. Please let us know your availability."
        },
        {
          id: "3",
          title: "Information & Documents Request",
          text: "Hello {name}, to proceed with your project analysis, could you please provide any business plans or feasibility drafts you currently have?"
        },
        {
          id: "4",
          title: "Oman Vision 2040 Advisory",
          text: "Hello {name}, regarding your inquiry aligned with Oman Vision 2040, we have specialized advisory programs. Let's arrange a call."
        }
      ];

      if (isSupabaseConfigured()) {
        try {
          const { data, error } = await supabase.from("whatsapp_presets").select("*").order("created_at", { ascending: true });
          if (!error && data && data.length > 0) {
            setPresets(data);
            return;
          }
          // Seed defaults in Supabase if empty
          if (data && data.length === 0) {
            const formattedDefaults = defaultPresets.map(({ title, text }) => ({ title, text }));
            const { data: inserted, error: insertErr } = await supabase.from("whatsapp_presets").insert(formattedDefaults).select();
            if (!insertErr && inserted) {
              setPresets(inserted);
              return;
            }
          }
        } catch (err) {
          console.error("Failed to load presets from database, falling back to LocalStorage:", err);
        }
      }

      const savedPresets = localStorage.getItem("whatsapp-presets");
      if (savedPresets) {
        setPresets(JSON.parse(savedPresets));
      } else {
        setPresets(defaultPresets);
        localStorage.setItem("whatsapp-presets", JSON.stringify(defaultPresets));
      }
    };

    loadPresets();
  }, [isUsingSupabase]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const pollWhatsAppStatus = async () => {
      if (!waServerUrl) return;
      try {
        const res = await fetch(`${waServerUrl}/api/whatsapp-status`);
        if (!res.ok) throw new Error("Server offline");
        const data = await res.json();
        setServerOnline(true);
        
        if (data.status === "connecting" || data.status === "initializing") {
          setQrStatus("generating");
          setConnectedNumber(null);
          setConnectionLogs(prev => {
            if (prev[prev.length - 1]?.includes("initializing")) return prev;
            return [...prev.slice(-10), "[SYSTEM] Bot is initializing instance..."];
          });
        } else if (data.status === "qr_ready") {
          setQrStatus("waiting");
          setConnectedNumber(null);
          if (data.qrCode) {
            setQrImage(data.qrCode);
          }
          if (data.logs && Array.isArray(data.logs)) {
            setConnectionLogs(data.logs);
          } else {
            setConnectionLogs(prev => {
              if (prev[prev.length - 1]?.includes("QR Code displayed")) return prev;
              return [...prev.slice(-10), "[SOCKET] QR Code displayed. Waiting for scanner handshake..."];
            });
          }
        } else if (data.status === "connected") {
          setQrStatus("connected");
          setQrImage(null);
          setConnectedNumber(data.connectedNumber || "Connected Device");
          if (data.logs && Array.isArray(data.logs)) {
            setConnectionLogs(data.logs);
          } else {
            setConnectionLogs(prev => {
              if (prev[prev.length - 1]?.includes("CONNECTED")) return prev;
              return [...prev.slice(-10), "[SOCKET] Handshake succeeded! Device authenticated.", "[SYSTEM] Session status: CONNECTED"];
            });
          }
        } else {
          setQrStatus("disconnected");
          setQrImage(null);
          setConnectedNumber(null);
        }
      } catch (err) {
        setServerOnline(false);
        setQrStatus("disconnected");
        setQrImage(null);
        setConnectedNumber(null);
        setConnectionLogs(prev => {
          if (prev[prev.length - 1]?.includes("Server offline")) return prev;
          return [...prev.slice(-10), `[SYSTEM] Server offline. Verify ${waServerUrl} is running.`];
        });
      }
    };

    pollWhatsAppStatus();
    interval = setInterval(pollWhatsAppStatus, 4000);

    return () => clearInterval(interval);
  }, [waServerUrl]);

  // CRM & Bookings Mock/DB State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Sample data to seed if DB is empty or not configured
  const mockLeads: Lead[] = [
    {
      id: "1",
      name: "Abdullah Al Rushdi",
      email: "a.rushdi@muscatfund.om",
      phone: "+968 96680101",
      company: "Muscat Sovereign Fund",
      timeframe: "Immediate (1-3 Business Days)",
      status: "Qualified",
      created_at: "2026-07-02T12:00:00Z",
    },
    {
      id: "2",
      name: "Fatma Al Balushi",
      email: "fatma@soharport.co.om",
      phone: "+968 91122334",
      company: "Sohar Logistics Hub",
      timeframe: "Standard (1-2 Weeks)",
      status: "Pending",
      created_at: "2026-07-01T15:30:00Z",
    },
    {
      id: "3",
      name: "Salim Al Habsi",
      email: "salim@habsigroup.com",
      phone: "+968 99887766",
      company: "Al Habsi Energy Partners",
      timeframe: "Exploratory (Q3 2026)",
      status: "Contacted",
      created_at: "2026-06-30T09:15:00Z",
    },
  ];

  const mockBookings: Booking[] = [
    {
      id: "1",
      clientName: "Abdullah Al Rushdi",
      clientEmail: "a.rushdi@muscatfund.om",
      clientPhone: "+968 96680101",
      day: 8,
      timeSlot: "11:30 GST",
      status: "Confirmed",
    },
    {
      id: "2",
      clientName: "Fatma Al Balushi",
      clientEmail: "fatma@soharport.co.om",
      clientPhone: "+968 91122334",
      day: 9,
      timeSlot: "14:00 GST",
      status: "Pending",
    },
  ];

  useEffect(() => {
    // Authenticate Admin Session
    const supabaseConfigured = isSupabaseConfigured();
    setIsUsingSupabase(supabaseConfigured);

    const checkSession = async () => {
      if (supabaseConfigured) {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.push("/admin/login");
          return;
        }
      } else {
        const isMockAuth = localStorage.getItem("mock-admin-auth");
        if (isMockAuth !== "true") {
          router.push("/admin/login");
          return;
        }
      }
      setLoading(false);
      fetchData(supabaseConfigured);
    };

    checkSession();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("gcal") === "success") {
      alert("Google Calendar connected successfully!");
      // Clean up the URL query params
      const newUrl = window.location.pathname + (activeTab !== "overview" ? `?tab=${activeTab}` : "");
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [activeTab]);

  const checkGoogleCalendarStatus = async () => {
    if (!isSupabaseConfigured()) {
      setGcalConnected(false);
      setGcalEmail(null);
      return;
    }
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setGcalConnected(false);
        setGcalEmail(null);
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/google-calendar-auth?action=status`,
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setGcalConnected(data.connected);
        setGcalEmail(data.email);
      } else {
        setGcalConnected(false);
        setGcalEmail(null);
      }
    } catch (e) {
      console.error("Error checking Google Calendar status:", e);
      setGcalConnected(false);
      setGcalEmail(null);
    }
  };

  useEffect(() => {
    checkGoogleCalendarStatus();
  }, [isUsingSupabase]);

  const handleConnectGoogleCalendar = async () => {
    setGcalLoading(true);
    try {
      if (isSupabaseConfigured()) {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          alert("Please sign in to your DC Console account to connect Google Calendar.");
          setGcalLoading(false);
          return;
        }
        const userId = session.user.id;
        // Redirect to Edge Function login action
        window.location.href = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/google-calendar-auth?action=login&userId=${userId}`;
      } else {
        alert("Google Calendar integration requires a configured Supabase environment.");
        setGcalLoading(false);
      }
    } catch (e) {
      console.error(e);
      setGcalLoading(false);
    }
  };

  const handleDisconnectGoogleCalendar = async () => {
    setGcalLoading(true);
    try {
      if (isSupabaseConfigured()) {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/google-calendar-auth?action=disconnect`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${session.access_token}`,
            },
          }
        );
        if (response.ok) {
          setGcalConnected(false);
          setGcalEmail(null);
          alert("Google Calendar disconnected.");
        } else {
          alert("Failed to disconnect Google Calendar.");
        }
      } else {
        alert("Google Calendar integration is not configured.");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGcalLoading(false);
    }
  };

  const handleSaveAvailability = async () => {
    setSavingAvailability(true);
    try {
      if (isSupabaseConfigured()) {
        for (const avail of availabilities) {
          const { error } = await supabase.from("calendar_availability").upsert({
            day_of_week: avail.day_of_week,
            is_available: avail.is_available,
            time_from: avail.time_from,
            time_to: avail.time_to,
          }, { onConflict: "day_of_week" });
          if (error) throw error;
        }
        alert("Availability settings saved to Database successfully!");
      } else {
        localStorage.setItem("calendar-availability", JSON.stringify(availabilities));
        alert("Availability settings saved to LocalStorage successfully!");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to save availability settings.");
    } finally {
      setSavingAvailability(false);
    }
  };

  const handleUpdateDayAvailability = (dayIndex: number, fields: Partial<CalendarAvailability>) => {
    const updated = availabilities.map(a => a.day_of_week === dayIndex ? { ...a, ...fields } : a);
    setAvailabilities(updated);
  };

  const fetchData = async (useDb: boolean) => {
    if (useDb) {
      try {
        // Fetch from Supabase tables
        const { data: dbLeads, error: leadsErr } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
        const { data: dbBookings, error: bookingsErr } = await supabase.from("bookings").select("*");

        if (!leadsErr && dbLeads) setLeads(dbLeads);
        else setLeads(mockLeads);

        if (!bookingsErr && dbBookings) setBookings(dbBookings);
        else setBookings(mockBookings);
      } catch (e) {
        console.error("Failed to fetch Supabase data:", e);
        setLeads(mockLeads);
        setBookings(mockBookings);
      }
    } else {
      // Load from LocalStorage or Fallback Mock
      const localLeads = localStorage.getItem("crm-leads");
      const localBookings = localStorage.getItem("bookings-slots");
      
      if (localLeads) {
        setLeads(JSON.parse(localLeads));
      } else {
        setLeads(mockLeads);
        localStorage.setItem("crm-leads", JSON.stringify(mockLeads));
      }

      if (localBookings) {
        setBookings(JSON.parse(localBookings));
      } else {
        setBookings(mockBookings);
        localStorage.setItem("bookings-slots", JSON.stringify(mockBookings));
      }
    }
  };

  const handleUpdateLeadStatus = async (leadId: string, newStatus: Lead["status"]) => {
    const updated = leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l);
    setLeads(updated);

    if (isUsingSupabase) {
      await supabase.from("leads").update({ status: newStatus }).eq("id", leadId);
    } else {
      localStorage.setItem("crm-leads", JSON.stringify(updated));
    }
  };

  const handleConfirmBooking = async (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    const updated = bookings.map(b => b.id === bookingId ? { ...b, status: "Confirmed" as const } : b);
    setBookings(updated);

    if (isUsingSupabase) {
      try {
        await supabase.from("bookings").update({ status: "Confirmed" }).eq("id", bookingId);
        
        // Sync to Google Calendar if configured
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const syncResponse = await fetch(
            `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/google-calendar-auth?action=create-event`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${session.access_token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ bookingId }),
            }
          );
          const syncData = await syncResponse.json();
          if (syncResponse.ok && syncData.success) {
            alert("Booking confirmed and synchronized to Google Calendar!");
          } else {
            console.warn("Booking confirmed but failed to sync with Google Calendar:", syncData.error);
          }
        }
      } catch (e) {
        console.error("Error confirming booking:", e);
      }
    } else {
      localStorage.setItem("bookings-slots", JSON.stringify(updated));
      alert("Mock Booking Confirmed!");
    }

    // Try to trigger automated WhatsApp confirmation message
    if (booking) {
      try {
        const msg = `Hello ${booking.clientName}, your strategic consultation slot with Decision Center is confirmed for October ${booking.day} at ${booking.timeSlot}. We look forward to our session.`;
        await fetch(`${waServerUrl}/api/send-whatsapp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            number: booking.clientPhone,
            message: msg
          })
        });
      } catch (err) {
        console.warn("Automated WhatsApp send failed (server likely offline):", err);
      }
    }
  };

  const handleRescheduleBooking = (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      setActiveRescheduleBooking(booking);
      setRescheduleDate(booking.booking_date || `2026-10-${String(booking.day).padStart(2, "0")}`);
      setRescheduleSlot(booking.timeSlot);
    }
  };

  const handleSaveReschedule = async () => {
    if (!activeRescheduleBooking) return;
    setSavingReschedule(true);

    const parsedDay = new Date(rescheduleDate).getDate();

    const updated = bookings.map(b =>
      b.id === activeRescheduleBooking.id
        ? {
            ...b,
            booking_date: rescheduleDate,
            day: parsedDay,
            timeSlot: rescheduleSlot,
            status: "Rescheduled" as const
          }
        : b
    );
    setBookings(updated);

    try {
      if (isUsingSupabase) {
        await supabase
          .from("bookings")
          .update({
            booking_date: rescheduleDate,
            day: parsedDay,
            timeSlot: rescheduleSlot,
            status: "Rescheduled"
          })
          .eq("id", activeRescheduleBooking.id);
      } else {
        localStorage.setItem("bookings-slots", JSON.stringify(updated));
      }
      alert("Booking rescheduled successfully!");
      setActiveRescheduleBooking(null);
    } catch (err) {
      console.error(err);
      alert("Error rescheduling booking");
    } finally {
      setSavingReschedule(false);
    }
  };

  const handleLogout = async () => {
    if (isUsingSupabase) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem("mock-admin-auth");
    }
    router.push("/admin/login");
  };

  const handleSendTestEmail = async () => {
    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !testEmailRecipient) {
      alert("Please fill out all SMTP credentials and the recipient email field");
      return;
    }
    setSendingTestEmail(true);
    try {
      const res = await fetch("/api/send-test-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          host: smtpHost,
          port: smtpPort,
          user: smtpUser,
          pass: smtpPass,
          to: testEmailRecipient
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert("Test email sent successfully! Please check your inbox.");
      } else {
        alert(`Failed to send test email: ${data.error || "Unknown error"}`);
      }
    } catch (err: any) {
      console.error(err);
      alert(`Error: ${err.message || err}`);
    } finally {
      setSendingTestEmail(false);
    }
  };

  const handleSaveSmtpSettings = async () => {
    if (isUsingSupabase) {
      try {
        const payload = [
          { key: "smtp_host", value: smtpHost },
          { key: "smtp_port", value: smtpPort },
          { key: "smtp_user", value: smtpUser },
          { key: "smtp_pass", value: smtpPass }
        ];
        const { error } = await supabase.from("settings").upsert(payload);
        if (error) throw error;
        alert("SMTP Settings saved in Database!");
      } catch (err) {
        console.error(err);
        alert("Failed to save SMTP settings in Database.");
      }
    } else {
      localStorage.setItem("smtp-host", smtpHost);
      localStorage.setItem("smtp-port", smtpPort);
      localStorage.setItem("smtp-user", smtpUser);
      localStorage.setItem("smtp-pass", smtpPass);
      alert("SMTP Settings saved in LocalStorage!");
    }
  };

  const handleSaveLeadDetails = async () => {
    if (!activeEditLead) return;
    setSavingLeadDetails(true);

    const updatedLead: Lead = {
      ...activeEditLead,
      name: editLeadName,
      email: editLeadEmail,
      phone: editLeadPhone,
      company: editLeadCompany,
      timeframe: editLeadTimeframe,
      notes: editLeadNotes,
      flagged_for_followup: editLeadFlagged
    };

    const updatedLeads = leads.map(l => l.id === activeEditLead.id ? updatedLead : l);
    setLeads(updatedLeads);

    try {
      if (isUsingSupabase) {
        await supabase
          .from("leads")
          .update({
            name: editLeadName,
            email: editLeadEmail,
            phone: editLeadPhone,
            company: editLeadCompany,
            timeframe: editLeadTimeframe,
            notes: editLeadNotes,
            flagged_for_followup: editLeadFlagged
          })
          .eq("id", activeEditLead.id);
      } else {
        localStorage.setItem("crm-leads", JSON.stringify(updatedLeads));
      }
      alert("Lead details updated successfully!");
      setActiveEditLead(null);
    } catch (err) {
      console.error(err);
      alert("Error saving lead details");
    } finally {
      setSavingLeadDetails(false);
    }
  };

  const handleAddBooking = async () => {
    if (!newBookingName || !newBookingEmail || !newBookingPhone || !newBookingDate || !newBookingSlot) {
      alert("Please fill out all fields");
      return;
    }
    setSavingNewBooking(true);

    const parsedDay = new Date(newBookingDate).getDate();

    const newBooking: Omit<Booking, "id"> = {
      clientName: newBookingName,
      clientEmail: newBookingEmail,
      clientPhone: newBookingPhone,
      day: parsedDay,
      timeSlot: newBookingSlot,
      status: newBookingStatus,
      booking_date: newBookingDate
    };

    try {
      if (isUsingSupabase) {
        const { data, error } = await supabase.from("bookings").insert(newBooking).select().single();
        if (error) throw error;
        if (data) {
          setBookings([...bookings, data]);
        }
      } else {
        const localBooking: Booking = {
          id: Date.now().toString(),
          ...newBooking
        };
        const updated = [...bookings, localBooking];
        setBookings(updated);
        localStorage.setItem("bookings-slots", JSON.stringify(updated));
      }

      alert("New booking added successfully!");
      setShowingAddBookingModal(false);
    } catch (err) {
      console.error(err);
      alert("Error adding manual booking");
    } finally {
      setSavingNewBooking(false);
    }
  };

  const handleSavePreset = async () => {
    if (!presetTitle || !presetText) {
      alert("Please enter title and text for the preset template");
      return;
    }

    if (isUsingSupabase) {
      try {
        if (editingPresetId) {
          const { error } = await supabase
            .from("whatsapp_presets")
            .update({ title: presetTitle, text: presetText })
            .eq("id", editingPresetId);
          if (error) throw error;
          
          setPresets(presets.map(p => p.id === editingPresetId ? { ...p, title: presetTitle, text: presetText } : p));
        } else {
          const { data, error } = await supabase
            .from("whatsapp_presets")
            .insert({ title: presetTitle, text: presetText })
            .select()
            .single();
          if (error) throw error;
          if (data) {
            setPresets([...presets, data]);
          }
        }
        setEditingPresetId(null);
        setPresetTitle("");
        setPresetText("");
        alert("Preset template saved in Database!");
      } catch (err) {
        console.error(err);
        alert("Failed to save preset to database.");
      }
    } else {
      let updated: PresetMessage[];
      if (editingPresetId) {
        updated = presets.map(p => p.id === editingPresetId ? { ...p, title: presetTitle, text: presetText } : p);
        setEditingPresetId(null);
      } else {
        const newPreset: PresetMessage = {
          id: Date.now().toString(),
          title: presetTitle,
          text: presetText
        };
        updated = [...presets, newPreset];
      }
      setPresets(updated);
      localStorage.setItem("whatsapp-presets", JSON.stringify(updated));
      setPresetTitle("");
      setPresetText("");
      alert("Preset template saved in LocalStorage!");
    }
  };

  const handleCancelEditPreset = () => {
    setEditingPresetId(null);
    setPresetTitle("");
    setPresetText("");
  };

  const handleDeletePreset = async (id: string) => {
    if (!confirm("Are you sure you want to delete this preset template?")) return;
    
    if (isUsingSupabase) {
      try {
        const { error } = await supabase.from("whatsapp_presets").delete().eq("id", id);
        if (error) throw error;
        setPresets(presets.filter(p => p.id !== id));
      } catch (err) {
        console.error(err);
        alert("Failed to delete preset from database.");
      }
    } else {
      const updated = presets.filter(p => p.id !== id);
      setPresets(updated);
      localStorage.setItem("whatsapp-presets", JSON.stringify(updated));
    }
  };

  const handleDisconnectWhatsApp = async () => {
    if (!confirm("Are you sure you want to disconnect WhatsApp? This will log out the session.")) return;
    setDisconnecting(true);
    try {
      const res = await fetch(`${waServerUrl}/api/disconnect-whatsapp`, {
        method: "POST"
      });
      if (res.ok) {
        alert("WhatsApp session disconnected successfully.");
        setQrStatus("disconnected");
        setConnectedNumber(null);
      } else {
        alert("Failed to disconnect WhatsApp.");
      }
    } catch (err) {
      console.error(err);
      alert("Error disconnecting WhatsApp.");
    } finally {
      setDisconnecting(false);
    }
  };

  const handleConnectWhatsApp = async () => {
    setInitializingWa(true);
    setQrStatus("generating");
    try {
      const res = await fetch(`${waServerUrl}/api/init-whatsapp`);
      if (res.ok) {
        const data = await res.json();
        setConnectionLogs(prev => [...prev.slice(-10), `[SYSTEM] Reconnect trigger sent: ${data.message || 'Initializing'}`]);
      } else {
        alert("Failed to send initialize request to WhatsApp server.");
      }
    } catch (err) {
      console.error(err);
      alert("Error contacting WhatsApp server for connection initialization.");
    } finally {
      setInitializingWa(false);
    }
  };

  const handleRefreshStatus = async () => {
    if (!waServerUrl) return;
    setConnectionLogs(prev => [...prev.slice(-10), "[SYSTEM] Querying WhatsApp status..."]);
    try {
      const res = await fetch(`${waServerUrl}/api/whatsapp-status`);
      if (!res.ok) throw new Error("Server offline");
      const data = await res.json();
      setServerOnline(true);
      if (data.status === "connecting" || data.status === "initializing") {
        setQrStatus("generating");
        setConnectedNumber(null);
      } else if (data.status === "qr_ready") {
        setQrStatus("waiting");
        setConnectedNumber(null);
        if (data.qrCode) setQrImage(data.qrCode);
      } else if (data.status === "connected") {
        setQrStatus("connected");
        setQrImage(null);
        setConnectedNumber(data.connectedNumber || "Connected Device");
      } else {
        setQrStatus("disconnected");
        setQrImage(null);
        setConnectedNumber(null);
      }
      alert(`WhatsApp Status refreshed: ${data.status}`);
    } catch (err) {
      setServerOnline(false);
      setQrStatus("disconnected");
      setQrImage(null);
      setConnectedNumber(null);
      alert("Failed to refresh status. WhatsApp Server is offline.");
    }
  };

  const handleSendTestMessage = async () => {
    if (!testNumber) {
      alert("Please enter a valid phone number");
      return;
    }
    setSendingTest(true);
    try {
      const res = await fetch(`${waServerUrl}/api/send-whatsapp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          number: testNumber,
          message: testMessage
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert("Test message sent successfully!");
      } else {
        alert(`Failed to send test message: ${data.error || "Unknown error"}`);
      }
    } catch (err: any) {
      console.error(err);
      alert(`Error sending test message: ${err.message || err}`);
    } finally {
      setSendingTest(false);
    }
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOffset = (year: number, month: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentCalendarYear, currentCalendarMonth);
  const firstDayOffset = getFirstDayOffset(currentCalendarYear, currentCalendarMonth);

  const getBookingDateString = (b: Booking) => {
    if (b.booking_date) return b.booking_date;
    return `2026-10-${String(b.day).padStart(2, "0")}`;
  };

  const formatFriendlyDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    } catch (e) {
      return dateStr;
    }
  };

  const handlePrevMonth = () => {
    if (currentCalendarMonth === 0) {
      setCurrentCalendarMonth(11);
      setCurrentCalendarYear(currentCalendarYear - 1);
    } else {
      setCurrentCalendarMonth(currentCalendarMonth - 1);
    }
    setSelectedCalendarFilterDate(null);
  };

  const handleNextMonth = () => {
    if (currentCalendarMonth === 11) {
      setCurrentCalendarMonth(0);
      setCurrentCalendarYear(currentCalendarYear + 1);
    } else {
      setCurrentCalendarMonth(currentCalendarMonth + 1);
    }
    setSelectedCalendarFilterDate(null);
  };

  // Filter bookings
  const filteredBookings = bookings.filter(b => {
    if (!selectedCalendarFilterDate) return true;
    return getBookingDateString(b) === selectedCalendarFilterDate;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070707]">
        <div className="text-secondary font-label-caps animate-pulse">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className={`flex h-screen overflow-hidden bg-[#070707] ${theme === "light" ? "light-admin" : ""}`}>
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#111110] border-r border-outline-variant/10 flex flex-col justify-between">
        <div>
          <div className="p-6 border-b border-outline-variant/10">
            <h2 className="font-display-lg text-headline-sm text-foreground tracking-wider">
              DC Portal
            </h2>
            <p className="font-body-sm text-[10px] text-secondary uppercase tracking-widest mt-1">
              {isUsingSupabase ? "Supabase Connected" : "Local Mock Sandbox"}
            </p>
          </div>
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left font-label-caps text-label-caps transition-colors cursor-pointer ${
                activeTab === "overview" ? "bg-secondary/10 text-secondary border-l-2 border-secondary" : "text-on-surface-variant hover:text-foreground"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              Overview
            </button>
            <button
              onClick={() => setActiveTab("crm")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left font-label-caps text-label-caps transition-colors cursor-pointer ${
                activeTab === "crm" ? "bg-secondary/10 text-secondary border-l-2 border-secondary" : "text-on-surface-variant hover:text-foreground"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">people</span>
              CRM Leads
            </button>
            <button
              onClick={() => setActiveTab("bookings")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left font-label-caps text-label-caps transition-colors cursor-pointer ${
                activeTab === "bookings" ? "bg-secondary/10 text-secondary border-l-2 border-secondary" : "text-on-surface-variant hover:text-foreground"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              Bookings
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left font-label-caps text-label-caps transition-colors cursor-pointer ${
                activeTab === "settings" ? "bg-secondary/10 text-secondary border-l-2 border-secondary" : "text-on-surface-variant hover:text-foreground"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">settings</span>
              Settings
            </button>
          </nav>
        </div>
        <div className="p-4 border-t border-outline-variant/10 space-y-3">
          <button
            onClick={() => {
              const next = theme === "dark" ? "light" : "dark";
              setTheme(next);
              localStorage.setItem("admin-theme", next);
            }}
            className="w-full flex items-center justify-center gap-2 border border-outline-variant/30 hover:border-secondary hover:text-secondary text-foreground py-2.5 font-label-caps text-label-caps transition-all cursor-pointer text-xs"
          >
            <span className="material-symbols-outlined text-sm">
              {theme === "light" ? "dark_mode" : "light_mode"}
            </span>
            {theme === "light" ? "Dark Theme" : "Light Theme"}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 border border-red-500/30 bg-red-500/5 hover:bg-red-500/10 text-red-400 py-2.5 font-label-caps text-label-caps transition-all cursor-pointer text-xs"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            Exit Console
          </button>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-grow flex flex-col overflow-y-auto bg-[#070707] p-8">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h1 className="font-display-lg text-display-md text-foreground">Operational Overview</h1>
              <p className="font-body-md text-body-md text-on-surface-variant">Real-time system health and action center.</p>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-[#111110] border border-outline-variant/15 p-6 relative overflow-hidden">
                <span className="material-symbols-outlined absolute right-4 top-4 text-secondary/10 text-6xl">people</span>
                <p className="font-label-caps text-label-caps text-on-surface-variant">Total Leads</p>
                <p className="font-display-lg text-display-lg text-foreground mt-2">{leads.length}</p>
              </div>
              <div className="bg-[#111110] border border-outline-variant/15 p-6 relative overflow-hidden">
                <span className="material-symbols-outlined absolute right-4 top-4 text-secondary/10 text-6xl">calendar_today</span>
                <p className="font-label-caps text-label-caps text-on-surface-variant">Active Bookings</p>
                <p className="font-display-lg text-display-lg text-foreground mt-2">
                  {bookings.filter(b => b.status === "Confirmed").length}
                </p>
              </div>
              <div className="bg-[#111110] border border-outline-variant/15 p-6 relative overflow-hidden">
                <span className="material-symbols-outlined absolute right-4 top-4 text-secondary/10 text-6xl">mail</span>
                <p className="font-label-caps text-label-caps text-on-surface-variant">SMTP Status</p>
                <p className="font-display-lg text-headline-lg text-emerald-400 mt-4 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Active
                </p>
              </div>
              <div className="bg-[#111110] border border-outline-variant/15 p-6 relative overflow-hidden">
                <span className="material-symbols-outlined absolute right-4 top-4 text-secondary/10 text-6xl">qr_code_2</span>
                <p className="font-label-caps text-label-caps text-on-surface-variant">WhatsApp Link</p>
                <p className={`font-display-lg text-headline-lg mt-4 flex items-center gap-2 ${
                  qrStatus === "connected" ? "text-emerald-400" : "text-amber-400"
                }`}>
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    qrStatus === "connected" ? "bg-emerald-400" : "bg-amber-400 animate-pulse"
                  }`}></span>
                  {qrStatus === "connected" ? "Connected" : "Offline"}
                </p>
              </div>
            </div>

            {/* Quick Activity Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-[#111110] border border-outline-variant/10 p-6">
                <h3 className="font-display-lg text-headline-md text-foreground mb-4 pb-2 border-b border-outline-variant/10">
                  Recent Booking Requests
                </h3>
                <div className="space-y-4">
                  {bookings.filter(b => b.status === "Pending").map(b => (
                    <div key={b.id} className="flex justify-between items-center bg-[#181817] p-4 border border-outline-variant/5">
                      <div>
                        <p className="font-body-md text-foreground font-semibold">{b.clientName}</p>
                        <p className="font-body-sm text-[12px] text-on-surface-variant">
                          Oct {b.day} at {b.timeSlot}
                        </p>
                      </div>
                      <button
                        onClick={() => handleConfirmBooking(b.id)}
                        className="bg-secondary text-primary-container px-3 py-1.5 font-label-caps text-[10px] uppercase border border-secondary hover:bg-transparent hover:text-secondary transition-colors cursor-pointer"
                      >
                        Confirm
                      </button>
                    </div>
                  ))}
                  {bookings.filter(b => b.status === "Pending").length === 0 && (
                    <p className="font-body-sm text-body-sm text-on-surface-variant text-center py-4">No pending requests.</p>
                  )}
                </div>
              </div>

              <div className="bg-[#111110] border border-outline-variant/10 p-6">
                <h3 className="font-display-lg text-headline-md text-foreground mb-4 pb-2 border-b border-outline-variant/10">
                  Recent Inbound Leads
                </h3>
                <div className="space-y-4">
                  {leads.slice(0, 3).map(l => (
                    <div key={l.id} className="flex justify-between items-center bg-[#181817] p-4 border border-outline-variant/5">
                      <div>
                        <p className="font-body-md text-foreground font-semibold">{l.name}</p>
                        <p className="font-body-sm text-[12px] text-secondary">{l.company}</p>
                      </div>
                      <span className="px-2.5 py-1 text-[10px] font-label-caps uppercase border border-outline-variant/30 text-on-surface-variant bg-surface-container">
                        {l.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CRM LEADS */}
        {activeTab === "crm" && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="font-display-lg text-display-md text-foreground">Qualification Engine CRM</h1>
                <p className="font-body-md text-body-md text-on-surface-variant">List of institutional inquiries and lead profiles.</p>
              </div>
            </div>

            <div className="bg-[#111110] border border-outline-variant/10 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/15 bg-surface-container-high">
                    <th className="p-4 font-label-caps text-label-caps text-on-surface-variant">Name</th>
                    <th className="p-4 font-label-caps text-label-caps text-on-surface-variant">Company</th>
                    <th className="p-4 font-label-caps text-label-caps text-on-surface-variant">Contact</th>
                    <th className="p-4 font-label-caps text-label-caps text-on-surface-variant">Timeframe</th>
                    <th className="p-4 font-label-caps text-label-caps text-on-surface-variant">Status</th>
                    <th className="p-4 font-label-caps text-label-caps text-on-surface-variant text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {leads.map(lead => (
                    <tr key={lead.id} className="hover:bg-surface-container-low transition-colors">
                      <td className="p-4 font-body-md text-body-md text-foreground">
                        <div className="font-semibold flex items-center gap-2">
                          {lead.name}
                          {lead.flagged_for_followup && (
                            <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }} title="Flagged for follow-up">
                              flag
                            </span>
                          )}
                        </div>
                        {lead.notes && (
                          <div className="text-[10px] text-secondary mt-0.5 max-w-xs truncate italic" title={lead.notes}>
                            Note: {lead.notes}
                          </div>
                        )}
                      </td>
                      <td className="p-4 font-body-md text-body-md text-foreground">{lead.company}</td>
                      <td className="p-4 font-body-sm text-body-sm text-on-surface-variant">
                        <div>{lead.email}</div>
                        <div className="mt-0.5">{lead.phone}</div>
                      </td>
                      <td className="p-4 font-body-sm text-[12px] text-secondary">{lead.timeframe}</td>
                      <td className="p-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as any)}
                          className="bg-[#181817] border border-outline-variant/30 text-foreground font-body-sm text-xs px-2.5 py-1.5 focus:outline-none focus:border-secondary"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Qualified">Qualified</option>
                          <option value="Booked">Booked</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              setActiveReachOutLead(lead);
                              setCustomMessageText(`Hello ${lead.name}, thank you for contacting Decision Center. We have received your inquiry.`);
                            }}
                            className="inline-flex items-center gap-1.5 border border-secondary/20 hover:border-secondary hover:text-secondary px-2.5 py-1.5 font-label-caps text-[10px] transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-xs">chat</span> Reach Out
                          </button>
                          <button
                            onClick={() => {
                              setActiveEditLead(lead);
                              setEditLeadName(lead.name);
                              setEditLeadEmail(lead.email);
                              setEditLeadPhone(lead.phone);
                              setEditLeadCompany(lead.company);
                              setEditLeadTimeframe(lead.timeframe);
                              setEditLeadNotes(lead.notes || "");
                              setEditLeadFlagged(!!lead.flagged_for_followup);
                            }}
                            className="inline-flex items-center gap-1.5 border border-outline-variant/30 hover:border-secondary hover:text-secondary px-2.5 py-1.5 font-label-caps text-[10px] transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-xs">edit</span> Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: BOOKINGS */}
        {activeTab === "bookings" && (
          <div className="space-y-8 animate-fade-in text-left">
              <div>
                <h1 className="font-display-lg text-display-md text-foreground">Consultation Calendar</h1>
                <p className="font-body-md text-body-md text-on-surface-variant">Manage scheduled institutional sessions and confirmation queue.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* List of Bookings */}
                <div className="lg:col-span-7 bg-[#111110] border border-outline-variant/10 p-6 space-y-6">
                  <div className="flex justify-between items-center pb-2 border-b border-outline-variant/10">
                    <div>
                      <h3 className="font-display-lg text-headline-md text-foreground">
                        Scheduled Bookings List
                      </h3>
                      {selectedCalendarFilterDate && (
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-secondary font-semibold">
                            Date: {formatFriendlyDate(selectedCalendarFilterDate)}
                          </p>
                          <button
                            onClick={() => setSelectedCalendarFilterDate(null)}
                            className="text-[10px] text-red-400 hover:text-red-300 font-label-caps border border-red-500/20 px-1.5 py-0.5 rounded cursor-pointer"
                          >
                            Clear Filter
                          </button>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setNewBookingName("");
                        setNewBookingEmail("");
                        setNewBookingPhone("");
                        setNewBookingDate(`${currentCalendarYear}-${String(currentCalendarMonth + 1).padStart(2, "0")}-01`);
                        setNewBookingSlot("09:00 AM");
                        setNewBookingStatus("Confirmed");
                        setShowingAddBookingModal(true);
                      }}
                      className="inline-flex items-center gap-1 bg-secondary text-primary-container hover:bg-transparent hover:text-secondary px-3 py-1.5 font-label-caps text-[10px] border border-secondary transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">add</span> Add Booking
                    </button>
                  </div>
                  <div className="space-y-4">
                    {filteredBookings.map(b => (
                      <div key={b.id} className="border border-outline-variant/15 bg-[#181817] p-5 flex flex-col sm:flex-row justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <h4 className="font-body-md text-body-md text-foreground font-bold">{b.clientName}</h4>
                            <span className={`px-2 py-0.5 text-[8px] font-label-caps uppercase ${
                              b.status === "Confirmed" ? "border border-emerald-400/30 text-emerald-400" : "border border-amber-400/30 text-amber-400"
                            }`}>
                              {b.status}
                            </span>
                          </div>
                          <p className="font-body-sm text-[12px] text-on-surface-variant mt-1">
                            Email: {b.clientEmail} | Phone: {b.clientPhone}
                          </p>
                          <p className="font-body-md text-body-sm text-secondary mt-2 flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px]">schedule</span>
                            {formatFriendlyDate(getBookingDateString(b))} at {b.timeSlot}
                          </p>
                        </div>

                        <div className="flex sm:flex-col justify-end gap-2">
                          {b.status !== "Confirmed" && (
                            <button
                              onClick={() => handleConfirmBooking(b.id)}
                              className="bg-secondary text-primary-container px-4 py-2 font-label-caps text-[10px] uppercase border border-secondary hover:bg-transparent hover:text-secondary transition-all cursor-pointer"
                            >
                              Confirm
                            </button>
                          )}
                          <button
                            onClick={() => handleRescheduleBooking(b.id)}
                            className="border border-outline-variant/30 text-foreground hover:border-secondary hover:text-secondary px-4 py-2 font-label-caps text-[10px] uppercase transition-colors cursor-pointer"
                          >
                            Reschedule
                          </button>
                        </div>
                      </div>
                    ))}
                    {filteredBookings.length === 0 && (
                      <p className="font-body-sm text-body-sm text-on-surface-variant text-center py-8">No scheduled sessions for this selection.</p>
                    )}
                  </div>
                </div>

                {/* Dynamic Full Calendar View */}
                <div className="lg:col-span-5 bg-[#111110] border border-outline-variant/10 p-6 flex flex-col">
                  <div className="flex justify-between items-center border-b border-outline-variant/10 pb-2 mb-6">
                    <h3 className="font-display-lg text-headline-md text-foreground">
                      Calendar View
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePrevMonth}
                        className="p-1 hover:text-secondary cursor-pointer text-foreground"
                      >
                        <span className="material-symbols-outlined text-sm">chevron_left</span>
                      </button>
                      <span className="font-data-tabular text-[12px] text-foreground font-bold tracking-wider uppercase min-w-[120px] text-center">
                        {monthNames[currentCalendarMonth]} {currentCalendarYear}
                      </span>
                      <button
                        onClick={handleNextMonth}
                        className="p-1 hover:text-secondary cursor-pointer text-foreground"
                      >
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                      </button>
                    </div>
                  </div>
                  <div className="border border-outline-variant/20 bg-surface-dim p-4 flex-grow">
                    <div className="grid grid-cols-7 gap-1 text-center mb-2">
                      {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                        <div key={i} className="font-label-caps text-label-caps text-on-surface-variant text-[10px] font-bold">
                          {d}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {/* Offset empty boxes */}
                      {Array.from({ length: firstDayOffset }).map((_, i) => (
                        <div key={`offset-${i}`} className="p-2 opacity-20"></div>
                      ))}
                      {/* Real days */}
                      {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                        const dateStr = `${currentCalendarYear}-${String(currentCalendarMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                        const dayBookings = bookings.filter(b => getBookingDateString(b) === dateStr);
                        const hasConfirmed = dayBookings.some(b => b.status === "Confirmed");
                        const hasPending = dayBookings.some(b => b.status === "Pending");

                        let bgClass = "hover:bg-surface-container-high cursor-pointer transition-colors";
                        if (selectedCalendarFilterDate === dateStr) {
                          bgClass = "bg-secondary text-primary-container font-bold border border-secondary";
                        } else if (hasConfirmed) {
                          bgClass = "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 cursor-pointer";
                        } else if (hasPending) {
                          bgClass = "bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 cursor-pointer";
                        }

                        return (
                          <button
                            key={day}
                            onClick={() => setSelectedCalendarFilterDate(selectedCalendarFilterDate === dateStr ? null : dateStr)}
                            className={`p-2 font-data-tabular text-data-tabular text-foreground text-xs h-10 flex flex-col justify-between items-center relative rounded-none border border-transparent ${bgClass}`}
                          >
                            <span className={selectedCalendarFilterDate === dateStr ? "text-primary-container font-bold" : "text-foreground"}>
                              {day}
                            </span>
                            {dayBookings.length > 0 && (
                              <span className={`w-1.5 h-1.5 rounded-full ${selectedCalendarFilterDate === dateStr ? "bg-primary-container" : "bg-secondary"}`}></span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )}

        {/* TAB 4: SETTINGS */}
        {activeTab === "settings" && (
          <div className="space-y-8 max-w-4xl animate-fade-in">
            <div>
              <h1 className="font-display-lg text-display-md text-foreground">System Integration Settings</h1>
              <p className="font-body-md text-body-md text-on-surface-variant">Configure SMTP emails, calendar syncing, and WhatsApp endpoints.</p>
            </div>

            {/* Settings Sub-Tab Navigation */}
            <div className="flex border-b border-outline-variant/10 gap-6">
              <button
                onClick={() => setActiveSettingsTab("email")}
                className={`pb-3 font-label-caps text-[11px] uppercase tracking-wider transition-all cursor-pointer border-b-2 ${
                  activeSettingsTab === "email"
                    ? "border-secondary text-secondary font-bold"
                    : "border-transparent text-on-surface-variant hover:text-foreground"
                }`}
              >
                Email Settings
              </button>
              <button
                onClick={() => setActiveSettingsTab("calendar")}
                className={`pb-3 font-label-caps text-[11px] uppercase tracking-wider transition-all cursor-pointer border-b-2 ${
                  activeSettingsTab === "calendar"
                    ? "border-secondary text-secondary font-bold"
                    : "border-transparent text-on-surface-variant hover:text-foreground"
                }`}
              >
                Calendar Settings
              </button>
              <button
                onClick={() => setActiveSettingsTab("whatsapp")}
                className={`pb-3 font-label-caps text-[11px] uppercase tracking-wider transition-all cursor-pointer border-b-2 ${
                  activeSettingsTab === "whatsapp"
                    ? "border-secondary text-secondary font-bold"
                    : "border-transparent text-on-surface-variant hover:text-foreground"
                }`}
              >
                WhatsApp Settings
              </button>
            </div>

            {/* Sub-Tab 1: Email Configuration */}
            {activeSettingsTab === "email" && (
              <div className="space-y-6 animate-fade-in">
                {/* SMTP Settings */}
                <div className="bg-[#111110] border border-outline-variant/10 p-6 space-y-5">
                  <h3 className="font-display-lg text-headline-md text-foreground border-b border-outline-variant/10 pb-2">
                    Email SMTP Configuration
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-body-sm text-body-sm text-foreground">SMTP Server</label>
                      <input
                        type="text"
                        value={smtpHost}
                        onChange={(e) => setSmtpHost(e.target.value)}
                        className="w-full bg-[#181817] border border-outline-variant/30 text-foreground font-body-sm text-body-sm px-4 py-2.5 focus:outline-none focus:border-secondary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-body-sm text-body-sm text-foreground">SMTP Port</label>
                      <input
                        type="text"
                        value={smtpPort}
                        onChange={(e) => setSmtpPort(e.target.value)}
                        className="w-full bg-[#181817] border border-outline-variant/30 text-foreground font-body-sm text-body-sm px-4 py-2.5 focus:outline-none focus:border-secondary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-body-sm text-body-sm text-foreground">Username</label>
                      <input
                        type="text"
                        value={smtpUser}
                        onChange={(e) => setSmtpUser(e.target.value)}
                        className="w-full bg-[#181817] border border-outline-variant/30 text-foreground font-body-sm text-body-sm px-4 py-2.5 focus:outline-none focus:border-secondary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-body-sm text-body-sm text-foreground">Password</label>
                      <input
                        type="password"
                        value={smtpPass}
                        onChange={(e) => setSmtpPass(e.target.value)}
                        className="w-full bg-[#181817] border border-outline-variant/30 text-foreground font-body-sm text-body-sm px-4 py-2.5 focus:outline-none focus:border-secondary"
                      />
                    </div>
                  </div>
                  <button
                    className="bg-secondary text-primary-container px-4 py-3 font-label-caps text-label-caps border border-secondary hover:bg-transparent hover:text-secondary transition-colors cursor-pointer"
                    onClick={handleSaveSmtpSettings}
                  >
                    Save Mail Credentials
                  </button>

                  {/* Send Test Email Card */}
                  <div className="border-t border-outline-variant/10 pt-5 space-y-4">
                    <h4 className="font-body-md text-body-md text-foreground font-semibold">Send Test Email</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                      <div className="space-y-1 sm:col-span-2">
                        <label className="font-body-sm text-[10px] text-on-surface-variant uppercase tracking-widest block">Recipient Email Address</label>
                        <input
                          type="email"
                          placeholder="e.g. test@example.com"
                          value={testEmailRecipient}
                          onChange={(e) => setTestEmailRecipient(e.target.value)}
                          className="w-full bg-[#181817] border border-outline-variant/30 text-foreground font-body-sm text-xs px-3 py-2 focus:outline-none focus:border-secondary"
                        />
                      </div>
                      <div className="sm:col-span-1">
                        <button
                          onClick={handleSaveSmtpSettings}
                          disabled={sendingTestEmail}
                          className="w-full bg-secondary text-primary-container px-4 py-2 font-label-caps text-[10px] border border-secondary hover:bg-transparent hover:text-secondary disabled:opacity-40 disabled:hover:bg-secondary disabled:hover:text-primary-container transition-colors cursor-pointer h-[34px] flex items-center justify-center"
                        >
                          {sendingTestEmail ? "Sending..." : "Send Test Email"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-Tab 2: Calendar Synchronization & Availability */}
            {activeSettingsTab === "calendar" && (
              <div className="space-y-6 animate-fade-in">
                {/* Google Calendar API Integration */}
                <div className="bg-[#111110] border border-outline-variant/10 p-6 space-y-5">
                  <h3 className="font-display-lg text-headline-md text-foreground border-b border-outline-variant/10 pb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">calendar_today</span>
                    Google Calendar OAuth Integration
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Authorize Decision Center to synchronize consultation bookings directly to your Google Calendar.
                  </p>
                  <div className="flex items-center gap-4 bg-[#181817] p-4 border border-outline-variant/10">
                    <div className="w-10 h-10 rounded-none bg-surface-container flex items-center justify-center border border-outline-variant/30 flex-shrink-0">
                      <span className={`material-symbols-outlined ${gcalConnected ? 'text-emerald-400' : 'text-on-surface-variant'}`}>
                        {gcalConnected ? 'sync' : 'sync_disabled'}
                      </span>
                    </div>
                    <div>
                      <p className="font-body-md text-body-md text-foreground font-semibold">
                        {gcalConnected ? `Connected to Google Calendar` : 'Not Connected'}
                      </p>
                      <p className="font-body-sm text-[12px] text-on-surface-variant">
                        {gcalConnected ? `Account: ${gcalEmail}` : 'Synchronize your events via OAuth 2.0 flow'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-outline-variant/10 pt-4">
                    <label className="font-body-sm text-[10px] text-on-surface-variant uppercase tracking-widest block">Calendar Timezone</label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <select
                        value={calendarTimezone}
                        onChange={(e) => setCalendarTimezone(e.target.value)}
                        className="flex-grow bg-[#181817] border border-outline-variant/30 text-foreground font-body-sm text-xs px-3 py-2.5 focus:outline-none focus:border-secondary"
                      >
                        <option value="Asia/Muscat">Oman (GST / UTC+4) - Default</option>
                        <option value="Asia/Dubai">Dubai (GST / UTC+4)</option>
                        <option value="Asia/Riyadh">Saudi Arabia (AST / UTC+3)</option>
                        <option value="Europe/London">London (GMT/BST / UTC+0/+1)</option>
                        <option value="UTC">UTC / GMT</option>
                      </select>
                      <button
                        onClick={async () => {
                          if (isSupabaseConfigured()) {
                            try {
                              const { error } = await supabase
                                .from("settings")
                                .upsert({ key: "calendar_timezone", value: calendarTimezone }, { onConflict: "key" });
                              if (error) throw error;
                              alert("Calendar timezone saved successfully!");
                            } catch (err) {
                              console.error(err);
                              alert("Failed to save calendar timezone.");
                            }
                          } else {
                            localStorage.setItem("calendar-timezone", calendarTimezone);
                            alert("Calendar timezone saved locally!");
                          }
                        }}
                        className="bg-[#181817] text-secondary border border-outline-variant/30 hover:border-secondary hover:text-primary-container hover:bg-secondary px-4 py-2.5 font-label-caps text-[10px] transition-colors cursor-pointer flex items-center justify-center whitespace-nowrap"
                      >
                        Save Timezone
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    {!gcalConnected ? (
                      <button
                        disabled={gcalLoading}
                        onClick={handleConnectGoogleCalendar}
                        className="bg-secondary text-primary-container px-6 py-3 font-label-caps text-label-caps border border-secondary hover:bg-transparent hover:text-secondary disabled:opacity-50 transition-colors cursor-pointer flex items-center gap-2"
                      >
                        <span>{gcalLoading ? 'Connecting...' : 'Connect Google Calendar'}</span>
                      </button>
                    ) : (
                      <button
                        disabled={gcalLoading}
                        onClick={handleDisconnectGoogleCalendar}
                        className="border border-red-500/30 bg-red-500/5 hover:bg-red-500/10 text-red-400 px-6 py-3 font-label-caps text-label-caps disabled:opacity-50 transition-all cursor-pointer flex items-center gap-2"
                      >
                        <span>Disconnect Calendar</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Consultation Availability Settings */}
                <div className="bg-[#111110] border border-outline-variant/10 p-6 space-y-5">
                  <h3 className="font-display-lg text-headline-md text-foreground border-b border-outline-variant/10 pb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">schedule</span>
                    Consultation Weekly Availability
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Define the days and active operational hours when clients can book strategic sessions.
                  </p>

                  <div className="space-y-4">
                    {availabilities.map((avail) => {
                      const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                      return (
                        <div
                          key={avail.day_of_week}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#181817] border border-outline-variant/10 gap-4"
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              id={`avail-check-${avail.day_of_week}`}
                              checked={avail.is_available}
                              onChange={(e) =>
                                handleUpdateDayAvailability(avail.day_of_week, { is_available: e.target.checked })
                              }
                              className="accent-secondary h-4 w-4 rounded-none cursor-pointer"
                            />
                            <label
                              htmlFor={`avail-check-${avail.day_of_week}`}
                              className={`font-body-md text-body-md font-bold cursor-pointer ${
                                avail.is_available ? "text-foreground" : "text-on-surface-variant line-through"
                              }`}
                            >
                              {dayNames[avail.day_of_week]}
                            </label>
                          </div>

                          {avail.is_available ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="time"
                                value={avail.time_from}
                                onChange={(e) =>
                                  handleUpdateDayAvailability(avail.day_of_week, { time_from: e.target.value })
                                }
                                className="bg-[#111110] border border-outline-variant/30 text-foreground font-body-sm text-xs px-2 py-1.5 focus:outline-none focus:border-secondary font-mono"
                              />
                              <span className="text-on-surface-variant text-xs">to</span>
                              <input
                                type="time"
                                value={avail.time_to}
                                onChange={(e) =>
                                  handleUpdateDayAvailability(avail.day_of_week, { time_to: e.target.value })
                                }
                                className="bg-[#111110] border border-outline-variant/30 text-foreground font-body-sm text-xs px-2 py-1.5 focus:outline-none focus:border-secondary font-mono"
                              />
                            </div>
                          ) : (
                            <span className="text-[10px] font-label-caps text-red-400 bg-red-400/5 px-2 py-0.5 border border-red-500/20 uppercase">
                              Closed / Unavailable
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleSaveAvailability}
                    disabled={savingAvailability}
                    className="bg-secondary text-primary-container px-6 py-3 font-label-caps text-label-caps border border-secondary hover:bg-transparent hover:text-secondary disabled:opacity-50 transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <span>{savingAvailability ? "Saving..." : "Save Availability Settings"}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Sub-Tab 3: WhatsApp Bot Control */}
            {activeSettingsTab === "whatsapp" && (
              <div className="space-y-6 animate-fade-in">
                {/* WhatsApp Connection */}
                <div className="bg-[#111110] border border-outline-variant/10 p-6 space-y-5">
                  <h3 className="font-display-lg text-headline-md text-foreground border-b border-outline-variant/10 pb-2">
                    WhatsApp API Connection (QR Code)
                  </h3>
                  
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-48 h-48 bg-white flex items-center justify-center border border-secondary p-2 relative overflow-hidden flex-shrink-0">
                      {!serverOnline && (
                        <div className="absolute inset-0 bg-[#070707]/95 flex flex-col justify-center items-center text-center p-4 gap-2 z-10">
                          <span className="material-symbols-outlined text-amber-500 text-3xl animate-pulse">cloud_off</span>
                          <p className="font-body-sm text-[11px] text-on-surface-variant">
                            WhatsApp Server Offline. Verify the endpoint or start the bot script.
                          </p>
                          <button
                            onClick={handleRefreshStatus}
                            className="mt-1 border border-secondary/20 hover:border-secondary hover:text-secondary px-2.5 py-1 font-label-caps text-[9px] transition-colors cursor-pointer text-foreground bg-transparent"
                          >
                            Retry Connection
                          </button>
                        </div>
                      )}
                      {serverOnline && qrStatus === "disconnected" && (
                        <div className="absolute inset-0 bg-[#070707]/95 flex flex-col justify-center items-center text-center p-4 gap-2 z-10">
                          <span className="material-symbols-outlined text-secondary/60 text-3xl">link_off</span>
                          <p className="font-body-sm text-[11px] text-on-surface-variant">
                            WhatsApp Disconnected. Click below to initialize session.
                          </p>
                          <button
                            disabled={initializingWa}
                            onClick={handleConnectWhatsApp}
                            className="mt-1 bg-secondary text-primary-container hover:bg-transparent hover:text-secondary px-3 py-1.5 font-label-caps text-[9px] uppercase border border-secondary transition-colors cursor-pointer"
                          >
                            {initializingWa ? "Initializing..." : "Connect WhatsApp"}
                          </button>
                        </div>
                      )}
                      {qrStatus === "generating" && (
                        <div className="absolute inset-0 bg-[#070707]/90 flex items-center justify-center text-secondary animate-pulse text-xs text-center p-4">
                          Configuring session browser instance...
                        </div>
                      )}
                      {qrStatus === "waiting" && qrImage && (
                        <div className="relative w-full h-full flex flex-col justify-center items-center">
                          <img src={qrImage} alt="Scan QR Code" className="w-full h-full object-contain" />
                        </div>
                      )}
                      {qrStatus === "connected" && (
                        <div className="absolute inset-0 bg-emerald-500/10 flex flex-col justify-center items-center text-center p-3">
                          <span className="material-symbols-outlined text-3xl text-emerald-400">check_circle</span>
                          <p className="font-label-caps text-label-caps text-[11px] text-emerald-400 mt-1">Active Connection</p>
                          {connectedNumber && (
                            <p className="font-mono text-[9px] text-secondary mt-0.5 break-all max-w-full px-1">{connectedNumber}</p>
                          )}
                          <button
                            onClick={handleDisconnectWhatsApp}
                            disabled={disconnecting}
                            className="mt-2.5 border border-red-500/30 bg-red-500/5 hover:bg-red-500/15 text-red-400 px-3 py-1 font-label-caps text-[8px] transition-all cursor-pointer disabled:opacity-50"
                          >
                            {disconnecting ? "Disconnecting..." : "Disconnect"}
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex-grow space-y-4 w-full">
                      <div className="space-y-1">
                        <p className="font-label-caps text-label-caps text-on-surface-variant">WhatsApp Server Endpoint</p>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={waServerUrl}
                            onChange={(e) => setWaServerUrl(e.target.value)}
                            placeholder="e.g. http://localhost:3001"
                            className="flex-grow bg-[#181817] border border-outline-variant/30 text-foreground font-body-sm text-body-sm px-4 py-2 focus:outline-none focus:border-secondary font-mono"
                          />
                          <button
                            onClick={handleRefreshStatus}
                            className="border border-outline-variant/30 hover:border-secondary hover:text-secondary text-foreground px-3 py-2 font-label-caps text-[10px] transition-colors cursor-pointer"
                          >
                            Refresh Status
                          </button>
                          <button
                            onClick={async () => {
                              if (isUsingSupabase) {
                                try {
                                  const { error } = await supabase.from("settings").upsert({ key: "wa_server_url", value: waServerUrl });
                                  if (error) throw error;
                                  alert("WhatsApp URL saved in Database!");
                                } catch (err) {
                                  console.error(err);
                                  alert("Failed to save WhatsApp URL in Database.");
                                }
                              } else {
                                localStorage.setItem("wa-server-url", waServerUrl);
                                alert("WhatsApp URL saved in LocalStorage!");
                              }
                            }}
                            className="bg-secondary text-primary-container px-4 py-2 font-label-caps text-[10px] border border-secondary hover:bg-transparent hover:text-secondary transition-colors cursor-pointer"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="font-label-caps text-label-caps text-on-surface-variant">Connection Logs</p>
                        <div className="bg-[#181817] border border-outline-variant/10 p-3 h-24 overflow-y-auto text-xs font-mono text-secondary space-y-1">
                          {connectionLogs.map((log, index) => (
                            <div key={index} className={log.includes("Handshake") || log.includes("CONNECTED") || log.includes("connected") ? "text-emerald-400" : ""}>
                              {log}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Send Test WhatsApp Message Section */}
                  <div className="border-t border-outline-variant/10 pt-5 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-body-md text-body-md text-foreground font-semibold">Send Test WhatsApp Message</h4>
                      {qrStatus !== "connected" && (
                        <span className="text-[10px] text-amber-500 font-label-caps bg-amber-500/5 px-2 py-0.5 border border-amber-500/20">
                          Requires Active Connection
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                      <div className="space-y-1 sm:col-span-1">
                        <label className="font-body-sm text-[10px] text-on-surface-variant uppercase tracking-widest block">Recipient Phone Number</label>
                        <input
                          type="text"
                          placeholder="e.g. 96896680001"
                          value={testNumber}
                          onChange={(e) => setTestNumber(e.target.value)}
                          className="w-full bg-[#181817] border border-outline-variant/30 text-foreground font-body-sm text-xs px-3 py-2 focus:outline-none focus:border-secondary font-mono"
                        />
                      </div>
                      <div className="space-y-1 sm:col-span-1">
                        <label className="font-body-sm text-[10px] text-on-surface-variant uppercase tracking-widest block">Message Text</label>
                        <input
                          type="text"
                          placeholder="Test message from Decision Center"
                          value={testMessage}
                          onChange={(e) => setTestMessage(e.target.value)}
                          className="w-full bg-[#181817] border border-outline-variant/30 text-foreground font-body-sm text-xs px-3 py-2 focus:outline-none focus:border-secondary"
                        />
                      </div>
                      <div className="sm:col-span-1">
                        <button
                          onClick={handleSendTestMessage}
                          disabled={sendingTest || qrStatus !== "connected"}
                          className="w-full bg-secondary text-primary-container px-4 py-2 font-label-caps text-[10px] border border-secondary hover:bg-transparent hover:text-secondary disabled:opacity-40 disabled:hover:bg-secondary disabled:hover:text-primary-container transition-colors cursor-pointer h-[34px] flex items-center justify-center"
                        >
                          {sendingTest ? "Sending..." : "Send Test Message"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Preset Messages Manager */}
                <div className="bg-[#111110] border border-outline-variant/10 p-6 space-y-5">
                  <h3 className="font-display-lg text-headline-md text-foreground border-b border-outline-variant/10 pb-2">
                    WhatsApp Preset Messages
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Manage templates for reaching out to leads. You can use placeholders like <code className="text-secondary font-mono">{`{name}`}</code> and <code className="text-secondary font-mono">{`{company}`}</code>.
                  </p>

                  {/* Add/Edit Form */}
                  <div className="bg-[#181817] p-4 border border-outline-variant/10 space-y-4">
                    <h4 className="font-body-md text-body-md text-foreground font-semibold">
                      {editingPresetId ? "Edit Template" : "Create New Template"}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-body-sm text-[10px] text-on-surface-variant uppercase tracking-widest block">Template Title</label>
                        <input
                          type="text"
                          placeholder="e.g. Follow Up Greeting"
                          value={presetTitle}
                          onChange={(e) => setPresetTitle(e.target.value)}
                          className="w-full bg-[#181817] border border-outline-variant/30 text-foreground font-body-sm text-xs px-3 py-2 focus:outline-none focus:border-secondary"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-body-sm text-[10px] text-on-surface-variant uppercase tracking-widest block">Template Text (with placeholders)</label>
                        <input
                          type="text"
                          placeholder="Hello {name}, regarding {company}..."
                          value={presetText}
                          onChange={(e) => setPresetText(e.target.value)}
                          className="w-full bg-[#181817] border border-outline-variant/30 text-foreground font-body-sm text-xs px-3 py-2 focus:outline-none focus:border-secondary"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleSavePreset}
                        className="bg-secondary text-primary-container px-4 py-2 font-label-caps text-[10px] border border-secondary hover:bg-transparent hover:text-secondary transition-colors cursor-pointer"
                      >
                        {editingPresetId ? "Update Template" : "Add Template"}
                      </button>
                      {editingPresetId && (
                        <button
                          onClick={handleCancelEditPreset}
                          className="border border-outline-variant/30 text-foreground hover:border-secondary hover:text-secondary px-4 py-2 font-label-caps text-[10px] transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Presets List */}
                  <div className="space-y-3">
                    {presets.map((preset) => (
                      <div key={preset.id} className="border border-outline-variant/15 p-4 bg-[#181817] flex justify-between items-center gap-4">
                        <div className="space-y-1 text-left">
                          <p className="font-body-md text-foreground font-semibold">{preset.title}</p>
                          <p className="font-mono text-xs text-secondary break-all">{preset.text}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => {
                              setEditingPresetId(preset.id);
                              setPresetTitle(preset.title);
                              setPresetText(preset.text);
                            }}
                            className="border border-secondary/20 hover:border-secondary text-secondary hover:text-secondary px-2.5 py-1.5 font-label-caps text-[9px] transition-all cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeletePreset(preset.id)}
                            className="border border-red-500/20 hover:border-red-500 text-red-400 px-2.5 py-1.5 font-label-caps text-[9px] transition-all cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                    {presets.length === 0 && (
                      <p className="font-body-sm text-body-sm text-on-surface-variant text-center py-4">No custom templates defined.</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Reach Out Chat Dialog Modal */}
        {activeReachOutLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070707]/85 backdrop-blur-sm p-4">
            <div className="bg-[#111110] border border-secondary/30 p-6 max-w-lg w-full relative space-y-6">
              <button
                onClick={() => setActiveReachOutLead(null)}
                className="absolute top-4 right-4 text-on-surface-variant hover:text-foreground cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <div>
                <h3 className="font-display-lg text-headline-md text-foreground">Reach Out to Lead</h3>
                <p className="font-body-sm text-[12px] text-secondary mt-1 font-semibold">
                  Name: {activeReachOutLead.name} | Company: {activeReachOutLead.company} | Phone: {activeReachOutLead.phone}
                </p>
              </div>

              {/* Preset Messages */}
              <div className="space-y-2">
                <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Select Preset Message</p>
                <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto pr-1">
                  {presets.map((preset) => {
                    const formattedText = preset.text
                      .replace(/{name}/g, activeReachOutLead.name)
                      .replace(/{company}/g, activeReachOutLead.company);

                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setCustomMessageText(formattedText)}
                        className="w-full text-left p-2.5 border border-outline-variant/20 bg-surface-dim hover:border-secondary hover:text-secondary transition-colors text-xs cursor-pointer font-body-sm"
                      >
                        <p className="font-semibold text-secondary text-[11px] mb-0.5">{preset.title}</p>
                        <p className="opacity-80 line-clamp-1">{formattedText}</p>
                      </button>
                    );
                  })}
                  {presets.length === 0 && (
                    <p className="font-body-sm text-[11px] text-on-surface-variant text-center py-2">No templates available. Create them in Settings.</p>
                  )}
                </div>
              </div>

              {/* Message Editing box */}
              <div className="space-y-1">
                <label className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest block">Message Text</label>
                <textarea
                  value={customMessageText}
                  onChange={(e) => setCustomMessageText(e.target.value)}
                  rows={4}
                  className="w-full bg-[#181817] border border-outline-variant/30 text-foreground font-body-sm text-xs p-3 focus:outline-none focus:border-secondary"
                  placeholder="Type your custom message..."
                />
              </div>

              {/* Send / Cancel */}
              <div className="flex gap-4">
                <button
                  onClick={async () => {
                    if (!customMessageText) {
                      alert("Please select or write a message");
                      return;
                    }
                    setSendingCrmMessage(true);
                    try {
                      const res = await fetch(`${waServerUrl}/api/send-whatsapp`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          number: activeReachOutLead.phone,
                          message: customMessageText
                        })
                      });
                      const data = await res.json();
                      if (res.ok && data.success) {
                        alert("Message sent successfully!");
                        handleUpdateLeadStatus(activeReachOutLead.id, "Contacted");
                        setActiveReachOutLead(null);
                      } else {
                        alert(`Failed to send message: ${data.error || "Unknown error"}`);
                      }
                    } catch (err: any) {
                      console.error(err);
                      alert(`Error sending message: ${err.message || err}`);
                    } finally {
                      setSendingCrmMessage(false);
                    }
                  }}
                  disabled={sendingCrmMessage || qrStatus !== "connected"}
                  className="flex-grow bg-secondary text-primary-container py-3 font-label-caps text-label-caps border border-secondary hover:bg-transparent hover:text-secondary disabled:opacity-40 disabled:hover:bg-secondary disabled:hover:text-primary-container transition-colors cursor-pointer text-xs"
                >
                  {sendingCrmMessage ? "Sending..." : qrStatus !== "connected" ? "Requires WhatsApp Link" : "Send via WhatsApp"}
                </button>
                <button
                  onClick={() => setActiveReachOutLead(null)}
                  className="border border-outline-variant/30 text-foreground hover:border-secondary hover:text-secondary px-6 py-3 font-label-caps text-label-caps transition-colors cursor-pointer text-xs"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Lead Details Modal */}
        {activeEditLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070707]/80 backdrop-blur-sm p-4">
            <div className="bg-[#111110] border border-secondary/30 p-6 max-w-lg w-full relative space-y-5">
              <button
                onClick={() => setActiveEditLead(null)}
                className="absolute top-4 right-4 text-on-surface-variant hover:text-foreground cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <div>
                <h3 className="font-display-lg text-headline-md text-foreground">Edit Lead Profile</h3>
                <p className="font-body-sm text-[12px] text-on-surface-variant mt-1">Modify CRM entry information and notes.</p>
              </div>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                <div className="space-y-1">
                  <label className="font-body-sm text-body-sm text-foreground">Full Name</label>
                  <input
                    type="text"
                    value={editLeadName}
                    onChange={(e) => setEditLeadName(e.target.value)}
                    className="w-full bg-[#181817] border border-outline-variant/30 text-foreground font-body-sm text-xs px-3 py-2 focus:outline-none focus:border-secondary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-body-sm text-body-sm text-foreground">Company Name</label>
                  <input
                    type="text"
                    value={editLeadCompany}
                    onChange={(e) => setEditLeadCompany(e.target.value)}
                    className="w-full bg-[#181817] border border-outline-variant/30 text-foreground font-body-sm text-xs px-3 py-2 focus:outline-none focus:border-secondary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-body-sm text-body-sm text-foreground">Email</label>
                    <input
                      type="email"
                      value={editLeadEmail}
                      onChange={(e) => setEditLeadEmail(e.target.value)}
                      className="w-full bg-[#181817] border border-outline-variant/30 text-foreground font-body-sm text-xs px-3 py-2 focus:outline-none focus:border-secondary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-body-sm text-body-sm text-foreground">Phone</label>
                    <input
                      type="text"
                      value={editLeadPhone}
                      onChange={(e) => setEditLeadPhone(e.target.value)}
                      className="w-full bg-[#181817] border border-outline-variant/30 text-foreground font-body-sm text-xs px-3 py-2 focus:outline-none focus:border-secondary font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-body-sm text-body-sm text-foreground">Preferred Timeframe</label>
                  <input
                    type="text"
                    value={editLeadTimeframe}
                    onChange={(e) => setEditLeadTimeframe(e.target.value)}
                    className="w-full bg-[#181817] border border-outline-variant/30 text-foreground font-body-sm text-xs px-3 py-2 focus:outline-none focus:border-secondary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-body-sm text-body-sm text-foreground">Internal Notes / Comments</label>
                  <textarea
                    value={editLeadNotes}
                    onChange={(e) => setEditLeadNotes(e.target.value)}
                    rows={3}
                    className="w-full bg-[#181817] border border-outline-variant/30 text-foreground font-body-sm text-xs p-3 focus:outline-none focus:border-secondary"
                    placeholder="Add notes or administrative comments regarding this lead..."
                  />
                </div>

                <div className="flex items-center gap-2 pt-2 text-left">
                  <input
                    type="checkbox"
                    id="flagged-followup"
                    checked={editLeadFlagged}
                    onChange={(e) => setEditLeadFlagged(e.target.checked)}
                    className="bg-[#181817] border border-outline-variant/30 text-secondary focus:ring-0 focus:ring-offset-0 focus:border-secondary h-4 w-4 rounded-none"
                  />
                  <label htmlFor="flagged-followup" className="font-body-sm text-body-sm text-foreground cursor-pointer flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>flag</span>
                    Flag for Follow-up
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  onClick={handleSaveLeadDetails}
                  disabled={savingLeadDetails}
                  className="flex-grow bg-secondary text-primary-container py-3 font-label-caps text-label-caps border border-secondary hover:bg-transparent hover:text-secondary disabled:opacity-40 disabled:hover:bg-secondary disabled:hover:text-primary-container transition-colors cursor-pointer text-xs"
                >
                  {savingLeadDetails ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={() => setActiveEditLead(null)}
                  className="border border-outline-variant/30 text-foreground hover:border-secondary hover:text-secondary px-6 py-3 font-label-caps text-label-caps transition-colors cursor-pointer text-xs"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Booking Modal */}
        {showingAddBookingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070707]/80 backdrop-blur-sm p-4">
            <div className="bg-[#111110] border border-secondary/30 p-6 max-w-lg w-full relative space-y-5">
              <button
                onClick={() => setShowingAddBookingModal(false)}
                className="absolute top-4 right-4 text-on-surface-variant hover:text-foreground cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <div>
                <h3 className="font-display-lg text-headline-md text-foreground">Add Custom Booking</h3>
                <p className="font-body-sm text-[12px] text-on-surface-variant mt-1">Schedule a manual consultation slot.</p>
              </div>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 text-left">
                <div className="space-y-1">
                  <label className="font-body-sm text-body-sm text-foreground">Client Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Salim Al Harthy"
                    value={newBookingName}
                    onChange={(e) => setNewBookingName(e.target.value)}
                    className="w-full bg-[#181817] border border-outline-variant/30 text-foreground font-body-sm text-xs px-3 py-2 focus:outline-none focus:border-secondary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-body-sm text-body-sm text-foreground">Email</label>
                    <input
                      type="email"
                      placeholder="e.g. salim@example.com"
                      value={newBookingEmail}
                      onChange={(e) => setNewBookingEmail(e.target.value)}
                      className="w-full bg-[#181817] border border-outline-variant/30 text-foreground font-body-sm text-xs px-3 py-2 focus:outline-none focus:border-secondary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-body-sm text-body-sm text-foreground">Phone</label>
                    <input
                      type="text"
                      placeholder="e.g. 96896680001"
                      value={newBookingPhone}
                      onChange={(e) => setNewBookingPhone(e.target.value)}
                      className="w-full bg-[#181817] border border-outline-variant/30 text-foreground font-body-sm text-xs px-3 py-2 focus:outline-none focus:border-secondary font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-body-sm text-body-sm text-foreground">Booking Date</label>
                    <input
                      type="date"
                      value={newBookingDate}
                      onChange={(e) => setNewBookingDate(e.target.value)}
                      className="w-full bg-[#181817] border border-outline-variant/30 text-foreground font-body-sm text-xs px-3 py-2 focus:outline-none focus:border-secondary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-body-sm text-body-sm text-foreground">Time Slot</label>
                    {loadingAddModalSlots ? (
                      <div className="text-xs text-secondary animate-pulse py-2">Checking availability...</div>
                    ) : !addModalDayAvailability?.is_available ? (
                      <div className="text-xs text-red-400 py-2 uppercase font-label-caps">No operational hours on this day</div>
                    ) : getFilteredAddModalSlots().length === 0 ? (
                      <div className="text-xs text-amber-400 py-2 uppercase font-label-caps">All slots booked or unavailable</div>
                    ) : (
                      <select
                        value={newBookingSlot}
                        onChange={(e) => setNewBookingSlot(e.target.value)}
                        className="w-full bg-[#181817] border border-outline-variant/30 text-foreground font-body-sm text-xs px-2.5 py-2 focus:outline-none focus:border-secondary"
                      >
                        {getFilteredAddModalSlots().map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-body-sm text-body-sm text-foreground">Booking Status</label>
                  <select
                    value={newBookingStatus}
                    onChange={(e) => setNewBookingStatus(e.target.value as any)}
                    className="w-full bg-[#181817] border border-outline-variant/30 text-foreground font-body-sm text-xs px-2.5 py-2 focus:outline-none focus:border-secondary"
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  onClick={handleAddBooking}
                  disabled={savingNewBooking}
                  className="flex-grow bg-secondary text-primary-container py-3 font-label-caps text-label-caps border border-secondary hover:bg-transparent hover:text-secondary disabled:opacity-40 disabled:hover:bg-secondary disabled:hover:text-primary-container transition-colors cursor-pointer text-xs"
                >
                  {savingNewBooking ? "Adding..." : "Add Booking"}
                </button>
                <button
                  onClick={() => setShowingAddBookingModal(false)}
                  className="border border-outline-variant/30 text-foreground hover:border-secondary hover:text-secondary px-6 py-3 font-label-caps text-label-caps transition-colors cursor-pointer text-xs"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reschedule Booking Modal */}
        {activeRescheduleBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070707]/80 backdrop-blur-sm p-4">
            <div className="bg-[#111110] border border-secondary/30 p-6 max-w-lg w-full relative space-y-5">
              <button
                onClick={() => setActiveRescheduleBooking(null)}
                className="absolute top-4 right-4 text-on-surface-variant hover:text-foreground cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <div>
                <h3 className="font-display-lg text-headline-md text-foreground">Reschedule Booking</h3>
                <p className="font-body-sm text-[12px] text-on-surface-variant mt-1">Select a new date and time slot for {activeRescheduleBooking.clientName}.</p>
              </div>

              <div className="space-y-4 text-left">
                <div className="space-y-1">
                  <label className="font-body-sm text-body-sm text-foreground">New Date</label>
                  <input
                    type="date"
                    value={rescheduleDate}
                    onChange={(e) => setRescheduleDate(e.target.value)}
                    className="w-full bg-[#181817] border border-outline-variant/30 text-foreground font-body-sm text-xs px-3 py-2 focus:outline-none focus:border-secondary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-body-sm text-body-sm text-foreground">New Time Slot</label>
                  {loadingRescheduleModalSlots ? (
                    <div className="text-xs text-secondary animate-pulse py-2">Checking availability...</div>
                  ) : !rescheduleModalDayAvailability?.is_available ? (
                    <div className="text-xs text-red-400 py-2 uppercase font-label-caps">No operational hours on this day</div>
                  ) : getFilteredRescheduleModalSlots().length === 0 ? (
                    <div className="text-xs text-amber-400 py-2 uppercase font-label-caps">All slots booked or unavailable</div>
                  ) : (
                    <select
                      value={rescheduleSlot}
                      onChange={(e) => setRescheduleSlot(e.target.value)}
                      className="w-full bg-[#181817] border border-outline-variant/30 text-foreground font-body-sm text-xs px-2.5 py-2 focus:outline-none focus:border-secondary"
                    >
                      {getFilteredRescheduleModalSlots().map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  onClick={handleSaveReschedule}
                  disabled={savingReschedule}
                  className="flex-grow bg-secondary text-primary-container py-3 font-label-caps text-label-caps border border-secondary hover:bg-transparent hover:text-secondary disabled:opacity-40 disabled:hover:bg-secondary disabled:hover:text-primary-container transition-colors cursor-pointer text-xs"
                >
                  {savingReschedule ? "Rescheduling..." : "Reschedule Booking"}
                </button>
                <button
                  onClick={() => setActiveRescheduleBooking(null)}
                  className="border border-outline-variant/30 text-foreground hover:border-secondary hover:text-secondary px-6 py-3 font-label-caps text-label-caps transition-colors cursor-pointer text-xs"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
