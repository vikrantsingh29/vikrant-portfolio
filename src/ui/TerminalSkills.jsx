import React, { useState, useEffect } from 'react'
import { SKILLS } from '../config'

export default function TerminalSkills() {
    const [visibleSections, setVisibleSections] = useState(new Set())
    const [typingText, setTypingText] = useState('')

    useEffect(() => {
        // Adds typing effect for the command
        const command = 'cat ~/.config/skills/*'
        let index = 0
        const typeInterval = setInterval(() => {
            if (index <= command.length) {
                setTypingText(command.slice(0, index))
                index++
            } else {
                clearInterval(typeInterval)
                // Shows all skill sections after typing completes
                setTimeout(() => {
                    setVisibleSections(new Set(Object.keys(SKILLS)))
                }, 500)
            }
        }, 100)

        return () => clearInterval(typeInterval)
    }, [])

    return (
        <div className="terminal-window">
            <div className="terminal-content">
                {/* Terminal prompt and command */}
                <div className="mb-6">
                    <span className="terminal-prompt">vikrant@portfolio:~$ </span>
                    <span className="terminal-command">{typingText}</span>
                    {typingText.length > 0 && <span className="animate-blink">|</span>}
                </div>

                {/* Skills output */}
                <div className="terminal-output space-y-4">
                    {Object.entries(SKILLS).map(([category, skills], index) => (
                        <div
                            key={category}
                            className={`skill-category transition-all duration-500 ${
                                visibleSections.has(category) 
                                    ? 'opacity-100 translate-y-0' 
                                    : 'opacity-0 translate-y-4'
                            }`}
                            style={{ transitionDelay: `${index * 200}ms` }}
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <span className="terminal-prompt">&gt;</span>
                                <h3 className="text-terminal-green font-mono text-sm uppercase tracking-wider">
                                    {category.replace(/[&\/]/g, '_').toLowerCase()}
                                </h3>
                            </div>
                            <div className="flex flex-wrap gap-2 ml-4">
                                {skills.map((skill, skillIndex) => (
                                    <span
                                        key={skill}
                                        className="skill-tag transition-all duration-300 hover:bg-terminal-green hover:text-terminal-bg cursor-default"
                                        style={{
                                            animationDelay: `${(index * 200) + (skillIndex * 100)}ms`,
                                            opacity: visibleSections.has(category) ? 1 : 0
                                        }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Command completion indicator */}
                    {visibleSections.size === Object.keys(SKILLS).length && (
                        <div className="mt-6 pt-4 border-t border-terminal-border">
                            <span className="terminal-prompt">vikrant@portfolio:~$ </span>
                            <span className="terminal-output text-terminal-text-dim">
                                # Skills loaded successfully. Ready for new challenges!
                            </span>
                            <span className="animate-blink text-terminal-green ml-1">█</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
