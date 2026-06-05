"use client";

import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/shared/lib/utils";

type BrutalChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  sublabel?: string;
  selected?: boolean;
};

export function BrutalChip({
  label,
  sublabel,
  selected = false,
  className,
  ...props
}: BrutalChipProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex min-h-14 min-w-[7rem] shrink-0 flex-col items-start justify-center gap-0.5 border-2 border-black px-4 py-2 text-left",
        selected ? "bg-black text-white" : "bg-white text-black hover:bg-neutral-100",
        className
      )}
      {...props}
    >
      <span className="text-sm font-bold">{label}</span>
      {sublabel ? (
        <span
          className={cn(
            "text-xs font-medium",
            selected ? "text-white/70" : "text-black/50"
          )}
        >
          {sublabel}
        </span>
      ) : null}
    </button>
  );
}
