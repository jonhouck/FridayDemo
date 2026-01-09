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

## Deployment & CI/CD

### Azure (App Service)

To deploy to Azure App Service (Linux) with a full CI/CD pipeline:

1.  **Create Resources**: Create an Azure App Service (Node.js runtime) and generate a **Publish Profile** from the Deployment Center.
2.  **GitHub Secrets**: Add the Publish Profile content as a secret named `AZURE_WEBAPP_PUBLISH_PROFILE` in your GitHub repository settings.
3.  **Workflow**: Create `.github/workflows/azure-deploy.yml`:

```yaml
name: Build and Deploy to Azure
on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          
      - name: Install & Test
        run: |
          npm ci
          npm run test
          npm run build
          
      - name: Deploy to Azure Web App
        uses: azure/webapps-deploy@v2
        with:
          app-name: 'your-app-name'
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
          package: .
```

### AWS (AWS Amplify)

AWS Amplify provides a fully managed CI/CD pipeline for Next.js applications:

1.  **Setup**: Go to the AWS Amplify Console and select **"Host web app"**.
2.  **Connect Repository**: Select GitHub and authorize access to `jonhouck/FridayDemo`.
3.  **Configure Build**: Amplify defines the pipeline in `amplify.yml`. Edit the build settings to include your test suite before the build step to ensure quality:
    ```yaml
    version: 1
    frontend:
      phases:
        preBuild:
          commands:
            - npm ci
            - npm run test # Strict CI: Fail build if tests fail
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: .next
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
    ```
4.  **Deploy**: Every push to the `main` branch will now trigger: Provision -> Build -> Test -> Deploy.
