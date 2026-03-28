import { z } from "zod";

/* ── Create Resume ── */
export const createResumeSchema = z.object({
  title: z.string().min(1, "Title is required.").max(200),
  data: z.record(z.string(), z.unknown()).default({}),
  template_id: z.string().default("aurora"),
});

export type CreateResumeInput = z.infer<typeof createResumeSchema>;

/* ── Update Resume ── */
export const updateResumeSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  data: z.record(z.string(), z.unknown()).optional(),
  template_id: z.string().optional(),
  status: z.enum(["Draft", "Ready", "Review"]).optional(),
});

export type UpdateResumeInput = z.infer<typeof updateResumeSchema>;

/* ── AI Enhance ── */
export const enhanceResumeSchema = z.object({
  experienceLevel: z.enum(["fresher", "experienced"]).optional(),
  headline: z.string().optional().default(""),
  summary: z.string().optional().default(""),
  experience: z
    .array(
      z.object({
        role: z.string().optional().default(""),
        company: z.string().optional().default(""),
        duration: z.string().optional().default(""),
        description: z.string().optional().default(""),
        achievements: z.array(z.string()).optional().default([]),
      }),
    )
    .optional()
    .default([]),
  education: z
    .array(
      z.object({
        institution: z.string().optional().default(""),
        degree: z.string().optional().default(""),
        field: z.string().optional().default(""),
        year: z.string().optional().default(""),
      }),
    )
    .optional()
    .default([]),
  technicalSkills: z.string().optional().default(""),
  softSkills: z.string().optional().default(""),
  projects: z
    .array(
      z.object({
        title: z.string().optional().default(""),
        description: z.string().optional().default(""),
        techStack: z.string().optional().default(""),
      }),
    )
    .optional()
    .default([]),
  certifications: z
    .array(
      z.object({
        title: z.string().optional().default(""),
        issuer: z.string().optional().default(""),
        date: z.string().optional().default(""),
      }),
    )
    .optional()
    .default([]),
});

export type EnhanceResumeInput = z.infer<typeof enhanceResumeSchema>;
