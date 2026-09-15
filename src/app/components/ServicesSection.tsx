export function ServicesSection() {
  return (
    <section id="services" className="pt-20">
      <div className="mb-7">
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-500">
          Our services
        </span>
        <h2 className="mt-2 text-4xl font-black tracking-[-0.06em] text-stone-900">
          Simple care, thoughtfully delivered
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <article className="rounded-[24px] border border-stone-300 bg-white/80 p-6">
          <h3 className="mb-2 text-xl font-bold">Primary care</h3>
          <p className="text-sm leading-6 text-stone-600">
            Routine visits and continuous support for your everyday health.
          </p>
        </article>

        <article className="rounded-[24px] border border-stone-300 bg-white/80 p-6">
          <h3 className="mb-2 text-xl font-bold">Diagnostics</h3>
          <p className="text-sm leading-6 text-stone-600">
            Fast, clear testing with patient-first guidance and follow-up.
          </p>
        </article>

        <article className="rounded-[24px] border border-stone-300 bg-white/80 p-6">
          <h3 className="mb-2 text-xl font-bold">Specialist care</h3>
          <p className="text-sm leading-6 text-stone-600">
            Expert-led support for complex concerns and ongoing treatment.
          </p>
        </article>
      </div>
    </section>
  );
}
