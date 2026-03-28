"use client";

import { useCallback } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { FloatingInput } from "@/components/ui/floating-input";
import { FloatingTextarea } from "@/components/ui/floating-textarea";
import { uid, type ResumeFormSchema } from "@/lib/schemas";

export function SectionVolunteer() {
  const { register, control } = useFormContext<ResumeFormSchema>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "volunteer",
  });

  const handleAdd = useCallback(() => {
    append({
      id: uid(),
      role: "",
      organization: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  }, [append]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/85">
          Volunteer Work
        </h3>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-surface/65 px-3 py-1.5 text-xs font-medium text-foreground/70 transition hover:border-primary/40 hover:text-primary"
        >
          <Plus size={13} />
          Add
        </button>
      </div>

      <AnimatePresence initial={false}>
        {fields.map((field, index) => (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-3 rounded-xl border border-border/60 bg-surface/40 p-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-foreground/45">
                Volunteer #{index + 1}
              </p>
              <button
                type="button"
                onClick={() => remove(index)}
                className="inline-flex items-center gap-1 text-[10px] text-red-400 transition hover:text-red-300"
              >
                <Trash2 size={12} />
                Remove
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <FloatingInput
                label="Role / Title"
                {...register(`volunteer.${index}.role`)}
              />
              <FloatingInput
                label="Organization"
                {...register(`volunteer.${index}.organization`)}
              />
              <FloatingInput
                label="Start Date"
                type="month"
                {...register(`volunteer.${index}.startDate`)}
              />
              <FloatingInput
                label="End Date"
                type="month"
                {...register(`volunteer.${index}.endDate`)}
              />
            </div>

            <FloatingTextarea
              label="Description"
              rows={2}
              {...register(`volunteer.${index}.description`)}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {fields.length === 0 && (
        <p className="text-center text-xs text-foreground/40 py-4">
          No volunteer work added yet. Click &quot;Add&quot; to include community service, NGO work, etc.
        </p>
      )}
    </div>
  );
}
