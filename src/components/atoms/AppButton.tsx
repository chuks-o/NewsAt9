import React from 'react'
import { cn } from "~/services/utilities";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const AppButton: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  className,
  children,
  ...props
}) => {
  const baseStyles = "flex items-center justify-center font-medium cursor-pointer rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
  };

  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : children}
    </button>
  );
};
