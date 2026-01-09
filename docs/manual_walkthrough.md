# Manual Walkthrough - FridayDemo Initialization

This document guides you through verifying the initialization of the FridayDemo project.

## Verification Checklist

### 1. Development Server
- [ ] Run `npm run dev` in the terminal.
- [ ] Open [http://localhost:3000](http://localhost:3000).
- [ ] Verify the page loads and displays "MWD News Tracker" in the header.
- [ ] Verify a list of news story cards is displayed.

### 2. Linting
- [ ] Run `npm run lint`.
- [ ] Verify no errors are reported.

### 3. Unit Tests
- [ ] Run `npm run test`.
- [ ] Verify tests pass (e.g., "Page renders a heading").

### 4. E2E Tests
- [ ] Ensure browsers are installed (if not, `npx playwright install`).
- [ ] Run `npm run test:e2e`.
- [ ] Verify all tests pass.

### 5. Build
- [ ] Run `npm run build`.
- [ ] Verify the build completes successfully.

### 6. News Service Verification
- [ ] Run `npm test tests/unit/newsService.test.ts`.
- [ ] Verify the 4 tests pass (Fetch/Parse, API Error, Network Error, Invalid XML).

### 7. API Stories Verification
- [ ] Run `npm run dev`.
- [ ] Visit `http://localhost:3000/api/stories` in your browser.
- [ ] Verify you receive a JSON response with a list of stories (max 10).
- [ ] Stop the server.

### 8. Story Card and UI Verification
- [ ] Run `npm run dev`.
- [ ] Open [http://localhost:3000](http://localhost:3000).
- [ ] Verify the "Corporate Chic" aesthetic (Dark background, clean typography).
- [ ] Locate a story card.
- [ ] Verify the source name is highlighted (e.g., in blue).
- [ ] Click a story card and ensure it opens the original article in a new tab.

## CI/CD Verification
- [ ] Push changes to GitHub.
- [ ] Check the Actions tab in the repository.
- [ ] Verify the "CI" workflow runs and turns green.
