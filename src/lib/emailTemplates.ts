export interface EmailParams {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  bookingDate: string;
  timeSlot: string;
  bookingType: string;
  locale?: "en" | "ar";
}

const getBaseStyles = (dir: "ltr" | "rtl") => `
  body { margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #070707; color: #ffffff; direction: ${dir}; text-align: ${dir === 'rtl' ? 'right' : 'left'}; }
  .wrapper { width: 100%; max-width: 600px; margin: 0 auto; background-color: #111110; border: 1px solid #c5a059; border-radius: 0px; overflow: hidden; }
  .header { padding: 40px 20px; text-align: center; background: linear-gradient(135deg, #111110 0%, #1c1c1a 100%); border-bottom: 2px solid #c5a059; }
  .logo { max-width: 140px; height: auto; margin-bottom: 20px; }
  .content { padding: 40px 30px; background-color: #111110; }
  .h1 { font-size: 24px; color: #ffffff; font-weight: 300; margin: 0 0 15px 0; letter-spacing: 1px; }
  .lead { font-size: 16px; color: #e0e0e0; line-height: 1.6; margin: 0 0 25px 0; }
  .details-box { background-color: #181817; border: 1px solid rgba(197, 160, 89, 0.2); padding: 25px; margin: 30px 0; }
  .details-row { display: table; width: 100%; margin-bottom: 12px; }
  .details-label { display: table-cell; width: 35%; font-weight: bold; color: #c5a059; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
  .details-value { display: table-cell; width: 65%; color: #ffffff; font-size: 14px; }
  .button-container { text-align: center; margin: 35px 0 15px 0; }
  .btn { display: inline-block; background-color: #c5a059; color: #070707 !important; text-decoration: none; padding: 15px 35px; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; transition: all 0.3s ease; }
  .footer { background-color: #070707; padding: 30px; text-align: center; border-top: 1px solid #1c1c1a; }
  .footer-text { font-size: 11px; color: #888888; margin: 0 0 10px 0; line-height: 1.5; }
  .footer-links { margin-top: 15px; }
  .footer-link { color: #c5a059; text-decoration: none; margin: 0 10px; font-size: 11px; }
`;

