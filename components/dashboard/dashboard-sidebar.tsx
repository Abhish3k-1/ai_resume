"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Home,
  LayoutGrid,
  Shield,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

interface DashboardSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ADMIN_EMAILS = ["absihekdas@gmail.com"];

const navItems = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "resumes", label: "Resumes", icon: LayoutGrid },
  { id: "builder", href: "/builder", label: "AI Builder", icon: WandSparkles },
];

export function DashboardSidebar({
  collapsed,
  onToggle,
  activeTab,
  onTabChange,
}: DashboardSidebarProps) {
  const { user } = useAuth();
  const isAdmin = user && ADMIN_EMAILS.includes(user.email ?? "");

  return (
    <motion.aside
      animate={{ width: collapsed ? 86 : 250 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex min-h-[calc(100vh-2.5rem)] flex-col rounded-3xl border border-border/75 bg-surface/70 p-3 backdrop-blur"
    >
      <button
        aria-label="Toggle sidebar"
        onClick={onToggle}
        className="absolute -right-3 top-8 z-10 inline-flex h-6 w-6 items-center justify-center rounded-full border border-border/85 bg-surface text-foreground/70"
      >
        <motion.span animate={{ rotate: collapsed ? 180 : 0 }}>
          <ChevronLeft size={14} />
        </motion.span>
      </button>

      <Link href="/" className="mb-10 inline-flex items-center gap-3 px-2 pt-2">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/18 text-primary">
          <Sparkles size={17} />
        </span>
        {!collapsed ? (
          <span className="font-display text-sm font-semibold tracking-wide text-foreground/85">
            ResumeForge
          </span>
        ) : null}
      </Link>

      <nav className="space-y-2">
        {navItems.map(({ id, href, label, icon: Icon }) => {
          const isActive = activeTab === id;

          if (href) {
            return (
              <Link
                key={id}
                href={href}
                className={cn(
                  "group flex items-center rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/72 transition",
                  "hover:bg-surface-muted hover:text-foreground",
                )}
              >
                <Icon size={17} className="shrink-0" />
                {!collapsed ? <span className="ml-3">{label}</span> : null}
              </Link>
            );
          }

          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={cn(
                "group flex w-full items-center rounded-xl px-3 py-2.5 text-sm font-medium transition",
                isActive
                  ? "bg-primary/15 text-primary"
                  : "text-foreground/72 hover:bg-surface-muted hover:text-foreground",
              )}
            >
              <Icon size={17} className="shrink-0" />
              {!collapsed ? <span className="ml-3">{label}</span> : null}
            </button>
          );
        })}

        {/* Admin link — only for admin emails */}
        {isAdmin && (
          <>
            <div className="my-2 border-t border-border/50" />
            <button
              onClick={() => onTabChange("admin")}
              className={cn(
                "group flex w-full items-center rounded-xl px-3 py-2.5 text-sm font-medium transition",
                activeTab === "admin"
                  ? "bg-red-500/15 text-red-400"
                  : "text-foreground/72 hover:bg-surface-muted hover:text-red-400",
              )}
            >
              <Shield size={17} className="shrink-0" />
              {!collapsed ? <span className="ml-3">Admin</span> : null}
            </button>
          </>
        )}
      </nav>

      <div className="mt-auto rounded-2xl border border-border/70 bg-primary/10 p-4">
        {!collapsed ? (
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/85">
              Pro tip
            </p>
            <p className="mt-2 text-xs leading-5 text-foreground/70">
              Use one master resume, then branch role-specific versions to stay
              fast.
            </p>
          </>
        ) : (
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-primary/85">
            Tip
          </p>
        )}
      </div>
    </motion.aside>
  );
}
