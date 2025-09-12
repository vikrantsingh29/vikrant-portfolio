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

        // Always uses fallback responses for GitHub Pages deployment
        // Since environment variables are not available in static builds
        const fallbackMessage = {
            role: 'assistant',
            content: generateFallbackResponse(currentInput)
        }
        
        // Simulates AI thinking time for better UX
        setTimeout(() => {
            setMessages(prev => [...prev, fallbackMessage])
            setIsLoading(false)
        }, 1000 + Math.random() * 1000) // 1-2 seconds delay
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