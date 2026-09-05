import {test, expect} from "@playwright/test";
import loginAsAdmin from "./helpers/auth";
import DeleteConfirmationDialog from "../components/products/deleteConfirmationDialog";
import dados from "../fixtures/products-data.json";
import ProductsPage from "../pages/productsPage";

test.describe("[Gestão de Produtos] Exclusão de Produtos", () => {
  let dialog;
  let productsPage;

  test.beforeEach(async ({page}) => {
    await loginAsAdmin(page);
    dialog = new DeleteConfirmationDialog(page);
    productsPage = new ProductsPage(page);

    await page.waitForURL("**/products");
    await page.locator('[data-testid^="delete-product-"]').first().waitFor({state: "visible", timeout: 3000});
  });

  test("CT01 - Deve exibir o diálogo de confirmação ao clicar em excluir", async () => {
    await productsPage.clickDeleteLastProduct();

    await expect(dialog.heading).toBeVisible();
    await expect(dialog.bodyText).toBeVisible();
    await expect(dialog.confirmButton).toBeVisible();
    await expect(dialog.cancelButton).toBeVisible();
  });

  test("CT02 - Deve manter o produto quando a exclusão for cancelada", async () => {
    const productName = await productsPage.getLastProductName();

    await productsPage.clickDeleteLastProduct();
    await expect(dialog.heading).toBeVisible();
    await dialog.cancelDeletion();

    const lastProductNameAfterCancel = await productsPage.getLastProductName();
    expect(lastProductNameAfterCancel).toBe(productName);
  });

  test("CT03 - Deve excluir o último produto da página após confirmação", async ({page}) => {
    const productName = await productsPage.getLastProductName();

    await productsPage.clickDeleteLastProduct();
    await expect(dialog.heading).toBeVisible();
    await dialog.confirmDeletion();

    await productsPage.searchProduct(productName);
    await expect(page.getByText(dados.produtoInexistente.esperado.mensagem)).toBeVisible();
  });

  test("CT04 - Deve excluir o primeiro produto da página após confirmação", async ({page}) => {
    const productName = await productsPage.getFirstProductName();

    await productsPage.clickDeleteFirstProduct();
    await expect(dialog.heading).toBeVisible();
    await dialog.confirmDeletion();

    await productsPage.searchProduct(productName);
    await expect(page.getByText(dados.produtoInexistente.esperado.mensagem)).toBeVisible();
  });
});
