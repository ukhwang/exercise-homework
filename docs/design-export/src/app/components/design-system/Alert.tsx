import { ReactNode } from "react";

interface AlertProps {
  children: ReactNode;
  icon?: string;
  variant?: "warning" | "info" | "success";
  className?: string;
}

export function Alert({ children, icon = "⚠️", variant = "warning", className = "" }: AlertProps) {
  const variantStyles = {
    warning: "bg-[#FFEA00] text-[#1A1A1A]",
    info: "bg-[#E0E8F0] text-[#1A1A1A]",
    success: "bg-[#E0EEE0] text-[#1A1A1A]"
  };

  return (
    <div className={`${variantStyles[variant]} rounded-lg p-4 ${className}`}>
      <div className="flex gap-3">
        <span className="text-lg flex-shrink-0">{icon}</span>
        <div className="flex-1 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
