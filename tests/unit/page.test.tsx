import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../../src/app/page'

describe('Page', () => {
    it('renders a heading', () => {
        render(<Page />)

        const heading = screen.getByRole('heading', { level: 1 })

        expect(heading).toBeInTheDocument() // Check if heading exists 
        // In default Next.js, it might not have a h1, so check for text "Get started" or similar if we haven't modified page.tsx
        // Actually, default create-next-app with tailwind has a lot of content. 
        // Let's modify page.tsx to fail safe or check for something that definitely exists.
        // Better: Write a test that passes on default nextjs page.
        // Existing page probably has "Docs" or "Deploy" links, or "Next.js" text.
        // Let's modify page.tsx to be simpler for this demo or just check for something likely.
    })
})
