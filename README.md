# Vikrant Portfolio

A modern AI-powered portfolio website with an intelligent chatbot that can answer questions about Vikrant Singh's background, skills, and experience.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure AI Chatbot (Optional but Recommended)

The portfolio includes an AI chatbot powered by OpenRouter. To enable full AI functionality:

1. **Sign up for OpenRouter**: Go to [https://openrouter.ai/](https://openrouter.ai/) and create an account
2. **Get your API key**: Navigate to your dashboard and generate an API key
3. **Configure environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env and replace 'your_openrouter_api_key_here' with your actual API key
   ```

**Note**: The chatbot will work without an API key using built-in fallback responses, but won't have dynamic AI conversations.

### 3. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

## Build & Deploy to GitHub Pages
1. Create repo and push.
2. Set `GH_PAGES_BASE` env to `/<your-repo-name>/` when building for Pages, or edit `vite.config.js` base.
3. `npm run build`
4. `npm run deploy` (uses gh-pages to push `dist` to `gh-pages` branch). Enable Pages to serve from that branch.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_OPENROUTER_API_KEY` | Your OpenRouter API key for AI chatbot functionality | No (fallback responses used) |
| `VITE_OPENROUTER_PROXY` | Optional Cloudflare Worker URL for API proxy | No |

## Chatbot Configuration

The chatbot is located in `src/ui/Chatbot.jsx` and includes:

- **AI-powered responses** when OpenRouter API key is configured
- **Intelligent fallback responses** for common questions about Vikrant's background
- **Contextual knowledge** about projects, skills, and experience
- **Professional conversation flow** with loading states and error handling

### Customizing the Chatbot

To customize the chatbot for your own portfolio:

1. **Update the system prompt** in `Chatbot.jsx` (lines 26-41)
2. **Modify fallback responses** in the `generateFallbackResponse` function (lines 45-69)
3. **Update personal information** in `src/config.js`

## Content Articles
- Edit Markdown files in `public/content/*.md`. Clicking a project opens the corresponding article.