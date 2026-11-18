import type { HTMLAttributes } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "outline" | "accent" | "success";
};

const variants = {
  default: "border-transparent bg-[#eef1ef] text-[#596661]",
  outline: "border-[#dce3e0] bg-white text-[#596661]",
  accent: "border-[#cce5e1] bg-[#eff8f6] text-[#17665f]",
  success: "border-[#dceee3] bg-[#f1faf4] text-[#3b8057]",
} satisfies Record<NonNullable<BadgeProps["variant"]>, string>;

export function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-none border px-2.5 py-1 text-[11px] font-medium leading-none ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
