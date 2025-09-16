import React, {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import {SITE} from '../config'
import {marked} from 'marked'
import { trackPageView } from '../utils/analytics'


export default function Article() {
    const {slug} = useParams()
    const [html, setHtml] = useState('')
    const [isHtmlFile, setIsHtmlFile] = useState(false)

    useEffect(() => {
        // Forces light theme for all project pages
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')

        // Tracks page view for analytics
        trackPageView(`Project: ${slug}`, `/article/${slug}`)

        // Checks if this is the thesis project that should use HTML file
        if (slug === 'thesis-knowledge-graph-embeddings') {
            setIsHtmlFile(true)
            fetch(`${import.meta.env.BASE_URL}content/thesis.html`)
                .then(r => r.ok ? r.text() : '<h1>Not found</h1>')
                .then(htmlContent => {
                    // Extracts content from body tag to avoid duplicate html/head elements
                    const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
                    let content = bodyMatch ? bodyMatch[1] : htmlContent
                    
                    // Replace hardcoded links to root with proper base URL
                    content = content.replace(/href="\//g, `href="${import.meta.env.BASE_URL}`)
                    
                    setHtml(content)
                })
        } else {
            setIsHtmlFile(false)
            fetch(`${import.meta.env.BASE_URL}content/${slug}.md`)
                .then(r => r.ok ? r.text() : '# Not found')
                .then(md => {
                    setHtml(marked.parse(md))
                })
        }
    }, [slug])


    return (
        <div className={isHtmlFile ? "min-h-screen" : "max-w-3xl mx-auto px-4 py-12 prose dark:prose-invert"}>
            {!isHtmlFile && (
                <Link to={import.meta.env.BASE_URL} className="no-underline">← Back</Link>
            )}

            {isHtmlFile ? (
                // Renders HTML content directly for thesis page
                <div dangerouslySetInnerHTML={{__html: html}}/>
            ) : (
                // Renders markdown content with prose styling for other projects
                <>
                    <div dangerouslySetInnerHTML={{__html: html}}/>
                    <hr className="my-8"/>
                    <p className="text-sm opacity-70">Written by {SITE.name}</p>
                </>
            )}
        </div>
    )
}