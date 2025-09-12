import React, { useState, useEffect } from 'react'
import { TIMELINE } from '../config'

export default function TerminalTimeline() {
    const [visibleItems, setVisibleItems] = useState(0)
    const [currentCommand, setCurrentCommand] = useState('')
    const [showPrompt, setShowPrompt] = useState(true)

    useEffect(() => {
        // Adds typing effect for git log command
        const command = 'git log --oneline --graph --reverse'
        let index = 0

        const typeInterval = setInterval(() => {
            if (index <= command.length) {
                setCurrentCommand(command.slice(0, index))
                index++
            } else {
                clearInterval(typeInterval)
                setShowPrompt(false)
                // Shows timeline items progressively
                setTimeout(() => {
                    const itemInterval = setInterval(() => {
                        setVisibleItems(prev => {
                            if (prev < TIMELINE.length) {
                                return prev + 1
                            }
                            clearInterval(itemInterval)
                            return prev
                        })
                    }, 800)
                }, 500)
            }
        }, 80)

        return () => clearInterval(typeInterval)
    }, [])

    const getCommitHash = (index) => {
        // Generates realistic-looking commit hashes
        const hashes = ['a1b2c3d', 'e4f5g6h', 'i7j8k9l']
        return hashes[index] || `${Math.random().toString(36).substr(2, 7)}`
    }

    const getBranchIndicator = (index) => {
        if (index === 0) return '* '
        return index % 2 === 0 ? '| ' : '|\\'
    }

    return (
        <div className="terminal-window">
            <div className="terminal-content">
                {/* Terminal prompt and command */}
                <div className="mb-6">
                    <span className="terminal-prompt">vikrant@portfolio:~$ </span>
                    <span className="terminal-command">{currentCommand}</span>
                    {showPrompt && <span className="animate-blink text-terminal-green">|</span>}
                </div>

                {/* Git log output */}
                {!showPrompt && (
                    <div className="terminal-output font-mono text-sm">
                        {TIMELINE.map((item, index) => (
                            <div
                                key={index}
                                className={`mb-4 transition-all duration-500 ${
                                    index < visibleItems 
                                        ? 'opacity-100 translate-y-0' 
                                        : 'opacity-0 translate-y-4'
                                }`}
                                style={{ transitionDelay: `${index * 200}ms` }}
                            >
                                {/* Git graph visualization */}
                                <div className="flex items-start gap-2">
                                    <span className="text-terminal-green font-bold min-w-[20px]">
                                        {getBranchIndicator(index)}
                                    </span>
                                    <span className="text-terminal-amber font-mono text-xs min-w-[70px]">
                                        {getCommitHash(index)}
                                    </span>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-terminal-cyan font-semibold">
                                                {item.title}
                                            </span>
                                            <span className="text-terminal-text-dim text-xs">
                                                @ {item.company}
                                            </span>
                                        </div>
                                        <div className="text-terminal-text text-xs mb-2">
                                            {item.description}
                                        </div>
                                        <div className="flex items-center gap-4 text-xs">
                                            <span className="text-terminal-amber">
                                                📅 {item.year}
                                            </span>
                                            <span className="text-terminal-green">
                                                +{Math.floor(Math.random() * 100) + 50} commits
                                            </span>
                                            <span className="text-terminal-red">
                                                -{Math.floor(Math.random() * 20) + 5} bugs
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Final prompt */}
                        {visibleItems >= TIMELINE.length && (
                            <div className="mt-6 pt-4 border-t border-terminal-border">
                                <div className="mb-2 text-terminal-text-dim text-xs">
                                    # End of git log - {TIMELINE.length} commits shown
                                </div>
                                <div className="flex items-center">
                                    <span className="terminal-prompt">vikrant@portfolio:~$ </span>
                                    <span className="animate-blink text-terminal-green ml-1">█</span>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
