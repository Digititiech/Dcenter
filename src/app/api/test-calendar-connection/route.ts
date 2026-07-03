import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid Calendar subscription URL" },
        { status: 400 }
      );
    }

    // Try parsing URL
    let parsedUrl;
    try {
      // Replace webcal:// with http:// or https:// for node fetch
      let fetchUrl = url.trim();
      if (fetchUrl.startsWith("webcal://")) {
        fetchUrl = fetchUrl.replace("webcal://", "https://");
      }
      parsedUrl = new URL(fetchUrl);
    } catch (e) {
      return NextResponse.json(
        { success: false, error: "Invalid URL structure. Ensure it is a full URL starting with http, https, or webcal." },
        { status: 400 }
      );
    }

    // Perform verification fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

    let res;
    try {
      let fetchUrl = parsedUrl.toString();
      res = await fetch(fetchUrl, {
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        }
      });
    } catch (fetchErr: any) {
      return NextResponse.json({
        success: false,
        error: `Network Connection Failed: Could not reach the server. Details: ${fetchErr.message || fetchErr}`
      });
    } finally {
      clearTimeout(timeoutId);
    }

    if (!res.ok) {
      return NextResponse.json({
        success: false,
        error: `Server responded with HTTP Status Code ${res.status}: ${res.statusText}`
      });
    }

    const text = await res.text();
    const normalizedText = text.trim();

    // Verify if it contains iCal signature elements
    const isICal = normalizedText.includes("BEGIN:VCALENDAR");

    if (!isICal) {
      return NextResponse.json({
        success: false,
        error: "URL is reachable, but the response does not contain a valid iCalendar header. (Expected 'BEGIN:VCALENDAR')"
      });
    }

    // Parse standard calendar name if available
    let calendarName = "iCal/Google Calendar Feed";
    const nameMatch = normalizedText.match(/X-WR-CALNAME:(.*)/i);
    if (nameMatch && nameMatch[1]) {
      calendarName = nameMatch[1].trim();
    }

    return NextResponse.json({
      success: true,
      calendarName
    });
  } catch (err: any) {
    console.error("Calendar Test Connection Error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Unknown error verifying subscription URL" },
      { status: 500 }
    );
  }
}
