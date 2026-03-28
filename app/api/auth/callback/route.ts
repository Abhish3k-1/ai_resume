import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Create or update the user's profile in the public.profiles table
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
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
        );
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Redirect to home on error
  return NextResponse.redirect(`${origin}/?error=auth_failed`);
}
