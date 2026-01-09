import express from 'express'
import { getLeaderStats, getLeaderFollowers, getLeaderContent } from '../controllers/leader.controller.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.get('/me/stats', protect, getLeaderStats)
router.get('/me/followers', protect, getLeaderFollowers)
router.get('/me/content', protect, getLeaderContent)

export default router
