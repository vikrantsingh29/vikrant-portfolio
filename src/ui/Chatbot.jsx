import React, { useState, useRef, useEffect } from 'react'
import { SITE, PROJECTS, SKILLS } from '../config'


export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: `Hey there! 👋 I'm an AI assistant who knows all about ${SITE.name} - the funny tech guy with a passion for building cool stuff! Ask me anything about his background, projects, hobbies, or basically anything you're curious about. I promise to keep it entertaining! 😄`
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

BASIC INFO:
Name: ${SITE.name}
Role: ${SITE.role}
Email: ${SITE.email}
Phone: ${SITE.phone}
Location: ${SITE.location}
About: ${SITE.subhead}
Date of Birth: January 29, 1995

PERSONAL DETAILS:
- Single and available for work in Germany or remotely, also open to Netherlands for exceptional opportunities
- Speaks fluent English and Hindi, and a little German
- Personality: A funny tech guy who's absolutely crazy about technology

HOBBIES & INTERESTS:
- Sports: Loves playing football and watching football/sports in general, plays badminton really well
- Music: Favorite DJs are Daft Punk and Lost Frequencies, currently into Fred again
- Creative: Plays guitar and sketches sometimes
- Tech enthusiast: Passionate about all things technology

PROJECTS:
${PROJECTS.map(p => `- ${p.title}: ${p.description} (Tech: ${p.stack.join(', ')})`).join('\n')}

SKILLS:
${Object.entries(SKILLS).map(([category, skills]) => `${category}: ${skills.join(', ')}`).join('\n')}

PERSONALITY & TONE:
You should reply in a funny and engaging manner while being helpful and informative. Vikrant is a funny tech guy, so feel free to use tech humor, light jokes, and a conversational tone. Be enthusiastic about technology topics and show his personality through your responses. Keep responses concise but entertaining. If asked about something you don't know, be honest about the limitations but do it in a witty way.`


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

            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': window.location.origin,
                    'X-Title': `${SITE.name} Portfolio Chatbot`
                },
                body: JSON.stringify({
                    model: 'openai/gpt-3.5-turbo',
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
                throw new Error(`API request failed: ${response.status} - ${errorData.error?.message || 'Unknown error'}`)
            }

            const data = await response.json()
            
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
            
            let errorMessage = 'Sorry, I encountered an error while processing your request.'
            
            if (error.message.includes('401')) {
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
            {/* Floating Chat Button - Modern Style */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 group"
                >
                    {/* Chat Icon SVG */}
                    <svg 
                        className="w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {/* Notification dot */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </button>
            )}

            {/* Chat Window - Modern Clean Style */}
            {isOpen && (
                <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-80 sm:w-96 h-96 sm:h-[500px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl z-50 flex flex-col font-sans overflow-hidden">
                    {/* Header */}
                    <div className="bg-blue-600 text-white p-4 flex items-center justify-between rounded-t-2xl">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm">AI Assistant</h3>
                                <p className="text-xs opacity-90">Ask about Vikrant</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-6 h-6 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages Area - Clean Readable Style */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                                        message.role === 'user'
                                            ? 'bg-blue-600 text-white rounded-br-md'
                                            : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-bl-md shadow-sm'
                                    }`}
                                >
                                    <p className="whitespace-pre-wrap">{message.content}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-2 rounded-2xl rounded-bl-md shadow-sm">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area - Modern Style */}
                    <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 rounded-b-2xl">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message..."
                                className="flex-1 px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                disabled={isLoading}
                            />
                            <button
                                onClick={sendMessage}
                                disabled={!input.trim() || isLoading}
                                className="w-10 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors"
                            >
                                {/* Send Icon SVG */}
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}