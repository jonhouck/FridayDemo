/**
 * @jest-environment node
 */
import { GET } from '@/app/api/stories/route';
import { fetchNews } from '@/services/newsService';

// Mock the newsService
jest.mock('@/services/newsService', () => ({
    fetchNews: jest.fn(),
}));

describe('GET /api/stories', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return top 10 stories successfully', async () => {
        const mockStories = Array.from({ length: 15 }, (_, i) => ({
            title: `Story ${i + 1}`,
            link: `http://example.com/story${i + 1}`,
            pubDate: 'Mon, 01 Jan 2024 00:00:00 GMT',
            source: 'Test Source',
        }));

        (fetchNews as jest.Mock).mockResolvedValue(mockStories);

        const response = await GET();
        const json = await response.json();

        expect(fetchNews).toHaveBeenCalledWith('Metropolitan Water District of Southern California');
        expect(response.status).toBe(200);
        expect(json).toHaveLength(10);
        expect(json[0].title).toBe('Story 1');
        expect(json[9].title).toBe('Story 10');
    });

    it('should handle less than 10 stories', async () => {
        const mockStories = [
            {
                title: 'Story 1',
                link: 'http://example.com/story1',
                pubDate: 'Mon, 01 Jan 2024 00:00:00 GMT',
                source: 'Test Source',
            },
        ];

        (fetchNews as jest.Mock).mockResolvedValue(mockStories);

        const response = await GET();
        const json = await response.json();

        expect(fetchNews).toHaveBeenCalledWith('Metropolitan Water District of Southern California');
        expect(response.status).toBe(200);
        expect(json).toHaveLength(1);
    });

    it('should return empty array if no stories found', async () => {
        (fetchNews as jest.Mock).mockResolvedValue([]);

        const response = await GET();
        const json = await response.json();

        expect(response.status).toBe(200);
        expect(json).toEqual([]);
    });

    it('should handle errors gracefully', async () => {
        (fetchNews as jest.Mock).mockRejectedValue(new Error('Service failure'));

        const response = await GET();
        const json = await response.json();

        expect(response.status).toBe(500);
        expect(json).toEqual({ error: 'Failed to fetch stories' });
    });
});
