import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../../src/app/page';

// Mock FeedContainer since we test it separately
jest.mock('../../src/app/components/FeedContainer', () => ({
    FeedContainer: () => <div data-testid="feed-container">Feed Container</div>
}));

describe('Page', () => {
    it('renders header and feed container', () => {
        render(<Home />);

        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toHaveTextContent('MWD News Tracker');

        expect(screen.getByTestId('feed-container')).toBeInTheDocument();

        // Footer check
        expect(screen.getByText(/MWD News Tracker. Aggregated from Google News./)).toBeInTheDocument();
    });
});
