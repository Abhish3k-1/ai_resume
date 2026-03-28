import { z } from "zod";

/* ── Sub-schemas ── */

const workExperienceSchema = z.object({
  id: z.string(),
  role: z.string().min(2, "Role is required."),
  company: z.string().min(2, "Company is required."),
  startDate: z.string().min(1, "Start date is required."),
  endDate: z.string(),
  description: z.string(),
  achievements: z.array(z.string()),
});

const educationSchema = z.object({
  id: z.string(),
  institution: z.string().min(2, "Institution is required."),
  degree: z.string().min(2, "Degree is required."),
  field: z.string(),
  startYear: z.string(),
  endYear: z.string(),
  markType: z.enum(["percentage", "cgpa"]),
  markValue: z.string(),
});

const projectSchema = z.object({
  id: z.string(),
  title: z.string().min(2, "Project title is required."),
  description: z.string(),
  techStack: z.string(),
  link: z.string(),
});

const certificationSchema = z.object({
  id: z.string(),
  title: z.string().min(2, "Certification title is required."),
  issuer: z.string(),
  date: z.string(),
  link: z.string(),
});

const customSectionItemSchema = z.object({
  id: z.string(),
  content: z.string(),
});

const customSectionSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Section title is required."),
  items: z.array(customSectionItemSchema),
});

const volunteerSchema = z.object({
  id: z.string(),
  role: z.string().min(2, "Role is required."),
  organization: z.string().min(2, "Organization is required."),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string(),
});

/* ── Main Resume Form Schema ── */

export const resumeFormSchema = z.object({
  firstName: z.string().min(2, "First name should have at least 2 characters."),
  lastName: z.string().min(2, "Last name should have at least 2 characters."),
  headline: z.string().optional().or(z.literal("")),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(8, "Phone number should be at least 8 digits."),
  location: z.string().min(2, "Location is required."),
  portfolio: z.string().url("Enter a valid URL.").or(z.literal("")),
  linkedin: z.string().url("Enter a valid URL.").or(z.literal("")),
  github: z.string().url("Enter a valid URL.").or(z.literal("")),
  summary: z.string().min(20, "Add a richer summary for better AI results."),
  experience: z.array(workExperienceSchema),
  education: z.array(educationSchema),
  technicalSkills: z.string(),
  softSkills: z.string(),
  projects: z.array(projectSchema),
  certifications: z.array(certificationSchema),
  languages: z.string(),
  hobbies: z.string(),
  volunteer: z.array(volunteerSchema),
  customSections: z.array(customSectionSchema),
});

export type ResumeFormSchema = z.infer<typeof resumeFormSchema>;

/* ── Helpers ── */

let _counter = 0;
export function uid() {
  return `uid-${Date.now()}-${++_counter}`;
}

/* ── Default Values ── */

export const resumeDefaultValues: ResumeFormSchema = {
  firstName: "",
  lastName: "",
  headline: "",
  email: "",
  phone: "",
  location: "",
  portfolio: "",
  linkedin: "",
  github: "",
  summary: "",
  experience: [],
  education: [],
  technicalSkills: "",
  softSkills: "",
  projects: [],
  certifications: [],
  languages: "",
  hobbies: "",
  volunteer: [],
  customSections: [],
};
