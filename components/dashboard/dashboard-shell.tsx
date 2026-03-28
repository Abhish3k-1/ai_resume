"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Download,
  LogOut,
  Plus,
  Search,
  SlidersHorizontal,
  X,
  Home,
  LayoutGrid,
  WandSparkles,
  Shield,
  Sparkles,
} from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { ResumeCard } from "@/components/dashboard/resume-card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { dashboardItems as initialItems, dummyResumeData } from "@/lib/data";
import { templatePreviews } from "@/lib/data";
import type { DashboardResumeItem } from "@/lib/types";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { LiveThumbnail } from "@/components/ui/live-thumbnail";

function ResumeCardSkeleton() {
  return (
    <article className="rounded-2xl border border-border/70 bg-surface/72 p-4 sm:p-5">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="mt-3 h-4 w-1/3" />
      <div className="mt-6 flex items-center justify-between">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="mt-6 border-t border-border/60 pt-4">
        <Skeleton className="h-4 w-24" />
      </div>
    </article>
  );
}

type SortOption = "newest" | "oldest" | "name";

export function DashboardShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<DashboardResumeItem[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [sortOpen, setSortOpen] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    async function fetchResumes() {
      try {
        const res = await fetch("/api/resumes");
        if (res.ok) {
          const { resumes } = await res.json();
          setItems(
            resumes.map((r: { id: string; data?: { headline?: string; firstName?: string; lastName?: string }; title: string; updated_at: string; template_id: string; status: string }) => {
              const headline = r.data?.headline || r.title || "Untitled Resume";
              const name = [r.data?.firstName, r.data?.lastName].filter(Boolean).join(" ");
              return {
                id: r.id,
                title: name ? `${name}'s Resume` : r.title,
                role: headline,
                updatedAt: new Date(r.updated_at).toLocaleDateString(),
                score: 0,
                template: r.template_id,
                status: r.status,
              };
            })
          );
        } else {
          setItems(initialItems);
        }
      } catch {
        setItems(initialItems);
      } finally {
        setLoading(false);
      }
    }
    fetchResumes();
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    const previousItems = items;
    setItems((prev) => prev.filter((item) => item.id !== id));
    try {
      const res = await fetch(`/api/resumes/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        console.error("[Delete Resume] Failed:", data);
        // Revert UI — the delete didn't actually work
        setItems(previousItems);
      }
    } catch {
      // Network error — revert
      setItems(previousItems);
    }
  }, [items]);

  // Filter + sort
  const filteredItems = useMemo(() => {
    let result = items;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.role.toLowerCase().includes(q) ||
          item.template.toLowerCase().includes(q),
      );
    }

    if (sortBy === "newest") {
      result = [...result].sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
    } else if (sortBy === "oldest") {
      result = [...result].sort(
        (a, b) =>
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
      );
    } else if (sortBy === "name") {
      result = [...result].sort((a, b) =>
        a.title.localeCompare(b.title),
      );
    }

    return result;
  }, [items, searchQuery, sortBy]);

  // Overview: template gallery
  const renderOverview = () => (
    <>
      {/* Quick start card */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <motion.article
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 220, damping: 16 }}
          className="relative overflow-hidden rounded-2xl border border-dashed border-primary/45 bg-primary/10 p-4 sm:p-5"
        >
          <div className="absolute -right-7 -top-7 h-20 w-20 rounded-full bg-primary/20 blur-2xl" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/85">
            Quick start
          </p>
          <h2 className="mt-2 font-display text-lg sm:text-xl tracking-tight text-foreground">
            Create a targeted resume
          </h2>
          <p className="mt-2 text-xs sm:text-sm leading-6 text-foreground/70">
            Use AI-assisted prompts and polished templates for your next role.
          </p>
          <Link
            href="/builder"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            <Plus size={15} />
            Start builder
          </Link>
        </motion.article>

        {/* Stats cards */}
        <div className="rounded-2xl border border-border/70 bg-surface/65 p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/50">
            Total Resumes
          </p>
          <p className="mt-2 font-display text-3xl text-foreground">
            {items.length}
          </p>
        </div>
        <div className="rounded-2xl border border-border/70 bg-surface/65 p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/50">
            Templates Available
          </p>
          <p className="mt-2 font-display text-3xl text-foreground">20</p>
        </div>
      </section>

      {/* Template gallery */}
      <section className="mt-8">
        <h2 className="font-display text-lg text-foreground">
          Available Templates
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-foreground/60">
          Choose a template when you start building your resume
        </p>
        <div className="mt-4 grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {templatePreviews.map((t) => (
            <Link
              key={t.id}
              href="/builder"
              className="group flex flex-col items-center rounded-xl border border-border/60 bg-surface/50 p-2 text-center transition hover:border-primary/40 hover:bg-surface hover:shadow-sm"
            >
              <div className="relative mb-3 overflow-hidden rounded-md bg-white ring-1 ring-border/50">
                <LiveThumbnail templateId={t.id} data={dummyResumeData} scale={0.42} />
              </div>
              <div className="flex w-full flex-col px-1">
                <p className="text-[11px] sm:text-xs font-semibold text-foreground/85 truncate">
                  {t.name}
                </p>
                <p className="mt-0.5 text-[9px] sm:text-[10px] text-foreground/50 truncate">
                  {t.tone}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );

  // Resumes tab: shows saved resumes with delete + download
  const renderResumes = () => (
    <section className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <AnimatePresence>
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <motion.div
                key={`skeleton-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ResumeCardSkeleton />
              </motion.div>
            ))
          : filteredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28 }}
                layout
              >
                <ResumeCard item={item} onDelete={handleDelete} />
              </motion.div>
            ))}
      </AnimatePresence>

      {!loading && filteredItems.length === 0 && !searchQuery && (
        <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
          <Download size={32} className="mb-4 text-foreground/30" />
          <h3 className="font-display text-lg text-foreground/70">
            No resumes yet
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-foreground/50">
            Create your first resume using the AI builder
          </p>
          <Link
            href="/builder"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            <Plus size={15} />
            Create resume
          </Link>
        </div>
      )}

      {!loading && filteredItems.length === 0 && searchQuery && (
        <div className="col-span-full py-12 text-center text-sm text-foreground/50">
          No resumes match &quot;{searchQuery}&quot;
        </div>
      )}
    </section>
  );

  const isAdmin = user && ["absihekdas@gmail.com"].includes(user.email ?? "");

  return (
    <div className="px-3 py-4 pb-24 sm:px-4 sm:py-5 md:pb-5 lg:px-6 xl:px-8">
      <div className="mx-auto flex w-full gap-3 sm:gap-4">
        {/* Sidebar for Desktop */}
         <div className="hidden md:block shrink-0">
          <DashboardSidebar
            collapsed={collapsed}
            onToggle={() => setCollapsed((current) => !current)}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        <main className="min-w-0 flex-1 rounded-2xl sm:rounded-3xl border border-border/75 bg-surface/55 p-3 sm:p-5 md:p-7 backdrop-blur">
          <header className="flex flex-col gap-3 border-b border-border/65 pb-4 sm:pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="md:hidden inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary">
                  <Sparkles size={12} />
                </span>
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">
                  <span className="hidden md:inline">Dashboard</span>
                  <span className="md:hidden tracking-[0.16em]">ResumeForge</span>
                </p>
              </div>
              <h1 className="mt-2 sm:mt-2 font-display text-xl sm:text-2xl md:text-3xl tracking-tight text-foreground">
                {activeTab === "overview"
                  ? "Resume workspace"
                  : activeTab === "resumes"
                    ? "My Resumes"
                    : activeTab === "admin"
                      ? "Admin Panel"
                      : "Resume workspace"}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              {/* Search */}
              {searchOpen ? (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search resumes…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="h-9 sm:h-11 w-40 sm:w-52 rounded-xl border border-primary/40 bg-surface/65 pl-8 sm:pl-9 pr-8 sm:pr-9 text-xs sm:text-sm text-foreground outline-none placeholder:text-foreground/40 focus:border-primary"
                  />
                  <Search
                    size={14}
                    className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-foreground/50"
                  />
                  <button
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="inline-flex h-9 sm:h-11 items-center gap-1.5 sm:gap-2 rounded-xl border border-border/70 bg-surface/65 px-3 sm:px-4 text-xs sm:text-sm text-foreground/70 transition hover:border-primary/40 hover:text-foreground"
                  aria-label="Search resumes"
                >
                  <Search size={14} />
                  <span className="hidden sm:inline">Search</span>
                </button>
              )}

              {/* Sort */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="inline-flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-border/70 bg-surface/65 text-foreground/70 transition hover:border-primary/40 hover:text-foreground"
                  aria-label="Sort resumes"
                >
                  <SlidersHorizontal size={14} />
                </button>
                {sortOpen && (
                  <div className="absolute right-0 top-10 sm:top-12 z-20 w-36 sm:w-40 rounded-xl border border-border/70 bg-surface p-1.5 shadow-xl">
                    {(
                      [
                        ["newest", "Newest first"],
                        ["oldest", "Oldest first"],
                        ["name", "By name"],
                      ] as const
                    ).map(([value, label]) => (
                      <button
                        key={value}
                        onClick={() => {
                          setSortBy(value);
                          setSortOpen(false);
                        }}
                        className={`w-full rounded-lg px-3 py-2 text-left text-xs sm:text-sm transition ${sortBy === value ? "bg-primary/15 text-primary font-medium" : "text-foreground/70 hover:bg-surface-muted"}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <ThemeToggle />

              {/* User + Logout */}
              {user && (
                <button
                  onClick={signOut}
                  className="inline-flex h-9 sm:h-11 items-center gap-1.5 sm:gap-2 rounded-xl border border-border/70 bg-surface/65 px-2.5 sm:px-3 text-xs sm:text-sm font-medium text-foreground/70 transition hover:border-red-400/40 hover:text-red-400"
                >
                  {user.user_metadata?.avatar_url && (
                    <Image
                      src={user.user_metadata.avatar_url}
                      alt=""
                      width={24}
                      height={24}
                      className="h-5 w-5 sm:h-6 sm:w-6 rounded-full"
                    />
                  )}
                  <LogOut size={13} />
                  <span className="hidden sm:inline">Sign out</span>
                </button>
              )}

              {activeTab !== "admin" && (
                <Link href="/builder">
                  <Button className="h-9 sm:h-11 text-xs sm:text-sm px-3 sm:px-4">
                    <Plus size={14} />
                    <span className="hidden sm:inline">New resume</span>
                    <span className="sm:hidden">New</span>
                  </Button>
                </Link>
              )}
            </div>
          </header>

          {activeTab === "admin" ? (
            <AdminDashboard />
          ) : activeTab === "resumes" ? (
            renderResumes()
          ) : (
            <div className="mt-6">{renderOverview()}</div>
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed inset-x-4 bottom-4 z-50 flex items-center justify-around rounded-2xl border border-border/60 bg-surface/90 p-2 shadow-2xl backdrop-blur-xl md:hidden">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex w-16 flex-col items-center gap-1 rounded-xl py-2 transition ${activeTab === "overview" ? "bg-primary/15 text-primary" : "text-foreground/50 hover:bg-surface-muted hover:text-foreground/80"}`}
        >
          <Home size={18} />
          <span className="text-[10px] font-medium">Overview</span>
        </button>
        <button
          onClick={() => setActiveTab("resumes")}
          className={`flex w-16 flex-col items-center gap-1 rounded-xl py-2 transition ${activeTab === "resumes" ? "bg-primary/15 text-primary" : "text-foreground/50 hover:bg-surface-muted hover:text-foreground/80"}`}
        >
          <LayoutGrid size={18} />
          <span className="text-[10px] font-medium">Resumes</span>
        </button>
        <Link
          href="/builder"
          className="flex w-16 flex-col items-center gap-1 rounded-xl py-2 text-foreground/50 hover:bg-surface-muted hover:text-foreground/80 transition"
        >
          <WandSparkles size={18} />
          <span className="text-[10px] font-medium">Builder</span>
        </Link>
        {isAdmin && (
          <button
            onClick={() => setActiveTab("admin")}
            className={`flex w-16 flex-col items-center gap-1 rounded-xl py-2 transition ${activeTab === "admin" ? "bg-red-500/15 text-red-400" : "text-foreground/50 hover:bg-surface-muted hover:text-foreground/80"}`}
          >
            <Shield size={18} />
            <span className="text-[10px] font-medium">Admin</span>
          </button>
        )}
      </nav>
    </div>
  );
}
