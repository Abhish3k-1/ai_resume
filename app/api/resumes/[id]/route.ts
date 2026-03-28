import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { updateResumeSchema } from "@/lib/validations/resume";

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/resumes/[id] — Fetch a single resume
 */
export async function GET(_request: Request, context: RouteContext) {
  try {
    const supabase = await createClient();
    const { id } = await context.params;
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: resume, error } = await supabase
      .from("resumes")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (error || !resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    return NextResponse.json({ resume });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * PUT /api/resumes/[id] — Update a resume
 */
export async function PUT(request: Request, context: RouteContext) {
  try {
    const supabase = await createClient();
    const { id } = await context.params;
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = updateResumeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { data: resume, error } = await supabase
      .from("resumes")
      .update(parsed.data)
      .eq("id", id)
      .eq("user_id", user.id)
      .select("id, title, template_id, status, created_at, updated_at")
      .single();

    if (error || !resume) {
      return NextResponse.json(
        { error: "Resume not found or update failed" },
        { status: 404 },
      );
    }

    return NextResponse.json({ resume });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/resumes/[id] — Delete a resume
 */
export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const supabase = await createClient();
    const { id } = await context.params;
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log(`[Delete Resume] User ${user.id} deleting resume ${id}`);

    const { error } = await supabase
      .from("resumes")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      console.error("[Delete Resume] Supabase error:", error.message, error.code, error);
      return NextResponse.json(
        { error: "Failed to delete from database", details: error.message || String(error) },
        { status: 500 },
      );
    }

    console.log(`[Delete Resume] Deletion command executed for ${id}`);
    return NextResponse.json({ success: true, deleted: 1 });
  } catch (err: unknown) {
    console.error("[Delete Resume] Caught Error:", err);
    return NextResponse.json(
      { error: "Internal server error", message: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
