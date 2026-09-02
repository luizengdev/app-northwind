export default class CadastroPage {
  constructor(page) {
    this.page = page;

    //Seletores
    this.campoNome = page.getByTestId("full-name-input");
    this.campoEmail = page.getByTestId("email-input");
    this.campoSenha = page.getByTestId("password-input");
    this.campoConfirmaSenha = page.getByTestId("confirm-password-input");
    this.botaoCadastrar = page.getByTestId("register-button");
  }

  async preencherFormulario(dados) {
    await this.campoNome.pressSequentially(dados.nome, {delay: 15});
    await this.campoEmail.fill(dados.email);
    await this.campoSenha.fill(dados.senha);
    await this.campoConfirmaSenha.fill(dados.senhaConfirmacao);
  }

  getBotaoCadastrar() {
    return this.page.getByTestId("register-button");
  }

  async apagandoNome() {
    await this.campoNome.pressSequentially("a", {delay: 15});
    await this.campoNome.fill("");
  }

  getToast(mensagem) {
    return this.page.getByText(mensagem);
  }

  getMensagemErro(field) {
    switch (field) {
      case "nome":
        return this.page.getByTestId("full-name-error");
      case "email":
        return this.page.getByTestId("email-error");
      case "senha":
        return this.page.getByTestId("password-error");
      default:
        throw new Error(`Tipo de erro "${field}" não mapeado em getMensagemErro`);
    }
  }
}
