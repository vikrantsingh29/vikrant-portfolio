import React, { useState } from 'react'
import { SITE, PROJECTS } from '../config'
import Hero from '../ui/Hero'
import TerminalSkills from '../ui/TerminalSkills'
import ProjectCard from '../ui/ProjectCard'
import WorkExperience from '../ui/WorkExperience'
import Education from '../ui/Education'
import Chatbot from '../ui/Chatbot'
import ThemeToggle from '../ui/ThemeToggle'


export default function App() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    return (
        <div className="min-h-screen bg-terminal-bg">
            {/* Matrix background effect */}
            <div className="matrix-bg"></div>

            <header className="terminal-nav sticky top-0 z-40">
                <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="terminal-prompt">root@</span>
                        <span className="font-bold text-terminal-green text-sm sm:text-base">{SITE.name.toLowerCase().replace(' ', '_')}</span>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-4">
                        <a href="#experience" className="nav-link">experience</a>
                        <a href="#education" className="nav-link">education</a>
                        <a href="#projects" className="nav-link">projects</a>
                        <a href="#skills" className="nav-link">skills</a>
                        <a href="#contact" className="nav-link">contact</a>
                        <ThemeToggle/>
                    </div>
                    
                    {/* Mobile menu toggle */}
                    <div className="md:hidden flex items-center gap-2">
                        <ThemeToggle/>
                        <button 
                            onClick={toggleMobileMenu}
                            className="terminal-button text-xs px-2 py-1 flex items-center gap-1"
                            aria-label="Toggle mobile menu"
                        >
                            <span>menu</span>
                            <svg 
                                className={`w-3 h-3 transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </nav>

                {/* Mobile Navigation Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-terminal-bg border-t border-terminal-border">
                        <div className="max-w-6xl mx-auto px-4 py-4">
                            <nav className="flex flex-col space-y-3">
                                <a 
                                    href="#experience" 
                                    className="nav-link py-2 block"
                                    onClick={closeMobileMenu}
                                >
                                    experience
                                </a>
                                <a 
                                    href="#education" 
                                    className="nav-link py-2 block"
                                    onClick={closeMobileMenu}
                                >
                                    education
                                </a>
                                <a 
                                    href="#projects" 
                                    className="nav-link py-2 block"
                                    onClick={closeMobileMenu}
                                >
                                    projects
                                </a>
                                <a 
                                    href="#skills" 
                                    className="nav-link py-2 block"
                                    onClick={closeMobileMenu}
                                >
                                    skills
                                </a>
                                <a 
                                    href="#contact" 
                                    className="nav-link py-2 block"
                                    onClick={closeMobileMenu}
                                >
                                    contact
                                </a>
                            </nav>
                        </div>
                    </div>
                )}
            </header>

            <main id="top" className="max-w-6xl mx-auto px-4 sm:px-6">
                <Hero/>

                <section id="experience" className="py-12 sm:py-20">
                    <div className="mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-terminal-cyan mb-3">
                            Work Experience
                        </h2>
                        <p className="text-terminal-text-dim text-sm sm:text-base">
                            Professional journey and achievements
                        </p>
                    </div>
                    <WorkExperience/>
                </section>

                <section id="education" className="py-12 sm:py-20">
                    <div className="mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-terminal-cyan mb-3">
                            Education
                        </h2>
                        <p className="text-terminal-text-dim text-sm sm:text-base">
                            Academic background and qualifications
                        </p>
                    </div>
                    <Education/>
                </section>

                <section id="projects" className="py-12 sm:py-20">
                    <div className="mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-terminal-cyan mb-3">
                            Featured Projects
                        </h2>
                        <p className="text-terminal-text-dim text-sm sm:text-base">
                            Recent work and contributions
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {PROJECTS.map(p => (
                            <ProjectCard key={p.slug} project={p}/>
                        ))}
                    </div>
                </section>

                <section id="skills" className="py-12 sm:py-20">
                    <div className="mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-terminal-cyan mb-3">
                            Technical Skills
                        </h2>
                        <p className="text-terminal-text-dim text-sm sm:text-base">
                            Technologies and frameworks
                        </p>
                    </div>
                    <TerminalSkills/>
                </section>

                <section id="contact" className="py-12 sm:py-20">
                    <div className="mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-terminal-cyan mb-3">
                            Get In Touch
                        </h2>
                        <p className="text-terminal-text-dim text-sm sm:text-base">
                            Let's connect and collaborate
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="terminal-window">
                            <div className="terminal-header">
                                <span>contact_info</span>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-terminal-green">📧</span>
                                    <a
                                        className="text-terminal-cyan hover:text-terminal-amber transition-colors"
                                        href={`mailto:${SITE.email}`}
                                    >
                                        {SITE.email}
                                    </a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-terminal-green">📱</span>
                                    <span className="text-terminal-text">{SITE.phone}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-terminal-green">💼</span>
                                    <a
                                        className="text-terminal-cyan hover:text-terminal-amber transition-colors"
                                        href={SITE.socials.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        LinkedIn Profile
                                    </a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-terminal-green">💻</span>
                                    <a
                                        className="text-terminal-cyan hover:text-terminal-amber transition-colors"
                                        href={SITE.socials.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        GitHub Profile
                                    </a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-terminal-green">📍</span>
                                    <span className="text-terminal-text">{SITE.location}</span>
                                </div>
                            </div>
                        </div>

                        <div className="terminal-window">
                            <div className="terminal-header">
                                <span>quick_message</span>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    <p className="text-terminal-text text-sm leading-relaxed">
                                        Always open to interesting conversations about AI/ML, software development, 
                                        and collaboration opportunities.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <a 
                                            href={`mailto:${SITE.email}`}
                                            className="terminal-button text-center text-sm"
                                        >
                                            Send Email
                                        </a>
                                        <a 
                                            href={SITE.socials.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="terminal-button-outline text-center text-sm"
                                        >
                                            Connect on LinkedIn
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Floating Chatbot Widget */}
            <Chatbot/>
        </div>
    )
}