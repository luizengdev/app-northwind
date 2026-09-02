export default class ProductsPage {
  constructor(page) {
    this.page = page;

    this.addProductButton = page.getByTestId("add-product-button");
    this.productSearchInput = page.getByTestId("product-search-input");
    this.categoryFilterSelect = page.getByTestId("category-filter-select");
    this.supplierFilterSelect = page.getByTestId("supplier-filter-select");
    this.clearFiltersButton = page.getByTestId("clear-filters-button");
    this.productsCount = page.getByTestId("products-count");
    this.currentPage = page.getByTestId("current-page");
    this.nextPageButton = page.getByTestId("next-page-button");

    this.columnHeaders = {
      id: page.getByRole("columnheader", {name: "ID"}),
      name: page.getByRole("columnheader", {name: "Nome"}),
      price: page.getByRole("columnheader", {name: "Preço"}),
      category: page.getByRole("columnheader", {name: "Categoria"}),
      supplier: page.getByRole("columnheader", {name: "Fornecedor"}),
      actions: page.getByRole("columnheader", {name: "Ações"}),
    };

    this.productRow = (id) => page.getByTestId(`product-row-${id}`);
    this.productCell = {
      id: (id) => page.getByTestId(`product-id-${id}`),
      name: (id) => page.getByTestId(`product-name-${id}`),
      price: (id) => page.getByTestId(`product-price-${id}`),
      category: (id) => page.getByTestId(`product-category-${id}`),
      supplier: (id) => page.getByTestId(`product-supplier-${id}`),
    };
    this.productAction = {
      edit: (id) => page.getByTestId(`edit-product-${id}`),
      delete: (id) => page.getByTestId(`delete-product-${id}`),
      viewDetails: (id) => page.getByTestId(`view-details-product-${id}`),
    };

    this.firstProductRow = page.locator('[data-testid^="product-row-"]').first();
    this.firstEditButton = page.locator('[data-testid^="edit-product-"]').first();
    this.firstDeleteButton = page.locator('[data-testid^="delete-product-"]').first();
    this.firstViewDetailsButton = page.locator('[data-testid^="view-details-product-"]').first();
  }

  async searchProduct(value) {
    await this.productSearchInput.fill(value);
  }

  async filterByCategory(value) {
    await this.categoryFilterSelect.selectOption(value);
  }

  async filterBySupplier(value) {
    await this.supplierFilterSelect.selectOption(value);
  }

  async clearFilters() {
    await this.clearFiltersButton.click();
  }

  async sortBy(column) {
    await this.columnHeaders[column].click();
  }

  async clickProductCell(id, field) {
    await this.productCell[field](id).click();
  }

  async openProductDetails(id) {
    await this.productAction.viewDetails(id).click();
  }

  async openFirstProductDetails() {
    await this.firstViewDetailsButton.click();
  }

  async editProduct(id) {
    await this.productAction.edit(id).click();
  }

  async editFirstProduct() {
    await this.firstEditButton.click();
  }

  async deleteProduct(id) {
    await this.productAction.delete(id).click();
  }

  async deleteFirstProduct() {
    await this.firstDeleteButton.click();
  }

  async clickProductsCount() {
    await this.productsCount.click();
  }

  async clickCurrentPage() {
    await this.currentPage.click();
  }

  async goToNextPage() {
    await this.nextPageButton.click();
  }

  getProductRow(id) {
    return this.productRow(id);
  }

  getFirstProductRow() {
    return this.firstProductRow;
  }

  getFirstEditButton() {
    return this.firstEditButton;
  }

  getFirstDeleteButton() {
    return this.firstDeleteButton;
  }

  getFirstViewDetailsButton() {
    return this.firstViewDetailsButton;
  }

  getProductCell(id, field) {
    return this.productCell[field](id);
  }

  getProductAction(id, action) {
    return this.productAction[action](id);
  }
}
