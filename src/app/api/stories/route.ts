import { NextResponse } from 'next/server';
import { fetchNews } from '@/services/newsService';

export async function GET() {
    try {
        const stories = await fetchNews('Metropolitan Water District of Southern California');
        const topStories = stories.slice(0, 10);
        return NextResponse.json(topStories);
    } catch (error) {
        console.error('Error in GET /api/stories:', error);
        return NextResponse.json(
            { error: 'Failed to fetch stories' },
            { status: 500 }
        );
    }
}
