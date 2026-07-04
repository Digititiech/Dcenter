"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { adminTranslations } from "@/lib/adminTranslations";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMethod, setLoginMethod] = useState<"password" | "magic">("password");
  const [magicSent, setMagicSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isUsingSupabase, setIsUsingSupabase] = useState(false);
  const [locale, setLocale] = useState<"en" | "ar">("en");

  useEffect(() => {
    setIsUsingSupabase(isSupabaseConfigured());
    const savedLocale = localStorage.getItem("admin-locale") as "en" | "ar" | null;
    if (savedLocale === "ar" || savedLocale === "en") {
      setLocale(savedLocale);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const t = adminTranslations[locale].login;

    try {
      if (loginMethod === "password") {
        if (isUsingSupabase) {
          const { error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (authError) throw authError;
          router.push("/admin");
        } else {
          // Fallback mock authentication
          if (email === "admin@dcenter.om" && password === "decision2026") {
            localStorage.setItem("mock-admin-auth", "true");
            router.push("/admin");
          } else {
            throw new Error(t.errorMock);
          }
        }
      } else {
        // Magic link auth
        if (isUsingSupabase) {
          const { error: authError } = await supabase.auth.signInWithOtp({
            email,
            options: {
              emailRedirectTo: `${window.location.origin}/admin`,
            },
          });
          if (authError) throw authError;
          setMagicSent(true);
        } else {
          throw new Error("Magic link login is only supported when connected to Supabase.");
        }
      }
    } catch (err: any) {
      setError(err.message || t.errorDefault);
    } finally {
      setLoading(false);
    }
  };

  const t = adminTranslations[locale].login;

  const toggleLocale = () => {
    const next = locale === "en" ? "ar" : "en";
    setLocale(next);
    localStorage.setItem("admin-locale", next);
  };

  return (
    <div
      dir={locale === "ar" ? "rtl" : "ltr"}
      style={locale === "ar" ? { fontFamily: "var(--font-arabic), var(--font-sans)" } : {}}
      className="min-h-screen flex items-center justify-center bg-[#070707] px-4 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#111110] border border-outline-variant/10 p-8 relative">
        {/* Top gold border design */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent"></div>

        {/* Floating Language Switcher */}
        <button
          type="button"
          onClick={toggleLocale}
          className="absolute top-4 right-4 rtl:right-auto rtl:left-4 flex items-center gap-1.5 text-xs text-on-surface-variant hover:text-secondary transition-colors cursor-pointer border border-outline-variant/20 px-2.5 py-1 z-20"
        >
          <span className="material-symbols-outlined text-[14px]">language</span>
          {locale === "en" ? "العربية" : "English"}
        </button>

        <div className="text-center mb-8">
          <h1 className="font-display-lg text-headline-lg text-foreground tracking-wide">
            {t.title}
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
            {t.subtitle}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-outline-variant/10 mb-6">
          <button
            type="button"
            onClick={() => { setLoginMethod("password"); setError(null); setMagicSent(false); }}
            className={`flex-1 pb-3 text-xs uppercase tracking-wider font-label-caps text-center border-b-2 cursor-pointer transition-all ${
              loginMethod === "password" ? "border-secondary text-secondary font-bold" : "border-transparent text-on-surface-variant hover:text-foreground"
            }`}
          >
            {t.passwordTab}
          </button>
          <button
            type="button"
            onClick={() => { setLoginMethod("magic"); setError(null); setMagicSent(false); }}
            className={`flex-1 pb-3 text-xs uppercase tracking-wider font-label-caps text-center border-b-2 cursor-pointer transition-all ${
              loginMethod === "magic" ? "border-secondary text-secondary font-bold" : "border-transparent text-on-surface-variant hover:text-foreground"
            }`}
          >
            {t.magicLinkTab}
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 border border-red-500/20 bg-red-500/5 text-red-400 font-body-sm text-body-sm rounded-none text-center">
            {error}
          </div>
        )}

        {!isUsingSupabase && loginMethod === "password" && (
          <div className="mb-6 p-3 border border-secondary/20 bg-secondary/5 text-secondary font-body-sm text-[12px] text-center">
            {t.mockModeNote}<br />
            <strong>admin@dcenter.om</strong> / <strong>decision2026</strong>
          </div>
        )}

        {magicSent ? (
          <div className="p-6 border border-emerald-500/20 bg-emerald-500/5 text-center space-y-4">
            <span className="material-symbols-outlined text-4xl text-emerald-400">mark_email_read</span>
            <h3 className="font-display-lg text-headline-sm text-foreground">{t.linkSentTitle}</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              {t.linkSentDesc.split("{email}")[0]}
              <strong>{email}</strong>
              {t.linkSentDesc.split("{email}")[1] || ""}
            </p>
            <button
              onClick={() => setMagicSent(false)}
              className="text-secondary text-xs font-label-caps underline hover:text-foreground cursor-pointer block mx-auto pt-2"
            >
              {t.btnResend}
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1">
              <label className="font-body-sm text-body-sm text-foreground block">
                {t.emailLabel}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@dcenter.om"
                className="w-full bg-[#181817] border border-outline-variant/20 text-foreground font-body-sm text-body-sm px-4 py-3 rounded-none focus:outline-none focus:border-secondary transition-colors"
                required
              />
            </div>

            {loginMethod === "password" && (
              <div className="space-y-1">
                <label className="font-body-sm text-body-sm text-foreground block">
                  {t.passwordLabel}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#181817] border border-outline-variant/20 text-foreground font-body-sm text-body-sm px-4 py-3 rounded-none focus:outline-none focus:border-secondary transition-colors"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-secondary text-primary-container py-4 font-label-caps text-label-caps font-semibold border border-secondary hover:bg-transparent hover:text-secondary transition-all duration-300 shadow-[0_0_15px_rgba(197,160,89,0.2)] disabled:opacity-50 cursor-pointer"
            >
              {loading
                ? t.btnProcessing
                : loginMethod === "password"
                ? t.btnAccessConsole
                : t.btnSendMagicLink}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
