// Deno Supabase Edge Function: google-calendar-auth
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

function getTimezoneOffset(timeZone: string) {
  if (timeZone === "Asia/Riyadh") return "+03:00";
  if (timeZone === "Europe/London") return "+00:00"; // simplified
  if (timeZone === "UTC") return "+00:00";
  return "+04:00"; // default for Asia/Muscat or Asia/Dubai
}

function parseDateTime(dateStr: string | undefined, day: number, timeSlot: string, offset: string = "+04:00") {
  let datePart = "2026-10-01";
  if (dateStr) {
    datePart = dateStr;
  } else if (day) {
    const dayStr = String(day).padStart(2, '0');
    datePart = `2026-10-${dayStr}`;
  }
  const timePart = timeSlot.split(" ")[0] || "09:00";
  const [hour, minute] = timePart.split(":");
  const hourStr = String(hour || "09").padStart(2, '0');
  const minuteStr = String(minute || "00").padStart(2, '0');
  return `${datePart}T${hourStr}:${minuteStr}:00${offset}`;
}

function parseEndDateTime(dateStr: string | undefined, day: number, timeSlot: string, offset: string = "+04:00") {
  let datePart = "2026-10-01";
  if (dateStr) {
    datePart = dateStr;
  } else if (day) {
    const dayStr = String(day).padStart(2, '0');
    datePart = `2026-10-${dayStr}`;
  }
  const timePart = timeSlot.split(" ")[0] || "09:00";
  const [hour, minute] = timePart.split(":");
  const endHour = Number(hour || "09") + 1;
  const hourStr = String(endHour).padStart(2, '0');
  const minuteStr = String(minute || "00").padStart(2, '0');
  return `${datePart}T${hourStr}:${minuteStr}:00${offset}`;
}