export function generateGuestConfirmationEmail({
  clientName,
  bookingDate,
  timeSlot,
  bookingType,
  locale = "en"
}: EmailParams): string {
  const isAr = locale === "ar";
  const dir = isAr ? "rtl" : "ltr";
  
  const title = isAr ? "تأكيد موعد الاستشارة الاستراتيجية" : "Strategic Consultation Confirmed";
  const greeting = isAr ? `عزيزنا ${clientName}،` : `Dear ${clientName},`;
  const body = isAr 
    ? `يسعدنا تأكيد موعد جلستك الاستشارية الاستراتيجية الآمنة مع مركز القرار. لقد تم حجز موعدك بنجاح ونحن متأهبون لمناقشة أهدافك الاستراتيجية.`
    : `We are pleased to confirm your secure strategic consultation session with Decision Center. Your appointment has been scheduled successfully, and our advisory team is prepared to address your objectives.`;
  
  const lblType = isAr ? "نوع الخدمة" : "Service Type";
  const lblDate = isAr ? "تاريخ الجلسة" : "Session Date";
  const lblTime = isAr ? "التوقيت" : "Time Slot";
  
  const footerMessage = isAr
    ? "هذه رسالة تلقائية من نظام حجز مركز القرار. يرجى عدم الرد المباشر على هذا البريد الإلكتروني."
    : "This is an automated notification from the Decision Center booking system. Please do not reply directly to this email.";
  
  return `
    <html>
      <head>
        <style>
          ${getBaseStyles(dir)}
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="header">
            <!-- Professional Gold Accent Accent Emblem -->
            <div style="font-size: 28px; color: #c5a059; font-weight: bold; letter-spacing: 2px;">DECISION CENTER</div>
            <div style="font-size: 9px; color: #ffffff; letter-spacing: 4px; margin-top: 5px; text-transform: uppercase;">Sovereign Financial Advisory</div>
          </div>
          <div class="content">
            <h1 class="h1">${title}</h1>
            <p class="lead">${greeting}</p>
            <p class="lead">${body}</p>
            
            <div class="details-box">
              <div class="details-row">
                <div class="details-label">${lblType}:</div>
                <div class="details-value">${bookingType}</div>
              </div>
              <div class="details-row">
                <div class="details-label">${lblDate}:</div>
                <div class="details-value">${bookingDate}</div>
              </div>
              <div class="details-row">
                <div class="details-label">${lblTime}:</div>
                <div class="details-value">${timeSlot}</div>
              </div>
            </div>
            
            <p class="lead" style="font-size: 14px;">
              ${isAr ? "إذا كنت بحاجة إلى تعديل أو إعادة جدولة الجلسة، يرجى التواصل معنا عبر واتساب مباشرة." : "If you need to reschedule or modify your appointment details, please coordinate with our staff via WhatsApp."}
            </p>
          </div>
          <div class="footer">
            <p class="footer-text">${footerMessage}</p>
            <p class="footer-text">© 2026 Decision Center. Muscat, Sultanate of Oman.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function generateManagerNotificationEmail({
  clientName,
  clientEmail,
  clientPhone,
  bookingDate,
  timeSlot,
  bookingType,
  locale = "en"
}: EmailParams): string {
  const isAr = locale === "ar";
  const dir = isAr ? "rtl" : "ltr";
  
  const title = isAr ? "تنبيه: حجز موعد جديد" : "Alert: New Consultation Booked";
  const leadText = isAr
    ? `تم تسجيل حجز جلسة استشارية جديدة عبر المنصة الرقمية. يرجى مراجعة التفاصيل أدناه:`
    : `A new strategic consultation session has been booked via the advisory portal. Please review the details below:`;
  
  const lblGuest = isAr ? "العميل" : "Guest Name";
  const lblEmail = isAr ? "البريد الإلكتروني" : "Email Address";
  const lblPhone = isAr ? "رقم الهاتف" : "Phone Number";
  const lblType = isAr ? "الخدمة المطلوبة" : "Requested Service";
  const lblDate = isAr ? "التاريخ" : "Session Date";
  const lblTime = isAr ? "التوقيت" : "Time Slot";
  
  return `
    <html>
      <head>
        <style>
          ${getBaseStyles(dir)}
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="header">
            <div style="font-size: 28px; color: #c5a059; font-weight: bold; letter-spacing: 2px;">DECISION CENTER</div>
            <div style="font-size: 9px; color: #ffffff; letter-spacing: 4px; margin-top: 5px; text-transform: uppercase;">Console Alert</div>
          </div>
          <div class="content">
            <h1 class="h1">${title}</h1>
            <p class="lead">${leadText}</p>
            
            <div class="details-box">
              <div class="details-row">
                <div class="details-label">${lblGuest}:</div>
                <div class="details-value">${clientName}</div>
              </div>
              <div class="details-row">
                <div class="details-label">${lblEmail}:</div>
                <div class="details-value">${clientEmail}</div>
              </div>
              <div class="details-row">
                <div class="details-label">${lblPhone}:</div>
                <div class="details-value">${clientPhone}</div>
              </div>
              <div class="details-row">
                <div class="details-label">${lblType}:</div>
                <div class="details-value">${bookingType}</div>
              </div>
              <div class="details-row">
                <div class="details-label">${lblDate}:</div>
                <div class="details-value">${bookingDate}</div>
              </div>
              <div class="details-row">
                <div class="details-label">${lblTime}:</div>
                <div class="details-value">${timeSlot}</div>
              </div>
            </div>
            
            <div class="button-container">
              <a href="https://tcexxkpaqaobdxfpcqri.supabase.co/admin" class="btn" style="color: #070707;">
                ${isAr ? "دخول لوحة التحكم" : "Open Admin Portal"}
              </a>
            </div>
          </div>
          <div class="footer">
            <p class="footer-text">© 2026 Decision Center Console. Muscat, Oman.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function generateReminderEmail({
  clientName,
  bookingDate,
  timeSlot,
  bookingType,
  locale = "en"
}: EmailParams, isOneHourBefore = false): string {
  const isAr = locale === "ar";
  const dir = isAr ? "rtl" : "ltr";
  
  const title = isAr
    ? (isOneHourBefore ? "تذكير: تبدأ جلستك الاستشارية بعد ساعة" : "تذكير بموعد جلستك الاستشارية غداً")
    : (isOneHourBefore ? "Reminder: Your session begins in 1 hour" : "Reminder: Your consultation is tomorrow");
    
  const greeting = isAr ? `عزيزنا ${clientName}،` : `Dear ${clientName},`;
  const body = isAr
    ? (isOneHourBefore 
        ? `نود تذكيرك بأن جلستك الاستشارية الاستراتيجية مع مركز القرار ستبدأ خلال ساعة واحدة من الآن. نتطلع للقائك قريباً.`
        : `هذا تذكير ودي بجلسة الاستشارة الاستراتيجية الخاصة بك والمنظمة غداً. يرجى مراجعة التفاصيل لتأكيد حضورك وموعد الجلسة.`)
    : (isOneHourBefore
        ? `This is a reminder that your strategic consultation session with Decision Center is scheduled to begin in 1 hour. We look forward to meeting with you shortly.`
        : `This is a friendly reminder that your strategic consultation session with Decision Center is scheduled for tomorrow. Please review the details below.`);
        
  const lblType = isAr ? "نوع الخدمة" : "Service Type";
  const lblDate = isAr ? "التاريخ" : "Session Date";
  const lblTime = isAr ? "التوقيت" : "Time Slot";
  
  return `
    <html>
      <head>
        <style>
          ${getBaseStyles(dir)}
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="header">
            <div style="font-size: 28px; color: #c5a059; font-weight: bold; letter-spacing: 2px;">DECISION CENTER</div>
            <div style="font-size: 9px; color: #ffffff; letter-spacing: 4px; margin-top: 5px; text-transform: uppercase;">Session Reminder</div>
          </div>
          <div class="content">
            <h1 class="h1">${title}</h1>
            <p class="lead">${greeting}</p>
            <p class="lead">${body}</p>
            
            <div class="details-box">
              <div class="details-row">
                <div class="details-label">${lblType}:</div>
                <div class="details-value">${bookingType}</div>
              </div>
              <div class="details-row">
                <div class="details-label">${lblDate}:</div>
                <div class="details-value">${bookingDate}</div>
              </div>
              <div class="details-row">
                <div class="details-label">${lblTime}:</div>
                <div class="details-value">${timeSlot}</div>
              </div>
            </div>
            
            <p class="lead" style="font-size: 14px;">
              ${isAr ? "إذا كنت بحاجة للمساعدة، يرجى الرد أو التواصل معنا مباشرة عبر واتساب." : "If you require any coordination help, please get in touch via WhatsApp."}
            </p>
          </div>
          <div class="footer">
            <p class="footer-text">© 2026 Decision Center. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function generateThankYouEmail({
  clientName,
  bookingType,
  locale = "en"
}: EmailParams): string {
  const isAr = locale === "ar";
  const dir = isAr ? "rtl" : "ltr";
  
  const title = isAr ? "نشكرك على حضور جلستك الاستشارية" : "Thank You for Attending Your Session";
  const greeting = isAr ? `عزيزنا ${clientName}،` : `Dear ${clientName},`;
  const body = isAr
    ? `نشكرك جزيل الشكر على حضور جلستك الاستشارية الاستراتيجية لخدمة "${bookingType}" اليوم. نسعد دائماً بكوننا شريكك الاستراتيجي في بناء نجاحاتك وتطوير أعمالك.`
    : `Thank you for attending your strategic consultation session regarding "${bookingType}" today. It was a pleasure discussing your requirements, and we are privileged to be your partner in structuring success.`;
    
  const leadNext = isAr
    ? "فريقنا يعكف حالياً على صياغة التوصيات الاستراتيجية المخطط لها. سنقوم بمشاركتها معك قريباً."
    : "Our advisory board is compiling the strategic action recommendations from today's brief. We will share the executive summary shortly.";
    
  return `
    <html>
      <head>
        <style>
          ${getBaseStyles(dir)}
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="header">
            <div style="font-size: 28px; color: #c5a059; font-weight: bold; letter-spacing: 2px;">DECISION CENTER</div>
            <div style="font-size: 9px; color: #ffffff; letter-spacing: 4px; margin-top: 5px; text-transform: uppercase;">Sovereign Financial Advisory</div>
          </div>
          <div class="content">
            <h1 class="h1">${title}</h1>
            <p class="lead">${greeting}</p>
            <p class="lead">${body}</p>
            <p class="lead">${leadNext}</p>
            
            <div class="button-container" style="margin-top: 40px;">
              <div style="border-top: 1px solid #1c1c1a; padding-top: 20px; font-style: italic; color: #c5a059;">
                ${isAr ? "شريكك الموثوق في صنع القرار الاستراتيجي" : "Your trusted partner in strategic decisions"}
              </div>
            </div>
          </div>
          <div class="footer">
            <p class="footer-text">© 2026 Decision Center. Muscat, Oman.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
