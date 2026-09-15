export function Header() {
  return (
    <header className="sticky top-4 z-20 mb-8 flex items-center justify-between rounded-full border border-stone-300/80 bg-white/80 px-5 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.08)] backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-stone-800 text-sm font-bold text-white">
          C
        </div>
        <div>
          <p className="text-sm font-bold">CareNest</p>
          <span className="text-[10px] uppercase tracking-[0.18em] text-stone-500">
            Hospital
          </span>
        </div>
      </div>

      <nav className="hidden gap-6 text-sm md:flex">
        <a href="#home" className="hover:text-black">
          Home
        </a>
        <a href="#services" className="hover:text-black">
          Services
        </a>
        <a href="#departments" className="hover:text-black">
          Departments
        </a>
        <a href="#contact" className="hover:text-black">
          Contact
        </a>
      </nav>

      <button className="rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700">
        Book visit
      </button>
    </header>
  );
}
