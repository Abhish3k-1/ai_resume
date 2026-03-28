import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export const metadata: Metadata = {
  title: "Admin | ResumeForge AI",
};

export default function AdminPage() {
  return <AdminDashboard />;
}
