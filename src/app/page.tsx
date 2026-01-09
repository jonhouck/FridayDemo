import { FeedContainer } from "@/app/components/FeedContainer";
import Image from "next/image";

export const revalidate = 900; // 15 minutes

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-zinc-50 font-sans">
      <header className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center gap-4">
          <Image
            src="/mwd-seal.jpg"
            alt="MWD Seal"
            width={60}
            height={60}
            className="rounded-full"
          />
          <h1 className="text-xl font-bold tracking-tight text-white">
            MWD News Tracker
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <FeedContainer />
      </main>

      <footer className="border-t border-zinc-800 mt-12 py-8 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-6 text-center text-zinc-600 text-sm">
          &copy; {new Date().getFullYear()} MWD News Tracker. Aggregated from Google News.
        </div>
      </footer>
    </div>
  );
}
