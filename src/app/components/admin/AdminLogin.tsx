"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { login } from "../../store/authSlice";
import { useLoginMutation } from "../../store/careNestApi";

type AdminLoginProps = {
  onClose: () => void;
};

export function AdminLogin({ onClose }: AdminLoginProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginRequest, loginResult] = useLoginMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    try {
      await loginRequest({ username, password }).unwrap();
      dispatch(login());
      onClose();
    } catch {
      setError("Those admin credentials are not recognised.");
    }
  };

  return (
    <section className="mb-8 rounded-[24px] border border-stone-300 bg-white/90 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-500">
            Admin access
          </span>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.05em] text-stone-900">
            Sign in to CareNest
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close admin sign-in"
          className="grid h-9 w-9 place-items-center rounded-full border border-stone-300 text-xl text-stone-700 hover:border-stone-500"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-stone-700">
          Email
          <input
            type="email"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
            className="rounded-xl border border-stone-300 bg-stone-50 px-3 py-2 font-normal outline-none focus:border-stone-700"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-stone-700">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="rounded-xl border border-stone-300 bg-stone-50 px-3 py-2 font-normal outline-none focus:border-stone-700"
          />
        </label>
        <div className="sm:col-span-2">
          {error && <p className="mb-3 text-sm text-red-700">{error}</p>}
          <button
            type="submit"
            disabled={loginResult.isLoading}
            className="rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white hover:bg-stone-700"
          >
            {loginResult.isLoading ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </form>
    </section>
  );
}
