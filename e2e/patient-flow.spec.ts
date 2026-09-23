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
