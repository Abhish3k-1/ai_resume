"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { FloatingInput } from "@/components/ui/floating-input";
import { Button } from "@/components/ui/button";
import { uid } from "@/lib/schemas";
import type { ResumeFormSchema } from "@/lib/schemas";

export function SectionEducation() {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ResumeFormSchema>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  const addEntry = () =>
    append({
      id: uid(),
      institution: "",
      degree: "",
      field: "",
      startYear: "",
      endYear: "",
      markType: "percentage" as const,
      markValue: "",
    });

  return (
    <div className="space-y-5">
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/85">
        Education
      </h3>

      <AnimatePresence initial={false}>
        {fields.map((field, index) => {
          const markType = watch(`education.${index}.markType`);

          return (
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
                    Education #{index + 1}
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
                    label="Institution"
                    error={errors.education?.[index]?.institution?.message}
                    {...register(`education.${index}.institution`)}
                  />
                  <FloatingInput
                    label="Degree"
                    error={errors.education?.[index]?.degree?.message}
                    {...register(`education.${index}.degree`)}
                  />
                  <FloatingInput
                    label="Field of Study"
                    {...register(`education.${index}.field`)}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <FloatingInput
                      label="Start Year"
                      {...register(`education.${index}.startYear`)}
                    />
                    <FloatingInput
                      label="End Year"
                      {...register(`education.${index}.endYear`)}
                    />
                  </div>

                  {/* Mark Type Toggle */}
                  <div className="sm:col-span-2 flex items-center gap-4">
                    <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-surface/60 p-1">
                      <button
                        type="button"
                        onClick={() =>
                          setValue(`education.${index}.markType`, "percentage")
                        }
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                          markType === "percentage"
                            ? "bg-primary/20 text-primary"
                            : "text-foreground/55 hover:text-foreground/80"
                        }`}
                      >
                        Percentage
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setValue(`education.${index}.markType`, "cgpa")
                        }
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                          markType === "cgpa"
                            ? "bg-primary/20 text-primary"
                            : "text-foreground/55 hover:text-foreground/80"
                        }`}
                      >
                        CGPA
                      </button>
                    </div>
                    <FloatingInput
                      label={markType === "percentage" ? "Percentage" : "CGPA"}
                      className="flex-1"
                      {...register(`education.${index}.markValue`)}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      <Button type="button" variant="outline" size="sm" onClick={addEntry}>
        <Plus size={14} /> Add Education
      </Button>
    </div>
  );
}
