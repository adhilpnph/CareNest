import type { ReactNode, SVGProps } from "react";

type IconName = "arrow-right" | "arrow-left" | "chevron-right" | "close" | "clock" | "heart" | "shield" | "sparkle" | "stethoscope" | "plus" | "check";

const paths: Record<IconName, ReactNode> = {
  "arrow-right": <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
  "arrow-left": <><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></>,
  "chevron-right": <path d="m9 18 6-6-6-6" />,
  close: <><path d="m18 6-12 12" /><path d="m6 6 12 12" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
  shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
  sparkle: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" /><path d="m19 14 1.1 2.9L23 18l-2.9 1.1L19 22l-1.1-2.9L15 18l2.9-1.1L19 14Z" /></>,
  stethoscope: <><path d="M6 3v5a6 6 0 0 0 12 0V3" /><path d="M6 3H4v3h2" /><path d="M18 3h2v3h-2" /><path d="M12 14v3a4 4 0 0 0 8 0v-1" /><circle cx="20" cy="14" r="2" /></>,
  plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
  check: <path d="m5 12 4 4L19 6" />,
};

export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
