import React, {useEffect, useState} from 'react'


export default function ThemeToggle() {
    const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
    useEffect(() => {
        const root = document.documentElement
        if (dark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark')
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light')
        }
    }, [dark])
    return (
        <button aria-label="Toggle theme" onClick={() => setDark(d => !d)}
                className="terminal-button text-xs">
            {dark ? './dark_mode.sh' : './light_mode.sh'}
        </button>
    )
}