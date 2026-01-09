import express from 'express'
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  addComment,
} from '../controllers/post.controller.js'
import { protect } from '../middleware/auth.js'
import { body } from 'express-validator'

const router = express.Router()

const createPostValidation = [
  body('content')
    .trim()
    .isLength({ min: 1, max: 5000 })
    .withMessage('Post content must be between 1 and 5000 characters'),
]

const commentValidation = [
  body('content')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Comment must be between 1 and 1000 characters'),
]

router.get('/', protect, getPosts)
router.get('/:id', protect, getPostById)
router.post('/', protect, createPostValidation, createPost)
router.put('/:id', protect, updatePost)
router.delete('/:id', protect, deletePost)
router.post('/:id/like', protect, likePost)
router.delete('/:id/like', protect, unlikePost)
router.post('/:id/comments', protect, commentValidation, addComment)

export default router
