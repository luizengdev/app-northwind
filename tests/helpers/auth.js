import {expect} from "@playwright/test";
import loginData from "../../fixtures/login-data.json";

export default async function loginAsAdmin(page) {
  await page.goto("/");
  await page.getByTestId("email-input").fill(loginData.validUser.email);
  await page.getByTestId("password-input").fill(loginData.validUser.password);
  await page.getByTestId("login-button").click();

  await expect(page.getByRole("heading", {name: "QA Automation Shop"})).toBeVisible();
}
