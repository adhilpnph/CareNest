"use client";

import { useEffect, useState } from "react";
import {
  type AssistantMessage,
  useAssistantChatMutation,
} from "../../store/careNestApi";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Icon } from "../ui/IconGlyph";

const storageKey = "carenest-assistant-history";

export function AssistantSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
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
    alternatives: Array<{ display: string; local_date: string; local_time: string }>;
  } | null>(null);
  const [sendMessage, result] = useAssistantChatMutation();

  useEffect(() => {
    window.sessionStorage.setItem(storageKey, JSON.stringify(history));
  }, [history]);

  const submitMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    setLastUpdate(null);
    try {
      const response = await sendMessage({
        message: trimmedMessage,
        history,
      }).unwrap();
      setHistory(response.history);
      setLastUpdate({
        success: response.appointment_update?.success ?? false,
        detail: response.appointment_update?.detail ?? "",
        alternatives: response.appointment_update?.alternatives ?? [],
      });
      setMessage("");
    } catch {
      setLastUpdate({
        success: false,
        detail: "The assistant is unavailable right now. Please try again.",
        alternatives: [],
      });
    }
  };

  return (
    <aside className="fixed bottom-4 right-4 z-30 w-[min(23rem,calc(100vw-2rem))] sm:bottom-6 sm:right-6">
      {isOpen && (
        <Card className="animate-rise mb-3 overflow-hidden border-[#e5e2eb] shadow-[0_18px_60px_rgba(34,31,48,0.16)]">
          <div className="flex items-start justify-between gap-3 border-b border-[#efedf2] bg-gradient-to-r from-[#faf9fd] to-white px-4 py-4">
            <div className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-lg bg-[#292730] text-white">
                <Icon name="sparkle" className="size-4" />
              </span>
              <div>
                <Badge variant="accent" className="px-2 py-1 uppercase tracking-[0.1em]">CareNest assistant</Badge>
                <h2 className="mt-1 text-[15px] font-semibold tracking-[-0.03em] text-[#302f36]">Plan your visit</h2>
              </div>
            </div>
            <Button type="button" variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close assistant" className="-mr-1 -mt-1 size-8">
              <Icon name="close" className="size-4" />
            </Button>
          </div>

          <div aria-live="polite" className="max-h-48 space-y-2 overflow-y-auto bg-[#fcfbfd] p-4 text-[13px]">
            {history.length === 0 && (
              <p className="rounded-lg border border-dashed border-[#e9e6ef] bg-white p-3 leading-5 text-[#85828d]">
                Ask about an appointment or our care services.
              </p>
            )}
            {history.map((item, index) => (
              <p key={`${item.role}-${index}`} className={`max-w-[88%] whitespace-pre-line rounded-xl px-3 py-2.5 leading-5 ${item.role === "user" ? "ml-auto bg-[#302e38] text-white" : "border border-[#eeecf1] bg-white text-[#62606b]"}`}>
                {item.content}
              </p>
            ))}
          </div>

          <form onSubmit={submitMessage} className="grid gap-2 p-4">
            <div className="flex gap-2">
              <Input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Ask about an appointment..." required />
              <Button type="submit" size="icon" disabled={result.isLoading} aria-label={result.isLoading ? "Sending message" : "Send"}>
                {result.isLoading ? <span className="size-4 animate-spin rounded-full border-2 border-white/35 border-t-white" /> : <Icon name="arrow-right" className="size-4" />}
              </Button>
            </div>
          </form>
          {lastUpdate && !lastUpdate.success && (
            <div className="px-4 pb-3">
              <p role="alert" className="text-xs text-[#b74b4b]">Booking not completed: {lastUpdate.detail}</p>
              {lastUpdate.alternatives.length > 0 && (
                <div className="mt-2">
                  <p className="mb-1.5 text-[11px] font-medium text-[#67656f]">Available times:</p>
                  <div className="space-y-1">
                    {lastUpdate.alternatives.map((alt, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setMessage(`Book ${alt.local_date} at ${alt.local_time}`)}
                        className="block w-full rounded-lg border border-[#e8e4f0] bg-white px-2.5 py-1.5 text-left text-[11px] text-[#62606b] transition-colors hover:border-[#c5bedd] hover:bg-[#f8f6fc]"
                      >
                        {alt.display}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          {lastUpdate?.success && <p role="status" className="px-4 pb-3 text-xs text-[#3b8057]">{lastUpdate.detail}</p>}
          {result.isError && <p role="alert" className="px-4 pb-3 text-xs text-[#b74b4b]">The assistant could not respond.</p>}
        </Card>
      )}
      <Button type="button" onClick={() => setIsOpen((open) => !open)} aria-expanded={isOpen} className="ml-auto h-11 rounded-full px-4 shadow-[0_8px_22px_rgba(34,31,48,0.18)]">
        <Icon name="sparkle" className="size-4" />
        {isOpen ? "Close assistant" : "Ask CareNest"}
      </Button>
    </aside>
  );
}
