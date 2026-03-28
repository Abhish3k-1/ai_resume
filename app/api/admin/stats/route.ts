import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const ADMIN_EMAILS = ["absihekdas@gmail.com"];

/**
 * GET /api/admin/stats — Admin dashboard stats
 * Returns all users and resumes (admin only)
 * Uses service_role client to bypass RLS and see all data.
 */
export async function GET() {
  try {
    // Auth check with regular client (respects RLS — correct for auth)
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !ADMIN_EMAILS.includes(user.email ?? "")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Use admin client to bypass RLS and fetch ALL data
    const adminClient = createAdminClient();

    // Fetch all profiles
    const { data: profiles, error: profilesError } = await adminClient
      .from("profiles")
      .select("id, full_name, avatar_url, role, created_at")
      .order("created_at", { ascending: false });

    if (profilesError) {
      console.error("[Admin Stats] Profiles error:", profilesError.message);
    }

    // Fetch all resumes
    const { data: resumes, error: resumesError } = await adminClient
      .from("resumes")
      .select("id, user_id, title, template_id, status, created_at, updated_at")
      .order("updated_at", { ascending: false });

    if (resumesError) {
      console.error("[Admin Stats] Resumes error:", resumesError.message);
    }

    return NextResponse.json({
      profiles: profiles ?? [],
      resumes: resumes ?? [],
      totalUsers: profiles?.length ?? 0,
      totalResumes: resumes?.length ?? 0,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
