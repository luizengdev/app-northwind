import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://northwind-test-platform.vercel.app/');
  await expect(page.getByRole('heading')).toContainText('QA Automation Shop');
  await page.getByTestId('email-input').click();
  await page.getByTestId('email-input').fill('admin@qatest.com');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('Teste@123');
  await page.getByTestId('login-button').click();
  await expect(page.getByRole('heading')).toContainText('QA Automation Shop');
});
