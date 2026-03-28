import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { callAI } from "@/lib/ai-client";
import { enhanceResumeSchema, type EnhanceResumeInput } from "@/lib/validations/resume";

const SYSTEM_PROMPT = `You are a world-class professional resume writer and career coach. Your task is to polish and enhance the user's resume content, or generate a high-quality base template if they provide no content.

CRITICAL RULES:
1. IF THE USER PROVIDES CONTENT: ONLY enhance and polish their EXACT raw facts. Do NOT hallucinate, invent, or add fake companies, fake degrees, fake names, fake dates, or fake metrics.
2. IF THE USER PROVIDES EMPTY OR VERY LITTLE CONTENT: You MUST generate a complete, highly-professional, impressive base template with rich placeholder data (e.g., "Company Name", "University", "Metric") tailored to their headline (or a generic Software Engineer if no headline is provided).
3. FOR THE PROFESSIONAL SUMMARY: Always generate a highly impactful, ATS-optimized summary based on their role.
4. Use strong action verbs (Led, Spearheaded, Optimized) and concise, professional language.
5. ALWAYS provide fresh, newly rephrased content for all fields, ensuring the resulting JSON is fully populated and looks like a world-class resume.
6. Return ONLY valid JSON respecting the exact structure provided below. No markdown, no explanations, no code fences.

CRITICAL CONTEXT TUNING:
The user has specified their experience level as: \${input.experienceLevel?.toUpperCase() || "EXPERIENCED"}. 
If FRESHER: Emphasize enthusiasm, academic foundations, learning agility, theoretical knowledge, and potential. Do not fabricate senior leadership metrics.
If EXPERIENCED: Emphasize leadership, concrete business impact, scalability, architecture, and deep technical expertise.

Return a JSON object with this exact structure:
{
  "headline": "Enhanced headline/role",
  "summary": "Enhanced professional summary",
  "experience": [
    {
      "role": "Job Title",
      "company": "Company Name",
      "duration": "Start - End",
      "description": "Enhanced description",
      "achievements": ["Achievement 1", "Achievement 2"]
    }
  ],
  "education": [
    {
      "institution": "University Name",
      "degree": "Degree",
      "field": "Field of Study",
      "year": "Year"
    }
  ],
  "technicalSkills": "Enhanced comma-separated technical skills",
  "softSkills": "Enhanced comma-separated soft skills",
  "projects": [
    {
      "title": "Project Name",
      "description": "Enhanced description",
      "techStack": "Technologies used"
    }
  ],
  "certifications": [
    {
      "title": "Certification Name",
      "issuer": "Issuing Organization",
      "date": "Date"
    }
  ]
}`;

/**
 * POST /api/ai/enhance — Enhance resume content using Google Gemini AI
 */
