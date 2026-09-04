import {test, expect} from "@playwright/test";
import loginAsAdmin from "./helpers/auth";
import EditProductModal from "../components/products/editProductModal";
import dados from "../fixtures/products-data.json";
import ProductsPage from "../pages/productsPage";

test.describe("[Gestão de Produtos] Edição de Produtos", () => {
  let modal;
  let productsPage;

  test.beforeEach(async ({page}) => {
    await loginAsAdmin(page);
    modal = new EditProductModal(page);
    productsPage = new ProductsPage(page);

    await page.waitForURL("**/products");
    await page.locator('[data-testid^="edit-product-"]').first().waitFor({state: "visible", timeout: 3000});
  });

  test.describe("Edição de Produto - Validações de Campos Obrigatórios", () => {
    test.beforeEach(async () => {
      await productsPage.editFirstProduct();
      await expect(modal.modalHeading).toBeVisible();
    });

    test("CT01 - Deve exibir erro quando o nome do produto estiver vazio na edição", async () => {
      const cenario = dados.edicaoNomeObrigatorio;

      await modal.fillName(cenario.dados.name);
      await modal.save();
      await expect(modal.getError("name")).toBeVisible();
      await expect(modal.getError("name")).toHaveText(cenario.esperado.mensagem);
    });

    test("CT02 - Deve exibir erro quando o preço do produto estiver vazio na edição", async () => {
      const cenario = dados.edicaoPrecoObrigatorio;

      await modal.fillPrice(cenario.dados.price);
      await modal.save();
      await expect(modal.getError("price")).toBeVisible();
      await expect(modal.getError("price")).toHaveText(cenario.esperado.mensagem);
    });

    test("CT03 - Deve exibir erro quando o estoque do produto estiver vazio na edição", async () => {
      const cenario = dados.edicaoEstoqueObrigatorio;

      await modal.fillStock(cenario.dados.stock);
      await modal.save();
      await expect(modal.getError("stock")).toBeVisible();
      await expect(modal.getError("stock")).toHaveText(cenario.esperado.mensagem);
    });

    test("CT04 - Deve exibir erro quando o SKU do produto estiver vazio na edição", async () => {
      const cenario = dados.edicaoSkuObrigatorio;

      await modal.fillSku(cenario.dados.sku);
      await modal.save();
      await expect(modal.getError("sku")).toBeVisible();
      await expect(modal.getError("sku")).toHaveText(cenario.esperado.mensagem);
    });
  });

  test.describe("Edição de Produto - Regras de Existência", () => {
    test("CT05 - Não deve exibir botão de editar quando o produto não existir", async ({page}) => {
      const nomeFake = dados.produtoInexistente.nome;
      const row = productsPage.getProductRowByName(nomeFake);

      await productsPage.productSearchInput.fill(nomeFake);
      await expect(row).toHaveCount(0);
      await page.waitForTimeout(500);
      await page.screenshot({path: "test-results/screenshots/CT05-produto-inexistente.png"});
    });

    test("CT06 - Deve exibir mensagem de produto não encontrado ao buscar nome inexistente", async ({page}) => {
      const nomeFake = dados.produtoInexistente.nome;

      await productsPage.productSearchInput.fill(nomeFake);
      await expect(page.getByText(dados.produtoInexistente.esperado.mensagem)).toBeVisible();
    });
  });

  test.describe("Edição de Produto - Edição com Fluxos de Sucesso", () => {
    test("CT07 - Deve atualizar as informações do produto quando ele já estiver cadastrado", async ({page}) => {
      const cenario = dados.produtoParaEdicao;

      await productsPage.editFirstProduct();
      await expect(modal.modalHeading).toBeVisible();

      await modal.fillName(cenario.dadosEdicao.novoNome);
      await modal.fillPrice(cenario.dadosEdicao.novoPreco);
      await modal.save();
      await expect(modal.getToast(cenario.esperado.mensagem)).toBeVisible();

      const row = productsPage.getProductRowByName(cenario.dadosEdicao.novoNome);
      await expect(row.first()).toContainText(cenario.dadosEdicao.novoNome);
    });
  });
});
