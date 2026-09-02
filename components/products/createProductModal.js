import {expect} from "@playwright/test";

export default class CreateProductModal {
  constructor(page) {
    this.page = page;

    //botões visíveis na página principal/modal
    this.addProductButton = page.getByTestId("add-product-button");
    this.modalHeading = page.getByRole("heading", {name: "Adicionar Produto"});

    this.nameInput = page.getByTestId("add-product-name");
    this.priceInput = page.getByTestId("add-product-price");
    this.stockInput = page.getByTestId("add-product-stock");
    this.skuInput = page.getByTestId("add-product-sku");
    this.categoryDropdown = page.getByTestId("add-product-category");
    this.supplierDropdown = page.getByTestId("add-product-supplier");
    this.submitButton = page.getByTestId("add-product-submit");
    this.cancelButton = page.getByTestId("add-product-cancel");

    // mensagens de erro exibida pelo modal
    this.errorName = page.getByTestId("error-add-product-name");
    this.errorPrice = page.getByTestId("error-add-product-price");
    this.errorStock = page.getByTestId("error-add-product-stock");
    this.errorSku = page.getByTestId("error-add-product-sku");
  }

  // métodos de preenchimento do modal
  async open() {
    await this.addProductButton.click();
    await expect(this.modalHeading).toBeVisible();
  }

  async fillName(value) {
    await this.nameInput.fill(value);
  }

  async fillPrice(value) {
    await this.priceInput.fill(value);
  }

  async fillStock(value) {
    await this.stockInput.fill(value);
  }

  async fillSku(value) {
    await this.skuInput.fill(value);
  }

  /* Seleciona uma categoria no dropdown pelo nome.
    Se name for vazio, sai sem ação; caso contrário abre o dropdown,
    localiza a opção correspondente, verifica que está visível, clica nela
    e confirma que o dropdown exibe o nome selecionado.*/
  async selectCategory(name) {
    if (!name || name.trim() === "") return;

    await this.categoryDropdown.click();
    const option = this.page.locator('[data-testid^="add-product-category-option-"]').filter({hasText: name});

    await expect(option.first()).toBeVisible();
    await option.first().click();
    await expect(this.categoryDropdown).toContainText(name);
  }

  async selectSupplier(name) {
    if (!name || name.trim() === "") return;

    await this.supplierDropdown.click();
    const option = this.page.locator('[data-testid^="add-product-supplier-option-"]').filter({hasText: name});

    await expect(option.first()).toBeVisible();
    await option.first().click();
    await expect(this.supplierDropdown).toContainText(name);
  }

  // ações do modal
  async submit() {
    await this.submitButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  // mensagens exibidas flutuante de erro ou sucesso
  getToast(mensagem) {
    return this.page.getByText(mensagem);
  }

  // acessor para os elementos de erro por campo
  getError(field) {
    switch (field) {
      case "name":
        return this.errorName;
      case "price":
        return this.errorPrice;
      case "stock":
        return this.errorStock;
      case "sku":
        return this.errorSku;
      default:
        throw new Error(`Campo de erro inválido: ${field}`);
    }
  }
}
