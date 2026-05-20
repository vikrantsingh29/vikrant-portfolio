import React, { useEffect, useRef } from 'react'
import { SITE } from '../config'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { gsap } from 'gsap'

export default function Hero() {
    const heroRef = useRef(null)
    const nameRef = useRef(null)
    const roleRef = useRef(null)
    const subRef = useRef(null)
    const ctaRef = useRef(null)
    const avatarRef = useRef(null)
    const badgeRef = useRef(null)

    useEffect(() => {
        if (!heroRef.current) return

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

            tl.from(avatarRef.current, {
                scale: 0.5,
                opacity: 0,
                duration: 0.8,
                ease: 'back.out(1.5)',
            })
            .from(nameRef.current, {
                y: 40,
                opacity: 0,
                duration: 0.7,
            }, '-=0.4')
            .from(roleRef.current, {
                y: 30,
                opacity: 0,
                duration: 0.6,
            }, '-=0.4')
            .from(subRef.current, {
                y: 20,
                opacity: 0,
                duration: 0.6,
            }, '-=0.3')
            .from(ctaRef.current.children, {
                y: 20,
                opacity: 0,
                stagger: 0.1,
                duration: 0.5,
            }, '-=0.2')
            .from(badgeRef.current, {
                scale: 0.8,
                opacity: 0,
                duration: 0.5,
            }, '-=0.4')
        }, heroRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={heroRef} className="pt-20 pb-24 flex flex-col items-center text-center relative">
            {/* Avatar */}
            <div ref={avatarRef} className="avatar-ring mb-6 animate-float">
                <img
                    src={`${import.meta.env.BASE_URL}assets/Display_Picture.jpg`}
                    alt={SITE.name}
                    className="w-28 h-28 sm:w-36 sm:h-36 object-cover"
                />
            </div>

            {/* Available badge */}
            <div ref={badgeRef} className="flex items-center gap-2 mb-6 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-full">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Available for new opportunities
            </div>

            {/* Name */}
            <h1 ref={nameRef} className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
                <span className="gradient-text">{SITE.name}</span>
            </h1>

            {/* Role */}
            <p ref={roleRef} className="text-lg sm:text-2xl text-slate-300 font-light mb-5 tracking-wide">
                {SITE.role}
            </p>

            {/* Subhead */}
            <p ref={subRef} className="text-slate-400 max-w-2xl leading-relaxed text-sm sm:text-base mb-10">
                {SITE.subhead}
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-3 mb-10">
                <a href="#projects" className="btn-primary">
                    View Projects
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </a>
                <a href={`mailto:${SITE.email}`} className="btn-outline">
                    <FaEnvelope className="w-3.5 h-3.5" />
                    Get In Touch
                </a>
                <a
                    href={SITE.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                >
                    <FaGithub className="w-3.5 h-3.5" />
                    GitHub
                </a>
                <a
                    href={SITE.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                >
                    <FaLinkedin className="w-3.5 h-3.5 text-blue-400" />
                    LinkedIn
                </a>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap justify-center gap-8 text-center">
                {[
                    { value: '7+', label: 'Years Experience' },
                    { value: '3', label: 'Countries Worked' },
                    { value: '10+', label: 'Projects Shipped' },
                ].map(s => (
                    <div key={s.label}>
                        <div className="text-2xl font-bold gradient-text">{s.value}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                    </div>
                ))}
            </div>
        </section>
    )
}
