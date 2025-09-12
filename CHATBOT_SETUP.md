# Chatbot Setup Guide

## The Issue
Your chatbot is showing "OpenRouter API key is not properly set up" because while your local `.env` file has the API key, GitHub Pages deployment doesn't have access to it.

## Solution: Add API Key to GitHub Secrets

### Step 1: Add Secret to GitHub Repository
1. Go to your repository: https://github.com/vikrantsingh29/vikrant-portfolio
2. Click on **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Fill in:
   - **Name**: `VITE_OPENROUTER_API_KEY`
   - **Secret**: ``
6. Click **Add secret**

### Step 2: Restart Development Server (Local Testing)
If testing locally, restart your dev server after changing `.env`:
```bash
npm run dev
```

### Step 3: Deploy to GitHub Pages
After adding the secret, commit and push your changes:
```bash
git add .
git commit -m "Fixes chatbot configuration for GitHub Pages deployment"
git push origin main
```

## How It Works
- **Local Development**: Uses `.env` file
- **GitHub Pages**: Uses repository secrets during build process
- **Build Process**: The workflow file passes the secret as an environment variable during the build

## Verification
1. **Local**: Open browser console, you should see "Making API request to OpenRouter..." when chatbot works
2. **Production**: After deployment, test the chatbot on your live site

## Troubleshooting
If chatbot still doesn't work:
1. Check browser console for specific error messages
2. Verify the secret was added correctly in GitHub
3. Make sure the API key is valid on OpenRouter
4. Wait for deployment to complete (check Actions tab)

The chatbot should work perfectly once the GitHub secret is properly configured!
