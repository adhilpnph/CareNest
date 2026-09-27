import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
};

const variants = {
  default: "bg-[#26252b] text-white shadow-[0_1px_2px_rgba(20,20,25,0.14)] hover:bg-[#403b55]",
  outline: "border border-[#e5e4e8] bg-white text-[#39383f] shadow-sm hover:border-[#d4d1dd] hover:bg-[#faf9fc]",
  ghost: "text-[#66646e] hover:bg-[#f2f1f5] hover:text-[#292830]",
  destructive: "text-[#c34242] hover:bg-[#fff1f1]",
} satisfies Record<NonNullable<ButtonProps["variant"]>, string>;

const sizes = {
  default: "h-10 rounded-lg px-4 text-sm",
  sm: "h-8 rounded-md px-3 text-xs",
  lg: "h-11 rounded-lg px-5 text-sm",
  icon: "size-9 rounded-lg",
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
      className={`inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-medium transition-[background,color,border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-px active:translate-y-0 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9585dc] focus-visible:ring-offset-2 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}
