import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface FloatingInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");

    return (
      <label className="relative block">
        <input
          id={fieldId}
          ref={ref}
          placeholder=" "
          className={cn(
            "peer h-12 w-full rounded-xl border border-border/80 bg-surface/70 px-4 pt-4 text-sm text-foreground outline-none transition focus:border-primary/60 focus:bg-surface focus:ring-2 focus:ring-primary/20",
            error && "border-red-400/75 focus:border-red-400 focus:ring-red-400/20",
            className,
          )}
          {...props}
        />
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-foreground/55 transition-all duration-200 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-[0.68rem] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-[0.14em] peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-[0.68rem] peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.14em]">
          {label}
        </span>
        {error ? <p className="mt-2 text-xs text-red-300">{error}</p> : null}
      </label>
    );
  },
);

FloatingInput.displayName = "FloatingInput";

