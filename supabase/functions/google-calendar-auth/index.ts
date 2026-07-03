// Deno Supabase Edge Function: google-calendar-auth
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get("action") || "login";

    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const clientId = Deno.env.get("GOOGLE_CLIENT_ID") || "";
    const clientSecret = Deno.env.get("GOOGLE_CLIENT_SECRET") || "";
    const redirectUri = `${url.origin}${url.pathname}?action=callback`;

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
        "https://www.googleapis.com/auth/calendar",
        "https://www.googleapis.com/auth/userinfo.email"
      ].join(" ");

      // Optional state can encode user_id if calling directly or pass via callback state
      const state = url.searchParams.get("userId") || user?.id || "anonymous";

      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${encodeURIComponent(clientId)}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&response_type=code` +
        `&scope=${encodeURIComponent(scopes)}` +
        `&access_type=offline` +
        `&prompt=consent` +
        `&state=${encodeURIComponent(state)}`;

      // Return a redirect response
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

      // Exchange authorization code for access and refresh tokens
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

      // Retrieve user email from Google Userinfo API
      const userinfoResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const userinfo = await userinfoResponse.json();
      const email = userinfo.email || null;

      // Upsert tokens in supabase db
      const userId = state !== "anonymous" ? state : null;
      
      const { error: dbErr } = await supabaseClient
        .from("google_calendar_tokens")
        .upsert(
          {
            user_id: userId,
            access_token,
            refresh_token: refresh_token || "", // refresh_token is only returned on first consent prompt
            expiry_date,
            email,
          },
          { onConflict: "user_id" }
        );

      if (dbErr) throw dbErr;

      // Redirect back to Admin UI
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
