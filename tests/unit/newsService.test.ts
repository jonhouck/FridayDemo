import { fetchNews } from '../../src/services/newsService';

// Mock global fetch
global.fetch = jest.fn();

describe('newsService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch and parse news stories correctly', async () => {
        const mockXml = `
      <rss version="2.0">
        <channel>
          <item>
            <title>Test Story 1</title>
            <link>http://example.com/story1</link>
            <pubDate>Mon, 01 Jan 2024 10:00:00 GMT</pubDate>
            <source url="http://source1.com">Source 1</source>
          </item>
          <item>
            <title>Test Story 2</title>
            <link>http://example.com/story2</link>
            <pubDate>Mon, 01 Jan 2024 11:00:00 GMT</pubDate>
            <source>Source 2</source>
          </item>
        </channel>
      </rss>
    `;

        (global.fetch as jest.Mock).mockResolvedValue({
            ok: true,
            text: jest.fn().mockResolvedValue(mockXml),
        });

        const stories = await fetchNews('Metropolitan Water District');

        expect(stories).toHaveLength(2);
        expect(stories[0]).toEqual({
            title: 'Test Story 1',
            link: 'http://example.com/story1',
            pubDate: 'Mon, 01 Jan 2024 10:00:00 GMT',
            source: 'Source 1',
        });
        expect(stories[1]).toEqual({
            title: 'Test Story 2',
            link: 'http://example.com/story2',
            pubDate: 'Mon, 01 Jan 2024 11:00:00 GMT',
            source: 'Source 2',
        });
        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining('https://news.google.com/rss/search?q=Metropolitan%20Water%20District'),
            { next: { revalidate: 900 } }
        );
    });

    it('should handle API errors gracefully', async () => {
        (global.fetch as jest.Mock).mockResolvedValue({
            ok: false,
            statusText: 'Internal Server Error',
        });

        const stories = await fetchNews('error test');
        expect(stories).toEqual([]);
    });

    it('should handle network exceptions gracefully', async () => {
        (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

        const stories = await fetchNews('network error');
        expect(stories).toEqual([]);
    });

    it('should return empty array if RSS structure is invalid', async () => {
        const mockXml = '<rss><channel></channel></rss>';
        (global.fetch as jest.Mock).mockResolvedValue({
            ok: true,
            text: jest.fn().mockResolvedValue(mockXml),
        });

        const stories = await fetchNews('invalid xml');
        expect(stories).toEqual([]);
    });
});
