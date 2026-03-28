export type TemplateCategory = "minimal" | "modern" | "corporate" | "creative" | "ats";

export type ResumeTemplateId =
  | "aurora"
  | "slate"
  | "executive"
  | "clean"
  | "mercury"
  | "nordic"
  | "zen"
  | "neon"
  | "gradient"
  | "metro"
  | "prestige"
  | "boardroom"
  | "harbor"
  | "mosaic"
  | "canvas"
  | "prism"
  | "origami"
  | "classic"
  | "standard"
  | "foundation";

/* ── Structured Section Types ── */

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
}

export type MarkType = "percentage" | "cgpa";

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  markType: MarkType;
  markValue: string;
}

export interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  techStack: string;
  link: string;
}

export interface CertificationEntry {
  id: string;
  title: string;
  issuer: string;
  date: string;
  link: string;
}

export interface CustomSectionItem {
  id: string;
  content: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export interface VolunteerEntry {
  id: string;
  role: string;
  organization: string;
  startDate: string;
  endDate: string;
  description: string;
}

/* ── Full Resume Form Values ── */

export interface ResumeFormValues {
  /* Personal Info */
  firstName: string;
  lastName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  portfolio: string;
  linkedin: string;
  github: string;

  /* Professional Summary */
  summary: string;

  /* Structured Sections */
  experience: WorkExperience[];
  education: EducationEntry[];
  technicalSkills: string;
  softSkills: string;
  projects: ProjectEntry[];
  certifications: CertificationEntry[];
  languages: string;
  hobbies: string;
  volunteer: VolunteerEntry[];
  customSections: CustomSection[];
}

/* ── Legacy step type (kept for backward compat) ── */

export interface ResumeStep {
  id: string;
  title: string;
  description: string;
  fields: Array<keyof ResumeFormValues>;
}

/* ── Dashboard ── */

export interface DashboardResumeItem {
  id: string;
  title: string;
  role: string;
  updatedAt: string;
  score: number;
  template: string;
  status: "Draft" | "Ready" | "Review";
}

/* ── Template ── */

export interface TemplatePreview {
  id: ResumeTemplateId;
  name: string;
  tone: string;
  category: TemplateCategory;
  description: string;
}
