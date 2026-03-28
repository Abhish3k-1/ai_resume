import { createClient } from "@/lib/supabase/client";

/**
 * Sign in with Google OAuth via Supabase.
 * Redirects the user to Google's OAuth consent screen.
 */
export async function signInWithGoogle() {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/api/auth/callback`,
    },
  });

  if (error) {
    console.error("Sign in error:", error.message);
    throw error;
  }
}

/**
 * Sign out the current user.
 */
export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Sign out error:", error.message);
    throw error;
  }
}

/**
 * Get the current session (browser-side).
 */
export async function getSession() {
  const supabase = createClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error("Session error:", error.message);
    return null;
  }

  return session;
}

/**
 * Get the current user (browser-side).
 */
export async function getUser() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) return null;
  return user;
}
