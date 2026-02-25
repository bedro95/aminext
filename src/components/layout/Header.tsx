"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { ThemeToggle } from "./ThemeToggle";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

function SenkuLogo() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="34" height="34" rx="9" fill="url(#logo-grad)" />
      <rect x="7"  y="20" width="3.5" height="8"  rx="1.75" fill="white" opacity="0.55" />
      <rect x="12" y="13" width="3.5" height="15" rx="1.75" fill="white" opacity="0.75" />
      <rect x="17" y="7"  width="3.5" height="21" rx="1.75" fill="white" />
      <rect x="22" y="15" width="3.5" height="13" rx="1.75" fill="white" opacity="0.75" />
      <path d="M7 21.5 L13.5 14.5 L18.5 8.5 L23.5 16.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute inset-0 bg-[var(--background)]/80 backdrop-blur-2xl border-b border-[var(--border)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0" onClick={() => setMobileOpen(false)}>
          <div className="transition-transform duration-200 group-hover:scale-105">
            <SenkuLogo />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[15px] font-extrabold tracking-tight text-[var(--foreground)]">Senku</span>
            <span className="text-[9px] font-semibold tracking-widest text-[var(--muted-foreground)] uppercase">Automation Index</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150",
                  active ? "text-sky-600 dark:text-sky-400" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--accent)]"
                )}
              >
                {active && <span className="absolute inset-0 rounded-xl bg-sky-50 dark:bg-sky-500/10" />}
                <span className="relative">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--accent)] transition-all"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="relative md:hidden border-t border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-xl px-4 py-3 space-y-1">
          {NAV_LINKS.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  active ? "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--accent)]"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
