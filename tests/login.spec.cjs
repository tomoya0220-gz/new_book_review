const { test, expect } = require('@playwright/test');

test.describe('Login', () => {
  test('ログイン成功', async({ page }) => {
    console.log('ページ');
    await page.goto('http://localhost:5174/login');
    console.log('email');
    await page.waitForSelector('input[name="email"]', { state: 'visible' });
    console.log('email');
    await page.fill('input[name="email"]', 'test@example.com');
    console.log('password');
    await page.fill('input[name="password"]', 'password123', { state: 'visible' });
    console.log('button');
    await page.click('button[type="submit"]');
    console.log('url');
    await expect(page).toHaveURL('http://localhost:5174/');
    const cookies = await page.context().cookies();
    const tokenCookie = cookies.find(cookie => cookie.name === 'token');
    expect(tokenCookie).toBeDefined();
  });

  test('エラーメッセージの表示', async ({ page }) => {
    console.log('ページ');
    await page.goto('http://localhost:5174/login');

    console.log('email');
    await page.waitForSelector('input[name="email"]', { state: 'visible' });

    console.log('email');
    await page.fill('input[name="email"]', 'error@example.com');

    console.log('password');
    await page.fill('input[name="password"]', { state: 'visible' });

    console.log('password');
    await page.fill('input[name="password"]', 'errorpassword');

    console.log('button');
    await page.click('button[type="submit"]');

    console.log('url');
    await expect(page.locator('text=ログインに失敗しました')).toBeVisible();
  });
});
