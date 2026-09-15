type HeroSectionProps = {
  highlights: string[];
};

export function HeroSection({ highlights }: HeroSectionProps) {
  return (
    <section id="home" className="grid items-center gap-8 py-10 md:grid-cols-2">
      <div className="space-y-6">
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-500">
          Modern family care
        </span>

        <h1 className="max-w-xl text-5xl font-black leading-none tracking-[-0.08em] text-stone-900 sm:text-6xl">
          We care because we care
        </h1>

        <p className="max-w-lg text-base leading-7 text-stone-600">
          Thoughtful care, modern treatment, and a seamless patient experience
          built around comfort, clarity, and trust.
        </p>

        <div className="flex flex-wrap gap-3">
          <button className="rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white hover:bg-stone-700">
            Book appointment
          </button>
          <button className="rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-stone-800 hover:border-stone-400">
            Meet our team
          </button>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {highlights.map((item) => (
            <span
              key={item}
              className="rounded-full border border-stone-300 bg-white/80 px-3 py-2 text-xs text-stone-600"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-md rounded-[28px] border border-stone-300 bg-gradient-to-br from-white to-stone-100 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
          <span className="inline-flex rounded-full border border-stone-300 bg-stone-100 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-stone-600">
            24/7 Support
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-[-0.06em] text-stone-900">
            Trusted by families
          </h2>

          <ul className="mt-5 space-y-3 text-sm text-stone-600">
            <li>• Fast appointments</li>
            <li>• Specialist consults</li>
            <li>• Preventive guidance</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
