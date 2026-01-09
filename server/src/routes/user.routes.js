import express from 'express'
import { getUserById, followUser, unfollowUser } from '../controllers/user.controller.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.get('/:id', protect, getUserById)
router.post('/:id/follow', protect, followUser)
router.delete('/:id/unfollow', protect, unfollowUser)

export default router
