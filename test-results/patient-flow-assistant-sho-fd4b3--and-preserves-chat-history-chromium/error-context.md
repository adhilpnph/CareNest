# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: patient-flow.spec.ts >> assistant shows a successful booking and preserves chat history
- Location: e2e\patient-flow.spec.ts:17:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Appointment booked successfully.')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByText('Appointment booked successfully.') with timeout 5000ms
  - waiting for getByText('Appointment booked successfully.')

```

```yaml
- main:
  - link "CareNest home":
    - /url: "#home"
    - text: CareNest Medical center
  - navigation "Main navigation":
    - link "Home":
      - /url: "#home"
    - link "Services":
      - /url: "#services"
    - link "Departments":
      - /url: "#departments"
    - link "Contact":
      - /url: "#contact"
  - button "Admin sign in"
  - text: Thoughtful care, every day
  - heading "We care because we care." [level=1]
  - paragraph: Thoughtful care, modern treatment, and a seamless patient experience built around comfort, clarity, and trust.
  - button "Book appointment"
  - button "Meet our team"
  - text: On-demand care Primary services Preventive checkups Expert clinicians
  - paragraph: Your care, connected
  - paragraph: A little more peace of mind
  - text: 24/7 support
  - paragraph: Care that fits your life
  - heading "Here for the whole picture." [level=2]
  - text: Fast appointments Specialist consults Preventive guidance AS EC NH A team that listens first Our services
  - heading "Simple care, thoughtfully delivered" [level=2]
  - text: Care for every chapter 01
  - heading "Primary care" [level=3]
  - paragraph: Routine visits and continuous support for your everyday health.
  - text: "02"
  - heading "Diagnostics" [level=3]
  - paragraph: Fast, clear testing with patient-first guidance and follow-up.
  - text: "03"
  - heading "Specialist care" [level=3]
  - paragraph: Expert-led support for complex concerns and ongoing treatment.
  - text: Live care directory
  - heading "Meet our departments and doctors" [level=2]
  - heading "Cardiology" [level=3]
  - paragraph: Nice
  - text: Ajmal · JR
  - heading "Ortho" [level=3]
  - paragraph: Bones
  - text: Fasna · JR
  - heading "Pedeatrics" [level=3]
  - paragraph: Children
  - text: John Doe · Pedeatrics Appointments
  - heading "Request a visit" [level=2]
  - paragraph: Choose a clinician and a time that works for you.
  - text: Your name
  - textbox "Your name"
  - text: Email address
  - textbox "Email address":
    - /placeholder: Your email
  - text: Preferred date and time
  - textbox "Preferred date and time"
  - text: Doctor
  - combobox "Doctor":
    - option "Choose a doctor" [disabled] [selected]
    - option "Ajmal · JR"
    - option "Fasna · JR"
    - option "John Doe · Pedeatrics"
  - button "Request appointment"
  - text: Contact
  - heading "Ready to speak with our team?" [level=2]
  - paragraph: Call us
  - strong: +1 (415) 555-0148
  - paragraph: Visit us
  - strong: 18 Willow Avenue, Suite 200
  - paragraph: Hours
  - strong: Mon-Sat · 8:00 AM to 8:00 PM
  - complementary:
    - text: CareNest assistant
    - heading "Plan your visit" [level=2]
    - button "Close assistant"
    - paragraph: Book a visit
    - paragraph: "I'd be happy to help you book an appointment! To proceed, I'll need a few details: 1. **Doctor ID**: Which doctor would you like to see? Please provide their doctor ID number. 2. **Preferred date and time**: When would you like the appointment? Please provide the date and time in ISO 8601 format (e.g., \"2024-01-15T14:30:00\" for January 15, 2024 at 2:30 PM). Once you provide these details, I can check availability and book the appointment for you."
    - textbox "Your name": Pat Lee
    - textbox "Your email": pat@example.com
    - textbox "How can we help?"
    - button "Send"
    - button "Close assistant" [expanded]
