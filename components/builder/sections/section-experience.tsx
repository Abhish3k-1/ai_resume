"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { FloatingInput } from "@/components/ui/floating-input";
import { FloatingTextarea } from "@/components/ui/floating-textarea";
import { AIImproveButton } from "@/components/builder/ai-improve-button";
import { Button } from "@/components/ui/button";
import { uid } from "@/lib/schemas";
import type { ResumeFormSchema } from "@/lib/schemas";

interface SectionExperienceProps {
  onImprove: (field: "experience") => Promise<void>;
}

export function SectionExperience({ onImprove }: SectionExperienceProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ResumeFormSchema>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  const addEntry = () =>
    append({
      id: uid(),
      role: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
      achievements: [""],
    });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/85">
          Work Experience
        </h3>
        <AIImproveButton
          label="Improve Experience"
          onImprove={() => onImprove("experience")}
        />
      </div>

      <p className="text-[11px] text-foreground/45 -mt-2">
        💡 Tip: Add your raw details first (role, company, what you did) — the AI will polish the language and add impact.
      </p>

      <AnimatePresence initial={false}>
        {fields.map((field, index) => (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="rounded-2xl border border-border/70 bg-surface/50 p-4 mb-3">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-semibold text-foreground/60">
                  Experience #{index + 1}
                </p>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="inline-flex items-center gap-1 text-xs text-red-400/80 hover:text-red-400 transition"
                  >
                    <Trash2 size={12} /> Remove
                  </button>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FloatingInput
                  label="Job Title / Role"
                  error={errors.experience?.[index]?.role?.message}
                  {...register(`experience.${index}.role`)}
                />
                <FloatingInput
                  label="Company"
                  error={errors.experience?.[index]?.company?.message}
                  {...register(`experience.${index}.company`)}
                />
                <FloatingInput
                  label="Start Date"
                  placeholder="e.g. 2021-03"
                  error={errors.experience?.[index]?.startDate?.message}
                  {...register(`experience.${index}.startDate`)}
                />
                <FloatingInput
                  label="End Date"
                  placeholder="e.g. Present"
                  {...register(`experience.${index}.endDate`)}
                />
                <FloatingTextarea
                  label="Description"
                  rows={3}
                  className="sm:col-span-2"
                  {...register(`experience.${index}.description`)}
                />
                <FloatingTextarea
                  label="Key Achievements (one per line)"
                  rows={3}
                  className="sm:col-span-2"
                  {...register(`experience.${index}.achievements`)}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button type="button" variant="outline" size="sm" onClick={addEntry}>
        <Plus size={14} /> Add Experience
      </Button>
    </div>
  );
}
