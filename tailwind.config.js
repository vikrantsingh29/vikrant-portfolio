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
                navy: {
                    950: '#030712',
                    900: '#0a0e1a',
                    800: '#0f1526',
                    700: '#141d35',
                    600: '#1a2444',
                },
                accent: {
                    violet: '#8b5cf6',
                    cyan: '#06b6d4',
                    blue: '#3b82f6',
                    pink: '#ec4899',
                },
            },
            animation: {
                'gradient-shift': 'gradientShift 8s ease infinite',
                'float': 'float 6s ease-in-out infinite',
                'glow-pulse': 'glowPulse 2s ease-in-out infinite',
            },
            keyframes: {
                gradientShift: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                glowPulse: {
                    '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
                    '50%': { opacity: '1', transform: 'scale(1.05)' },
                },
            },
            backgroundSize: {
                '300%': '300%',
            },
        },
    },
    darkMode: 'class',
    plugins: [],
}