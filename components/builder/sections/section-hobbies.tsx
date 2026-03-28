"use client";

import { useFormContext } from "react-hook-form";
import { FloatingTextarea } from "@/components/ui/floating-textarea";
import type { ResumeFormSchema } from "@/lib/schemas";

export function SectionHobbies() {
  const { register } = useFormContext<ResumeFormSchema>();

  return (
    <div className="space-y-5">
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/85">
        Hobbies & Interests
      </h3>
      <FloatingTextarea
        label="Hobbies & Interests (comma-separated)"
        rows={3}
        {...register("hobbies")}
      />
      <p className="text-[10px] text-foreground/40">
        Tip: Include interests that reflect transferable skills or cultural fit.
      </p>
    </div>
  );
}
