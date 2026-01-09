"use client";

import React, { useEffect, useState } from "react";
import { StoryCard } from "@/app/components/StoryCard";
import { NewsStory } from "@/services/newsService";

export const FeedContainer: React.FC = () => {
    const [stories, setStories] = useState<NewsStory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);

    const fetchStories = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const timestamp = new Date().getTime();
            const response = await fetch(`/api/stories?t=${timestamp}`);
            if (!response.ok) {
                throw new Error("Failed to fetch stories");
            }
            const data = await response.json();
            setStories(data);
            setLastRefreshed(new Date());
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStories();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                <div className="text-zinc-400 text-sm">
                    {lastRefreshed ? (
                        <>Last checked: {lastRefreshed.toLocaleTimeString()}</>
                    ) : (
                        <>Initializing...</>
                    )}
                </div>
                <button
                    onClick={fetchStories}
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white text-sm font-medium rounded-md transition-colors"
                >
                    {isLoading ? "Refreshing..." : "Refresh Feed"}
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-900/20 border border-red-900/50 text-red-200 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {isLoading && stories.length === 0 ? (
                <div className="grid gap-6 md:grid-cols-2">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="h-48 rounded-lg bg-zinc-900 animate-pulse border border-zinc-800"
                        />
                    ))}
                </div>
            ) : stories.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2">
                    {stories.map((story, index) => (
                        <StoryCard key={`${story.link}-${index}`} story={story} />
                    ))}
                </div>
            ) : (
                !isLoading && (
                    <div className="text-center py-12 text-zinc-500 bg-zinc-900/30 rounded-lg border border-zinc-800 border-dashed">
                        No stories found at the moment.
                    </div>
                )
            )}
        </div>
    );
};
