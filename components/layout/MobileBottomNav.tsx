"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Trophy, Layers, Star, BookOpen } from "lucide-react";

const NAV = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/predictions", icon: Trophy, label: "Predictions" },
  { href: "/predictions/accumulator-tips", icon: Layers, label: "Acca" },
  { href: "/betting-sites", icon: Star, label: "Sites" },
  { href: "/betting-academy", icon: BookOpen, label: "Academy" },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="mobile-bottom-nav md:hidden">
      {NAV.map(({ href, icon: Icon, label }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${
              active ? "text-primary" : "text-base-content/50"
            }`}
          >
            <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
            <span className="text-[10px] font-medium">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
