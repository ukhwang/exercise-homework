import { cn } from "@/shared/lib/utils";

type BrutalProgressBarProps = {
  value: number;
  className?: string;
};

export function BrutalProgressBar({ value, className }: BrutalProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      className={cn(
        "h-2 overflow-hidden border-2 border-black bg-white",
        className
      )}
    >
      <div
        className="h-full bg-primary"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
