import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export const metadata: Metadata = {
  title: "Dashboard | ResumeForge AI",
};

export default function DashboardPage() {
  return <DashboardShell />;
}

