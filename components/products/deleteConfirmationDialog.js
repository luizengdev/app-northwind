import {expect} from "@playwright/test";

export default class DeleteConfirmationDialog {
  constructor(page) {
    this.page = page;

    this.heading = page.getByRole("heading", {name: "Confirmação"});
    this.bodyText = page.getByTestId("confirm-modal-message");
    this.confirmButton = page.getByTestId("confirm-modal-confirm");
    this.cancelButton = page.getByTestId("confirm-modal-cancel");
  }

  async verifyDeletionMessage() {
    await expect(this.bodyText).toContainText("Tem certeza que deseja excluir este produto?");
  }

  async confirmDeletion() {
    await this.confirmButton.click();
  }

  async cancelDeletion() {
    await this.cancelButton.click();
  }
}
