import { test, expect } from '@playwright/test';

const VALID_EMAIL = process.env.USER_EMAIL;
const VALID_PASSWORD = process.env.USER_PASSWORD;
const ERROR_MESSAGE = 'Email e senha são obrigatórios';
const EMAIL_ERROR_NÃO_ENCONTRADO_MESSAGE = 'Usuário não encontrado. Verifique o email ou cadastre-se';
const EMAIL_ERROR_INVALIDO_MESSAGE = 'Formato de email inválido. Use: nome@dominio.com';
const PASSWORD_ERROR_MESSAGE = 'Email ou senha inválidos';

test.describe('Login - Cenários de Validação', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Validar acesso sem credenciais', async ({ page }) => {
        await page.getByTestId('login-button').click();
        await expect(page.getByTestId('password-error')).toContainText(ERROR_MESSAGE);
    });

    test('Validar acesso sem senha', async ({ page }) => {
        await page.getByTestId('email-input').fill(VALID_EMAIL);
        await page.getByTestId('login-button').click();
        await expect(page.getByTestId('password-error')).toContainText(ERROR_MESSAGE);
    });

    test('Validar acesso sem email', async ({ page }) => {
        await page.getByTestId('password-input').fill(VALID_PASSWORD);
        await page.getByTestId('login-button').click();
        await expect(page.getByTestId('password-error')).toContainText(ERROR_MESSAGE);
    });

    test('Validar acesso com email inválido', async ({ page }) => {
        await page.getByTestId('email-input').fill('admintest.com');
        await page.getByTestId('password-input').fill(VALID_PASSWORD);
        await page.getByTestId('login-button').click();
        await expect(page.getByTestId('email-error')).toContainText(EMAIL_ERROR_INVALIDO_MESSAGE);
    });

    test('Validar acesso com senha inválida', async ({ page }) => {
        await page.getByTestId('email-input').fill(VALID_EMAIL);
        await page.getByTestId('password-input').fill('SenhaErrada@123');
        await page.getByTestId('login-button').click();
        await expect(page.getByTestId('password-error')).toContainText(PASSWORD_ERROR_MESSAGE);
    });

    test('Validar acesso com email não cadastrado', async ({ page }) => {
        await page.getByTestId('email-input').fill('emailnaocadastrado@test.com');
        await page.getByTestId('password-input').fill(VALID_PASSWORD);
        await page.getByTestId('login-button').click();
        await expect(page.getByTestId('email-error')).toContainText(EMAIL_ERROR_NÃO_ENCONTRADO_MESSAGE);
    });

    test('Validar acesso com credenciais válidas (Caminho feliz)', async ({ page }) => {
        await page.getByTestId('email-input').fill(VALID_EMAIL);
        await page.getByTestId('password-input').fill(VALID_PASSWORD);
        await page.getByTestId('login-button').click();
        await expect(page.getByRole('heading')).toContainText('QA Automation Shop');
    });
});