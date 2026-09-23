import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { PatientApiSection } from "./PatientApiSection";
import { store } from "../../store";

const departments = [{ id: 1, name: "Cardiology", description: "Heart care" }];
const doctors = [{ id: 2, name: "Dr. Shah", specialty: "Cardiology", email: "shah@test", department_id: 1 }];

beforeEach(() => {
  vi.restoreAllMocks();
  vi.stubGlobal("fetch", vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input instanceof Request ? input.url : input.toString();
    const method = init?.method ?? (input instanceof Request ? input.method : "GET");
    if (url.endsWith("/departments")) {
      return Promise.resolve(new Response(JSON.stringify(departments), { status: 200 }));
    }
    if (url.endsWith("/doctors")) {
      return Promise.resolve(new Response(JSON.stringify(doctors), { status: 200 }));
    }
    if (url.endsWith("/appointments") && method === "POST") {
      return Promise.resolve(new Response(JSON.stringify({ id: 3, status: "SCHEDULED" }), { status: 201 }));
    }
    return Promise.resolve(new Response("Not found", { status: 404 }));
  }));
});

describe("PatientApiSection", () => {
  it("renders API-backed directory data and submits an appointment", async () => {
    render(<Provider store={store}><PatientApiSection /></Provider>);

    expect(await screen.findByText("Cardiology")).toBeInTheDocument();
    expect((await screen.findAllByText(/Dr. Shah/)).length).toBeGreaterThan(0);

    fireEvent.change(screen.getByPlaceholderText("Your name"), { target: { value: "Pat Lee" } });
    fireEvent.change(screen.getByPlaceholderText("Your email"), { target: { value: "pat@example.com" } });
    fireEvent.change(screen.getByDisplayValue("Choose a doctor"), { target: { value: "2" } });
    fireEvent.change(document.querySelector('input[type="datetime-local"]') as HTMLInputElement, { target: { value: "2026-10-01T09:00" } });
    fireEvent.click(screen.getByRole("button", { name: "Request appointment" }));

    await waitFor(() => expect(screen.getByText("Your appointment request was received.")).toBeInTheDocument());
    expect((fetch as ReturnType<typeof vi.fn>).mock.calls.some(([request]) =>
      request instanceof Request && request.url.endsWith("/appointments") && request.method === "POST"
    )).toBe(true);
  });
});
