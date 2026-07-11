import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path') || '/';

  // Define markdown content based on the page requested
  let markdown = '';

  if (path === '/' || path === '/ar') {
    const isArabic = path.startsWith('/ar');
    markdown = isArabic ? `
# مركز القرار للاستشارات المالية والاقتصادية
**شريككم الاستراتيجي في صياغة المستقبل المالي**

## عن مركز القرار
نحن نقدم استشارات متخصصة في التحليل الاقتصادي، وهيكلة الأصول، ودعم القرارات السيادية والمؤسسية لتحقيق نمو مستدام استثنائي.

## خدماتنا الرئيسية
1. **إعادة هيكلة الأصول**: تحسين رأس المال وكفاءة الثروات.
2. **النمو الاقتصادي**: دراسات الجدوى والتحليلات الاستباقية للسوق العماني والخليجي.
3. **التمويل المصرفي واستشارات المشاريع**: تأمين التسهيلات الائتمانية والتمويل.

## تواصل معنا
* **الموقع الإلكتروني**: [https://www.dcenterfe.com/ar/contact](https://www.dcenterfe.com/ar/contact)
* **رقم الواتساب**: +968 96680001
    ` : `
# Decision Center for Financial & Economic Consulting
**Where Vision Meets Decision**

## About Us
Your strategic partner in crafting the financial future. We provide deep expertise in economic analysis, asset restructuring, and supporting sovereign and institutional decisions for exceptional sustainable growth.

## Core Capabilities
1. **Asset Restructuring**: Wealth optimization and capital efficiency.
2. **Economic Growth**: Feasibility studies, market entry, and predictive economic modeling.
3. **Project Finance & Banking Advisory**: Securing credit facilities and funding solutions.

## Contact Information
* **Website**: [https://www.dcenterfe.com/contact](https://www.dcenterfe.com/contact)
* **WhatsApp**: +968 96680001
    `;
  } else if (path.includes('/about')) {
    const isArabic = path.startsWith('/ar');
    markdown = isArabic ? `
# من نحن - مركز القرار
تأسس مركز القرار لتقديم استشارات مالية واقتصادية سيادية رفيعة المستوى في سلطنة عمان.

## رؤيتنا
ريادة الاستشارات المالية والاقتصادية وتقديم حلول مبنية على رؤى تحليلية دقيقة تدعم صناع القرار.

## رسالتنا
مساعدة المؤسسات والجهات السيادية على تحقيق أهدافها الاقتصادية عبر استراتيجيات مبتكرة وحلول تمويلية وهيكلية مدروسة.
    ` : `
# About Us - Decision Center
Decision Center was established to provide high-level sovereign financial and economic advisory services in the Sultanate of Oman.

## Our Vision
To lead in financial and economic consulting and deliver analytical-driven insights that empower key decision-makers.

## Our Mission
To support institutions and sovereign entities in achieving their economic goals through innovative strategies, structural optimization, and tailored funding solutions.
    `;
  } else if (path.includes('/services')) {
    const isArabic = path.startsWith('/ar');
    markdown = isArabic ? `
# خدماتنا - مركز القرار للاستشارات المالية والاقتصادية

نقدم حزمة متكاملة من الحلول المالية والاقتصادية المتقدمة:

1. **إعادة هيكلة الأصول والشركات**
   * استراتيجيات دمج وتصفية وتبسيط الهياكل الإدارية والمالية.
   * تحسين التدفقات النقدية وتحقيق كفاءة التشغيل.

2. **الاستشارات الاقتصادية ودراسات الجدوى**
   * دراسات جدوى شاملة للمشاريع الاستثمارية الكبرى.
   * تحليل جدوى السوق والجدوى الفنية والمالية والاقتصادية.

3. **الاستشارات المصرفية والتمويلية**
   * هيكلة صفقات التمويل والقروض المشتركة.
   * إعداد ملفات التمويل للمصارف وجهات التمويل السيادية والخاصة.
    ` : `
# Our Services - Decision Center for Financial & Economic Consulting

We offer a comprehensive suite of advanced financial and economic services:

1. **Asset & Corporate Restructuring**
   * Mergers, acquisitions, and asset simplification strategies.
   * Maximizing cash flows and achieving operational efficiency.

2. **Economic Advisory & Feasibility Studies**
   * Full-scale feasibility studies for major investment projects.
   * Comprehensive market, technical, financial, and economic feasibility analysis.

3. **Banking & Project Finance Advisory**
   * Structuring project finance and syndicated loans.
   * Preparing professional funding packages for commercial and developmental banks.
    `;
  } else if (path.includes('/methodology')) {
    const isArabic = path.startsWith('/ar');
    markdown = isArabic ? `
# منهجيتنا - مركز القرار
نعتمد على منهجية علمية وتحليلية تجمع بين فهم الواقع المحلي ورؤية التطورات العالمية.

## خطوات عملنا
1. **التحليل والتشخيص**: فهم واقع المؤسسة والبيانات المالية.
2. **التخطيط الاستراتيجي**: صياغة السيناريوهات والخيارات البديلة.
3. **التنفيذ والمتابعة**: تقديم الدعم العملي لتنفيذ الهيكلة والتمويل بنجاح.
    ` : `
# Our Methodology - Decision Center
Our consulting approach is rooted in rigorous analytical methodologies that balance local regulatory insights with global financial practices.

## Process Phases
1. **Analysis & Diagnosis**: Deep dive into organizational context and financial telemetry.
2. **Strategic Formulation**: Developing multiple scenarios and tailored solutions.
3. **Execution Support**: Practical guidance in securing finance or implementing restructuring workflows.
    `;
  } else if (path.includes('/contact')) {
    const isArabic = path.startsWith('/ar');
    markdown = isArabic ? `
# اتصل بنا - مركز القرار

يسعدنا تواصلكم لمناقشة متطلباتكم الاستشارية:

* **العنوان**: صحار، سلطنة عمان
* **البريد الإلكتروني**: info@dcenterfe.com
* **رقم الواتساب**: +968 96680001
* **طلب الاستشارة**: يمكنك تقديم طلب عبر موقعنا الرئيسي [https://www.dcenterfe.com/ar/contact](https://www.dcenterfe.com/ar/contact)
    ` : `
# Contact Us - Decision Center

We welcome your inquiries to discuss your consulting requirements:

* **Address**: Sohar, Sultanate of Oman
* **Email**: info@dcenterfe.com
* **WhatsApp**: +968 96680001
* **Consultation Request**: Submit a request via our website [https://www.dcenterfe.com/contact](https://www.dcenterfe.com/contact)
    `;
  } else {
    markdown = `
# Decision Center for Financial & Economic Consulting
Access our main portal at [https://www.dcenterfe.com](https://www.dcenterfe.com).
    `;
  }

  return new Response(markdown.trim(), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
