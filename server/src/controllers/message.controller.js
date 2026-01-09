import { Conversation } from '../models/Conversation.js'
import { Message } from '../models/Message.js'

// GET /api/messages/conversations
export const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({ participants: req.user._id })
      .populate('participants', 'name username avatar role faith')
      .sort({ updatedAt: -1 })

    res.status(200).json({ success: true, conversations })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Server error' })
  }
}

// POST /api/messages/conversations
// body: { participantId }
export const createConversation = async (req, res) => {
  try {
    const { participantId } = req.body
    if (!participantId) {
      return res.status(400).json({ success: false, message: 'participantId is required' })
    }

    // Check existing
    let conversation = await Conversation.findOne({
      participants: { $all: [req.user._id, participantId], $size: 2 },
    })

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [req.user._id, participantId],
      })
    }

    const populated = await Conversation.findById(conversation._id).populate(
      'participants',
      'name username avatar role faith'
    )

    res.status(201).json({ success: true, conversation: populated })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Server error' })
  }
}

// GET /api/messages/:conversationId
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ conversation: req.params.conversationId })
      .populate('sender', 'name username avatar role faith')
      .sort({ createdAt: -1 })
      .limit(100)

    res.status(200).json({ success: true, messages: messages.reverse() })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Server error' })
  }
}

// POST /api/messages/:conversationId
// body: { text, mediaUrl }
export const sendMessage = async (req, res) => {
  try {
    const { text, mediaUrl } = req.body
    const conversation = await Conversation.findById(req.params.conversationId)
    if (!conversation) {
      return res.status(404).json({ success: false, message: 'Conversation not found' })
    }

    const message = await Message.create({
      conversation: conversation._id,
      sender: req.user._id,
      text: text || '',
      mediaUrl: mediaUrl || null,
      readBy: [req.user._id],
    })

    conversation.lastMessageAt = new Date()
    conversation.lastMessage = text || 'media'
    await conversation.save()

    const populated = await Message.findById(message._id).populate(
      'sender',
      'name username avatar role faith'
    )

    res.status(201).json({ success: true, message: populated })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Server error' })
  }
}
