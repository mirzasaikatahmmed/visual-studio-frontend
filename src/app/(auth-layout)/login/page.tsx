"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Loader2, AlertCircle, Aperture } from "lucide-react";
import { loginApi, saveAuth } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setEmail("lens@visualstudioslens.com");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setError(null);

    try {
      const { user, token } = await loginApi(email, password);

      if (user.role !== "admin") {
        setError("Access denied. Admin accounts only.");
        return;
      }

      saveAuth(token, user);

      const from = searchParams.get("from");
      router.replace(from && from.startsWith("/admin") ? from : "/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">

      {/* Subtle brand radial glow behind the card */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, oklch(0.55 0.12 50 / 0.08), transparent 70%)",
        }}
      />

      {/* Back to home */}
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors z-10"
      >
        <ArrowLeft size={14} /> Back to Home
      </Link>

      <div className="w-full max-w-[420px] relative z-10">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8 gap-3">
          <div className="w-14 h-14 bg-brand-400 flex items-center justify-center shadow-lg"
            style={{ boxShadow: "0 8px 32px oklch(0.55 0.12 50 / 0.35)" }}
          >
            <Aperture size={24} className="text-white" />
          </div>
          <div className="text-center">
            <p className="font-bold text-sm uppercase tracking-[0.2em] leading-tight">Visual Studio</p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-0.5">Photography Studio</p>
          </div>
        </div>

        {/* Card — bg-card gives it elevation in dark mode */}
        <div className="bg-card border border-border shadow-2xl overflow-hidden">

          {/* Brand accent line */}
          <div className="h-[3px] bg-brand-400" />

          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold uppercase tracking-tight mb-2">
                Welcome Back
              </h1>
              <p className="text-muted-foreground text-sm">
                Sign in to your admin dashboard.
              </p>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="flex items-start gap-3 mb-6 px-4 py-3 bg-red-500/10 border border-red-500/30 text-red-500">
                <AlertCircle size={15} className="mt-0.5 shrink-0" />
                <p className="text-sm font-medium leading-snug">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  Email Address
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="lens@visualstudioslens.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={loading}
                  required
                  className="w-full bg-background border border-border px-4 py-3 text-sm outline-none transition-all disabled:opacity-50 placeholder:text-muted-foreground/50
                    focus:border-brand-400 focus:ring-2 focus:ring-brand-400/15"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    disabled={loading}
                    required
                    className="w-full bg-background border border-border px-4 py-3 pr-12 text-sm outline-none transition-all disabled:opacity-50 placeholder:text-muted-foreground/50
                      focus:border-brand-400 focus:ring-2 focus:ring-brand-400/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(p => !p)}
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || !email || !password}
                className="w-full bg-brand-400 text-white font-bold tracking-widest uppercase text-sm py-3.5 mt-1
                  hover:bg-brand-500 active:bg-brand-600 transition-colors
                  flex items-center justify-center gap-2
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Signing in…
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Footer note */}
            <div className="mt-7 pt-6 border-t border-border text-center space-y-1">
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                Admin access only
              </p>
              <p className="text-[11px] text-muted-foreground">
                Contact the studio owner to request access.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
