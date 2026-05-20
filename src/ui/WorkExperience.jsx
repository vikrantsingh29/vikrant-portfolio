import React, { useState, useEffect, useRef } from 'react'
import { WORK_EXPERIENCE } from '../config'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function WorkExperience() {
    const [expandedItems, setExpandedItems] = useState(new Set([0]))
    const containerRef = useRef(null)

    useEffect(() => {
        if (!containerRef.current) return
        const items = containerRef.current.querySelectorAll('.exp-item')
        items.forEach((el, i) => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    toggleActions: 'play none none none',
                },
                x: -30,
                opacity: 0,
                duration: 0.6,
                delay: i * 0.05,
                ease: 'power2.out',
            })
        })
        return () => ScrollTrigger.getAll().forEach(t => t.kill())
    }, [])

    const toggleExpanded = (index) => {
        setExpandedItems(prev => {
            const next = new Set(prev)
            next.has(index) ? next.delete(index) : next.add(index)
            return next
        })
    }

    return (
        <div ref={containerRef} className="space-y-4">
            {WORK_EXPERIENCE.map((item, index) => (
                <div key={index} className="exp-item relative pl-10">
                    {/* Timeline line */}
                    {index < WORK_EXPERIENCE.length - 1 && (
                        <div className="timeline-line" />
                    )}

                    {/* Dot */}
                    <div className="absolute left-0 top-5 timeline-dot" />

                    {/* Card */}
                    <div className="glass-card overflow-visible">
                        {/* Header */}
                        <button
                            className="w-full text-left p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4"
                            onClick={() => toggleExpanded(index)}
                        >
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <h3 className="text-base font-semibold text-white">{item.title}</h3>
                                </div>
                                <p className="text-violet-400 text-sm font-medium">{item.company}</p>
                                <p className="text-slate-500 text-xs mt-1">{item.location}</p>
                            </div>
                            <div className="flex items-center gap-3 flex-shrink-0">
                                <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2 py-1 rounded-md whitespace-nowrap">
                                    {item.year}
                                </span>
                                <svg
                                    className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${expandedItems.has(index) ? 'rotate-180' : ''}`}
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </button>

                        {/* Body */}
                        <div className={`transition-all duration-400 overflow-hidden ${expandedItems.has(index) ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="px-5 sm:px-6 pb-6 border-t border-white/5 pt-4 space-y-5">
                                <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>

                                {/* Responsibilities */}
                                <ul className="space-y-2">
                                    {item.responsibilities.map((r, i) => (
                                        <li key={i} className="flex items-start gap-2.5 text-sm text-slate-400">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
                                            {r}
                                        </li>
                                    ))}
                                </ul>

                                {/* Tech stack */}
                                <div className="flex flex-wrap gap-1.5 pt-2">
                                    {item.techStack.map(tech => (
                                        <span key={tech} className="tech-tag tech-tag-cyan">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
