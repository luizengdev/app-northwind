import {test, expect} from "@playwright/test";
import fs from "fs";
import Papa from "papaparse";
import {severity, tag} from "allure-js-commons";
import loginAsAdmin from "./helpers/auth";
import dados from "../fixtures/products-data.json";
import CreateProductModal from "../components/products/createProductModal";

const csvFile = fs.readFileSync("fixtures/product-mass.csv", "utf-8");
const {data: produtos} = Papa.parse(csvFile, {
  header: true,
  skipEmptyLines: true,
});

test.describe("Cadastro do Produto em Massa via CSV", () => {
  let modal;

  test.beforeEach(async ({page}) => {
    await loginAsAdmin(page);
    modal = new CreateProductModal(page);

    await page.waitForURL("**/products");
    await page.locator('[data-testid^="edit-product-"]').first().waitFor({state: "visible", timeout: 3000});
  });

  test("Deve cadastrar os produtos em massa via CSV", async ({page}) => {
    await severity("critical");
    await tag("massProductCsv");

    const cenario = dados.valido;

    for (const produto of produtos) {
      console.log(`Cadastrando: ${produto.name}`);
      await modal.open();

      await modal.fillName(produto.name);
      await modal.fillSku(produto.sku);
      await modal.fillPrice(produto.price);
      await modal.fillStock(produto.stock);
      await modal.selectCategory(produto.category);
      await modal.selectSupplier(produto.supplier);

      await modal.submit();
      await modal.nameInput.waitFor({state: "hidden", timeout: 15000});
      await page.locator("table tbody tr").first().waitFor({state: "visible"});
    }
  });
});
