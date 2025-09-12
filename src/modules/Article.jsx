import React, {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import {SITE} from '../config'
import {marked} from 'marked'


export default function Article() {
    const {slug} = useParams()
    const [html, setHtml] = useState('')


    useEffect(() => {
        fetch(`/content/${slug}.md`).then(r => r.ok ? r.text() : '# Not found').then(md => {
            setHtml(marked.parse(md))
        })
    }, [slug])


    return (
        <div className="max-w-3xl mx-auto px-4 py-12 prose dark:prose-invert">
            <Link to={import.meta.env.BASE_URL} className="no-underline">← Back</Link>
            <div dangerouslySetInnerHTML={{__html: html}}/>
            <hr className="my-8"/>
            <p className="text-sm opacity-70">Written by {SITE.name}</p>
        </div>
    )
}