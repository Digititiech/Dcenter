import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { sendEmail, sendWhatsApp, fetchSMTPSettings } from "@/lib/notifications";
import { generateReminderEmail, generateThankYouEmail, generateManagerNotificationEmail } from "@/lib/emailTemplates";

// This endpoint can be triggered by a Cron Scheduler (e.g. Vercel Cron, EasyCron, Pipedream) every 5-10 minutes.
export async function GET(req: Request) {
  try {
    const smtpSettings = await fetchSMTPSettings();
    const managerEmail = smtpSettings?.user || "admin@dcenter.om";
    const managerPhone = "96896680001"; // Default manager notification WhatsApp number

    const now = Date.now();

    // Fetch all bookings that are not fully updated
    const { data: bookings, error } = await supabase
      .from("bookings")
      .select("*")
      .or("reminder_24h_sent.eq.false,reminder_1h_sent.eq.false,and(status.eq.Attended,thank_you_sent.eq.false)");

    if (error) throw error;
    if (!bookings || bookings.length === 0) {
      return NextResponse.json({ success: true, message: "No bookings require automated processing." });
    }

    let processedCount = 0;

    for (const b of bookings) {
      // Parse local GST time
      const timePart = b.timeSlot ? b.timeSlot.split(" ")[0] : "09:00";
      const datePart = b.booking_date || `2026-10-${String(b.day).padStart(2, "0")}`;
      const bookingTimeMs = new Date(`${datePart}T${timePart}:00+04:00`).getTime();
      const diffMs = bookingTimeMs - now;

      const emailParams = {
        clientName: b.clientName,
        clientEmail: b.clientEmail,
        clientPhone: b.clientPhone,
        bookingDate: datePart,
        timeSlot: b.timeSlot,
        bookingType: b.booking_type || "Strategic Consultation",
      };

      // 1. 24-Hour Reminder (Due when within 24 hours but more than 2 hours away)
      if (!b.reminder_24h_sent && diffMs > 2 * 60 * 60 * 1000 && diffMs <= 24 * 60 * 60 * 1000) {
        // Send to Guest
        const guestEmailHtml = generateReminderEmail(emailParams, false);
        const guestWaMsg = `Reminder: Hello ${b.clientName}, your strategic consultation slot for ${bookingTypeLabel(b.booking_type)} is scheduled for tomorrow at ${b.timeSlot}. We look forward to our session.`;
        
        await sendEmail({ to: b.clientEmail, subject: `Reminder: Consultation Tomorrow - Decision Center`, html: guestEmailHtml });
        await sendWhatsApp({ to: b.clientPhone, message: guestWaMsg });

        // Send to Manager
        const managerEmailHtml = generateReminderEmail({ ...emailParams, clientName: "Manager" }, false);
        const managerWaMsg = `Manager Alert: Upcoming consultation tomorrow with client ${b.clientName} at ${b.timeSlot} (${bookingTypeLabel(b.booking_type)}).`;
        
        await sendEmail({ to: managerEmail, subject: `Alert: Client Consultation Tomorrow - ${b.clientName}`, html: managerEmailHtml });
        await sendWhatsApp({ to: managerPhone, message: managerWaMsg });

        // Update database flag
        await supabase.from("bookings").update({ reminder_24h_sent: true }).eq("id", b.id);
        processedCount++;
      }

      // 2. 1-Hour Reminder (Due when within 1 hour and still in the future)
      if (!b.reminder_1h_sent && diffMs > 0 && diffMs <= 1 * 60 * 60 * 1000) {
        // Send to Guest
        const guestEmailHtml = generateReminderEmail(emailParams, true);
        const guestWaMsg = `Reminder: Hello ${b.clientName}, your strategic session starts in 1 hour at ${b.timeSlot}. Looking forward to seeing you soon.`;
        
        await sendEmail({ to: b.clientEmail, subject: `Reminder: Session Starts in 1 Hour - Decision Center`, html: guestEmailHtml });
        await sendWhatsApp({ to: b.clientPhone, message: guestWaMsg });

        // Send to Manager
        const managerEmailHtml = generateReminderEmail({ ...emailParams, clientName: "Manager" }, true);
        const managerWaMsg = `Manager Alert: Consultation session starts in 1 hour for client ${b.clientName} at ${b.timeSlot}.`;
        
        await sendEmail({ to: managerEmail, subject: `Alert: Client Consultation in 1 Hour - ${b.clientName}`, html: managerEmailHtml });
        await sendWhatsApp({ to: managerPhone, message: managerWaMsg });

        // Update database flag
        await supabase.from("bookings").update({ reminder_1h_sent: true }).eq("id", b.id);
        processedCount++;
      }

      // 3. Attended Thank You Message (Due 15 minutes after status changed to Attended)
      if (b.status === "Attended" && !b.thank_you_sent && b.thank_you_due_at) {
        const dueMs = new Date(b.thank_you_due_at).getTime();
        if (now >= dueMs) {
          const type = b.booking_type || "Strategic Consultation";
          // Send Guest Thank You
          const guestEmailHtml = generateThankYouEmail(emailParams);
          const guestWaMsg = `Dear ${b.clientName}, thank you for attending your strategic consultation session today. It was a pleasure discussing your requirements. We will share recommendations shortly.`;
          
          await sendEmail({ to: b.clientEmail, subject: `Thank You for Attending - Decision Center`, html: guestEmailHtml });
          await sendWhatsApp({ to: b.clientPhone, message: guestWaMsg });

          // Update database flag
          await supabase.from("bookings").update({ thank_you_sent: true }).eq("id", b.id);
          processedCount++;
        }
      }
    }

    return NextResponse.json({ success: true, processedCount });
  } catch (err: any) {
    console.error("Cron Reminder Handler Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

function bookingTypeLabel(type: string | null) {
  return type || "Strategic Consultation";
}
