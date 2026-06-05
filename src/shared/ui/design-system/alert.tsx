import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

type BrutalAlertProps = {
  children: ReactNode;
  icon?: string;
  className?: string;
};

export function BrutalAlert({
  children,
  icon = "⚠️",
  className,
}: BrutalAlertProps) {
  return (
    <div
      className={cn(
        "border-2 border-black bg-alert p-4 text-black",
        className
      )}
    >
      <div className="flex gap-3">
        <span className="shrink-0 text-lg">{icon}</span>
        <div className="flex-1 text-sm font-bold leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
