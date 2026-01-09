import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../../src/app/page';

// Mock the newsService
jest.mock('../../src/services/newsService', () => ({
    fetchNews: jest.fn().mockResolvedValue([
        {
            title: 'Mock Story 1',
            link: 'http://mock.com/1',
            pubDate: '2024-01-01',
            source: 'Mock Source',
            summary: 'Mock Summary'
        }
    ]),
}));

describe('Page', () => {
    it('renders stories correctly', async () => {
        // As an async Server Component, we call it directly to get the React Node
        const jsx = await Home();
        render(jsx);

        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toHaveTextContent('MWD News Tracker');

        expect(screen.getByText('Mock Story 1')).toBeInTheDocument();
        expect(screen.getByText('Mock Source')).toBeInTheDocument();
    });
});
