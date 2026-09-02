import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://northwind-test-platform.vercel.app/");
  await expect(page.getByTestId("product-row-203")).toBeVisible();
  await page.getByTestId("add-product-button").click();
  await page.getByTestId("product-search-input").click();
  await page
    .getByTestId("category-filter-select")
    .selectOption("Brinquedos Educativos");
  await page
    .getByTestId("supplier-filter-select")
    .selectOption("Editora Atlas");
  await page.getByTestId("clear-filters-button").click();
  await expect(page.getByTestId("product-row-203")).toBeVisible();
  await page.getByRole("columnheader", { name: "ID" }).click();
  await page.getByTestId("product-id-203").click();
  await page.getByRole("columnheader", { name: "Nome" }).click();
  await page.getByTestId("product-name-203").click();
  await page.getByRole("columnheader", { name: "Preço" }).click();
  await page.getByTestId("product-price-203").click();
  await page.getByRole("columnheader", { name: "Categoria" }).click();
  await page.getByTestId("product-category-203").click();
  await page.getByRole("columnheader", { name: "Fornecedor" }).click();
  await page.getByTestId("product-supplier-203").click();
  await page.getByRole("columnheader", { name: "Ações" }).click();
  await page.getByTestId("edit-product-203").click();
  await page.getByTestId("delete-product-203").click();
  await page.getByTestId("view-details-product-203").click();
  await page.getByTestId("products-count").click();
  await page.getByTestId("current-page").click();
  await page.getByTestId("next-page-button").click();
});
