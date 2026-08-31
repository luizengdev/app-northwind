import { test, expect } from "@playwright/test";
import CadastroPage from "../pages/cadastroPage";
import dados from "../fixtures/dados-cadastro-login.json";

test.describe("Cadastro de usuário", () => {
  let cadastroPage;

  test.beforeEach(async ({ page }) => {
    cadastroPage = new CadastroPage(page);
    await page.goto("/");
    await page.getByRole("link", { name: "Cadastre-se" }).click();
  });

  test.describe("Validação de Nome", () => {
    test("CA01 - Deve exibir erro quando nome tiver menos de 3 caracteres", async () => {
      const cenario = dados.nomeCurto;
      await cadastroPage.preencherFormulario(cenario.dados);
      const mensagemErro = cadastroPage.getMensagemErro("nome");
      await expect(mensagemErro).toBeVisible();
      await expect(mensagemErro).toHaveText(cenario.esperado.mensagem);
      await expect(cadastroPage.getBotaoCadastrar()).toBeDisabled();
    });

    test("CA02 - Deve exibir erro quando nome tiver números", async () => {
      const cenario = dados.nomeComNumeros;
      await cadastroPage.preencherFormulario(cenario.dados);
      const mensagemErro = cadastroPage.getMensagemErro("nome");
      await expect(mensagemErro).toBeVisible();
      await expect(mensagemErro).toHaveText(cenario.esperado.mensagem);
      await expect(cadastroPage.getBotaoCadastrar()).toBeDisabled();
    });
    test("CA03 - Deve exibir erro quando nome estiver vazio", async () => {
      const cenario = dados.nomeVazio;
      await cadastroPage.apagandoNome(cenario.dados);
      const mensagemErro = cadastroPage.getMensagemErro("nome");
      await expect(mensagemErro).toBeVisible();
      await expect(mensagemErro).toHaveText(cenario.esperado.mensagem);
      await expect(cadastroPage.getBotaoCadastrar()).toBeDisabled();
    });
  });

  test.describe("Validação de Email", () => {
    test("CA04 - Deve exibir erro quando email não tiver o @", async () => {
      const cenario = dados.emailSemArroba;
      await cadastroPage.preencherFormulario(cenario.dados);
      const mensagemErro = cadastroPage.getMensagemErro("email");
      await expect(mensagemErro).toBeVisible();
      await expect(mensagemErro).toHaveText(cenario.esperado.mensagem);
      await expect(cadastroPage.getBotaoCadastrar()).toBeDisabled();
    });
    test("CA05 - Deve exibir erro quando email não tiver o domínio após o @", async () => {
      const cenario = dados.emailSemDominio;
      await cadastroPage.preencherFormulario(cenario.dados);
      const mensagemErro = cadastroPage.getMensagemErro("email");
      await expect(mensagemErro).toBeVisible();
      await expect(mensagemErro).toHaveText(cenario.esperado.mensagem);
      await expect(cadastroPage.getBotaoCadastrar()).toBeDisabled();
    });
    test("CA06 - Deve exibir erro quando email não tiver a primeira parte antes do @", async () => {
      const cenario = dados.emailSemIdentificacao;
      await cadastroPage.preencherFormulario(cenario.dados);
      const mensagemErro = cadastroPage.getMensagemErro("email");
      await expect(mensagemErro).toBeVisible();
      await expect(mensagemErro).toHaveText(cenario.esperado.mensagem);
      await expect(cadastroPage.getBotaoCadastrar()).toBeDisabled();
    });
    test("CA07 - Deve exibir erro quando email já estiver cadastrado", async () => {
      const cenario = dados.emailDuplicado;
      await cadastroPage.preencherFormulario(cenario.dados);
      await cadastroPage.getBotaoCadastrar().click();
      const toastErro = cadastroPage.getToast(cenario.esperado.mensagem);
      await expect(toastErro).toBeVisible();
    });
  });

  test.describe("Validação de Senha", () => {
    test("CA08 - Deve exibir erro quando a senha contiver apenas letras minúsculas", async () => {
      const cenario = dados.senhaSemMaiusculas;
      await cadastroPage.preencherFormulario(cenario.dados);
      const mensagemErro = cadastroPage.getMensagemErro("senha");
      await expect(mensagemErro).toBeVisible();
      await expect(mensagemErro).toHaveText(cenario.esperado.mensagem);
      await expect(cadastroPage.getBotaoCadastrar()).toBeDisabled();
    });
  });

  test.describe("Cadastro de Usuário (Caminho Feliz)", () => {
    test("CA09 - Deve cadastrar usuário com sucesso quando os dados forem válidos", async () => {
      const cenario = dados.valido;
      await cadastroPage.preencherFormulario(cenario.dados);
      await cadastroPage.getBotaoCadastrar().click();
      const toastErro = cadastroPage.getToast(cenario.esperado.mensagem);
      await expect(toastErro).toBeVisible();
    });
  });
});
