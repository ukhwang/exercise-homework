interface ProgressBarProps {
  value: number; // 0-100
  className?: string;
  color?: "primary" | "success";
}

export function ProgressBar({ value, color = "primary", className = "" }: ProgressBarProps) {
  const colorStyles = {
    primary: "bg-[#004DFF]",
    success: "bg-[#00C853]"
  };

  return (
    <div className={`h-2 bg-[#F0F0F0] rounded-full overflow-hidden ${className}`}>
      <div
        className={`h-full ${colorStyles[color]} transition-all duration-300 ease-out rounded-full`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
