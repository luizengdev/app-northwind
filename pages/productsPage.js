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
    this.editButton = page.getByRole("button", {name: "Edit"});
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

  // AÇÕES DE EDITAR
  async editProduct(id) {
    await this.productAction.edit(id).click();
  }

  async editFirstProduct() {
    const rows = this.page.locator("table tbody tr");

    // Aguarda ao menos uma linha aparecer (tabela carrega via API)
    await rows.first().waitFor({state: "visible", timeout: 5000});

    const count = await rows.count();

    if (count === 0) {
      throw new Error("Nenhum produto disponível para edição");
    }

    await this.firstEditButton.click();
  }

  async editProductByName(productName) {
    const row = this.page.locator("table tbody tr").filter({hasText: productName});
    const count = await row.count();

    if (count === 0) {
      throw new Error(`Produto "${productName}" não encontrado`);
    }

    await row.getByRole("button", {name: "Edit"}).click();
  }

  async openEditProduct() {
    await this.editButton.click();
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

  getProductRowByName(productName) {
    return this.page.locator("table tbody tr").filter({hasText: productName});
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

  async getLastProductName() {
    const rows = this.page.locator('[data-testid^="product-row-"]');
    await rows.first().waitFor({state: "visible", timeout: 3000});

    const count = await rows.count();
    if (count === 0) {
      throw new Error("Nenhum produto disponível para consultar o nome");
    }

    const lastRow = rows.nth(count - 1);
    const productId = await lastRow.getAttribute("data-testid");
    const id = productId?.replace("product-row-", "");

    if (!id) {
      throw new Error("Não foi possível identificar o ID do último produto");
    }

    const nameProduct = await this.productCell.name(id).textContent();
    return nameProduct.trim();
  }

  async getFirstProductName() {
    const firstRow = this.getFirstProductRow();
    await firstRow.waitFor({state: "visible", timeout: 3000});

    const productId = await firstRow.getAttribute("data-testid");
    const id = productId?.replace("product-row-", "");

    if (!id) {
      throw new Error("Não foi possível identificar o ID do primeiro produto");
    }

    const productName = (await this.getProductCell(id, "name").textContent())?.trim();

    if (!productName) {
      throw new Error("Não foi possível identificar o nome do primeiro produto");
    }
    return productName;
  }

  // Clica em Delete no último produto da lista
  async clickDeleteLastProduct() {
    const rows = this.page.locator('[data-testid^="product-row-"]');
    await rows.first().waitFor({state: "visible", timeout: 3000});

    const count = await rows.count();
    if (count === 0) {
      throw new Error("Nenhum produto disponível para exclusão");
    }

    const lastRow = rows.nth(count - 1);
    const productId = await lastRow.getAttribute("data-testid");
    const id = productId?.replace("product-row-", "");

    if (!id) {
      throw new Error("Não foi possível identificar o ID do último produto para excluir");
    }

    await this.productAction.delete(id).click();
  }

  // Clica em Delete no primeiro produto da lista
  async clickDeleteFirstProduct() {
    const rows = this.page.locator('[data-testid^="product-row-"]');
    await rows.first().waitFor({state: "visible", timeout: 3000});

    const count = await rows.count();
    if (count === 0) {
      throw new Error("Nenhum produto disponível para exclusão");
    }

    const firstRow = rows.first();
    const productId = await firstRow.getAttribute("data-testid");
    const id = productId?.replace("product-row-", "");

    if (!id) {
      throw new Error("Não foi possível identificar o ID do primeiro produto para excluir");
    }

    await this.productAction.delete(id).click();
  }
}
