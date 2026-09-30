import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Icon } from "../ui/IconGlyph";

const contactDetails = [
  { label: "Call us", value: "+1 (415) 555-0148", icon: "clock" as const },
  { label: "Visit us", value: "18 Willow Avenue, Suite 200", icon: "arrow-right" as const },
  { label: "Hours", value: "Mon-Sat · 8:00 AM to 8:00 PM", icon: "clock" as const },
];

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-28 pb-10 pt-14 sm:pt-20">
      <div className="mb-6">
        <Badge variant="outline" className="mb-3 uppercase tracking-[0.12em]">Contact</Badge>
        <h2 className="text-3xl font-semibold tracking-[-0.055em] text-[#292830] sm:text-[40px]">
          Ready to speak with our team?
        </h2>
      </div>

      <Card className="grid divide-y divide-[#efedf2] overflow-hidden md:grid-cols-3 md:divide-x md:divide-y-0">
        {contactDetails.map((detail) => (
          <div key={detail.label} className="group flex items-start gap-3.5 p-5 sm:p-6">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-[#eeecf2] bg-[#faf9fc] text-[#7969bd] transition-colors group-hover:border-[#e4dff2] group-hover:bg-[#f6f3fc]">
              <Icon name={detail.icon} className="size-4" />
            </span>
            <div>
              <p className="text-[11px] font-medium text-[#96939e]">{detail.label}</p>
              <strong className="mt-1.5 block text-[14px] font-semibold tracking-[-0.02em] text-[#39383f]">{detail.value}</strong>
            </div>
          </div>
        ))}
      </Card>
    </section>
  );
}
