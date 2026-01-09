# FridayDemo (MWD Tracker)

This repository contains the source code for the MwdTracker application.

## Getting Started

### Prerequisites
- Node.js (v20+)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/jonhouck/FridayDemo.git
   cd FridayDemo
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Development
Run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

This project uses Jest for unit testing and Playwright for E2E testing.

### Run Unit Tests
```bash
npm run test
```

### Run E2E Tests
```bash
npx playwright install # First time setup
npm run test:e2e
```

### Run Linting
```bash
npm run lint
```
