import {test, expect} from "@playwright/test";
import {severity, tag} from "allure-js-commons";
import loginAsAdmin from "./helpers/auth";
import CreateProductModal from "../components/products/createProductModal";
import dados from "../fixtures/products-data.json";
import ProductsPage from "../pages/productsPage";
import {faker} from "@faker-js/faker/locale/pt_BR";

test.describe("Cadastro de Produto", () => {
  let modal;

  test.beforeEach(async ({page}) => {
    await loginAsAdmin(page);
    modal = new CreateProductModal(page);
    await modal.open();
  });

  test.describe("Cadastro de Produto no Catálogo", () => {
    test("CT01 - Deve exibir erro quando o nome do produto não for informado", async () => {
      await severity("normal");
      await tag("ui");

      const cenario = dados.nomeObrigatorio;

      await modal.fillName(cenario.dados.name);
      await modal.submit();
      await expect(modal.getError("name")).toBeVisible();
      await expect(modal.getError("name")).toHaveText(cenario.esperado.mensagem);
    });
    test("CT02 - Deve exibir erro quando o nome do produto for muito curto", async () => {
      await severity("normal");
      await tag("ui");

      const cenario = dados.nomeMuitoCurto;

      await modal.fillName(cenario.dados.name);
      await modal.submit();
      await expect(modal.getError("name")).toBeVisible();
      await expect(modal.getError("name")).toHaveText(cenario.esperado.mensagem);
    });
    test("CT03 - Deve exibir erro quando o nome do produto exceder o tamanho máximo permitido", async () => {
      await severity("normal");
      await tag("ui");

      const cenario = dados.nomeMuitoLongo;

      await modal.fillName(cenario.dados.name);
      await modal.submit();
      await expect(modal.getError("name")).toBeVisible();
      await expect(modal.getError("name")).toHaveText(cenario.esperado.mensagem);
    });
    test("CT04 - Deve exibir erro quando o nome do produto contiver números", async () => {
      await severity("normal");
      await tag("ui");

      const cenario = dados.nomeComNumeros;

      await modal.fillName(cenario.dados.name);
      await modal.submit();
      await expect(modal.getError("name")).toBeVisible();
      await expect(modal.getError("name")).toHaveText(cenario.esperado.mensagem);
    });
    test("CT05 - Deve exibir erro quando o nome do produto contiver caracteres especiais", async () => {
      await severity("normal");
      await tag("ui");

      const cenario = dados.nomeComCaracteresEspeciais;

      await modal.fillName(cenario.dados.name);
      await modal.submit();
      await expect(modal.getError("name")).toBeVisible();
      await expect(modal.getError("name")).toHaveText(cenario.esperado.mensagem);
    });
    test("CT06 - Deve exibir erro quando o nome do produto contiver espaços duplicados", async () => {
      await severity("normal");
      await tag("ui");

      const cenario = dados.nomeComEspacosDuplicados;

      await modal.fillName(cenario.dados.name);
      await modal.submit();
      await expect(modal.getError("name")).toBeVisible();
      await expect(modal.getError("name")).toHaveText(cenario.esperado.mensagem);
    });
  });

  test.describe("Validações de Precificação", () => {
    test("CT07 - CT07 - Deve exibir erro quando o preço não for informado", async () => {
      await severity("normal");
      await tag("ui");

      const cenario = dados.precoObrigatorio;

      await modal.fillPrice(cenario.dados.price);
      await modal.submit();
      await expect(modal.getError("price")).toBeVisible();
      await expect(modal.getError("price")).toHaveText(cenario.esperado.mensagem);
    });
    test("CT08 - Deve exibir erro quando o preço informado não for um valor positivo", async () => {
      await severity("normal");
      await tag("ui");

      const cenario = dados.precoInvalido;

      await modal.fillPrice(cenario.dados.price);
      await modal.submit();
      await expect(modal.getError("price")).toBeVisible();
      await expect(modal.getError("price")).toHaveText(cenario.esperado.mensagem);
    });
  });

  test.describe("Validações de Controle de Estoque", () => {
    test("CT09 - Deve exibir erro quando a quantidade em estoque não for informada", async () => {
      await severity("normal");
      await tag("ui");

      const cenario = dados.estoqueObrigatorio;

      await modal.fillStock(cenario.dados.stock);
      await modal.submit();
      await expect(modal.getError("stock")).toBeVisible();
      await expect(modal.getError("stock")).toHaveText(cenario.esperado.mensagem);
    });
    test("CT10 - Deve exibir erro quando a quantidade em estoque estiver fora do intervalo permitido", async () => {
      await severity("normal");
      await tag("ui");

      const cenario = dados.estoqueInvalido;

      await modal.fillStock(cenario.dados.stock);
      await modal.submit();
      await expect(modal.getError("stock")).toBeVisible();
      await expect(modal.getError("stock")).toHaveText(cenario.esperado.mensagem);
    });
  });

  test.describe("Validações de Identificação por SKU", () => {
    test("CT11 - Deve exibir erro quando o SKU não for informado", async () => {
      await severity("normal");
      await tag("ui");

      const cenario = dados.skuObrigatorio;

      await modal.fillSku(cenario.dados.sku);
      await modal.submit();
      await expect(modal.getError("sku")).toBeVisible();
      await expect(modal.getError("sku")).toHaveText(cenario.esperado.mensagem);
    });
    test("CT12 - Deve exibir erro quando o SKU tiver tamanho fora do intervalo permitido", async () => {
      await severity("normal");
      await tag("ui");

      const cenario = dados.skuTamanhoInvalido;

      await modal.fillSku(cenario.dados.sku);
      await modal.submit();
      await expect(modal.getError("sku")).toBeVisible();
      await expect(modal.getError("sku")).toHaveText(cenario.esperado.mensagem);
    });
    test("CT13 - Deve exibir erro quando o SKU contiver caracteres fora do padrão permitido", async () => {
      await severity("normal");
      await tag("ui");

      const cenario = dados.skuFormatoInvalido;

      await modal.fillSku(cenario.dados.sku);
      await modal.submit();
      await expect(modal.getError("sku")).toBeVisible();
      await expect(modal.getError("sku")).toHaveText(cenario.esperado.mensagem);
    });
    test("CT14 - Deve exibir erro quando o SKU não iniciar com uma letra maiúscula", async () => {
      await severity("normal");
      await tag("ui");

      const cenario = dados.skuNaoComecaComLetra;

      await modal.fillSku(cenario.dados.sku);
      await modal.submit();
      await expect(modal.getError("sku")).toBeVisible();
      await expect(modal.getError("sku")).toHaveText(cenario.esperado.mensagem);
    });
  });

  test.describe("Validações de Classificação do Produto", () => {
    test("CT15 - Deve sinalizar obrigatoriedade quando nenhuma categoria for selecionada", async () => {
      await severity("normal");
      await tag("ui");

      const cenario = dados.categoriaObrigatoria;

      await modal.fillName(cenario.dados.name);
      await modal.fillPrice(cenario.dados.price);
      await modal.fillStock(cenario.dados.stock);
      await modal.fillSku(cenario.dados.sku);
      await modal.selectCategory(cenario.dados.category);
      await modal.submit();
      const toastErro = modal.getToast(cenario.esperado.mensagem);
      await expect(toastErro).toBeVisible();
    });
    test("CT16 - Deve sinalizar obrigatoriedade quando nenhum fornecedor for selecionado", async () => {
      await severity("normal");
      await tag("ui");

      const cenario = dados.fornecedorObrigatorio;

      await modal.fillName(cenario.dados.name);
      await modal.fillPrice(cenario.dados.price);
      await modal.fillStock(cenario.dados.stock);
      await modal.fillSku(cenario.dados.sku);
      await modal.selectCategory(cenario.dados.category);
      await modal.selectSupplier(cenario.dados.supplier);
      await modal.submit();
      const toastErro = modal.getToast(cenario.esperado.mensagem);
      await expect(toastErro).toBeVisible();
    });
  });

  test.describe("Fluxo de Cadastro Bem-Sucedido", () => {
    test("CT17 - Deve cadastrar o produto com sucesso e disponibilizá-lo no catálogo", async () => {
      await severity("critical");
      await tag("ui");

      const cenario = dados.valido;

      const nomeProduto = faker.commerce
        .productName()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^A-Za-z\s]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/^./, (letra) => letra.toUpperCase());
      const skuProduto = `${faker.string.alpha(1).toUpperCase()}${faker.string.alphanumeric(7).toUpperCase()}`;

      // await modal.fillName(cenario.dados.name);
      // await modal.fillSku(cenario.dados.sku);
      // uso do faker para geração aleatória
      await modal.fillName(nomeProduto);
      await modal.fillSku(skuProduto);

      await modal.fillPrice(cenario.dados.price);
      await modal.fillStock(cenario.dados.stock);
      await modal.selectCategory(cenario.dados.category);
      await modal.selectSupplier(cenario.dados.supplier);
      await modal.submit();
      const toastSucesso = modal.getToast(cenario.esperado.mensagem);
      await expect(toastSucesso).toBeVisible();
    });
  });

  test.describe("[Gestão de Produtos] Elementos da Tela de Produtos", () => {
    test.beforeEach(async ({page}) => {
      await page.goto("/products");
    });
    test("CT18 - Deve exibir os filtros de busca", async ({page}) => {
      await severity("minor");
      await tag("ui");

      const productsPage = new ProductsPage(page);
      await expect(productsPage.productSearchInput).toBeVisible();
      await expect(productsPage.categoryFilterSelect).toBeVisible();
      await expect(productsPage.supplierFilterSelect).toBeVisible();
    });
    test("CT19 - Deve exibir ação de edição disponível para o produto", async ({page}) => {
      await severity("minor");
      await tag("ui");

      const productsPage = new ProductsPage(page);
      await expect(productsPage.getFirstEditButton()).toBeVisible();
    });
    test("CT20 - Deve exibir ação de exclusão disponível para o produto", async ({page}) => {
      await severity("minor");
      await tag("ui");

      const productsPage = new ProductsPage(page);
      await expect(productsPage.getFirstDeleteButton()).toBeVisible();
    });
    test("CT21 - Deve exibir ação de visualização de detalhes do produto", async ({page}) => {
      await severity("minor");
      await tag("ui");

      const productsPage = new ProductsPage(page);
      await expect(productsPage.getFirstViewDetailsButton()).toBeVisible();
    });
    test("CT22 - Deve exibir controles de paginação", async ({page}) => {
      await severity("minor");
      await tag("ui");

      const productsPage = new ProductsPage(page);
      await expect(productsPage.productsCount).toBeVisible();
      await expect(productsPage.currentPage).toBeVisible();
      await expect(productsPage.nextPageButton).toBeVisible();
    });
  });
});
