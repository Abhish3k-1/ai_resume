"use client";

import { useFormContext } from "react-hook-form";
import { FloatingTextarea } from "@/components/ui/floating-textarea";
import type { ResumeFormSchema } from "@/lib/schemas";

export function SectionLanguages() {
  const { register } = useFormContext<ResumeFormSchema>();

  return (
    <div className="space-y-5">
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/85">
        Languages
      </h3>
      <FloatingTextarea
        label="Languages (comma-separated, e.g. English — Fluent, Hindi — Native)"
        rows={3}
        {...register("languages")}
      />
      <p className="text-[10px] text-foreground/40">
        Tip: Include proficiency level after each language for best results.
      </p>
    </div>
  );
}
