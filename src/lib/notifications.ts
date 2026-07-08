import nodemailer from "nodemailer";
import { supabase } from "./supabaseClient";

export interface NotificationPayload {
  toEmail: string;
  toPhone: string;
  subject: string;
  emailHtml: string;
  whatsappMessage: string;
}

export async function fetchSMTPSettings() {
  try {
    const { data, error } = await supabase.from("settings").select("*");
    if (error || !data) return null;
    
    const settings: Record<string, string> = {};
    data.forEach((row: any) => {
      settings[row.key] = row.value;
    });
    
    return {
      host: settings.smtp_host || "smtp.gmail.com",
      port: parseInt(settings.smtp_port || "587", 10),
      user: settings.smtp_user || "info@dcenterfe.com",
      pass: settings.smtp_pass || "",
    };
  } catch (err) {
    console.error("Failed to fetch SMTP settings:", err);
    return null;
  }
}

export async function fetchWhatsAppSettings() {
  try {
    const { data } = await supabase.from("settings").select("*").eq("key", "wa-server-url").maybeSingle();
    return data?.value || "https://wa.powerpod.ae";
  } catch (err) {
    console.error("Failed to fetch WhatsApp settings:", err);
    return "https://wa.powerpod.ae";
  }
}

export async function sendEmail({
  to,
  subject,
  html
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const smtp = await fetchSMTPSettings();
  if (!smtp || !smtp.pass) {
    console.warn("SMTP settings are incomplete. Skipping email dispatch.");
    return false;
  }

  try {
    const transporterOpts: any = {
      host: smtp.host,
      port: smtp.port,
      secure: smtp.port === 465,
      auth: {
        user: smtp.user,
        pass: smtp.pass
      },
      tls: {
        rejectUnauthorized: false
      }
    };

    if (smtp.host.toLowerCase().includes("gmail")) {
      transporterOpts.service = "gmail";
    }

    const transporter = nodemailer.createTransport(transporterOpts);

    await transporter.sendMail({
      from: `"Decision Center" <${smtp.user}>`,
      to,
      subject,
      html
    });
    return true;
  } catch (err) {
    console.error(`Failed to send email to ${to}:`, err);
    return false;
  }
}

export async function sendWhatsApp({
  to,
  message
}: {
  to: string;
  message: string;
}) {
  const serverUrl = await fetchWhatsAppSettings();
  try {
    // Format Omani phone default
    let cleaned = to.trim().replace(/\s+/g, '');
    if (!cleaned.startsWith('+')) {
      if (cleaned.startsWith('00')) {
        cleaned = '+' + cleaned.slice(2);
      } else {
        if (cleaned.startsWith('968') && cleaned.length >= 8) {
          cleaned = '+' + cleaned;
        } else {
          if (cleaned.startsWith('0')) {
            cleaned = cleaned.slice(1);
          }
          cleaned = '+968' + cleaned;
        }
      }
    }

    const res = await fetch(`${serverUrl}/api/send-whatsapp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        number: cleaned,
        message
      })
    });
    return res.ok;
  } catch (err) {
    console.error(`Failed to send WhatsApp message to ${to}:`, err);
    return false;
  }
}

export async function sendFullNotification({
  toEmail,
  toPhone,
  subject,
  emailHtml,
  whatsappMessage
}: NotificationPayload) {
  const emailPromise = sendEmail({ to: toEmail, subject, html: emailHtml });
  const whatsappPromise = sendWhatsApp({ to: toPhone, message: whatsappMessage });
  
  const [emailSuccess, whatsappSuccess] = await Promise.all([emailPromise, whatsappPromise]);
  return { emailSuccess, whatsappSuccess };
}
