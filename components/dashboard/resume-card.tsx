"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Pencil, Trash2 } from "lucide-react";
import type { DashboardResumeItem } from "@/lib/types";

interface ResumeCardProps {
  item: DashboardResumeItem;
  onDelete?: (id: string) => void;
}

const statusStyles: Record<DashboardResumeItem["status"], string> = {
  Ready: "text-emerald-300 border-emerald-300/35 bg-emerald-300/10",
  Review: "text-amber-300 border-amber-300/35 bg-amber-300/10",
  Draft: "text-blue-300 border-blue-300/35 bg-blue-300/10",
};

export function ResumeCard({ item, onDelete }: ResumeCardProps) {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 240, damping: 16 }}
      className="group rounded-2xl border border-border/70 bg-surface/72 p-5 shadow-[0_22px_45px_-35px_rgb(var(--shadow-color)/0.9)]"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="line-clamp-2 font-display text-lg leading-6 tracking-tight text-foreground">
          {item.title}
        </p>
        <Link
          href={`/builder?id=${item.id}`}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border/70 bg-surface-muted/70 text-foreground/70 transition group-hover:text-primary"
        >
          <ArrowUpRight size={16} />
        </Link>
      </div>

      <p className="mt-3 text-sm text-foreground/62">{item.role}</p>

      <div className="mt-6 flex items-center justify-between">
        <span
          className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.13em] ${statusStyles[item.status]}`}
        >
          {item.status}
        </span>
        <p className="text-xs text-foreground/52">Updated {item.updatedAt}</p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
        <p className="text-xs uppercase tracking-[0.16em] text-foreground/52">
          {item.template} template
        </p>
        <div className="flex items-center gap-2">
          <Link
            href={`/builder?id=${item.id}`}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border/70 bg-surface-muted/50 px-2.5 text-xs font-medium text-foreground/70 transition hover:border-primary/40 hover:text-primary"
          >
            <Pencil size={12} />
            Edit
          </Link>
          <button
            onClick={() => onDelete?.(item.id)}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border/70 bg-surface-muted/50 px-2.5 text-xs font-medium text-red-400/70 transition hover:border-red-400/40 hover:text-red-400"
          >
            <Trash2 size={12} />
            Delete
          </button>
        </div>
      </div>
    </motion.article>
  );
}
