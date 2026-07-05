"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header({ locale }: { locale: "en" | "ar" }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Compute alternative language link
  const getAltLangLink = () => {
    if (locale === "ar") {
      const newPath = pathname.replace(/^\/ar(\/|$)/, "/");
      return newPath === "" ? "/" : newPath;
    } else {
      return `/ar${pathname === "/" ? "" : pathname}`;
    }
  };

  const altLink = getAltLangLink();

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

  const brandName = locale === "en" ? "Decision Center" : "مركز القرار";
  const requestConsultation = locale === "en" ? "Request Advisory" : "طلب استشارة";

  const isLinkActive = (href: string) => {
    if (href === "/" || href === "/ar") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-2xl border-b border-outline-variant/20"
          : "bg-background border-b border-outline-variant/10"
      }`}
    >
      <nav className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto h-full">
        <Link
          href={locale === "en" ? "/" : "/ar"}
          className="flex items-center gap-3"
        >
          <img src="/dc-logo.png" alt="Decision Center Logo" className="h-10 w-auto object-contain" />
          <span className="font-display-lg text-headline-md font-bold text-foreground tracking-tighter">{brandName}</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8 items-center h-full">
          {links.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <li key={link.href} className="h-full flex items-center">
                <Link
                  href={link.href}
                  className={`font-sans text-lg h-full flex items-center hover:bg-secondary/10 px-4 transition-all duration-300 ${
                     active
                       ? "text-secondary font-bold border-b-2 border-secondary pb-1"
                       : "text-on-surface-variant hover:text-foreground"
                   }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href={altLink}
            onClick={() => {
              document.cookie = `NEXT_LOCALE=${locale === "en" ? "ar" : "en"}; path=/; max-age=31536000`;
            }}
            className="flex items-center gap-2 px-3 py-1.5 border border-secondary/30 rounded-none text-secondary hover:bg-secondary/10 transition-all duration-300 font-label-caps text-label-caps"
          >
            <span className="material-symbols-outlined text-[18px]">language</span>
            <span>{locale === "en" ? "AR" : "EN"}</span>
          </Link>
          <Link
            href={locale === "en" ? "/contact" : "/ar/contact"}
            className="bg-secondary text-background hover:bg-transparent hover:text-secondary border border-secondary transition-all duration-300 px-6 py-2 rounded-none font-label-caps text-label-caps"
          >
            {requestConsultation}
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden flex items-center gap-2">
          <Sheet>
            <SheetTrigger className="text-foreground p-2 cursor-pointer bg-transparent border-none">
              <span className="material-symbols-outlined text-2xl">menu</span>
            </SheetTrigger>
            <SheetContent
              side={locale === "en" ? "right" : "left"}
              className="w-[280px] bg-background border-outline-variant/20 p-6 flex flex-col gap-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <img src="/dc-logo.png" alt="Decision Center Logo" className="h-8 w-auto object-contain" />
                <span className="font-display-lg text-headline-md font-bold text-foreground tracking-tighter">{brandName}</span>
              </div>
              <div className="flex flex-col gap-4 flex-grow">
                {links.map((link) => {
                  const active = isLinkActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`font-sans text-lg ${
                         active ? "text-secondary font-bold" : "text-on-surface-variant hover:text-foreground"
                       }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
              <div className="h-px bg-outline-variant/20 my-2"></div>
              <div className="flex flex-col gap-4">
                <Link
                  href={altLink}
                  onClick={() => {
                    document.cookie = `NEXT_LOCALE=${locale === "en" ? "ar" : "en"}; path=/; max-age=31536000`;
                  }}
                  className="flex items-center justify-center gap-2 px-3 py-2 border border-secondary/30 rounded-none text-secondary hover:bg-secondary/10 transition-all duration-300 font-label-caps text-label-caps text-center"
                >
                  <span className="material-symbols-outlined text-[18px]">language</span>
                  <span>{locale === "en" ? "العربية" : "English"}</span>
                </Link>
                <Link
                  href={locale === "en" ? "/contact" : "/ar/contact"}
                  className="bg-secondary text-background hover:bg-transparent hover:text-secondary border border-secondary transition-all duration-300 px-6 py-3 rounded-none font-label-caps text-label-caps text-center"
                >
                  {requestConsultation}
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
