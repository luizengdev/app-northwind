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
    await this.campoNome.pressSequentially(dados.nome, { delay: 15 });
    await this.campoEmail.fill(dados.email);
    await this.campoSenha.fill(dados.senha);
    await this.campoConfirmaSenha.fill(dados.senhaConfirmacao);
  }

  getBotaoCadastrar() {
    return this.page.getByTestId("register-button");
  }

  async apagandoNome() {
    await this.campoNome.pressSequentially("a", { delay: 5 });
    await this.campoNome.fill("");
  }

  getToast(mensagem) {
    return this.page.getByText(mensagem);
  }

  getMensagemErro(tipo) {
    const mapaDeSeletores = {
      nome: this.page.getByTestId("full-name-error"),
      email: this.page.getByTestId("email-error"),
      senha: this.page.getByTestId("password-error"),
    };

    const seletor = mapaDeSeletores[tipo];
    if (!seletor) {
      throw new Error(`Tipo de erro "${tipo}" não mapeado em getMensagemErro`);
    }

    return seletor;
  }
}
