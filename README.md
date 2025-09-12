# Vikrant Portfolio


## Quickstart
```bash
npm i # or npm i / yarn
npm dev
```


## Build & Deploy to GitHub Pages
1. Create repo and push.
2. Set `GH_PAGES_BASE` env to `/<your-repo-name>/` when building for Pages, or edit `vite.config.js` base.
3. `pnpm build`
4. `pnpm deploy` (uses gh-pages to push `dist` to `gh-pages` branch). Enable Pages to serve from that branch.


## Chatbot via OpenRouter
- Deploy the provided Cloudflare Worker and set `VITE_OPENROUTER_PROXY` to the Worker URL.
- Add a system prompt in `Chatbot.jsx` tailored to what the bot should answer about you.


## Content Articles
- Edit Markdown files in `public/content/*.md`. Clicking a project opens the corresponding article.