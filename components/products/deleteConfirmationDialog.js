import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.getByTestId("delete-product-203").click();
  await page.getByRole("heading", { name: "Confirmação" }).click();
  await page.getByTestId("confirm-modal-message").click();
  await page.getByTestId("confirm-modal-confirm").click();
  await expect(page.getByTestId("product-row-239")).toBeVisible();
  await page.getByTestId("confirm-modal-cancel").click();
});
