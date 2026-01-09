import { parseStringPromise } from 'xml2js';

export interface NewsStory {
    title: string;
    link: string;
    pubDate: string;
    source: string;
}

export async function fetchNews(query: string): Promise<NewsStory[]> {
    const encodedQuery = encodeURIComponent(query);
    const url = `https://news.google.com/rss/search?q=${encodedQuery}`;

    try {
        const response = await fetch(url, { next: { revalidate: 900 } });
        if (!response.ok) {
            throw new Error(`Failed to fetch news: ${response.statusText}`);
        }

        const xml = await response.text();
        const result = await parseStringPromise(xml);

        if (
            !result?.rss?.channel?.[0]?.item ||
            !Array.isArray(result.rss.channel[0].item)
        ) {
            return [];
        }

        const items = result.rss.channel[0].item;

        interface RssItem {
            title?: string[];
            link?: string[];
            pubDate?: string[];
            source?: Array<{ _: string } | string>;
        }

        return items.map((item: RssItem) => ({
            title: item.title?.[0] || 'No Title',
            link: item.link?.[0] || '#',
            pubDate: item.pubDate?.[0] || '',
            source: typeof item.source?.[0] === 'object' && item.source[0] !== null && '_' in item.source[0]
                ? item.source[0]._
                : (item.source?.[0] as string) || 'Unknown Source',
        }));
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
}
