import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "danger";
  loading?: boolean;
}

export const Button = ({ variant = "primary", loading, children, className, ...props }: ButtonProps) => {
  const base = "px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50";
  const variants = {
    primary: "bg-primary text-white hover:bg-indigo-600",
    ghost: "bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-800",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} disabled={loading} {...props}>
      {loading ? "Loading..." : children}
    </button>
  );
};