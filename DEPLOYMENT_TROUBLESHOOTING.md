# Deployment Troubleshooting Guide

## 🚨 Common Deployment Errors

### Error: "Branch is not allowed to deploy to github-pages due to environment protection rules"

**Problem**: You're trying to deploy from a feature branch, but GitHub Pages is configured to only deploy from the `main` branch for security reasons.

**Full Error Message**:
```
Branch "copilot/fix-c61ecc21-068a-475b-a18d-8eca06edc31a" is not allowed to deploy to github-pages due to environment protection rules.
The deployment was rejected or didn't satisfy other protection rules.
```

**Solution**:
1. **Merge your changes to main branch**:
   ```bash
   # Switch to main branch
   git checkout main
   
   # Merge your feature branch
   git merge your-feature-branch-name
   
   # Push to main
   git push origin main
   ```

2. **Alternative - Create a Pull Request**:
   - Create a pull request from your feature branch to `main`
   - Review and merge the PR
   - The deployment will trigger automatically after the merge

**Why this happens**: GitHub Pages environment protection rules are designed to prevent unauthorized deployments. Only the `main` branch has permission to deploy to the `github-pages` environment.

## 🔐 API Key Security Setup

### Question: "Where to add the key as I don't want to make the key public"

**Answer**: Never commit API keys to your code! Use GitHub repository secrets instead.

### Step-by-Step API Key Setup:

1. **Get your OpenRouter API key**:
   - Go to [https://openrouter.ai/](https://openrouter.ai/)
   - Sign up and navigate to your dashboard
   - Generate a new API key

2. **Add to GitHub Secrets** (SECURE METHOD):
   - Go to your GitHub repository
   - Click **Settings** tab
   - Navigate to **Secrets and variables** > **Actions**
   - Click **New repository secret**
   - **Name**: `VITE_OPENROUTER_API_KEY`
   - **Value**: Your actual API key (e.g., `sk-or-v1-abc123...`)
   - Click **Add secret**

3. **For Local Development**:
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env and add your API key
   # Change: VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
   # To: VITE_OPENROUTER_API_KEY=sk-or-v1-your-actual-key
   ```

4. **Security Notes**:
   - ✅ `.env` is in `.gitignore` (safe for local development)
   - ✅ GitHub Secrets are encrypted and not visible in logs
   - ❌ NEVER commit actual API keys to the repository
   - ❌ NEVER put API keys directly in workflow files

## 🔧 Fixed Issues in This Update

### 1. Cleaned up GitHub Actions Workflow
- Removed duplicate "Setup Pages" steps
- Added proper environment variable passing
- Restricted deployment to `main` branch only
- Added API key from GitHub secrets

### 2. Updated Documentation
- Clear instructions for secure API key setup
- Explanation of branch protection rules
- Troubleshooting guide for common issues

### 3. Improved Security
- API keys now properly sourced from GitHub secrets in production
- Clear separation between local development and production configurations

## 🚀 Deployment Process

### Current Workflow:
1. **Development**: Work on feature branches
2. **Testing**: Push feature branches (builds but doesn't deploy)
3. **Production**: Merge to `main` branch → automatic deployment

### To Deploy Your Changes:
1. Ensure your changes are on a feature branch
2. Test locally: `npm run dev`
3. Build test: `npm run build`
4. Create PR to `main` or merge directly to `main`
5. Push to `main` → automatic deployment to GitHub Pages

Your site will be available at: `https://YOUR_USERNAME.github.io/vikrant-portfolio/`