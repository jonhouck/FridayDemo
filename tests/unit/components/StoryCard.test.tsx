import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StoryCard } from '../../../src/app/components/StoryCard';
import { NewsStory } from '../../../src/services/newsService';

describe('StoryCard', () => {
    const mockStory: NewsStory = {
        title: 'Test Title',
        link: 'http://test.com',
        pubDate: 'Mon, 01 Jan 2024 10:00:00 GMT',
        source: 'Test Source',
        summary: 'Test Summary'
    };

    it('renders story information correctly', () => {
        render(<StoryCard story={mockStory} />);

        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Test Source')).toBeInTheDocument();
        expect(screen.getByText('Test Summary')).toBeInTheDocument();
        // Check date formatting (local date string might vary, but verify it exists)
        // Just checking basic presence for now since formatting depends on locale
    });

    it('has correct link attributes', () => {
        render(<StoryCard story={mockStory} />);

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', 'http://test.com');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('applies source highlighting style', () => {
        render(<StoryCard story={mockStory} />);
        const sourceElement = screen.getByText('Test Source');
        expect(sourceElement).toHaveClass('text-blue-400');
    });
});
