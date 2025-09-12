import React from 'react'
import { SKILLS } from '../config'

export default function SkillBars() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILLS.map(skill => (
                <div key={skill.name} className="group">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-slate-900 dark:text-slate-100">{skill.name}</h3>
                            <span className="text-sm font-medium text-brand-600 dark:text-brand-400">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 mb-2">
                            <div
                                className="bg-gradient-to-r from-brand-500 to-brand-600 h-2.5 rounded-full transition-all duration-700 ease-out group-hover:from-brand-400 group-hover:to-brand-500"
                                style={{
                                    width: `${skill.level}%`,
                                    animation: 'slideIn 1s ease-out 0.1s both'
                                }}
                            />
                        </div>
                        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                            <span>Beginner</span>
                            <span>Expert</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}