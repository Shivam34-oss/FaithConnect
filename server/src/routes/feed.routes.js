import express from 'express'
import { getExploreFeed, getFollowingFeed } from '../controllers/feed.controller.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.get('/explore', protect, getExploreFeed)
router.get('/following', protect, getFollowingFeed)

export default router
