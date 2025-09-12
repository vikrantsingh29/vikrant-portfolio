import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'


// IMPORTANT: Set base to your repo name when deploying to GitHub Pages, e.g., '/vikrant.github.io/'
const repoBase = process.env.GH_PAGES_BASE || '/' // e.g. '/vikrant-portfolio/'


export default defineConfig({
    plugins: [react()],
    base: repoBase,
})