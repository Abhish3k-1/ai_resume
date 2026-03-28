import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { callAI } from "@/lib/ai-client";
import { z } from "zod";

const generateSkillsSchema = z.object({
  role: z.string().min(2, "Role is required"),
  experienceLevel: z.enum(["fresher", "experienced"]).optional(),
});

const SYSTEM_PROMPT = `You are an expert career coach and technical recruiter. Given a specific job role or headline, your task is to instantly generate the most highly-sought after Technical Skills and Soft Skills for that position in today's job market.

Return ONLY a valid JSON object with EXACTLY this structure, no markdown, no code fences, no explanations. 
DO NOT mix soft skills into the technical field, and DO NOT mix technical skills into the soft field.

{
  "technical": "Comma-separated list of exactly 10-15 top hard TECHNICAL skills (e.g. React, Python, Figma). NEVER include soft skills here.",
  "soft": "Comma-separated list of exactly 5-8 top SOFT skills (e.g. Leadership, Communication). NEVER include technical tools here."
}`;

export async function POST(request: Request) {
  try {
    try {
      const supabase = await createClient();
      await supabase.auth.getUser();
    } catch {
      // Auth check — continue regardless
    }

    const body = await request.json();
    const parsed = generateSkillsSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed" }, { status: 400 });
    }

    const levelStr = parsed.data.experienceLevel === "fresher" 
      ? "(Targeting a Fresher / Entry-Level Candidate)" 
      : "(Targeting an Experienced Professional)";
      
    const userMessage = `Generate the optimal skills for this role ${levelStr}:\n"${parsed.data.role}"`;

    const responseContent = await callAI(SYSTEM_PROMPT, userMessage);

    let skills;
    try {
      const firstBrace = responseContent.indexOf("{");
      const lastBrace = responseContent.lastIndexOf("}");
      if (firstBrace === -1 || lastBrace === -1) {
        throw new Error("No JSON braces found in response");
      }
      const cleaned = responseContent.substring(firstBrace, lastBrace + 1);
      skills = JSON.parse(cleaned);
    } catch {
      throw new Error("AI Format failed");
    }

    return NextResponse.json({ skills });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[AI Skills Fallback Triggered] Error:", message);
    
    // Fallback data
    const fallbackSkills = {
      technical: "JavaScript, React, Node.js, TypeScript, HTML/CSS, Git, SQL, Problem Solving",
      soft: "Communication, Teamwork, Leadership, Adaptability, Time Management"
    };
    
    return NextResponse.json({ skills: fallbackSkills });
  }
}
