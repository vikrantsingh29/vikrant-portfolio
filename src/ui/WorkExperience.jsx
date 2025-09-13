import React, { useState, useEffect } from 'react'
import { WORK_EXPERIENCE } from '../config'

export default function WorkExperience() {
    const [visibleItems, setVisibleItems] = useState(0)
    const [expandedItems, setExpandedItems] = useState(new Set())

    useEffect(() => {
        // Shows timeline items progressively
        const itemInterval = setInterval(() => {
            setVisibleItems(prev => {
                if (prev < WORK_EXPERIENCE.length) {
                    return prev + 1
                }
                clearInterval(itemInterval)
                return prev
            })
        }, 300)

        return () => clearInterval(itemInterval)
    }, [])

    const toggleExpanded = (index) => {
        setExpandedItems(prev => {
            const newSet = new Set(prev)
            if (newSet.has(index)) {
                newSet.delete(index)
            } else {
                newSet.add(index)
            }
            return newSet
        })
    }

    return (
        <div className="space-y-8">
            {WORK_EXPERIENCE.map((item, index) => (
                <div
                    key={index}
                    className={`transition-all duration-500 ${
                        index < visibleItems 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                >
                    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <div 
                            className="cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors p-6 border-b border-gray-200 dark:border-slate-600"
                            onClick={() => toggleExpanded(index)}
                        >
                            <div className="flex flex-col space-y-3">
                                {/* Job title and company - now on separate lines for mobile */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                                            {item.title}
                                        </h3>
                                        <p className="text-blue-600 dark:text-blue-400 font-semibold text-base">
                                            {item.company}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3 flex-shrink-0">
                                        <span className="text-amber-600 dark:text-amber-400 text-sm font-mono bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded">
                                            {item.year}
                                        </span>
                                        <svg 
                                            className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform ${
                                                expandedItems.has(index) ? 'rotate-180' : ''
                                            }`} 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-green-600 dark:text-green-400">📍</span>
                                    <span className="text-gray-600 dark:text-gray-300">{item.location}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-6">
                            {/* Brief description - always visible */}
                            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                                {item.description}
                            </p>

                            {/* Expandable detailed content */}
                            <div className={`transition-all duration-300 overflow-hidden ${
                                expandedItems.has(index) ? 'max-h-none opacity-100' : 'max-h-0 opacity-0'
                            }`}>
                                <div className="border-t border-gray-200 dark:border-slate-600 pt-6 space-y-6">
                                    {/* Detailed responsibilities */}
                                    <div>
                                        <h4 className="text-blue-700 dark:text-blue-300 font-semibold text-base mb-3">
                                            Key Responsibilities & Achievements:
                                        </h4>
                                        <ul className="space-y-3">
                                            {item.responsibilities.map((responsibility, respIndex) => (
                                                <li key={respIndex} className="flex items-start gap-3 text-sm">
                                                    <span className="text-green-600 dark:text-green-400 mt-1 text-sm font-bold">•</span>
                                                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                                        {responsibility}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Tech stack */}
                                    <div>
                                        <h4 className="text-blue-700 dark:text-blue-300 font-semibold text-base mb-3">
                                            Technologies Used:
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {item.techStack.map((tech, techIndex) => (
                                                <span 
                                                    key={techIndex}
                                                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm rounded-full font-medium border border-blue-200 dark:border-blue-700"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Click to expand hint */}
                            {!expandedItems.has(index) && (
                                <div className="text-center mt-4">
                                    <button 
                                        onClick={() => toggleExpanded(index)}
                                        className="text-blue-600 dark:text-blue-400 text-sm hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium"
                                    >
                                        Click to view detailed responsibilities and tech stack ↓
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
