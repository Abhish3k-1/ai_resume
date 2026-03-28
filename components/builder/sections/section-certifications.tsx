"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { FloatingInput } from "@/components/ui/floating-input";
import { Button } from "@/components/ui/button";
import { uid } from "@/lib/schemas";
import type { ResumeFormSchema } from "@/lib/schemas";

export function SectionCertifications() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ResumeFormSchema>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "certifications",
  });

  const addEntry = () =>
    append({
      id: uid(),
      title: "",
      issuer: "",
      date: "",
      link: "",
    });

  return (
    <div className="space-y-5">
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/85">
        Certifications
      </h3>

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
                  Certification #{index + 1}
                </p>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="inline-flex items-center gap-1 text-xs text-red-400/80 hover:text-red-400 transition"
                >
                  <Trash2 size={12} /> Remove
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FloatingInput
                  label="Certification Title"
                  error={errors.certifications?.[index]?.title?.message}
                  {...register(`certifications.${index}.title`)}
                />
                <FloatingInput
                  label="Issuing Organization"
                  {...register(`certifications.${index}.issuer`)}
                />
                <FloatingInput
                  label="Date"
                  placeholder="e.g. 2023"
                  {...register(`certifications.${index}.date`)}
                />
                <FloatingInput
                  label="Certificate Link"
                  placeholder="https://..."
                  {...register(`certifications.${index}.link`)}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button type="button" variant="outline" size="sm" onClick={addEntry}>
        <Plus size={14} /> Add Certification
      </Button>
    </div>
  );
}
