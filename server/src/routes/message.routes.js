import express from 'express'
import {
  getConversations,
  createConversation,
  getMessages,
  sendMessage,
} from '../controllers/message.controller.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.get('/conversations', protect, getConversations)
router.post('/conversations', protect, createConversation)
router.get('/:conversationId', protect, getMessages)
router.post('/:conversationId', protect, sendMessage)

export default router
