"use client";

import { useEffect, useState, useCallback } from "react";
import type { User, Session, AuthChangeEvent } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { signInWithGoogle, signOut as authSignOut } from "@/lib/auth";

// Global singleton cache to prevent lock contention (AbortError: Lock broken by another request)
let globalUser: User | null | undefined = undefined;
let globalLoading = true;
const listeners = new Set<() => void>();
let isInitialized = false;

function initializeAuth() {
  if (isInitialized) return;
  if (typeof window === "undefined") return;
  isInitialized = true;

  const supabase = createClient();

  // Get initial session instead of getUser to avoid heavy lock contention
  supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
    globalUser = session?.user ?? null;
    globalLoading = false;
    listeners.forEach((listener) => listener());
  });

  // Listen for auth changes
  supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
    globalUser = session?.user ?? null;
    globalLoading = false;
    listeners.forEach((listener) => listener());
  });
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(globalUser ?? null);
  const [loading, setLoading] = useState(globalLoading);

  useEffect(() => {
    initializeAuth();

    // Sync state
    setUser(globalUser ?? null);
    setLoading(globalLoading);

    // Subscribe to global updates
    const listener = () => {
      setUser(globalUser ?? null);
      setLoading(globalLoading);
    };

    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const signIn = useCallback(async () => {
    await signInWithGoogle();
  }, []);

  const signOut = useCallback(async () => {
    await authSignOut();
    globalUser = null;
    listeners.forEach((listener) => listener());
    window.location.href = "/";
  }, []);

  return { user, loading, signIn, signOut };
}
