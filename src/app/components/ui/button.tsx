import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
};

const variants = {
  default: "bg-[#163c38] text-white shadow-[0_1px_2px_rgba(20,25,24,0.14)] hover:bg-[#20534d]",
  outline: "border border-[#d9e0dd] bg-white text-[#303b38] shadow-sm hover:border-[#aebdb8] hover:bg-[#f5f8f7]",
  ghost: "text-[#596661] hover:bg-[#eef3f1] hover:text-[#202a28]",
  destructive: "text-[#c34242] hover:bg-[#fff1f1]",
} satisfies Record<NonNullable<ButtonProps["variant"]>, string>;

const sizes = {
  default: "h-10 rounded-none px-4 text-sm",
  sm: "h-8 rounded-none px-3 text-xs",
  lg: "h-11 rounded-none px-5 text-sm",
  icon: "size-9 rounded-none",
} satisfies Record<NonNullable<ButtonProps["size"]>, string>;

export function Button({
  className = "",
  variant = "default",
  size = "default",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-medium transition-[background,color,border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-px active:translate-y-0 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] focus-visible:ring-offset-2 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}
