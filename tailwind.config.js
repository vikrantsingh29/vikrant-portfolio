/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
                mono: ['JetBrains Mono', 'Monaco', 'Menlo', 'Ubuntu Mono', 'ui-monospace', 'SFMono-Regular', 'monospace']
            },
            colors: {
                brand: {
                    50: '#eef6ff', 100: '#d9ecff', 200: '#b6d7ff', 300: '#8dbdff', 400: '#5f9cff',
                    500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a'
                },
                terminal: {
                    bg: '#0a0a0a',
                    surface: '#1a1a1a',
                    border: '#333333',
                    green: '#00ff41',
                    amber: '#ffb000',
                    cyan: '#00ffff',
                    red: '#ff4444',
                    text: '#e0e0e0',
                    'text-dim': '#888888'
                }
            },
            animation: {
                'typing': 'typing 3s steps(40, end), blink 1s infinite',
                'blink': 'blink 1s infinite'
            }
        },
    },
    darkMode: 'class',
    plugins: [],
}