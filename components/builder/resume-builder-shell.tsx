"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  Award,
  Briefcase,
  CheckCircle,
  Download,
  FileText,
  FolderGit2,
  Globe,
  GraduationCap,
  HandHeart,
  Heart,
  Plus,
  Sparkles,
  User,
  Wrench,
  X,
} from "lucide-react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAutoSave } from "@/hooks/use-auto-save";
import {
  resumeDefaultValues,
  resumeFormSchema,
  type ResumeFormSchema,
} from "@/lib/schemas";
import type { ResumeTemplateId } from "@/lib/types";
import { builderSections } from "@/lib/data";
import { cn } from "@/lib/utils";

/* ── Section components ── */
import { SectionPersonalInfo } from "@/components/builder/sections/section-personal-info";
import { SectionSummary } from "@/components/builder/sections/section-summary";
import { SectionExperience } from "@/components/builder/sections/section-experience";
import { SectionEducation } from "@/components/builder/sections/section-education";
import { SectionSkills } from "@/components/builder/sections/section-skills";
import { SectionProjects } from "@/components/builder/sections/section-projects";
import { SectionCertifications } from "@/components/builder/sections/section-certifications";
import { SectionLanguages } from "@/components/builder/sections/section-languages";
import { SectionHobbies } from "@/components/builder/sections/section-hobbies";
import { SectionVolunteer } from "@/components/builder/sections/section-volunteer";
import { SectionCustom } from "@/components/builder/sections/section-custom";
import { AIImproveButton } from "@/components/builder/ai-improve-button";

const ResumePreviewPanel = dynamic(
  () =>
    import("@/components/builder/resume-preview-panel").then(
      (module) => module.ResumePreviewPanel,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="glass-panel flex h-full min-h-[620px] items-center justify-center rounded-3xl p-6 text-sm text-foreground/65">
        Loading live preview...
      </div>
    ),
  },
);

const STORAGE_KEY = "resumeforge-draft-v2";

const iconMap: Record<string, React.ElementType> = {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  Globe,
  Heart,
  HandHeart,
  Plus,
};

/* Sections that cannot be toggled off */
const ALWAYS_ON = new Set(["personal", "summary"]);

const defaultToggles: Record<string, boolean> = {
  personal: true,
  summary: true,
  experience: true,
  education: true,
  skills: true,
  projects: true,
  certifications: true,
  languages: true,
  hobbies: true,
  volunteer: true,
  custom: true,
};

