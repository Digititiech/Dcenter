import Link from "next/link";

export default function Footer({ locale }: { locale: "en" | "ar" }) {
  const brandName = locale === "en" ? "Decision Center" : "مركز القرار";
  const desc =
    locale === "en"
      ? "Trusted financial and economic advisory. We offer professional solutions for corporate and sovereign entities to ensure stable financial futures in Sohar, Oman, and the wider region."
      : "خبرة مالية واستشارية موثوقة. نقدم حلولاً مهنية للكيانات المؤسسية والسيادية لضمان مستقبل مالي مستقر في سلطنة عمان والمنطقة.";

  const quickLinksTitle = locale === "en" ? "Quick Links" : "روابط هامة";
  const contactTitle = locale === "en" ? "Contact Us" : "تواصل معنا";

  const links = locale === "en" ? [
    { href: "/", label: "Home" },
    { href: "/about", label: "Our Firm" },
    { href: "/services", label: "Services" },
    { href: "/methodology", label: "Methodology" },
    { href: "/ai-assistant", label: "AI Assistant" },
    { href: "/contact", label: "Contact" }
  ] : [
    { href: "/ar", label: "الرئيسية" },
    { href: "/ar/about", label: "شركتنا" },
    { href: "/ar/services", label: "خدماتنا" },
    { href: "/ar/methodology", label: "منهجيتنا" },
    { href: "/ar/ai-assistant", label: "المساعد الذكي" },
    { href: "/ar/contact", label: "اتصل بنا" }
  ];

  const address = locale === "en" ? "Sohar, Sultanate of Oman" : "صحار، سلطنة عمان";
  const copyright =
    locale === "en"
      ? "© 2026 Decision Center. All rights reserved. Registered in Oman."
      : "© 2026 مركز القرار. جميع الحقوق محفوظة. مسجل في سلطنة عمان.";

  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/30 text-secondary mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto">
        <div className="col-span-1 md:col-span-4 flex flex-col gap-6">
          <Link
            href={locale === "en" ? "/" : "/ar"}
            className="flex items-center gap-3"
          >
            <img src="/dc-logo.png" alt="Decision Center Logo" className="h-10 w-auto object-contain" />
            <span className="font-display-lg text-headline-md font-bold text-secondary">{brandName}</span>
          </Link>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
            {desc}
          </p>
        </div>
        <div className="col-span-1 md:col-span-4 flex flex-col gap-4">
          <h4 className="font-label-caps text-label-caps text-on-background mb-2">
            {contactTitle}
          </h4>
          <ul className="flex flex-col gap-3 font-body-sm text-body-sm">
            <li>
              <span className="text-on-surface-variant flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">location_on</span>
                <span>{address}</span>
              </span>
            </li>
            <li>
              <a
                className="text-on-surface-variant hover:text-secondary transition-colors flex items-center gap-2"
                href="tel:+96896680001"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                <span dir="ltr">+968 96680001</span>
              </a>
            </li>
            <li>
              <a
                className="text-on-surface-variant hover:text-secondary transition-colors flex items-center gap-2"
                href="mailto:info@dcenterfe.com"
              >
                <span className="material-symbols-outlined text-[18px]">mail</span>
                <span>info@dcenterfe.com</span>
              </a>
            </li>
            <li>
              <a
                className="text-on-surface-variant hover:text-secondary transition-colors flex items-center gap-2"
                href="https://instagram.com/center.decision"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span>center.decision</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="col-span-1 md:col-span-4 flex flex-col gap-4">
          <h4 className="font-label-caps text-label-caps text-on-background mb-2">
            {quickLinksTitle}
          </h4>
          <ul className="flex flex-col gap-3 font-body-sm text-body-sm">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  className="text-on-surface-variant hover:text-secondary transition-colors"
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-1 md:col-span-12 mt-12 pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            {copyright}
          </p>
          <div className="flex gap-6 items-center">
            <Link
              href="/admin/login"
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors"
            >
              {locale === "en" ? "Admin Login" : "دخول المسؤول"}
            </Link>
            <div className="flex gap-4">
              <span className="text-on-surface-variant hover:text-secondary transition-colors cursor-pointer">
                <span className="material-symbols-outlined">language</span>
              </span>
              <span className="text-on-surface-variant hover:text-secondary transition-colors cursor-pointer">
                <span className="material-symbols-outlined">public</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
