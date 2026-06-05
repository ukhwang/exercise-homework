import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "elevated" | "outlined";
}

export function Card({ children, variant = "default", className = "", ...props }: CardProps) {
  const variantStyles = {
    default: "bg-white border border-[#F0F0F0]",
    elevated: "bg-white shadow-sm",
    outlined: "bg-white border border-[#E5E5E5]"
  };

  return (
    <div
      className={`rounded-lg p-4 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
