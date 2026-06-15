// app/admin/login/page.tsx
// Admin login page — consistent with main site's light, clean visual identity.
// Uses same logo, font (Poppins), and #FF6D00 brand color.
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Email atau password salah. Coba lagi.");
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen flex bg-[#fafafa]">
      {/* Left panel — brand accent */}
      <div className="hidden lg:flex w-[420px] flex-shrink-0 bg-[#FF6D00] flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Logo */}
        <div className="relative z-10 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/logonya.svg"
            alt="Maenews"
            className="h-20 w-auto mx-auto brightness-0 invert mb-8"
          />
          <h2 className="text-white text-2xl font-black leading-tight tracking-tight">
            Maenews CMS
          </h2>
          <p className="text-white/70 text-sm mt-2 font-medium">
            Content Management System
          </p>
        </div>
        {/* Bottom tagline */}
        <p className="absolute bottom-8 text-white/50 text-xs font-medium z-10">
          animae.id — Portal Berita Anime
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[400px]">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo/logonya.svg"
              alt="Maenews"
              className="h-12 w-auto mx-auto mb-2"
            />
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-black text-[#090909] tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-[#6b7280] mt-1 font-medium">
              Sign in to your admin account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6b7280] mb-1.5">
                Email
              </label>
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2.5 focus-within:border-[#FF6D00] transition-colors">
                <Mail size={15} className="text-[#a6a6a6] flex-shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@maenews.com"
                  className="flex-1 bg-transparent text-sm text-[#090909] placeholder:text-[#d1d5db] outline-none font-medium"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6b7280] mb-1.5">
                Password
              </label>
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2.5 focus-within:border-[#FF6D00] transition-colors">
                <Lock size={15} className="text-[#a6a6a6] flex-shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="flex-1 bg-transparent text-sm text-[#090909] placeholder:text-[#d1d5db] outline-none font-medium"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#a6a6a6] hover:text-[#6b7280] transition-colors cursor-pointer flex-shrink-0"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">
                <p className="text-red-600 text-xs font-medium">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF6D00] hover:bg-[#e56200] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold py-2.5 rounded-lg transition-colors cursor-pointer mt-2"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Dev credentials hint */}
          <div className="mt-6 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#a6a6a6] mb-1">
              Dev Credentials
            </p>
            <p className="text-[12px] text-[#6b7280] font-medium">
              admin@maenews.com / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
