import { Button } from "../ui/button";
import { Icon } from "../ui/IconGlyph";

type HeaderProps = {
  onAdminSignIn: () => void;
};

const navItems = [
  ["Home", "#home"],
  ["Services", "#services"],
  ["Departments", "#departments"],
  ["Contact", "#contact"],
] as const;

export function Header({ onAdminSignIn }: HeaderProps) {
  return (
    <header className="sticky top-3 z-20 mx-auto mb-5 rounded-none border border-[#dfe5e2]/90 bg-white/90 px-3 py-2.5 shadow-[0_8px_30px_rgba(27,45,40,0.055)] backdrop-blur-xl sm:px-4">
      <div className="flex items-center justify-between gap-3">
        <a href="#home" aria-label="CareNest home" className="group flex shrink-0 items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-none bg-[#163c38] text-white shadow-sm transition-transform duration-200 group-hover:scale-[1.04]">
            <Icon name="heart" className="size-[17px]" strokeWidth={1.8} />
          </span>
          <span className="leading-tight">
            <span className="block text-[14px] font-semibold tracking-[-0.035em] text-[#292830]">CareNest</span>
            <span className="mt-0.5 block text-[9px] font-medium uppercase tracking-[0.17em] text-[#9997a1]">Medical center</span>
          </span>
        </a>

        <nav aria-label="Main navigation" className="flex items-center gap-1 overflow-x-auto">
          {navItems.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="shrink-0 rounded-none px-3 py-2 text-[12px] font-medium text-[#687571] transition-colors hover:bg-[#eef3f1] hover:text-[#202a28]"
            >
              {label}
            </a>
          ))}
        </nav>

        <Button onClick={onAdminSignIn} size="sm" className="h-9 px-3.5">
          Admin sign in
          <Icon name="arrow-right" className="size-3.5" />
        </Button>
      </div>
    </header>
  );
}
