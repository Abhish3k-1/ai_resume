import type { Metadata } from "next";
import { Suspense } from "react";
import { ResumeBuilderShell } from "@/components/builder/resume-builder-shell";

export const metadata: Metadata = {
  title: "Builder | ResumeForge AI",
};

export default function BuilderPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading builder...</div>}>
      <ResumeBuilderShell />
    </Suspense>
  );
}

