await expect(page.getByTestId("product-row-203")).toBeVisible();
await page.getByTestId("add-product-button").click();
await page.getByRole("heading", { name: "Adicionar Produto" }).click();
