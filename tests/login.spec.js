import { test, expect } from '@playwright/test';
import loginData from '../fixtures/login-data.json';

test.describe('Login - Cenário de Validação (Caminho feliz)', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Validar acesso com credenciais válidas', async ({ page }) => {
        const DASHBOARD_TITLE = 'QA Automation Shop';

        await page.getByTestId('email-input').fill(loginData.validUser.email);
        await page.getByTestId('password-input').fill(loginData.validUser.password);
        await page.getByTestId('login-button').click();
        await expect(page.getByRole('heading', { name: DASHBOARD_TITLE })).toBeVisible();
    });
});

test.describe('Login - Cenários de Validação (Erros)', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });
    test('Validar acesso sem credenciais', async ({ page }) => {
        await page.getByTestId('email-input').fill(loginData.emailVazio.email);
        await page.getByTestId('password-input').fill(loginData.passwordVazio.password);
        await page.getByTestId('login-button').click();
        await expect(page.getByTestId('password-error')).toContainText(loginData.passwordVazio.expectMessage);
    });

    test('Validar acesso sem senha', async ({ page }) => {
        await page.getByTestId('email-input').fill(loginData.validUser.email);
        await page.getByTestId('password-input').fill(loginData.passwordVazio.password);
        await page.getByTestId('login-button').click();
        await expect(page.getByTestId('password-error')).toContainText(loginData.passwordVazio.expectMessage);
    });

    test('Validar acesso sem email', async ({ page }) => {
        await page.getByTestId('email-input').fill(loginData.emailVazio.email);
        await page.getByTestId('password-input').fill(loginData.validUser.password);
        await page.getByTestId('login-button').click();
        // TODO: Mapeado como 'password-error' devido a um bug/limitação no front-end atual. 
        // Deve ser alterado para 'email-error' assim que o desenvolvimento corrigir o ID do componente.
        await expect(page.getByTestId('password-error')).toContainText(loginData.emailVazio.expectMessage);
    });

    test('Validar acesso com email inválido', async ({ page }) => {
        await page.getByTestId('email-input').fill(loginData.invalidEmail.email);
        await page.getByTestId('password-input').fill(loginData.invalidEmail.password);
        await page.getByTestId('login-button').click();
        await expect(page.getByTestId('email-error')).toContainText(loginData.invalidEmail.expectMessage);
    });

    test('Validar acesso com senha inválida', async ({ page }) => {
        await page.getByTestId('email-input').fill(loginData.invalidPassword.email);
        await page.getByTestId('password-input').fill(loginData.invalidPassword.password);
        await page.getByTestId('login-button').click();
        await expect(page.getByTestId('password-error')).toContainText(loginData.invalidPassword.expectMessage);
    });

    test('Validar acesso com email não cadastrado', async ({ page }) => {
        await page.getByTestId('email-input').fill(loginData.emailNotRegistered.email);
        await page.getByTestId('password-input').fill(loginData.validUser.password);
        await page.getByTestId('login-button').click();
        await expect(page.getByTestId('email-error')).toContainText(loginData.emailNotRegistered.expectMessage);
    });
});