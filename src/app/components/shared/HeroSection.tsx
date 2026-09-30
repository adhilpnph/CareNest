import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Icon } from "../ui/IconGlyph";

type HeroSectionProps = {
  highlights: string[];
};

const carePoints = ["Fast appointments", "Specialist consults", "Preventive guidance"];

export function HeroSection({ highlights }: HeroSectionProps) {
  return (
    <section id="home" className="relative grid scroll-mt-28 items-center gap-12 pb-16 pt-12 sm:pt-16 lg:min-h-[570px] lg:grid-cols-[1.02fr_.98fr] lg:gap-10 lg:pb-20 lg:pt-10">
      <div className="relative z-10 animate-rise">
        <Badge variant="accent" className="mb-6 gap-2 px-3 py-1.5 text-[10px] uppercase tracking-[0.12em]">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#806bc9] opacity-40" />
            <span className="relative inline-flex size-1.5 rounded-full bg-[#806bc9]" />
          </span>
          Thoughtful care, every day
        </Badge>

        <h1 className="max-w-[660px] text-[clamp(3.25rem,7vw,5.7rem)] font-semibold leading-[0.99] tracking-[-0.075em] text-[#242329]">
          We care because <span className="text-[#8b7bd0]">we care.</span>
        </h1>

        <p className="mt-6 max-w-[470px] text-[15px] leading-7 text-[#77757f] sm:text-base">
          Thoughtful care, modern treatment, and a seamless patient experience built around comfort, clarity, and trust.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href="#appointments" className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#26252b] px-5 text-sm font-medium text-white shadow-[0_1px_2px_rgba(20,20,25,0.14)] transition-[background,color,border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-px hover:bg-[#403b55]">
            Book appointment
            <Icon name="arrow-right" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
          <a href="#departments" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#e5e4e8] bg-white px-5 text-sm font-medium text-[#39383f] shadow-sm transition-[background,color,border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-px hover:border-[#d4d1dd] hover:bg-[#faf9fc]">
            Meet our team
          </a>
        </div>

        <div className="mt-9 flex max-w-[520px] flex-wrap gap-2">
          {highlights.map((item) => (
            <Badge key={item} variant="outline" className="px-3 py-[7px] text-[11px]">
              {item}
            </Badge>
          ))}
        </div>
      </div>

      <div className="relative animate-rise [animation-delay:140ms] lg:pl-3">
        <div aria-hidden="true" className="absolute -inset-7 rounded-[36px] bg-[radial-gradient(ellipse_at_58%_45%,rgba(190,179,238,0.22),transparent_70%)]" />
        <Card className="relative overflow-hidden rounded-2xl border-[#e7e5ec] bg-white/90 p-1.5 shadow-[0_22px_70px_rgba(38,34,60,0.09)]">
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-br from-[#f6f4fc] via-[#f9f8fc] to-white" />
          <div className="relative p-5 sm:p-7">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-lg border border-white bg-white text-[#7969bd] shadow-sm">
                  <Icon name="stethoscope" className="size-[17px]" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-[#3b3942]">Your care, connected</p>
                  <p className="mt-0.5 text-[10px] text-[#96939e]">A little more peace of mind</p>
                </div>
              </div>
              <Badge variant="success" className="gap-1.5 bg-white/80">
                <span className="size-1.5 rounded-full bg-[#58a273]" />
                24/7 support
              </Badge>
            </div>

            <div className="mt-8 rounded-xl border border-[#efedf3] bg-white/90 p-4 shadow-[0_4px_16px_rgba(30,27,42,0.025)] sm:p-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.13em] text-[#9b98a3]">Care that fits your life</p>
              <h2 className="mt-2 text-[25px] font-semibold leading-tight tracking-[-0.045em] text-[#2d2b33] sm:text-[28px]">
                Here for the whole picture.
              </h2>
              <div className="mt-5 space-y-0.5">
                {carePoints.map((point, index) => (
                  <div key={point} className="flex items-center gap-3 rounded-lg px-2 py-3 transition-colors hover:bg-[#faf9fc]">
                    <span className="grid size-7 shrink-0 place-items-center rounded-md bg-[#f3f1f9] text-[#7969bd]">
                      <Icon name={index === 0 ? "clock" : index === 1 ? "heart" : "shield"} className="size-3.5" />
                    </span>
                    <span className="text-[13px] font-medium text-[#57555f]">{point}</span>
                    <Icon name="check" className="ml-auto size-3.5 text-[#8f83c2]" />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-[#f0eef2] px-1 pt-4">
              <div className="flex -space-x-2">
                {["AS", "EC", "NH"].map((initials, index) => (
                  <span key={initials} className={`grid size-8 place-items-center rounded-full border-2 border-white text-[9px] font-semibold ${index === 1 ? "bg-[#e9e6f4] text-[#71649f]" : index === 2 ? "bg-[#f0ece8] text-[#8f7868]" : "bg-[#e8edef] text-[#62777d]"}`}>
                    {initials}
                  </span>
                ))}
              </div>
              <span className="text-[10px] font-medium text-[#96939e]">A team that listens first</span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
