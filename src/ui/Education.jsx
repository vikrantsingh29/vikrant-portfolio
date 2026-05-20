import React, { useState, useEffect, useRef } from 'react'
import { EDUCATION } from '../config'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Education() {
    const [expandedModules, setExpandedModules] = useState({})
    const containerRef = useRef(null)

    useEffect(() => {
        if (!containerRef.current) return
        const items = containerRef.current.querySelectorAll('.edu-item')
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
                delay: i * 0.1,
                ease: 'power2.out',
            })
        })
        return () => ScrollTrigger.getAll().forEach(t => t.kill())
    }, [])

    const toggleModules = (idx) => {
        setExpandedModules(prev => ({ ...prev, [idx]: !prev[idx] }))
    }

    return (
        <div ref={containerRef} className="space-y-4">
            {EDUCATION.map((item, index) => (
                <div key={index} className="edu-item relative pl-10">
                    {index < EDUCATION.length - 1 && <div className="timeline-line" />}
                    <div className="absolute left-0 top-5 timeline-dot" />

                    <div className="glass-card p-5 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-base font-semibold text-white mb-1">{item.title}</h3>
                                <p className="text-violet-400 text-sm font-medium">{item.institution}</p>
                                <p className="text-slate-500 text-xs mt-1">{item.location}</p>
                            </div>
                            <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2 py-1 rounded-md self-start flex-shrink-0">
                                {item.year}
                            </span>
                        </div>

                        <p className="text-slate-400 text-sm leading-relaxed mt-4">{item.description}</p>

                        {item.modules && (
                            <div className="mt-4">
                                <button
                                    onClick={() => toggleModules(index)}
                                    className="flex items-center gap-2 text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors"
                                >
                                    <svg
                                        className={`w-3.5 h-3.5 transition-transform duration-200 ${expandedModules[index] ? 'rotate-90' : ''}`}
                                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    {expandedModules[index] ? 'Hide' : 'View'} course modules
                                </button>

                                {expandedModules[index] && (
                                    <div className="mt-4 space-y-4 bg-white/[0.02] rounded-lg p-4 border border-white/5">
                                        {Object.entries(item.modules).map(([cat, mods], ci) => (
                                            <div key={ci}>
                                                <h4 className="text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wide">{cat}</h4>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {mods.map((mod, mi) => (
                                                        <span key={mi} className="text-xs bg-white/5 border border-white/10 text-slate-400 px-2 py-0.5 rounded-md">
                                                            {mod}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
