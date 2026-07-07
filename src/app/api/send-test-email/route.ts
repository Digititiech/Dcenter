import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const { host, port, user, pass, to } = await req.json();

    if (!host || !port || !user || !pass || !to) {
      return NextResponse.json(
        { success: false, error: "Missing required configuration fields" },
        { status: 400 }
      );
    }

    let finalPass = pass;
    if (pass === "••••••••••••") {
      const { data } = await supabase.from("settings").select("value").eq("key", "smtp_pass").maybeSingle();
      if (data?.value) {
        finalPass = data.value;
      }
    }

    const transporterOpts: any = {
      host,
      port: parseInt(port, 10),
      secure: parseInt(port, 10) === 465, // Use secure transport for port 465
      auth: {
        user,
        pass: finalPass
      },
      tls: {
        rejectUnauthorized: false
      }
    };

    if (host.toLowerCase().includes("gmail")) {
      transporterOpts.service = "gmail";
    }

    const transporter = nodemailer.createTransport(transporterOpts);

    // Verify SMTP connection
    await transporter.verify();

    // Send test email
    const info = await transporter.sendMail({
      from: `"Decision Center Test" <${user}>`,
      to,
      subject: "SMTP Connection Test - Decision Center Dashboard",
      text: "Hello, this is a test email from your Decision Center Admin Dashboard. If you received this, your SMTP configuration is successfully connected!",
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px; max-width: 600px; margin: auto;">
          <h2 style="color: #c29d53; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">SMTP Connection Successful</h2>
          <p>Hello,</p>
          <p>This is a test email sent from your <strong>Decision Center Strategic Interface</strong> admin settings panel.</p>
          <p>Your SMTP mail servers are now fully verified and connected.</p>
          <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;">
          <p style="font-size: 11px; color: #888888;">This is an automated notification. Please do not reply to this email.</p>
        </div>
      `
    });

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (err: any) {
    console.error("SMTP Test Error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Unknown SMTP connection error" },
      { status: 500 }
    );
  }
}
