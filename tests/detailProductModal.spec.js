import {test, expect} from "@playwright/test";
import loginAsAdmin from "./helpers/auth";
import ProductDetailModal from "../components/products/productDetailModal";
import ProductsPage from "../pages/productsPage";
import {label, severity, description, tag} from "allure-js-commons";

test.describe("[Gestão de Produtos] Detalhes do Produto", () => {
  let detailModal;
  let productsPage;

  test.beforeEach(async ({page}) => {
    await loginAsAdmin(page);
    detailModal = new ProductDetailModal(page);
    productsPage = new ProductsPage(page);

    await page.waitForURL("**/products");
    await page.locator('[data-testid^="view-details-product-"]').first().waitFor({state: "visible", timeout: 3000});
  });

  test("CT01 - Deve abrir o modal de detalhes do primeiro produto da página", async ({page}) => {
    await severity("normal");
    await tag("ui");
    await productsPage.getFirstViewDetailsButton().click();
    await expect(detailModal.heading).toBeVisible();
    await detailModal.close();
  });

  test("CT02 - Deve abrir o modal de detalhes do último produto da página", async ({page}) => {
    await severity("normal");
    await tag("ui");
    await productsPage.getLastViewDetailsButton().click();
    await expect(detailModal.heading).toBeVisible();
    await detailModal.close();
  });

  test("CT03 - Deve exibir todos os campos no modal de detalhes", async ({page}) => {
    await severity("minor");
    await tag("ui");
    await productsPage.getFirstViewDetailsButton().click();

    await expect(detailModal.heading).toBeVisible();
    await expect(detailModal.fieldId).toBeVisible();
    await expect(detailModal.fieldSku).toBeVisible();
    await expect(detailModal.fieldName).toBeVisible();
    await expect(detailModal.fieldPrice).toBeVisible();
    await expect(detailModal.fieldStock).toBeVisible();
    await expect(detailModal.fieldCategory).toBeVisible();
    await expect(detailModal.fieldSupplier).toBeVisible();
    await expect(detailModal.fieldSlug).toBeVisible();
    await detailModal.close();
  });

  test("CT04 - Deve abrir nova aba ao clicar em Imprimir", async ({page}) => {
    await severity("normal");
    await tag("ui");
    await productsPage.getFirstViewDetailsButton().click();
    await expect(detailModal.heading).toBeVisible();

    const popup = await detailModal.print();
    expect(popup).toBeTruthy();
    await popup.waitForLoadState("load");

    const title = await popup.title();
    expect(title).toContain("QA Automation Shop");

    await popup.screenshot({path: "screenshots/print-product-details-preview.png"});
  });
});
