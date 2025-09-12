# GitHub Pages Deployment Guide

## 🚀 How to Deploy Your Terminal Portfolio to GitHub Pages

### Step 1: Repository Setup
1. Create a new repository on GitHub named `vikrant-portfolio` (or any name you prefer)
2. Push your current code to the **main** branch:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Terminal-style portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/vikrant-portfolio.git
   git push -u origin main
   ```

### Step 2: Configure GitHub Pages
1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. The workflow will automatically deploy your site when you push to the **main** branch

### Step 3: Configure API Key (Required for Chatbot)
The chatbot requires an OpenRouter API key to function properly. Follow these steps to add it securely:

1. **Get your OpenRouter API key**:
   - Go to [https://openrouter.ai/](https://openrouter.ai/)
   - Sign up for a free account
   - Navigate to "Keys" in your dashboard
   - Generate a new API key

2. **Add the API key to GitHub Secrets** (IMPORTANT - Never commit API keys to your code):
   - Go to your repository on GitHub
   - Click **Settings** > **Secrets and variables** > **Actions**
   - Click **New repository secret**
   - Name: `VITE_OPENROUTER_API_KEY`
   - Value: Your actual OpenRouter API key (e.g., `sk-or-v1-abcd1234...`)
   - Click **Add secret**

### Step 4: Update Repository Name (if different)
If your repository name is different from `vikrant-portfolio`, update the base URL in:
- `vite.config.js` - change the `GH_PAGES_BASE` environment variable
- `.github/workflows/deploy.yml` - update the `GH_PAGES_BASE` value

### Step 5: Access Your Live Site
Your terminal portfolio will be available at:
```
https://YOUR_USERNAME.github.io/vikrant-portfolio/
```

## 🔒 Important Security Notes

### API Key Security
- **NEVER** commit your actual API key to the repository
- **ALWAYS** use GitHub Secrets for sensitive information
- The `.env` file is for local development only and is ignored by git
- Production deployments get the API key from GitHub Secrets

### Deployment Permissions
- Only the **main** branch can deploy to GitHub Pages due to environment protection rules
- Feature branches and pull requests will build but not deploy
- This is a security feature to prevent unauthorized deployments

## 🐛 Troubleshooting

### "Branch not allowed to deploy" Error
If you see an error like "Branch 'branch-name' is not allowed to deploy to github-pages due to environment protection rules":

**Solution**: Only the `main` branch can deploy to GitHub Pages. To deploy your changes:
1. Merge your feature branch into `main`
2. Push to the `main` branch
3. The deployment will trigger automatically

### Chatbot Not Working
If the chatbot shows "Using smart responses" instead of "Powered by OpenRouter":
1. Verify you've added `VITE_OPENROUTER_API_KEY` to GitHub repository secrets
2. Check that the secret name is exactly `VITE_OPENROUTER_API_KEY`
3. Ensure your OpenRouter account has sufficient credits
4. Re-deploy by pushing to the main branch

### Manual Deployment (Alternative)
If you prefer manual deployment using gh-pages:
```bash
npm run build
npm run deploy
```

## 📝 Notes
- The site will auto-deploy on every push to the main branch
- Build time is typically 2-3 minutes
- Your terminal-style portfolio will be fully functional on GitHub Pages
- All animations and interactive features will work perfectly

## 🎯 Features Deployed
✅ Terminal-style design with boot sequence
✅ Categorized skills display
✅ Git log-style timeline
✅ Interactive project cards
✅ Contact form
✅ AI chatbot (with API key configured)
✅ Fully responsive design
✅ Matrix background effects
