import { ChatMessage } from '../models/ChatMessage.js'
import { User } from '../models/User.js'

// AI Configuration - Using rule-based approach for now
// You can integrate with OpenAI, Claude, or other AI services by replacing findBestMatch()
const AI_API_KEY = process.env.AI_API_KEY || 'demo'

// Sample faith-related responses for demo
const faithResponses = {
  prayer: [
    'Prayer is a powerful way to connect with Allah. Here are some common prayers you might be interested in: Salah (5 daily prayers), Dua, and Zikr. Would you like to know more about any of these?',
    'Prayer helps us maintain spiritual connection and peace. Different faith traditions have their own prayer practices. What specific prayer or faith are you interested in?'
  ],
  community: [
    'Our communities are spaces where believers of similar faiths gather to support each other and grow spiritually. You can join existing communities or create your own!',
    'Communities help us feel connected to others who share our beliefs. Browse our communities section to find one that matches your faith.'
  ],
  scripture: [
    'Scriptures are the holy texts that guide our faith. Our platform has a collection of scriptures from various faiths. Would you like to explore them?',
    'Different faiths have different sacred texts. Would you like to learn about scriptures from a specific faith?'
  ],
  help: [
    'I can help you with:\n1. Finding or creating communities\n2. Learning about prayers and spiritual practices\n3. Exploring scriptures\n4. Connecting with other believers\n\nWhat would you like help with?'
  ]
}

// Helper function to find best matching response
const findBestMatch = (message) => {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('prayer') || lowerMessage.includes('pray') || lowerMessage.includes('salah')) {
    return faithResponses.prayer[Math.floor(Math.random() * faithResponses.prayer.length)]
  }
  if (lowerMessage.includes('community') || lowerMessage.includes('communities')) {
    return faithResponses.community[Math.floor(Math.random() * faithResponses.community.length)]
  }
  if (lowerMessage.includes('scripture') || lowerMessage.includes('quran') || lowerMessage.includes('bible') || lowerMessage.includes('torah')) {
    return faithResponses.scripture[Math.floor(Math.random() * faithResponses.scripture.length)]
  }
  if (lowerMessage.includes('help') || lowerMessage.includes('what can you') || lowerMessage.includes('can you help')) {
    return faithResponses.help[0]
  }
  
  return 'That\'s a great question! I\'m here to help you navigate FaithConnect and connect with your faith community. Can you tell me more about what you\'re looking for? You can ask me about communities, prayers, scriptures, or connecting with other believers.'
}

// @desc    Send message to AI
// @route   POST /api/chat/message
// @access  Private
export const sendMessage = async (req, res) => {
  try {
    const { message, context } = req.body
    const userId = req.user._id

    if (!message || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Message cannot be empty'
      })
    }

    // Save user message
    const userMessage = await ChatMessage.create({
      userId: userId,
      content: message,
      type: 'user'
    })

    // Get AI response (rule-based for now, you can integrate with OpenAI here)
    let reply = findBestMatch(message)

    // Optional: Integrate with actual AI API
    // if (process.env.AI_API_KEY && process.env.AI_API_KEY !== 'demo') {
    //   try {
    //     const aiResponse = await axios.post(AI_API_URL, {
    //       model: 'gpt-3.5-turbo',
    //       messages: [{ role: 'user', content: message }],
    //       max_tokens: 500
    //     }, {
    //       headers: { 'Authorization': `Bearer ${process.env.AI_API_KEY}` }
    //     })
    //     reply = aiResponse.data.choices[0].message.content
    //   } catch (aiError) {
    //     console.error('AI API Error:', aiError.message)
    //     reply = findBestMatch(message) // Fallback to rule-based
    //   }
    // }

    // Save bot message
    const botMessage = await ChatMessage.create({
      userId: userId,
      content: reply,
      type: 'bot'
    })

    res.status(200).json({
      success: true,
      reply: reply,
      messageId: botMessage._id
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to send message'
    })
  }
}

// @desc    Get chat history
// @route   GET /api/chat/history
// @access  Private
export const getChatHistory = async (req, res) => {
  try {
    const userId = req.user._id
    const limit = parseInt(req.query.limit) || 20

    const messages = await ChatMessage.find({
      userId: userId
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .reverse()

    res.status(200).json({
      success: true,
      messages
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch chat history'
    })
  }
}

// @desc    Clear chat history
// @route   DELETE /api/chat/history
// @access  Private
export const clearChatHistory = async (req, res) => {
  try {
    const userId = req.user._id

    await ChatMessage.deleteMany({
      userId: userId
    })

    res.status(200).json({
      success: true,
      message: 'Chat history cleared'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to clear chat history'
    })
  }
}

// @desc    Search knowledge base
// @route   POST /api/chat/search
// @access  Private
export const searchKnowledge = async (req, res) => {
  try {
    const { query } = req.body

    if (!query || query.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      })
    }

    // Search in chat history and messages
    const results = await ChatMessage.find({
      $text: { $search: query }
    }).limit(10)

    res.status(200).json({
      success: true,
      results,
      count: results.length
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Search failed'
    })
  }
}
