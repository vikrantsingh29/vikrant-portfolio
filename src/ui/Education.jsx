import React, { useState, useEffect } from 'react'
import { EDUCATION } from '../config'

export default function Education() {
    const [visibleItems, setVisibleItems] = useState(0)
    const [expandedModules, setExpandedModules] = useState({})

    useEffect(() => {
        // Shows education items progressively
        const itemInterval = setInterval(() => {
            setVisibleItems(prev => {
                if (prev < EDUCATION.length) {
                    return prev + 1
                }
                clearInterval(itemInterval)
                return prev
            })
        }, 300)

        return () => clearInterval(itemInterval)
    }, [])

    // Toggles module visibility for specific education item
    const toggleModules = (educationIndex) => {
        setExpandedModules(prev => ({
            ...prev,
            [educationIndex]: !prev[educationIndex]
        }))
    }

    return (
        <div className="space-y-8">
            {EDUCATION.map((item, index) => (
                <div
                    key={index}
                    className={`transition-all duration-500 ${
                        index < visibleItems 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                >
                    {/* Modern vertical timeline bar */}
                    <div className="relative pl-8 pb-8 timeline-education-item">
                        {/* Vertical line */}
                        {index < EDUCATION.length - 1 && (
                            <div className="timeline-vertical-line absolute left-2 top-8 bottom-0 w-0.5 bg-slate-300 dark:bg-slate-700"></div>
                        )}
                        
                        {/* Timeline dot */}
                        <div className="timeline-dot absolute left-0 top-2 w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-500 border-4 border-white dark:border-slate-950"></div>
                        
                        <div className="education-card bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <div className="education-header p-6 border-b border-gray-200 dark:border-slate-600">
                            <div className="flex flex-col space-y-3">
                                {/* Degree title and institution */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="education-title text-lg font-bold text-gray-900 dark:text-white">
                                            {item.title}
                                        </h3>
                                        <p className="education-institution text-blue-600 dark:text-blue-400 font-semibold text-base">
                                            {item.institution}
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <span className="education-year text-amber-600 dark:text-amber-400 text-sm font-mono bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded">
                                            {item.year}
                                        </span>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="education-location-icon text-green-600 dark:text-green-400">📍</span>
                                    <span className="education-location text-gray-600 dark:text-gray-300">{item.location}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-6">
                            <p className="education-description text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                                {item.description}
                            </p>

                            {/* Expandable Modules Section */}
                            {item.modules && (
                                <div className="mt-4">
                                    <button
                                        onClick={() => toggleModules(index)}
                                        className="education-expand-btn flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm transition-colors"
                                    >
                                        <span className={`transform transition-transform ${expandedModules[index] ? 'rotate-90' : ''}`}>
                                            ▶
                                        </span>
                                        {expandedModules[index] ? 'Hide' : 'Click to see'} subjects/modules undertaken
                                    </button>

                                    {expandedModules[index] && (
                                        <div className="education-modules mt-4 space-y-4 bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                                            {Object.entries(item.modules).map(([category, modules], categoryIndex) => (
                                                <div key={categoryIndex} className="space-y-2">
                                                    <h4 className="education-module-category font-semibold text-gray-900 dark:text-white text-sm border-b border-gray-200 dark:border-slate-600 pb-1">
                                                        {category}
                                                    </h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                        {modules.map((module, moduleIndex) => (
                                                            <div
                                                                key={moduleIndex}
                                                                className="education-module-item flex items-center gap-2 text-xs bg-white dark:bg-slate-800 rounded px-2 py-1 border border-gray-200 dark:border-slate-600"
                                                            >
                                                                <span className="education-module-bullet text-green-500 dark:text-green-400 text-xs">•</span>
                                                                <span className="education-module-text text-gray-700 dark:text-gray-300">{module}</span>
                                                            </div>
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
                    </div>
                </div>
            ))}
        </div>
    )
}
