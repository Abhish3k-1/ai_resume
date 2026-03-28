"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { FloatingInput } from "@/components/ui/floating-input";
import { FloatingTextarea } from "@/components/ui/floating-textarea";
import { Button } from "@/components/ui/button";
import { uid } from "@/lib/schemas";
import type { ResumeFormSchema } from "@/lib/schemas";

export function SectionCustom() {
  const { control } = useFormContext<ResumeFormSchema>();

  const {
    fields: sections,
    append: addSection,
    remove: removeSection,
  } = useFieldArray({
    control,
    name: "customSections",
  });

  const handleAddSection = () =>
    addSection({
      id: uid(),
      title: "",
      items: [{ id: uid(), content: "" }],
    });

  return (
    <div className="space-y-5">
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/85">
        Custom Sections
      </h3>
      <p className="text-xs text-foreground/55">
        Add your own sections like Publications, Awards, Languages, etc.
      </p>

      <AnimatePresence initial={false}>
        {sections.map((section, sIndex) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <CustomSectionBlock
              sectionIndex={sIndex}
              onRemove={() => removeSection(sIndex)}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleAddSection}
      >
        <Plus size={14} /> Add Custom Section
      </Button>
    </div>
  );
}

function CustomSectionBlock({
  sectionIndex,
  onRemove,
}: {
  sectionIndex: number;
  onRemove: () => void;
}) {
  const { register, control } = useFormContext<ResumeFormSchema>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `customSections.${sectionIndex}.items`,
  });

  return (
    <div className="rounded-2xl border border-border/70 bg-surface/50 p-4 mb-3">
      <div className="flex items-center justify-between mb-4">
        <FloatingInput
          label="Section Title (e.g. Publications, Awards)"
          className="flex-1 mr-3"
          {...register(`customSections.${sectionIndex}.title`)}
        />
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex items-center gap-1 text-xs text-red-400/80 hover:text-red-400 transition shrink-0"
        >
          <Trash2 size={12} /> Remove Section
        </button>
      </div>

      <div className="space-y-3">
        {fields.map((item, iIndex) => (
          <div key={item.id} className="flex gap-2">
            <FloatingTextarea
              label={`Item ${iIndex + 1}`}
              rows={2}
              className="flex-1"
              {...register(
                `customSections.${sectionIndex}.items.${iIndex}.content`
              )}
            />
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(iIndex)}
                className="self-start mt-3 text-red-400/60 hover:text-red-400 transition"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="mt-3"
        onClick={() => append({ id: uid(), content: "" })}
      >
        <Plus size={12} /> Add Item
      </Button>
    </div>
  );
}
