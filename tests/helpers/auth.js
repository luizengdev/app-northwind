import {expect} from "@playwright/test";

export default async function loginAsAdmin(page) {
  await page.goto("/");
  await page.getByTestId("email-input").fill("admin@qatest.com");
  await page.getByTestId("password-input").fill("Teste@123");
  await page.getByTestId("login-button").click();

  await expect(page.getByRole("heading", {name: "QA Automation Shop"})).toBeVisible();
}
