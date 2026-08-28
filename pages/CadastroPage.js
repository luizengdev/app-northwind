import { expect } from '@playwright/test';

export default class CadastroPage {
    constructor(page) {
        this.page = page;

        //Seletores
        this.campoNome = page.getByTestId("full-name-input");
        this.campoEmail = page.getByTestId("email-input");
        this.campoSenha = page.getByTestId("password-input");
        this.campoConfirmaSenha = page.getByTestId("confirm-password-input");
        this.botaoCadastrar = page.getByTestId('register-button');
        this.mensagemSucesso = page.getByText("Cadastro realizado com sucesso! Redirecionando...");
        this.mensagemNomeCurto = page.getByTestId('full-name-error');
        this.nomeComNumeros = page.getByTestId('full-name-error');
        this.nomeVazio = page.getByTestId('full-name-error');
        this.emailSemArroba = page.getByTestId('email-error');
        this.emailSemDominio = page.getByTestId('email-error');
        this.emailSemIdentificacao = page.getByTestId('email-error');
    }


    async preencherNome(nome) {
        await this.campoNome.pressSequentially(nome, { delay: 50 });
    }

    async preencherEmail(email) {
        await this.campoEmail.fill(email);
    }

    async preencherSenha(senha) {
        await this.campoSenha.fill(senha);
    }
    async preencherConfirmarSenha(senha) {
        await this.campoConfirmaSenha.fill(senha);
    }

    async clicarCadastrar() {
        await this.botaoCadastrar.click();
    }

    async verificarBotaoDesabilitado() {
        await expect(this.botaoCadastrar).toBeDisabled();
    }

    async apagandoNome(nome) {
        await this.campoNome.pressSequentially("a", { delay: 100 });
        await this.campoNome.press('Backspace');
    }

    async mensagemError(mensagem, tipo) {
        // Mapeia de forma direta qual seletor usar baseado na string 'nome' ou 'email'
        const mapaDeSeletores = {
            'nome': this.mensagemNomeCurto, // getByTestId('full-name-error')
            'email': this.emailSemArroba    // getByTestId('email-error')
        };

        const seletor = mapaDeSeletores[tipo];

        // Executa as validações do Playwright
        await expect(seletor).toBeVisible();
        await expect(seletor).toHaveText(mensagem);
    }

}