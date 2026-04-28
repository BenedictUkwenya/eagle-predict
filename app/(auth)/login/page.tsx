"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Trophy, Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      setError("Invalid email or password. Please try again.");
    } else {
      toast.success("Welcome back! 🎉");
      router.push(callbackUrl);
    }
  }

  return (
    <div className="w-full max-w-md">
      {/* Card */}
      <div className="bg-base-100 border border-base-300 rounded-2xl shadow-xl p-8">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mx-auto mb-3">
            <Trophy size={24} className="text-white" />
          </div>
          <h1 className="font-display font-bold text-2xl">
            Welcome back
          </h1>
          <p className="text-base-content/60 text-sm mt-1">
            Sign in to your EaglePredict account
          </p>
        </div>

        {/* Demo hint */}
        <div className="alert alert-info mb-4 py-2">
          <AlertCircle size={14} className="flex-shrink-0" />
          <div className="text-xs">
            <strong>Demo:</strong> Use any email + password (6+ chars) to sign in
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="alert alert-error mb-4 py-2 text-sm">
            <AlertCircle size={14} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-sm font-medium">Email address</span>
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input input-bordered w-full pl-9 text-sm"
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-sm font-medium">Password</span>
              <Link href="/forgot-password" className="label-text-alt text-primary hover:underline text-xs">
                Forgot password?
              </Link>
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="input input-bordered w-full pl-9 pr-10 text-sm"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full mt-2"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="divider text-xs text-base-content/40 my-4">
          Don&apos;t have an account?
        </div>

        <Link
          href="/signup"
          className="btn btn-outline btn-primary w-full"
        >
          Create Free Account
        </Link>
      </div>

      <p className="text-center text-xs text-base-content/40 mt-4">
        By signing in, you agree to our{" "}
        <Link href="/terms-of-service" className="hover:text-primary">Terms</Link>
        {" "}and{" "}
        <Link href="/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="w-full max-w-md"><div className="bg-base-100 border border-base-300 rounded-2xl shadow-xl p-8 animate-pulse h-96" /></div>}>
      <LoginContent />
    </Suspense>
  );
}
