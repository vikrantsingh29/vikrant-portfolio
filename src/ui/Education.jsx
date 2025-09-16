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
                    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <div className="p-6 border-b border-gray-200 dark:border-slate-600">
                            <div className="flex flex-col space-y-3">
                                {/* Degree title and institution */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                            {item.title}
                                        </h3>
                                        <p className="text-blue-600 dark:text-blue-400 font-semibold text-base">
                                            {item.institution}
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <span className="text-amber-600 dark:text-amber-400 text-sm font-mono bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded">
                                            {item.year}
                                        </span>
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
                            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                                {item.description}
                            </p>

                            {/* Expandable Modules Section */}
                            {item.modules && (
                                <div className="mt-4">
                                    <button
                                        onClick={() => toggleModules(index)}
                                        className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm transition-colors"
                                    >
                                        <span className={`transform transition-transform ${expandedModules[index] ? 'rotate-90' : ''}`}>
                                            ▶
                                        </span>
                                        {expandedModules[index] ? 'Hide' : 'Click to see'} subjects/modules undertaken
                                    </button>

                                    {expandedModules[index] && (
                                        <div className="mt-4 space-y-4 bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                                            {Object.entries(item.modules).map(([category, modules], categoryIndex) => (
                                                <div key={categoryIndex} className="space-y-2">
                                                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm border-b border-gray-200 dark:border-slate-600 pb-1">
                                                        {category}
                                                    </h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                        {modules.map((module, moduleIndex) => (
                                                            <div
                                                                key={moduleIndex}
                                                                className="flex items-center gap-2 text-xs bg-white dark:bg-slate-800 rounded px-2 py-1 border border-gray-200 dark:border-slate-600"
                                                            >
                                                                <span className="text-green-500 dark:text-green-400 text-xs">•</span>
                                                                <span className="text-gray-700 dark:text-gray-300">{module}</span>
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
            ))}
        </div>
    )
}
