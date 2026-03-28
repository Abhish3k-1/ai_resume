"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { templatePreviews, dummyResumeData } from "@/lib/data";
import type { TemplateCategory } from "@/lib/types";
import { LiveThumbnail } from "@/components/ui/live-thumbnail";

const categoryColors: Record<TemplateCategory, string> = {
  modern: "from-indigo-500 to-cyan-400",
  minimal: "from-slate-400 to-gray-300",
  corporate: "from-blue-800 to-slate-600",
  creative: "from-rose-500 to-amber-400",
  ats: "from-emerald-500 to-teal-400",
};

/* Show first 6 templates on landing page */
const featuredTemplates = templatePreviews.slice(0, 6);

export function TemplatesSection() {
  return (
    <section id="templates" className="px-4 py-18 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl space-y-10">
        <Reveal>
          <SectionHeading
            eyebrow="Templates"
            title="20 premium templates that adapt to your voice"
            description="Switch visual styles instantly while keeping your content synchronized and recruiter-ready."
          />
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTemplates.map((template, index) => (
            <Reveal key={template.id} delay={index * 0.08}>
              <motion.article
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 220, damping: 17 }}
                className="group overflow-hidden rounded-2xl border border-border/75 bg-surface/72 p-4 shadow-[0_30px_70px_-46px_rgb(var(--shadow-color)/0.96)]"
              >
                {/* Live Template Preview */}
                <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-xl border border-border/70 bg-surface/50 transition duration-500 group-hover:border-primary/30">
                  <div className={`absolute inset-0 bg-gradient-to-br opacity-5 transition duration-500 group-hover:opacity-10 ${categoryColors[template.category]}`} />
                  {/* We use scale 0.55 to fit nicely inside the 192px height, shifted slightly down for style */}
                  <div className="mt-8 transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-105">
                    <LiveThumbnail templateId={template.id} data={dummyResumeData} scale={0.55} className="shadow-xl rounded-t-md" />
                  </div>
                </div>

                <div className="px-2 pb-2 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/85">
                    {template.tone}
                  </p>
                  <h3 className="mt-2 font-display text-xl tracking-tight text-foreground">
                    {template.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-foreground/65">
                    {template.description}
                  </p>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-surface/60 px-6 py-3 text-sm font-semibold text-foreground/80 transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
          >
            View all 20 templates →
          </Link>
        </div>
      </div>
    </section>
  );
}
