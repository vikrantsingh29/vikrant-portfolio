import React from 'react'
import { Link } from 'react-router-dom'
import { trackProjectClick } from '../utils/analytics'
import { FaArrowRight } from 'react-icons/fa'

export default function ProjectCard({ project }) {
    const handleProjectClick = () => {
        trackProjectClick(project.slug, project.title)
    }

    return (
        <Link
            to={`${import.meta.env.BASE_URL}article/${project.slug}`}
            className="group block h-full"
            onClick={handleProjectClick}
        >
            <div className="project-card h-full">
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex flex-col gap-4 relative z-10 h-full">
                    {/* Header */}
                    <div>
                        <h3 className="text-base font-semibold text-white group-hover:text-violet-200 transition-colors leading-snug mb-2">
                            {project.title}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                            {project.description}
                        </p>
                    </div>

                    {/* Stack tags */}
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                        {project.stack.map(tech => (
                            <span key={tech} className="tech-tag">{tech}</span>
                        ))}
                    </div>

                    {/* View link */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 group-hover:text-violet-400 transition-colors pt-2 border-t border-white/5">
                        <span>View project</span>
                        <FaArrowRight className="w-2.5 h-2.5 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>
        </Link>
    )
}
