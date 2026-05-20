import React, { useState, useEffect, useRef } from 'react'
import { SITE, PROJECTS, SKILLS, WORK_EXPERIENCE, EDUCATION } from '../config'
import Hero from '../ui/Hero'
import ProjectCard from '../ui/ProjectCard'
import WorkExperience from '../ui/WorkExperience'
import Education from '../ui/Education'
import Skills from '../ui/Skills'
import Chatbot from '../ui/Chatbot'
import VisitorCounter from '../ui/VisitorCounter'
import { trackContactClick } from '../utils/analytics'
import { FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

export default function App() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Intersection Observer for .reveal elements
    useEffect(() => {
        const els = document.querySelectorAll('.reveal')
        const io = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible') }),
            { threshold: 0.1 }
        )
        els.forEach(el => io.observe(el))
        return () => io.disconnect()
    }, [])

    const handleContactClick = (type, value) => {
        trackContactClick(type, value)
    }

    const navLinks = [
        { href: '#experience', label: 'Experience' },
        { href: '#education', label: 'Education' },
        { href: '#projects', label: 'Projects' },
        { href: '#skills', label: 'Skills' },
        { href: '#contact', label: 'Contact' },
    ]

    return (
        <div className="relative min-h-screen bg-[#030712] text-slate-100">
            {/* Background orbs */}
            <div className="orb orb-violet" />
            <div className="orb orb-cyan" />

            {/* Navigation */}
            <header className={`nav-glass sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg shadow-black/40' : ''}`}>
                <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <a href="#top" className="text-lg font-bold text-white hover:opacity-80 transition-opacity">
                        <span className="gradient-text">VS</span>
                        <span className="text-slate-300 ml-2 text-sm font-normal hidden sm:inline">Vikrant Singh</span>
                    </a>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map(l => (
                            <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
                        ))}
                        <a
                            href={`mailto:${SITE.email}`}
                            className="btn-primary ml-4 text-xs py-2 px-4"
                            onClick={() => handleContactClick('email_nav', SITE.email)}
                        >
                            Hire Me
                        </a>
                    </div>

                    {/* Mobile toggle */}
                    <button
                        className="md:hidden p-2 rounded-md text-slate-400 hover:text-white hover:bg-white/5 transition"
                        onClick={() => setIsMobileMenuOpen(o => !o)}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen
                                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            }
                        </svg>
                    </button>
                </nav>

                {/* Mobile menu */}
                {isMobileMenuOpen && (
                    <div className="mobile-menu md:hidden">
                        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
                            {navLinks.map(l => (
                                <a
                                    key={l.href}
                                    href={l.href}
                                    className="nav-link py-2.5"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {l.label}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </header>

            <main id="top" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
                <Hero />

                {/* Divider */}
                <div className="section-divider my-4" />

                {/* Experience */}
                <section id="experience" className="py-20">
                    <div className="mb-12 reveal">
                        <p className="section-label">Career</p>
                        <h2 className="section-title">Work Experience</h2>
                    </div>
                    <WorkExperience />
                </section>

                <div className="section-divider" />

                {/* Education */}
                <section id="education" className="py-20">
                    <div className="mb-12 reveal">
                        <p className="section-label">Background</p>
                        <h2 className="section-title">Education</h2>
                    </div>
                    <Education />
                </section>

                <div className="section-divider" />

                {/* Projects */}
                <section id="projects" className="py-20">
                    <div className="mb-12 reveal">
                        <p className="section-label">Portfolio</p>
                        <h2 className="section-title">Featured Projects</h2>
                        <p className="text-slate-400 mt-3 max-w-xl">
                            A selection of research and engineering projects spanning AI/ML, data science, and full-stack development.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {PROJECTS.map((p, i) => (
                            <div key={p.slug} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                                <ProjectCard project={p} />
                            </div>
                        ))}
                    </div>
                </section>

                <div className="section-divider" />

                {/* Skills */}
                <section id="skills" className="py-20">
                    <div className="mb-12 reveal">
                        <p className="section-label">Toolkit</p>
                        <h2 className="section-title">Technical Skills</h2>
                    </div>
                    <Skills />
                </section>

                <div className="section-divider" />

                {/* Contact */}
                <section id="contact" className="py-20">
                    <div className="mb-12 reveal">
                        <p className="section-label">Let's Talk</p>
                        <h2 className="section-title">Get In Touch</h2>
                        <p className="text-slate-400 mt-3 max-w-lg">
                            Open to interesting conversations about AI/ML, software development, and collaboration opportunities.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Contact info */}
                        <div className="glass-card p-8 reveal space-y-5">
                            <a
                                href={`mailto:${SITE.email}`}
                                className="flex items-center gap-4 group"
                                onClick={() => handleContactClick('email', SITE.email)}
                            >
                                <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center group-hover:bg-violet-500/20 transition">
                                    <FaEnvelope className="w-4 h-4 text-violet-400" />
                                </div>
                                <span className="contact-link group-hover:text-violet-300">{SITE.email}</span>
                            </a>
                            <a
                                href={SITE.socials.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 group"
                                onClick={() => handleContactClick('linkedin', SITE.socials.linkedin)}
                            >
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 transition">
                                    <FaLinkedin className="w-4 h-4 text-blue-400" />
                                </div>
                                <span className="contact-link group-hover:text-blue-300">LinkedIn Profile</span>
                            </a>
                            <a
                                href={SITE.socials.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 group"
                                onClick={() => handleContactClick('github', SITE.socials.github)}
                            >
                                <div className="w-10 h-10 rounded-lg bg-slate-500/10 border border-slate-500/20 flex items-center justify-center group-hover:bg-slate-500/20 transition">
                                    <FaGithub className="w-4 h-4 text-slate-300" />
                                </div>
                                <span className="contact-link group-hover:text-slate-200">GitHub Profile</span>
                            </a>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                    <FaMapMarkerAlt className="w-4 h-4 text-emerald-400" />
                                </div>
                                <span className="text-slate-400 text-sm">{SITE.location}</span>
                            </div>
                        </div>

                        {/* CTA card */}
                        <div className="glass-card p-8 reveal flex flex-col justify-between" style={{ transitionDelay: '120ms' }}>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-3">Ready to collaborate?</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                    Whether it's an exciting AI/ML project, a challenging engineering problem, or just a conversation—I'd love to connect.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <a
                                    href={`mailto:${SITE.email}`}
                                    className="btn-primary justify-center"
                                    onClick={() => handleContactClick('email_button', SITE.email)}
                                >
                                    <FaEnvelope className="w-3.5 h-3.5" />
                                    Send Email
                                </a>
                                <a
                                    href={SITE.socials.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-outline justify-center"
                                    onClick={() => handleContactClick('linkedin_button', SITE.socials.linkedin)}
                                >
                                    <FaLinkedin className="w-3.5 h-3.5" />
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-12 text-center text-slate-500 text-sm border-t border-white/5">
                    <p>© {new Date().getFullYear()} Vikrant Singh. Built with React &amp; Vite.</p>
                </footer>
            </main>

            <Chatbot />
            <VisitorCounter />
        </div>
    )
}
