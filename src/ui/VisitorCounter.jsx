import React, { useState, useEffect } from 'react'

export default function VisitorCounter() {
    const [visitorCount, setVisitorCount] = useState(1200)

    useEffect(() => {
        // Gets current visit count for this browser and increments
        const currentCount = parseInt(localStorage.getItem('portfolioVisitorCount') || '1200', 10)
        const newCount = currentCount + 1

        // Saves updated count to localStorage
        localStorage.setItem('portfolioVisitorCount', newCount.toString())

        // Updates the state
        setVisitorCount(newCount)
    }, [])

    return (
        <div className="fixed bottom-4 left-4 z-30">
            <div className="terminal-window bg-terminal-bg/90 backdrop-blur-sm border border-terminal-border rounded-lg shadow-lg">
                <div className="terminal-header text-xs">
                    <span>visitor_stats</span>
                </div>
                <div className="p-3">
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-terminal-green">👥</span>
                        <span className="text-terminal-text-dim">Visits:</span>
                        <span className="text-terminal-cyan font-mono font-bold">
                            {visitorCount.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
