import express from 'express'
import {
  getCommunities,
  getCommunityById,
  createCommunity,
  joinCommunity,
  leaveCommunity,
} from '../controllers/community.controller.js'
import { protect } from '../middleware/auth.js'
import { body } from 'express-validator'

const router = express.Router()

const createCommunityValidation = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Community name must be between 1 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
]

router.get('/', protect, getCommunities)
router.get('/:id', protect, getCommunityById)
router.post('/', protect, createCommunityValidation, createCommunity)
router.post('/:id/join', protect, joinCommunity)
router.delete('/:id/leave', protect, leaveCommunity)

export default router
