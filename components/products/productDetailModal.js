import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.getByTestId("view-details-product-223").click();
  await page.getByRole("heading", { name: "Detalhes do Produto" }).click();
  await page.getByText("ID:").click();
  await page.getByTestId("detail-product-id").getByText("223").click();
  await page.getByText("SKU:").click();
  await page.getByText("BSMCHPQM").click();
  await page.getByText("Nome:").click();
  await page
    .getByTestId("detail-product-name")
    .getByText("Frango Lindo de Concreto")
    .click();
  await page.getByText("Preço:").click();
  await page.getByTestId("detail-product-price").getByText("R$ 49.90").click();
  await page.getByText("Estoque:").click();
  await page.getByText("unid.").click();
  await page.getByText("Categoria:").click();
  await page
    .locator("span")
    .filter({ hasText: "Eletrônicos Triplode" })
    .click();
  await page.getByText("Fornecedor:").click();
  await page
    .locator("span")
    .filter({ hasText: "Tech Solutions Ltdarrrrrrr" })
    .click();
  await page.getByText("Slug:").click();
  await page.getByText("frango-lindo-de-concreto").click();
  await page.getByTestId("modal-decrement-qty").click();
  await page.getByTestId("modal-quantity-val").click();
  await page.getByTestId("modal-increment-qty").click();
  const page1Promise = page.waitForEvent("popup");
  await page.getByTestId("product-details-print").click();
  const page1 = await page1Promise;
  await page.getByTestId("product-details-close-btn").click();
  await page.getByTestId("modal-add-to-cart-button").click();
});
