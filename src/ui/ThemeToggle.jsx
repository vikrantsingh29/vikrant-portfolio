import React, { useEffect, useState } from 'react'

export default function ThemeToggle() {
    const [dark, setDark] = useState(() => {
        // Defaults to dark mode, checks localStorage override
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('theme')
            if (stored) return stored === 'dark'
            // Returns true for dark mode as default instead of system preference
            return true
        }
        return true
    })

    useEffect(() => {
        const root = document.documentElement
        if (dark) {
            root.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            root.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }, [dark])

    return (
        <button 
            aria-label="Toggle theme" 
            onClick={() => setDark(d => !d)}
            className="terminal-button text-xs flex items-center gap-2"
        >
            {dark ? (
                <>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5 0a1 1 0 100-2 1 1 0 000 2zM5 8a1 1 0 100-2 1 1 0 000 2zm5 0a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    change theme
                </>
            ) : (
                <>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                    dark terminal
                </>
            )}
        </button>
    )
}