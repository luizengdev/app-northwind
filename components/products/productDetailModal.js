export default class ProductDetailModal {
  constructor(page) {
    this.page = page;

    this.heading = page.getByRole("heading", {name: "Detalhes do Produto"});
    this.closeButton = page.getByTestId("product-details-close");
    this.cancelButton = page.getByTestId("product-details-close-btn");
    this.printButton = page.getByTestId("product-details-print");

    this.fieldId = page.getByText("ID:");
    this.fieldSku = page.getByText("SKU:");
    this.fieldName = page.getByText("Nome:");
    this.fieldPrice = page.getByText("Preço:");
    this.fieldStock = page.getByText("Estoque:");
    this.fieldCategory = page.getByText("Categoria:");
    this.fieldSupplier = page.getByText("Fornecedor:");
    this.fieldSlug = page.getByText("Slug:");
  }

  async close() {
    await this.closeButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async print() {
    const [popup] = await Promise.all([this.page.waitForEvent("popup"), this.printButton.click()]);
    return popup;
  }
}
