import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Icon } from "../ui/IconGlyph";

const services = [
  {
    number: "01",
    title: "Primary care",
    description: "Routine visits and continuous support for your everyday health.",
    icon: "heart" as const,
  },
  {
    number: "02",
    title: "Diagnostics",
    description: "Fast, clear testing with patient-first guidance and follow-up.",
    icon: "sparkle" as const,
  },
  {
    number: "03",
    title: "Specialist care",
    description: "Expert-led support for complex concerns and ongoing treatment.",
    icon: "stethoscope" as const,
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-28 pt-14 sm:pt-20">
      <div className="mb-7 flex items-end justify-between gap-6">
        <div>
          <Badge variant="outline" className="mb-3 uppercase tracking-[0.12em]">Our services</Badge>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.055em] text-[#292830] sm:text-[40px]">
            Simple care, thoughtfully delivered
          </h2>
        </div>
        <span className="hidden pb-1 text-xs text-[#97949e] sm:block">Care for every chapter</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Card key={service.title} style={{ animationDelay: `${index * 75}ms` }} className="group animate-rise overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#dcd8e8] hover:shadow-[0_12px_30px_rgba(42,37,62,0.06)]">
            <CardContent className="p-5 pt-5 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-xl border border-[#eeecf2] bg-[#faf9fc] text-[#7b6abd] transition-colors group-hover:border-[#e5e0f3] group-hover:bg-[#f5f2fc]">
                  <Icon name={service.icon} className="size-[18px]" />
                </span>
                <span className="font-mono text-[10px] text-[#aaa7b1]">{service.number}</span>
              </div>
              <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.03em] text-[#302f36]">{service.title}</h3>
              <p className="mt-2 max-w-xs text-[13px] leading-6 text-[#85828d]">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
