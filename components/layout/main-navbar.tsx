"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LogIn, LogOut, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#story", label: "How it works" },
  { href: "#templates", label: "Templates" },
];

export function MainNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user, loading, signIn, signOut } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Logo destination: /dashboard if logged in, / if not
  const logoHref = user ? "/dashboard" : "/";

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-10">
      <motion.div
        initial={{ y: -14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "mx-auto flex h-14 sm:h-16 max-w-full items-center justify-between rounded-2xl border px-3 sm:px-4 md:px-6 transition-all",
          scrolled
            ? "border-border/70 bg-surface/80 shadow-[0_20px_45px_-28px_rgb(var(--shadow-color)/0.75)] backdrop-blur-xl"
            : "border-transparent bg-surface/35",
        )}
      >
        <Link href={logoHref} className="group inline-flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-xs font-semibold text-primary">
            RF
          </span>
          <span className="font-display text-sm font-semibold tracking-wide text-foreground/90">
            ResumeForge AI
          </span>
        </Link>

        {/* Only show landing nav links when NOT logged in */}
        {!user && (
          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground/70 transition hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
          <ThemeToggle />

          {!loading && user ? (
            <>
              <Link
                href="/dashboard"
                className="hidden rounded-xl px-3 py-2 text-sm font-medium text-foreground/75 transition hover:bg-surface-muted hover:text-foreground sm:block"
              >
                Dashboard
              </Link>

              {user.user_metadata?.avatar_url && (
                <Image
                  src={user.user_metadata.avatar_url}
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full border border-border/70"
                />
              )}

              <button
                onClick={signOut}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-surface/65 px-3 py-2 text-sm font-medium text-foreground/75 transition hover:border-red-400/40 hover:text-red-400"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={signIn}
                className="rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-white shadow-[0_12px_35px_-16px_rgb(var(--shadow-color)/0.95)] transition hover:-translate-y-0.5 hover:bg-primary/90 sm:px-4 inline-flex items-center gap-1.5"
              >
                <LogIn size={14} />
                Sign in
              </button>
            </>
          )}

          <button
            aria-label="Open mobile navigation"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/80 bg-surface/70 text-foreground/80 md:hidden"
          >
            <Menu size={16} />
          </button>
        </div>
      </motion.div>
    </header>
  );
}
