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
}

interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  day: number;
  timeSlot: string;
  status: "Pending" | "Confirmed" | "Rescheduled";
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "crm" | "bookings" | "settings">("overview");
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
  const [qrStatus, setQrStatus] = useState<"disconnected" | "generating" | "waiting" | "connected">("disconnected");

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
      // Check local storage mock status
      const mockConnected = localStorage.getItem("gcal-connected") === "true";
      const mockEmail = localStorage.getItem("gcal-email") || null;
      setGcalConnected(mockConnected);
      setGcalEmail(mockEmail);
      return;
    }
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

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
      }
    } catch (e) {
      console.error("Error checking Google Calendar status:", e);
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
        const userId = session?.user?.id || "";
        // Redirect to Edge Function login action
        window.location.href = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/google-calendar-auth?action=login&userId=${userId}`;
      } else {
        // Mock connection
        setTimeout(() => {
          setGcalConnected(true);
          setGcalEmail("admin@dcenter.om");
          localStorage.setItem("gcal-connected", "true");
          localStorage.setItem("gcal-email", "admin@dcenter.om");
          setGcalLoading(false);
          alert("Mock Google Calendar Connected!");
        }, 1000);
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
        }
      } else {
        setGcalConnected(false);
        setGcalEmail(null);
        localStorage.removeItem("gcal-connected");
        localStorage.removeItem("gcal-email");
        alert("Mock Google Calendar Disconnected.");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGcalLoading(false);
    }
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
    const updated = bookings.map(b => b.id === bookingId ? { ...b, status: "Confirmed" as const } : b);
    setBookings(updated);

    if (isUsingSupabase) {
      await supabase.from("bookings").update({ status: "Confirmed" }).eq("id", bookingId);
    } else {
      localStorage.setItem("bookings-slots", JSON.stringify(updated));
    }
  };

  const handleRescheduleBooking = async (bookingId: string) => {
    const updated = bookings.map(b => b.id === bookingId ? { ...b, status: "Rescheduled" as const } : b);
    setBookings(updated);

    if (isUsingSupabase) {
      await supabase.from("bookings").update({ status: "Rescheduled" }).eq("id", bookingId);
    } else {
      localStorage.setItem("bookings-slots", JSON.stringify(updated));
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

  const generateQrCode = () => {
    setQrStatus("generating");
    setTimeout(() => {
      setQrStatus("waiting");
    }, 1500);
  };

  const simulateQrScan = () => {
    setQrStatus("connected");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070707]">
        <div className="text-secondary font-label-caps animate-pulse">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#070707]">
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
        <div className="p-4 border-t border-outline-variant/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 border border-red-500/30 bg-red-500/5 hover:bg-red-500/10 text-red-400 py-3 font-label-caps text-label-caps transition-all cursor-pointer text-xs"
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
                      <td className="p-4 font-body-md text-body-md text-foreground font-semibold">{lead.name}</td>
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
                        <a
                          href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 border border-secondary/20 hover:border-secondary hover:text-secondary px-3 py-1.5 font-label-caps text-[10px] transition-colors"
                        >
                          <span className="material-symbols-outlined text-xs">chat</span> Reach Out
                        </a>
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
          <div className="space-y-8 animate-fade-in">
            <div>
              <h1 className="font-display-lg text-display-md text-foreground">Consultation Calendar</h1>
              <p className="font-body-md text-body-md text-on-surface-variant">Manage scheduled institutional sessions and confirmation queue.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* List of Bookings */}
              <div className="lg:col-span-7 bg-[#111110] border border-outline-variant/10 p-6 space-y-6">
                <h3 className="font-display-lg text-headline-md text-foreground pb-2 border-b border-outline-variant/10">
                  Scheduled Bookings List
                </h3>
                <div className="space-y-4">
                  {bookings.map(b => (
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
                          October {b.day}, 2026 at {b.timeSlot}
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
                </div>
              </div>

              {/* October 2026 Calendar view */}
              <div className="lg:col-span-5 bg-[#111110] border border-outline-variant/10 p-6">
                <h3 className="font-display-lg text-headline-md text-foreground pb-2 border-b border-outline-variant/10 mb-6">
                  Calendar Grid View
                </h3>
                <div className="border border-outline-variant/20 bg-surface-dim p-4">
                  <div className="text-center mb-4">
                    <span className="font-data-tabular text-data-tabular text-foreground font-bold">
                      October 2026
                    </span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                      <div key={i} className="font-label-caps text-label-caps text-on-surface-variant text-[10px]">
                        {d}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {/* Offset */}
                    <div></div>
                    <div></div>
                    <div></div>
                    {Array.from({ length: 15 }, (_, i) => i + 1).map(day => {
                      const dayBookings = bookings.filter(b => b.day === day);
                      const hasConfirmed = dayBookings.some(b => b.status === "Confirmed");
                      const hasPending = dayBookings.some(b => b.status === "Pending");
                      
                      let bgClass = "";
                      if (hasConfirmed) bgClass = "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400";
                      else if (hasPending) bgClass = "bg-amber-500/10 border border-amber-500/30 text-amber-400";

                      return (
                        <div
                          key={day}
                          className={`p-2 font-data-tabular text-data-tabular text-foreground text-xs h-10 flex flex-col justify-between items-center relative ${bgClass}`}
                        >
                          <span>{day}</span>
                          {dayBookings.length > 0 && (
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                          )}
                        </div>
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
                onClick={() => alert("SMTP settings updated!")}
              >
                Save Mail Credentials
              </button>
            </div>

            {/* Calendar Integration */}
            <div className="bg-[#111110] border border-outline-variant/10 p-6 space-y-5">
              <h3 className="font-display-lg text-headline-md text-foreground border-b border-outline-variant/10 pb-2">
                Calendar Connection (iCal / GCal Link)
              </h3>
              <div className="space-y-1">
                <label className="font-body-sm text-body-sm text-foreground">Calendar Subscription Sync Endpoint</label>
                <input
                  type="text"
                  value={calendarUrl}
                  onChange={(e) => setCalendarUrl(e.target.value)}
                  className="w-full bg-[#181817] border border-outline-variant/30 text-foreground font-body-sm text-body-sm px-4 py-2.5 focus:outline-none focus:border-secondary"
                />
              </div>
              <button
                className="bg-secondary text-primary-container px-4 py-3 font-label-caps text-label-caps border border-secondary hover:bg-transparent hover:text-secondary transition-colors cursor-pointer"
                onClick={() => alert("Calendar settings updated!")}
              >
                Update Calendar Sync
              </button>
            </div>

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

            {/* WhatsApp Connection */}
            <div className="bg-[#111110] border border-outline-variant/10 p-6 space-y-5">
              <h3 className="font-display-lg text-headline-md text-foreground border-b border-outline-variant/10 pb-2">
                WhatsApp API Connection (QR Code)
              </h3>
              
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-48 h-48 bg-white flex items-center justify-center border border-secondary p-2 relative overflow-hidden">
                  {qrStatus === "disconnected" && (
                    <div className="absolute inset-0 bg-[#070707]/90 flex items-center justify-center text-center p-4">
                      <button
                        onClick={generateQrCode}
                        className="bg-secondary text-primary-container px-3 py-2 font-label-caps text-[10px] border border-secondary hover:bg-transparent hover:text-secondary transition-colors cursor-pointer"
                      >
                        Generate QR Code
                      </button>
                    </div>
                  )}
                  {qrStatus === "generating" && (
                    <div className="absolute inset-0 bg-[#070707]/90 flex items-center justify-center text-secondary animate-pulse text-xs">
                      Configuring Instance...
                    </div>
                  )}
                  {(qrStatus === "waiting" || qrStatus === "connected") && (
                    <div className="relative w-full h-full flex flex-col justify-center items-center">
                      {/* Simulating QR code with a CSS design */}
                      <div className="grid grid-cols-4 gap-1.5 w-32 h-32 opacity-80 bg-stone-900 p-2">
                        <div className="bg-white border-2 border-stone-900"></div>
                        <div className="bg-stone-500"></div>
                        <div className="bg-stone-500"></div>
                        <div className="bg-white border-2 border-stone-900"></div>
                        <div className="bg-stone-500"></div>
                        <div className="bg-white"></div>
                        <div className="bg-white"></div>
                        <div className="bg-stone-500"></div>
                        <div className="bg-stone-500"></div>
                        <div className="bg-white"></div>
                        <div className="bg-stone-500"></div>
                        <div className="bg-white"></div>
                        <div className="bg-white border-2 border-stone-900"></div>
                        <div className="bg-stone-500"></div>
                        <div className="bg-stone-500"></div>
                        <div className="bg-white border-2 border-stone-900"></div>
                      </div>
                      {qrStatus === "waiting" && (
                        <div className="absolute inset-0 bg-secondary/10 flex flex-col justify-center items-center p-3 text-center cursor-pointer" onClick={simulateQrScan}>
                          <span className="bg-secondary text-primary-container text-[8px] font-label-caps px-2 py-1 uppercase shadow">
                            Click to scan QR
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex-grow space-y-4">
                  <div className="space-y-1">
                    <p className="font-label-caps text-label-caps text-on-surface-variant">WhatsApp Server Endpoint</p>
                    <p className="font-body-md text-body-md text-foreground font-mono bg-[#181817] p-3 border border-outline-variant/10">
                      https://api.whatsapp.dcenter.om/v1/session
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-label-caps text-label-caps text-on-surface-variant">Connection Logs</p>
                    <div className="bg-[#181817] border border-outline-variant/10 p-3 h-24 overflow-y-auto text-xs font-mono text-secondary space-y-1">
                      <div>[SYSTEM] Initiating socket client connection...</div>
                      {qrStatus === "generating" && <div>[SYSTEM] Generating new QR code sequence...</div>}
                      {qrStatus === "waiting" && <div>[SOCKET] QR Code displayed. Waiting for scanner handshake...</div>}
                      {qrStatus === "connected" && (
                        <>
                          <div className="text-emerald-400">[SOCKET] Handshake succeeded! Device authenticated.</div>
                          <div className="text-emerald-400">[SYSTEM] Session state updated to: CONNECTED</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
