import React from 'react';
import { NewsStory } from '@/services/newsService';

interface StoryCardProps {
    story: NewsStory;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
    return (
        <a
            href={story.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition-colors duration-200 group"
        >
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                    <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">
                        {story.source}
                    </span>
                    <span className="text-zinc-500 text-xs">
                        {new Date(story.pubDate).toLocaleDateString()}
                    </span>
                </div>
                <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-blue-400 transition-colors">
                    {story.title}
                </h3>
                <p className="text-zinc-400 text-sm line-clamp-2">
                    {story.summary}
                </p>
            </div>
        </a>
    );
};
