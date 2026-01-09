import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" a substring.
    // Default Next.js title is usually "Create Next App"
    await expect(page).toHaveTitle(/Create Next App/);
});

test('get started link', async ({ page }) => {
    await page.goto('/');

    // Click the get started link.
    // Default page has a link or text.
    // Let's just check if the page loads by looking for a text visible on the page.
    // "To get started, edit the page.tsx file." is on the main page.
    await expect(page.getByText('To get started, edit the page.tsx file.')).toBeVisible();
});
