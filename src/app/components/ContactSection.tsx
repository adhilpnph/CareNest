export function ContactSection() {
  return (
    <section id="contact" className="pt-20">
      <div className="mb-7">
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-500">
          Contact
        </span>
        <h2 className="mt-2 text-4xl font-black tracking-[-0.06em] text-stone-900">
          Ready to speak with our team?
        </h2>
      </div>

      <div className="grid gap-4 rounded-[24px] border border-stone-300 bg-white/80 p-6 md:grid-cols-3">
        <div>
          <p className="mb-2 text-sm text-stone-500">Call us</p>
          <strong className="text-lg">+1 (415) 555-0148</strong>
        </div>
        <div>
          <p className="mb-2 text-sm text-stone-500">Visit us</p>
          <strong className="text-lg">18 Willow Avenue, Suite 200</strong>
        </div>
        <div>
          <p className="mb-2 text-sm text-stone-500">Hours</p>
          <strong className="text-lg">Mon-Sat • 8:00 AM to 8:00 PM</strong>
        </div>
      </div>
    </section>
  );
}
