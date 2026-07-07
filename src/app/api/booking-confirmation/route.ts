import { NextResponse } from "next/server";
import { sendEmail, sendWhatsApp, fetchSMTPSettings } from "@/lib/notifications";
import { generateGuestConfirmationEmail, generateManagerNotificationEmail } from "@/lib/emailTemplates";

export async function POST(req: Request) {
  try {
    const { booking, locale = "en" } = await req.json();

    if (!booking || !booking.clientName || !booking.clientEmail || !booking.clientPhone || !booking.timeSlot) {
      return NextResponse.json({ success: false, error: "Missing required booking details." }, { status: 400 });
    }

    const smtpSettings = await fetchSMTPSettings();
    const managerEmail = smtpSettings?.user || "admin@dcenter.om";
    const managerPhone = "96896680001"; // Default manager notification WhatsApp number

    const datePart = booking.booking_date || `2026-10-${String(booking.day).padStart(2, "0")}`;

    const emailParams = {
      clientName: booking.clientName,
      clientEmail: booking.clientEmail,
      clientPhone: booking.clientPhone,
      bookingDate: datePart,
      timeSlot: booking.timeSlot,
      bookingType: booking.booking_type || "Strategic Consultation",
      locale
    };

    // 1. Send confirmation to Guest
    const guestHtml = generateGuestConfirmationEmail(emailParams);
    const guestWa = locale === "ar"
      ? `مرحباً ${booking.clientName}، تم استلام طلب الحجز الخاص بك لخدمة "${booking.booking_type || "الاستشارة الاستراتيجية"}" بتاريخ ${datePart} في تمام الساعة ${booking.timeSlot}. نتطلع للقائك.`
      : `Hello ${booking.clientName}, your consultation request for ${booking.booking_type || "Strategic Consultation"} on ${datePart} at ${booking.timeSlot} has been received. We look forward to our session.`;
    
    await sendEmail({ to: booking.clientEmail, subject: locale === "ar" ? "تأكيد طلب حجز الجلسة الاستشارية" : "Consultation Session Booking Confirmation", html: guestHtml });
    await sendWhatsApp({ to: booking.clientPhone, message: guestWa });

    // 2. Send notification to Manager
    const managerHtml = generateManagerNotificationEmail(emailParams);
    const managerWa = `New Booking Request: Client ${booking.clientName} has booked a ${booking.booking_type || "Strategic Consultation"} slot on ${datePart} at ${booking.timeSlot}.`;
    
    await sendEmail({ to: managerEmail, subject: `Alert: New Booking Request - ${booking.clientName}`, html: managerHtml });
    await sendWhatsApp({ to: managerPhone, message: managerWa });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Booking Confirmation Route Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
