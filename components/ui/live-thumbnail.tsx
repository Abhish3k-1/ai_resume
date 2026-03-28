import { memo } from "react";
import { templateRegistry } from "@/components/builder/templates/template-registry";
import type { ResumeFormSchema } from "@/lib/schemas";
import type { ResumeTemplateId } from "@/lib/types";
import { cn } from "@/lib/utils";

interface LiveThumbnailProps {
  templateId: ResumeTemplateId;
  data: ResumeFormSchema;
  scale?: number;
  className?: string;
}

export const LiveThumbnail = memo(({ templateId, data, scale = 0.4, className }: LiveThumbnailProps) => {
  const TemplateComponent = templateRegistry[templateId];
  if (!TemplateComponent) return null;

  // A4 ratio 210/297
  const width = Math.round(210 * scale);
  const height = Math.round(297 * scale);

  return (
    <div 
      className={cn("relative shrink-0 overflow-hidden bg-white ring-1 ring-border/50", className)}
      style={{ width, height }}
    >
      <div 
        style={{ 
          width: 210, 
          height: 297, 
          padding: "24px 20px",
          position: "absolute", 
          top: 0, 
          left: 0, 
          transform: `scale(${scale})`, 
          transformOrigin: "top left", 
          pointerEvents: "none" 
        }}
      >
        <TemplateComponent data={data} />
      </div>
    </div>
  );
});

LiveThumbnail.displayName = "LiveThumbnail";
