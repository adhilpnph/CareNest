import type { InputHTMLAttributes } from "react";

const fieldClass =
  "h-10 w-full rounded-none border border-[#d9e0dd] bg-white px-3 text-sm text-[#202a28] shadow-[0_1px_2px_rgba(24,30,28,0.025)] outline-none transition-[border-color,box-shadow] placeholder:text-[#8b9792] focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/15 disabled:cursor-not-allowed disabled:opacity-50";

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`${fieldClass} ${className}`} {...props} />;
}
