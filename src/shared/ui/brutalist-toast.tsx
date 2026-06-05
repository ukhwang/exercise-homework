"use client";

import { useEffect } from "react";

import { cn } from "@/shared/lib/utils";

type BrutalistToastProps = {
  message: string;
  visible: boolean;
  onDismiss: () => void;
  durationMs?: number;
};

export function BrutalistToast({
  message,
  visible,
  onDismiss,
  durationMs = 3500,
}: BrutalistToastProps) {
  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(onDismiss, durationMs);
    return () => window.clearTimeout(timer);
  }, [visible, onDismiss, durationMs]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "pointer-events-none fixed left-4 right-4 top-4 z-[100] border-2 border-black bg-black px-4 py-4 text-center text-base font-bold text-white",
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      {message}
    </div>
  );
}
