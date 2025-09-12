import React, { useState, useEffect } from 'react'
import { SITE } from '../config'


export default function Hero() {
    const [bootSequence, setBootSequence] = useState(0)
    const [typedText, setTypedText] = useState('')

    const bootMessages = [
        'Initializing portfolio system...',
        'Loading user profile: vikrant_singh',
        'Mounting /dev/skills...',
        'Starting AI/ML services...',
        'Portfolio system ready.',
    ]

    useEffect(() => {
        // Simulates boot sequence
        const bootInterval = setInterval(() => {
            setBootSequence(prev => {
                if (prev < bootMessages.length - 1) {
                    return prev + 1
                }
                clearInterval(bootInterval)
                return prev
            })
        }, 800)

        // Types the main headline
        setTimeout(() => {
            let index = 0
            const headline = SITE.headline
            const typeInterval = setInterval(() => {
                if (index <= headline.length) {
                    setTypedText(headline.slice(0, index))
                    index++
                } else {
                    clearInterval(typeInterval)
                }
            }, 100)
        }, bootMessages.length * 800 + 500)

        return () => clearInterval(bootInterval)
    }, [])

    return (
        <section className="py-16">
            <div className="matrix-bg"></div>

            {/* Terminal welcome screen */}
            <div className="terminal-window mb-12">
                <div className="terminal-content">
                    {/* Boot sequence */}
                    <div className="mb-6">
                        {bootMessages.map((message, index) => (
                            <div
                                key={index}
                                className={`text-sm mb-1 transition-opacity duration-300 ${
                                    index <= bootSequence ? 'opacity-100' : 'opacity-0'
                                }`}
                            >
                                <span className="text-terminal-green">[OK]</span>
                                <span className="text-terminal-text ml-2">{message}</span>
                            </div>
                        ))}
                    </div>

                    {/* Main content */}
                    {bootSequence >= bootMessages.length - 1 && (
                        <div>
                            <div className="mb-4">
                                <span className="terminal-prompt">vikrant@portfolio:~$ </span>
                                <span className="terminal-command">whoami</span>
                            </div>

                            <div className="terminal-output mb-6">
                                <div className="text-terminal-cyan text-2xl font-bold mb-2">
                                    {SITE.name}
                                </div>
                                <div className="text-terminal-amber mb-2">
                                    Role: {SITE.role}
                                </div>
                                <div className="text-terminal-text mb-4">
                                    Location: {SITE.location}
                                </div>
                            </div>

                            <div className="mb-4">
                                <span className="terminal-prompt">vikrant@portfolio:~$ </span>
                                <span className="terminal-command">echo "$MISSION"</span>
                            </div>

                            <div className="terminal-output mb-6">
                                <div className="text-lg text-terminal-text">
                                    {typedText}
                                    {typedText.length < SITE.headline.length && (
                                        <span className="animate-blink text-terminal-green">|</span>
                                    )}
                                </div>
                                <div className="text-terminal-text-dim mt-2">
                                    {SITE.subhead}
                                </div>
                            </div>

                            {/* Action buttons */}
                            {typedText.length >= SITE.headline.length && (
                                <div className="flex gap-4 flex-wrap">
                                    <a
                                        href="#projects"
                                        className="terminal-button"
                                    >
                                        ./view_projects.sh
                                    </a>
                                    <a
                                        href="#skills"
                                        className="terminal-button"
                                    >
                                        cat skills.cfg
                                    </a>
                                    <a
                                        href="#timeline"
                                        className="terminal-button"
                                    >
                                        git log --graph
                                    </a>
                                    <a
                                        href="#contact"
                                        className="terminal-button"
                                    >
                                        send_message()
                                    </a>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}