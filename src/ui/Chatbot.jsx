import React, { useState, useRef, useEffect } from 'react'
import { SITE, PROJECTS, SKILLS } from '../config'


export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: `Hi! I'm an AI assistant that knows about ${SITE.name}. Ask me anything about his background, skills, projects, or experience!`
        }
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const systemPrompt = `You are an AI assistant for ${SITE.name}'s portfolio website. Here's what you know about him:

Name: ${SITE.name}
Role: ${SITE.role}
Email: ${SITE.email}
Phone: ${SITE.phone}
Location: ${SITE.location}
About: ${SITE.subhead}

PROJECTS:
${PROJECTS.map(p => `- ${p.title}: ${p.description} (Tech: ${p.stack.join(', ')})`).join('\n')}

SKILLS:
${Object.entries(SKILLS).map(([category, skills]) => `${category}: ${skills.join(', ')}`).join('\n')}

You should answer questions about his background, skills, projects, and experience. Be helpful, professional, and conversational. If asked about something you don't know, be honest about the limitations of your knowledge about him. Keep responses concise but informative.`


    const sendMessage = async () => {
        if (!input.trim() || isLoading) return

        const userMessage = { role: 'user', content: input }
        const newMessages = [...messages, userMessage]
        setMessages(newMessages)
        setInput('')
        setIsLoading(true)

        try {
            // Checks if API key is available
            const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY
            if (!apiKey || apiKey.trim() === '') {
                throw new Error('OpenRouter API key not configured. Please check your environment variables.')
            }

            console.log('Making API request to OpenRouter...') // Debug logging

            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': window.location.origin,
                    'X-Title': `${SITE.name} Portfolio Chatbot`
                },
                body: JSON.stringify({
                    model: 'meta-llama/llama-3.1-8b-instruct:free',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        ...newMessages
                    ],
                    temperature: 0.7,
                    max_tokens: 500
                })
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                console.error('API Error:', response.status, errorData)
                throw new Error(`API request failed: ${response.status} - ${errorData.error?.message || 'Unknown error'}`)
            }

            const data = await response.json()
            console.log('API Response received successfully') // Debug logging
            
            // Validates response structure
            if (!data.choices || !data.choices[0] || !data.choices[0].message) {
                throw new Error('Invalid response format from API')
            }

            const assistantMessage = {
                role: 'assistant',
                content: data.choices[0].message.content
            }

            setMessages(prev => [...prev, assistantMessage])
        } catch (error) {
            console.error('Chatbot Error:', error)
            
            // Shows detailed error message
            let errorMessage = 'Sorry, I encountered an error while processing your request.'
            
            if (error.message.includes('API key not configured')) {
                errorMessage = 'Chatbot configuration issue. The OpenRouter API key is not properly set up.'
            } else if (error.message.includes('401')) {
                errorMessage = 'Authentication failed. Please check if the OpenRouter API key is valid.'
            } else if (error.message.includes('429')) {
                errorMessage = 'Rate limit exceeded. Please wait a moment and try again.'
            } else if (error.message.includes('Network')) {
                errorMessage = 'Network error. Please check your internet connection and try again.'
            }
            
            const errorMsg = {
                role: 'assistant',
                content: errorMessage + ' Please try again.'
            }
            setMessages(prev => [...prev, errorMsg])
        } finally {
            setIsLoading(false)
        }
    }


    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }


    return (
        <>
            {/* Floating Chat Button - Terminal Style */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 w-14 h-14 bg-black dark:bg-gray-900 border-2 border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-black transition-all duration-300 flex items-center justify-center z-50 group font-mono"
                >
                    <span className="text-lg font-bold group-hover:animate-pulse">AI</span>
                    {/* Terminal cursor */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-500 animate-pulse"></div>
                </button>
            )}

            {/* Chat Window - Terminal Style */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-black dark:bg-gray-900 border-2 border-brand-500 shadow-2xl z-50 flex flex-col font-mono">
                    {/* Terminal Header */}
                    <div className="bg-brand-500 text-black p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <span className="font-bold text-sm ml-2">vikrant@portfolio:~/ai-chat</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-black/20 px-2 py-1 transition-colors text-sm font-bold"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Messages Area - Terminal Style */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-black dark:bg-gray-900 text-brand-500">
                        {messages.map((message, index) => (
                            <div key={index} className="space-y-1">
                                {message.role === 'user' ? (
                                    <div className="flex items-start gap-2">
                                        <span className="text-brand-400 shrink-0">$</span>
                                        <div className="text-white">
                                            <span className="text-brand-400">user@terminal:</span> {message.content}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-1">
                                        <div className="text-brand-400 text-sm">
                                            ai_assistant.py --query="user_input" --output=response
                                        </div>
                                        <div className="pl-4 border-l-2 border-brand-500/30 text-brand-200 whitespace-pre-wrap leading-relaxed">
                                            {message.content}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-center gap-2">
                                <span className="text-brand-400">$</span>
                                <span className="text-brand-300">processing...</span>
                                <div className="flex space-x-1">
                                    <div className="w-1 h-4 bg-brand-500 animate-pulse"></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area - Terminal Style */}
                    <div className="p-4 bg-black dark:bg-gray-900 border-t border-brand-500/30">
                        <div className="flex items-center gap-2">
                            <span className="text-brand-400 shrink-0">$</span>
                            <span className="text-brand-400 text-sm">chat</span>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask about Vikrant..."
                                className="flex-1 bg-transparent text-white placeholder:text-brand-300/50 focus:outline-none font-mono"
                                disabled={isLoading}
                            />
                            <div className="w-2 h-5 bg-brand-500 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}