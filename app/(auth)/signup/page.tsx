"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  Trophy,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Check,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";

const BENEFITS = [
  "Save your favourite predictions",
  "Get email alerts for big matches",
  "Personalised accumulator tips",
  "Access exclusive premium tips",
];

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);

  const passwordStrength = (() => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  })();

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][passwordStrength];
  const strengthColor = ["", "bg-error", "bg-warning", "bg-info", "bg-success"][passwordStrength];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    if (!agreed) {
      setError("Please accept the terms and conditions.");
      return;
    }

    setLoading(true);

    // In a real app you'd POST to /api/auth/register first.
    // Here we sign in directly (the mock provider accepts any valid credentials).
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Something went wrong. Please try again.");
    } else {
      toast.success(`Welcome to EaglePredict, ${name}! 🎉`);
      router.push("/");
    }
  }

  return (
    <div className="w-full max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Benefits */}
        <div className="hidden md:flex flex-col justify-center">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4">
            <Trophy size={24} className="text-white" />
          </div>
          <h2 className="font-display font-bold text-3xl mb-2">
            Join Eagle<span className="text-primary">Predict</span>
          </h2>
          <p className="text-base-content/60 text-sm mb-6">
            Get free daily football predictions from expert analysts. Thousands of punters trust us every day.
          </p>
          <ul className="space-y-3">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-secondary" />
                </div>
                <span className="text-sm">{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 bg-primary/5 border border-primary/20 rounded-xl p-4">
            <p className="text-xs text-base-content/60">
              "EaglePredict has been my go-to prediction site for over a year. The analysis is detailed and the tips are accurate."
            </p>
            <p className="text-xs font-semibold mt-2">— Olumide A., Lagos</p>
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-base-100 border border-base-300 rounded-2xl shadow-xl p-8">
          {/* Mobile logo */}
          <div className="text-center mb-5 md:hidden">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center mx-auto mb-2">
              <Trophy size={20} className="text-white" />
            </div>
            <h1 className="font-display font-bold text-xl">Create Account</h1>
          </div>

          <h2 className="hidden md:block font-bold text-xl mb-5">Create your free account</h2>

          {/* Error */}
          {error && (
            <div className="alert alert-error mb-4 py-2 text-sm">
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Name */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-sm font-medium">Full name</span>
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="input input-bordered w-full pl-9 text-sm"
                  autoComplete="name"
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-sm font-medium">Email address</span>
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
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
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="input input-bordered w-full pl-9 pr-10 text-sm"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {/* Password strength */}
              {password && (
                <div className="mt-1.5 space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          i <= passwordStrength ? strengthColor : "bg-base-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[10px] text-base-content/60">
                    Password strength: <span className="font-semibold">{strengthLabel}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-sm font-medium">Confirm password</span>
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={`input input-bordered w-full pl-9 text-sm ${
                    confirmPassword && confirmPassword !== password ? "input-error" : ""
                  }`}
                  autoComplete="new-password"
                />
                {confirmPassword && confirmPassword === password && (
                  <Check size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-success" />
                )}
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2.5 cursor-pointer mt-1">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="checkbox checkbox-primary checkbox-sm mt-0.5 flex-shrink-0"
              />
              <span className="text-xs text-base-content/70 leading-relaxed">
                I agree to the{" "}
                <Link href="/terms-of-service" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                . I confirm I am 18+ years old.
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !agreed}
              className="btn btn-primary w-full mt-1"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "Create Free Account"
              )}
            </button>
          </form>

          <div className="divider text-xs text-base-content/40 my-4">
            Already have an account?
          </div>

          <Link href="/login" className="btn btn-outline btn-primary w-full">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
