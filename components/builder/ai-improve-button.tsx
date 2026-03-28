"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIImproveButtonProps {
  onImprove: () => Promise<void>;
  label?: string;
  className?: string;
}

export function AIImproveButton({
  onImprove,
  label = "Improve with AI",
  className,
}: AIImproveButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleImprove = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await onImprove();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleImprove}
      disabled={loading}
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-xl border border-primary/40 bg-primary/15 px-3 text-xs font-semibold text-primary",
        "hover:bg-primary/20 transition disabled:opacity-60",
        className,
      )}
    >
      {loading ? (
        <>
          <Loader2 size={13} className="animate-spin" />
          Improving...
        </>
      ) : (
        <>
          <Sparkles size={13} />
          {label}
        </>
      )}
    </button>
  );
}
