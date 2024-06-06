import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test('ログイン成功', async({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.waitForSelector('input[name="email"]', { state: 'visible' });
    await page.fill('input[name="email"]', 'tomoya02201998@example.com');
    await page.fill('input[name="password"]', 'Tomo0220ya', { state: 'visible' });
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('http://localhost:5173/public/books');
    const cookies = await page.context().cookies();
    const tokenCookie = cookies.find(cookie => cookie.name === 'token');
    expect(tokenCookie).toBeDefined();
  });

  test('エラーメッセージの表示', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.waitForSelector('input[name="email"]', { state: 'visible' });
    await page.fill('input[name="email"]', 'error@example.com');
    await page.fill('input[name="password"]', 'errorpassword');
    await page.click('button[type="submit"]');
    await expect(page.locator('.error-message')).toBeVisible();
  });
});
