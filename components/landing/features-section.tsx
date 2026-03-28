"use client";

import type { LucideIcon } from "lucide-react";
import {
  Gauge,
  History,
  LayoutTemplate,
  PanelLeft,
  Share2,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { landingFeatures } from "@/lib/data";

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  LayoutTemplate,
  PanelLeft,
  Gauge,
  History,
  Share2,
};

export function FeaturesSection() {
  return (
    <section id="features" className="px-4 py-18 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl space-y-10">
        <Reveal>
          <SectionHeading
            eyebrow="Features"
            title="Everything you need to write, refine, and ship better resumes"
            description="No clutter, no heavy workflows. Just deeply crafted interactions focused on quality output."
          />
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {landingFeatures.map((feature, index) => {
            const Icon = iconMap[feature.icon] ?? Sparkles;

            return (
              <Reveal key={feature.title} delay={index * 0.06}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="group relative h-full overflow-hidden rounded-2xl border border-border/75 bg-surface/65 p-6 shadow-[0_25px_60px_-40px_rgb(var(--shadow-color)/0.9)] backdrop-blur"
                >
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/15 blur-2xl transition-opacity duration-300 group-hover:opacity-85" />
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/12 text-primary">
                    <Icon size={18} />
                  </span>
                  <h3 className="mt-5 font-display text-lg tracking-tight text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-foreground/65">
                    {feature.description}
                  </p>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

