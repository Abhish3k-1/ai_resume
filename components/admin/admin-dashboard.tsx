"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  FileText,
  Shield,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Skeleton } from "@/components/ui/skeleton";

interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: string;
  created_at: string;
}

interface Resume {
  id: string;
  user_id: string;
  title: string;
  template_id: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface AdminStats {
  profiles: Profile[];
  resumes: Resume[];
  totalUsers: number;
  totalResumes: number;
}

export function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.status === 403) {
          setError("Access denied. You are not an admin.");
          return;
        }
        if (!res.ok) {
          setError("Failed to load admin data.");
          return;
        }
        const data = await res.json();
        setStats(data);
      } catch {
        setError("Network error.");
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <Shield size={48} className="mx-auto mb-4 text-red-400" />
          <h1 className="font-display text-2xl text-foreground">{error}</h1>
          <Link
            href="/dashboard"
            className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <ArrowLeft size={14} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/70 bg-surface/65 text-foreground/70 transition hover:text-foreground"
            >
              <ArrowLeft size={16} />
            </Link>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-red-400">
                Admin Panel
              </p>
              <h1 className="mt-1 font-display text-2xl tracking-tight text-foreground">
                System Overview
              </h1>
            </div>
          </div>
          <ThemeToggle />
        </header>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-2xl" />
            ))}
          </div>
        ) : stats ? (
          <>
            {/* Stats Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-border/70 bg-surface/65 p-5"
              >
                <Users size={20} className="text-primary" />
                <p className="mt-3 font-display text-3xl text-foreground">
                  {stats.totalUsers}
                </p>
                <p className="text-xs text-foreground/60">Total Users</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="rounded-2xl border border-border/70 bg-surface/65 p-5"
              >
                <FileText size={20} className="text-emerald-400" />
                <p className="mt-3 font-display text-3xl text-foreground">
                  {stats.totalResumes}
                </p>
                <p className="text-xs text-foreground/60">Total Resumes</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl border border-border/70 bg-surface/65 p-5"
              >
                <Shield size={20} className="text-amber-400" />
                <p className="mt-3 font-display text-3xl text-foreground">
                  {stats.resumes.filter((r) => r.status === "Ready").length}
                </p>
                <p className="text-xs text-foreground/60">Ready Resumes</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="rounded-2xl border border-border/70 bg-surface/65 p-5"
              >
                <FileText size={20} className="text-violet-400" />
                <p className="mt-3 font-display text-3xl text-foreground">
                  {stats.resumes.filter((r) => r.status === "Draft").length}
                </p>
                <p className="text-xs text-foreground/60">Drafts</p>
              </motion.div>
            </div>

            {/* Users Table */}
            <section className="mt-8">
              <h2 className="font-display text-lg text-foreground">Users</h2>
              <div className="mt-3 overflow-hidden rounded-2xl border border-border/70">
                <table className="w-full text-sm">
                  <thead className="border-b border-border/60 bg-surface/50">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-foreground/70">
                        User
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-foreground/70">
                        Role
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-foreground/70">
                        Resumes
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-foreground/70">
                        Joined
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {stats.profiles.map((p) => (
                      <tr key={p.id} className="hover:bg-surface-muted/50">
                        <td className="flex items-center gap-3 px-4 py-3">
                          {p.avatar_url ? (
                            <Image
                              src={p.avatar_url}
                              alt=""
                              width={28}
                              height={28}
                              className="h-7 w-7 rounded-full"
                            />
                          ) : (
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                              {(p.full_name ?? "U")[0]}
                            </span>
                          )}
                          <span className="font-medium text-foreground">
                            {p.full_name ?? "Unknown"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${p.role === "admin" ? "bg-red-400/15 text-red-400" : "bg-primary/15 text-primary"}`}
                          >
                            {p.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-foreground/70">
                          {
                            stats.resumes.filter((r) => r.user_id === p.id)
                              .length
                          }
                        </td>
                        <td className="px-4 py-3 text-foreground/60">
                          {new Date(p.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Recent Resumes */}
            <section className="mt-8">
              <h2 className="font-display text-lg text-foreground">
                All Resumes
              </h2>
              <div className="mt-3 overflow-hidden rounded-2xl border border-border/70">
                <table className="w-full text-sm">
                  <thead className="border-b border-border/60 bg-surface/50">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-foreground/70">
                        Title
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-foreground/70">
                        Template
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-foreground/70">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-foreground/70">
                        Updated
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {stats.resumes.map((r) => (
                      <tr key={r.id} className="hover:bg-surface-muted/50">
                        <td className="px-4 py-3 font-medium text-foreground">
                          {r.title}
                        </td>
                        <td className="px-4 py-3 text-foreground/70">
                          {r.template_id}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                              r.status === "Ready"
                                ? "bg-emerald-500/15 text-emerald-400"
                                : r.status === "Review"
                                  ? "bg-amber-500/15 text-amber-400"
                                  : "bg-slate-500/15 text-slate-400"
                            }`}
                          >
                            {r.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-foreground/60">
                          {new Date(r.updated_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        ) : null}
      </div>
    </div>
  );
}
