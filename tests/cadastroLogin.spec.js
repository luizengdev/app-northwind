import {test, expect} from "@playwright/test";
import CadastroPage from "../pages/cadastroPage";
import dados from "../fixtures/dados-cadastro-login.json";

test.describe("Cadastro de usuário", () => {
  let cadastroPage;

  test.beforeEach(async ({page}) => {
    cadastroPage = new CadastroPage(page);
    await page.goto("/");
    await page.getByRole("link", {name: "Cadastre-se"}).click();
  });

  test.describe("Validação de Nome", () => {
    test("CT01 - Deve exibir erro quando nome estiver vazio", async () => {
      const cenario = dados.nomeVazio;
      await cadastroPage.apagandoNome(cenario.dados);
      const mensagemErro = cadastroPage.getMensagemErro("nome");
      await expect(mensagemErro).toBeVisible();
      await expect(mensagemErro).toHaveText(cenario.esperado.mensagem);
      await expect(cadastroPage.getBotaoCadastrar()).toBeDisabled();
    });

    test("CT02 - Deve exibir erro quando nome tiver menos de 3 caracteres", async () => {
      const cenario = dados.nomeCurto;
      await cadastroPage.preencherFormulario(cenario.dados);
      const mensagemErro = cadastroPage.getMensagemErro("nome");
      await expect(mensagemErro).toBeVisible();
      await expect(mensagemErro).toHaveText(cenario.esperado.mensagem);
      await expect(cadastroPage.getBotaoCadastrar()).toBeDisabled();
    });

    test("CT03 - Deve exibir erro quando nome tiver números", async () => {
      const cenario = dados.nomeComNumeros;
      await cadastroPage.preencherFormulario(cenario.dados);
      const mensagemErro = cadastroPage.getMensagemErro("nome");
      await expect(mensagemErro).toBeVisible();
      await expect(mensagemErro).toHaveText(cenario.esperado.mensagem);
      await expect(cadastroPage.getBotaoCadastrar()).toBeDisabled();
    });
  });

  test.describe("Validação de Email", () => {
    test("CT04 - Deve exibir erro quando email não tiver o domínio após o @", async () => {
      const cenario = dados.emailSemDominio;
      await cadastroPage.preencherFormulario(cenario.dados);
      const mensagemErro = cadastroPage.getMensagemErro("email");
      await expect(mensagemErro).toBeVisible();
      await expect(mensagemErro).toHaveText(cenario.esperado.mensagem);
      await expect(cadastroPage.getBotaoCadastrar()).toBeDisabled();
    });

    test("CT05 - Deve exibir erro quando email não tiver a primeira parte antes do @", async () => {
      const cenario = dados.emailSemIdentificacao;
      await cadastroPage.preencherFormulario(cenario.dados);
      const mensagemErro = cadastroPage.getMensagemErro("email");
      await expect(mensagemErro).toBeVisible();
      await expect(mensagemErro).toHaveText(cenario.esperado.mensagem);
      await expect(cadastroPage.getBotaoCadastrar()).toBeDisabled();
    });

    test("CT06 - Deve exibir erro quando email não tiver o @", async () => {
      const cenario = dados.emailSemArroba;
      await cadastroPage.preencherFormulario(cenario.dados);
      const mensagemErro = cadastroPage.getMensagemErro("email");
      await expect(mensagemErro).toBeVisible();
      await expect(mensagemErro).toHaveText(cenario.esperado.mensagem);
      await expect(cadastroPage.getBotaoCadastrar()).toBeDisabled();
    });

    test("CT07 - Deve exibir erro quando email já estiver cadastrado", async () => {
      const cenario = dados.emailDuplicado;
      await cadastroPage.preencherFormulario(cenario.dados);
      await cadastroPage.getBotaoCadastrar().click();
      const toastErro = cadastroPage.getToast(cenario.esperado.mensagem);
      await expect(toastErro).toBeVisible();
    });
  });

  test.describe("Validação de Senha", () => {
    test("CT08 - Deve exibir erro quando a senha contiver apenas letras minúsculas", async () => {
      const cenario = dados.senhaSemMaiusculas;
      await cadastroPage.preencherFormulario(cenario.dados);
      const mensagemErro = cadastroPage.getMensagemErro("senha");
      await expect(mensagemErro).toBeVisible();
      await expect(mensagemErro).toHaveText(cenario.esperado.mensagem);
      await expect(cadastroPage.getBotaoCadastrar()).toBeDisabled();
    });

    test("CT09 - Deve exibir erro quando a confirmação de senha for diferente da senha", async () => {
      const cenario = dados.senhaDivergente;
      await cadastroPage.preencherFormulario(cenario.dados);
      const mensagemErro = cadastroPage.getMensagemErro("senhaConfirmacao");
      await expect(mensagemErro).toBeVisible();
      await expect(mensagemErro).toHaveText(cenario.esperado.mensagem);
      await expect(cadastroPage.getBotaoCadastrar()).toBeDisabled();
    });
  });

  test.describe("Cadastro de Usuário (Caminho Feliz)", () => {
    test("CT10 - Deve cadastrar usuário com sucesso quando os dados forem válidos", async () => {
      const cenario = dados.valido;
      await cadastroPage.preencherFormulario(cenario.dados);
      await cadastroPage.getBotaoCadastrar().click();
      const toastErro = cadastroPage.getToast(cenario.esperado.mensagem);
      await expect(toastErro).toBeVisible();
    });
  });
});
