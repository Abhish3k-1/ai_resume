import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createResumeSchema } from "@/lib/validations/resume";

/**
 * GET /api/resumes — List all resumes for the authenticated user
 */
export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Force sync profile directly on dashboard load if they skipped the oauth callback
    // (Bypasses implicit grant missing backend server hooks)
    const email = user.email || "";
    const role = email === "absihekdas@gmail.com" ? "admin" : "user";
    await supabase.from("profiles").upsert(
      {
        id: user.id,
        full_name: user.user_metadata?.full_name || email.split("@")[0] || "Unknown",
        avatar_url: user.user_metadata?.avatar_url || null,
        role,
      },
      { onConflict: "id" }
    ).then(({ error }) => {
      if (error) console.error("Profile Sync Error on Dashboard Load:", error);
    });

    const { data: resumes, error } = await supabase
      .from("resumes")
      .select("id, title, template_id, status, created_at, updated_at, data")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Fetch resumes error:", error);
      return NextResponse.json(
        { error: "Failed to fetch resumes" },
        { status: 500 },
      );
    }

    return NextResponse.json({ resumes });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/resumes — Create a new resume
 */
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = createResumeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { title, data, template_id } = parsed.data;

    const { data: resume, error } = await supabase
      .from("resumes")
      .insert({
        user_id: user.id,
        title,
        data,
        template_id,
      })
      .select("id, title, template_id, status, created_at, updated_at")
      .single();

    if (error) {
      console.error("Create resume error:", error);
      return NextResponse.json(
        { error: "Failed to create resume" },
        { status: 500 },
      );
    }

    return NextResponse.json({ resume }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
