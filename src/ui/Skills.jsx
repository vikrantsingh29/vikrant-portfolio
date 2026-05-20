import React, { useEffect, useRef } from 'react'
import { SKILLS } from '../config'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const categoryColors = {
    'Programming Languages': 'violet',
    'AI/ML & LLMs': 'cyan',
    'Backend & APIs': 'blue',
    'Data Engineering': 'emerald',
    'Web Scraping': 'amber',
    'Data Visualization': 'pink',
    'Databases': 'orange',
    'Cloud & DevOps': 'sky',
    'Geospatial': 'teal',
    'Other Tools': 'slate',
}

const colorMap = {
    violet: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    blue: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    pink: 'bg-pink-500/10 text-pink-300 border-pink-500/20',
    orange: 'bg-orange-500/10 text-orange-300 border-orange-500/20',
    sky: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
    teal: 'bg-teal-500/10 text-teal-300 border-teal-500/20',
    slate: 'bg-slate-500/10 text-slate-300 border-slate-500/20',
}

export default function Skills() {
    const containerRef = useRef(null)

    useEffect(() => {
        if (!containerRef.current) return
        const groups = containerRef.current.querySelectorAll('.skill-group')
        groups.forEach((el, i) => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                },
                y: 20,
                opacity: 0,
                duration: 0.5,
                delay: i * 0.06,
                ease: 'power2.out',
            })
        })
        return () => ScrollTrigger.getAll().forEach(t => t.kill())
    }, [])

    return (
        <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(SKILLS).map(([category, skills]) => {
                const colorKey = categoryColors[category] || 'slate'
                const tagClass = colorMap[colorKey] || colorMap['slate']
                return (
                    <div key={category} className="skill-group glass-card p-5">
                        <p className="skill-group-title">{category}</p>
                        <div className="flex flex-wrap gap-1.5">
                            {skills.map(skill => (
                                <span
                                    key={skill}
                                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border transition-all duration-200 hover:scale-105 cursor-default ${tagClass}`}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
