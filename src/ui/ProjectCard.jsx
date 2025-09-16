import React from 'react'
import {Link} from 'react-router-dom'
import { trackProjectClick } from '../utils/analytics'


export default function ProjectCard({project}) {
    // Handles project click tracking
    const handleProjectClick = () => {
        trackProjectClick(project.slug, project.title);
    };

    return (
        <Link
            to={`${import.meta.env.BASE_URL}article/${project.slug}`}
            className="group block"
            onClick={handleProjectClick}
        >
            <div className="project-card">
                {/* Terminal-style header */}
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-terminal-border">
                    <span className="terminal-prompt">$</span>
                    <span className="text-terminal-cyan text-xs font-mono">
                        cd projects/{project.slug.replace(/-/g, '_')}
                    </span>
                </div>

                {/* Project content */}
                <div className="space-y-3">
                    <h3 className="project-title text-base">
                        {project.title}
                    </h3>

                    <p className="project-description">
                        {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="project-stack">
                        {project.stack.map(tech => (
                            <span key={tech} className="stack-tag">
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Terminal command to view */}
                    <div className="mt-4 pt-3 border-t border-terminal-border text-xs">
                        <span className="terminal-prompt">$</span>
                        <span className="text-terminal-text-dim ml-2">
                            cat README.md
                        </span>
                        <span className="text-terminal-green ml-2">→</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}