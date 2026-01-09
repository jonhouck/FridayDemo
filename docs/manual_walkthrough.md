# Manual Walkthrough - FridayDemo Initialization

This document guides you through verifying the initialization of the FridayDemo project.

## Verification Checklist

### 1. Development Server
- [ ] Run `npm run dev` in the terminal.
- [ ] Open [http://localhost:3000](http://localhost:3000).
- [ ] Verify the page loads and shows "To get started, edit the page.tsx file.".

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

## CI/CD Verification
- [ ] Push changes to GitHub.
- [ ] Check the Actions tab in the repository.
- [ ] Verify the "CI" workflow runs and turns green.
