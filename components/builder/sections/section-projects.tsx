"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { FloatingInput } from "@/components/ui/floating-input";
import { FloatingTextarea } from "@/components/ui/floating-textarea";
import { Button } from "@/components/ui/button";
import { uid } from "@/lib/schemas";
import type { ResumeFormSchema } from "@/lib/schemas";

export function SectionProjects() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ResumeFormSchema>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  const addEntry = () =>
    append({
      id: uid(),
      title: "",
      description: "",
      techStack: "",
      link: "",
    });

  return (
    <div className="space-y-5">
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/85">
        Projects
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
                  Project #{index + 1}
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
                  label="Project Title"
                  error={errors.projects?.[index]?.title?.message}
                  {...register(`projects.${index}.title`)}
                />
                <FloatingInput
                  label="Tech Stack"
                  placeholder="e.g. React, Node.js, MongoDB"
                  {...register(`projects.${index}.techStack`)}
                />
                <FloatingTextarea
                  label="Description"
                  rows={3}
                  className="sm:col-span-2"
                  {...register(`projects.${index}.description`)}
                />
                <FloatingInput
                  label="Project Link"
                  placeholder="https://..."
                  className="sm:col-span-2"
                  {...register(`projects.${index}.link`)}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button type="button" variant="outline" size="sm" onClick={addEntry}>
        <Plus size={14} /> Add Project
      </Button>
    </div>
  );
}
