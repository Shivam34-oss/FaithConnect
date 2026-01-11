import { useState, useRef, useEffect } from 'react'
import { MessageCircle, Send, X, Minimize2, Maximize2, Trash2 } from 'lucide-react'
import { aiService } from '@data/services/aiService'
import { toast } from 'react-toastify'
import './Chatbot.css'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Welcome to FaithConnect AI Chatbot! 👋 I\'m your FaithConnect AI Assistant. How can I help you today? You can ask me about communities, prayers, scriptures, or anything related to faith.',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages([...messages, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await aiService.sendMessage(input)
      
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: response.reply || response.message || 'Sorry, I couldn\'t process that.',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      const errorMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
      console.error('Chat error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearHistory = async () => {
    if (!window.confirm('Clear all chat history?')) return
    try {
      await aiService.clearChatHistory()
      setMessages([
        {
          id: 1,
          type: 'bot',
          content: 'Assalamu Alaikum! 👋 I\'m your FaithConnect AI Assistant. How can I help you today?',
          timestamp: new Date()
        }
      ])
      toast.success('Chat history cleared')
    } catch (error) {
      toast.error('Failed to clear history')
    }
  }

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="chatbot-floating-btn"
          title="Open Chat"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`chatbot-container ${isMinimized ? 'minimized' : ''}`}>
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-title">
              <MessageCircle size={20} />
              <span>FaithConnect AI</span>
            </div>
            <div className="chatbot-header-actions">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="chatbot-header-btn"
                title={isMinimized ? 'Expand' : 'Minimize'}
              >
                {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="chatbot-header-btn"
                title="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          {!isMinimized && (
            <>
              <div className="chatbot-messages">
                {messages.map((msg) => (
                  <div key={msg.id} className={`chatbot-message ${msg.type}`}>
                    <div className="chatbot-message-content">
                      {msg.content}
                    </div>
                    <div className="chatbot-message-time">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="chatbot-message bot">
                    <div className="chatbot-message-content">
                      <div className="chatbot-typing">
                        <span></span><span></span><span></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form onSubmit={handleSendMessage} className="chatbot-input-area">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="chatbot-input"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="chatbot-send-btn"
                  disabled={isLoading || !input.trim()}
                  title="Send Message"
                >
                  <Send size={18} />
                </button>
                <button
                  type="button"
                  onClick={handleClearHistory}
                  className="chatbot-clear-btn"
                  title="Clear History"
                >
                  <Trash2 size={16} />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default Chatbot
