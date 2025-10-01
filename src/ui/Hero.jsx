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
        <section className="py-8 sm:py-16">
            <div className="matrix-bg"></div>

            {/* Terminal welcome screen */}
            <div className="terminal-window mb-8 sm:mb-12">
                <div className="terminal-header">
                    <span className="text-xs sm:text-sm">vikrant@portfolio:~$ ./welcome.sh</span>
                </div>
                <div className="p-4 sm:p-6 space-y-2 sm:space-y-3">
                    {bootMessages.slice(0, bootSequence + 1).map((message, index) => (
                        <div key={index} className="text-terminal-green text-xs sm:text-sm">
                            <span className="terminal-prompt">$</span> {message}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                <div className="space-y-4 sm:space-y-6">
                    <div>
                        <div className="flex items-center gap-4 sm:gap-6 mb-2 sm:mb-4">
                            <img 
                                src={`${import.meta.env.BASE_URL}assets/Display_Picture.jpg`}
                                alt="Vikrant Singh" 
                                className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full object-cover border-2 border-terminal-green shadow-lg"
                            />
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-terminal-text">
                                {SITE.name}
                            </h1>
                        </div>
                        <div className="text-lg sm:text-xl text-terminal-cyan mb-2 sm:mb-4">
                            {SITE.role}
                        </div>
                        <div className="h-8 sm:h-10">
                            <p className="text-terminal-green text-sm sm:text-base">
                                {typedText}
                                <span className="animate-pulse">|</span>
                            </p>
                        </div>
                    </div>

                    <p className="text-terminal-text-dim text-sm sm:text-base leading-relaxed">
                        {SITE.subhead}
                    </p>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <a 
                            href="#projects" 
                            className="terminal-button text-center"
                        >
                            ./view_projects.sh
                        </a>
                        <a 
                            href={`mailto:${SITE.email}`}
                            className="terminal-button-outline text-center"
                        >
                            contact.sh
                        </a>
                    </div>

                    {/* Contact info */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                            <span className="text-terminal-green">📍</span>
                            <span className="text-terminal-text">{SITE.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-terminal-green">📞</span>
                            <span className="text-terminal-text">{SITE.phone}</span>
                        </div>
                    </div>
                </div>

                {/* ASCII art or terminal animation */}
                <div className="hidden lg:block">
                    <div className="terminal-window">
                        <div className="terminal-header">
                            <span className="text-sm">system_info.sh</span>
                        </div>
                        <div className="p-6 space-y-2 text-sm">
                            <div><span className="text-terminal-green">OS:</span> <span className="text-terminal-text">Portfolio v2025.1</span></div>
                            <div><span className="text-terminal-green">Role:</span> <span className="text-terminal-text">{SITE.role}</span></div>
                            <div><span className="text-terminal-green">Location:</span> <span className="text-terminal-text">{SITE.location}</span></div>
                            <div><span className="text-terminal-green">Status:</span> <span className="text-terminal-cyan">Available for opportunities</span></div>
                            <div><span className="text-terminal-green">Uptime:</span> <span className="text-terminal-text">7+ years experience</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}