/* ── Futuristic AI Generation Overlay ── */
function AIGeneratingOverlay({ progress }: { progress: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="mx-4 w-full max-w-md rounded-3xl border border-primary/30 bg-surface p-8 text-center shadow-2xl"
      >
        {/* Animated rings */}
        <div className="relative mx-auto mb-6 h-24 w-24">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/30"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border-2 border-primary/50"
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0.2, 0.7] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
          />
          <motion.div
            className="absolute inset-4 rounded-full border-2 border-primary"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: [0, 180, 360] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles size={28} className="text-primary" />
            </motion.div>
          </div>
        </div>

        <h3 className="font-display text-lg font-semibold text-foreground">
          AI is generating your resume
        </h3>
        <p className="mt-1 text-sm text-foreground/60">
          Crafting professional content with the power of AI...
        </p>

        {/* Progress bar */}
        <div className="mt-6 h-2 overflow-hidden rounded-full bg-surface-muted">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary via-primary/80 to-primary"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="mt-2 text-xs font-medium text-primary">{progress}%</p>

        {/* Animated text hints */}
        <AnimatePresence mode="wait">
          <motion.p
            key={Math.floor(progress / 20)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-3 text-xs text-foreground/40"
          >
            {progress < 20
              ? "Analyzing your input..."
              : progress < 40
                ? "Selecting optimal AI model..."
                : progress < 60
                  ? "Generating professional content..."
                  : progress < 80
                    ? "Refining language and impact..."
                    : "Finalizing your resume..."}
          </motion.p>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export function ResumeBuilderShell() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id");

  const methods = useForm<ResumeFormSchema>({
    resolver: zodResolver(resumeFormSchema),
    defaultValues: resumeDefaultValues,
    mode: "onChange",
  });

  const watchedValues = useWatch({
    control: methods.control,
  }) as Partial<ResumeFormSchema>;

  const [selectedTemplate, setSelectedTemplate] =
    useState<ResumeTemplateId>("aurora");
  const [activeSection, setActiveSection] = useState("personal");
  const [sectionToggles, setSectionToggles] = useState<Record<string, boolean>>(defaultToggles);

  const mergedValues = useMemo(() => {
    // Deep clone to prevent any reference mutations leaking back into React Hook Form
    const vals = JSON.parse(JSON.stringify({ ...resumeDefaultValues, ...watchedValues })) as ResumeFormSchema;
    
    // Remove data from preview & export for elements toggled "off"
    if (!sectionToggles.experience) vals.experience = [];
    if (!sectionToggles.education) vals.education = [];
    if (!sectionToggles.skills) {
      vals.technicalSkills = "";
      vals.softSkills = "";
    }
    if (!sectionToggles.projects) vals.projects = [];
    if (!sectionToggles.certifications) vals.certifications = [];
    if (!sectionToggles.languages) vals.languages = "";
    if (!sectionToggles.hobbies) vals.hobbies = "";
    if (!sectionToggles.volunteer) vals.volunteer = [];
    if (!sectionToggles.custom) vals.customSections = [];

    return vals;
  }, [watchedValues, sectionToggles]);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [generating, setGenerating] = useState(false);
  const [generatingSkills, setGeneratingSkills] = useState(false);
  const [genProgress, setGenProgress] = useState(0);
  const [genError, setGenError] = useState<string | null>(null);
  
  const [backendResumeId, setBackendResumeId] = useState<string | null>(initialId);
  const [, setIsInitializing] = useState(true);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showAIPolishModal, setShowAIPolishModal] = useState(false);
  
  const previewRef = useRef<HTMLDivElement>(null);
  const [toast, setToast] = useState<{ type: "error" | "success" | "info"; message: string } | null>(null);

  const storageKey = backendResumeId ? `resumeforge-draft-${backendResumeId}` : STORAGE_KEY;

  // Create a combined state to trigger auto-save when either values or toggles change
  const saveState = useMemo(() => {
    return { ...watchedValues, sectionToggles };
  }, [watchedValues, sectionToggles]);

  const handleDatabaseSave = useCallback(async (currentSaveState: Record<string, unknown>) => {
    try {
      const { sectionToggles: _toggles, ...rawFormValues } = currentSaveState as Record<string, unknown>;
      void _toggles;
      
      const payload = {
        title: rawFormValues.headline || "Untitled Resume",
        template_id: selectedTemplate,
        data: currentSaveState, // Store raw values + toggles in the JSON column
      };

      if (backendResumeId) {
        await fetch(`/api/resumes/${backendResumeId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        const res = await fetch("/api/resumes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const { resume } = await res.json();
          if (resume?.id) {
            setBackendResumeId(resume.id);
            window.history.replaceState(null, "", `/builder?id=${resume.id}`);
          }
        }
      }
    } catch (err) {
      console.error("Auto-save DB error:", err);
    }
  }, [backendResumeId, selectedTemplate]);

  const { status, lastSavedAt } = useAutoSave(saveState, storageKey, 2500, handleDatabaseSave);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    async function loadResume() {
      if (initialId) {
        try {
          const res = await fetch(`/api/resumes/${initialId}`);
          if (res.ok) {
            const data = await res.json();
            if (data?.resume?.data) {
              const { sectionToggles: savedToggles, ...restData } = data.resume.data;
              methods.reset({ ...resumeDefaultValues, ...restData });
              if (savedToggles) setSectionToggles((prev) => ({ ...prev, ...savedToggles }));
              if (data.resume.template_id) setSelectedTemplate(data.resume.template_id);
              setIsInitializing(false);
              return;
            }
          }
        } catch (err) {
          console.error("Fetch resume error:", err);
        }
      }

      // Fallback or New Resume local storage load
      const savedDraft = localStorage.getItem(storageKey);
      if (savedDraft) {
        try {
          const parsed = JSON.parse(savedDraft);
          const { sectionToggles: savedToggles, ...restData } = parsed;
          methods.reset({ ...resumeDefaultValues, ...restData });
          if (savedToggles) setSectionToggles((prev) => ({ ...prev, ...savedToggles }));
        } catch {
          localStorage.removeItem(storageKey);
        }
      } else if (!initialId) {
        methods.reset(resumeDefaultValues);
      }
      setIsInitializing(false);
    }

    loadResume();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveStatusLabel = useMemo(() => {
    if (status === "saving") return "Saving draft...";
    if (status === "saved" && lastSavedAt) {
      return `Saved at ${lastSavedAt.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }
    return "Auto-save active";
  }, [lastSavedAt, status]);

  const handleToggleSection = useCallback((sectionId: string) => {
    if (ALWAYS_ON.has(sectionId)) return;
    setSectionToggles((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    const el = sectionRefs.current[sectionId];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);


  /* ── AI Generate ── */
  const handleGenerate = useCallback(async () => {
    if (generating) return;
    
    const values = methods.getValues();

    const level = "experienced";

    setGenerating(true);
    setGenProgress(5);
    setGenError(null);

    const progressTimer = setInterval(() => {
      setGenProgress((p) => Math.min(p + 3, 92));
    }, 200);

    const payload = {
      experienceLevel: level,
      headline: values.headline,
      summary: values.summary,
      experience: values.experience.map((e) => ({
        role: e.role,
        company: e.company,
        duration: `${e.startDate} - ${e.endDate}`,
        description: e.description,
        achievements: Array.isArray(e.achievements)
          ? e.achievements.filter(Boolean)
          : [],
      })),
      education: values.education.map((e) => ({
        institution: e.institution,
        degree: e.degree,
        field: e.field,
        year: e.endYear,
      })),
      technicalSkills: values.technicalSkills,
      softSkills: values.softSkills,
      projects: values.projects.map((p) => ({
        title: p.title,
        description: p.description,
        techStack: p.techStack,
      })),
      certifications: values.certifications.map((c) => ({
        title: c.title,
        issuer: c.issuer,
        date: c.date,
      })),
    };

    try {
      const res = await fetch("/api/ai/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        setGenError(err.error || "AI generation failed");
        return;
      }

      const { enhanced, fallbackTriggered, errorReason } = await res.json();
      setGenProgress(95);
      
      if (fallbackTriggered) {
         setToast({ 
           type: "error", 
           message: `AI Generation failed (${errorReason || 'API Error'}). Using fallback content.` 
         });
      }

      // Apply ALL enhanced fields back to the form robustly
      // We retain the user's original un-enhanced fields (like firstName, email, etc.)
      // and overwrite the enhanceable sections with the AI's response.
      const currentValues = methods.getValues();
      methods.reset({
        ...currentValues,
        headline: enhanced.headline || currentValues.headline,
        summary: enhanced.summary || currentValues.summary,
        experience: enhanced.experience?.length ? enhanced.experience : currentValues.experience,
        education: enhanced.education?.length ? enhanced.education : currentValues.education,
        technicalSkills: enhanced.technicalSkills || currentValues.technicalSkills,
        softSkills: enhanced.softSkills || currentValues.softSkills,
        projects: enhanced.projects?.length ? enhanced.projects : currentValues.projects,
        certifications: enhanced.certifications?.length ? enhanced.certifications : currentValues.certifications,
      });

      setGenProgress(100);
    } catch (err) {
      console.error("AI generation error:", err);
      setGenError("Network error. Please try again.");
    } finally {
      clearInterval(progressTimer);
      setTimeout(() => {
        setGenerating(false);
        setGenProgress(0);
      }, 600);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generating, methods]);

  /* ── AI Skills Generation ── */
  const handleGenerateSkills = useCallback(async () => {
    if (generatingSkills) return;
    const headline = methods.getValues("headline");
    
    if (!headline?.trim()) {
      setToast({ type: "error", message: "Please enter a Headline / Role first so the AI knows what skills to generate!" });
      scrollToSection("personal");
      return;
    }
    
    const level = "experienced";
    
    setGeneratingSkills(true);
    try {
      const res = await fetch("/api/ai/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: headline, experienceLevel: level }),
      });
      
      if (!res.ok) {
        setToast({ type: "error", message: "Failed to generate skills. Please try again." });
        return;
      }
      
      const { skills } = await res.json();
      
      if (skills.technical) {
        methods.setValue("technicalSkills", skills.technical, { shouldDirty: true, shouldValidate: true });
      }
      if (skills.soft) {
        methods.setValue("softSkills", skills.soft, { shouldDirty: true, shouldValidate: true });
      }
      
      setToast({ type: "success", message: "Skills generated successfully!" });
    } catch {
      setToast({ type: "error", message: "Error connecting to AI." });
    } finally {
      setGeneratingSkills(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methods, generatingSkills, scrollToSection]);

  /* ── Download PDF Options ── */
  const confirmDownload = useCallback(async (includeRole: boolean) => {
    setShowDownloadModal(false);
    
    const originalRole = methods.getValues("headline");
    if (!includeRole && originalRole) {
      methods.setValue("headline", "", { shouldValidate: true });
      // Allow react exactly enough time to clear the preview DOM
      await new Promise((r) => setTimeout(r, 150));
    }

    const printTarget = document.getElementById("resume-print-target");
    if (!printTarget) {
      setToast({ type: "error", message: "Please wait for the preview to load first." });
      return;
    }

    setToast({ type: "info", message: "Generating PDF..." });

    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const canvas = await html2canvas(printTarget, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const width = imgWidth * ratio;
      const height = imgHeight * ratio;

      pdf.addImage(imgData, "PNG", 0, 0, width, height);

      const firstName = methods.getValues("firstName") || "Resume";
      const lastName = methods.getValues("lastName") || "";
      const filename = `${firstName}${lastName ? "_" + lastName : ""}_Resume.pdf`;
      pdf.save(filename);

      setToast({ type: "success", message: "PDF downloaded successfully!" });
    } catch (err) {
      console.error("PDF generation error:", err);
      setToast({ type: "error", message: "Failed to generate PDF. Please try again." });
    } finally {
      // Restore the headline for the builder after download finishes
      if (!includeRole && originalRole) {
         methods.setValue("headline", originalRole, { shouldValidate: true });
      }
    }
  }, [methods]);

  return (
    <>
      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed right-4 top-4 z-[60] flex items-center gap-3 rounded-xl border px-4 py-3 shadow-xl backdrop-blur ${
              toast.type === "error"
                ? "border-red-400/40 bg-red-950/90 text-red-200"
                : toast.type === "success"
                  ? "border-emerald-400/40 bg-emerald-950/90 text-emerald-200"
                  : "border-blue-400/40 bg-blue-950/90 text-blue-200"
            }`}
          >
            {toast.type === "error" ? (
              <AlertTriangle size={16} />
            ) : toast.type === "success" ? (
              <CheckCircle size={16} />
            ) : (
              <Sparkles size={16} />
            )}
            <p className="text-sm font-medium max-w-xs">{toast.message}</p>
            <button onClick={() => setToast(null)} className="ml-2 opacity-60 hover:opacity-100">
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {generating && <AIGeneratingOverlay progress={genProgress} />}
      </AnimatePresence>

      {/* Download Options Overlay */}
      <AnimatePresence>
        {showDownloadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm rounded-[24px] border border-border/60 bg-surface p-6 shadow-2xl"
            >
              <h3 className="mb-2 text-lg font-bold text-foreground">Download Options</h3>
              <p className="mb-6 text-sm text-foreground/70">
                Do you want to include your <strong>Headline / Role</strong> in the exported PDF?
              </p>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => confirmDownload(true)}
                  className="flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
                >
                  Yes, Include Role
                </button>
                <button
                  type="button"
                  onClick={() => confirmDownload(false)}
                  className="flex items-center justify-center rounded-xl border border-border/70 bg-surface-muted px-4 py-2.5 text-sm font-semibold text-foreground/80 transition hover:bg-foreground/5"
                >
                  No, Hide Role
                </button>
                <button
                  type="button"
                  onClick={() => setShowDownloadModal(false)}
                  className="mt-2 text-xs text-foreground/50 hover:text-foreground transition hover:underline"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Polish Confirmation Overlay */}
      <AnimatePresence>
        {showAIPolishModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm rounded-[24px] border border-border/60 bg-surface p-6 shadow-2xl"
            >
              <h3 className="mb-2 text-lg font-bold text-foreground">AI Magic Rewrite</h3>
              <p className="mb-6 text-sm text-foreground/70">
                Are you sure? This will rewrite your entire resume using AI to be highly ATS-friendly. <strong className="text-primary">This action will overwrite your current content.</strong>
              </p>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAIPolishModal(false);
                    handleGenerate();
                  }}
                  className="flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
                >
                  Yes, Polish My Resume
                </button>
                <button
                  type="button"
                  onClick={() => setShowAIPolishModal(false)}
                  className="flex items-center justify-center rounded-xl border border-border/70 bg-surface-muted px-4 py-2.5 text-sm font-semibold text-foreground/80 transition hover:bg-foreground/5"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>



      <div className="px-3 py-4 sm:px-4 sm:py-6 lg:px-6 xl:px-8 print:p-0">
        <div className="mx-auto w-full">
          {/* ── Header ── */}
          <header className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/70 bg-surface/65 px-4 py-3 backdrop-blur sm:px-5 print:hidden">
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/75 bg-surface/70 text-foreground/72 transition hover:text-foreground"
              >
                <ArrowLeft size={16} />
              </Link>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/82">
                  Resume Builder
                </p>
                <p className="text-sm text-foreground/66">
                  AI-powered resume generator
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {genError && (
                <span className="text-xs text-red-400">{genError}</span>
              )}
              <span className="text-xs text-foreground/58 flex items-center gap-1.5">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    status === "saving" ? "bg-amber-300" : "bg-emerald-300"
                  }`}
                />
                {saveStatusLabel}
              </span>

              {/* Global AI Polish */}
              <div className="ml-2">
                <AIImproveButton 
                  onImprove={async () => setShowAIPolishModal(true)} 
                  label="Polish with AI" 
                  className="h-10 px-4 rounded-xl border-border/70 bg-surface/65 font-medium text-foreground/75 hover:bg-primary/5 hover:border-primary/40 hover:text-primary transition-all"
                />
              </div>

              {/* Download */}
              <motion.button
                type="button"
                onClick={() => setShowDownloadModal(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-border/70 bg-surface/65 px-4 text-sm font-medium text-foreground/75 transition hover:border-emerald-400/40 hover:text-emerald-500"
              >
                <Download size={15} />
                Download PDF
              </motion.button>

              <ThemeToggle className="ml-1" />
            </div>
          </header>

          {/* ── Mobile Section Navigation ── */}
          <nav className="xl:hidden -mt-2 mb-6 flex overflow-x-auto gap-2 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] print:hidden">
            {builderSections.map((section) => {
              const Icon = iconMap[section.icon] ?? FileText;
              const isActive = activeSection === section.id;
              const isAlwaysOn = ALWAYS_ON.has(section.id);
              const isEnabled = isAlwaysOn || sectionToggles[section.id];

              return (
                <div key={`mobile-nav-${section.id}`} className={cn("flex shrink-0 items-center overflow-hidden rounded-full border transition-colors", isActive ? "border-primary/50 bg-primary/15" : "border-border/60 bg-surface/50", !isEnabled && "opacity-50 grayscale")}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(section.id)}
                    className={cn("flex items-center gap-2 pl-3 sm:pl-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-colors cursor-pointer", isActive ? "text-primary" : "text-foreground/70 hover:text-foreground", isAlwaysOn ? "pr-3 sm:pr-4" : "pr-1.5")}
                  >
                    <Icon size={14} />
                    {section.label}
                  </button>
                  {!isAlwaysOn && (
                     <button
                       type="button"
                       onClick={(e) => {
                         e.stopPropagation();
                         handleToggleSection(section.id);
                       }}
                       className="flex h-full items-center justify-center pr-3 pl-1.5 py-1.5 sm:py-2 text-foreground/40 hover:text-foreground transition-colors"
                       title={isEnabled ? "Hide Section" : "Show Section"}
                     >
                       <div className={cn("h-3 w-3 rounded-full border transition-colors", isEnabled ? "bg-primary border-primary shadow-sm" : "bg-transparent border-foreground/30")} />
                     </button>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="grid gap-6 xl:grid-cols-[280px_1fr_1fr]">
            {/* ── Section Navigation Sidebar ── */}
            <nav className="glass-panel hidden rounded-2xl p-3 xl:block sticky top-24 self-start print:hidden">
              <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/45">
                Sections
              </p>
              <div className="space-y-1">
                {builderSections.map((section) => {
                  const Icon = iconMap[section.icon] ?? FileText;
                  const isActive = activeSection === section.id;
                  const isAlwaysOn = ALWAYS_ON.has(section.id);
                  const isEnabled = isAlwaysOn || sectionToggles[section.id];

                  return (
                    <div
                      key={section.id}
                      className={cn(
                        "flex w-full items-center justify-between rounded-xl px-2 py-1 transition",
                        isActive ? "bg-primary/5" : "hover:bg-surface-muted"
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => scrollToSection(section.id)}
                        className={cn(
                          "flex flex-1 items-center gap-3 px-2 py-1.5 text-sm font-medium transition",
                          isActive
                            ? "text-primary"
                            : "text-foreground/65 hover:text-foreground",
                          !isEnabled && "opacity-50"
                        )}
                      >
                        <Icon size={16} className="shrink-0" />
                        {section.label}
                      </button>

                      {!isAlwaysOn && (
                        <button
                          type="button"
                          onClick={() => handleToggleSection(section.id)}
                          className={cn(
                            "ml-2 flex h-5 w-8 shrink-0 items-center rounded-full p-0.5 transition-colors",
                            isEnabled ? "bg-primary" : "bg-foreground/20"
                          )}
                        >
                          <div
                            className={cn(
                              "h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
                              isEnabled ? "translate-x-3" : "translate-x-0"
                            )}
                          />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </nav>

            {/* ── Form Sections ── */}
            <section className="glass-panel rounded-3xl p-5 sm:p-6 lg:p-7 overflow-y-auto max-h-[calc(100vh-140px)] print:hidden">
              <FormProvider {...methods}>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="space-y-10"
                >
                  <div ref={(el) => { sectionRefs.current["personal"] = el; }}>
                    <SectionPersonalInfo />
                  </div>

                  <div className="border-t border-border/50" />

                  <div ref={(el) => { sectionRefs.current["summary"] = el; }}>
                    <SectionSummary onImprove={handleGenerate} />
                  </div>

                  <div className={cn("transition-all", !sectionToggles["experience"] && "h-0 w-0 overflow-hidden opacity-0 pointer-events-none absolute -z-50")}>
                    <div className="border-t border-border/50" />
                    <div ref={(el) => { sectionRefs.current["experience"] = el; }}>
                      <SectionExperience onImprove={handleGenerate} />
                    </div>
                  </div>

                  <div className={cn("transition-all", !sectionToggles["education"] && "h-0 w-0 overflow-hidden opacity-0 pointer-events-none absolute -z-50")}>
                    <div className="border-t border-border/50" />
                    <div ref={(el) => { sectionRefs.current["education"] = el; }}>
                      <SectionEducation />
                    </div>
                  </div>

                  <div className={cn("transition-all", !sectionToggles["skills"] && "h-0 w-0 overflow-hidden opacity-0 pointer-events-none absolute -z-50")}>
                    <div className="border-t border-border/50" />
                    <div ref={(el) => { sectionRefs.current["skills"] = el; }}>
                      <SectionSkills onGenerate={handleGenerateSkills} generating={generatingSkills} />
                    </div>
                  </div>

                  <div className={cn("transition-all", !sectionToggles["projects"] && "h-0 w-0 overflow-hidden opacity-0 pointer-events-none absolute -z-50")}>
                    <div className="border-t border-border/50" />
                    <div ref={(el) => { sectionRefs.current["projects"] = el; }}>
                      <SectionProjects />
                    </div>
                  </div>

                  <div className={cn("transition-all", !sectionToggles["certifications"] && "h-0 w-0 overflow-hidden opacity-0 pointer-events-none absolute -z-50")}>
                    <div className="border-t border-border/50" />
                    <div ref={(el) => { sectionRefs.current["certifications"] = el; }}>
                      <SectionCertifications />
                    </div>
                  </div>

                  <div className={cn("transition-all", !sectionToggles["languages"] && "h-0 w-0 overflow-hidden opacity-0 pointer-events-none absolute -z-50")}>
                    <div className="border-t border-border/50" />
                    <div ref={(el) => { sectionRefs.current["languages"] = el; }}>
                      <SectionLanguages />
                    </div>
                  </div>

                  <div className={cn("transition-all", !sectionToggles["hobbies"] && "h-0 w-0 overflow-hidden opacity-0 pointer-events-none absolute -z-50")}>
                    <div className="border-t border-border/50" />
                    <div ref={(el) => { sectionRefs.current["hobbies"] = el; }}>
                      <SectionHobbies />
                    </div>
                  </div>

                  <div className={cn("transition-all", !sectionToggles["volunteer"] && "h-0 w-0 overflow-hidden opacity-0 pointer-events-none absolute -z-50")}>
                    <div className="border-t border-border/50" />
                    <div ref={(el) => { sectionRefs.current["volunteer"] = el; }}>
                      <SectionVolunteer />
                    </div>
                  </div>

                  <div className={cn("transition-all", !sectionToggles["custom"] && "h-0 w-0 overflow-hidden opacity-0 pointer-events-none absolute -z-50")}>
                    <div className="border-t border-border/50" />
                    <div ref={(el) => { sectionRefs.current["custom"] = el; }}>
                      <SectionCustom />
                    </div>
                  </div>
                </form>
              </FormProvider>
            </section>

            {/* ── Preview Panel ── */}
            <div ref={previewRef}>
              <ResumePreviewPanel
                data={mergedValues}
                selectedTemplate={selectedTemplate}
                onTemplateChange={setSelectedTemplate}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
