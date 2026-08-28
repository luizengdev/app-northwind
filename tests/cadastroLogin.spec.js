import { test, expect } from '@playwright/test';
import CadastroPage from '../pages/CadastroPage';
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
      await cadastroPage.preencherNome(cenario.dados.nome);
      await cadastroPage.mensagemError(cenario.esperado.mensagem, "nome");
      await cadastroPage.verificarBotaoDesabilitado();
    });

    test("Deve exibir erro quando nome tiver números", async () => {
      const cenario = dados.nomeComNumeros;
      await cadastroPage.preencherNome(cenario.dados.nome);
      await cadastroPage.mensagemError(cenario.esperado.mensagem, "nome");
      await cadastroPage.verificarBotaoDesabilitado();
    });
    test("Deve exibir erro quando nome tiver vazio ", async () => {
      const cenario = dados.nomeVazio;
      await cadastroPage.apagandoNome(cenario.dados.nome);
      await cadastroPage.mensagemError(cenario.esperado.mensagem, "nome");
      await cadastroPage.verificarBotaoDesabilitado();
    });
  });

  test.describe("Validação de Email", () => {
    test("Deve exibir erro quando email não ter o @", async () => {
      const cenario = dados.emailSemArroba;
      await cadastroPage.preencherNome(cenario.dados.nome);
      await cadastroPage.preencherEmail(cenario.dados.email);
      await cadastroPage.mensagemError(cenario.esperado.mensagem, "email");
      await cadastroPage.verificarBotaoDesabilitado();
    });
    test("Deve exibir erro quando email não tiver o domínio após o @", async () => {
      const cenario = dados.emailSemDominio;
      await cadastroPage.preencherNome(cenario.dados.nome);
      await cadastroPage.preencherEmail(cenario.dados.email);
      await cadastroPage.mensagemError(cenario.esperado.mensagem, "email");
      await cadastroPage.verificarBotaoDesabilitado();
    });
    test("Deve exibir erro quando email não tiver a primeira parte antes do @", async () => {
      const cenario = dados.emailSemIdentificacao;
      await cadastroPage.preencherNome(cenario.dados.nome);
      await cadastroPage.preencherEmail(cenario.dados.email);
      await cadastroPage.mensagemError(cenario.esperado.mensagem, "email");
      await cadastroPage.verificarBotaoDesabilitado();
    });
  });

  // test.describe("Validação de Senha", () => { });
  // test("Deve exibir erro quando email não tiver a primeira parte antes do @", async () => {
  //   const cenario = dados.senhaSemMaiusculas;
  //   await cadastroPage.preencherNome(cenario.nome);
  //   await cadastroPage.preencherEmail(cenario.email);
  //   await expect(cadastroPage.mensagemSenhaSemMaiuscula).toBeVisible();
  // });
})

// test.describe('Cadastro de Usuário (Caminho Feliz)', () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto('/');
//   });
//   test('CA08 - Cadastrar usuário com sucesso', async ({ page }) => {
//     const cadastroPage = new CadastroPage(page);

//     await page.getByRole('link', { name: 'Cadastre-se' }).click();
//     await cadastroPage.preencherFormulario('Gotinhas prias', 'gotinhas3@ig.com', 'Gotas@1234', 'Gotas@1234');
//     await cadastroPage.clicarBotaoCadastrar();
//     await expect(cadastroPage.mensagemSucesso).toBeVisible();
//   })
// });
