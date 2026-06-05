import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

type BrutalCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function BrutalCard({ children, className, ...props }: BrutalCardProps) {
  return (
    <div
      className={cn(
        "border-2 border-black bg-white p-4 shadow-none",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
