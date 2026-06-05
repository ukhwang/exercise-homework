import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "set";
  size?: "default" | "large" | "small" | "set";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "default", className = "", children, ...props }, ref) => {
    const baseStyles = "rounded-lg font-semibold transition-all";

    const variantStyles = {
      primary: "bg-[#004DFF] text-white hover:bg-[#0041D0] active:bg-[#0038B3] shadow-sm",
      secondary: "bg-[#F8F8F8] text-[#1A1A1A] hover:bg-[#E5E5E5] active:bg-[#D4D4D4]",
      ghost: "bg-transparent text-[#1A1A1A] hover:bg-[#F8F8F8] active:bg-[#E5E5E5]",
      set: "bg-white text-[#1A1A1A] border border-[#E5E5E5] hover:bg-[#F8F8F8] active:bg-[#004DFF] active:text-white data-[checked=true]:bg-[#004DFF] data-[checked=true]:text-white data-[checked=true]:border-[#004DFF]"
    };

    const sizeStyles = {
      small: "h-[36px] px-4 text-sm",
      default: "h-[48px] px-6",
      large: "h-[56px] px-8 text-lg rounded-xl",
      set: "w-[64px] h-[40px] p-0 text-sm rounded-md"
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
