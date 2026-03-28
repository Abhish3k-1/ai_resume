"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type AutoSaveStatus = "idle" | "saving" | "saved";

export function useAutoSave<T>(
  values: T,
  storageKey: string,
  delay = 900,
  onSave?: (v: T) => Promise<void>
) {
  const [status, setStatus] = useState<AutoSaveStatus>("idle");
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const firstPass = useRef(true);

  const serializedValues = useMemo(() => JSON.stringify(values), [values]);

  useEffect(() => {
    if (firstPass.current) {
      firstPass.current = false;
      return;
    }

    const savingTimer = setTimeout(() => {
      setStatus("saving");
    }, 0);

    let clearStatusTimer: ReturnType<typeof setTimeout> | undefined;
    const saveTimer = setTimeout(async () => {
      localStorage.setItem(storageKey, serializedValues);
      if (onSave) {
        try {
          // Parse values back to run standard objects without relying on live value
          await onSave(JSON.parse(serializedValues));
        } catch (err) {
          console.error("AutoSave Callback Error:", err);
        }
      }
      setLastSavedAt(new Date());
      setStatus("saved");
      clearStatusTimer = setTimeout(() => setStatus("idle"), 1400);
    }, delay);

    return () => {
      clearTimeout(savingTimer);
      clearTimeout(saveTimer);
      if (clearStatusTimer) {
        clearTimeout(clearStatusTimer);
      }
    };
  }, [delay, serializedValues, storageKey]);

  return { status, lastSavedAt };
}

