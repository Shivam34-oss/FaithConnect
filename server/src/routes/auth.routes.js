import express from 'express'
import {
  register,
  login,
  getProfile,
  updateProfile,
  logout,
} from '../controllers/auth.controller.js'
import { protect } from '../middleware/auth.js'
import { body } from 'express-validator'

const router = express.Router()

// Validation rules
const registerValidation = [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['worshiper', 'leader']).withMessage('Invalid role'),
]

const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
]

router.post('/register', registerValidation, register)
router.post('/login', loginValidation, login)
router.get('/profile', protect, getProfile)
router.put('/profile', protect, updateProfile)
router.post('/logout', protect, logout)

export default router
