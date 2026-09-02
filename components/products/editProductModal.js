import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://northwind-test-platform.vercel.app/products");
  await page.getByTestId("edit-product-203").click();
  await expect(
    page.getByRole("heading", { name: "Editar Produto" }),
  ).toBeVisible();
  await page.getByText("Nome *").click();
  await page.getByTestId("edit-product-name").click();
  await page.getByText("Preço (R$) *").click();
  await page.getByText("Preço (R$) *").click();
  await page.getByText("Estoque *").click();
  await page.getByTestId("edit-product-stock").click();
  await page.getByText("SKU *").click();
  await page.getByTestId("edit-product-sku").click();
  await page.getByText("Categoria *").click();
  await page.getByTestId("edit-product-category").click();
  await expect(
    page.getByTestId("edit-product-category-option-1347"),
  ).toBeVisible();
  await page.getByTestId("edit-product-category-option-1223").click();
  await page.getByText("Fornecedor *").click();
  await page.getByTestId("edit-product-supplier").click();
  await expect(
    page.getByTestId("edit-product-supplier-option-1450"),
  ).toBeVisible();
  await page.getByTestId("edit-product-supplier-option-1543").click();
  await page.getByTestId("edit-product-submit").click();
  await expect(page.getByTestId("product-row-203")).toBeVisible();
  await page.getByTestId("edit-product-cancel").click();
});
