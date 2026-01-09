import express from 'express'
import {
  getReels,
  getReelsByAuthor,
  createReel,
  likeReel,
  unlikeReel,
  saveReel,
  unsaveReel,
  addReelComment,
  getReelComments,
} from '../controllers/reel.controller.js'
import { protect } from '../middleware/auth.js'
import { body } from 'express-validator'

const router = express.Router()

const createValidation = [
  body('videoUrl').trim().isURL().withMessage('Valid video URL is required'),
  body('caption').optional().isLength({ max: 2000 }).withMessage('Caption too long'),
]

router.get('/', protect, getReels)
router.get('/author/:id', protect, getReelsByAuthor)
router.post('/', protect, createValidation, createReel)
router.post('/:id/like', protect, likeReel)
router.delete('/:id/like', protect, unlikeReel)
router.post('/:id/save', protect, saveReel)
router.delete('/:id/save', protect, unsaveReel)
router.get('/:id/comments', protect, getReelComments)
router.post('/:id/comments', protect, addReelComment)

export default router
