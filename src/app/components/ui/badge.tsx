import type { HTMLAttributes } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "outline" | "accent" | "success";
};

const variants = {
  default: "border-transparent bg-[#f2f1f4] text-[#66646e]",
  outline: "border-[#e8e7eb] bg-white text-[#6e6c76]",
  accent: "border-[#e7e1fa] bg-[#f5f2ff] text-[#6d59b5]",
  success: "border-[#dceee3] bg-[#f1faf4] text-[#3b8057]",
} satisfies Record<NonNullable<BadgeProps["variant"]>, string>;

export function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium leading-none ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
