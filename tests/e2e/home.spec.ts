import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
    test('should display the MWD News Tracker dashboard', async ({ page }) => {
        await page.goto('/');

        // Verify Header
        await expect(page.getByRole('heading', { name: 'MWD News Tracker' })).toBeVisible();

        // Verify Footer
        await expect(page.locator('footer')).toContainText('MWD News Tracker. Aggregated from Google News.');

        // Wait for client-side load to complete
        // The "Refresh Feed" button text appears only after loading is false
        const refreshButton = page.getByRole('button', { name: 'Refresh Feed' });
        await expect(refreshButton).toBeVisible({ timeout: 10000 }); // Increase timeout just in case

        // Verify Story Cards
        const storyLinks = page.locator('a[target="_blank"]');
        const count = await storyLinks.count();

        // If we have stories, check that they look like cards
        if (count > 0) {
            await expect(storyLinks.first()).toHaveClass(/bg-zinc-900/);
        } else {
            // Fallback check for empty state
            await expect(page.getByText('No stories found at the moment.')).toBeVisible();
        }

        // Verify refresh interaction with network delay to catch the "Refreshing..." state
        await page.route('/api/stories*', async route => {
            // Introduce a delay to ensure the loading state is visible
            await new Promise(f => setTimeout(f, 1000));
            await route.continue();
        });

        await refreshButton.click();
        await expect(page.getByRole('button', { name: 'Refreshing...' })).toBeVisible();
        await expect(refreshButton).toBeVisible(); // Should return to normal
    });

    test('should have correct title', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/MWD News Tracker/);
    });
});
