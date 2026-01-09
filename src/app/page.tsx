import { fetchNews } from "@/services/newsService";
import { StoryCard } from "@/app/components/StoryCard";

export const revalidate = 900; // 15 minutes

export default async function Home() {
  const stories = await fetchNews("Metropolitan Water District of Southern California");
  const topStories = stories.slice(0, 10);

  return (
    <div className="min-h-screen bg-black text-zinc-50 font-sans">
      <header className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight text-white">
            MWD News Tracker
          </h1>
          <div className="text-xs text-zinc-500">
            Last Updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {topStories.length > 0 ? (
            topStories.map((story, index) => (
              <StoryCard key={`${story.link}-${index}`} story={story} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-zinc-500">
              No stories found at the moment.
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-zinc-800 mt-12 py-8 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-6 text-center text-zinc-600 text-sm">
          &copy; {new Date().getFullYear()} MWD News Tracker. Aggregated from Google News.
        </div>
      </footer>
    </div>
  );
}
