"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "@/components/providers/ThemeProvider";
import {
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  Trophy,
  Star,
  BookOpen,
  Layers,
  LogIn,
  User,
  LogOut,
  Bell,
  Home,
} from "lucide-react";
import MobileMenu from "./MobileMenu";

const NAV_LINKS = [
  {
    label: "Predictions",
    href: "/predictions",
    icon: <Trophy size={16} />,
    children: [
      { label: "All Predictions", href: "/predictions" },
      { label: "Straight Win", href: "/predictions/straight-win" },
      { label: "Correct Score", href: "/predictions/correct-score" },
      { label: "Over 2.5 Goals", href: "/predictions/over-25-goals" },
      { label: "Both Teams to Score", href: "/predictions/both-teams-to-score" },
      { label: "Double Chance", href: "/predictions/double-chance" },
      { label: "Sure 2 Odd", href: "/predictions/sure-2-odd" },
      { label: "Sure 3 Odd", href: "/predictions/sure-3-odd" },
      { label: "Draw No Bet", href: "/predictions/dnb" },
      { label: "Half Time / Full Time", href: "/predictions/half-time-full-time" },
      { label: "Asian Handicap", href: "/predictions/handicap" },
      { label: "Over 1.5 Goals", href: "/predictions/over-15" },
      { label: "Under 3.5 Goals", href: "/predictions/under-35-goals" },
      { label: "Multigoals", href: "/predictions/multigoals" },
      { label: "Win Either Half", href: "/predictions/win-either-halves" },
      { label: "Rollover 130 Odds", href: "/predictions/roll-over-130-odds" },
      { label: "Over 9.5 Corners", href: "/predictions/over-95-corners" },
    ],
  },
  {
    label: "Accumulator",
    href: "/predictions/accumulator-tips",
    icon: <Layers size={16} />,
    children: [
      { label: "Accumulator of the Day", href: "/predictions/accumulator-tips" },
      { label: "Bet of the Day", href: "/predictions/bet-of-the-day" },
    ],
  },
  {
    label: "By Day",
    href: "/predictions/tomorrow",
    icon: <Star size={16} />,
    children: [
      { label: "Today's Predictions", href: "/" },
      { label: "Tomorrow's Predictions", href: "/predictions/tomorrow" },
      { label: "Monday Predictions", href: "/predictions/monday-football" },
      { label: "Tuesday Predictions", href: "/predictions/tuesday-football" },
      { label: "Wednesday Predictions", href: "/predictions/wednesday-football" },
      { label: "Thursday Predictions", href: "/predictions/thursday-football" },
      { label: "Friday Predictions", href: "/predictions/friday-football" },
      { label: "Saturday Predictions", href: "/predictions/saturday-football" },
      { label: "Sunday Predictions", href: "/predictions/sunday-football" },
    ],
  },
  {
    label: "Betting Sites",
    href: "/betting-sites",
    icon: <Star size={16} />,
    children: [
      { label: "Best Betting Sites", href: "/betting-sites" },
      { label: "Welcome Bonuses", href: "/betting-bonuses" },
      { label: "No Deposit Bonuses", href: "/betting-bonuses/no-deposit-bonus-nigeria" },
      { label: "Loyalty Programs", href: "/betting-bonuses/loyalty-program-nigeria" },
      { label: "Promo Codes", href: "/promo-codes" },
    ],
  },
  {
    label: "Academy",
    href: "/betting-academy",
    icon: <BookOpen size={16} />,
    children: [
      { label: "Betting Academy", href: "/betting-academy" },
      { label: "How to Bet on Football", href: "/betting-academy/how-to-bet-on-football" },
      { label: "Betting Strategies", href: "/betting-academy/best-football-betting-strategies" },
      { label: "Understanding Odds", href: "/betting-academy/understanding-football-odds" },
      { label: "Accumulator Guide", href: "/betting-academy/accumulator-betting-guide" },
      { label: "Bankroll Management", href: "/betting-academy/bankroll-management" },
    ],
  },
];

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="bg-primary text-primary-content shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <Trophy size={18} className="text-white" />
              </div>
              <span className="font-display font-bold text-xl text-white hidden sm:block">
                LitreGre<span className="text-amber-300"> Prediction</span>
              </span>
              <span className="font-display font-bold text-xl text-white sm:hidden">LG</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
              <Link
                href="/"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === "/" ? "bg-white/20 text-white" : "hover:bg-white/10 text-white/80"
                }`}
              >
                <Home size={15} />
                Today
              </Link>

              {NAV_LINKS.map((nav) =>
                nav.children ? (
                  <div key={nav.label} className="relative">
                    <button
                      onClick={() =>
                        setActiveDropdown(activeDropdown === nav.label ? null : nav.label)
                      }
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        pathname.startsWith(nav.href)
                          ? "bg-white/20 text-white"
                          : "hover:bg-white/10 text-white/80"
                      }`}
                    >
                      {nav.icon}
                      {nav.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${
                          activeDropdown === nav.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {activeDropdown === nav.label && (
                      <div className="absolute top-full left-0 mt-1 w-56 bg-base-100 border border-base-300 rounded-xl shadow-xl z-50 overflow-hidden text-base-content">
                        {nav.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setActiveDropdown(null)}
                            className={`block px-4 py-2.5 text-sm hover:bg-primary/10 hover:text-primary transition-colors ${
                              pathname === child.href ? "bg-primary/10 text-primary font-medium" : ""
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={nav.label}
                    href={nav.href}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      pathname.startsWith(nav.href)
                        ? "bg-white/20 text-white"
                        : "hover:bg-white/10 text-white/80"
                    }`}
                  >
                    {nav.icon}
                    {nav.label}
                  </Link>
                )
              )}
            </nav>

            {/* Right side controls */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="btn btn-ghost btn-sm btn-circle text-white hover:bg-white/10"
                aria-label="Toggle theme"
              >
                {theme === "eaglelight" ? <Moon size={18} /> : <Sun size={18} />}
              </button>

              {/* Auth */}
              {session?.user ? (
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-sm gap-2 text-white hover:bg-white/10">
                    <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
                      {session.user.name?.[0]?.toUpperCase() ?? "U"}
                    </div>
                    <span className="hidden sm:inline text-sm font-medium max-w-[100px] truncate">
                      {session.user.name}
                    </span>
                  </label>
                  <ul tabIndex={0} className="dropdown-content menu menu-sm bg-base-100 border border-base-300 rounded-xl shadow-xl w-48 mt-1 z-50 text-base-content">
                    <li>
                      <Link href="/profile" className="flex items-center gap-2">
                        <User size={15} /> My Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex items-center gap-2 text-error"
                      >
                        <LogOut size={15} /> Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link href="/login" className="btn btn-ghost btn-sm gap-1.5 text-white hover:bg-white/10">
                    <LogIn size={15} />
                    Login
                  </Link>
                  <Link href="/signup" className="btn btn-sm bg-white text-primary hover:bg-white/90 border-0 gap-1.5">
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile hamburger */}
              <button
                className="btn btn-ghost btn-sm btn-circle lg:hidden text-white hover:bg-white/10"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={NAV_LINKS}
        session={session}
      />
    </>
  );
}
