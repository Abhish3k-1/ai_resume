"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { templatePreviews } from "@/lib/data";
import { templateRegistry } from "@/components/builder/templates/template-registry";
import type { ResumeFormSchema } from "@/lib/schemas";
import type { ResumeTemplateId, TemplateCategory } from "@/lib/types";
import { cn } from "@/lib/utils";
import { LiveThumbnail } from "@/components/ui/live-thumbnail";

interface ResumePreviewPanelProps {
  data: ResumeFormSchema;
  selectedTemplate: ResumeTemplateId;
  onTemplateChange: (template: ResumeTemplateId) => void;
}

const categoryLabels: Record<TemplateCategory, string> = {
  modern: "Modern",
  minimal: "Minimal",
  corporate: "Corporate",
  creative: "Creative",
  ats: "ATS-Friendly",
};

const categoryOrder: TemplateCategory[] = [
  "modern",
  "minimal",
  "corporate",
  "creative",
  "ats",
];

export function ResumePreviewPanel({
  data,
  selectedTemplate,
  onTemplateChange,
}: ResumePreviewPanelProps) {
  const [showTemplates, setShowTemplates] = useState(false);
  const [filterCategory, setFilterCategory] = useState<
    TemplateCategory | "all"
  >("all");

  const TemplateComponent = useMemo(
    () => templateRegistry[selectedTemplate],
    [selectedTemplate],
  );

  const currentTemplateName = useMemo(
    () => templatePreviews.find((t) => t.id === selectedTemplate)?.name ?? "",
    [selectedTemplate],
  );

  const filteredTemplates = useMemo(
    () =>
      filterCategory === "all"
        ? templatePreviews
        : templatePreviews.filter((t) => t.category === filterCategory),
    [filterCategory],
  );

  return (
    <>
    <aside className="glass-panel rounded-3xl p-4 sm:p-5 sticky top-24 self-start max-h-[calc(100vh-140px)] overflow-y-auto print-hidden">
      {/* ── Template Switcher ── */}
      <div className="mb-4">
        <button
          type="button"
          onClick={() => setShowTemplates(!showTemplates)}
          className="flex w-full items-center justify-between rounded-xl border border-border/70 bg-surface/60 px-3 py-2.5 text-sm font-medium text-foreground/80 transition hover:border-primary/40"
        >
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            {currentTemplateName} Template
          </span>
          <motion.span
            animate={{ rotate: showTemplates ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={14} />
          </motion.span>
        </button>

        <AnimatePresence>
          {showTemplates && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="mt-2 rounded-xl border border-border/70 bg-surface/70 p-3">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <button
                    type="button"
                    onClick={() => setFilterCategory("all")}
                    className={cn(
                      "rounded-lg px-2 py-1 text-[10px] font-semibold uppercase tracking-wider transition",
                      filterCategory === "all"
                        ? "bg-primary/20 text-primary"
                        : "text-foreground/50 hover:text-foreground/80",
                    )}
                  >
                    All
                  </button>
                  {categoryOrder.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFilterCategory(cat)}
                      className={cn(
                        "rounded-lg px-2 py-1 text-[10px] font-semibold uppercase tracking-wider transition",
                        filterCategory === cat
                          ? "bg-primary/20 text-primary"
                          : "text-foreground/50 hover:text-foreground/80",
                      )}
                    >
                      {categoryLabels[cat]}
                    </button>
                  ))}
                </div>

                {/* Template Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto p-1">
                  {filteredTemplates.map((template) => {
                    const active = selectedTemplate === template.id;
                    return (
                      <button
                        key={template.id}
                        type="button"
                        onClick={() => {
                          onTemplateChange(template.id);
                          setShowTemplates(false);
                        }}
                        className={cn(
                          "group relative flex flex-col items-center rounded-xl border p-2 text-center transition",
                          active
                            ? "border-primary shadow-sm bg-primary/5"
                            : "border-border/60 bg-surface/50 hover:border-primary/40 hover:bg-surface",
                        )}
                      >
                        {/* Live Thumbnail */}
                        <div className="mb-2 relative rounded overflow-hidden">
                          <LiveThumbnail templateId={template.id} data={data} scale={0.4} />
                          {active && (
                            <div className="absolute inset-0 ring-2 ring-primary ring-inset rounded" />
                          )}
                        </div>

                        {active && (
                          <span className="absolute right-1 -top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white shadow-md z-10">
                            <Check size={12} />
                          </span>
                        )}
                        
                        <p className="text-[10px] font-semibold text-foreground/85 w-full truncate px-1">
                          {template.name}
                        </p>
                        <p className="text-[8px] text-foreground/50 mt-0.5 w-full truncate">
                          {template.tone}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── A4 Preview ── */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTemplate}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {/* A4 page container */}
            <div
              className="mx-auto bg-white rounded-lg shadow-[0_35px_70px_-40px_rgb(15_20_45/0.45)] overflow-hidden"
              style={{
                width: "100%",
                aspectRatio: "210 / 297",
                maxWidth: "420px",
              }}
            >
              <div
                className="h-full overflow-y-auto"
                style={{
                  padding: "24px 20px",
                }}
              >
                {TemplateComponent && <TemplateComponent data={data} />}
              </div>
            </div>

            {/* Page indicator */}
            <p className="mt-3 text-center text-[10px] text-foreground/40">
              Resume Preview · A4 Format · {currentTemplateName}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </aside>

    {/* Hidden print-only container — off-screen so html2canvas can render it */}
    <div
      id="resume-print-target"
      style={{
        position: "absolute",
        left: "-9999px",
        top: "-9999px",
        zIndex: -1,
      }}
    >
      <div
        style={{
          width: "210mm",
          minHeight: "297mm",
          padding: "20mm 15mm",
          margin: "0 auto",
          background: "white",
        }}
      >
        {TemplateComponent && <TemplateComponent data={data} />}
      </div>
    </div>
    </>
  );
}

