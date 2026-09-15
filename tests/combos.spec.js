import {test, expect} from "@playwright/test";
import loginAsAdmin from "../tests/helpers/auth";
import ProductsPage from "../pages/productsPage";
import fornecedores from "../fixtures/combo-fornecedores.json";
import categorias from "../fixtures/combo-categorias.json";
import {severity, tag} from "allure-js-commons";

test.describe("[Gestao de Produtos] Validacao dos Combos", () => {
  let productsPage;

  test.beforeEach(async ({page}) => {
    productsPage = new ProductsPage(page);
    await loginAsAdmin(page);
    await page.waitForURL("**/products");
    await page.locator('[data-testid^="view-details-product-"]').first().waitFor({state: "visible", timeout: 3000});
  });
  test.describe("Fornecedores", () => {
    test("CT-01 - Deve exibir o combo de fornecedores na tela", async () => {
      await severity("normal");
      await tag("combo-fornecedores");

      await expect(productsPage.supplierFilterSelect).toBeVisible();
    });

    test("CT-02 - Deve exibir a opcao padrao Todos os fornecedores", async () => {
      await severity("normal");
      await tag("combo-fornecedores");
      await expect(productsPage.supplierFilterSelect).toHaveValue("");
    });

    test("CT-03 - Deve conter todos os fornecedores esperados no combo", async () => {
      await severity("normal");
      await tag("combo-fornecedores");

      await expect(productsPage.supplierFilterSelect).toBeVisible({timeout: 15000});

      for (const fornecedor of fornecedores.valores) {
        await expect(productsPage.supplierFilterSelect).toContainText(fornecedor.label, {timeout: 15000});
      }
    });

    test("CT-04 - Listar todos os fornecedores no terminal", async () => {
      await severity("normal");
      await tag("combo-fornecedores");

      await expect(productsPage.supplierFilterSelect).toBeVisible({timeout: 15000});

      const options = productsPage.supplierFilterSelect.locator('option:not([value=""])');
      const count = await options.count();

      console.log(`\n— Fornecedores no combo (${count} itens) —`);

      for (let i = 0; i < count; i++) {
        const texto = (await options.nth(i).textContent()).trim();
        console.log(`  ${i + 1}. ${texto}`);
      }
    });
  });

  test.describe("Categorias", () => {
    test("CA-01 - Deve exibir o combo de categorias na tela", async () => {
      await severity("normal");
      await tag("combo-categorias");

      await expect(productsPage.categoryFilterSelect).toBeVisible();
    });

    test("CA-02 - Deve exibir a opcao padrao Todas as categorias", async () => {
      await severity("normal");
      await tag("combo-categorias");

      await expect(productsPage.categoryFilterSelect).toHaveValue("");
    });

    test("CA-03 - Deve conter todas as categorias esperadas no combo", async () => {
      await severity("normal");
      await tag("combo-categorias");

      await expect(productsPage.categoryFilterSelect).toBeVisible({timeout: 15000});

      for (const categoria of categorias.valores) {
        await expect(productsPage.categoryFilterSelect).toContainText(categoria.label, {timeout: 15000});
      }
    });

    test("CA-04 - Listar todas as categorias no terminal", async () => {
      await severity("normal");
      await tag("combo-categorias");

      await expect(productsPage.categoryFilterSelect).toBeVisible({timeout: 15000});

      const options = productsPage.categoryFilterSelect.locator('option:not([value=""])');
      const count = await options.count();

      console.log(`\n— Categorias no combo (${count} itens) —`);

      for (let i = 0; i < count; i++) {
        const texto = (await options.nth(i).textContent()).trim();
        console.log(`  ${i + 1}. ${texto}`);
      }
    });
  });
});
