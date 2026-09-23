"use client";

import { useEffect, useState } from "react";
import {
  type AssistantMessage,
  useAssistantChatMutation,
} from "../../store/careNestApi";

const storageKey = "carenest-assistant-history";
const inputClass =
  "rounded-xl border border-stone-300 bg-stone-50 px-3 py-2 text-sm outline-none focus:border-stone-700";

export function AssistantSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [history, setHistory] = useState<AssistantMessage[]>(() => {
    if (typeof window === "undefined") return [];
    const storedHistory = window.sessionStorage.getItem(storageKey);
    if (!storedHistory) return [];
    try {
      return JSON.parse(storedHistory) as AssistantMessage[];
    } catch {
      return [];
    }
  });
  const [lastUpdate, setLastUpdate] = useState<{
    success: boolean;
    detail: string;
  } | null>(null);
  const [sendMessage, result] = useAssistantChatMutation();

  useEffect(() => {
    window.sessionStorage.setItem(storageKey, JSON.stringify(history));
  }, [history]);

  const submitMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage || !patientName.trim() || !patientEmail.trim()) return;

    setLastUpdate(null);
    try {
      const response = await sendMessage({
        message: trimmedMessage,
        history,
        patient_name: patientName.trim(),
        patient_email: patientEmail.trim(),
      }).unwrap();
      setHistory(response.history);
      setLastUpdate(response.appointment_update);
      setMessage("");
    } catch {
      setLastUpdate({
        success: false,
        detail: "The assistant is unavailable right now. Please try again.",
      });
    }
  };

  return (
    <aside className="fixed bottom-5 right-5 z-20 w-[min(22rem,calc(100vw-2rem))]">
      {isOpen && (
        <section className="mb-3 rounded-[24px] border border-stone-300 bg-stone-50 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-500">
                CareNest assistant
              </span>
              <h2 className="mt-1 text-xl font-bold text-stone-900">Plan your visit</h2>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Close assistant" className="text-xl text-stone-600">×</button>
          </div>
          <div className="mb-4 max-h-44 space-y-2 overflow-y-auto text-sm">
            {history.length === 0 && <p className="text-stone-500">Ask about an appointment or our care services.</p>}
            {history.map((item, index) => <p key={`${item.role}-${index}`} className={item.role === "user" ? "text-right text-stone-900" : "text-stone-600"}>{item.content}</p>)}
          </div>
          <form onSubmit={submitMessage} className="grid gap-2">
            <input value={patientName} onChange={(event) => setPatientName(event.target.value)} placeholder="Your name" required className={inputClass} />
            <input value={patientEmail} onChange={(event) => setPatientEmail(event.target.value)} type="email" placeholder="Your email" required className={inputClass} />
            <input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="How can we help?" required className={inputClass} />
            <button type="submit" disabled={result.isLoading} className="rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700">{result.isLoading ? "Thinking..." : "Send"}</button>
          </form>
          {lastUpdate && !lastUpdate.success && <p role="alert" className="mt-3 text-sm text-red-700">Booking not completed: {lastUpdate.detail}</p>}
          {lastUpdate?.success && <p role="status" className="mt-3 text-sm text-green-700">{lastUpdate.detail}</p>}
          {result.isError && <p role="alert" className="mt-3 text-sm text-red-700">The assistant could not respond.</p>}
        </section>
      )}
      <button type="button" onClick={() => setIsOpen((open) => !open)} aria-expanded={isOpen} className="ml-auto block rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white shadow-[0_12px_24px_rgba(0,0,0,0.16)] hover:bg-stone-700">{isOpen ? "Close assistant" : "Ask CareNest"}</button>
    </aside>
  );
}