# GitHub Pages Deployment Guide

## 🚀 How to Deploy Your Terminal Portfolio to GitHub Pages

### Step 1: Repository Setup
1. Create a new repository on GitHub named `vikrant-portfolio` (or any name you prefer)
2. Push your current code to the repository:
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
5. The workflow will automatically deploy your site

### Step 3: Update Repository Name (if different)
If your repository name is different from `vikrant-portfolio`, update the base URL in:
- `vite.config.js` - change the `GH_PAGES_BASE` environment variable
- `.github/workflows/deploy.yml` - update the `GH_PAGES_BASE` value

### Step 4: Access Your Live Site
Your terminal portfolio will be available at:
```
https://YOUR_USERNAME.github.io/vikrant-portfolio/
```

### Manual Deployment (Alternative)
If you prefer manual deployment:
```bash
npm run build
npm run deploy
```

## 🛠️ Environment Variables
For the chatbot to work on GitHub Pages, add these secrets in your repository:
1. Go to Settings > Secrets and variables > Actions
2. Add `VITE_OPENROUTER_API_KEY` with your OpenRouter API key

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
