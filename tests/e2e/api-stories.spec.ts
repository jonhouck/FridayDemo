import { test, expect } from '@playwright/test';

test.describe('API Stories Endpoint', () => {
    test('GET /api/stories should return valid JSON structure with max 10 items', async ({ request }) => {
        const response = await request.get('/api/stories');

        // Ensure successful response
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        const stories = await response.json();

        // Check it's an array
        expect(Array.isArray(stories)).toBeTruthy();

        // Check basic structure of items (if any exist)
        if (stories.length > 0) {
            const firstStory = stories[0];
            expect(firstStory).toHaveProperty('title');
            expect(firstStory).toHaveProperty('link');
            expect(firstStory).toHaveProperty('pubDate');
            expect(firstStory).toHaveProperty('source');

            // Allow <= 10 items
            expect(stories.length).toBeLessThanOrEqual(10);
        }
    });
});
