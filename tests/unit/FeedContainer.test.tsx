import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FeedContainer } from "@/app/components/FeedContainer";
import "@testing-library/jest-dom";

// Mock StoryCard to avoid testing its implementation details here
jest.mock("@/app/components/StoryCard", () => ({
    StoryCard: ({ story }: { story: any }) => (
        <div data-testid="story-card">{story.title}</div>
    ),
}));

describe("FeedContainer", () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders loading state initially", async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            new Promise(() => { }) // Never resolves to keep loading state
        );

        render(<FeedContainer />);
        // Check for pulse animation elements (we have 4 of them)
        // They are divs with "animate-pulse" class. 
        // We can just check that stories are not there yet.
        expect(screen.queryByTestId("story-card")).not.toBeInTheDocument();
        expect(screen.getByText("Refreshing...")).toBeDisabled();
    });

    it("renders stories after successful fetch", async () => {
        const mockStories = [
            { title: "Story 1", link: "http://example.com/1", source: "ABC", pubDate: "2023-01-01", summary: "Summary 1" },
            { title: "Story 2", link: "http://example.com/2", source: "XYZ", pubDate: "2023-01-02", summary: "Summary 2" },
        ];

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockStories,
        });

        render(<FeedContainer />);

        await waitFor(() => {
            expect(screen.getAllByTestId("story-card")).toHaveLength(2);
        });

        expect(screen.getByText("Story 1")).toBeInTheDocument();
        expect(screen.getByText("Story 2")).toBeInTheDocument();
        expect(screen.getByText("Refresh Feed")).toBeEnabled();
    });

    it("renders error message on fetch failure", async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        });

        render(<FeedContainer />);

        await waitFor(() => {
            expect(screen.getByText("Failed to fetch stories")).toBeInTheDocument();
        });
    });

    it("triggers new fetch on refresh button click", async () => {
        const mockStories = [
            { title: "Story 1", link: "http://example.com/1", source: "ABC", pubDate: "2023-01-01", summary: "Summary 1" },
        ];

        (global.fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async () => mockStories,
        });

        render(<FeedContainer />);

        await waitFor(() => {
            expect(screen.getByText("Refresh Feed")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText("Refresh Feed"));

        expect(global.fetch).toHaveBeenCalledTimes(2); // Once on mount, once on click
    });
});
