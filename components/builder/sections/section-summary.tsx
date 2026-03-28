"use client";

import { useFormContext } from "react-hook-form";
import { FloatingTextarea } from "@/components/ui/floating-textarea";
import { AIImproveButton } from "@/components/builder/ai-improve-button";
import type { ResumeFormSchema } from "@/lib/schemas";

interface SectionSummaryProps {
  onImprove: (field: "summary") => Promise<void>;
}

export function SectionSummary({ onImprove }: SectionSummaryProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<ResumeFormSchema>();

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/85">
          Professional Summary
        </h3>
        <AIImproveButton
          label="Improve Summary"
          onImprove={() => onImprove("summary")}
        />
      </div>

      <p className="text-[11px] text-foreground/45 -mt-2">
        💡 Tip: Fill in your headline, experience, education &amp; skills first — the AI uses that data to craft a better summary.
      </p>

      <FloatingTextarea
        label="Professional Summary"
        rows={6}
        error={errors.summary?.message}
        {...register("summary")}
      />
    </div>
  );
}
