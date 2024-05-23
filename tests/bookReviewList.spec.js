import { test, expect } from '@playwright/test';

test.describe('書籍レビュー一覧', () => {
  test('書籍レビューの一覧が表示される', async ({ page }) =>{
    await page.route( '**/books', route =>
      route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify([
          { id: '1', title: 'title1', url: 'http://example.com1', detail: 'Detail1', review: 'Review1', reviewer: 'Reviewer1', isMine: true },
          { id: '2', title: 'title2', url: 'http://example.com2', detail: 'Detail2', review: 'Review2', reviewer: 'Reviewer2', isMine: false },
        ]),
      })
    );

    await page.goto('http://localhost:5174/books');
    await page.waitForSelector('.book-revier-list');

    const reviewTitles = await page.$$eval('タイトル', elements =>
      elements.map(el => el.textContent)
    );
    expect(reviewTitles).toContain('title1');
    expect(reviewTitles).toContain('title2');

    const reviewReviewers = await page.$$eval('reviewer', elements =>
      elements.map(el => el.textContent)
    );
    expect(reviewReviewers).toContain('reviewer1');
    expect(reviewReviewers).toContain('reviewer2');
  });
});
