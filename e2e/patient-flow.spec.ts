import { test, expect } from "@playwright/test";

test("patient can see the live care directory", async ({ page }) => {
  await page.route("http://localhost:8000/departments", async (route) => {
    await route.fulfill({ json: [{ id: 1, name: "Cardiology", description: "Heart care" }] });
  });
  await page.route("http://localhost:8000/doctors", async (route) => {
    await route.fulfill({ json: [{ id: 2, name: "Dr. Shah", specialty: "Cardiology", email: "shah@test", department_id: 1 }] });
  });

  await page.goto("/");
  await expect(page.getByText("Meet our departments and doctors")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Cardiology" })).toBeVisible();
  await expect(page.locator("span").filter({ hasText: "Dr. Shah" }).first()).toBeVisible();
});

test("assistant shows a successful booking and preserves chat history", async ({ page }) => {
  await page.route("http://localhost:8000/departments", async (route) => {
    await route.fulfill({ json: [] });
  });
  await page.route("http://localhost:8000/doctors", async (route) => {
    await route.fulfill({ json: [] });
  });
  await page.route("http://localhost:8000/assistant/chat", async (route) => {
    await route.fulfill({
      json: {
        reply: "Your appointment is booked.",
        appointment_update: { success: true, appointment_id: 12, doctor_id: 2, slot_start: "2026-10-01T09:00:00Z", detail: "Appointment booked successfully." },
        history: [{ role: "user", content: "Book a visit" }, { role: "assistant", content: "Your appointment is booked." }],
      },
    });
  });

  await page.goto("/");
  await page.getByRole("button", { name: "Ask CareNest" }).click();
  const assistant = page.getByRole("complementary");
  await assistant.getByPlaceholder("Your name").fill("Pat Lee");
  await assistant.getByPlaceholder("Your email").fill("pat@example.com");
  await assistant.getByPlaceholder("How can we help?").fill("Book a visit");
  await assistant.getByRole("button", { name: "Send" }).click();

  await expect(page.getByText("Appointment booked successfully.")).toBeVisible();
  await assistant.getByLabel("Close assistant").click();
  await page.getByRole("button", { name: "Ask CareNest" }).click();
  await expect(page.getByText("Your appointment is booked.")).toBeVisible();
});

test("assistant clearly reports a rejected booking", async ({ page }) => {
  await page.route("http://localhost:8000/departments", async (route) => {
    await route.fulfill({ json: [] });
  });
  await page.route("http://localhost:8000/doctors", async (route) => {
    await route.fulfill({ json: [] });
  });
  await page.route("http://localhost:8000/assistant/chat", async (route) => {
    await route.fulfill({
      json: {
        reply: "That time is no longer available.",
        appointment_update: { success: false, appointment_id: null, doctor_id: 2, slot_start: "2026-10-01T09:00:00Z", detail: "That slot is no longer available." },
        history: [{ role: "user", content: "Book that slot" }, { role: "assistant", content: "That time is no longer available." }],
      },
    });
  });

  await page.goto("/");
  await page.getByRole("button", { name: "Ask CareNest" }).click();
  const assistant = page.getByRole("complementary");
  await assistant.getByPlaceholder("Your name").fill("Pat Lee");
  await assistant.getByPlaceholder("Your email").fill("pat@example.com");
  await assistant.getByPlaceholder("How can we help?").fill("Book that slot");
  await assistant.getByRole("button", { name: "Send" }).click();

  await expect(assistant.getByRole("alert")).toContainText("Booking not completed");
});
