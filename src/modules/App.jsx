import React from 'react'
import { SITE, PROJECTS } from '../config'
import Hero from '../ui/Hero'
import TerminalSkills from '../ui/TerminalSkills'
import ProjectCard from '../ui/ProjectCard'
import TerminalTimeline from '../ui/TerminalTimeline'
import Chatbot from '../ui/Chatbot'
import ThemeToggle from '../ui/ThemeToggle'


export default function App() {
    return (
        <div className="min-h-screen bg-terminal-bg">
            {/* Matrix background effect */}
            <div className="matrix-bg"></div>

            <header className="terminal-nav sticky top-0 z-40">
                <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="terminal-prompt">root@</span>
                        <span className="font-bold text-terminal-green">{SITE.name.toLowerCase().replace(' ', '_')}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="#projects" className="nav-link">./projects</a>
                        <a href="#skills" className="nav-link">./skills</a>
                        <a href="#timeline" className="nav-link">git log</a>
                        <a href="#contact" className="nav-link">contact.sh</a>
                        <ThemeToggle/>
                    </div>
                </nav>
            </header>

            <main id="top" className="max-w-6xl mx-auto px-4">
                <Hero/>

                <section id="timeline" className="py-16">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-terminal-cyan mb-2">
                            # Career Timeline
                        </h2>
                        <p className="text-terminal-text-dim">
                            // Professional journey and milestones
                        </p>
                    </div>
                    <TerminalTimeline/>
                </section>

                <section id="projects" className="py-16">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-terminal-cyan mb-2">
                            # Projects & Portfolio
                        </h2>
                        <p className="text-terminal-text-dim">
                            // Recent work and contributions
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {PROJECTS.map(p => (
                            <ProjectCard key={p.slug} project={p}/>
                        ))}
                    </div>
                </section>

                <section id="skills" className="py-16">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-terminal-cyan mb-2">
                            # Technical Skills & Expertise
                        </h2>
                        <p className="text-terminal-text-dim">
                            // Compiled list of technologies and frameworks
                        </p>
                    </div>
                    <TerminalSkills/>
                </section>

                <section id="contact" className="py-16">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-terminal-cyan mb-2">
                            # Contact & Communication
                        </h2>
                        <p className="text-terminal-text-dim">
                            // Reach out for collaboration opportunities
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="terminal-form">
                            <div className="mb-4">
                                <span className="terminal-prompt">$</span>
                                <span className="text-terminal-command ml-2">send_message --to vikrant</span>
                            </div>
                            <form action="https://formspree.io/f/your-id" method="POST">
                                <div className="mb-4">
                                    <label className="block text-terminal-green text-sm mb-2">--name</label>
                                    <input
                                        name="name"
                                        required
                                        className="terminal-input"
                                        placeholder="Enter your name..."
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-terminal-green text-sm mb-2">--email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="terminal-input"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-terminal-green text-sm mb-2">--message</label>
                                    <textarea
                                        name="message"
                                        rows="5"
                                        required
                                        className="terminal-textarea"
                                        placeholder="Type your message here..."
                                    ></textarea>
                                </div>
                                <button className="terminal-button">
                                    ./submit.sh
                                </button>
                            </form>
                        </div>

                        <div className="terminal-form">
                            <div className="mb-4">
                                <span className="terminal-prompt">$</span>
                                <span className="text-terminal-command ml-2">cat contact_info.txt</span>
                            </div>
                            <div className="terminal-output space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-terminal-green">email:</span>
                                    <a
                                        className="text-terminal-cyan hover:text-terminal-amber transition-colors"
                                        href={`mailto:${SITE.email}`}
                                    >
                                        {SITE.email}
                                    </a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-terminal-green">linkedin:</span>
                                    <a
                                        className="text-terminal-cyan hover:text-terminal-amber transition-colors"
                                        href={SITE.socials.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        /in/vikrantsingh29
                                    </a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-terminal-green">location:</span>
                                    <span className="text-terminal-text">{SITE.location}</span>
                                </div>
                                <div className="mt-4 pt-3 border-t border-terminal-border">
                                    <span className="text-terminal-text-dim text-xs">
                                        # Always open to interesting conversations and collaborations
                                    </span>
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