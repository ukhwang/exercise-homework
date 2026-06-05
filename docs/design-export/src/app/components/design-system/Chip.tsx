import { HTMLAttributes } from "react";

interface ChipProps extends HTMLAttributes<HTMLButtonElement> {
  label: string;
  sublabel?: string;
  status?: "active" | "pending" | "default";
  selected?: boolean;
  onSelect?: () => void;
  color?: "gray" | "green" | "blue";
}

export function Chip({ label, sublabel, status, selected = false, onSelect, color = "gray", className = "", ...props }: ChipProps) {
  const colorStyles = {
    gray: "bg-[#E5E5E5] text-[#1A1A1A]",
    green: "bg-[#E0EEE0] text-[#1A1A1A]",
    blue: "bg-[#E0E8F0] text-[#1A1A1A]"
  };

  const statusDot = status === "active" ? "bg-[#00C853]" : status === "pending" ? "bg-[#FFEA00]" : "";

  return (
    <button
      onClick={onSelect}
      className={`
        min-w-[120px] px-4 py-3 rounded-lg
        flex flex-col items-start justify-center gap-1
        transition-all
        ${selected ? "bg-[#004DFF] text-white shadow-md scale-[1.02]" : "bg-white text-[#1A1A1A] hover:bg-[#F8F8F8] border border-[#F0F0F0]"}
        ${className}
      `}
      {...props}
    >
      <div className="flex items-center gap-2 w-full">
        {status && <div className={`w-2 h-2 rounded-full ${statusDot}`} />}
        <span className="font-semibold text-sm">{label}</span>
      </div>
      {sublabel && <span className="text-xs opacity-60">{sublabel}</span>}
    </button>
  );
}

interface CueChipProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  color?: "gray" | "green" | "blue";
}

export function CueChip({ label, color = "gray", className = "", ...props }: CueChipProps) {
  const colorStyles = {
    gray: "bg-[#E5E5E5] text-[#1A1A1A]",
    green: "bg-[#E0EEE0] text-[#1A1A1A]",
    blue: "bg-[#E0E8F0] text-[#1A1A1A]"
  };

  return (
    <div
      className={`inline-block px-3 py-1.5 rounded-md text-sm ${colorStyles[color]} ${className}`}
      {...props}
    >
      {label}
    </div>
  );
}
