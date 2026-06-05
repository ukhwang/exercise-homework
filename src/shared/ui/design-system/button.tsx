"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";

import { cn } from "@/shared/lib/utils";

type BrutalButtonVariant = "primary" | "secondary" | "set";
type BrutalButtonSize = "default" | "large" | "small" | "set";

type BrutalButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: BrutalButtonVariant;
  size?: BrutalButtonSize;
  checked?: boolean;
};

export const BrutalButton = forwardRef<HTMLButtonElement, BrutalButtonProps>(
  (
    {
      variant = "primary",
      size = "default",
      checked = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        data-checked={checked ? "true" : "false"}
        className={cn(
          "inline-flex items-center justify-center border-2 border-black font-bold uppercase",
          variant === "primary" &&
            "bg-primary text-black hover:brightness-95 active:brightness-90",
          variant === "secondary" &&
            "bg-white text-black hover:bg-neutral-100 active:bg-neutral-200",
          variant === "set" &&
            "bg-white text-black data-[checked=true]:bg-primary data-[checked=true]:text-black",
          size === "small" && "h-10 px-4 text-sm",
          size === "default" && "h-12 px-6 text-base",
          size === "large" && "h-14 w-full px-8 text-lg tracking-wide",
          size === "set" && "h-14 min-h-14 w-full text-sm font-black",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

BrutalButton.displayName = "BrutalButton";