export async function POST(request: Request) {
  let fallbackInput: Partial<EnhanceResumeInput> = {};

  try {
    // Auth is optional — AI generation works for all users
    // (We still try to get user for logging purposes)
    let userId = "anonymous";
    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) userId = user.id;
    } catch {
      // Auth failed — continue as anonymous
    }

    console.log(`[AI Enhance] Request from user: ${userId}`);


    const body = await request.json();
    const parsed = enhanceResumeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const input = parsed.data;
    fallbackInput = input;

    // Build user message from whatever fields are available
    const sections: string[] = [];

    if (input.experienceLevel) {
      sections.push(`EXPERIENCE LEVEL:\n${input.experienceLevel.toUpperCase()}`);
    }

    if (input.headline) {
      sections.push(`HEADLINE / ROLE:\n${input.headline}`);
    }

    if (input.summary) {
      sections.push(`PROFESSIONAL SUMMARY:\n${input.summary}`);
    }

    if (input.experience.length > 0) {
      sections.push(
        `WORK EXPERIENCE:\n${input.experience
          .map(
            (e) =>
              `- ${e.role || "Role"} at ${e.company || "Company"} (${e.duration || ""})\n  ${e.description}\n  Achievements: ${e.achievements.join("; ") || "None listed"}`,
          )
          .join("\n")}`,
      );
    }

    if (input.education.length > 0) {
      sections.push(
        `EDUCATION:\n${input.education
          .map(
            (e) =>
              `- ${e.degree || "Degree"} in ${e.field || "Field"} from ${e.institution || "Institution"} (${e.year || ""})`,
          )
          .join("\n")}`,
      );
    }

    if (input.technicalSkills) {
      sections.push(`TECHNICAL SKILLS:\n${input.technicalSkills}`);
    }

    if (input.softSkills) {
      sections.push(`SOFT SKILLS:\n${input.softSkills}`);
    }

    if (input.projects.length > 0) {
      sections.push(
        `PROJECTS:\n${input.projects
          .map(
            (p) =>
              `- ${p.title || "Project"}: ${p.description} (Tech: ${p.techStack || "N/A"})`,
          )
          .join("\n")}`,
      );
    }

    if (input.certifications.length > 0) {
      sections.push(
        `CERTIFICATIONS:\n${input.certifications
          .map((c) => `- ${c.title || "Cert"} by ${c.issuer || "Issuer"} (${c.date || ""})`)
          .join("\n")}`,
      );
    }

    if (sections.length === 0) {
      sections.push("Provide a complete generic template for a Software Engineer.");
    }

    const userMessage = `Please enhance the following resume content and return it as JSON:\n\n${sections.join("\n\n")}`;

    const responseContent = await callAI(SYSTEM_PROMPT, userMessage);

    // Parse the AI response as JSON
    let enhanced;
    try {
      console.log(`[AI Response Length]: ${responseContent?.length} chars`);
      
      // Extract robustly: find the first { and the last }
      const firstBrace = responseContent.indexOf("{");
      const lastBrace = responseContent.lastIndexOf("}");
      
      if (firstBrace === -1 || lastBrace === -1) {
         console.error("[JSON Parser] No braces detected in response body:", responseContent.substring(0, 100));
         throw new Error("AI returned response with no JSON braces");
      }
      
      const cleaned = responseContent.substring(firstBrace, lastBrace + 1);
      enhanced = JSON.parse(cleaned);
      console.log("[AI Enhance] Successfully parsed JSON structure.");
    } catch (parseErr) {
      console.error("[AI Enhance JSON Parse Error]:", parseErr);
      throw new Error("AI returned invalid response format");
    }

    return NextResponse.json({ enhanced });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[AI Enhance Fallback Triggered] Error:", message);

    // Fallback: Ensure AI never fails by returning the original input or a populated template if empty
    // The UI will receive a valid 200 response with data instantly
    const fallbackEnhanced = {
      headline: fallbackInput.headline || "Software Engineer",
      summary: fallbackInput.summary || "Results-driven Software Engineer with a passion for building scalable web applications. Proven ability to leverage modern frameworks and optimize performance. Adept at collaborating with cross-functional teams to deliver high-quality software solutions on time.",
      experience: fallbackInput.experience?.length ? fallbackInput.experience : [
        {
          role: "Software Engineer",
          company: "Tech Solutions Inc.",
          duration: "2021 - Present",
          description: "Led the development of a high-traffic scalable platform.",
          achievements: ["Improved site load time by 40%", "Mentored junior engineers"]
        }
      ],
      education: fallbackInput.education?.length ? fallbackInput.education : [
        {
          institution: "University of Technology",
          degree: "Bachelor of Science",
          field: "Computer Science",
          year: "2020"
        }
      ],
      technicalSkills: fallbackInput.technicalSkills || "React, TypeScript, Node.js, Next.js, PostgreSQL",
      softSkills: fallbackInput.softSkills || "Problem Solving, Communication, Teamwork",
      projects: fallbackInput.projects?.length ? fallbackInput.projects : [],
      certifications: fallbackInput.certifications?.length ? fallbackInput.certifications : []
    };

    return NextResponse.json(
      { enhanced: fallbackEnhanced, fallbackTriggered: true, errorReason: message },
      { status: 200 }
    );
  }
}

