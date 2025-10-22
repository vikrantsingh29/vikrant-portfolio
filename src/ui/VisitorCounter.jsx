import React, { useState, useEffect } from 'react'

export default function VisitorCounter() {
    const [visitorCount, setVisitorCount] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Fetch real-time visitor count from Cloudflare Worker API
        const fetchVisitorCount = async () => {
            try {
                // Get the Worker URL from environment variable or use default
                const workerUrl = import.meta.env.VITE_VISITOR_COUNTER_API || 'https://vikrant-portfolio-visitor-counter.YOUR_SUBDOMAIN.workers.dev'
                
                // Fetch and increment the visitor count
                const response = await fetch(`${workerUrl}/api/visitors`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                
                if (!response.ok) {
                    throw new Error('API request failed')
                }
                
                const data = await response.json()
                
                if (data.success && data.count !== undefined) {
                    setVisitorCount(data.count)
                } else {
                    throw new Error('Invalid response format')
                }
                
                setIsLoading(false)
            } catch (error) {
                console.error('Failed to fetch visitor count:', error)
                
                // Fallback: Use session-based tracking for unique visitors
                // This is better than the old hardcoded 1200 approach
                try {
                    const sessionKey = 'portfolio_session_id'
                    const visitorCountKey = 'portfolio_total_visitors'
                    
                    let sessionId = sessionStorage.getItem(sessionKey)
                    
                    if (!sessionId) {
                        // New session - generate unique ID and increment counter
                        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
                        sessionStorage.setItem(sessionKey, sessionId)
                        
                        // Increment the visitor count in localStorage
                        const currentCount = parseInt(localStorage.getItem(visitorCountKey) || '0', 10)
                        const newCount = currentCount + 1
                        localStorage.setItem(visitorCountKey, newCount.toString())
                        setVisitorCount(newCount)
                    } else {
                        // Existing session - just show the count
                        const currentCount = parseInt(localStorage.getItem(visitorCountKey) || '0', 10)
                        setVisitorCount(currentCount)
                    }
                    
                    setIsLoading(false)
                } catch (fallbackError) {
                    console.error('Fallback tracking failed:', fallbackError)
                    // Show unavailable if all methods fail
                    setVisitorCount(null)
                    setIsLoading(false)
                }
            }
        }

        fetchVisitorCount()
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
                            {isLoading ? (
                                <span className="animate-pulse">...</span>
                            ) : visitorCount !== null ? (
                                visitorCount.toLocaleString()
                            ) : (
                                <span className="text-terminal-text-dim">Unavailable</span>
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
