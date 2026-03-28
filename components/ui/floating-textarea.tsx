import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface FloatingTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const FloatingTextarea = forwardRef<
  HTMLTextAreaElement,
  FloatingTextareaProps
>(({ label, error, className, id, rows = 6, ...props }, ref) => {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <label className="relative block">
      <textarea
        id={fieldId}
        ref={ref}
        rows={rows}
        placeholder=" "
        className={cn(
          "peer w-full rounded-xl border border-border/80 bg-surface/70 px-4 pt-6 pb-3 text-sm leading-6 text-foreground outline-none transition focus:border-primary/60 focus:bg-surface focus:ring-2 focus:ring-primary/20",
          error && "border-red-400/75 focus:border-red-400 focus:ring-red-400/20",
          className,
        )}
        {...props}
      />
      <span className="pointer-events-none absolute left-4 top-5 text-sm text-foreground/55 transition-all duration-200 peer-focus:top-3 peer-focus:text-[0.68rem] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-[0.14em] peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-[0.68rem] peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.14em]">
        {label}
      </span>
      {error ? <p className="mt-2 text-xs text-red-300">{error}</p> : null}
    </label>
  );
});

FloatingTextarea.displayName = "FloatingTextarea";

