import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'


// IMPORTANT: Set base to your repo name when deploying to GitHub Pages, e.g., '/vikrant.github.io/'
const repoBase = process.env.GH_PAGES_BASE || '/' // e.g. '/vikrant-portfolio/'


export default defineConfig({
    plugins: [react()],
    base: repoBase,
    // Ensures environment variables starting with VITE_ are exposed to the client
    envPrefix: 'VITE_',
    define: {
        // Fallback for environment variables in production
        'import.meta.env.VITE_OPENROUTER_API_KEY': JSON.stringify(process.env.VITE_OPENROUTER_API_KEY || ''),
    }
})