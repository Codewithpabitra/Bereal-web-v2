import { type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = ({ label, className, ...props }: InputProps) => (
  <div className="flex flex-col gap-1 w-full">
    {label && <label className="text-sm text-gray-400 uppercase tracking-wide">{label}</label>}
    <input
      className={`w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition ${className}`}
      {...props}
    />
  </div>
);