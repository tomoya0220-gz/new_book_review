const { test, expect } = require('@playwright/test');

test.describe('Login Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('ログインできる', async ({ page }) => {
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');

    page.on('console', (msg) => {
      expect(msg.text()).toContain('Email: test@example.com');
      expect(msg.text()).toContain('Password: password123');
    });
  });
});