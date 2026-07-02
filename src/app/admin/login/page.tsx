"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isUsingSupabase, setIsUsingSupabase] = useState(false);

  useEffect(() => {
    setIsUsingSupabase(isSupabaseConfigured());
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isUsingSupabase) {
        // Authenticate with Supabase
        const { data, error: authError } = await supabase.auth.signInWithPassword({
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
          throw new Error("Invalid credentials. Use 'admin@dcenter.om' / 'decision2026' for mock login.");
        }
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070707] px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#111110] border border-outline-variant/10 p-8 relative">
        {/* Top gold border design */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent"></div>

        <div className="text-center mb-8">
          <h1 className="font-display-lg text-headline-lg text-foreground tracking-wide">
            Decision Center
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
            Institutional Management System
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 border border-red-500/20 bg-red-500/5 text-red-400 font-body-sm text-body-sm rounded-none text-center">
            {error}
          </div>
        )}

        {!isUsingSupabase && (
          <div className="mb-6 p-3 border border-secondary/20 bg-secondary/5 text-secondary font-body-sm text-[12px] text-center">
            Note: Running in **Mock Offline Mode**. Log in with:<br />
            <strong>admin@dcenter.om</strong> / <strong>decision2026</strong>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1">
            <label className="font-body-sm text-body-sm text-foreground block">
              Email Address
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

          <div className="space-y-1">
            <label className="font-body-sm text-body-sm text-foreground block">
              Password
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary text-primary-container py-4 font-label-caps text-label-caps font-semibold border border-secondary hover:bg-transparent hover:text-secondary transition-all duration-300 shadow-[0_0_15px_rgba(197,160,89,0.2)] disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Authenticating..." : "Access Console"}
          </button>
        </form>
      </div>
    </div>
  );
}
