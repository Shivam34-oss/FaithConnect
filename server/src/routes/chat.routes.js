import express from 'express'
import {
  sendMessage,
  getChatHistory,
  clearChatHistory,
  searchKnowledge
} from '../controllers/chat.controller.js'
import { protect } from '../middleware/auth.js'
import { body } from 'express-validator'

const router = express.Router()

const messageValidation = [
  body('message')
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage('Message must be between 1 and 2000 characters')
]

router.post('/message', protect, messageValidation, sendMessage)
router.get('/history', protect, getChatHistory)
router.delete('/history', protect, clearChatHistory)
router.post('/search', protect, searchKnowledge)

export default router
