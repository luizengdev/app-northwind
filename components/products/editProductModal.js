import {expect} from "@playwright/test";

export default class EditProductModal {
  constructor(page) {
    this.page = page;

    this.modalHeading = page.getByRole("heading", {name: "Editar Produto"});

    this.nameInput = page.getByTestId("edit-product-name");
    this.priceInput = page.getByTestId("edit-product-price");
    this.stockInput = page.getByTestId("edit-product-stock");
    this.skuInput = page.getByTestId("edit-product-sku");

    this.categoryDropdown = page.getByTestId("edit-product-category");
    this.supplierDropdown = page.getByTestId("edit-product-supplier");
    this.submitButton = page.getByTestId("edit-product-submit");
    this.cancelButton = page.getByTestId("edit-product-cancel");

    this.errorName = page.getByTestId("error-edit-product-name");
    this.errorPrice = page.getByTestId("error-edit-product-price");
    this.errorStock = page.getByTestId("error-edit-product-stock");
    this.errorSku = page.getByTestId("error-edit-product-sku");
  }

  async open(productId) {
    await this.page.getByTestId(`edit-product-${productId}`).click();
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

  async selectCategory(name) {
    if (!name || name.trim() === "") return;

    await this.categoryDropdown.click();
    const option = this.page.locator('[data-testid^="edit-product-category-option-"]').filter({hasText: name});

    await expect(option.first()).toBeVisible();
    await option.first().click();
    await expect(this.categoryDropdown).toContainText(name);
  }

  async selectSupplier(name) {
    if (!name || name.trim() === "") return;

    await this.supplierDropdown.click();
    const option = this.page.locator('[data-testid^="edit-product-supplier-option-"]').filter({hasText: name});

    await expect(option.first()).toBeVisible();
    await option.first().click();
    await expect(this.supplierDropdown).toContainText(name);
  }

  async save() {
    await this.submitButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getToast(mensagem) {
    return this.page.getByText(mensagem);
  }

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
