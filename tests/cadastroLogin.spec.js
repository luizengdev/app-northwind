import { test, expect } from "@playwright/test";
import CadastroPage from "../pages/CadastroPage";
import dados from "../fixtures/dados-cadastro-login.json";

test.describe("Cadastro de usuário", () => {
  let cadastroPage;

  test.beforeEach(async ({ page }) => {
    cadastroPage = new CadastroPage(page);
    await page.goto("/");
    await page.getByRole("link", { name: "Cadastre-se" }).click();
  });

  test.describe("Validação de Nome", () => {
    test("Deve exibir erro quando nome tiver menos de 3 caracteres", async () => {
      const cenario = dados.nomeCurto;
      await cadastroPage.preencherFormulario(cenario.dados);
      const mensagemErro = cadastroPage.getMensagemErro("nome");
      await expect(mensagemErro).toBeVisible();
      await expect(mensagemErro).toHaveText(cenario.esperado.mensagem);
      await expect(cadastroPage.getBotaoCadastrar()).toBeDisabled();
    });

    test("Deve exibir erro quando nome tiver números", async () => {
      const cenario = dados.nomeComNumeros;
      await cadastroPage.preencherFormulario(cenario.dados);
      const mensagemErro = cadastroPage.getMensagemErro("nome");
      await expect(mensagemErro).toBeVisible();
      await expect(mensagemErro).toHaveText(cenario.esperado.mensagem);
      await expect(cadastroPage.getBotaoCadastrar()).toBeDisabled();
    });
    test("Deve exibir erro quando nome tiver vazio ", async () => {
      const cenario = dados.nomeVazio;
      await cadastroPage.apagandoNome(cenario.dados);
      const mensagemErro = cadastroPage.getMensagemErro("nome");
      await expect(mensagemErro).toBeVisible();
      await expect(mensagemErro).toHaveText(cenario.esperado.mensagem);
      await expect(cadastroPage.getBotaoCadastrar()).toBeDisabled();
    });
  });

  test.describe("Validação de Email", () => {
    test("Deve exibir erro quando email não ter o @", async () => {
      const cenario = dados.emailSemArroba;
      await cadastroPage.preencherFormulario(cenario.dados);
      const mensagemErro = cadastroPage.getMensagemErro("email");
      await expect(mensagemErro).toBeVisible();
      await expect(mensagemErro).toHaveText(cenario.esperado.mensagem);
      await expect(cadastroPage.getBotaoCadastrar()).toBeDisabled();
    });
    test("Deve exibir erro quando email não tiver o domínio após o @", async () => {
      const cenario = dados.emailSemDominio;
      await cadastroPage.preencherFormulario(cenario.dados);
      const mensagemErro = cadastroPage.getMensagemErro("email");
      await expect(mensagemErro).toBeVisible();
      await expect(mensagemErro).toHaveText(cenario.esperado.mensagem);
      await expect(cadastroPage.getBotaoCadastrar()).toBeDisabled();
    });
    test("Deve exibir erro quando email não tiver a primeira parte antes do @", async () => {
      const cenario = dados.emailSemIdentificacao;
      await cadastroPage.preencherFormulario(cenario.dados);
      const mensagemErro = cadastroPage.getMensagemErro("email");
      await expect(mensagemErro).toBeVisible();
      await expect(mensagemErro).toHaveText(cenario.esperado.mensagem);
      await expect(cadastroPage.getBotaoCadastrar()).toBeDisabled();
    });
  });

  test.describe("Validação de Senha", () => {
    test("Deve exibir erro quando a senha contiver apenas letras minúsculas", async () => {
      const cenario = dados.senhaSemMaiusculas;
      await cadastroPage.preencherFormulario(cenario.dados);
      const mensagemErro = cadastroPage.getMensagemErro("senha");
      await expect(mensagemErro).toBeVisible();
      await expect(mensagemErro).toHaveText(cenario.esperado.mensagem);
      await expect(cadastroPage.getBotaoCadastrar()).toBeDisabled();
    });
  });

  test.describe("Cadastro de Usuário (Caminho Feliz)", () => {
    test("Cadastro de usuário com dados validos", async ({ page }) => {
      const cenario = dados.valido;
      await cadastroPage.preencherFormulario(cenario.dados);
      await cadastroPage.getBotaoCadastrar().click();
      await expect(cadastroPage.mensagemSucesso).toBeVisible();
    });
  });
});