- alert
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test("patient can see the live care directory", async ({ page }) => {
  4  |   await page.route("http://localhost:8000/departments", async (route) => {
  5  |     await route.fulfill({ json: [{ id: 1, name: "Cardiology", description: "Heart care" }] });
  6  |   });
  7  |   await page.route("http://localhost:8000/doctors", async (route) => {
  8  |     await route.fulfill({ json: [{ id: 2, name: "Dr. Shah", specialty: "Cardiology", email: "shah@test", department_id: 1 }] });
  9  |   });
  10 | 
  11 |   await page.goto("/");
  12 |   await expect(page.getByText("Meet our departments and doctors")).toBeVisible();
  13 |   await expect(page.getByRole("heading", { name: "Cardiology" })).toBeVisible();
  14 |   await expect(page.locator("span").filter({ hasText: "Dr. Shah" }).first()).toBeVisible();
  15 | });
  16 | 
  17 | test("assistant shows a successful booking and preserves chat history", async ({ page }) => {
  18 |   await page.route("http://localhost:8000/departments", async (route) => {
  19 |     await route.fulfill({ json: [] });
  20 |   });
  21 |   await page.route("http://localhost:8000/doctors", async (route) => {
  22 |     await route.fulfill({ json: [] });
  23 |   });
  24 |   await page.route("http://localhost:8000/assistant/chat", async (route) => {
  25 |     await route.fulfill({
  26 |       json: {
  27 |         reply: "Your appointment is booked.",
  28 |         appointment_update: { success: true, appointment_id: 12, doctor_id: 2, slot_start: "2026-10-01T09:00:00Z", detail: "Appointment booked successfully." },
  29 |         history: [{ role: "user", content: "Book a visit" }, { role: "assistant", content: "Your appointment is booked." }],
  30 |       },
  31 |     });
  32 |   });
  33 | 
  34 |   await page.goto("/");
  35 |   await page.getByRole("button", { name: "Ask CareNest" }).click();
  36 |   const assistant = page.getByRole("complementary");
  37 |   await assistant.getByPlaceholder("Your name").fill("Pat Lee");
  38 |   await assistant.getByPlaceholder("Your email").fill("pat@example.com");
  39 |   await assistant.getByPlaceholder("How can we help?").fill("Book a visit");
  40 |   await assistant.getByRole("button", { name: "Send" }).click();
  41 | 
> 42 |   await expect(page.getByText("Appointment booked successfully.")).toBeVisible();
     |                                                                    ^ Error: expect(locator).toBeVisible() failed
  43 |   await assistant.getByLabel("Close assistant").click();
  44 |   await page.getByRole("button", { name: "Ask CareNest" }).click();
  45 |   await expect(page.getByText("Your appointment is booked.")).toBeVisible();
  46 | });
  47 | 
  48 | test("assistant clearly reports a rejected booking", async ({ page }) => {
  49 |   await page.route("http://localhost:8000/departments", async (route) => {
  50 |     await route.fulfill({ json: [] });
  51 |   });
  52 |   await page.route("http://localhost:8000/doctors", async (route) => {
  53 |     await route.fulfill({ json: [] });
  54 |   });
  55 |   await page.route("http://localhost:8000/assistant/chat", async (route) => {
  56 |     await route.fulfill({
  57 |       json: {
  58 |         reply: "That time is no longer available.",
  59 |         appointment_update: { success: false, appointment_id: null, doctor_id: 2, slot_start: "2026-10-01T09:00:00Z", detail: "That slot is no longer available." },
  60 |         history: [{ role: "user", content: "Book that slot" }, { role: "assistant", content: "That time is no longer available." }],
  61 |       },
  62 |     });
  63 |   });
  64 | 
  65 |   await page.goto("/");
  66 |   await page.getByRole("button", { name: "Ask CareNest" }).click();
  67 |   const assistant = page.getByRole("complementary");
  68 |   await assistant.getByPlaceholder("Your name").fill("Pat Lee");
  69 |   await assistant.getByPlaceholder("Your email").fill("pat@example.com");
  70 |   await assistant.getByPlaceholder("How can we help?").fill("Book that slot");
  71 |   await assistant.getByRole("button", { name: "Send" }).click();
  72 | 
  73 |   await expect(assistant.getByRole("alert")).toContainText("Booking not completed");
  74 | });
  75 | 
```