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


    // Creates fallback responses for common questions
    const generateFallbackResponse = (userInput) => {
        const input = userInput.toLowerCase()
        
        if (input.includes('project') || input.includes('work')) {
            return `${SITE.name} has worked on several impressive projects:\n\n• **Knowledge Graph Embeddings** - His master thesis developing function-based KGE with Neural Architecture Search\n• **Step Counting with Sensor Data** - Achieved lowest error with GRU model (MSE ≈ 3.68)\n• **RAG with LangGraph** - Implemented RAG pipeline for email data querying\n• **Financial Market Strategies** - LSTM/Prophet models with Bloomberg API integration\n• **Cycling Tour Prediction** - NLP pipeline with Hugging Face NER and BART\n\nWould you like to know more about any specific project?`
        }
        
        if (input.includes('skill') || input.includes('technology') || input.includes('tech')) {
            return `${SITE.name} has expertise in:\n\n**AI/ML & LLMs:** PyTorch, TensorFlow, Hugging Face, LangChain, LangGraph, RAG, NAS\n**Programming:** Python, C++, Java, SQL\n**Backend:** Flask, FastAPI, Microservices, RabbitMQ, Redis\n**Data:** Pandas, NumPy, Power BI, Grafana, ElasticSearch\n**Cloud:** Azure, Docker, Prometheus, Loki\n\nHe's particularly strong in AI/ML and has 7+ years of experience building scalable systems.`
        }
        
        if (input.includes('experience') || input.includes('job') || input.includes('work')) {
            return `${SITE.name} has 7+ years of experience:\n\n**Current:** AI/ML Engineer at Petanux GmbH (Jan 2025 - Present)\n- Incorporates LLMs into chatbot systems\n- Builds RAG pipelines with ElasticSearch & ChromaDB\n- Reduced pipeline runtime from ~900s to 20-30s\n\n**Previous:** Research Assistant at Fraunhofer Institute (2020-2024)\n- Optimized flight trajectory predictions with LSTM + NAS\n- Built ETL pipelines for wildfire simulations\n\n**Earlier:** Software Developer at Asteria Aerospace (2016-2019)\n- Developed real-time C++ algorithms for UAV telemetry`
        }
        
        if (input.includes('education') || input.includes('study') || input.includes('degree')) {
            return `${SITE.name}'s educational background:\n\n**MS in Computer Science** - Universität Paderborn (2024)\n- Master thesis on Knowledge Graph Embeddings\n- Supervised by Prof. Dr. Axel-Cyrille Ngonga Ngomo\n\n**BE in Information Technology** - Panjab University (2016)\n- Strong foundation in algorithms and software development`
        }
        
        if (input.includes('contact') || input.includes('email') || input.includes('reach')) {
            return `You can reach ${SITE.name} at:\n\n📧 **Email:** ${SITE.email}\n📱 **Phone:** ${SITE.phone}\n📍 **Location:** ${SITE.location}\n💼 **LinkedIn:** ${SITE.socials.linkedin}\n💻 **GitHub:** ${SITE.socials.github}`
        }
        
        return `I'm here to help you learn about ${SITE.name}! You can ask me about:\n\n• His **projects** and technical work\n• His **skills** and technologies\n• His **work experience** and career\n• His **education** background\n• How to **contact** him\n\nWhat would you like to know?`
    }

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return

        const userMessage = { role: 'user', content: input }
        const newMessages = [...messages, userMessage]
        setMessages(newMessages)
        const currentInput = input
        setInput('')
        setIsLoading(true)


        try {
            // Checks if API key is available
            const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY
            if (!apiKey) {
                throw new Error('API key not available')
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
                throw new Error(`API request failed: ${response.status} - ${errorData.error?.message || 'Unknown error'}`)
            }

            const data = await response.json()
            
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
            console.error('Error calling OpenRouter API:', error)
            
            // Uses fallback response instead of generic error
            const fallbackMessage = {
                role: 'assistant',
                content: generateFallbackResponse(currentInput)
            }
            setMessages(prev => [...prev, fallbackMessage])
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
            {/* Floating Chat Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 w-14 h-14 bg-brand-600 hover:bg-brand-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 group"
                >
                    <svg
                        className="w-6 h-6 transition-transform group-hover:scale-110"
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

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-80 h-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="bg-brand-600 text-white p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm">AI Assistant</h3>
                                <p className="text-xs opacity-90">Ask about Vikrant</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-6 h-6 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-slate-800">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                                        message.role === 'user'
                                            ? 'bg-brand-600 text-white rounded-br-sm'
                                            : 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-bl-sm shadow-sm'
                                    }`}
                                >
                                    <p className="whitespace-pre-wrap">{message.content}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-slate-700 px-3 py-2 rounded-2xl rounded-bl-sm shadow-sm">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message..."
                                className="flex-1 px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
                                disabled={isLoading}
                            />
                            <button
                                onClick={sendMessage}
                                disabled={!input.trim() || isLoading}
                                className="w-8 h-8 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors"
                            >
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