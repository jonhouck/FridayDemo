import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
    test('should display the MWD News Tracker dashboard', async ({ page }) => {
        await page.goto('/');

        // Verify Header
        await expect(page.getByRole('heading', { name: 'MWD News Tracker' })).toBeVisible();

        // Verify Footer
        await expect(page.locator('footer')).toContainText('MWD News Tracker. Aggregated from Google News.');

        // Verify Story Cards
        // We expect at least one story card link to be present, or the "No stories" message
        // Since this is a live test against mock or real data, we check for structure
        const storyLinks = page.locator('a[target="_blank"]');
        const count = await storyLinks.count();

        // If we have stories, check that they look like cards
        if (count > 0) {
            await expect(storyLinks.first()).toHaveClass(/bg-zinc-900/);
        } else {
            // Fallback check for empty state
            await expect(page.getByText('No stories found at the moment.')).toBeVisible();
        }
    });

    test('should have correct title', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/MWD News Tracker/);
    });
});
