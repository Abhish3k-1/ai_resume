"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { useAuth } from "@/hooks/use-auth";
import { signInWithGoogle } from "@/lib/auth";

export function HeroSection() {
  const { user } = useAuth();

  return (
    <section className="relative isolate overflow-hidden px-4 pb-20 pt-18 sm:px-6 sm:pt-24 lg:px-10 lg:pb-28">
      <div className="hero-grid absolute inset-0 -z-30 opacity-40" />
      <motion.div
        className="absolute -top-28 left-1/2 -z-20 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-primary/40 blur-[100px]"
        animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-16 top-32 -z-20 h-72 w-72 rounded-full bg-accent/22 blur-[90px]"
        animate={{ y: [0, -32, 0], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -left-20 top-60 -z-20 h-56 w-56 rounded-full bg-primary/18 blur-[80px]"
        animate={{ x: [0, 20, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-4xl text-center" y={20}>
          <p className="inline-flex items-center rounded-full border border-border/70 bg-surface/65 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary/80 backdrop-blur">
            AI Resume Studio
          </p>
          <h1 className="mt-8 font-display text-4xl leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Build resumes that <span className="text-gradient">feel executive</span>,
            read clearly, and ship faster.
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-pretty text-base leading-8 text-foreground/70 sm:text-lg">
            ResumeForge combines premium design, intelligent writing assistance, and
            real-time previews so every application looks intentional from first
            glance to final bullet.
          </p>

          <div className="mt-10 flex items-center justify-center">
            <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 260, damping: 16 }}>
              {user ? (
                <Link
                  href="/dashboard"
                  className="inline-flex h-13 items-center gap-2 rounded-xl bg-primary px-8 text-sm font-semibold text-white shadow-[0_22px_45px_-25px_rgb(var(--shadow-color)/0.95)] transition hover:bg-primary/90"
                >
                  Start Building
                  <ArrowRight size={16} />
                </Link>
              ) : (
                <button
                  onClick={() => signInWithGoogle()}
                  className="inline-flex h-13 items-center gap-2 rounded-xl bg-primary px-8 text-sm font-semibold text-white shadow-[0_22px_45px_-25px_rgb(var(--shadow-color)/0.95)] transition hover:bg-primary/90"
                >
                  Start Building
                  <ArrowRight size={16} />
                </button>
              )}
            </motion.div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-medium uppercase tracking-[0.18em] text-foreground/48">
            <span>Instant Preview</span>
            <span>ATS Friendly</span>
            <span>Template Switching</span>
            <span>Auto Save</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