async function refreshGoogleAccessToken(clientId: string, clientSecret: string, refreshToken: string) {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });
  const data = await response.json();
  if (data.error) {
    throw new Error(`Google token refresh error: ${data.error_description || data.error}`);
  }
  return data.access_token;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    let action = url.searchParams.get("action") || "login";
    if (url.searchParams.has("code")) {
      action = "callback";
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const clientId = Deno.env.get("GOOGLE_CLIENT_ID") || "";
    const clientSecret = Deno.env.get("GOOGLE_CLIENT_SECRET") || "";
    
    // Construct the public HTTPS redirect URI using the project URL
    const redirectUri = `${supabaseUrl}/functions/v1/google-calendar-auth`;

    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);

    // Get authorization token from user request to verify identity
    const authHeader = req.headers.get("Authorization");
    let user: any = null;
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const { data: { user: authUser } } = await supabaseClient.auth.getUser(token);
      user = authUser;
    }

    if (action === "login") {
      // 1. Initiate Google OAuth Flow
      const scopes = [
        "https://www.googleapis.com/auth/calendar.events",
        "https://www.googleapis.com/auth/userinfo.email"
      ].join(" ");

      const state = url.searchParams.get("userId") || user?.id || "anonymous";

      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${encodeURIComponent(clientId)}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&response_type=code` +
        `&scope=${encodeURIComponent(scopes)}` +
        `&access_type=offline` +
        `&prompt=consent` +
        `&state=${encodeURIComponent(state)}`;

      return new Response(null, {
        status: 302,
        headers: {
          ...corsHeaders,
          "Location": googleAuthUrl,
        },
      });
    }

    if (action === "callback") {
      // 2. Google OAuth Callback
      const code = url.searchParams.get("code");
      const state = url.searchParams.get("state") || "anonymous";

      if (!code) {
        throw new Error("Missing auth code from Google redirect.");
      }

      const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: "authorization_code",
        }),
      });

      const tokenData = await tokenResponse.json();
      if (tokenData.error) {
        throw new Error(`Google token exchange error: ${tokenData.error_description || tokenData.error}`);
      }

      const { access_token, refresh_token, expires_in } = tokenData;
      const expiry_date = new Date(Date.now() + expires_in * 1000).toISOString();

      const userinfoResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const userinfo = await userinfoResponse.json();
      const email = userinfo.email || null;

      const userId = state !== "anonymous" ? state : null;
      
      const { error: dbErr } = await supabaseClient
        .from("google_calendar_tokens")
        .upsert(
          {
            user_id: userId,
            access_token,
            refresh_token: refresh_token || "",
            expiry_date,
            email,
          },
          { onConflict: "user_id" }
        );

      if (dbErr) throw dbErr;

      const clientAdminUrl = Deno.env.get("CLIENT_ADMIN_URL") || "http://localhost:3000/admin";
      return new Response(null, {
        status: 302,
        headers: {
          ...corsHeaders,
          "Location": `${clientAdminUrl}?tab=settings&gcal=success`,
        },
      });
    }

    if (action === "status") {
      // 3. Check connection status for authenticated user
      if (!user) {
        return new Response(JSON.stringify({ connected: false, error: "Unauthorized" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { data, error } = await supabaseClient
        .from("google_calendar_tokens")
        .select("email, expiry_date")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;

      return new Response(
        JSON.stringify({
          connected: !!data,
          email: data?.email || null,
          expiry: data?.expiry_date || null,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (action === "disconnect") {
      // 4. Disconnect integration
      if (!user) {
        return new Response(JSON.stringify({ success: false, error: "Unauthorized" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { error } = await supabaseClient
        .from("google_calendar_tokens")
        .delete()
        .eq("user_id", user.id);

      if (error) throw error;

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "create-event") {
      // 5. Synchronize appointment details to Google Calendar
      if (!user) {
        return new Response(JSON.stringify({ success: false, error: "Unauthorized" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const body = await req.json().catch(() => ({}));
      const { bookingId } = body;

      if (!bookingId) {
        throw new Error("Missing bookingId parameter.");
      }

      // Fetch user's refresh token
      const { data: tokenRecord, error: tokenErr } = await supabaseClient
        .from("google_calendar_tokens")
        .select("refresh_token, email")
        .eq("user_id", user.id)
        .maybeSingle();

      if (tokenErr) throw tokenErr;
      if (!tokenRecord || !tokenRecord.refresh_token) {
        throw new Error("Google Calendar integration not authorized. Refresh token missing.");
      }

      // Fetch booking details
      const { data: booking, error: bookingErr } = await supabaseClient
        .from("bookings")
        .select("*")
        .eq("id", bookingId)
        .single();

      if (bookingErr) throw bookingErr;
      if (!booking) {
        throw new Error(`Booking with ID ${bookingId} not found.`);
      }

      // Fetch timezone setting
      const { data: tzSetting } = await supabaseClient
        .from("settings")
        .select("value")
        .eq("key", "calendar_timezone")
        .maybeSingle();

      const timeZone = tzSetting?.value || "Asia/Muscat";
      const offset = getTimezoneOffset(timeZone);

      // Refresh Access Token
      const accessToken = await refreshGoogleAccessToken(clientId, clientSecret, tokenRecord.refresh_token);

      // Parse start and end times
      const startIso = parseDateTime(booking.booking_date, booking.day, booking.timeSlot, offset);
      const endIso = parseEndDateTime(booking.booking_date, booking.day, booking.timeSlot, offset);

      const gcalEvent = {
        summary: `Strategic Consultation: ${booking.clientName}`,
        description: `Strategic Advisory Session booked via Decision Center Portal.\n\nClient Details:\n- Name: ${booking.clientName}\n- Email: ${booking.clientEmail}\n- Phone: ${booking.clientPhone}`,
        start: {
          dateTime: startIso,
          timeZone: timeZone,
        },
        end: {
          dateTime: endIso,
          timeZone: timeZone,
        },
      };

      const gcalResponse = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gcalEvent),
      });

      const gcalResult = await gcalResponse.json();
      if (gcalResult.error) {
        throw new Error(`Google Calendar API Error: ${gcalResult.error.message}`);
      }

      return new Response(JSON.stringify({ success: true, eventId: gcalResult.id }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "get-busy-slots") {
      // 6. Public or admin query to list busy calendar events for a selected date
      const dateParam = url.searchParams.get("date"); // YYYY-MM-DD
      if (!dateParam) {
        throw new Error("Missing date parameter.");
      }

      // Fetch the first token record (assumes single tenant/admin console)
      const { data: tokenRecord, error: tokenErr } = await supabaseClient
        .from("google_calendar_tokens")
        .select("refresh_token")
        .limit(1)
        .maybeSingle();

      if (tokenErr) throw tokenErr;
      if (!tokenRecord || !tokenRecord.refresh_token) {
        return new Response(JSON.stringify({ connected: false, busySlots: [] }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Fetch timezone setting
      const { data: tzSetting } = await supabaseClient
        .from("settings")
        .select("value")
        .eq("key", "calendar_timezone")
        .maybeSingle();

      const timeZone = tzSetting?.value || "Asia/Muscat";
      const offset = getTimezoneOffset(timeZone);

      // Refresh Access Token
      const accessToken = await refreshGoogleAccessToken(clientId, clientSecret, tokenRecord.refresh_token);

      // Define bounds using correct offset
      const timeMin = `${dateParam}T00:00:00${offset}`;
      const timeMax = `${dateParam}T23:59:59${offset}`;

      const gcalResponse = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}&singleEvents=true`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const gcalData = await gcalResponse.json();
      if (gcalData.error) {
        throw new Error(`Google Calendar API Error: ${gcalData.error.message}`);
      }

      const busySlots = (gcalData.items || []).map((item: any) => ({
        start: item.start.dateTime || item.start.date,
        end: item.end.dateTime || item.end.date,
      }));

      return new Response(JSON.stringify({ connected: true, busySlots }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
