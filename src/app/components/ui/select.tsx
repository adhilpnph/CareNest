import type { SelectHTMLAttributes } from "react";

const fieldClass =
  "h-10 w-full rounded-lg border border-[#e6e5e9] bg-white px-3 text-sm text-[#292830] shadow-[0_1px_2px_rgba(24,24,28,0.025)] outline-none transition-[border-color,box-shadow] placeholder:text-[#a19fa8] focus:border-[#a99be5] focus:ring-2 focus:ring-[#9585dc]/15 disabled:cursor-not-allowed disabled:opacity-50";

export function Select({ className = "", ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={`${fieldClass} ${className}`} {...props} />;
}
