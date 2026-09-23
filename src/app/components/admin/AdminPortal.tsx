"use client";

import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import type { AppDispatch } from "../../store";

export function AdminPortal() {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-5 text-stone-700 sm:px-6 lg:px-8">
      <section className="rounded-[28px] border border-stone-300 bg-white/80 p-8 shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-500">
          Admin portal
        </span>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] text-stone-900">
          CareNest operations
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-stone-600">
          The admin workspace will become the home for hospital operations,
          appointments, doctors, and departments.
        </p>
        <button
          type="button"
          onClick={() => dispatch(logout())}
          className="mt-6 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-800 hover:border-stone-500"
        >
          Sign out
        </button>
      </section>
    </main>
  );
}
