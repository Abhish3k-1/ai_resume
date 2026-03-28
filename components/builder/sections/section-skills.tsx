"use client";

import { useFormContext } from "react-hook-form";
import { Sparkles } from "lucide-react";
import { FloatingTextarea } from "@/components/ui/floating-textarea";
import type { ResumeFormSchema } from "@/lib/schemas";

interface SectionSkillsProps {
  onGenerate?: () => void;
  generating?: boolean;
}

export function SectionSkills({ onGenerate, generating }: SectionSkillsProps) {
  const { register } = useFormContext<ResumeFormSchema>();

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/85">
          Skills
        </h3>
        {onGenerate && (
          <button
            type="button"
            onClick={onGenerate}
            disabled={generating}
            className="group flex h-8 items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 text-xs font-medium text-primary transition hover:border-primary/40 hover:bg-primary/20 disabled:opacity-50"
          >
            <Sparkles size={14} className={generating ? "animate-pulse" : ""} />
            {generating ? "Generating..." : "Auto-fill with AI"}
          </button>
        )}
      </div>

      <p className="text-[11px] text-foreground/45 -mt-2">
        💡 Tip: Enter your headline/role first — the AI generates skills tailored to that role.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <p className="text-xs font-medium text-foreground/60">
            Technical Skills
          </p>
          <FloatingTextarea
            label="Technical Skills (comma-separated)"
            rows={4}
            {...register("technicalSkills")}
          />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium text-foreground/60">Soft Skills</p>
          <FloatingTextarea
            label="Soft Skills (comma-separated)"
            rows={4}
            {...register("softSkills")}
          />
        </div>
      </div>
    </div>
  );
}
